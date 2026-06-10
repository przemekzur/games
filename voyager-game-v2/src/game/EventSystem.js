// Random events and encounters per system
// v2: interactive choice encounters (derelicts, distress calls, traders) shown
// as dialog boxes when a showDialog handler is wired in (see main.js).
export class EventSystem {
  constructor(gameState, sectorMap, combat, onEvent) {
    this.gameState = gameState;
    this.sectorMap = sectorMap;
    this.combat = combat;
    this.onEvent = onEvent;
    this.showDialog = null; // wired by main.js to UIManager.showDialog
  }

  // ── Interactive encounters — the player decides ──
  getChoiceEvents() {
    return [
      {
        weight: 2,
        sequence: [{
          speaker: 'Harry Kim — Ops',
          portrait: '👨',
          text: 'Captain, we\'re picking up a derelict vessel adrift off the port bow. Power signature is dead, but the cargo holds read intact. Could be salvage... could be a trap. The hull markings look deliberately scorched off.',
          choices: [
            {
              text: 'Send an away team. We need those supplies.',
              effect: { },
              next: -1,
              _after: (gs, onEvent) => {
                if (Math.random() < 0.65) {
                  const s = gs.getState();
                  gs.update({ deuterium: s.deuterium + 18, dilithium: s.dilithium + 8 });
                  onEvent('📦 Away team returns with salvage: +18 deuterium, +8 dilithium.', 'success');
                } else {
                  const s = gs.getState();
                  gs.update({ hull: s.hull - 8, morale: s.morale - 4 });
                  onEvent('💥 Booby trap! The derelict\'s core detonated. Hull -8%, crew shaken.', 'combat');
                }
              },
            },
            {
              text: 'Too risky. Mark it on the charts and move on.',
              effect: { morale: 1 },
              next: -1,
            },
          ],
        }],
      },
      {
        weight: 2,
        sequence: [{
          speaker: 'Tuvok — Tactical',
          portrait: '🧝',
          text: 'A distress call, Captain. A civilian transport reports life support failure — forty-one souls aboard. However, I must note: this frequency has been used as bait by raiders in this sector.',
          choices: [
            {
              text: 'We answer distress calls. That\'s who we are. Take us in.',
              effect: { },
              next: -1,
              _after: (gs, onEvent) => {
                if (Math.random() < 0.7) {
                  const s = gs.getState();
                  gs.update({ morale: Math.min(100, s.morale + 8), crew: s.crew + 1 });
                  onEvent('💙 Rescue successful. One survivor joins the crew. Morale soars.', 'success');
                } else {
                  const s = gs.getState();
                  gs.update({ shields: Math.max(0, s.shields - 15), energy: s.energy - 30 });
                  onEvent('🚨 It was an ambush! We fought clear, but shields -15 and energy -30.', 'combat');
                }
              },
            },
            {
              text: 'Scan first. If it\'s genuine, we help.',
              effect: { energy: -10 },
              next: -1,
              _after: (gs, onEvent) => {
                if (Math.random() < 0.5) {
                  const s = gs.getState();
                  gs.update({ morale: Math.min(100, s.morale + 5) });
                  onEvent('🔍 Scans confirm — genuine distress. Rescue complete without incident.', 'success');
                } else {
                  onEvent('🔍 Scans reveal weapon signatures behind the asteroid. We avoided a trap.', 'discovery');
                }
              },
            },
          ],
        }],
      },
      {
        weight: 1,
        sequence: [{
          speaker: 'Trader Vexil (viewscreen)',
          portrait: '🛸',
          text: 'Greetings, greetings! Vexil of the Wandering Exchange! For you, friends — special prices! Refined dilithium for raw deuterium, or perhaps... photon munitions for those bio-neural curiosities of yours?',
          choices: [
            {
              text: 'Trade 15 deuterium for 12 dilithium.',
              effect: { deuterium: -15, dilithium: 12 },
              next: -1,
              when: (s) => s.deuterium >= 15,
            },
            {
              text: 'Trade 6 bio-neural packs for 4 torpedoes.',
              effect: { bioNeural: -6, torpedoes: 4 },
              next: -1,
              when: (s) => s.bioNeural >= 6,
            },
            {
              text: 'Not today, Vexil. Safe travels.',
              effect: {},
              next: -1,
            },
          ],
        }],
      },
    ];
  }

  maybeTriggerChoiceEvent() {
    if (!this.showDialog) return false;
    const events = this.getChoiceEvents();
    const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const event of events) {
      roll -= event.weight;
      if (roll <= 0) {
        // Convert `_after` consequence hooks into onSelect callbacks
        const seq = event.sequence.map(step => ({
          ...step,
          choices: step.choices.map(choice => {
            const { _after, ...rest } = choice;
            if (!_after) return rest;
            return { ...rest, onSelect: () => _after(this.gameState, this.onEvent) };
          }),
        }));
        this.showDialog(seq);
        return true;
      }
    }
    return false;
  }

  triggerArrivalEvents(systemData) {
    const state = this.gameState.getState();
    const events = [];

    // Collect available resources
    if (systemData.resources) {
      for (const [res, amount] of Object.entries(systemData.resources)) {
        if (amount > 0) {
          const collected = Math.floor(amount * (0.5 + Math.random() * 0.5));
          if (collected > 0) {
            events.push(() => {
              const s = this.gameState.getState();
              this.gameState.update({ [res]: (s[res] || 0) + collected });
              this.onEvent(`📦 Collected ${collected} ${this.formatResource(res)}`, 'success');
            });
          }
        }
      }
    }

    // Threat-based combat encounter
    if (systemData.threat > 0 && Math.random() < systemData.threat) {
      const enemy = this.combat.getEnemyForRegion(systemData.region, systemData.threat);
      if (enemy) {
        events.push(() => this.combat.startCombat(enemy));
      }
    }

    // Random events (if no combat): sometimes an interactive choice encounter,
    // otherwise a classic log event
    if (events.length === 0 || !events.some(e => e._isCombat)) {
      if (Math.random() < 0.18) {
        events.push(() => this.maybeTriggerChoiceEvent());
      } else if (Math.random() < 0.4) {
        const randomEvent = this.getRandomEvent(systemData);
        if (randomEvent) events.push(randomEvent);
      }
    }

    // Execute events with slight delays
    let delay = 500;
    for (const event of events) {
      setTimeout(() => event(), delay);
      delay += 1200;
    }

    // System description
    this.onEvent(`📍 Entered ${systemData.name}. ${systemData.desc}`, 'story');
  }

  getRandomEvent(systemData) {
    const events = [
      // Positive events
      {
        weight: 3,
        fn: () => {
          const amount = 3 + Math.floor(Math.random() * 6);
          const s = this.gameState.getState();
          this.gameState.update({ energy: s.energy + amount * 6 });
          this.onEvent(`⚡ Solar winds boost energy reserves. +${amount * 6} energy.`, 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ crew: s.crew + 2, morale: Math.min(100, s.morale + 3) });
          this.onEvent('👥 Rescued survivors from a damaged vessel. Crew +2, morale improved.', 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({
            replicatorRations: s.replicatorRations + 12,
            morale: Math.min(100, s.morale + 2),
          });
          this.onEvent('🍽️ Neelix discovered edible plants on a nearby moon. +12 rations.', 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          const heal = 6 + Math.floor(Math.random() * 6);
          this.gameState.update({ hull: Math.min(s.maxHull, s.hull + heal) });
          this.onEvent(`🔧 B'Elanna performed emergency repairs. Hull +${heal}%.`, 'success');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ torpedoes: s.torpedoes + 3 });
          this.onEvent('💥 Found materials to fabricate 3 photon torpedoes.', 'success');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ dilithium: s.dilithium + 9 });
          this.onEvent('💎 Discovered a dilithium deposit on an asteroid. +9 dilithium.', 'discovery');
        },
      },

      // Neutral / story events
      {
        weight: 3,
        fn: () => {
          this.onEvent('📡 Long-range sensors detect a faint Federation signal... it\'s too far to trace.', 'story');
          const s = this.gameState.getState();
          this.gameState.update({ morale: Math.min(100, s.morale + 2) });
        },
      },
      {
        weight: 2,
        fn: () => {
          this.onEvent('🌀 Passed through a region of subspace turbulence. Shields fluctuated briefly.', 'story');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ morale: Math.min(100, s.morale + 5) });
          this.onEvent('🎵 The Doctor performed an opera recital. Crew morale improved.', 'story');
        },
      },
      {
        weight: 2,
        fn: () => {
          this.onEvent('🔭 Seven of Nine identified a stellar phenomenon. Catalogued for analysis.', 'discovery');
        },
      },
      {
        weight: 1,
        fn: () => {
          this.onEvent('👽 Encountered a friendly trader. "Peace to you, travelers."', 'story');
          const s = this.gameState.getState();
          if (s.dilithium >= 10) {
            this.gameState.update({
              dilithium: s.dilithium - 10,
              deuterium: s.deuterium + 15,
              replicatorRations: s.replicatorRations + 9,
            });
            this.onEvent('💱 Traded 10 dilithium for supplies. +15 deuterium, +9 rations.', 'success');
          }
        },
      },

      // Negative events (~30% more severe)
      {
        weight: 2,
        fn: () => {
          const dmg = 7 + Math.floor(Math.random() * 13);
          const s = this.gameState.getState();
          this.gameState.update({ hull: s.hull - dmg });
          this.onEvent(`☄️ Micro-meteorite impact! Hull damaged by ${dmg}%.`, 'combat');
        },
      },
      {
        weight: 2,
        fn: () => {
          const loss = 40 + Math.floor(Math.random() * 52);
          const s = this.gameState.getState();
          this.gameState.update({ energy: s.energy - loss });
          this.onEvent(`⚡ Energy drain from a subspace anomaly! -${loss} energy.`, 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ crew: Math.max(50, s.crew - 3), morale: s.morale - 7 });
          this.onEvent('💀 Away team encountered hostile lifeforms. 3 crew lost.', 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ bioNeural: Math.max(0, s.bioNeural - 4) });
          this.onEvent('🧠 Bio-neural gel pack failure! -4 bio-neural packs.', 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ morale: Math.max(0, s.morale - 10) });
          this.onEvent('😔 Crew is feeling the distance from home. Morale drops.', 'story');
        },
      },

      // Discovery events
      {
        weight: 1,
        fn: () => {
          this.onEvent('🌌 Discovered a binary star system! Catalogued for Starfleet records.', 'discovery');
          const s = this.gameState.getState();
          this.gameState.update({ morale: Math.min(100, s.morale + 3) });
        },
      },
      {
        weight: 1,
        fn: () => {
          this.onEvent('🪐 Scanned a Class Y demon planet. Extreme conditions detected.', 'discovery');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ shields: Math.min(s.maxShields, s.shields + 12) });
          this.onEvent('🛡️ Tuvok implemented new shield harmonics. Shields +12.', 'success');
        },
      },
    ];

    // Weighted random selection
    const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const event of events) {
      roll -= event.weight;
      if (roll <= 0) return event.fn;
    }
    return events[0].fn;
  }

  triggerAnomalyEvent(anomalyData) {
    const aType = anomalyData.anomalyType || 'spatial-rift';
    const state = this.gameState.getState();

    switch (aType) {
      case 'spatial-rift': {
        const energyLoss = 30 + Math.floor(Math.random() * 50);
        this.gameState.update({ energy: state.energy - energyLoss });
        this.onEvent(`🌀 Spatial rift destabilizes warp field! -${energyLoss} energy.`, 'combat');
        if (Math.random() < 0.3) {
          this.onEvent('🔬 Seven of Nine detected transwarp signatures in the rift.', 'discovery');
          this.gameState.update({ morale: Math.min(100, state.morale + 3) });
        }
        break;
      }
      case 'subspace-tear': {
        const shieldDmg = 15 + Math.floor(Math.random() * 20);
        this.gameState.update({ shields: state.shields - shieldDmg });
        this.onEvent(`🌀 Subspace tear emits radiation burst! Shields -${shieldDmg}.`, 'combat');
        break;
      }
      case 'graviton-surge': {
        const hullDmg = 5 + Math.floor(Math.random() * 8);
        this.gameState.update({ hull: state.hull - hullDmg });
        this.onEvent(`🌀 Graviton surge shakes the hull! -${hullDmg}% hull integrity.`, 'combat');
        break;
      }
      case 'quantum-flux': {
        // Positive or negative randomly
        if (Math.random() < 0.5) {
          const bonus = 10 + Math.floor(Math.random() * 20);
          this.gameState.update({ energy: state.energy + bonus });
          this.onEvent(`🌀 Quantum flux harmonic resonance detected! +${bonus} energy.`, 'success');
        } else {
          const loss = 5 + Math.floor(Math.random() * 10);
          this.gameState.update({ deuterium: state.deuterium - loss });
          this.onEvent(`🌀 Quantum flux destabilized deuterium tanks! -${loss} deuterium.`, 'combat');
        }
        break;
      }
      default: {
        this.onEvent(`🌀 Unknown anomaly type: ${aType}. Cataloguing for analysis.`, 'discovery');
        break;
      }
    }
  }

  formatResource(key) {
    const names = {
      dilithium: 'dilithium crystals',
      deuterium: 'deuterium',
      replicatorRations: 'replicator rations',
      bioNeural: 'bio-neural gel packs',
      torpedoes: 'photon torpedoes',
      energy: 'energy',
    };
    return names[key] || key;
  }
}

// Random events and encounters per system
export class EventSystem {
  constructor(gameState, sectorMap, combat, onEvent) {
    this.gameState = gameState;
    this.sectorMap = sectorMap;
    this.combat = combat;
    this.onEvent = onEvent;
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

    // Random events (1 in 3 chance if no combat)
    if (events.length === 0 || !events.some(e => e._isCombat)) {
      if (Math.random() < 0.4) {
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
          const amount = 5 + Math.floor(Math.random() * 10);
          const s = this.gameState.getState();
          this.gameState.update({ energy: s.energy + amount * 10 });
          this.onEvent(`⚡ Solar winds boost energy reserves. +${amount * 10} energy.`, 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ crew: s.crew + 3, morale: Math.min(100, s.morale + 5) });
          this.onEvent('👥 Rescued survivors from a damaged vessel. Crew +3, morale improved.', 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({
            replicatorRations: s.replicatorRations + 20,
            morale: Math.min(100, s.morale + 3),
          });
          this.onEvent('🍽️ Neelix discovered edible plants on a nearby moon. +20 rations.', 'success');
        },
      },
      {
        weight: 2,
        fn: () => {
          const s = this.gameState.getState();
          const heal = 10 + Math.floor(Math.random() * 10);
          this.gameState.update({ hull: Math.min(s.maxHull, s.hull + heal) });
          this.onEvent(`🔧 B'Elanna performed emergency repairs. Hull +${heal}%.`, 'success');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ torpedoes: s.torpedoes + 5 });
          this.onEvent('💥 Found materials to fabricate 5 photon torpedoes.', 'success');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ dilithium: s.dilithium + 15 });
          this.onEvent('💎 Discovered a dilithium deposit on an asteroid. +15 dilithium.', 'discovery');
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
              deuterium: s.deuterium + 25,
              replicatorRations: s.replicatorRations + 15,
            });
            this.onEvent('💱 Traded 10 dilithium for supplies. +25 deuterium, +15 rations.', 'success');
          }
        },
      },

      // Negative events
      {
        weight: 2,
        fn: () => {
          const dmg = 5 + Math.floor(Math.random() * 10);
          const s = this.gameState.getState();
          this.gameState.update({ hull: s.hull - dmg });
          this.onEvent(`☄️ Micro-meteorite impact! Hull damaged by ${dmg}%.`, 'combat');
        },
      },
      {
        weight: 2,
        fn: () => {
          const loss = 30 + Math.floor(Math.random() * 40);
          const s = this.gameState.getState();
          this.gameState.update({ energy: s.energy - loss });
          this.onEvent(`⚡ Energy drain from a subspace anomaly! -${loss} energy.`, 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ crew: Math.max(50, s.crew - 2), morale: s.morale - 5 });
          this.onEvent('💀 Away team encountered hostile lifeforms. 2 crew lost.', 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ bioNeural: Math.max(0, s.bioNeural - 3) });
          this.onEvent('🧠 Bio-neural gel pack failure! -3 bio-neural packs.', 'combat');
        },
      },
      {
        weight: 1,
        fn: () => {
          const s = this.gameState.getState();
          this.gameState.update({ morale: Math.max(0, s.morale - 8) });
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
          this.gameState.update({ shields: Math.min(s.maxShields, s.shields + 20) });
          this.onEvent('🛡️ Tuvok implemented new shield harmonics. Shields +20.', 'success');
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

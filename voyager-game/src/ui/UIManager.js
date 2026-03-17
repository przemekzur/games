// UI Manager — builds and updates all DOM-based UI elements
export class UIManager {
  constructor(gameState, sectorMap, storyEngine) {
    this.gameState = gameState;
    this.sectorMap = sectorMap;
    this.storyEngine = storyEngine;
    this.layer = document.getElementById('ui-layer');
    this.isMapOpen = false;
    this.isShipyardOpen = false;
    this.eventLogEntries = [];
    this.onWarpRequest = null;
    this.onFirePhasers = null;
    this.onFireTorpedoes = null;
    this.onEvasive = null;
    this.onRedistributeShields = null;
    this.onFlee = null;
    this.dialogResolve = null;

    this.buildHUD();
    this.buildEventLog();
    this.buildAlertBanner();
    this.buildActionBar();
    this.buildCombatOverlay();
    this.buildMissionTracker();

    this.gameState.subscribe(s => this.updateHUD(s));

    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'm' && !this.isShipyardOpen) this.toggleMap();
      else if ((e.key.toLowerCase() === 'i' || e.key === 'Tab') && !this.isMapOpen) {
        e.preventDefault();
        this.toggleShipyard();
      }
    });
  }

  // ── HUD ──
  buildHUD() {
    this.hudTop = document.createElement('div');
    this.hudTop.className = 'hud-top';
    this.hudTop.innerHTML = `
      <div class="hud-section" id="hud-ship">
        <div class="hud-stat">
          <span class="label">Hull</span>
          <span class="value" id="hud-hull">100%</span>
          <div class="resource-bar"><div class="fill hull" id="hud-hull-bar" style="width:100%"></div></div>
        </div>
        <div class="hud-stat">
          <span class="label">Shields</span>
          <span class="value" id="hud-shields">100</span>
          <div class="resource-bar"><div class="fill shield" id="hud-shield-bar" style="width:100%"></div></div>
        </div>
        <div class="hud-stat">
          <span class="label">Energy</span>
          <span class="value" id="hud-energy">1000</span>
        </div>
      </div>
      <div class="hud-section">
        <div class="hud-stat">
          <span class="label">Crew</span>
          <span class="value" id="hud-crew">152</span>
        </div>
        <div class="hud-stat">
          <span class="label">Dilithium</span>
          <span class="value" id="hud-dilithium">80</span>
        </div>
        <div class="hud-stat">
          <span class="label">Deuterium</span>
          <span class="value" id="hud-deuterium">100</span>
        </div>
        <div class="hud-stat">
          <span class="label">Torpedoes</span>
          <span class="value" id="hud-torpedoes">38</span>
        </div>
      </div>
      <div class="hud-section">
        <div class="hud-stat">
          <span class="label">Stardate</span>
          <span class="value" id="hud-stardate">48315.0</span>
        </div>
        <div class="hud-stat">
          <span class="label">Distance</span>
          <span class="value" id="hud-distance">70,000 ly</span>
        </div>
        <div class="hud-stat">
          <span class="label">Morale</span>
          <span class="value" id="hud-morale">80</span>
        </div>
      </div>
    `;
    this.layer.appendChild(this.hudTop);
  }

  updateHUD(s) {
    const setVal = (id, val, danger, warn) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = val;
      el.classList.remove('danger', 'warning');
      if (danger) el.classList.add('danger');
      else if (warn) el.classList.add('warning');
    };

    setVal('hud-hull', `${Math.round(s.hull)}%`, s.hull < 25, s.hull < 50);
    setVal('hud-shields', Math.round(s.shields), s.shields < 20, s.shields < 50);
    setVal('hud-energy', Math.round(s.energy), s.energy < 100, s.energy < 300);
    setVal('hud-crew', s.crew, s.crew < 80);
    setVal('hud-dilithium', s.dilithium, s.dilithium < 10);
    setVal('hud-deuterium', Math.round(s.deuterium), s.deuterium < 15);
    setVal('hud-torpedoes', s.torpedoes, s.torpedoes < 5, s.torpedoes < 15);
    setVal('hud-stardate', this.gameState.getStardate());
    setVal('hud-distance', `${Math.round(s.distanceFromHome).toLocaleString()} ly`);
    setVal('hud-morale', s.morale, s.morale < 20, s.morale < 40);

    // Hull bar
    const hullBar = document.getElementById('hud-hull-bar');
    if (hullBar) {
      hullBar.style.width = `${(s.hull / s.maxHull) * 100}%`;
      hullBar.classList.toggle('danger', s.hull < 30);
    }
    const shieldBar = document.getElementById('hud-shield-bar');
    if (shieldBar) shieldBar.style.width = `${(s.shields / s.maxShields) * 100}%`;

    // Alert banner
    this.updateAlertBanner(s.alertStatus);

    // Combat overlay
    this.updateCombatOverlay(s);

    // Mission tracker
    this.updateMissionTracker();

    // HUD section alert styling
    const shipSection = document.getElementById('hud-ship');
    if (shipSection) {
      shipSection.classList.toggle('alert-red', s.alertStatus === 'red');
    }
  }

  // ── Alert Banner ──
  buildAlertBanner() {
    this.alertBanner = document.createElement('div');
    this.alertBanner.className = 'alert-banner';
    this.alertBanner.id = 'alert-banner';
    this.layer.appendChild(this.alertBanner);
  }

  updateAlertBanner(status) {
    this.alertBanner.classList.remove('red-alert', 'yellow-alert');
    if (status === 'red') {
      this.alertBanner.classList.add('red-alert');
      this.alertBanner.textContent = '⚠ RED ALERT ⚠';
    } else if (status === 'yellow') {
      this.alertBanner.classList.add('yellow-alert');
      this.alertBanner.textContent = 'YELLOW ALERT';
    } else {
      this.alertBanner.textContent = '';
    }
  }

  // ── Event Log ──
  buildEventLog() {
    this.eventLog = document.createElement('div');
    this.eventLog.className = 'event-log';
    this.layer.appendChild(this.eventLog);
  }

  logEvent(text, type = '') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = text;
    this.eventLog.appendChild(entry);
    this.eventLogEntries.push(entry);

    if (this.eventLogEntries.length > 50) {
      const old = this.eventLogEntries.shift();
      old.remove();
    }

    this.eventLog.scrollTop = this.eventLog.scrollHeight;
  }

  // ── Action Bar ──
  buildActionBar() {
    this.actionBar = document.createElement('div');
    this.actionBar.className = 'action-bar';
    this.actionBar.innerHTML = `
      <button class="ui-btn" id="btn-map">📍 SECTOR MAP (M)</button>
      <button class="ui-btn" id="btn-shipyard">🔧 SHIPYARD (I)</button>
      <button class="ui-btn" id="btn-scan">🔭 SCAN SYSTEM</button>
      <button class="ui-btn" id="btn-repair">🔨 REPAIR HULL</button>
      <button class="ui-btn" id="btn-recharge">⚡ RECHARGE</button>
    `;
    this.layer.appendChild(this.actionBar);

    this.actionBar.querySelector('#btn-map').onclick = () => this.toggleMap();
    this.actionBar.querySelector('#btn-shipyard').onclick = () => this.toggleShipyard();
    this.actionBar.querySelector('#btn-scan').onclick = () => this.scanSystem();
    this.actionBar.querySelector('#btn-repair').onclick = () => this.repairHull();
    this.actionBar.querySelector('#btn-recharge').onclick = () => this.rechargeEnergy();
  }

  scanSystem() {
    const system = this.sectorMap.getCurrentSystem();
    const state = this.gameState.getState();
    if (state.energy < 10) {
      this.logEvent('⚡ Insufficient energy for scan.', 'combat');
      return;
    }
    this.gameState.update({ energy: state.energy - 10 });
    this.logEvent(`🔭 Scanning ${system.name}...`, 'discovery');
    setTimeout(() => {
      this.logEvent(`   Region: ${system.region}`, 'discovery');
      this.logEvent(`   Threat Level: ${Math.round(system.threat * 100)}%`, system.threat > 0.5 ? 'combat' : 'discovery');
      if (system.hasStation) this.logEvent('   ⭐ Space station detected!', 'success');
      if (system.hasAnomaly) this.logEvent(`   🌀 Anomaly: ${system.anomalyType}`, 'discovery');
      const conns = system.connections.map(id => this.sectorMap.systems[id].name);
      this.logEvent(`   Warp routes: ${conns.join(', ')}`, 'discovery');
    }, 500);
  }

  repairHull() {
    const state = this.gameState.getState();
    if (state.inCombat) { this.logEvent('Cannot repair during combat!', 'combat'); return; }
    const cost = { dilithium: 5, energy: 50 };
    if (!this.gameState.canAfford(cost)) {
      this.logEvent('🔨 Need 5 dilithium and 50 energy for repairs.', 'combat');
      return;
    }
    this.gameState.spend(cost);
    const heal = 15 + this.gameState.getState().hullUpgrade * 3;
    const s = this.gameState.getState();
    this.gameState.update({ hull: Math.min(s.maxHull, s.hull + heal) });
    this.logEvent(`🔨 Hull repaired +${heal}%. Cost: 5 dilithium, 50 energy.`, 'success');
  }

  rechargeEnergy() {
    const state = this.gameState.getState();
    if (state.inCombat) { this.logEvent('Cannot recharge during combat!', 'combat'); return; }
    if (state.deuterium < 10) {
      this.logEvent('⚡ Need 10 deuterium for energy recharge.', 'combat');
      return;
    }
    this.gameState.update({
      deuterium: state.deuterium - 10,
      energy: Math.min(state.maxEnergy, state.energy + 200),
    });
    this.logEvent('⚡ Converted 10 deuterium to +200 energy.', 'success');
  }

  // ── Combat Overlay ──
  buildCombatOverlay() {
    this.combatOverlay = document.createElement('div');
    this.combatOverlay.className = 'combat-overlay';
    this.combatOverlay.style.display = 'none';
    this.combatOverlay.innerHTML = `
      <h3>⚔️ TACTICAL VIEW</h3>
      <div class="combat-enemy-info">
        <div class="combat-enemy-name" id="combat-enemy-name">Unknown Vessel</div>
        <div style="font-size:0.7rem;color:#aaa;margin-bottom:6px" id="combat-enemy-type"></div>
        <div style="font-size:0.7rem;color:#ff8888">SHIELDS</div>
        <div class="combat-bar"><div class="fill enemy-shield" id="combat-enemy-shield" style="width:100%"></div></div>
        <div style="font-size:0.7rem;color:#ff4444;margin-top:6px">HULL</div>
        <div class="combat-bar"><div class="fill enemy-hull" id="combat-enemy-hull" style="width:100%"></div></div>
      </div>
      <div class="combat-buttons">
        <button class="ui-btn danger" id="btn-phasers">⚡ PHASERS</button>
        <button class="ui-btn danger" id="btn-torpedoes">💥 TORPEDO</button>
        <button class="ui-btn" id="btn-evasive">🔄 EVASIVE</button>
        <button class="ui-btn" id="btn-shields">🛡️ SHIELDS</button>
        <button class="ui-btn" id="btn-flee" style="grid-column: span 2">🚀 FLEE</button>
      </div>
    `;
    this.layer.appendChild(this.combatOverlay);

    this.combatOverlay.querySelector('#btn-phasers').onclick = () => this.onFirePhasers?.();
    this.combatOverlay.querySelector('#btn-torpedoes').onclick = () => this.onFireTorpedoes?.();
    this.combatOverlay.querySelector('#btn-evasive').onclick = () => this.onEvasive?.();
    this.combatOverlay.querySelector('#btn-shields').onclick = () => this.onRedistributeShields?.();
    this.combatOverlay.querySelector('#btn-flee').onclick = () => this.onFlee?.();
  }

  updateCombatOverlay(s) {
    if (s.inCombat) {
      this.combatOverlay.style.display = '';
      document.getElementById('combat-enemy-name').textContent = s.enemyName;
      document.getElementById('combat-enemy-type').textContent = s.enemyType || '';
      const shieldPct = s.enemyMaxShields > 0 ? (s.enemyShields / s.enemyMaxShields) * 100 : 0;
      document.getElementById('combat-enemy-shield').style.width = `${shieldPct}%`;
      const hullPct = (s.enemyHull / s.enemyMaxHull) * 100;
      document.getElementById('combat-enemy-hull').style.width = `${hullPct}%`;
    } else {
      this.combatOverlay.style.display = 'none';
    }
  }

  // ── Mission Tracker ──
  buildMissionTracker() {
    this.missionTracker = document.createElement('div');
    this.missionTracker.className = 'mission-tracker';
    this.layer.appendChild(this.missionTracker);
  }

  updateMissionTracker() {
    const { objectives } = this.storyEngine.checkObjectives();
    const chapter = this.storyEngine.getCurrentChapter();
    if (!chapter) return;

    let html = `<div class="mission-item active"><div class="mission-label">Chapter ${chapter.id + 1}</div>
      <div class="mission-text" style="color:var(--lcars-gold);font-weight:bold">${chapter.title}</div></div>`;
    for (const obj of objectives) {
      html += `<div class="mission-item ${obj.complete ? 'complete' : ''}">
        <div class="mission-label">${obj.complete ? '✅' : '⬜'} Objective</div>
        <div class="mission-text">${obj.text}</div>
      </div>`;
    }
    this.missionTracker.innerHTML = html;
  }

  // ── Sector Map ──
  toggleMap() {
    if (this.gameState.getState().inCombat) {
      this.logEvent('Cannot open map during combat!', 'combat');
      return;
    }
    this.isMapOpen = !this.isMapOpen;
    if (this.isMapOpen) this.showMap();
    else this.hideMap();
  }

  showMap() {
    if (this.mapOverlay) this.mapOverlay.remove();
    this.mapOverlay = document.createElement('div');
    this.mapOverlay.className = 'map-overlay';

    const container = document.createElement('div');
    container.className = 'map-container';

    const title = document.createElement('div');
    title.className = 'map-title';
    title.textContent = 'Delta Quadrant — Sector Map';
    container.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ui-btn';
    closeBtn.style.cssText = 'position:absolute;top:16px;right:16px;z-index:100;';
    closeBtn.textContent = '✕ CLOSE';
    closeBtn.onclick = () => this.toggleMap();
    container.appendChild(closeBtn);

    // Draw connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');

    const state = this.gameState.getState();
    const currentSys = this.sectorMap.systems[state.currentSystemId];
    const drawnEdges = new Set();

    for (const sys of this.sectorMap.systems) {
      for (const connId of sys.connections) {
        const edgeKey = [Math.min(sys.id, connId), Math.max(sys.id, connId)].join('-');
        if (drawnEdges.has(edgeKey)) continue;
        drawnEdges.add(edgeKey);
        const target = this.sectorMap.systems[connId];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sys.x);
        line.setAttribute('y1', sys.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);

        const isConnected = sys.id === state.currentSystemId || connId === state.currentSystemId;
        line.setAttribute('stroke', isConnected ? 'rgba(0,255,255,0.5)' : 'rgba(100,120,140,0.2)');
        line.setAttribute('stroke-width', isConnected ? '0.3' : '0.15');
        svg.appendChild(line);
      }
    }
    container.appendChild(svg);

    // Draw nodes
    for (const sys of this.sectorMap.systems) {
      const node = document.createElement('div');
      const isCurrent = sys.id === state.currentSystemId;
      const isVisited = state.visitedSystems.has(sys.id);
      const isConnected = currentSys.connections.includes(sys.id);

      let cls = 'map-node';
      if (isCurrent) cls += ' current';
      else if (isConnected) cls += ' connected';
      else if (isVisited) cls += ' visited';
      else cls += ' unexplored';
      if (sys.threat > 0.7 && !isCurrent) cls += ' hostile';

      node.className = cls;
      node.style.left = `${sys.x}%`;
      node.style.top = `${sys.y}%`;

      const label = document.createElement('div');
      label.className = 'map-node-label';
      label.textContent = sys.name;
      node.appendChild(label);

      if (isConnected && !isCurrent) {
        node.onclick = () => {
          this.hideMap();
          this.isMapOpen = false;
          this.onWarpRequest?.(sys.id);
        };
        node.title = `Warp to ${sys.name} (Threat: ${Math.round(sys.threat * 100)}%)`;
      }

      container.appendChild(node);
    }

    // Legend
    const legend = document.createElement('div');
    legend.className = 'map-legend';
    legend.innerHTML = `
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--lcars-green)"></div>Current</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--lcars-teal)"></div>Reachable</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--lcars-blue)"></div>Visited</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--lcars-red)"></div>Hostile</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:#334"></div>Unexplored</div>
    `;
    container.appendChild(legend);

    // System info panel
    const info = document.createElement('div');
    info.style.cssText = 'position:absolute;bottom:16px;right:16px;max-width:300px;background:var(--panel-bg);border:1px solid var(--panel-border);padding:12px;border-radius:4px;font-size:0.8rem;';
    info.innerHTML = `<div style="color:var(--lcars-green);font-family:var(--font-display);font-size:0.9rem;margin-bottom:6px">${currentSys.name}</div>
      <div style="color:var(--text-dim)">${currentSys.desc}</div>
      <div style="margin-top:8px;color:var(--lcars-orange)">Systems visited: ${state.visitedSystems.size} / ${this.sectorMap.systems.length}</div>`;
    container.appendChild(info);

    this.mapOverlay.appendChild(container);
    this.layer.appendChild(this.mapOverlay);
  }

  hideMap() {
    if (this.mapOverlay) {
      this.mapOverlay.remove();
      this.mapOverlay = null;
    }
  }

  // ── Shipyard ──
  toggleShipyard() {
    if (this.gameState.getState().inCombat) {
      this.logEvent('Cannot access shipyard during combat!', 'combat');
      return;
    }
    this.isShipyardOpen = !this.isShipyardOpen;
    if (this.isShipyardOpen) this.showShipyard();
    else this.hideShipyard();
  }

  showShipyard() {
    if (this.shipyardOverlay) this.shipyardOverlay.remove();
    this.shipyardOverlay = document.createElement('div');
    this.shipyardOverlay.className = 'shipyard-overlay';

    const state = this.gameState.getState();
    const upgrades = [
      {
        name: 'Hull Plating', desc: 'Reinforce hull integrity. +20 max hull per level.',
        level: state.hullUpgrade, maxLevel: 5,
        cost: { dilithium: 15 + state.hullUpgrade * 10 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({
            hullUpgrade: s.hullUpgrade + 1,
            maxHull: s.maxHull + 20,
            hull: s.hull + 20,
          });
        },
      },
      {
        name: 'Shield Generator', desc: 'Enhance shield capacity. +25 max shields per level.',
        level: state.shieldUpgrade, maxLevel: 5,
        cost: { dilithium: 15 + state.shieldUpgrade * 10, bioNeural: 3 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({
            shieldUpgrade: s.shieldUpgrade + 1,
            maxShields: s.maxShields + 25,
            shields: s.shields + 25,
          });
        },
      },
      {
        name: 'Phaser Array', desc: 'Increase weapon damage. +3 base phaser damage per level.',
        level: state.weaponUpgrade, maxLevel: 5,
        cost: { dilithium: 20 + state.weaponUpgrade * 12 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({ weaponUpgrade: s.weaponUpgrade + 1 });
        },
      },
      {
        name: 'Warp Coils', desc: 'Reduce warp energy cost. -3 energy per warp per level.',
        level: state.engineUpgrade, maxLevel: 5,
        cost: { dilithium: 12 + state.engineUpgrade * 8, deuterium: 15 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({ engineUpgrade: s.engineUpgrade + 1 });
        },
      },
      {
        name: 'Sensor Array', desc: 'Improve weapon accuracy. +5% hit chance per level.',
        level: state.sensorUpgrade, maxLevel: 5,
        cost: { dilithium: 10 + state.sensorUpgrade * 8, bioNeural: 2 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({ sensorUpgrade: s.sensorUpgrade + 1 });
        },
      },
      {
        name: 'Torpedo Bay', desc: 'Fabricate 10 photon torpedoes.',
        level: 0, maxLevel: 99,
        cost: { dilithium: 8, deuterium: 10 },
        effect: () => {
          const s = this.gameState.getState();
          this.gameState.update({ torpedoes: s.torpedoes + 10 });
        },
      },
    ];

    const panel = document.createElement('div');
    panel.className = 'shipyard-panel';
    panel.innerHTML = '<h2>🔧 SHIPYARD & UPGRADES</h2>';

    // Resources display
    const resDisplay = document.createElement('div');
    resDisplay.style.cssText = 'display:flex;justify-content:center;gap:20px;margin-bottom:16px;font-size:0.8rem;';
    resDisplay.innerHTML = `
      <span>💎 Dilithium: <b style="color:var(--lcars-teal)">${state.dilithium}</b></span>
      <span>⛽ Deuterium: <b style="color:var(--lcars-teal)">${Math.round(state.deuterium)}</b></span>
      <span>🧠 Bio-Neural: <b style="color:var(--lcars-teal)">${state.bioNeural}</b></span>
    `;
    panel.appendChild(resDisplay);

    const grid = document.createElement('div');
    grid.className = 'upgrade-grid';

    for (const up of upgrades) {
      const card = document.createElement('div');
      const canAfford = this.gameState.canAfford(up.cost) && up.level < up.maxLevel;
      card.className = `upgrade-card ${canAfford ? '' : 'locked'}`;
      const costText = Object.entries(up.cost).map(([k, v]) => `${v} ${k}`).join(', ');
      card.innerHTML = `
        <div class="upgrade-name">${up.name} ${up.maxLevel < 99 ? `(Lv ${up.level}/${up.maxLevel})` : ''}</div>
        <div class="upgrade-desc">${up.desc}</div>
        <div class="upgrade-cost">Cost: ${costText}</div>
      `;
      if (canAfford) {
        card.onclick = () => {
          this.gameState.spend(up.cost);
          up.effect();
          this.logEvent(`🔧 Upgraded: ${up.name}`, 'success');
          this.hideShipyard();
          this.isShipyardOpen = true;
          this.showShipyard();
        };
      }
      grid.appendChild(card);
    }

    panel.appendChild(grid);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ui-btn';
    closeBtn.style.cssText = 'margin-top:16px;width:100%;';
    closeBtn.textContent = '✕ CLOSE';
    closeBtn.onclick = () => this.toggleShipyard();
    panel.appendChild(closeBtn);

    this.shipyardOverlay.appendChild(panel);
    this.layer.appendChild(this.shipyardOverlay);
  }

  hideShipyard() {
    if (this.shipyardOverlay) {
      this.shipyardOverlay.remove();
      this.shipyardOverlay = null;
    }
  }

  // ── Story Dialog ──
  showDialog(sequence, index = 0) {
    return new Promise((resolve) => {
      if (index >= sequence.length) { resolve(); return; }
      const step = sequence[index];

      if (this.dialogOverlay) this.dialogOverlay.remove();
      this.dialogOverlay = document.createElement('div');
      this.dialogOverlay.className = 'dialog-overlay';

      const box = document.createElement('div');
      box.className = 'dialog-box';
      box.innerHTML = `
        <div class="dialog-portrait">${step.portrait || '👤'}</div>
        <div class="dialog-content">
          <div class="dialog-speaker">${step.speaker}</div>
          <div class="dialog-text">${step.text}</div>
          <div class="dialog-choices"></div>
        </div>
      `;

      const choicesDiv = box.querySelector('.dialog-choices');
      for (const choice of step.choices) {
        const btn = document.createElement('button');
        btn.className = 'dialog-choice';
        btn.textContent = `▸ ${choice.text}`;
        btn.onclick = () => {
          // Apply effects
          if (choice.effect) {
            const state = this.gameState.getState();
            const changes = {};
            for (const [key, val] of Object.entries(choice.effect)) {
              changes[key] = (state[key] || 0) + val;
            }
            this.gameState.update(changes);
          }
          this.dialogOverlay.remove();
          this.dialogOverlay = null;
          if (choice.next === -1 || choice.next >= sequence.length) resolve();
          else this.showDialog(sequence, choice.next).then(resolve);
        };
        choicesDiv.appendChild(btn);
      }

      this.dialogOverlay.appendChild(box);
      this.layer.appendChild(this.dialogOverlay);
    });
  }

  // ── Cinematic ──
  async showCinematic(chapter) {
    const overlay = document.getElementById('cinematic-overlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = '';

    // Chapter label
    const chapterLabel = document.createElement('div');
    chapterLabel.className = 'cinematic-chapter';
    chapterLabel.textContent = `Chapter ${chapter.id + 1}`;
    overlay.appendChild(chapterLabel);

    // Title
    const titleEl = document.createElement('div');
    titleEl.className = 'cinematic-title';
    titleEl.textContent = chapter.title;
    overlay.appendChild(titleEl);

    // Subtitle
    const subEl = document.createElement('div');
    subEl.className = 'cinematic-text';
    subEl.style.fontSize = '0.9rem';
    subEl.style.color = 'var(--text-dim)';
    subEl.style.marginBottom = '30px';
    subEl.textContent = chapter.subtitle;
    overlay.appendChild(subEl);

    // Intro text
    for (let i = 0; i < chapter.intro.length; i++) {
      const p = document.createElement('div');
      p.className = 'cinematic-text';
      p.style.animationDelay = `${1 + i * 1.5}s`;
      p.textContent = chapter.intro[i];
      overlay.appendChild(p);
    }

    // Skip button
    const skip = document.createElement('div');
    skip.className = 'cinematic-skip';
    skip.textContent = 'Press any key to continue...';
    overlay.appendChild(skip);

    return new Promise((resolve) => {
      const totalTime = 2000 + chapter.intro.length * 1500;
      let timer = setTimeout(() => {
        overlay.classList.add('hidden');
        resolve();
      }, totalTime + 2000);

      const handler = () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handler);
        window.removeEventListener('click', handler);
        overlay.classList.add('hidden');
        resolve();
      };
      setTimeout(() => {
        window.addEventListener('keydown', handler, { once: true });
        window.addEventListener('click', handler, { once: true });
      }, 1000);
    });
  }

  // ── Warp Effect ──
  async showWarpEffect(systemName) {
    const overlay = document.createElement('div');
    overlay.className = 'warp-overlay';
    overlay.innerHTML = `
      <div class="warp-flash"></div>
      <div class="warp-streaks"></div>
    `;
    document.body.appendChild(overlay);

    await new Promise(r => setTimeout(r, 1200));
    overlay.remove();
  }

  // ── Notification ──
  showNotification(text) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = text;
    this.layer.appendChild(notif);
    setTimeout(() => notif.remove(), 3500);
  }

  // ── Victory Screen ──
  showVictory() {
    const overlay = document.getElementById('cinematic-overlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = '';
    overlay.style.background = 'radial-gradient(ellipse at center, #001428, #000)';

    const content = document.createElement('div');
    content.style.cssText = 'text-align:center;';
    content.innerHTML = `
      <div class="cinematic-chapter">MISSION COMPLETE</div>
      <div class="cinematic-title" style="animation-delay:0.5s">Welcome Home, Voyager</div>
      <div class="cinematic-text" style="animation-delay:1s;max-width:600px">
        After years of travel across the Delta Quadrant, the USS Voyager has finally returned to the Alpha Quadrant.
        The crew's courage, ingenuity, and determination brought them home against impossible odds.
      </div>
      <div class="cinematic-text" style="animation-delay:2.5s;color:var(--lcars-teal)">
        "We did it."<br>— Captain Kathryn Janeway
      </div>
    `;
    overlay.appendChild(content);
  }
}

// ============================================================================
//  Input — selection, orders, building placement, control groups, hotkeys.
//  Produces sim commands and queues them through the lockstep scheduler.
//  Selection is client-side only (never part of the deterministic sim).
// ============================================================================
import { UNITS, BUILDINGS, WORKER_BUILD_MENU, TILE, defOf } from './config.js';
import { worldToCell } from './pathfinding.js';

const HOT = { hq: 'C', depot: 'D', barracks: 'B', factory: 'V', refinery: 'R', turret: 'T' };
const PROD_HOT = { worker: 'W', trooper: 'E', striker: 'R', tank: 'T' };

export class Input {
  constructor({ renderer, sim, hud, lockstep, localPlayer, audio }) {
    this.r = renderer; this.sim = sim; this.hud = hud; this.ls = lockstep;
    this.me = localPlayer; this.audio = audio;
    this.selection = new Set();
    this.groups = new Map();
    this.mode = 'normal';       // 'normal' | 'place' | 'attackmove'
    this.placeKind = null;
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, inWindow: true };
    this.drag = null;
    this.boxEl = null;
  }

  cmd(c) { this.ls.queue(c); }

  attach() {
    const dom = this.r.renderer.domElement;
    this.boxEl = document.getElementById('sel-box');

    dom.addEventListener('contextmenu', (e) => e.preventDefault());
    dom.addEventListener('mousedown', (e) => this._down(e));
    addEventListener('mousemove', (e) => this._move(e));
    addEventListener('mouseup', (e) => this._up(e));
    dom.addEventListener('wheel', (e) => { e.preventDefault(); this.r.zoomBy(e.deltaY * 0.05); }, { passive: false });
    addEventListener('keydown', (e) => this._key(e, true));
    addEventListener('keyup', (e) => this._key(e, false));
    dom.addEventListener('dblclick', (e) => this._dbl(e));

    this.hud.onAction = (id, payload) => this._action(id, payload);
    this.hud.onMinimap = (x, z, btn) => {
      if (btn === 2) this._issueAt(x, z, false);
      else this.r.focusOn(x, z);
    };
  }

  // ----- mouse -------------------------------------------------------------
  _down(e) {
    this.mouse.x = e.clientX; this.mouse.y = e.clientY;
    if (e.button === 0) {                                   // left: select / place / box
      if (this.mode === 'place') { this._tryPlace(); return; }
      if (this.mode === 'attackmove') { const g = this.r.screenToGround(e.clientX, e.clientY); if (g) this._issueAttackMove(g.x, g.z); this.mode = 'normal'; return; }
      this.drag = { x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY, moved: false, additive: e.shiftKey };
    } else if (e.button === 1) {                            // middle: pan the map (grab & drag)
      e.preventDefault();
      this.cam = { mode: 'pan', x: e.clientX, y: e.clientY };
    } else if (e.button === 2) {                            // right: click = order, drag = rotate
      if (this.mode === 'place' || this.mode === 'attackmove') { this.mode = 'normal'; this.r.clearPlacement(); return; }
      this.cam = { mode: 'rotate', x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, moved: false, shift: e.shiftKey };
    }
  }

  _move(e) {
    const px = e.clientX, py = e.clientY;
    if (this.cam) {
      const dx = px - this.cam.x, dy = py - this.cam.y;
      if (this.cam.mode === 'pan') {
        const k = this.r.camDist / 620;
        this.r.panBy(-dx * k, dy * k);
      } else if (this.cam.mode === 'rotate') {
        if (Math.abs(px - this.cam.x0) + Math.abs(py - this.cam.y0) > 4) this.cam.moved = true;
        if (this.cam.moved) { this.r.rotateBy(-dx * 0.006); this.r.pitchBy(-dy * 0.005); }
      }
      this.cam.x = px; this.cam.y = py;
    }
    this.mouse.x = px; this.mouse.y = py;
    if (this.drag) {
      this.drag.x1 = px; this.drag.y1 = py;
      if (Math.abs(px - this.drag.x0) + Math.abs(py - this.drag.y0) > 5) this.drag.moved = true;
      if (this.drag.moved && this.boxEl) {
        const x = Math.min(this.drag.x0, px), y = Math.min(this.drag.y0, py);
        this.boxEl.style.display = 'block';
        this.boxEl.style.left = x + 'px'; this.boxEl.style.top = y + 'px';
        this.boxEl.style.width = Math.abs(px - this.drag.x0) + 'px';
        this.boxEl.style.height = Math.abs(py - this.drag.y0) + 'px';
      }
    }
  }

  _up(e) {
    if (e.button === 1 && this.cam && this.cam.mode === 'pan') { this.cam = null; return; }
    if (e.button === 2 && this.cam && this.cam.mode === 'rotate') {
      const c = this.cam; this.cam = null;
      if (!c.moved) { const g = this.r.screenToGround(e.clientX, e.clientY); if (g) this._issueAt(g.x, g.z, c.shift); }
      return;
    }
    if (e.button !== 0 || !this.drag) return;
    if (this.boxEl) this.boxEl.style.display = 'none';
    const d = this.drag; this.drag = null;
    if (d.moved) {
      const ids = this.r.ownUnitsInRect(d.x0, d.y0, d.x1, d.y1);
      if (ids.length) this._setSelection(ids, d.additive);
    } else {
      const eid = this.r.pickEntity(e.clientX, e.clientY);
      if (eid != null) this._setSelection([eid], d.additive);
      else if (!d.additive) this._setSelection([], false);
    }
  }

  _dbl(e) {
    const eid = this.r.pickEntity(e.clientX, e.clientY);
    if (eid == null) return;
    const ent = this.sim.byId.get(eid);
    if (!ent || ent.owner !== this.me || ent.etype !== 'unit') return;
    // select all of same kind on screen
    const ids = [];
    for (const u of this.sim.units) {
      if (u.owner !== this.me || u.kind !== ent.kind) continue;
      const s = this.r.worldToScreen(u.x, u.z, 1);
      if (s.visible && s.x >= 0 && s.x <= innerWidth && s.y >= 0 && s.y <= innerHeight) ids.push(u.id);
    }
    this._setSelection(ids, false);
  }

  // ----- selection ---------------------------------------------------------
  _setSelection(ids, additive) {
    if (!additive) this.selection.clear();
    // prefer own units when a mix is boxed
    const own = ids.filter(id => { const e = this.sim.byId.get(id); return e && e.owner === this.me; });
    const use = own.length ? own : ids.slice(0, 1);
    for (const id of use) this.selection.add(id);
    this._validateSelection();
    if (this.selection.size) this.audio.playSound('select');
    this.r.setSelection(this.selection);
  }
  _validateSelection() {
    for (const id of [...this.selection]) if (!this.sim.byId.get(id)) this.selection.delete(id);
  }
  _ownUnits() { return [...this.selection].map(id => this.sim.byId.get(id)).filter(e => e && e.etype === 'unit' && e.owner === this.me); }
  _ownWorkers() { return this._ownUnits().filter(u => u.def.canGather); }
  _ownBuildings() { return [...this.selection].map(id => this.sim.byId.get(id)).filter(e => e && e.etype === 'building' && e.owner === this.me); }

  // ----- orders ------------------------------------------------------------
  _issueAt(x, z, queue) {
    const units = this._ownUnits();
    if (!units.length) {
      // building(s) selected -> set rally
      const bs = this._ownBuildings();
      if (bs.length) { for (const b of bs) this.cmd({ type: 'rally', building: b.id, x, z }); this.audio.playSound('ui'); this.hud.alert('Rally point set'); }
      return;
    }
    const ids = units.map(u => u.id);
    // what's under the click?
    const eid = this.r.pickEntity(this.mouse.x, this.mouse.y);
    const target = eid != null ? this.sim.byId.get(eid) : null;
    const workers = this._ownWorkers();

    // Resolve a harvest target: a mineral field, a geyser, or our own refinery
    // (a refinery sits on top of its geyser, so a click there should re-task to gas).
    let harvest = null;
    if (target && target.etype === 'resource') harvest = target;
    else if (target && target.etype === 'building' && target.owner === this.me && target.kind === 'refinery' && !target.building)
      harvest = this.sim.byId.get(target.gasNode);

    if (harvest && workers.length) {
      if (harvest.kind === 'gas') {
        const hasRef = this.sim.buildings.some(b => b.kind === 'refinery' && b.gasNode === harvest.id && !b.building && b.owner === this.me);
        if (!hasRef) { this.hud.alert('Build a Refinery on the geyser to mine gas  (press R)', 'warn'); this.audio.playSound('error'); return; }
      }
      this.cmd({ type: 'gather', units: workers.map(u => u.id), target: harvest.id });
      this.audio.playSound('move');
      return;
    }
    if (target && target.owner >= 0 && target.owner !== this.me) {
      this.cmd({ type: 'attack', units: ids, target: target.id });
      this.audio.playSound('attack');
      return;
    }
    this.cmd({ type: 'move', units: ids, x, z });
    this.audio.playSound('move');
    this.r.pingMove(x, z);
  }

  _issueAttackMove(x, z) {
    const ids = this._ownUnits().map(u => u.id);
    if (!ids.length) return;
    this.cmd({ type: 'attackmove', units: ids, x, z });
    this.audio.playSound('attack');
  }

  // ----- building placement ------------------------------------------------
  _startPlace(kind) {
    if (!this._ownWorkers().length) { this.hud.alert('Select a worker first', 'bad'); this.audio.playSound('error'); return; }
    const def = BUILDINGS[kind];
    const p = this.sim.players[this.me];
    if (p.minerals < def.cost.minerals || p.gas < def.cost.gas) { this.hud.alert('Not enough resources', 'bad'); this.audio.playSound('error'); return; }
    this.mode = 'place'; this.placeKind = kind;
  }
  _tryPlace() {
    const def = BUILDINGS[this.placeKind];
    const g = this.r.screenToGround(this.mouse.x, this.mouse.y);
    if (!g) return;
    const workers = this._ownWorkers();
    if (!workers.length) { this.mode = 'normal'; this.r.clearPlacement(); return; }
    const builder = workers.reduce((a, b) => (a && this._d2(a, g) < this._d2(b, g) ? a : b));
    if (def.onGeyser) {
      const eid = this.r.pickEntity(this.mouse.x, this.mouse.y);
      const t = eid != null ? this.sim.byId.get(eid) : null;
      if (!t || t.kind !== 'gas') { this.hud.alert('Build refinery on a geyser', 'bad'); this.audio.playSound('error'); return; }
      this.cmd({ type: 'build', unit: builder.id, building: 'refinery', target: t.id });
    } else {
      let [cx, cz] = worldToCell(g.x, g.z);
      cx -= (def.footprint - 1) >> 1; cz -= (def.footprint - 1) >> 1;
      const place = this.sim.canPlace(this.placeKind, cx, cz);
      if (!place.ok) { this.hud.alert(place.reason, 'bad'); this.audio.playSound('error'); return; }
      this.cmd({ type: 'build', unit: builder.id, building: this.placeKind, cx, cz });
    }
    this.audio.playSound('build');
    if (!this.keys.has('shift')) { this.mode = 'normal'; this.r.clearPlacement(); }
  }
  _d2(u, g) { const dx = u.x - g.x, dz = u.z - g.z; return dx * dx + dz * dz; }

  // ----- command card actions ----------------------------------------------
  _action(id, payload) {
    if (id.startsWith('build:')) { this._startPlace(id.slice(6)); return; }
    if (id.startsWith('produce:')) {
      const kind = id.slice(8);
      const b = this._ownBuildings().find(b => b.def.produces && b.def.produces.includes(kind));
      if (b) { this.cmd({ type: 'produce', building: b.id, unit: kind }); this.audio.playSound('ui'); }
      return;
    }
    if (id === 'stop') { this.cmd({ type: 'stop', units: this._ownUnits().map(u => u.id) }); return; }
    if (id === 'attackmove') { this.mode = 'attackmove'; this.hud.alert('Select target location'); return; }
    if (id === 'cancel') { const b = this._ownBuildings().find(b => b.queue && b.queue.length); if (b) { this.cmd({ type: 'cancel', building: b.id }); this.audio.playSound('error'); } return; }
  }

  // ----- keyboard ----------------------------------------------------------
  _key(e, down) {
    const k = e.key.toLowerCase();
    if (down) this.keys.add(k); else { this.keys.delete(k); return; }
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;

    if (k === 'escape') { this.mode = 'normal'; this.r.clearPlacement(); return; }
    if (k === 'shift') return;

    // control groups
    if (/^[0-9]$/.test(k)) {
      if (e.ctrlKey || e.metaKey) { this.groups.set(k, new Set(this.selection)); this.hud.alert('Group ' + k + ' set'); }
      else { const g = this.groups.get(k); if (g) { this._setSelection([...g], false); } }
      return;
    }

    // contextual hotkeys from the current command card
    const action = this._cardActions().find(a => a && a.hot && a.hot.toLowerCase() === k && !a.disabled);
    if (action) { this._action(action.id, action.payload); return; }

    // global combat keys
    if (k === 'a' && this._ownUnits().some(u => u.def.role === 'combat')) { this.mode = 'attackmove'; this.hud.alert('Attack-move: pick location'); }
    else if (k === 's') { this.cmd({ type: 'stop', units: this._ownUnits().map(u => u.id) }); }
    else if (k === 'f') { const u = this._ownUnits()[0] || this._ownBuildings()[0]; if (u) this.r.focusOn(u.x, u.z); }
  }

  // ----- per-frame ---------------------------------------------------------
  update(dt) {
    this._validateSelection();
    // edge / key panning
    const sp = 60 * dt * (this.r.camDist / 60);
    if (this.keys.has('arrowleft') || this.keys.has('a') && false) {}
    let px = 0, pz = 0;                                  // px = screen-right, pz = into-screen
    if (this.keys.has('arrowleft')) px -= sp;
    if (this.keys.has('arrowright')) px += sp;
    if (this.keys.has('arrowup')) pz += sp;
    if (this.keys.has('arrowdown')) pz -= sp;
    const m = this.mouse, edge = 6;
    if (m.x <= edge) px -= sp; else if (m.x >= innerWidth - edge) px += sp;
    if (m.y <= edge) pz += sp; else if (m.y >= innerHeight - edge) pz -= sp;
    if (this.keys.has('q')) this.r.rotateBy(dt * 1.2);
    if (this.keys.has('e')) this.r.rotateBy(-dt * 1.2);
    if (px || pz) this.r.panBy(px, pz);

    // placement ghost
    if (this.mode === 'place') {
      const g = this.r.screenToGround(m.x, m.y);
      if (g) {
        const def = BUILDINGS[this.placeKind];
        let [cx, cz] = worldToCell(g.x, g.z);
        cx -= (def.footprint - 1) >> 1; cz -= (def.footprint - 1) >> 1;
        const center = { x: (cx + def.footprint / 2) * TILE, z: (cz + def.footprint / 2) * TILE };
        const valid = def.onGeyser ? true : this.sim.canPlace(this.placeKind, cx, cz).ok;
        this.r.setPlacement(this.placeKind, cx, cz, def.footprint, center.x, center.z, valid);
      }
    }

    // refresh HUD selection + command card
    this._refreshHud();
  }

  _cardActions() {
    const actions = new Array(12).fill(null);
    const workers = this._ownWorkers();
    const builds = this._ownBuildings();
    const p = this.sim.players[this.me];
    const afford = (def) => p.minerals >= def.cost.minerals && p.gas >= def.cost.gas;

    if (builds.length && !this._ownUnits().length) {
      // production card from the first producer
      const prod = builds.find(b => b.def.produces && !b.building);
      if (prod) {
        let i = 0;
        for (const kind of prod.def.produces) {
          const def = UNITS[kind];
          actions[i++] = { id: 'produce:' + kind, label: def.name, name: 'Train ' + def.name, hot: PROD_HOT[kind], cost: def.cost, disabled: !afford(def), tip: `Supply ${def.supply}. ${def.role === 'worker' ? 'Gathers resources & builds.' : 'Combat unit.'}` };
        }
        if (prod.queue && prod.queue.length) actions[11] = { id: 'cancel', label: 'Cancel', hot: 'X', tip: 'Cancel last queued unit', accent: '#ff6b6b' };
      }
    } else if (workers.length) {
      let i = 0;
      for (const kind of WORKER_BUILD_MENU) {
        const def = BUILDINGS[kind];
        const req = def.requires && !this.sim.buildings.some(b => b.owner === this.me && b.kind === def.requires && !b.building);
        actions[i++] = { id: 'build:' + kind, label: def.name, name: def.name, hot: HOT[kind], cost: def.cost, disabled: !afford(def) || req, tip: (req ? `Requires ${BUILDINGS[def.requires].name}. ` : '') + this._bdesc(kind) };
      }
      actions[11] = { id: 'stop', label: 'Stop', hot: 'S', tip: 'Halt current order' };
    } else if (this._ownUnits().length) {
      actions[0] = { id: 'attackmove', label: 'Attack', hot: 'A', tip: 'Attack-move to a location', accent: '#ff6b6b' };
      actions[1] = { id: 'stop', label: 'Stop', hot: 'S', tip: 'Halt' };
    }
    return actions;
  }
  _bdesc(kind) {
    return ({ hq: 'Trains Drones, drops off resources, +supply.', depot: 'Increases supply cap.', barracks: 'Trains Troopers & Strikers.', factory: 'Builds Siege Tanks.', refinery: 'Harvests Vespene gas (on a geyser).', turret: 'Automated defensive cannon.' })[kind] || '';
  }

  _refreshHud() {
    const sel = [...this.selection].map(id => this.sim.byId.get(id)).filter(Boolean);
    if (!sel.length) { this.hud.setSelection({ title: '', members: [] }); this.hud.setCommandCard(new Array(12).fill(null)); return; }
    // selection panel
    const own = sel.filter(e => e.owner === this.me);
    let info;
    if (own.length && own[0].etype === 'building' && own.length === 1) {
      const b = own[0];
      const queue = (b.queue || []).map((q, i) => ({ label: UNITS[q.kind].name, frac: i === 0 ? 1 - q.timeLeft / q.total : 0 }));
      info = { title: b.def.name + (b.building ? ` (${Math.floor(b.progress * 100)}%)` : ''), members: [{ kind: b.kind, name: b.def.name, hp: b.hp, maxHp: b.maxHp, color: '#7fd0ff' }], queue };
    } else {
      const members = own.length ? own : sel;
      info = { title: members.length > 1 ? members.length + ' units' : (members[0].def ? members[0].def.name : members[0].kind), members: members.map(e => ({ kind: e.kind, name: e.def ? e.def.name : e.kind, hp: e.hp, maxHp: e.maxHp, color: e.owner === this.me ? '#7fd0ff' : (e.owner < 0 ? '#9fb' : '#ff8a7a') })) };
    }
    this.hud.setSelection(info);
    this.hud.setCommandCard(this._cardActions());
  }
}

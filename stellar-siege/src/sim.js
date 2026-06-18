// ============================================================================
//  STELLAR SIEGE — deterministic simulation
//  Pure logic, no Three.js, no DOM. Both lockstep peers run this identically.
//  Randomness ONLY via this.rng. Iterate entities in stable id order.
// ============================================================================
import {
  TILE, MAP_W, MAP_H, WORLD_W, WORLD_H, SIM_DT,
  UNITS, BUILDINGS, RESOURCES, defOf, isBuilding,
  START_MINERALS, START_GAS, MAX_SUPPLY, GATHER_TIME, GATHER_AMOUNT,
} from './config.js';
import { makeRng } from './rng.js';
import { makeGrid, idx, findPath, worldToCell, nearestOpen, cellCenter, inBounds } from './pathfinding.js';

const dist2 = (ax, az, bx, bz) => { const dx = ax - bx, dz = az - bz; return dx * dx + dz * dz; };

export class Sim {
  constructor(seed) {
    this.seed = seed >>> 0;
    this.rng = makeRng(this.seed);
    this.tick = 0;
    this.nextId = 1;
    this.units = [];        // kept in ascending id order
    this.buildings = [];    // ascending id order
    this.resources = [];
    this.byId = new Map();
    this.grid = makeGrid();
    this.events = [];
    this.players = [
      { id: 0, minerals: START_MINERALS, gas: START_GAS, supplyUsed: 0, supplyMax: 0, pendingSupply: 0, alive: true },
      { id: 1, minerals: START_MINERALS, gas: START_GAS, supplyUsed: 0, supplyMax: 0, pendingSupply: 0, alive: true },
    ];
    this.winner = null;
    this._cell = new Map(); // spatial hash bucket -> [unit]
    this._setupMap();
    this.rebuildGrid();
  }

  // ----- setup -------------------------------------------------------------
  _setupMap() {
    // Two mirrored bases in opposite corners.
    const bases = [
      { owner: 0, cx: 8, cz: 8 },
      { owner: 1, cx: MAP_W - 8, cz: MAP_H - 8 },
    ];
    for (const b of bases) {
      const hq = this._spawnBuilding('hq', b.owner, b.cx - 2, b.cz - 2, true);
      // starting workers
      for (let i = 0; i < 5; i++) {
        const ang = (i / 5) * Math.PI * 2;
        const u = this._spawnUnit('worker', b.owner,
          hq.x + Math.cos(ang) * 7, hq.z + Math.sin(ang) * 7);
        u.heading = ang;
      }
      // mineral line (8 patches arc) + 2 geysers
      const dir = b.owner === 0 ? 1 : -1;
      for (let i = 0; i < 8; i++) {
        const a = (-0.6 + i * 0.17) * dir;
        this._spawnResource('minerals', hq.x + Math.cos(a) * 16 * dir + (i - 4) * 0.4,
          hq.z + Math.sin(a) * 16 * dir);
      }
      this._spawnResource('gas', hq.x + 18 * dir, hq.z - 6 * dir);
      this._spawnResource('gas', hq.x + 6 * dir, hq.z + 18 * dir);
    }
    // a few neutral mineral expansions near center
    this._spawnResource('minerals', WORLD_W * 0.5 - 6, WORLD_H * 0.5);
    this._spawnResource('minerals', WORLD_W * 0.5 + 6, WORLD_H * 0.5);
    this._spawnResource('minerals', WORLD_W * 0.5, WORLD_H * 0.5 - 6);
    this._spawnResource('minerals', WORLD_W * 0.5, WORLD_H * 0.5 + 6);
  }

  // ----- entity creation ---------------------------------------------------
  _spawnUnit(kind, owner, x, z) {
    const def = UNITS[kind];
    const u = {
      etype: 'unit', id: this.nextId++, kind, owner,
      x, z, vx: 0, vz: 0, heading: 0,
      hp: def.hp, maxHp: def.hp, radius: def.radius, def,
      state: 'idle', order: null, path: null, pathI: 0,
      tx: x, tz: z, targetId: 0, atkCd: 0,
      carry: 0, carryKind: null, gatherId: 0, gatherCd: 0, dropId: 0,
      buildId: 0, hidden: false,
    };
    this.units.push(u); this.byId.set(u.id, u);
    return u;
  }
  _spawnBuilding(kind, owner, cx, cz, complete = false) {
    const def = BUILDINGS[kind];
    const fp = def.footprint;
    const center = cellCenter(cx + fp / 2 - 0.5, cz + fp / 2 - 0.5);
    const b = {
      etype: 'building', id: this.nextId++, kind, owner,
      x: center.x, z: center.z, cx, cz, footprint: fp, def,
      hp: complete ? def.hp : Math.max(1, def.hp * 0.08), maxHp: def.hp,
      progress: complete ? 1 : 0, building: !complete,
      queue: [], rally: null, atkCd: 0, gasNode: 0,
    };
    this.buildings.push(b); this.byId.set(b.id, b);
    return b;
  }
  _spawnResource(kind, x, z) {
    const def = RESOURCES[kind];
    const r = { etype: 'resource', id: this.nextId++, kind, owner: -1,
      x, z, amount: def.amount, maxHp: def.amount, hp: def.amount, radius: def.radius };
    this.resources.push(r); this.byId.set(r.id, r);
    return r;
  }

  // ----- obstacle grid -----------------------------------------------------
  rebuildGrid() {
    this.grid.fill(0);
    for (const b of this.buildings) {
      for (let dz = 0; dz < b.footprint; dz++)
        for (let dx = 0; dx < b.footprint; dx++) {
          const cx = b.cx + dx, cz = b.cz + dz;
          if (inBounds(cx, cz)) this.grid[idx(cx, cz)] = 1;
        }
    }
    for (const r of this.resources) {
      const [cx, cz] = worldToCell(r.x, r.z);
      if (inBounds(cx, cz)) this.grid[idx(cx, cz)] = 1;
      if (r.kind === 'gas') { // geyser is 2x2-ish
        for (const [dx, dz] of [[1,0],[0,1],[1,1]]) {
          const nx = cx + dx, nz = cz + dz;
          if (inBounds(nx, nz)) this.grid[idx(nx, nz)] = 1;
        }
      }
    }
  }

  // Is a footprint placeable for `kind` at top-left cell (cx,cz)? returns {ok, reason}
  canPlace(kind, cx, cz, onGeyserId = 0) {
    const def = BUILDINGS[kind];
    const fp = def.footprint;
    if (def.onGeyser) {
      // must sit on a geyser, footprint over it, no other building
      const g = this.byId.get(onGeyserId);
      if (!g || g.kind !== 'gas') return { ok: false, reason: 'Refinery must be built on a Vespene Geyser' };
      for (const b of this.buildings) if (b.kind === 'refinery' && b.gasNode === g.id) return { ok: false, reason: 'Geyser already has a refinery' };
      return { ok: true };
    }
    for (let dz = 0; dz < fp; dz++) for (let dx = 0; dx < fp; dx++) {
      const x = cx + dx, z = cz + dz;
      if (!inBounds(x, z)) return { ok: false, reason: 'Out of bounds' };
      if (this.grid[idx(x, z)]) return { ok: false, reason: 'Blocked' };
    }
    return { ok: true };
  }

  // ----- supply ------------------------------------------------------------
  recomputeSupply() {
    for (const p of this.players) { p.supplyUsed = 0; p.supplyMax = 0; }
    for (const u of this.units) this.players[u.owner].supplyUsed += u.def.supply;
    for (const b of this.buildings) if (!b.building && b.def.supplyAdd)
      this.players[b.owner].supplyMax += b.def.supplyAdd;
    for (const p of this.players) p.supplyMax = Math.min(MAX_SUPPLY, p.supplyMax);
  }

  // ========================================================================
  //  COMMAND APPLICATION  (called by net at the scheduled tick)
  // ========================================================================
  applyCommand(c) {
    const p = this.players[c.owner];
    if (!p || !p.alive) return;
    switch (c.type) {
      case 'move':       this._cmdMove(c, 'move'); break;
      case 'attackmove': this._cmdMove(c, 'attackmove'); break;
      case 'attack':     this._cmdAttack(c); break;
      case 'gather':     this._cmdGather(c); break;
      case 'stop':       this._cmdStop(c); break;
      case 'build':      this._cmdBuild(c); break;
      case 'produce':    this._cmdProduce(c); break;
      case 'cancel':     this._cmdCancel(c); break;
      case 'rally':      this._cmdRally(c); break;
    }
  }

  _ownUnits(c) {
    const out = [];
    for (const id of c.units || []) {
      const u = this.byId.get(id);
      if (u && u.etype === 'unit' && u.owner === c.owner && u.hp > 0) out.push(u);
    }
    return out;
  }

  _cmdMove(c, mode) {
    const us = this._ownUnits(c);
    if (!us.length) return;
    // simple formation: spread arrival points around the click in a grid
    const n = us.length;
    const cols = Math.ceil(Math.sqrt(n));
    let i = 0;
    for (const u of us) {
      const gx = (i % cols) - (cols - 1) / 2;
      const gz = Math.floor(i / cols) - (cols - 1) / 2;
      const ox = c.x + gx * 1.8, oz = c.z + gz * 1.8;
      this._issueMove(u, ox, oz, mode);
      i++;
    }
    this.events.push({ t: 'order', kind: mode, x: c.x, z: c.z, owner: c.owner });
  }

  // set destination + path WITHOUT touching order/role fields
  _setPath(u, x, z) {
    u.tx = Math.max(0.5, Math.min(WORLD_W - 0.5, x));
    u.tz = Math.max(0.5, Math.min(WORLD_H - 0.5, z));
    u.path = findPath(this.grid, u.x, u.z, u.tx, u.tz); u.pathI = 0;
  }

  _issueMove(u, x, z, mode) {
    u.state = mode === 'attackmove' ? 'attackmove' : 'move';
    u.order = mode; u.targetId = 0; u.gatherId = 0; u.buildId = 0; u.carry = 0;
    this._setPath(u, x, z);
  }

  _cmdAttack(c) {
    const us = this._ownUnits(c);
    const tgt = this.byId.get(c.target);
    if (!tgt) return;
    for (const u of us) {
      u.state = 'attack'; u.order = 'attack'; u.targetId = tgt.id;
      u.gatherId = 0; u.buildId = 0;
      u.path = null;
    }
  }

  _cmdGather(c) {
    const us = this._ownUnits(c);
    const node = this.byId.get(c.target);
    if (!node) return;
    for (const u of us) {
      if (!u.def.canGather) { this._issueMove(u, node.x, node.z, 'move'); continue; }
      u.order = 'gather'; u.gatherId = node.id;
      u.targetId = 0; u.buildId = 0; u.carry = 0; u.gatherCd = 0;
      this._setPath(u, node.x, node.z);
      u.state = 'gather';
    }
  }

  _cmdStop(c) {
    for (const u of this._ownUnits(c)) {
      u.state = 'idle'; u.order = null; u.path = null; u.targetId = 0;
      u.gatherId = 0; u.buildId = 0; u.vx = 0; u.vz = 0;
    }
  }

  _cmdBuild(c) {
    const u = this.byId.get(c.unit);
    if (!u || u.owner !== c.owner || !u.def.canGather) return;
    const def = BUILDINGS[c.building];
    if (!def) return;
    const p = this.players[c.owner];
    // requirement check
    if (def.requires && !this.buildings.some(b => b.owner === c.owner && b.kind === def.requires && !b.building))
      { this.events.push({ t: 'denied', owner: c.owner, msg: 'Requires ' + BUILDINGS[def.requires].name }); return; }
    let cx, cz, geyserId = 0;
    if (def.onGeyser) {
      const g = this.byId.get(c.target);
      if (!g) return;
      const [gx, gz] = worldToCell(g.x, g.z);
      cx = gx - (def.footprint - 1) / 2 | 0; cz = gz - (def.footprint - 1) / 2 | 0;
      geyserId = g.id;
    } else {
      cx = c.cx; cz = c.cz;
    }
    const place = this.canPlace(c.building, cx, cz, geyserId);
    if (!place.ok) { this.events.push({ t: 'denied', owner: c.owner, msg: place.reason }); return; }
    if (p.minerals < def.cost.minerals || p.gas < def.cost.gas)
      { this.events.push({ t: 'denied', owner: c.owner, msg: 'Not enough resources' }); return; }
    p.minerals -= def.cost.minerals; p.gas -= def.cost.gas;
    const b = this._spawnBuilding(c.building, c.owner, cx, cz, false);
    if (geyserId) b.gasNode = geyserId;
    this.rebuildGrid();
    // worker walks to it and constructs
    u.order = 'build'; u.buildId = b.id; u.gatherId = 0; u.targetId = 0; u.carry = 0;
    this._setPath(u, b.x, b.z); u.state = 'buildmove';
  }

  _cmdProduce(c) {
    const b = this.byId.get(c.building);
    if (!b || b.owner !== c.owner || b.building) return;
    if (!b.def.produces || !b.def.produces.includes(c.unit)) return;
    const def = UNITS[c.unit];
    const p = this.players[c.owner];
    if (def.requires && !this.buildings.some(x => x.owner === c.owner && x.kind === def.requires && !x.building))
      { this.events.push({ t: 'denied', owner: c.owner, msg: 'Requires ' + BUILDINGS[def.requires].name }); return; }
    if (p.minerals < def.cost.minerals || p.gas < def.cost.gas)
      { this.events.push({ t: 'denied', owner: c.owner, msg: 'Not enough resources' }); return; }
    if (p.supplyUsed + p.pendingSupply + def.supply > p.supplyMax)
      { this.events.push({ t: 'denied', owner: c.owner, msg: 'Not enough supply' }); return; }
    p.minerals -= def.cost.minerals; p.gas -= def.cost.gas;
    p.pendingSupply += def.supply;
    b.queue.push({ kind: c.unit, timeLeft: def.buildTime, total: def.buildTime, supply: def.supply });
  }

  _cmdCancel(c) {
    const b = this.byId.get(c.building);
    if (!b || b.owner !== c.owner || !b.queue.length) return;
    const item = b.queue.pop();
    const def = UNITS[item.kind];
    const p = this.players[c.owner];
    p.minerals += def.cost.minerals; p.gas += def.cost.gas;
    p.pendingSupply -= item.supply;
  }

  _cmdRally(c) {
    const b = this.byId.get(c.building);
    if (!b || b.owner !== c.owner) return;
    b.rally = { x: c.x, z: c.z };
  }

  // ========================================================================
  //  STEP  (one fixed sim tick)
  // ========================================================================
  step() {
    this.tick++;
    this.recomputeSupply();
    this._buildSpatialHash();
    for (const b of this.buildings) this._stepBuilding(b);
    for (const u of this.units) if (u.hp > 0) this._stepUnit(u);
    this._resolveDeaths();
    this._checkWin();
  }

  _buildSpatialHash() {
    this._cell.clear();
    for (const u of this.units) {
      if (u.hp <= 0) continue;
      const k = (Math.floor(u.x / 4)) + ',' + (Math.floor(u.z / 4));
      let arr = this._cell.get(k); if (!arr) { arr = []; this._cell.set(k, arr); }
      arr.push(u);
    }
  }
  _neighbors(x, z) {
    const out = [];
    const cx = Math.floor(x / 4), cz = Math.floor(z / 4);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const arr = this._cell.get((cx + dx) + ',' + (cz + dz));
      if (arr) for (const u of arr) out.push(u);
    }
    return out;
  }

  // ----- buildings ---------------------------------------------------------
  _stepBuilding(b) {
    if (b.building) return; // construction handled by the worker
    // production queue
    if (b.queue.length) {
      const item = b.queue[0];
      item.timeLeft -= SIM_DT;
      if (item.timeLeft <= 0) {
        b.queue.shift();
        const p = this.players[b.owner];
        p.pendingSupply -= item.supply;
        // spawn near rally / front of building
        const ang = this.rng.range(0, Math.PI * 2);
        const r = b.footprint * TILE * 0.6 + 1.5;
        let sx = b.x + Math.cos(ang) * r, sz = b.z + Math.sin(ang) * r;
        const [ncx, ncz] = nearestOpen(this.grid, ...worldToCell(sx, sz));
        const cc = cellCenter(ncx, ncz); sx = cc.x; sz = cc.z;
        const u = this._spawnUnit(item.kind, b.owner, sx, sz);
        this.events.push({ t: 'spawn', id: u.id, kind: u.kind, owner: u.owner, x: sx, z: sz });
        if (b.rally) {
          if (item.kind === 'worker') {
            // auto-gather nearest mineral if rallied onto one
            const node = this._nearestResource(b.rally.x, b.rally.z, 6);
            if (node) this._cmdGather({ owner: b.owner, units: [u.id], target: node.id });
            else this._issueMove(u, b.rally.x, b.rally.z, 'move');
          } else this._issueMove(u, b.rally.x, b.rally.z, 'attackmove');
        }
      }
    }
    // defensive turret auto-fire
    if (b.def.dmg && b.def.range) {
      b.atkCd -= SIM_DT;
      if (b.atkCd <= 0) {
        const tgt = this._acquireTarget(b, b.def.range, b.owner);
        if (tgt) { this._fire(b, tgt, b.def); b.atkCd = b.def.attackSpeed; }
      }
    }
  }

  // ----- units -------------------------------------------------------------
  _stepUnit(u) {
    u.atkCd = Math.max(0, u.atkCd - SIM_DT);
    switch (u.state) {
      case 'idle': this._unitIdle(u); break;
      case 'move': this._unitMove(u, false); break;
      case 'attackmove': this._unitAttackMove(u); break;
      case 'attack': this._unitAttack(u); break;
      case 'gather': this._unitGather(u); break;
      case 'returning': this._unitReturn(u); break;
      case 'buildmove': this._unitBuildMove(u); break;
      case 'building': this._unitBuilding(u); break;
    }
  }

  _unitIdle(u) {
    // auto-acquire if combat unit
    if (u.def.role === 'combat') {
      const tgt = this._acquireTarget(u, u.def.sight, u.owner);
      if (tgt) { u.state = 'attack'; u.targetId = tgt.id; u.order = 'auto'; return; }
    }
    this._separateOnly(u);
  }

  _arrive(u, x, z, slack = 0.6) { return dist2(u.x, u.z, x, z) <= slack * slack; }

  _followPath(u, speedScale = 1) {
    let tx = u.tx, tz = u.tz;
    if (u.path && u.path.length) {
      const wp = u.path[Math.min(u.pathI, u.path.length - 1)];
      tx = wp.x; tz = wp.z;
      if (this._arrive(u, tx, tz, 0.8) && u.pathI < u.path.length - 1) u.pathI++;
    }
    this._steer(u, tx, tz, speedScale);
  }

  _unitMove(u) {
    if (this._arrive(u, u.tx, u.tz, 0.7)) { u.state = 'idle'; u.vx = 0; u.vz = 0; return; }
    this._followPath(u);
    if (u.def.role === 'combat') {
      const tgt = this._acquireTarget(u, u.def.sight * 0.6, u.owner);
      // hold-to-target only when attack-move; plain move ignores enemies
    }
  }

  _unitAttackMove(u) {
    const tgt = this._acquireTarget(u, u.def.sight, u.owner);
    if (tgt) { u.targetId = tgt.id; this._engage(u, tgt); return; }
    if (this._arrive(u, u.tx, u.tz, 0.7)) { u.state = 'idle'; u.vx = 0; u.vz = 0; return; }
    this._followPath(u);
  }

  _unitAttack(u) {
    let tgt = this.byId.get(u.targetId);
    if (!tgt || tgt.hp <= 0) {
      // reacquire nearby, else idle
      const t2 = this._acquireTarget(u, u.def.sight, u.owner);
      if (t2) { u.targetId = t2.id; tgt = t2; } else { u.state = 'idle'; u.targetId = 0; return; }
    }
    this._engage(u, tgt);
  }

  _engage(u, tgt) {
    const range = u.def.range + (tgt.radius || (tgt.footprint ? tgt.footprint * TILE * 0.5 : 0.7));
    if (dist2(u.x, u.z, tgt.x, tgt.z) <= range * range) {
      u.vx *= 0.6; u.vz *= 0.6;
      u.heading = Math.atan2(tgt.z - u.z, tgt.x - u.x);
      if (u.atkCd <= 0) { this._fire(u, tgt, u.def); u.atkCd = u.def.attackSpeed; }
      this._separateOnly(u);
    } else {
      this._steer(u, tgt.x, tgt.z, 1);
    }
  }

  _unitGather(u) {
    const node = this.byId.get(u.gatherId);
    if (!node || node.amount <= 0) {
      const n2 = this._nearestResource(u.x, u.z, 50, 'minerals');
      if (n2) { u.gatherId = n2.id; this._setPath(u, n2.x, n2.z); u.state = 'gather'; }
      else u.state = 'idle';
      return;
    }
    // gas requires a refinery on the geyser
    let mineFrom = node, gasRef = null;
    if (node.kind === 'gas') {
      gasRef = this.buildings.find(b => b.kind === 'refinery' && b.gasNode === node.id && !b.building && b.owner === u.owner);
      if (!gasRef) { // no refinery — go idle
        const n2 = this._nearestResource(u.x, u.z, 50, 'minerals');
        if (n2) { u.gatherId = n2.id; this._setPath(u, n2.x, n2.z); u.state = 'gather'; }
        else u.state = 'idle';
        return;
      }
      mineFrom = gasRef;
    }
    const reach = (node.radius || 1.4) + u.radius + 1.2;
    if (dist2(u.x, u.z, mineFrom.x, mineFrom.z) > reach * reach) {
      this._steer(u, mineFrom.x, mineFrom.z, 1);
      u.heading = Math.atan2(mineFrom.z - u.z, mineFrom.x - u.x);
      return;
    }
    u.vx = 0; u.vz = 0;
    u.gatherCd += SIM_DT;
    if (u.gatherCd >= GATHER_TIME) {
      u.gatherCd = 0;
      const got = Math.min(GATHER_AMOUNT, node.amount);
      node.amount -= got;
      u.carry = got; u.carryKind = node.kind === 'gas' ? 'gas' : 'minerals';
      if (node.amount <= 0) { node.hp = 0; this.events.push({ t: 'depleted', id: node.id }); }
      u.state = 'returning';
    }
  }

  _unitReturn(u) {
    const drop = this._nearestDropoff(u);
    if (!drop) { u.state = 'idle'; return; }
    const reach = drop.footprint * TILE * 0.5 + u.radius + 1.0;
    if (dist2(u.x, u.z, drop.x, drop.z) > reach * reach) {
      if (!u.path || this._arrive(u, u.tx, u.tz, 1.0)) this._setPath(u, drop.x, drop.z);
      u.state = 'returning';
      this._followPath(u);
      return;
    }
    const p = this.players[u.owner];
    if (u.carryKind === 'gas') p.gas += u.carry; else p.minerals += u.carry;
    this.events.push({ t: 'deposit', owner: u.owner, kind: u.carryKind, amount: u.carry });
    u.carry = 0;
    // back to node
    const node = this.byId.get(u.gatherId) || this._nearestResource(u.x, u.z, 50, 'minerals');
    if (node) { u.gatherId = node.id; this._setPath(u, node.x, node.z); u.state = 'gather'; }
    else u.state = 'idle';
  }

  _unitBuildMove(u) {
    const b = this.byId.get(u.buildId);
    if (!b || b.hp <= 0) { u.state = 'idle'; u.buildId = 0; return; }
    const reach = b.footprint * TILE * 0.5 + u.radius + 0.7;
    if (dist2(u.x, u.z, b.x, b.z) <= reach * reach) { u.state = 'building'; u.vx = 0; u.vz = 0; u.hidden = true; return; }
    this._followPath(u);
  }

  _unitBuilding(u) {
    const b = this.byId.get(u.buildId);
    if (!b || b.hp <= 0) { u.state = 'idle'; u.buildId = 0; u.hidden = false; return; }
    if (!b.building) { // finished by someone
      u.state = 'idle'; u.buildId = 0; u.hidden = false; this._popOut(u, b); return;
    }
    b.progress += SIM_DT / b.def.buildTime;
    b.hp = Math.min(b.maxHp, b.maxHp * (0.08 + 0.92 * b.progress));
    if (b.progress >= 1) {
      b.progress = 1; b.building = false; b.hp = b.maxHp;
      this.events.push({ t: 'complete', id: b.id, kind: b.kind, owner: b.owner, x: b.x, z: b.z });
      u.state = 'idle'; u.buildId = 0; u.hidden = false; this._popOut(u, b);
      // auto-gather gas after refinery
      if (b.kind === 'refinery') { this._cmdGather({ owner: b.owner, units: [u.id], target: b.gasNode }); }
    }
  }

  _popOut(u, b) {
    const ang = this.rng.range(0, Math.PI * 2);
    const r = b.footprint * TILE * 0.5 + 1.2;
    const [cx, cz] = nearestOpen(this.grid, ...worldToCell(b.x + Math.cos(ang) * r, b.z + Math.sin(ang) * r));
    const cc = cellCenter(cx, cz); u.x = cc.x; u.z = cc.z;
  }

  // ----- steering ----------------------------------------------------------
  _steer(u, tx, tz, speedScale) {
    const sp = u.def.speed * speedScale;
    let dx = tx - u.x, dz = tz - u.z;
    const d = Math.hypot(dx, dz) || 1;
    let ax = dx / d, az = dz / d;
    // separation from neighbors
    let sx = 0, sz = 0;
    const nb = this._neighbors(u.x, u.z);
    for (const o of nb) {
      if (o === u) continue;
      const ddx = u.x - o.x, ddz = u.z - o.z;
      const dd = ddx * ddx + ddz * ddz;
      const rad = u.radius + o.radius;
      if (dd < rad * rad && dd > 1e-4) { const inv = 1 / Math.sqrt(dd); sx += ddx * inv; sz += ddz * inv; }
    }
    ax += sx * 0.9; az += sz * 0.9;
    const al = Math.hypot(ax, az) || 1;
    u.vx = (ax / al) * sp; u.vz = (az / al) * sp;
    this._integrate(u);
    u.heading = Math.atan2(u.vz, u.vx);
  }

  _separateOnly(u) {
    let sx = 0, sz = 0;
    const nb = this._neighbors(u.x, u.z);
    for (const o of nb) {
      if (o === u) continue;
      const ddx = u.x - o.x, ddz = u.z - o.z;
      const dd = ddx * ddx + ddz * ddz;
      const rad = u.radius + o.radius;
      if (dd < rad * rad && dd > 1e-4) { const inv = 1 / Math.sqrt(dd); sx += ddx * inv; sz += ddz * inv; }
    }
    u.vx = sx * u.def.speed * 0.35; u.vz = sz * u.def.speed * 0.35;
    if (u.vx || u.vz) this._integrate(u);
  }

  _integrate(u) {
    let nx = u.x + u.vx * SIM_DT, nz = u.z + u.vz * SIM_DT;
    // building collision: push out of blocked cell
    const [cx, cz] = worldToCell(nx, nz);
    if (inBounds(cx, cz) && this.grid[idx(cx, cz)]) {
      const cc = cellCenter(cx, cz);
      const px = nx - cc.x, pz = nz - cc.z;
      if (Math.abs(px) > Math.abs(pz)) nx = cc.x + Math.sign(px || 1) * (TILE / 2 + u.radius);
      else nz = cc.z + Math.sign(pz || 1) * (TILE / 2 + u.radius);
    }
    u.x = Math.max(0.4, Math.min(WORLD_W - 0.4, nx));
    u.z = Math.max(0.4, Math.min(WORLD_H - 0.4, nz));
  }

  // ----- combat helpers ----------------------------------------------------
  _fire(attacker, tgt, def) {
    // hitscan damage (deterministic), projectile is cosmetic via event
    this.events.push({ t: 'fire', x: attacker.x, z: attacker.z, tx: tgt.x, tz: tgt.z,
      proj: def.projectile, owner: attacker.owner, heading: Math.atan2(tgt.z - attacker.z, tgt.x - attacker.x) });
    const apply = (e, dmg) => {
      const arm = e.def ? (e.def.armor || 0) : 0;
      e.hp -= Math.max(1, dmg - arm);
    };
    apply(tgt, def.dmg);
    this.events.push({ t: 'impact', x: tgt.x, z: tgt.z, owner: attacker.owner, proj: def.projectile });
    if (def.splash) {
      for (const e of this._enemiesNear(tgt.x, tgt.z, def.splash, attacker.owner)) {
        if (e === tgt) continue;
        apply(e, def.dmg * 0.5);
      }
    }
  }

  _acquireTarget(src, range, owner) {
    let best = null, bd = range * range;
    // units
    for (const u of this.units) {
      if (u.owner === owner || u.owner < 0 || u.hp <= 0) continue;
      const d = dist2(src.x, src.z, u.x, u.z);
      if (d < bd) { bd = d; best = u; }
    }
    // buildings (only if no unit found within, then re-scan buildings within range)
    if (!best) {
      bd = range * range;
      for (const b of this.buildings) {
        if (b.owner === owner || b.hp <= 0) continue;
        const reach = range + b.footprint * TILE * 0.5;
        const d = dist2(src.x, src.z, b.x, b.z);
        if (d < reach * reach && d < bd + 1e9) { if (d < bd) { bd = d; best = b; } }
      }
    }
    return best;
  }

  _enemiesNear(x, z, radius, owner) {
    const out = [];
    const rr = radius * radius;
    for (const u of this.units) if (u.owner !== owner && u.owner >= 0 && u.hp > 0 && dist2(x, z, u.x, u.z) <= rr) out.push(u);
    for (const b of this.buildings) if (b.owner !== owner && b.hp > 0 && dist2(x, z, b.x, b.z) <= rr) out.push(b);
    return out;
  }

  _nearestResource(x, z, maxD, kind) {
    let best = null, bd = maxD * maxD;
    for (const r of this.resources) {
      if (r.amount <= 0) continue;
      if (kind === 'minerals' && r.kind !== 'minerals') continue;
      const d = dist2(x, z, r.x, r.z);
      if (d < bd) { bd = d; best = r; }
    }
    return best;
  }
  _nearestDropoff(u) {
    let best = null, bd = Infinity;
    for (const b of this.buildings) {
      if (b.owner !== u.owner || b.building || !b.def.dropoff) continue;
      if (u.carryKind === 'gas' && b.kind !== 'refinery' && b.kind !== 'hq') { /* hq accepts both */ }
      const d = dist2(u.x, u.z, b.x, b.z);
      if (d < bd) { bd = d; best = b; }
    }
    return best;
  }

  // ----- death / win -------------------------------------------------------
  _resolveDeaths() {
    for (let i = this.units.length - 1; i >= 0; i--) {
      const u = this.units[i];
      if (u.hp <= 0) {
        this.events.push({ t: 'death', etype: 'unit', kind: u.kind, owner: u.owner, x: u.x, z: u.z, id: u.id });
        this.byId.delete(u.id); this.units.splice(i, 1);
      }
    }
    let removedBuilding = false;
    for (let i = this.buildings.length - 1; i >= 0; i--) {
      const b = this.buildings[i];
      if (b.hp <= 0) {
        this.events.push({ t: 'death', etype: 'building', kind: b.kind, owner: b.owner, x: b.x, z: b.z, id: b.id, big: true });
        // free any worker stuck building it
        for (const u of this.units) if (u.buildId === b.id) { u.buildId = 0; u.hidden = false; u.state = 'idle'; }
        this.byId.delete(b.id); this.buildings.splice(i, 1); removedBuilding = true;
      }
    }
    if (removedBuilding) this.rebuildGrid();
  }

  _checkWin() {
    if (this.winner !== null) return;
    for (const p of this.players) {
      if (!p.alive) continue;
      const hasB = this.buildings.some(b => b.owner === p.id);
      const hasU = this.units.some(u => u.owner === p.id);
      if (!hasB && !hasU) { p.alive = false; this.events.push({ t: 'eliminated', owner: p.id }); }
    }
    const alive = this.players.filter(p => p.alive);
    if (alive.length === 1) { this.winner = alive[0].id; this.events.push({ t: 'gameover', winner: this.winner }); }
  }

  // ----- io ----------------------------------------------------------------
  drainEvents() { const e = this.events; this.events = []; return e; }

  // Cheap rolling checksum for desync detection.
  checksum() {
    let h = 2166136261 >>> 0;
    const mix = (n) => { h ^= (n | 0); h = Math.imul(h, 16777619) >>> 0; };
    mix(this.tick);
    for (const u of this.units) { mix(u.id); mix(u.x * 16 | 0); mix(u.z * 16 | 0); mix(u.hp | 0); }
    for (const b of this.buildings) { mix(b.id); mix(b.hp | 0); mix((b.progress * 100) | 0); }
    for (const p of this.players) { mix(p.minerals); mix(p.gas); mix(p.supplyUsed); }
    return h >>> 0;
  }
}

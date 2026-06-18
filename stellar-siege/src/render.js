// ============================================================================
//  Renderer — Three.js scene, RTS camera, entity views, fog of war, projectiles.
//  Presentation only: reads the Sim, never mutates it.
// ============================================================================
import * as THREE from 'three';
import { FACTIONS, MAP_W, MAP_H, TILE, WORLD_W, WORLD_H } from './config.js';
import { createUnitModel, createBuildingModel, createResourceModel, createProjectileModel } from './models.js';
import { createEnvironment } from './environment.js';
import { createVfx } from './vfx.js';
import { idx } from './pathfinding.js';

const factionColor = (owner) => owner >= 0 ? FACTIONS[owner] : null;

export class Renderer {
  constructor(container, sim, localPlayer) {
    this.sim = sim;
    this.localPlayer = localPlayer;
    this.container = container;
    this.views = new Map();        // eid -> { group, kind, etype, hpbar }
    this.selection = new Set();
    this.projectiles = [];
    this.placement = null;         // { kind, mesh, valid, cx, cz }

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.5, 1200);

    this.env = createEnvironment(this.scene, THREE, sim.seed);
    this.vfx = createVfx(this.scene, THREE);

    // selection ring pool
    this._ringGeo = new THREE.RingGeometry(0.7, 0.92, 28);
    this._ringMat = new THREE.MeshBasicMaterial({ color: 0x66ff99, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });

    this._buildFog();
    this._raycaster = new THREE.Raycaster();
    this._pickList = [];

    // camera rig
    this.camFocus = new THREE.Vector3(WORLD_W * (localPlayer === 0 ? 0.16 : 0.84), 0, WORLD_H * (localPlayer === 0 ? 0.16 : 0.84));
    this.camDist = 70; this.camAzim = localPlayer === 0 ? Math.PI * 0.75 : -Math.PI * 0.25; this.camPitch = 1.0;
    this._updateCamera();

    addEventListener('resize', () => this.resize());
  }

  resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }

  // ----- camera ------------------------------------------------------------
  _updateCamera() {
    const f = this.camFocus;
    const cp = Math.cos(this.camPitch), sp = Math.sin(this.camPitch);
    const ox = Math.cos(this.camAzim) * cp * this.camDist;
    const oz = Math.sin(this.camAzim) * cp * this.camDist;
    const oy = sp * this.camDist;
    this.camera.position.set(f.x + ox, f.y + oy, f.z + oz);
    this.camera.lookAt(f.x, f.y, f.z);
  }
  panBy(dx, dz) {
    // pan in camera-aligned ground plane
    const fwdX = -Math.cos(this.camAzim), fwdZ = -Math.sin(this.camAzim);
    const rX = -Math.sin(this.camAzim), rZ = Math.cos(this.camAzim);
    this.camFocus.x = Math.max(0, Math.min(WORLD_W, this.camFocus.x + rX * dx + fwdX * dz));
    this.camFocus.z = Math.max(0, Math.min(WORLD_H, this.camFocus.z + rZ * dx + fwdZ * dz));
    this._updateCamera();
  }
  zoomBy(d) { this.camDist = Math.max(24, Math.min(140, this.camDist + d)); this._updateCamera(); }
  rotateBy(a) { this.camAzim += a; this._updateCamera(); }
  pitchBy(d) { this.camPitch = Math.max(0.5, Math.min(1.45, this.camPitch + d)); this._updateCamera(); }
  focusOn(x, z) { this.camFocus.x = x; this.camFocus.z = z; this._updateCamera(); }

  screenToGround(clientX, clientY) {
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    this._raycaster.setFromCamera(ndc, this.camera);
    const t = -this._raycaster.ray.origin.y / this._raycaster.ray.direction.y;
    if (t <= 0) return null;
    const p = this._raycaster.ray.at(t, new THREE.Vector3());
    return { x: p.x, z: p.z };
  }

  pickEntity(clientX, clientY) {
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    this._raycaster.setFromCamera(ndc, this.camera);
    const hits = this._raycaster.intersectObjects(this._pickList, true);
    for (const h of hits) {
      let o = h.object;
      while (o) { if (o.userData && o.userData.eid !== undefined) return o.userData.eid; o = o.parent; }
    }
    return null;
  }

  worldToScreen(x, z, y = 0) {
    const v = new THREE.Vector3(x, y, z).project(this.camera);
    const r = this.renderer.domElement.getBoundingClientRect();
    return { x: (v.x * 0.5 + 0.5) * r.width + r.left, y: (-v.y * 0.5 + 0.5) * r.height + r.top, visible: v.z < 1 };
  }

  ownUnitsInRect(x0, y0, x1, y1) {
    const ids = [];
    const minx = Math.min(x0, x1), maxx = Math.max(x0, x1), miny = Math.min(y0, y1), maxy = Math.max(y0, y1);
    for (const u of this.sim.units) {
      if (u.owner !== this.localPlayer) continue;
      const s = this.worldToScreen(u.x, u.z, 1);
      if (s.visible && s.x >= minx && s.x <= maxx && s.y >= miny && s.y <= maxy) ids.push(u.id);
    }
    return ids;
  }

  // ----- fog of war --------------------------------------------------------
  _buildFog() {
    this.vis = new Uint8Array(MAP_W * MAP_H);
    this.explored = new Uint8Array(MAP_W * MAP_H);
    const data = new Uint8Array(MAP_W * MAP_H * 4);
    this.fogData = data;
    const tex = new THREE.DataTexture(data, MAP_W, MAP_H, THREE.RGBAFormat);
    tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.needsUpdate = true;
    this.fogTex = tex;
    const geo = new THREE.PlaneGeometry(WORLD_W, WORLD_H);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0x000308, map: tex, transparent: true, depthWrite: false, opacity: 1 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(WORLD_W / 2, 0.12, WORLD_H / 2);
    mesh.renderOrder = 2;
    this.scene.add(mesh);
  }
  _updateFog() {
    this.vis.fill(0);
    const mark = (x, z, sight) => {
      const cx = Math.floor(x / TILE), cz = Math.floor(z / TILE), r = Math.ceil(sight / TILE);
      for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dz * dz > r * r) continue;
        const nx = cx + dx, nz = cz + dz;
        if (nx < 0 || nz < 0 || nx >= MAP_W || nz >= MAP_H) continue;
        this.vis[idx(nx, nz)] = 1; this.explored[idx(nx, nz)] = 1;
      }
    };
    for (const u of this.sim.units) if (u.owner === this.localPlayer) mark(u.x, u.z, u.def.sight);
    for (const b of this.sim.buildings) if (b.owner === this.localPlayer) mark(b.x, b.z, b.def.sight);
    const d = this.fogData;
    for (let i = 0; i < this.vis.length; i++) {
      const a = this.vis[i] ? 0 : (this.explored[i] ? 120 : 232);
      d[i * 4 + 3] = a;
    }
    this.fogTex.needsUpdate = true;
  }
  fogVisibleAt(x, z) {
    const cx = Math.floor(x / TILE), cz = Math.floor(z / TILE);
    if (cx < 0 || cz < 0 || cx >= MAP_W || cz >= MAP_H) return false;
    return this.vis[idx(cx, cz)] === 1;
  }

  // ----- entity views ------------------------------------------------------
  _makeView(e) {
    let group;
    if (e.etype === 'unit') group = createUnitModel(e.kind, factionColor(e.owner));
    else if (e.etype === 'building') group = createBuildingModel(e.kind, factionColor(e.owner));
    else group = createResourceModel(e.kind);
    group.userData.eid = e.id;
    group.traverse(o => { if (o.isMesh) o.userData.eid = e.id; });
    this.scene.add(group);
    const view = { group, kind: e.kind, etype: e.etype, hpbar: null, ring: null };
    this.views.set(e.id, view);
    this._pickList.push(group); // resources must be pickable so right-click → gather works
    return view;
  }
  _removeView(eid) {
    const v = this.views.get(eid); if (!v) return;
    this.scene.remove(v.group);
    const i = this._pickList.indexOf(v.group); if (i >= 0) this._pickList.splice(i, 1);
    this.views.delete(eid);
  }

  _ensureHpBar(view) {
    if (view.hpbar) return view.hpbar;
    const g = new THREE.Group();
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.16), new THREE.MeshBasicMaterial({ color: 0x111418, transparent: true, opacity: 0.85, depthTest: false }));
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.13), new THREE.MeshBasicMaterial({ color: 0x55ff77, depthTest: false }));
    bg.renderOrder = 9; fill.renderOrder = 10;
    g.add(bg); g.add(fill);
    g.userData = { bg, fill };
    view.group.add(g);
    view.hpbar = g;
    return g;
  }

  setSelection(ids) { this.selection = new Set(ids); }

  // building placement ghost
  setPlacement(kind, cx, cz, footprint, x, z, valid) {
    if (!this.placement || this.placement.kind !== kind) {
      this.clearPlacement();
      const m = createBuildingModel(kind, factionColor(this.localPlayer));
      m.traverse(o => { if (o.isMesh && o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.55; o.material.depthWrite = false; } });
      this.scene.add(m);
      this.placement = { kind, mesh: m };
    }
    const p = this.placement;
    p.mesh.position.set(x, 0, z);
    p.mesh.traverse(o => { if (o.isMesh && o.material) o.material.color && o.material.emissive; });
    const tint = valid ? 0x66ff99 : 0xff5555;
    p.mesh.traverse(o => { if (o.isMesh && o.material && o.material.emissive) { o.material.emissive.setHex(tint); o.material.emissiveIntensity = 0.4; } });
    p.valid = valid;
  }
  clearPlacement() { if (this.placement) { this.scene.remove(this.placement.mesh); this.placement = null; } }

  // ----- per-frame sync ----------------------------------------------------
  frame(dt, now) {
    const sim = this.sim;
    // create/update views
    const seen = new Set();
    const sync = (e) => {
      seen.add(e.id);
      let v = this.views.get(e.id); if (!v) v = this._makeView(e);
      const g = v.group;
      if (e.etype === 'unit') {
        g.visible = !e.hidden && (e.owner === this.localPlayer || this.fogVisibleAt(e.x, e.z));
        g.position.set(e.x, 0, e.z);
        g.rotation.y = -e.heading; // models face +X; rotate so +X aligns with heading
        const moving = Math.abs(e.vx) + Math.abs(e.vz) > 0.5;
        if (g.userData.animate) g.userData.animate(now, moving);
        if (e.kind === 'tank') { const t = g.getObjectByName('turret'); if (t && e.targetId) { const tg = sim.byId.get(e.targetId); if (tg) t.rotation.y = -Math.atan2(tg.z - e.z, tg.x - e.x) - g.rotation.y; } }
      } else if (e.etype === 'building') {
        g.visible = e.owner === this.localPlayer || this.fogVisibleAt(e.x, e.z) || this.explored[this._cellIndex(e.x, e.z)] === 1;
        g.position.set(e.x, 0, e.z);
        if (e.building) { const s = 0.18 + 0.82 * e.progress; g.scale.set(1, s, 1); } else g.scale.set(1, 1, 1);
        if (g.userData.animate) g.userData.animate(now, false);
        if (e.kind === 'turret' && e.atkCd > 0) { const t = g.getObjectByName('turret'); /* aim handled loosely */ }
      } else {
        g.visible = this.explored[this._cellIndex(e.x, e.z)] === 1;
        g.position.set(e.x, 0, e.z);
        const depl = e.amount <= 0; if (depl) g.visible = false;
      }
      this._updateHpBar(v, e);
    };
    for (const e of sim.resources) sync(e);
    for (const e of sim.buildings) sync(e);
    for (const e of sim.units) sync(e);
    // remove dead views
    for (const id of this.views.keys()) if (!seen.has(id)) this._removeView(id);

    this._updateFog();
    this._updateProjectiles(dt);
    this.vfx.update(dt);
    if (this.env.update) this.env.update(now);

    // billboard hp bars & rings to camera
    this._billboard();
    this.renderer.render(this.scene, this.camera);
  }

  _cellIndex(x, z) {
    const cx = Math.max(0, Math.min(MAP_W - 1, Math.floor(x / TILE)));
    const cz = Math.max(0, Math.min(MAP_H - 1, Math.floor(z / TILE)));
    return idx(cx, cz);
  }

  _updateHpBar(v, e) {
    const selected = this.selection.has(e.id);
    const damaged = e.hp < e.maxHp - 0.5;
    if (e.etype === 'resource') { if (v.hpbar) v.hpbar.visible = false; return; }
    // selection ring
    if (selected && e.owner >= 0) {
      if (!v.ring) {
        const ring = new THREE.Mesh(this._ringGeo, this._ringMat.clone());
        ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08;
        const sc = e.etype === 'building' ? e.footprint * TILE * 0.62 : (e.radius + 0.3);
        ring.scale.setScalar(sc / 0.8);
        ring.material.color.setHex(e.owner === this.localPlayer ? 0x66ff99 : 0xff6666);
        v.group.add(ring); v.ring = ring;
      }
      v.ring.visible = true;
    } else if (v.ring) v.ring.visible = false;

    if (!selected && !damaged) { if (v.hpbar) v.hpbar.visible = false; return; }
    const g = this._ensureHpBar(v);
    g.visible = true;
    const w = e.etype === 'building' ? e.footprint * TILE * 0.9 : 1.5;
    const h = e.etype === 'building' ? e.footprint * TILE * 0.9 + 1 : 2.4;
    g.position.set(0, h, 0);
    g.userData.bg.scale.set(w, 1, 1);
    const frac = Math.max(0, e.hp / e.maxHp);
    g.userData.fill.scale.set(w * frac, 1, 1);
    g.userData.fill.position.x = -w * (1 - frac) / 2;
    const c = frac > 0.5 ? 0x55ff77 : frac > 0.25 ? 0xffcc44 : 0xff4444;
    g.userData.fill.material.color.setHex(c);
  }

  _billboard() {
    const q = this.camera.quaternion;
    for (const v of this.views.values()) {
      if (v.hpbar && v.hpbar.visible) v.hpbar.quaternion.copy(q);
    }
  }

  // ----- projectiles (cosmetic) -------------------------------------------
  spawnProjectile(ev) {
    if (!ev.proj) return;
    const m = createProjectileModel(ev.proj);
    m.position.set(ev.x, 1.1, ev.z);
    this.scene.add(m);
    const dx = ev.tx - ev.x, dz = ev.tz - ev.z;
    const dist = Math.hypot(dx, dz) || 1;
    const speed = ev.proj === 'shell' ? 55 : 90;
    this.projectiles.push({ m, x: ev.x, y: 1.1, z: ev.z, tx: ev.tx, tz: ev.tz, life: dist / speed, t: 0, color: ev.owner >= 0 ? FACTIONS[ev.owner].accent : 0xffffff });
    this.vfx.muzzleFlash(new THREE.Vector3(ev.x, 1.1, ev.z), new THREE.Vector3(dx / dist, 0, dz / dist), FACTIONS[ev.owner]?.accent);
  }
  _updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.t += dt;
      const f = Math.min(1, p.t / p.life);
      p.m.position.set(p.x + (p.tx - p.x) * f, 1.1 + Math.sin(f * Math.PI) * 1.2, p.z + (p.tz - p.z) * f);
      if (f >= 1) { this.scene.remove(p.m); this.projectiles.splice(i, 1); }
    }
  }

  pingMove(x, z, color = 0x88ffcc) { this.vfx.spawnRing(new THREE.Vector3(x, 0.12, z), color); }

  // ----- visual event handling (called by main with drained sim events) ----
  handleEvents(events) {
    for (const ev of events) {
      switch (ev.t) {
        case 'fire': this.spawnProjectile(ev); break;
        case 'impact': this.vfx.impact(new THREE.Vector3(ev.x, 1.0, ev.z), ev.owner >= 0 ? FACTIONS[ev.owner].accent : 0xffffff); break;
        case 'death': if (ev.big) this.vfx.explosion(new THREE.Vector3(ev.x, 1, ev.z), 2.2); else this.vfx.explosion(new THREE.Vector3(ev.x, 1, ev.z), 0.8); break;
        case 'complete': this.vfx.buildPuff(new THREE.Vector3(ev.x, 0.5, ev.z)); this.vfx.spawnRing(new THREE.Vector3(ev.x, 0.1, ev.z), FACTIONS[ev.owner]?.accent); break;
        case 'spawn': this.vfx.spawnRing(new THREE.Vector3(ev.x, 0.1, ev.z), FACTIONS[ev.owner]?.accent); break;
      }
    }
  }
}

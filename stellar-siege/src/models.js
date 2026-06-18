// ============================================================================
//  STELLAR SIEGE — procedural model factory
//  Sleek sci-fi Terran-style mechs & structures, built from primitive meshes.
//  Pure module: no DOM, no side effects at import time.
//
//  Conventions (see ARCHITECTURE.md):
//    - Ground is the XZ plane, +Y up. Models sit on y=0 and face +X.
//    - Returned models are THREE.Group centered at the origin on XZ.
//    - factionColor = { primary, accent, emissive } or null for neutral.
//    - group.userData.kind is set; units add group.userData.animate(t, moving).
// ============================================================================

import * as THREE from 'three';
import { TILE, NEUTRAL_COLOR } from './config.js';

// ----------------------------------------------------------------------------
//  Shared material / geometry caches (perf: hundreds of cloned instances).
//  Materials keyed by descriptor string; geometries keyed by descriptor too.
// ----------------------------------------------------------------------------
const _matCache = new Map();
const _geoCache = new Map();

// Standard PBR material. Cached by all params.
function mat(color, { rough = 0.55, metal = 0.7, emissive = 0x000000, ei = 0 } = {}) {
  const key = `m|${color}|${rough}|${metal}|${emissive}|${ei}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color, roughness: rough, metalness: metal,
      emissive, emissiveIntensity: emissive ? ei : 0,
    });
    _matCache.set(key, m);
  }
  return m;
}

// Glowing trim/light material — strong emissive, dark base so it reads as a light.
function glowMat(color, ei = 1.4) {
  const key = `g|${color}|${ei}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color, roughness: 0.35, metalness: 0.2,
      emissive: color, emissiveIntensity: ei,
    });
    _matCache.set(key, m);
  }
  return m;
}

// Faint translucent glass (cockpits, viewports).
function glassMat(color, em) {
  const key = `gl|${color}|${em}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color, roughness: 0.1, metalness: 0.1,
      transparent: true, opacity: 0.55,
      emissive: em, emissiveIntensity: 0.35,
    });
    _matCache.set(key, m);
  }
  return m;
}

// Cached geometry helpers ----------------------------------------------------
function box(w, h, d) {
  const key = `b|${w}|${h}|${d}`;
  let g = _geoCache.get(key);
  if (!g) { g = new THREE.BoxGeometry(w, h, d); _geoCache.set(key, g); }
  return g;
}
function cyl(rt, rb, h, seg = 16) {
  const key = `c|${rt}|${rb}|${h}|${seg}`;
  let g = _geoCache.get(key);
  if (!g) { g = new THREE.CylinderGeometry(rt, rb, h, seg); _geoCache.set(key, g); }
  return g;
}
function sph(r, w = 12, h = 8) {
  const key = `s|${r}|${w}|${h}`;
  let g = _geoCache.get(key);
  if (!g) { g = new THREE.SphereGeometry(r, w, h); _geoCache.set(key, g); }
  return g;
}
function cone(r, h, seg = 12) {
  const key = `n|${r}|${h}|${seg}`;
  let g = _geoCache.get(key);
  if (!g) { g = new THREE.ConeGeometry(r, h, seg); _geoCache.set(key, g); }
  return g;
}
function torus(r, t, seg = 8, rad = 20) {
  const key = `t|${r}|${t}|${seg}|${rad}`;
  let g = _geoCache.get(key);
  if (!g) { g = new THREE.TorusGeometry(r, t, seg, rad); _geoCache.set(key, g); }
  return g;
}

// Mesh helper: build a shadow-casting mesh at a position with optional rotation.
function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Resolve faction palette into a usable color set (fallback to neutral).
function palette(fc) {
  if (fc) return { primary: fc.primary, accent: fc.accent, emissive: fc.emissive };
  return { primary: NEUTRAL_COLOR, accent: 0xbfe4ff, emissive: 0x5a7686 };
}

// Common metals for the sci-fi hull look.
const HULL = 0x9aa6b4;      // light brushed steel
const HULL_DARK = 0x4a5560; // dark plating / shadows
const TREAD = 0x2a2f36;     // rubber / dark mechanical

// ============================================================================
//  UNITS
// ============================================================================

export function createUnitModel(kind, factionColor) {
  const c = palette(factionColor);
  let g;
  switch (kind) {
    case 'worker':  g = buildWorker(c);  break;
    case 'trooper': g = buildTrooper(c); break;
    case 'striker': g = buildStriker(c); break;
    case 'tank':    g = buildTank(c);    break;
    default:        g = buildWorker(c);  break;
  }
  g.userData.kind = kind;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// --- Worker: compact hovering utility drone with a folding tool arm ----------
// radius 0.7 — small. Floats just above the ground.
function buildWorker(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.4, metal: 0.85 });
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.7 });
  const prim = mat(c.primary, { rough: 0.4, metal: 0.6 });

  // Rounded chassis (a flattened pod).
  const body = mesh(sph(0.36, 14, 10), hull, 0, 0.42, 0);
  body.scale.set(1.15, 0.7, 0.95);
  g.add(body);

  // Faction collar ring around the body.
  const collar = mesh(torus(0.34, 0.07, 8, 18), prim, 0, 0.42, 0);
  collar.rotation.x = Math.PI / 2;
  g.add(collar);

  // Forward sensor eye (glows, faces +X).
  g.add(mesh(sph(0.13, 12, 10), glassMat(c.accent, c.emissive), 0.34, 0.46, 0));
  g.add(mesh(cyl(0.16, 0.18, 0.1, 12), dark, 0.28, 0.46, 0).rotateZ(Math.PI / 2));

  // Underslung tool arm (a small claw/cutter) reaching forward.
  const arm = new THREE.Group();
  arm.add(mesh(box(0.34, 0.08, 0.08), dark, 0.17, 0, 0));
  arm.add(mesh(box(0.12, 0.16, 0.16), prim, 0.36, 0, 0));
  arm.add(mesh(cone(0.06, 0.18, 8), glowMat(c.accent, 1.2), 0.46, 0, 0).rotateZ(-Math.PI / 2));
  arm.position.set(0.08, 0.26, 0);
  g.add(arm);

  // Two hover thrusters underneath (glow downward).
  const thr = glowMat(c.emissive, 1.0);
  for (const z of [-0.2, 0.2]) {
    g.add(mesh(cyl(0.1, 0.14, 0.08, 10), dark, -0.05, 0.22, z));
    g.add(mesh(cyl(0.09, 0.04, 0.05, 10), thr, -0.05, 0.16, z));
  }

  // Top antenna nub.
  g.add(mesh(cyl(0.015, 0.015, 0.18, 6), dark, -0.1, 0.66, 0));

  g.userData.body = body;
  g.userData.arm = arm;
  g.userData.animate = (t, moving) => {
    // Gentle bob + idle spin of the collar; arm tucks when moving.
    const bob = Math.sin(t * 4) * 0.04;
    g.position.y = 0.06 + bob;
    body.rotation.z = Math.sin(t * 2.2) * 0.05;
    arm.rotation.z = moving ? 0.5 : 0.15 + Math.sin(t * 3) * 0.08;
  };
  g.position.y = 0.06;
  return g;
}

// --- Trooper: humanoid infantry with rifle -----------------------------------
// radius 0.7. Roughly 1.5 units tall.
function buildTrooper(c) {
  const g = new THREE.Group();
  const armor = mat(HULL, { rough: 0.45, metal: 0.75 });
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.6 });
  const prim = mat(c.primary, { rough: 0.45, metal: 0.55 });

  // Legs.
  const legL = new THREE.Group();
  legL.add(mesh(box(0.16, 0.5, 0.18), dark, 0, -0.25, 0));
  legL.add(mesh(box(0.2, 0.12, 0.26), armor, 0.02, -0.5, 0)); // boot
  legL.position.set(0, 0.55, 0.14);
  const legR = legL.clone();
  legR.position.z = -0.14;
  g.add(legL, legR);

  // Pelvis + torso.
  g.add(mesh(box(0.36, 0.18, 0.34), dark, 0, 0.6, 0));
  const torso = mesh(box(0.42, 0.46, 0.32), armor, 0, 0.92, 0);
  g.add(torso);
  // Chest faction plate + glowing core light.
  g.add(mesh(box(0.3, 0.3, 0.04), prim, 0.16, 0.95, 0));
  g.add(mesh(sph(0.06, 10, 8), glowMat(c.accent, 1.4), 0.2, 0.98, 0));
  // Shoulder pads.
  g.add(mesh(box(0.14, 0.16, 0.18), prim, 0, 1.12, 0.24));
  g.add(mesh(box(0.14, 0.16, 0.18), prim, 0, 1.12, -0.24));

  // Head / helmet with visor.
  g.add(mesh(box(0.22, 0.22, 0.24), armor, 0.02, 1.28, 0));
  g.add(mesh(box(0.08, 0.08, 0.2), glowMat(c.accent, 1.2), 0.14, 1.3, 0)); // visor slit

  // Back pack.
  g.add(mesh(box(0.16, 0.34, 0.26), dark, -0.22, 0.95, 0));

  // Rifle held forward in right arm (faces +X).
  const armR = new THREE.Group();
  armR.add(mesh(box(0.12, 0.32, 0.12), dark, 0, -0.12, 0)); // upper/forearm
  // gun
  armR.add(mesh(box(0.5, 0.1, 0.1), mat(0x33373d, { rough: 0.5, metal: 0.8 }), 0.28, -0.26, 0));
  armR.add(mesh(box(0.12, 0.14, 0.12), prim, 0.1, -0.26, 0));
  armR.add(mesh(cyl(0.03, 0.03, 0.14, 8), glowMat(c.accent, 1.0), 0.55, -0.26, 0).rotateZ(Math.PI / 2));
  armR.position.set(0.06, 1.05, 0.28);
  g.add(armR);

  // Left arm.
  const armL = new THREE.Group();
  armL.add(mesh(box(0.12, 0.4, 0.12), armor, 0, -0.16, 0));
  armL.position.set(0, 1.05, -0.28);
  g.add(armL);

  g.userData.animate = (t, moving) => {
    if (moving) {
      const s = Math.sin(t * 11);
      legL.rotation.z = s * 0.55; legR.rotation.z = -s * 0.55;
      armL.rotation.z = -s * 0.4;
      g.position.y = Math.abs(Math.sin(t * 11)) * 0.03;
    } else {
      legL.rotation.z = legR.rotation.z = 0;
      armL.rotation.z = 0;
      g.position.y = 0;
    }
  };
  return g;
}

// --- Striker: sleek fast hover-bike raider -----------------------------------
// radius 0.8. Low, aerodynamic, floats above the ground.
function buildStriker(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.3, metal: 0.9 });
  const dark = mat(HULL_DARK, { rough: 0.5, metal: 0.7 });
  const prim = mat(c.primary, { rough: 0.35, metal: 0.6 });

  // Long tapered chassis built from two stacked boxes (faces +X).
  const body = mesh(box(1.1, 0.22, 0.4), hull, 0, 0.5, 0);
  g.add(body);
  // Nose wedge.
  const nose = mesh(cone(0.22, 0.6, 4), prim, 0.7, 0.5, 0);
  nose.rotation.z = -Math.PI / 2;
  nose.scale.set(1, 1, 0.7);
  g.add(nose);
  // Cockpit canopy.
  const canopy = mesh(sph(0.22, 12, 8), glassMat(c.accent, c.emissive), 0.18, 0.6, 0);
  canopy.scale.set(1.4, 0.8, 0.9);
  g.add(canopy);
  // Faction spine stripe + dorsal fin.
  g.add(mesh(box(0.8, 0.04, 0.08), prim, -0.05, 0.63, 0));
  g.add(mesh(box(0.3, 0.22, 0.04), prim, -0.4, 0.66, 0));

  // Twin side outrigger pods with glowing hover jets.
  const jet = glowMat(c.emissive, 1.3);
  for (const z of [-0.34, 0.34]) {
    g.add(mesh(box(0.7, 0.14, 0.16), dark, -0.05, 0.42, z));
    g.add(mesh(cyl(0.1, 0.13, 0.18, 10), dark, -0.32, 0.36, z));
    g.add(mesh(cyl(0.08, 0.05, 0.06, 10), jet, -0.32, 0.27, z)); // downward thrust glow
    // forward strut light
    g.add(mesh(sph(0.05, 8, 6), glowMat(c.accent, 1.2), 0.42, 0.42, z));
  }
  // Rear twin thruster nozzles.
  for (const z of [-0.14, 0.14]) {
    g.add(mesh(cyl(0.09, 0.11, 0.2, 10), dark, -0.6, 0.5, z).rotateZ(Math.PI / 2));
    g.add(mesh(cyl(0.07, 0.07, 0.06, 10), jet, -0.72, 0.5, z).rotateZ(Math.PI / 2));
  }

  g.userData.body = g;
  g.userData.animate = (t, moving) => {
    const hover = Math.sin(t * 5) * 0.05;
    g.position.y = 0.08 + hover;
    // Bank slightly while moving, idle sway otherwise.
    g.rotation.z = moving ? -0.12 : Math.sin(t * 2) * 0.04;
    g.rotation.x = moving ? Math.sin(t * 9) * 0.03 : 0;
  };
  g.position.y = 0.08;
  return g;
}

// --- Tank: heavy treaded siege vehicle with rotating turret ------------------
// radius 1.4. Largest unit. Turret child is named exactly 'turret'.
function buildTank(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.5, metal: 0.8 });
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.65 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.55 });
  const treadMat = mat(TREAD, { rough: 0.85, metal: 0.3 });

  // Two tread assemblies (left/right), each a long box with wheel discs.
  for (const z of [-0.62, 0.62]) {
    const tread = mesh(box(2.1, 0.4, 0.42), treadMat, 0, 0.3, z);
    g.add(tread);
    // wheel detail discs along the track
    for (const x of [-0.7, -0.23, 0.23, 0.7]) {
      const w = mesh(cyl(0.21, 0.21, 0.44, 12), dark, x, 0.3, z);
      w.rotation.x = Math.PI / 2;
      g.add(w);
    }
    // angled track skirt with faction stripe
    g.add(mesh(box(2.0, 0.12, 0.06), prim, 0, 0.5, z + (z > 0 ? 0.22 : -0.22)));
  }

  // Lower hull body between the treads.
  g.add(mesh(box(1.7, 0.4, 1.0), hull, 0, 0.56, 0));
  // Sloped glacis plate at the front.
  const glacis = mesh(box(0.5, 0.42, 1.0), hull, 0.85, 0.56, 0);
  glacis.rotation.z = -0.5;
  g.add(glacis);
  // Upper deck.
  g.add(mesh(box(1.4, 0.22, 0.86), dark, -0.05, 0.82, 0));
  // Side vents glowing.
  g.add(mesh(box(0.5, 0.08, 0.04), glowMat(c.emissive, 1.1), 0, 0.82, 0.45));
  g.add(mesh(box(0.5, 0.08, 0.04), glowMat(c.emissive, 1.1), 0, 0.82, -0.45));

  // ---- Turret (separately addressable, rotates in XZ) ----
  const turret = new THREE.Group();
  turret.name = 'turret';
  turret.position.set(-0.05, 0.98, 0);

  // Turret base & dome.
  turret.add(mesh(cyl(0.5, 0.56, 0.26, 16), hull, 0, 0.13, 0));
  const dome = mesh(box(0.7, 0.34, 0.7), hull, 0, 0.36, 0);
  turret.add(dome);
  // Faction mantlet plate + commander cupola.
  turret.add(mesh(box(0.18, 0.3, 0.6), prim, 0.42, 0.36, 0));
  turret.add(mesh(cyl(0.16, 0.16, 0.14, 12), dark, -0.18, 0.58, 0));
  turret.add(mesh(sph(0.07, 10, 8), glowMat(c.accent, 1.4), -0.1, 0.62, 0)); // sensor

  // Big main cannon pointing +X.
  turret.add(mesh(cyl(0.13, 0.15, 1.3, 14), mat(0x3a3f46, { rough: 0.5, metal: 0.85 }), 0.95, 0.36, 0).rotateZ(Math.PI / 2));
  // Muzzle brake.
  turret.add(mesh(cyl(0.18, 0.18, 0.22, 12), dark, 1.55, 0.36, 0).rotateZ(Math.PI / 2));
  // Recoil sleeve / faction band on barrel.
  turret.add(mesh(cyl(0.17, 0.17, 0.18, 12), prim, 0.5, 0.36, 0).rotateZ(Math.PI / 2));
  // Side coax light.
  turret.add(mesh(sph(0.05, 8, 6), glowMat(c.accent, 1.2), 0.55, 0.5, 0.18));

  g.add(turret);
  g.userData.turret = turret;

  g.userData.animate = (t, moving) => {
    // Heavy idle rumble; tracks settle. Keep cheap.
    g.position.y = moving ? Math.sin(t * 16) * 0.012 : 0;
  };
  return g;
}

// ============================================================================
//  BUILDINGS
//  Footprint constraint: half-extent = footprint * TILE / 2.
//    hq 4 -> 8u wide (half 4) | barracks/factory 3 -> 6u (half 3)
//    depot/refinery 2 -> 4u (half 2) | turret 1 -> 2u (half 1)
// ============================================================================

export function createBuildingModel(kind, factionColor) {
  const c = palette(factionColor);
  let g;
  switch (kind) {
    case 'hq':       g = buildHQ(c);       break;
    case 'depot':    g = buildDepot(c);    break;
    case 'barracks': g = buildBarracks(c); break;
    case 'factory':  g = buildFactory(c);  break;
    case 'refinery': g = buildRefinery(c); break;
    case 'turret':   g = buildTurret(c);   break;
    default:         g = buildDepot(c);    break;
  }
  g.userData.kind = kind;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// Shared: a beveled foundation pad that grounds every structure.
function foundation(half, h, color = HULL_DARK) {
  const f = mesh(box(half * 2, h, half * 2), mat(color, { rough: 0.8, metal: 0.4 }), 0, h / 2, 0);
  return f;
}

// --- HQ: large command nexus, landing pad, antennas. The centerpiece. --------
function buildHQ(c) {
  const g = new THREE.Group();
  const half = 4; // footprint 4
  const hull = mat(HULL, { rough: 0.5, metal: 0.75 });
  const dark = mat(HULL_DARK, { rough: 0.65, metal: 0.6 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.55 });
  const trim = glowMat(c.accent, 1.2);

  // Foundation + skirt.
  g.add(foundation(half, 0.5));
  g.add(mesh(box(half * 2 - 0.4, 0.3, half * 2 - 0.4), hull, 0, 0.65, 0));
  // Faction perimeter light strip.
  g.add(mesh(box(half * 2 - 0.2, 0.06, 0.1), trim, 0, 0.82, half - 0.2));
  g.add(mesh(box(half * 2 - 0.2, 0.06, 0.1), trim, 0, 0.82, -(half - 0.2)));
  g.add(mesh(box(0.1, 0.06, half * 2 - 0.2), trim, half - 0.2, 0.82, 0));
  g.add(mesh(box(0.1, 0.06, half * 2 - 0.2), trim, -(half - 0.2), 0.82, 0));

  // Central command tower — stepped octagonal mass.
  const tower = mesh(cyl(1.7, 2.1, 2.2, 8), hull, -0.4, 1.95, 0);
  g.add(tower);
  g.add(mesh(cyl(1.3, 1.7, 0.6, 8), prim, -0.4, 3.2, 0)); // faction collar
  // Glowing command bridge windows ring.
  g.add(mesh(cyl(1.42, 1.42, 0.4, 8), glassMat(c.accent, c.emissive), -0.4, 2.6, 0));
  // Domed sensor cap + rotating radar.
  g.add(mesh(sph(1.25, 12, 8), hull, -0.4, 3.5, 0));
  const radar = new THREE.Group();
  radar.position.set(-0.4, 4.4, 0);
  radar.add(mesh(cyl(0.05, 0.05, 0.6, 8), dark, 0, 0.3, 0));
  const dish = mesh(cyl(0.5, 0.5, 0.06, 16), prim, 0, 0.6, 0.3);
  dish.rotation.x = -0.7;
  radar.add(dish);
  radar.add(mesh(sph(0.08, 8, 6), glowMat(c.accent, 1.5), 0, 0.6, 0.3));
  g.add(radar);

  // Two flanking antenna spires with beacon lights.
  for (const z of [-2.8, 2.8]) {
    g.add(mesh(cyl(0.12, 0.18, 2.6, 8), dark, -1.6, 1.8, z));
    g.add(mesh(sph(0.14, 8, 6), glowMat(c.emissive, 1.6), -1.6, 3.2, z));
  }

  // Integrated landing pad on the +X side (the "front").
  const pad = mesh(cyl(1.5, 1.5, 0.16, 24), dark, 2.0, 0.62, 0);
  g.add(pad);
  // Pad faction ring + central glow circle.
  g.add(mesh(torus(1.2, 0.08, 8, 24), prim, 2.0, 0.72, 0).rotateX(Math.PI / 2));
  g.add(mesh(cyl(0.5, 0.5, 0.04, 20), glowMat(c.accent, 1.0), 2.0, 0.73, 0));
  // Pad corner lights.
  for (const [dx, dz] of [[1.0, 1.0], [1.0, -1.0], [-1.0, 1.0], [-1.0, -1.0]]) {
    g.add(mesh(sph(0.08, 8, 6), glowMat(c.emissive, 1.4), 2.0 + dx, 0.74, dz));
  }

  // Buttressed corner pylons for bulk.
  for (const [dx, dz] of [[-1, 1], [-1, -1]]) {
    g.add(mesh(box(0.5, 1.8, 0.5), hull, dx * 2.4, 1.4, dz * 2.4));
    g.add(mesh(box(0.3, 0.1, 0.3), trim, dx * 2.4, 2.35, dz * 2.4));
  }

  g.userData.radar = radar;
  g.userData.animate = (t) => { radar.rotation.y = t * 0.4; };
  return g;
}

// --- Depot: small supply silo with stacked drums -----------------------------
function buildDepot(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.5, metal: 0.7 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.5 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });

  g.add(foundation(2, 0.3));
  // Central fuel silo.
  const silo = mesh(cyl(1.1, 1.25, 1.6, 16), hull, 0, 1.1, 0);
  g.add(silo);
  // Banded rings.
  g.add(mesh(torus(1.12, 0.07, 8, 18), prim, 0, 0.9, 0).rotateX(Math.PI / 2));
  g.add(mesh(torus(1.0, 0.07, 8, 18), prim, 0, 1.5, 0).rotateX(Math.PI / 2));
  // Domed top + valve.
  g.add(mesh(sph(1.05, 14, 8), hull, 0, 1.9, 0));
  g.add(mesh(cyl(0.18, 0.18, 0.3, 10), dark, 0, 2.4, 0));
  // Three small satellite drums.
  for (let i = 0; i < 3; i++) {
    const a = i * (Math.PI * 2 / 3) + 0.4;
    g.add(mesh(cyl(0.35, 0.38, 0.9, 12), dark, Math.cos(a) * 1.45, 0.75, Math.sin(a) * 1.45));
  }
  // Glowing fill-level gauge.
  g.add(mesh(box(0.1, 0.7, 0.06), glowMat(c.accent, 1.2), 1.1, 1.1, 0));
  return g;
}

// --- Barracks: infantry hangar with a big sliding door -----------------------
function buildBarracks(c) {
  const g = new THREE.Group();
  const half = 3;
  const hull = mat(HULL, { rough: 0.55, metal: 0.7 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.5 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });

  g.add(foundation(half, 0.4));
  // Main hangar block.
  g.add(mesh(box(half * 2 - 0.6, 1.8, half * 2 - 1.2), hull, 0, 1.3, 0));
  // Curved roof vault (half-cylinder — direct geo, one per building so no cache).
  const roofGeo = new THREE.CylinderGeometry(half - 0.6, half - 0.6, half * 2 - 0.6, 16, 1, false, 0, Math.PI);
  const roof = new THREE.Mesh(roofGeo, hull);
  roof.castShadow = true; roof.receiveShadow = true;
  roof.position.set(0, 2.2, 0);
  roof.rotation.x = Math.PI / 2; // lay the arc to span the width, dome facing up
  g.add(roof);

  // Big bay door on +X face, recessed, glowing seam.
  g.add(mesh(box(0.25, 1.5, 2.4), dark, half - 0.55, 1.0, 0));
  g.add(mesh(box(0.08, 1.3, 0.12), glowMat(c.emissive, 1.3), half - 0.42, 1.0, 0)); // door seam light
  // Door faction chevrons.
  g.add(mesh(box(0.1, 1.3, 0.4), prim, half - 0.45, 1.0, 0.7));
  g.add(mesh(box(0.1, 1.3, 0.4), prim, half - 0.45, 1.0, -0.7));

  // Roof faction stripe + ID number block.
  g.add(mesh(box(half * 2 - 1.4, 0.1, 0.5), prim, 0, 3.0, 0));
  // Rooftop vents / AC units.
  for (const x of [-1.4, 1.4]) {
    g.add(mesh(box(0.7, 0.4, 0.9), dark, x, 3.0, 0));
    g.add(mesh(box(0.6, 0.06, 0.8), glowMat(c.accent, 0.8), x, 3.22, 0));
  }
  // Corner lights.
  for (const [dx, dz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    g.add(mesh(sph(0.1, 8, 6), glowMat(c.accent, 1.2), dx * (half - 0.5), 2.2, dz * (half - 0.9)));
  }
  return g;
}

// --- Factory: heavy vehicle assembly with open bay & crane -------------------
function buildFactory(c) {
  const g = new THREE.Group();
  const half = 3;
  const hull = mat(HULL, { rough: 0.55, metal: 0.7 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.55 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });

  g.add(foundation(half, 0.45));
  // Heavy industrial block (taller, boxier than barracks).
  g.add(mesh(box(half * 2 - 0.5, 2.2, half * 2 - 0.7), hull, -0.3, 1.55, 0));
  // Stepped upper machinery housing.
  g.add(mesh(box(half * 2 - 1.8, 0.9, half * 2 - 1.6), dark, -0.6, 3.1, 0));

  // Large vehicle bay opening on +X (dark recess with girders).
  g.add(mesh(box(0.6, 1.9, 3.2), dark, half - 0.2, 1.4, 0));
  for (const zz of [-0.9, 0, 0.9]) {
    g.add(mesh(box(0.3, 1.9, 0.1), hull, half - 0.05, 1.4, zz)); // door girders
  }
  // Glowing bay floor strip.
  g.add(mesh(box(0.9, 0.04, 2.8), glowMat(c.emissive, 1.2), half + 0.0, 0.5, 0));

  // Twin exhaust smokestacks with glowing tops.
  for (const z of [-1.4, 1.4]) {
    g.add(mesh(cyl(0.28, 0.32, 1.6, 12), dark, -1.6, 3.5, z));
    g.add(mesh(cyl(0.3, 0.3, 0.16, 12), glowMat(c.emissive, 1.3), -1.6, 4.3, z));
  }
  // Side gantry crane arm reaching over the bay.
  g.add(mesh(box(0.18, 0.18, 2.4), prim, -0.4, 4.0, 0));
  g.add(mesh(box(2.6, 0.16, 0.18), prim, 0.5, 4.0, 1.1));
  g.add(mesh(cyl(0.04, 0.04, 0.8, 6), dark, 1.6, 3.6, 1.1)); // hook line
  g.add(mesh(box(0.2, 0.2, 0.2), dark, 1.6, 3.15, 1.1));

  // Faction warning stripes around the base.
  g.add(mesh(box(half * 2 - 0.4, 0.16, 0.1), prim, 0, 0.75, half - 0.35));
  g.add(mesh(box(half * 2 - 0.4, 0.16, 0.1), prim, 0, 0.75, -(half - 0.35)));
  return g;
}

// --- Refinery: pipework processor straddling a geyser ------------------------
function buildRefinery(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.5, metal: 0.7 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.55 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const gasGlow = glowMat(0x6ad28a, 1.1); // green-gold vespene

  g.add(foundation(2, 0.3));
  // Central processing core over the geyser vent.
  g.add(mesh(cyl(0.7, 0.9, 1.7, 12), hull, 0, 1.15, 0));
  g.add(mesh(cyl(0.5, 0.7, 0.5, 12), prim, 0, 2.1, 0));
  // Glowing vent at the very top (extracted gas).
  g.add(mesh(cyl(0.35, 0.35, 0.2, 12), gasGlow, 0, 2.45, 0));

  // Three storage tanks around the core.
  for (let i = 0; i < 3; i++) {
    const a = i * (Math.PI * 2 / 3);
    const x = Math.cos(a) * 1.45, z = Math.sin(a) * 1.45;
    g.add(mesh(cyl(0.45, 0.48, 1.2, 12), hull, x, 0.9, z));
    g.add(mesh(sph(0.46, 12, 8), dark, x, 1.5, z));
    g.add(mesh(torus(0.46, 0.05, 6, 14), prim, x, 1.0, z).rotateX(Math.PI / 2));
    // Connecting pipe to core.
    const pipe = mesh(cyl(0.1, 0.1, 1.45, 8), dark, x * 0.5, 0.7, z * 0.5);
    pipe.rotation.z = Math.PI / 2;
    pipe.rotation.y = -a;
    g.add(pipe);
    // small gas-level light on each tank
    g.add(mesh(box(0.06, 0.4, 0.06), gasGlow, x * 0.78, 0.9, z * 0.78));
  }
  // Top hazard light.
  g.add(mesh(sph(0.1, 8, 6), glowMat(c.emissive, 1.4), 0, 2.6, 0));
  return g;
}

// --- Turret: compact rotating gun emplacement --------------------------------
// footprint 1 (half-extent 1). Has a 'turret' group so it can track targets.
function buildTurret(c) {
  const g = new THREE.Group();
  const hull = mat(HULL, { rough: 0.5, metal: 0.75 });
  const dark = mat(HULL_DARK, { rough: 0.65, metal: 0.6 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });

  // Hexagonal base bunker.
  g.add(mesh(cyl(0.9, 1.0, 0.5, 6), foundationDarkColor(), 0, 0.25, 0));
  g.add(mesh(cyl(0.7, 0.8, 0.5, 6), hull, 0, 0.7, 0));
  // Faction base ring.
  g.add(mesh(torus(0.78, 0.06, 6, 16), prim, 0, 0.5, 0).rotateX(Math.PI / 2));

  // Rotating gun head (named 'turret').
  const turret = new THREE.Group();
  turret.name = 'turret';
  turret.position.set(0, 1.0, 0);
  // Housing.
  turret.add(mesh(box(0.6, 0.42, 0.7), hull, 0, 0.1, 0));
  turret.add(mesh(box(0.3, 0.3, 0.5), prim, -0.2, 0.12, 0));
  // Sensor eye.
  turret.add(mesh(sph(0.08, 10, 8), glowMat(c.accent, 1.4), 0.05, 0.28, 0));
  // Twin barrels pointing +X.
  for (const z of [-0.15, 0.15]) {
    turret.add(mesh(cyl(0.06, 0.07, 0.9, 10), dark, 0.5, 0.1, z).rotateZ(Math.PI / 2));
    turret.add(mesh(cyl(0.09, 0.09, 0.1, 10), dark, 0.95, 0.1, z).rotateZ(Math.PI / 2)); // muzzle
  }
  g.add(turret);
  g.userData.turret = turret;
  return g;
}

// helper used only by turret (kept tiny to avoid material churn)
function foundationDarkColor() {
  return mat(HULL_DARK, { rough: 0.8, metal: 0.4 });
}

// ============================================================================
//  RESOURCES (neutral) — cool crystal blues for minerals, green-gold geyser.
// ============================================================================

export function createResourceModel(kind) {
  const g = kind === 'gas' ? buildGas() : buildMinerals();
  g.userData.kind = kind;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// --- Minerals: cluster of glowing blue crystal shards (radius 1.4) -----------
function buildMinerals() {
  const g = new THREE.Group();
  const baseRock = mat(0x3a4a55, { rough: 0.9, metal: 0.2 });
  const crystal = new THREE.MeshStandardMaterial({
    color: 0x8fdcff, roughness: 0.1, metalness: 0.1,
    emissive: 0x2a9fe0, emissiveIntensity: 0.7,
    transparent: true, opacity: 0.85,
  });

  // Low rocky base.
  g.add(mesh(cyl(1.2, 1.35, 0.3, 12), baseRock, 0, 0.15, 0));

  // Several angular crystal shards (cones) of varied size & lean.
  const shards = [
    [0, 0, 1.4, 0.32, 0],
    [0.7, 0.3, 1.05, 0.24, 0.3],
    [-0.6, 0.4, 0.95, 0.22, -0.35],
    [0.3, -0.7, 1.2, 0.26, 0.2],
    [-0.5, -0.5, 0.8, 0.2, -0.2],
    [0.55, -0.2, 0.7, 0.18, 0.4],
    [-0.2, 0.65, 1.1, 0.24, 0.15],
  ];
  for (const [x, z, h, r, lean] of shards) {
    const sh = mesh(cone(r, h, 5), crystal, x, 0.3 + h / 2, z);
    sh.rotation.z = lean;
    sh.rotation.y = Math.random() * Math.PI;
    g.add(sh);
  }
  return g;
}

// --- Gas: vespene geyser — fissured vent emitting green-gold glow ------------
function buildGas() {
  const g = new THREE.Group();
  const rock = mat(0x4a4234, { rough: 0.95, metal: 0.15 });
  const darkRock = mat(0x2e2a22, { rough: 1.0, metal: 0.1 });
  const gas = new THREE.MeshStandardMaterial({
    color: 0x9ad17a, roughness: 0.3, metalness: 0.0,
    emissive: 0x6fae3a, emissiveIntensity: 0.9,
    transparent: true, opacity: 0.75,
  });

  // Crater rim — ring of rough rock chunks.
  g.add(mesh(cyl(1.55, 1.7, 0.45, 14), rock, 0, 0.22, 0));
  g.add(mesh(cyl(1.0, 1.2, 0.5, 14), darkRock, 0, 0.5, 0)); // inner vent wall
  // jagged rim rocks
  for (let i = 0; i < 7; i++) {
    const a = i * (Math.PI * 2 / 7) + 0.3;
    const x = Math.cos(a) * 1.5, z = Math.sin(a) * 1.5;
    const r = mesh(box(0.4, 0.5 + (i % 3) * 0.18, 0.4), rock, x, 0.4, z);
    r.rotation.y = a;
    g.add(r);
  }
  // Glowing gas pool + central column.
  g.add(mesh(cyl(0.95, 0.95, 0.1, 16), gas, 0, 0.55, 0));
  const column = mesh(cyl(0.4, 0.7, 1.2, 12), gas, 0, 1.1, 0);
  g.add(column);
  g.add(mesh(cone(0.3, 0.6, 10), gas, 0, 1.9, 0));

  g.userData.column = column;
  return g;
}

// ============================================================================
//  PROJECTILES — small, bright, no shadow (cheap, many in flight).
// ============================================================================

export function createProjectileModel(kind) {
  let o;
  if (kind === 'shell') {
    // Tank shell: a small glowing capsule oriented along +X.
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      cyl(0.1, 0.1, 0.42, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xff9a30, emissiveIntensity: 1.6, roughness: 0.4, metalness: 0.3 }),
    );
    body.rotation.z = Math.PI / 2;
    const tip = new THREE.Mesh(cone(0.1, 0.18, 8), new THREE.MeshStandardMaterial({ color: 0xfff0c0, emissive: 0xffb040, emissiveIntensity: 1.8 }));
    tip.rotation.z = -Math.PI / 2;
    tip.position.x = 0.28;
    g.add(body, tip);
    o = g;
  } else {
    // Bullet / tracer: a tiny bright sphere.
    o = new THREE.Mesh(
      sph(0.09, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xfff4c0, emissive: 0xffe070, emissiveIntensity: 2.0, roughness: 0.3, metalness: 0.1 }),
    );
  }
  o.userData.kind = kind;
  return o;
}

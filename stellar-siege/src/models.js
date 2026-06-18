// ============================================================================
//  STELLAR SIEGE — procedural model factory  (v2: "real 3D game" visual pass)
//  Sleek sci-fi Terran-style mechs & structures, built from primitive meshes.
//  Pure module: no DOM, no side effects at import time.
//
//  Conventions (see ARCHITECTURE.md):
//    - Ground is the XZ plane, +Y up. Models sit on y=0 and face +X.
//    - Returned models are THREE.Group centered at the origin on XZ.
//    - factionColor = { primary, accent, emissive } or null for neutral.
//    - group.userData.kind is set; units add group.userData.animate(t, moving).
//    - The 'tank' and the 'turret' building each expose a child Group named
//      exactly 'turret' so the renderer can aim it.
//
//  Quality approach: a small cache of shared PBR materials (hull metal, dark
//  metal, undercarriage, glass, glowing faction trim) plus cached primitive
//  geometries. Models are assembled from many small meshes — panel lines,
//  vents, chamfered edges, greebles, glowing strips — for readable silhouettes
//  from an angled RTS camera. No per-frame allocations inside animate().
// ============================================================================

import * as THREE from 'three';
import { TILE, NEUTRAL_COLOR } from './config.js';

// ----------------------------------------------------------------------------
//  Shared material / geometry caches (perf: hundreds of cloned instances).
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

// Glowing trim/light material — strong emissive, so it reads as an active light.
function glowMat(color, ei = 1.2) {
  const key = `g|${color}|${ei}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color, roughness: 0.3, metalness: 0.15,
      emissive: color, emissiveIntensity: ei,
    });
    _matCache.set(key, m);
  }
  return m;
}

// Faint translucent glass (cockpits, viewports, bridge windows).
function glassMat(color, em) {
  const key = `gl|${color}|${em}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color, roughness: 0.08, metalness: 0.1,
      transparent: true, opacity: 0.5,
      emissive: em, emissiveIntensity: 0.45,
    });
    _matCache.set(key, m);
  }
  return m;
}

// Convenience cached metal flavors (string-stable so they dedupe in the cache).
function metal(color, rough = 0.5) { return mat(color, { rough, metal: 0.85 }); }

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

// Mesh helper: shadow-casting mesh at a position. Returns the mesh for chaining.
function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// box() positioned shorthand: box(w,h,d,mat,x,y,z) -> Mesh
function bx(w, h, d, material, x = 0, y = 0, z = 0) {
  return mesh(box(w, h, d), material, x, y, z);
}

// Resolve faction palette into a usable color set (fallback to neutral).
function palette(fc) {
  if (fc) return { primary: fc.primary, accent: fc.accent, emissive: fc.emissive };
  return { primary: NEUTRAL_COLOR, accent: 0xbfe4ff, emissive: 0x5a7686 };
}

// Common hull palette for the sci-fi look.
const HULL = 0x9aa6b4;      // light brushed steel
const HULL_MID = 0x6c7783;  // mid plating
const HULL_DARK = 0x434c57; // dark plating / recesses
const UNDER = 0x262b31;     // undercarriage / deep shadow
const GUNMETAL = 0x33373d;  // barrels, weapons
const TREAD = 0x202327;     // rubber / tracks

// Tiny panel-line/greeble helper: a thin inset strip used to break up surfaces.
function panelLine(material, w, h, d, x, y, z) {
  return bx(w, h, d, material, x, y, z);
}

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

// --- Worker: compact hovering utility drone with articulated tool arm ---------
// radius 0.7 — small. Floats just above the ground, bobs, arm articulates.
function buildWorker(c) {
  const g = new THREE.Group();
  const hull = metal(HULL, 0.38);
  const midM = metal(HULL_MID, 0.5);
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.7 });
  const under = mat(UNDER, { rough: 0.75, metal: 0.5 });
  const prim = mat(c.primary, { rough: 0.4, metal: 0.6 });
  const trim = glowMat(c.accent, 1.3);
  const thrust = glowMat(c.emissive, 1.1);

  // Rounded chassis (a flattened pod) with a beveled lower lip.
  const body = mesh(sph(0.36, 16, 12), hull, 0, 0.44, 0);
  body.scale.set(1.18, 0.66, 0.98);
  g.add(body);
  // Lower beveled hull ring (chamfer feel).
  const lip = mesh(cyl(0.36, 0.32, 0.12, 16), midM, 0, 0.3, 0);
  g.add(lip);
  // Top sensor crown plate.
  const crown = mesh(cyl(0.2, 0.26, 0.08, 14), dark, -0.02, 0.62, 0);
  g.add(crown);

  // Faction collar ring around the body + glowing running light on top.
  const collar = mesh(torus(0.35, 0.06, 8, 20), prim, 0, 0.44, 0);
  collar.rotation.x = Math.PI / 2;
  g.add(collar);
  g.add(mesh(sph(0.05, 8, 6), trim, -0.1, 0.66, 0)); // beacon

  // Panel-line greebles around the hull.
  g.add(panelLine(dark, 0.5, 0.02, 0.03, 0, 0.5, 0.32));
  g.add(panelLine(dark, 0.5, 0.02, 0.03, 0, 0.5, -0.32));

  // Forward sensor eye (glows, faces +X) with a recessed housing.
  g.add(mesh(cyl(0.18, 0.2, 0.12, 14), dark, 0.28, 0.46, 0).rotateZ(Math.PI / 2));
  g.add(mesh(sph(0.13, 14, 12), glassMat(c.accent, c.emissive), 0.36, 0.46, 0));
  g.add(mesh(sph(0.05, 8, 6), trim, 0.42, 0.46, 0)); // bright pupil

  // Underslung articulated tool arm (shoulder -> forearm -> claw/cutter).
  const arm = new THREE.Group();
  arm.add(bx(0.18, 0.1, 0.1, dark, 0.09, 0, 0));            // shoulder seg
  const forearm = new THREE.Group();
  forearm.position.set(0.18, 0, 0);
  forearm.add(bx(0.26, 0.07, 0.07, midM, 0.13, 0, 0));      // forearm seg
  forearm.add(bx(0.1, 0.14, 0.16, prim, 0.3, 0, 0));        // tool head
  forearm.add(mesh(cone(0.055, 0.18, 8), glowMat(c.accent, 1.3), 0.42, 0, 0).rotateZ(-Math.PI / 2)); // cutter tip
  arm.add(forearm);
  arm.position.set(0.1, 0.26, 0);
  g.add(arm);

  // Small rear stabilizer arm (counterweight, static).
  g.add(bx(0.2, 0.06, 0.06, dark, -0.28, 0.34, 0));
  g.add(mesh(sph(0.06, 8, 6), midM, -0.4, 0.34, 0));

  // Four hover thrusters underneath (glow downward) on a cross.
  for (const [dx, dz] of [[-0.18, -0.18], [-0.18, 0.18], [0.12, -0.18], [0.12, 0.18]]) {
    g.add(mesh(cyl(0.09, 0.12, 0.08, 10), under, dx, 0.22, dz));
    g.add(mesh(cyl(0.08, 0.04, 0.05, 10), thrust, dx, 0.16, dz));
  }

  // Top antenna nub.
  g.add(mesh(cyl(0.012, 0.012, 0.2, 6), dark, -0.16, 0.72, 0.06));

  g.userData.body = body;
  g.userData.arm = arm;
  g.userData.animate = (t, moving) => {
    // Gentle bob + idle roll; arm reaches/works, forearm flexes.
    g.position.y = 0.07 + Math.sin(t * 4) * 0.045;
    body.rotation.z = Math.sin(t * 2.2) * 0.05;
    g.rotation.y = Math.sin(t * 0.8) * 0.03;
    if (moving) {
      arm.rotation.z = 0.55;            // tucked while travelling
      forearm.rotation.z = 0.3;
    } else {
      arm.rotation.z = 0.12 + Math.sin(t * 3) * 0.12;       // working
      forearm.rotation.z = 0.25 + Math.sin(t * 6 + 1) * 0.18;
    }
  };
  g.position.y = 0.07;
  return g;
}

// --- Trooper: armored humanoid marine with rifle ------------------------------
// radius 0.7, ~1.6 units tall. Swings legs/arms when moving.
function buildTrooper(c) {
  const g = new THREE.Group();
  const armor = metal(HULL, 0.45);
  const plate = mat(HULL_MID, { rough: 0.5, metal: 0.6 });
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.55 });
  const under = mat(UNDER, { rough: 0.7, metal: 0.45 });
  const prim = mat(c.primary, { rough: 0.45, metal: 0.5 });
  const trim = glowMat(c.accent, 1.4);
  const gun = metal(GUNMETAL, 0.45);

  // --- Legs (pivot at hip; thigh + shin + boot) ---
  function makeLeg() {
    const leg = new THREE.Group();
    leg.add(bx(0.15, 0.3, 0.17, under, 0, -0.15, 0));       // thigh
    leg.add(bx(0.1, 0.04, 0.1, prim, 0.06, -0.04, 0));      // hip accent
    leg.add(bx(0.14, 0.28, 0.16, dark, 0, -0.46, 0));       // shin
    leg.add(bx(0.13, 0.1, 0.07, plate, -0.01, -0.34, 0.1)); // shin guard
    leg.add(bx(0.2, 0.11, 0.28, armor, 0.03, -0.62, 0));    // boot
    leg.add(mesh(sph(0.02, 6, 5), trim, 0.05, -0.3, 0.09)); // knee light
    return leg;
  }
  const legL = makeLeg(); legL.position.set(0, 0.62, 0.14);
  const legR = makeLeg(); legR.position.set(0, 0.62, -0.14);
  g.add(legL, legR);

  // --- Pelvis + torso ---
  g.add(bx(0.36, 0.18, 0.34, dark, 0, 0.62, 0));            // pelvis
  g.add(bx(0.34, 0.05, 0.3, prim, 0, 0.71, 0));             // belt
  const torso = bx(0.44, 0.46, 0.34, armor, 0, 0.95, 0);
  g.add(torso);
  g.add(bx(0.3, 0.42, 0.06, plate, 0.21, 0.95, 0));         // chest plate (front +X)
  g.add(panelLine(dark, 0.02, 0.4, 0.3, 0.245, 0.95, 0));   // chest seam
  // Chest faction plate + glowing core light.
  g.add(bx(0.16, 0.16, 0.05, prim, 0.235, 0.99, 0));
  g.add(mesh(sph(0.06, 10, 8), trim, 0.27, 0.99, 0));       // core glow
  g.add(bx(0.34, 0.1, 0.3, dark, 0, 1.16, 0));              // collar yoke

  // Shoulder pads (angular, faction-trimmed).
  for (const z of [0.27, -0.27]) {
    g.add(bx(0.16, 0.18, 0.2, plate, 0, 1.12, z));
    g.add(bx(0.18, 0.05, 0.22, prim, 0, 1.2, z));
    g.add(mesh(sph(0.025, 6, 5), trim, 0.08, 1.14, z));
  }

  // Head / helmet with glowing visor (faces +X).
  g.add(bx(0.22, 0.22, 0.24, armor, 0.01, 1.32, 0));
  g.add(bx(0.12, 0.05, 0.22, dark, 0.06, 1.39, 0));         // helmet crest
  g.add(bx(0.07, 0.07, 0.21, glowMat(c.accent, 1.5), 0.15, 1.33, 0)); // visor slit

  // Back pack with twin vents.
  g.add(bx(0.18, 0.36, 0.28, dark, -0.23, 0.98, 0));
  g.add(mesh(cyl(0.05, 0.05, 0.12, 8), under, -0.33, 1.16, 0.09));
  g.add(mesh(cyl(0.05, 0.05, 0.12, 8), under, -0.33, 1.16, -0.09));
  g.add(panelLine(prim, 0.04, 0.3, 0.04, -0.33, 0.98, 0));

  // --- Right arm + rifle (pivot at shoulder so it swings) ---
  const armR = new THREE.Group();
  armR.add(bx(0.13, 0.22, 0.14, armor, 0, -0.11, 0));       // upper arm
  armR.add(bx(0.12, 0.2, 0.12, dark, 0.02, -0.3, 0));       // forearm
  // Rifle held forward.
  armR.add(bx(0.5, 0.1, 0.1, gun, 0.32, -0.34, 0));         // barrel body
  armR.add(bx(0.13, 0.16, 0.12, dark, 0.12, -0.34, 0));     // receiver
  armR.add(bx(0.06, 0.16, 0.06, dark, 0.06, -0.46, 0));     // magazine
  armR.add(mesh(cyl(0.035, 0.035, 0.16, 8), glowMat(c.accent, 1.1), 0.6, -0.34, 0).rotateZ(Math.PI / 2)); // muzzle glow
  armR.position.set(0.06, 1.14, 0.27);
  g.add(armR);

  // --- Left arm (swings opposite) ---
  const armL = new THREE.Group();
  armL.add(bx(0.13, 0.22, 0.14, armor, 0, -0.11, 0));
  armL.add(bx(0.12, 0.22, 0.12, dark, 0, -0.32, 0));
  armL.add(bx(0.13, 0.08, 0.13, plate, 0, -0.45, 0));       // fist
  armL.position.set(0, 1.14, -0.27);
  g.add(armL);

  g.userData.animate = (t, moving) => {
    if (moving) {
      const s = Math.sin(t * 11);
      legL.rotation.z = s * 0.55; legR.rotation.z = -s * 0.55;
      armL.rotation.z = -s * 0.42; armR.rotation.z = s * 0.18;
      g.position.y = Math.abs(Math.sin(t * 11)) * 0.035;
    } else {
      // Subtle breathing idle.
      const b = Math.sin(t * 1.8) * 0.02;
      legL.rotation.z = legR.rotation.z = 0;
      armL.rotation.z = b; armR.rotation.z = -b * 0.5;
      g.position.y = b * 0.4;
    }
  };
  return g;
}

// --- Striker: sleek fast hover-speeder/bike raider ----------------------------
// radius 0.8. Low, aerodynamic, floats; banks hard when moving.
function buildStriker(c) {
  const g = new THREE.Group();
  // Inner pivot group so banking doesn't fight the hover-height on g itself.
  const body = new THREE.Group();
  g.add(body);

  const hull = metal(HULL, 0.28);
  const midM = metal(HULL_MID, 0.4);
  const dark = mat(HULL_DARK, { rough: 0.5, metal: 0.7 });
  const under = mat(UNDER, { rough: 0.65, metal: 0.5 });
  const prim = mat(c.primary, { rough: 0.32, metal: 0.6 });
  const trim = glowMat(c.accent, 1.3);
  const jet = glowMat(c.emissive, 1.4);

  // Long tapered central chassis (faces +X).
  body.add(bx(1.05, 0.2, 0.42, hull, -0.02, 0.5, 0));
  body.add(bx(0.7, 0.12, 0.5, midM, 0.0, 0.4, 0));         // belly fairing
  // Sharp nose wedge (4-sided cone = chiseled prow).
  const nose = mesh(cone(0.22, 0.62, 4), prim, 0.72, 0.5, 0);
  nose.rotation.z = -Math.PI / 2;
  nose.scale.set(1, 1, 0.65);
  body.add(nose);
  body.add(mesh(sph(0.05, 8, 6), trim, 1.0, 0.5, 0)); // nose tip light
  // Cockpit canopy + frame.
  const canopy = mesh(sph(0.22, 14, 10), glassMat(c.accent, c.emissive), 0.16, 0.61, 0);
  canopy.scale.set(1.5, 0.82, 0.9);
  body.add(canopy);
  body.add(bx(0.42, 0.03, 0.06, dark, 0.16, 0.7, 0.16));   // canopy frame
  body.add(bx(0.42, 0.03, 0.06, dark, 0.16, 0.7, -0.16));
  // Faction dorsal spine + swept tail fin.
  body.add(bx(0.85, 0.04, 0.07, prim, -0.08, 0.63, 0));
  const fin = bx(0.36, 0.26, 0.04, prim, -0.46, 0.68, 0);
  fin.rotation.z = 0.35;
  body.add(fin);
  body.add(mesh(sph(0.04, 6, 5), trim, -0.62, 0.78, 0));   // tail light

  // Twin side outrigger pods with glowing hover jets + forward struts.
  for (const z of [-0.34, 0.34]) {
    body.add(bx(0.72, 0.13, 0.16, dark, -0.04, 0.42, z));
    body.add(mesh(cyl(0.1, 0.13, 0.18, 10), under, -0.32, 0.36, z));
    body.add(mesh(cyl(0.085, 0.05, 0.06, 10), jet, -0.32, 0.27, z)); // downward thrust
    body.add(bx(0.2, 0.05, 0.05, prim, 0.28, 0.42, z));   // outrigger stripe
    body.add(mesh(sph(0.045, 8, 6), trim, 0.44, 0.42, z)); // forward strut light
  }
  // Rear twin thruster nozzles (point -X).
  for (const z of [-0.14, 0.14]) {
    body.add(mesh(cyl(0.09, 0.11, 0.2, 10), under, -0.6, 0.5, z).rotateZ(Math.PI / 2));
    body.add(mesh(cyl(0.07, 0.07, 0.06, 10), jet, -0.72, 0.5, z).rotateZ(Math.PI / 2));
  }

  g.userData.body = body;
  g.userData.animate = (t, moving) => {
    g.position.y = 0.1 + Math.sin(t * 5) * 0.055;
    // Bank into the turn when moving, lazy sway at idle.
    body.rotation.z = moving ? -0.16 + Math.sin(t * 7) * 0.02 : Math.sin(t * 2) * 0.04;
    body.rotation.x = moving ? Math.sin(t * 9) * 0.025 : 0;
    body.position.x = moving ? 0.02 : 0;
  };
  g.position.y = 0.1;
  return g;
}

// --- Tank: heavy treaded siege vehicle with big rotating turret ---------------
// radius 1.4. Largest unit. Turret child named exactly 'turret'.
function buildTank(c) {
  const g = new THREE.Group();
  const hull = metal(HULL, 0.5);
  const midM = mat(HULL_MID, { rough: 0.55, metal: 0.7 });
  const dark = mat(HULL_DARK, { rough: 0.6, metal: 0.6 });
  const under = mat(UNDER, { rough: 0.75, metal: 0.45 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const trim = glowMat(c.accent, 1.4);
  const vent = glowMat(c.emissive, 1.1);
  const treadMat = mat(TREAD, { rough: 0.9, metal: 0.3 });
  const gun = metal(GUNMETAL, 0.45);

  // Two tread assemblies (left/right), each a long box with wheels + skirt.
  for (const z of [-0.62, 0.62]) {
    g.add(bx(2.1, 0.42, 0.44, treadMat, 0, 0.3, z));        // track band
    g.add(bx(2.0, 0.12, 0.5, dark, 0, 0.5, z));             // fender
    // Road wheels.
    for (const x of [-0.74, -0.37, 0, 0.37, 0.74]) {
      const w = mesh(cyl(0.2, 0.2, 0.46, 12), under, x, 0.28, z);
      w.rotation.x = Math.PI / 2;
      g.add(w);
      g.add(mesh(cyl(0.08, 0.08, 0.48, 8), midM, x, 0.28, z).rotateX(Math.PI / 2)); // hub
    }
    // Drive sprockets (ends).
    for (const x of [-1.0, 1.0]) {
      const s = mesh(cyl(0.24, 0.24, 0.44, 10), dark, x, 0.32, z);
      s.rotation.x = Math.PI / 2;
      g.add(s);
    }
    // Angled track skirt with faction stripe + tread cleats hint.
    g.add(bx(2.0, 0.12, 0.06, prim, 0, 0.52, z + (z > 0 ? 0.24 : -0.24)));
    for (const x of [-0.6, 0, 0.6]) {
      g.add(panelLine(under, 0.06, 0.46, 0.06, x, 0.3, z + (z > 0 ? 0.23 : -0.23)));
    }
  }

  // Lower hull body between the treads + sloped glacis at front.
  g.add(bx(1.7, 0.42, 1.0, hull, 0, 0.56, 0));
  const glacis = bx(0.55, 0.44, 1.0, hull, 0.85, 0.56, 0);
  glacis.rotation.z = -0.5;
  g.add(glacis);
  g.add(bx(0.4, 0.1, 0.9, prim, 0.95, 0.4, 0));            // front tow stripe
  // Headlights either side of glacis.
  g.add(mesh(sph(0.06, 8, 6), trim, 1.02, 0.5, 0.36));
  g.add(mesh(sph(0.06, 8, 6), trim, 1.02, 0.5, -0.36));

  // Upper deck + engine grille (rear) + glowing side vents.
  g.add(bx(1.4, 0.22, 0.86, dark, -0.05, 0.82, 0));
  g.add(bx(0.4, 0.16, 0.7, under, -0.7, 0.84, 0));          // rear engine block
  for (const x of [-0.78, -0.6, -0.42]) {
    g.add(panelLine(vent, 0.04, 0.1, 0.6, x, 0.92, 0));     // grille slats
  }
  g.add(bx(0.5, 0.08, 0.04, vent, 0.1, 0.82, 0.45));        // side vent L
  g.add(bx(0.5, 0.08, 0.04, vent, 0.1, 0.82, -0.45));       // side vent R
  // Deck greebles: stowage box + antenna.
  g.add(bx(0.3, 0.16, 0.5, midM, 0.45, 0.9, 0.34));
  g.add(mesh(cyl(0.012, 0.012, 0.5, 6), dark, 0.4, 1.1, -0.36));

  // ---- Turret (separately addressable, rotates in XZ) ----
  const turret = new THREE.Group();
  turret.name = 'turret';
  turret.position.set(-0.05, 0.98, 0);

  // Turret ring + faceted dome (hexagonal feel via stacked boxes).
  turret.add(mesh(cyl(0.5, 0.58, 0.18, 16), dark, 0, 0.09, 0));
  turret.add(bx(0.78, 0.32, 0.74, hull, 0, 0.34, 0));      // main mass
  turret.add(bx(0.5, 0.18, 0.84, midM, -0.1, 0.52, 0));    // raised roof
  turret.add(bx(0.86, 0.14, 0.5, hull, 0.05, 0.28, 0));    // cheek plates
  // Faction mantlet + bustle stowage rack at rear.
  turret.add(bx(0.18, 0.34, 0.62, prim, 0.44, 0.34, 0));   // mantlet
  turret.add(bx(0.34, 0.24, 0.78, dark, -0.46, 0.34, 0));  // rear bustle
  turret.add(panelLine(prim, 0.04, 0.2, 0.7, -0.62, 0.34, 0));
  // Commander cupola + sensor + side glow strips.
  turret.add(mesh(cyl(0.15, 0.17, 0.16, 12), dark, -0.16, 0.62, 0.16));
  turret.add(mesh(sph(0.07, 10, 8), trim, -0.1, 0.66, 0));  // sensor
  turret.add(bx(0.5, 0.04, 0.05, glowMat(c.accent, 1.0), 0.0, 0.5, 0.38));
  turret.add(bx(0.5, 0.04, 0.05, glowMat(c.accent, 1.0), 0.0, 0.5, -0.38));
  // Coax MG + smoke launchers.
  turret.add(mesh(cyl(0.04, 0.04, 0.4, 8), gun, 0.5, 0.46, 0.2).rotateZ(Math.PI / 2));
  for (const z of [0.26, 0.34, 0.42]) {
    turret.add(mesh(cyl(0.03, 0.03, 0.12, 6), dark, 0.2, 0.5, z));
  }

  // Big main cannon pointing +X with mantlet sleeve + muzzle brake.
  turret.add(mesh(cyl(0.13, 0.15, 1.35, 14), gun, 0.98, 0.34, 0).rotateZ(Math.PI / 2));
  turret.add(mesh(cyl(0.17, 0.17, 0.2, 12), prim, 0.5, 0.34, 0).rotateZ(Math.PI / 2));   // recoil sleeve / faction band
  turret.add(mesh(cyl(0.19, 0.19, 0.24, 12), dark, 1.6, 0.34, 0).rotateZ(Math.PI / 2));  // muzzle brake
  turret.add(panelLine(under, 0.06, 0.4, 0.16, 1.6, 0.34, 0)); // muzzle brake vent slot
  turret.add(mesh(sph(0.05, 8, 6), trim, 0.58, 0.5, 0.18));    // coax light

  g.add(turret);
  g.userData.turret = turret;

  g.userData.animate = (t, moving) => {
    // Heavy idle rumble; subtle settle when stationary.
    g.position.y = moving ? Math.sin(t * 16) * 0.014 : Math.sin(t * 2.5) * 0.004;
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

// Shared: a beveled foundation pad (two stacked boxes) that grounds a structure.
function foundation(half, h, color = HULL_DARK) {
  const f = new THREE.Group();
  f.add(bx(half * 2, h * 0.6, half * 2, mat(UNDER, { rough: 0.85, metal: 0.35 }), 0, h * 0.3, 0));
  f.add(bx(half * 2 - 0.3, h * 0.5, half * 2 - 0.3, mat(color, { rough: 0.8, metal: 0.4 }), 0, h * 0.75, 0));
  return f;
}

// Perimeter glowing light strip helper (4 edges of a square footprint).
function perimeterStrip(g, half, y, trim, inset = 0.2) {
  const e = half - inset;
  g.add(bx(e * 2, 0.06, 0.1, trim, 0, y, e));
  g.add(bx(e * 2, 0.06, 0.1, trim, 0, y, -e));
  g.add(bx(0.1, 0.06, e * 2, trim, e, y, 0));
  g.add(bx(0.1, 0.06, e * 2, trim, -e, y, 0));
}

// --- HQ: imposing tiered command nexus — the hero structure -------------------
function buildHQ(c) {
  const g = new THREE.Group();
  const half = 4;
  const hull = metal(HULL, 0.5);
  const midM = mat(HULL_MID, { rough: 0.55, metal: 0.6 });
  const dark = mat(HULL_DARK, { rough: 0.65, metal: 0.55 });
  const under = mat(UNDER, { rough: 0.8, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.55 });
  const trim = glowMat(c.accent, 1.2);
  const beacon = glowMat(c.emissive, 1.6);

  // Foundation + tiered skirt.
  g.add(foundation(half, 0.5));
  g.add(bx(half * 2 - 0.4, 0.36, half * 2 - 0.4, hull, 0, 0.68, 0));
  g.add(bx(half * 2 - 1.4, 0.3, half * 2 - 1.4, midM, -0.2, 1.0, 0)); // second tier
  perimeterStrip(g, half, 0.86, trim, 0.2);
  // Foundation corner buttresses.
  for (const [dx, dz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    g.add(bx(0.6, 1.0, 0.6, dark, dx * (half - 0.5), 1.0, dz * (half - 0.5)));
    g.add(bx(0.5, 0.08, 0.5, trim, dx * (half - 0.5), 1.55, dz * (half - 0.5)));
  }

  // Central command tower — stepped octagonal mass.
  const tower = mesh(cyl(1.7, 2.1, 2.2, 8), hull, -0.4, 2.1, 0);
  g.add(tower);
  g.add(mesh(cyl(1.75, 1.75, 0.16, 8), dark, -0.4, 1.1, 0)); // base flange
  // Glowing command-bridge window band.
  g.add(mesh(cyl(1.45, 1.45, 0.5, 8), glassMat(c.accent, c.emissive), -0.4, 2.7, 0));
  // Vertical panel ribs around the tower.
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    g.add(panelLine(midM, 0.12, 1.8, 0.12, -0.4 + Math.cos(a) * 1.85, 2.4, Math.sin(a) * 1.85));
  }
  // Faction collar ring + domed sensor cap.
  g.add(mesh(cyl(1.3, 1.75, 0.5, 8), prim, -0.4, 3.4, 0));
  g.add(mesh(sph(1.28, 14, 10), hull, -0.4, 3.65, 0));
  g.add(mesh(torus(1.1, 0.07, 8, 18), trim, -0.4, 3.65, 0).rotateX(Math.PI / 2));

  // Slowly rotating radar/antenna mast on top.
  const radar = new THREE.Group();
  radar.position.set(-0.4, 4.5, 0);
  radar.add(mesh(cyl(0.06, 0.06, 0.7, 8), dark, 0, 0.35, 0));
  const dish = mesh(cyl(0.52, 0.52, 0.06, 18), midM, 0, 0.7, 0.32);
  dish.rotation.x = -0.7;
  radar.add(dish);
  radar.add(mesh(cyl(0.14, 0.14, 0.05, 12), prim, 0, 0.7, 0.32).rotateX(-0.7)); // dish hub
  radar.add(mesh(sph(0.08, 8, 6), beacon, 0, 0.72, 0.34)); // feed horn glow
  radar.add(bx(0.04, 0.04, 0.7, dark, 0, 0.7, -0.1).rotateX(-0.7)); // counter-arm
  g.add(radar);

  // Two flanking antenna spires with pulsing beacon lights.
  for (const z of [-2.9, 2.9]) {
    g.add(mesh(cyl(0.12, 0.2, 2.8, 8), dark, -1.8, 1.9, z));
    g.add(mesh(cyl(0.16, 0.16, 0.1, 8), prim, -1.8, 2.7, z));
    g.add(mesh(sph(0.15, 8, 6), beacon, -1.8, 3.4, z));
  }

  // Integrated landing pad on the +X side (the clear "front").
  const pad = mesh(cyl(1.55, 1.55, 0.18, 24), dark, 2.1, 0.78, 0);
  g.add(pad);
  g.add(mesh(torus(1.22, 0.08, 8, 24), prim, 2.1, 0.89, 0).rotateX(Math.PI / 2));
  g.add(mesh(cyl(0.5, 0.5, 0.04, 20), glowMat(c.accent, 1.0), 2.1, 0.9, 0)); // central glow
  // Hazard chevrons + corner beacon lights.
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    g.add(bx(0.5, 0.04, 0.12, prim, 2.1 + Math.cos(a) * 0.85, 0.9, Math.sin(a) * 0.85).rotateY(-a));
  }
  for (const [dx, dz] of [[1.1, 1.1], [1.1, -1.1], [-1.1, 1.1], [-1.1, -1.1]]) {
    g.add(mesh(sph(0.08, 8, 6), beacon, 2.1 + dx, 0.92, dz));
  }

  g.userData.radar = radar;
  g.userData.animate = (t) => { radar.rotation.y = t * 0.4; };
  return g;
}

// --- Depot: supply silo with stacked drums ------------------------------------
function buildDepot(c) {
  const g = new THREE.Group();
  const hull = metal(HULL, 0.5);
  const midM = mat(HULL_MID, { rough: 0.55, metal: 0.6 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.5 });
  const under = mat(UNDER, { rough: 0.8, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const trim = glowMat(c.accent, 1.2);

  g.add(foundation(2, 0.3));
  // Central fuel silo with banded rings + vertical seams.
  g.add(mesh(cyl(1.1, 1.28, 1.6, 18), hull, 0, 1.15, 0));
  g.add(mesh(torus(1.14, 0.07, 8, 20), prim, 0, 0.95, 0).rotateX(Math.PI / 2));
  g.add(mesh(torus(1.02, 0.07, 8, 20), prim, 0, 1.55, 0).rotateX(Math.PI / 2));
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    g.add(panelLine(dark, 0.06, 1.4, 0.06, Math.cos(a) * 1.16, 1.15, Math.sin(a) * 1.16));
  }
  // Domed top + valve cluster.
  g.add(mesh(sph(1.06, 16, 10), midM, 0, 1.95, 0));
  g.add(mesh(cyl(0.18, 0.2, 0.34, 10), dark, 0, 2.45, 0));
  g.add(mesh(sph(0.1, 8, 6), trim, 0, 2.66, 0)); // top beacon
  // Three satellite drums with caps.
  for (let i = 0; i < 3; i++) {
    const a = i * (Math.PI * 2 / 3) + 0.4;
    const x = Math.cos(a) * 1.5, z = Math.sin(a) * 1.5;
    g.add(mesh(cyl(0.35, 0.4, 0.95, 12), midM, x, 0.78, z));
    g.add(mesh(sph(0.36, 10, 7), dark, x, 1.25, z));
    g.add(mesh(cyl(0.12, 0.12, 0.5, 8), under, x * 0.6, 0.6, z * 0.6).rotateZ(Math.PI / 2)); // feed pipe
  }
  // Glowing fill-level gauge ladder on +X.
  g.add(bx(0.1, 0.9, 0.06, glowMat(c.accent, 1.3), 1.22, 1.15, 0));
  g.add(bx(0.16, 0.12, 0.16, dark, 1.22, 0.6, 0)); // gauge box
  return g;
}

// --- Barracks: infantry hangar with a big lit bay door ------------------------
function buildBarracks(c) {
  const g = new THREE.Group();
  const half = 3;
  const hull = metal(HULL, 0.55);
  const midM = mat(HULL_MID, { rough: 0.6, metal: 0.55 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.5 });
  const under = mat(UNDER, { rough: 0.8, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const trim = glowMat(c.accent, 1.2);
  const bay = glowMat(c.emissive, 1.3);

  g.add(foundation(half, 0.4));
  // Main hangar block.
  g.add(bx(half * 2 - 0.6, 1.8, half * 2 - 1.2, hull, 0, 1.3, 0));
  g.add(bx(half * 2 - 0.4, 0.16, half * 2 - 1.0, midM, 0, 0.5, 0)); // base flange
  // Horizontal panel seams.
  for (const y of [0.9, 1.6]) {
    g.add(panelLine(dark, half * 2 - 0.6, 0.04, half * 2 - 1.18, 0, y, 0));
  }
  // Curved roof vault (single half-cylinder; one per building so not cached).
  const roofGeo = new THREE.CylinderGeometry(half - 0.6, half - 0.6, half * 2 - 0.6, 18, 1, false, 0, Math.PI);
  const roof = new THREE.Mesh(roofGeo, hull);
  roof.castShadow = true; roof.receiveShadow = true;
  roof.position.set(0, 2.2, 0);
  roof.rotation.x = Math.PI / 2;
  g.add(roof);
  // Roof faction stripe + ridge lights.
  g.add(bx(half * 2 - 1.4, 0.1, 0.5, prim, 0, 3.05, 0));
  g.add(bx(half * 2 - 1.4, 0.05, 0.12, trim, 0, 3.12, 0));

  // Big recessed bay door on +X face with a bright glowing seam grid.
  g.add(bx(0.3, 1.55, 2.4, under, half - 0.55, 1.05, 0));   // recess
  g.add(bx(0.12, 1.4, 2.0, dark, half - 0.42, 1.05, 0));    // door
  g.add(bx(0.06, 1.3, 0.1, bay, half - 0.34, 1.05, 0));     // central seam light
  for (const z of [-0.6, 0.6]) {
    g.add(bx(0.06, 1.3, 0.06, bay, half - 0.34, 1.05, z));  // side seam lights
  }
  // Door faction chevrons.
  g.add(bx(0.1, 1.3, 0.36, prim, half - 0.45, 1.05, 0.74));
  g.add(bx(0.1, 1.3, 0.36, prim, half - 0.45, 1.05, -0.74));

  // Rooftop vents / AC units with glow grilles.
  for (const x of [-1.4, 1.4]) {
    g.add(bx(0.7, 0.4, 0.9, dark, x, 3.05, 0));
    g.add(bx(0.6, 0.06, 0.8, glowMat(c.accent, 0.9), x, 3.27, 0));
  }
  // Corner floodlights.
  for (const [dx, dz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    g.add(mesh(sph(0.1, 8, 6), trim, dx * (half - 0.5), 2.3, dz * (half - 0.9)));
  }
  return g;
}

// --- Factory: heavy vehicle assembly with gantry + smokestacks ----------------
function buildFactory(c) {
  const g = new THREE.Group();
  const half = 3;
  const hull = metal(HULL, 0.55);
  const midM = mat(HULL_MID, { rough: 0.6, metal: 0.55 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.55 });
  const under = mat(UNDER, { rough: 0.82, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const trim = glowMat(c.accent, 1.2);
  const stack = glowMat(c.emissive, 1.3);

  g.add(foundation(half, 0.45));
  // Heavy industrial block (taller, boxier than barracks).
  g.add(bx(half * 2 - 0.5, 2.2, half * 2 - 0.7, hull, -0.3, 1.55, 0));
  g.add(bx(half * 2 - 1.8, 0.9, half * 2 - 1.6, midM, -0.6, 3.1, 0)); // machinery housing
  // Riveted panel seams on the main block.
  for (const y of [1.0, 1.8, 2.5]) {
    g.add(panelLine(dark, half * 2 - 0.5, 0.05, half * 2 - 0.68, -0.3, y, 0));
  }

  // Large vehicle bay opening on +X (dark recess with girders + glow floor).
  g.add(bx(0.6, 1.95, 3.2, under, half - 0.2, 1.42, 0));
  for (const zz of [-0.9, 0, 0.9]) {
    g.add(bx(0.3, 1.95, 0.12, hull, half - 0.05, 1.42, zz)); // door girders
  }
  g.add(bx(0.95, 0.05, 2.8, stack, half + 0.0, 0.5, 0));      // glowing bay floor
  g.add(bx(0.7, 0.08, 3.0, prim, half - 0.1, 1.05, 0));       // lintel beam

  // Twin exhaust smokestacks with glowing tops + soot bands.
  for (const z of [-1.4, 1.4]) {
    g.add(mesh(cyl(0.28, 0.34, 1.7, 12), dark, -1.6, 3.55, z));
    g.add(mesh(torus(0.3, 0.04, 6, 12), midM, -1.6, 3.9, z).rotateX(Math.PI / 2));
    g.add(mesh(cyl(0.3, 0.3, 0.18, 12), stack, -1.6, 4.4, z)); // glowing rim
  }

  // Side gantry crane arm reaching over the bay (with hook).
  g.add(bx(0.18, 1.0, 0.18, dark, -0.4, 3.6, 1.15));         // gantry post
  g.add(bx(2.6, 0.16, 0.18, prim, 0.5, 4.05, 1.15));         // crane rail
  g.add(bx(0.3, 0.22, 0.3, dark, 1.4, 3.9, 1.15));           // trolley
  g.add(mesh(cyl(0.03, 0.03, 0.8, 6), midM, 1.4, 3.5, 1.15)); // hook line
  g.add(bx(0.18, 0.18, 0.18, dark, 1.4, 3.05, 1.15));        // hook block
  g.add(mesh(sph(0.05, 8, 6), trim, 1.4, 4.16, 1.15));       // trolley light

  // Faction warning stripes + corner lights.
  g.add(bx(half * 2 - 0.4, 0.16, 0.1, prim, 0, 0.78, half - 0.35));
  g.add(bx(half * 2 - 0.4, 0.16, 0.1, prim, 0, 0.78, -(half - 0.35)));
  for (const [dx, dz] of [[-1, 1], [-1, -1]]) {
    g.add(mesh(sph(0.09, 8, 6), trim, dx * (half - 0.6), 2.7, dz * (half - 0.6)));
  }
  return g;
}

// --- Refinery: pipework + tanks straddling a geyser, with gas glow ------------
function buildRefinery(c) {
  const g = new THREE.Group();
  const hull = metal(HULL, 0.5);
  const midM = mat(HULL_MID, { rough: 0.55, metal: 0.6 });
  const dark = mat(HULL_DARK, { rough: 0.7, metal: 0.55 });
  const under = mat(UNDER, { rough: 0.82, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const gasGlow = glowMat(0x6ad28a, 1.2);   // green-gold vespene
  const trim = glowMat(c.accent, 1.2);

  g.add(foundation(2, 0.3));
  // Central processing core over the geyser vent + collector hood.
  g.add(mesh(cyl(0.7, 0.92, 1.7, 14), hull, 0, 1.15, 0));
  g.add(mesh(cyl(0.5, 0.72, 0.5, 14), prim, 0, 2.1, 0));
  g.add(mesh(cyl(0.4, 0.4, 0.22, 14), gasGlow, 0, 2.46, 0));  // glowing extraction vent
  g.add(mesh(cone(0.46, 0.4, 12), midM, 0, 2.75, 0));          // exhaust cone cap
  g.add(mesh(sph(0.08, 8, 6), trim, 0, 3.0, 0));              // hazard beacon

  // Three storage tanks around the core, each piped back to it.
  for (let i = 0; i < 3; i++) {
    const a = i * (Math.PI * 2 / 3);
    const x = Math.cos(a) * 1.5, z = Math.sin(a) * 1.5;
    g.add(mesh(cyl(0.45, 0.5, 1.2, 14), hull, x, 0.9, z));
    g.add(mesh(sph(0.47, 14, 9), midM, x, 1.5, z));
    g.add(mesh(torus(0.47, 0.05, 6, 16), prim, x, 1.0, z).rotateX(Math.PI / 2));
    // Connecting pipe to core (rotated to face inward).
    const pipe = mesh(cyl(0.1, 0.1, 1.5, 8), dark, x * 0.5, 0.7, z * 0.5);
    pipe.rotation.z = Math.PI / 2;
    pipe.rotation.y = -a;
    g.add(pipe);
    // Elbow + gas-level glow strip on each tank.
    g.add(mesh(sph(0.12, 8, 6), under, x * 0.92, 0.7, z * 0.92));
    g.add(bx(0.06, 0.5, 0.06, gasGlow, x * 0.78, 0.95, z * 0.78));
  }
  // Low perimeter catwalk hint.
  g.add(mesh(torus(1.55, 0.05, 6, 24), dark, 0, 0.5, 0).rotateX(Math.PI / 2));
  return g;
}

// --- Turret: compact base + rotating gun head (child 'turret') ----------------
// footprint 1 (half-extent 1). Twin barrels track via the 'turret' group.
function buildTurret(c) {
  const g = new THREE.Group();
  const hull = metal(HULL, 0.5);
  const midM = mat(HULL_MID, { rough: 0.55, metal: 0.6 });
  const dark = mat(HULL_DARK, { rough: 0.65, metal: 0.6 });
  const under = mat(UNDER, { rough: 0.82, metal: 0.4 });
  const prim = mat(c.primary, { rough: 0.5, metal: 0.5 });
  const trim = glowMat(c.accent, 1.4);
  const gun = metal(GUNMETAL, 0.45);

  // Hexagonal base bunker (two stacked tiers) + faction ring.
  g.add(mesh(cyl(0.92, 1.0, 0.5, 6), mat(UNDER, { rough: 0.85, metal: 0.4 }), 0, 0.25, 0));
  g.add(mesh(cyl(0.72, 0.82, 0.5, 6), hull, 0, 0.72, 0));
  g.add(mesh(torus(0.8, 0.06, 6, 18), prim, 0, 0.5, 0).rotateX(Math.PI / 2));
  // Ammo conduit greebles around the base.
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3 + 0.5;
    g.add(panelLine(dark, 0.08, 0.4, 0.08, Math.cos(a) * 0.78, 0.5, Math.sin(a) * 0.78));
  }

  // Rotating gun head (named 'turret').
  const turret = new THREE.Group();
  turret.name = 'turret';
  turret.position.set(0, 1.02, 0);
  // Faceted housing + rear counterweight.
  turret.add(bx(0.6, 0.42, 0.7, hull, 0, 0.1, 0));
  turret.add(bx(0.3, 0.32, 0.52, prim, -0.22, 0.12, 0));     // rear block (faction)
  turret.add(bx(0.66, 0.14, 0.5, midM, 0.05, 0.28, 0));      // roof plate
  // Sensor eye + side ammo drums.
  turret.add(mesh(sph(0.08, 10, 8), trim, 0.06, 0.3, 0));
  turret.add(mesh(cyl(0.1, 0.1, 0.4, 10), dark, -0.05, 0.1, 0.3).rotateZ(Math.PI / 2));
  turret.add(mesh(cyl(0.1, 0.1, 0.4, 10), dark, -0.05, 0.1, -0.3).rotateZ(Math.PI / 2));
  // Twin barrels pointing +X with muzzles + glow.
  for (const z of [-0.15, 0.15]) {
    turret.add(mesh(cyl(0.06, 0.07, 0.92, 10), gun, 0.52, 0.1, z).rotateZ(Math.PI / 2));
    turret.add(mesh(cyl(0.09, 0.09, 0.12, 10), dark, 0.98, 0.1, z).rotateZ(Math.PI / 2)); // muzzle
    turret.add(mesh(cyl(0.05, 0.05, 0.06, 8), glowMat(c.accent, 1.1), 1.05, 0.1, z).rotateZ(Math.PI / 2)); // muzzle glow
  }
  g.add(turret);
  g.userData.turret = turret;
  return g;
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

// --- Minerals: cluster of faceted translucent glowing crystals (radius 1.4) ---
function buildMinerals() {
  const g = new THREE.Group();
  const baseRock = mat(0x3a4a55, { rough: 0.92, metal: 0.2 });
  const baseDark = mat(0x2a363f, { rough: 0.95, metal: 0.15 });
  // Slightly emissive icy-blue crystal, low roughness, translucent.
  const crystal = new THREE.MeshStandardMaterial({
    color: 0x9fe2ff, roughness: 0.08, metalness: 0.1,
    emissive: 0x2fa6e6, emissiveIntensity: 0.85,
    transparent: true, opacity: 0.82,
  });
  const crystalCore = new THREE.MeshStandardMaterial({
    color: 0xd6f3ff, roughness: 0.05, metalness: 0.05,
    emissive: 0x57c6ff, emissiveIntensity: 1.2,
    transparent: true, opacity: 0.9,
  });

  // Layered rocky base.
  g.add(mesh(cyl(1.2, 1.38, 0.28, 12), baseRock, 0, 0.14, 0));
  g.add(mesh(cyl(0.9, 1.05, 0.2, 10), baseDark, 0, 0.34, 0));
  // Scatter of small rubble around the base.
  for (let i = 0; i < 6; i++) {
    const a = i * (Math.PI * 2 / 6) + 0.5;
    g.add(bx(0.22, 0.16, 0.22, baseRock, Math.cos(a) * 1.05, 0.12, Math.sin(a) * 1.05).rotateY(a));
  }

  // Faceted crystal shards (cones; deterministic lean, no Math.random for stable look).
  const shards = [
    [0.0, 0.0, 1.5, 0.34, 0.0, 0.0],
    [0.7, 0.3, 1.1, 0.24, 0.32, 0.9],
    [-0.62, 0.42, 1.0, 0.22, -0.36, 2.1],
    [0.32, -0.7, 1.28, 0.27, 0.22, 1.4],
    [-0.52, -0.5, 0.85, 0.2, -0.22, 0.3],
    [0.58, -0.22, 0.72, 0.18, 0.42, 2.7],
    [-0.22, 0.66, 1.15, 0.24, 0.16, 1.1],
    [0.12, 0.5, 0.6, 0.15, -0.1, 0.6],
  ];
  for (const [x, z, h, r, lean, yaw] of shards) {
    const sh = mesh(cone(r, h, 5), crystal, x, 0.4 + h / 2, z);
    sh.rotation.z = lean;
    sh.rotation.y = yaw;
    g.add(sh);
    // Bright inner core spike for the glowing look.
    const core = mesh(cone(r * 0.45, h * 0.85, 5), crystalCore, x, 0.4 + h / 2, z);
    core.rotation.z = lean;
    core.rotation.y = yaw;
    g.add(core);
  }
  return g;
}

// --- Gas: vespene geyser with glowing green-gold vapor column -----------------
function buildGas() {
  const g = new THREE.Group();
  const rock = mat(0x4a4234, { rough: 0.95, metal: 0.15 });
  const darkRock = mat(0x2e2a22, { rough: 1.0, metal: 0.1 });
  const gas = new THREE.MeshStandardMaterial({
    color: 0x9ad17a, roughness: 0.3, metalness: 0.0,
    emissive: 0x6fae3a, emissiveIntensity: 1.0,
    transparent: true, opacity: 0.72,
  });
  const gasBright = new THREE.MeshStandardMaterial({
    color: 0xdcffb0, roughness: 0.25, metalness: 0.0,
    emissive: 0xa6e35a, emissiveIntensity: 1.3,
    transparent: true, opacity: 0.6,
  });

  // Crater rim + inner vent wall.
  g.add(mesh(cyl(1.55, 1.72, 0.45, 16), rock, 0, 0.22, 0));
  g.add(mesh(cyl(1.0, 1.22, 0.5, 16), darkRock, 0, 0.5, 0));
  // Jagged rim rocks.
  for (let i = 0; i < 8; i++) {
    const a = i * (Math.PI * 2 / 8) + 0.3;
    const x = Math.cos(a) * 1.52, z = Math.sin(a) * 1.52;
    const r = mesh(box(0.42, 0.5 + (i % 3) * 0.2, 0.42), rock, x, 0.42, z);
    r.rotation.y = a;
    r.rotation.z = (i % 2 ? 0.1 : -0.1);
    g.add(r);
  }
  // Glowing gas pool + tapering vapor column with a bright inner core.
  g.add(mesh(cyl(0.96, 0.96, 0.1, 16), gasBright, 0, 0.56, 0));
  const column = mesh(cyl(0.4, 0.72, 1.25, 14), gas, 0, 1.12, 0);
  g.add(column);
  g.add(mesh(cyl(0.18, 0.42, 1.0, 12), gasBright, 0, 1.0, 0)); // inner core
  g.add(mesh(cone(0.32, 0.65, 12), gas, 0, 1.95, 0));          // crown puff
  g.add(mesh(cone(0.16, 0.45, 10), gasBright, 0, 1.9, 0));

  g.userData.column = column;
  return g;
}

// ============================================================================
//  PROJECTILES — small, bright, no shadow (cheap, many in flight).
// ============================================================================

export function createProjectileModel(kind) {
  let o;
  if (kind === 'shell') {
    // Tank shell: a small glowing capsule oriented along +X with a hot tip.
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      cyl(0.1, 0.1, 0.42, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xff9a30, emissiveIntensity: 1.6, roughness: 0.4, metalness: 0.3 }),
    );
    body.rotation.z = Math.PI / 2;
    const tip = new THREE.Mesh(
      cone(0.1, 0.18, 8),
      new THREE.MeshStandardMaterial({ color: 0xfff0c0, emissive: 0xffb040, emissiveIntensity: 1.9 }),
    );
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

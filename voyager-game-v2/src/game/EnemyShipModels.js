import * as THREE from 'three';

// v2: every faction has its own distinct model, with named animatable parts
// exposed through userData (spinners, pulsers, thrusters) that CombatSystem
// animates each frame.

const hullMat = (color, opts = {}) =>
  new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.3, ...opts });

const glowMat = (color, opacity = 0.9) =>
  new THREE.MeshBasicMaterial({
    color, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });

// Register a mesh as a pulsing glow (CombatSystem animates opacity/scale)
function addPulser(group, mesh, rate = 3, min = 0.4, max = 1.0) {
  group.userData.pulsers = group.userData.pulsers || [];
  group.userData.pulsers.push({ mesh, rate, min, max, phase: Math.random() * Math.PI * 2 });
}

// Register an object that spins around an axis
function addSpinner(group, obj, axis = 'z', speed = 1) {
  group.userData.spinners = group.userData.spinners || [];
  group.userData.spinners.push({ obj, axis, speed });
}

// Engine thruster flame that stretches with movement
function addThruster(group, position, color, size = 0.5) {
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(size, size * 3, 8),
    glowMat(color, 0.8)
  );
  flame.rotation.x = -Math.PI / 2;
  flame.position.copy(position);
  flame.position.z += size * 1.5;
  group.add(flame);
  group.userData.thrusters = group.userData.thrusters || [];
  group.userData.thrusters.push(flame);
  return flame;
}

// ─── Kazon Raider — asymmetric scavenger wedge ──────────────────────────────
export function createKazonRaider() {
  const group = new THREE.Group();
  const rust = hullMat(0x8B4513, { roughness: 0.6 });
  const darkRust = hullMat(0x5e3010, { roughness: 0.7 });

  // Main hull — angular wedge built from a squashed octahedron
  const hull = new THREE.Mesh(new THREE.OctahedronGeometry(4, 0), rust);
  hull.scale.set(1.0, 0.35, 1.6);
  group.add(hull);

  // Layered armour plates welded on (scavenger look)
  for (let i = 0; i < 6; i++) {
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(1.2 + Math.random(), 0.25, 1.5 + Math.random()),
      darkRust
    );
    plate.position.set((Math.random() - 0.5) * 4, 0.7 + Math.random() * 0.3, (Math.random() - 0.5) * 6);
    plate.rotation.y = (Math.random() - 0.5) * 0.6;
    group.add(plate);
  }

  // Asymmetric wing fins
  const finL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 5.5), darkRust);
  finL.position.set(-3.4, 0.4, 0.5);
  finL.rotation.z = THREE.MathUtils.degToRad(-32);
  group.add(finL);
  const finR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.5, 6.5), darkRust);
  finR.position.set(3.2, 0.2, -0.5);
  finR.rotation.z = THREE.MathUtils.degToRad(28);
  group.add(finR);

  // Forward prow cannon cluster
  for (const off of [-0.5, 0.5]) {
    const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 3.5, 8), hullMat(0x551a00));
    cannon.rotation.x = Math.PI / 2;
    cannon.position.set(off, -0.1, -6.8);
    group.add(cannon);
  }
  const cannonGlow = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), glowMat(0xff6600));
  cannonGlow.position.set(0, -0.1, -8.4);
  group.add(cannonGlow);
  addPulser(group, cannonGlow, 5, 0.3, 1);

  // Engine block + flames
  const engineBlock = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.2, 1.5), darkRust);
  engineBlock.position.set(0, 0, 5.6);
  group.add(engineBlock);
  for (const side of [-1, 1]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), glowMat(0xff7711));
    glow.position.set(side * 1.1, 0, 6.4);
    group.add(glow);
    addPulser(group, glow, 7, 0.5, 1);
    addThruster(group, new THREE.Vector3(side * 1.1, 0, 6.6), 0xff5500, 0.4);
  }

  group.userData.boundingRadius = 8;
  return group;
}

// ─── Kazon Predator — heavy carrier with command spine ──────────────────────
export function createKazonPredator() {
  const group = new THREE.Group();
  const bronze = hullMat(0x9a5a20, { roughness: 0.5, metalness: 0.6 });
  const dark = hullMat(0x4a2c10, { roughness: 0.7 });

  // Massive curved main hull
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 4.2, 16, 10), bronze);
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  // Command spine rising over the stern
  const spine = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.6, 7), dark);
  spine.position.set(0, 2.4, 3.5);
  group.add(spine);
  const bridge = new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 10), bronze);
  bridge.scale.set(1.4, 0.7, 1.2);
  bridge.position.set(0, 4.2, 2.5);
  group.add(bridge);
  const bridgeGlow = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), glowMat(0xffaa44));
  bridgeGlow.position.set(0, 4.4, 1.2);
  group.add(bridgeGlow);
  addPulser(group, bridgeGlow, 2, 0.4, 0.9);

  // Side weapon sponsons
  for (const side of [-1, 1]) {
    const sponson = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 8), dark);
    sponson.position.set(side * 3.6, -0.4, -1);
    group.add(sponson);
    for (let i = 0; i < 3; i++) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 2.2, 6), hullMat(0x551a00));
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(side * 3.6, -0.2, -5.5 - i * 0.0);
      barrel.position.x += (i - 1) * 0.5 * side;
      group.add(barrel);
    }
  }

  // Ram prow
  const prow = new THREE.Mesh(new THREE.ConeGeometry(2.4, 6, 8), dark);
  prow.rotation.x = -Math.PI / 2;
  prow.position.set(0, 0, -10.5);
  group.add(prow);

  // Engines
  for (const side of [-1, 1]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), glowMat(0xff7711));
    glow.position.set(side * 1.6, -0.6, 8.3);
    group.add(glow);
    addPulser(group, glow, 4, 0.5, 1);
    addThruster(group, new THREE.Vector3(side * 1.6, -0.6, 8.6), 0xff5500, 0.7);
  }

  group.userData.boundingRadius = 12;
  return group;
}

// ─── Vidiian Cruiser — organic-mechanical grafted hull ──────────────────────
export function createVidiianCruiser() {
  const group = new THREE.Group();
  const flesh = hullMat(0x7a4a55, { roughness: 0.65, metalness: 0.25 });
  const steel = hullMat(0x5a626e, { roughness: 0.3, metalness: 0.85 });

  // Bulbous organic core — like a grafted organ
  const core = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 12), flesh);
  core.scale.set(1, 0.8, 1.7);
  group.add(core);

  // Mechanical plating grafted over the front half (the "patchwork" aesthetic)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI - Math.PI / 2;
    const plate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 2.6), steel);
    plate.position.set(Math.sin(angle) * 2.8, Math.cos(angle) * 2.2, -2.2);
    plate.lookAt(0, 0, -2.2);
    group.add(plate);
  }

  // Surgical scanner array — forward ring of emitters
  const scanRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.2, 8, 24), steel);
  scanRing.position.set(0, 0, -5.4);
  group.add(scanRing);
  addSpinner(group, scanRing, 'z', 0.8);
  const scanEye = new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 10), glowMat(0x44ff88));
  scanEye.position.set(0, 0, -5.4);
  group.add(scanEye);
  addPulser(group, scanEye, 2.5, 0.5, 1);

  // Dorsal graft veins
  const veinMat = glowMat(0x66ffaa, 0.35);
  for (let i = 0; i < 4; i++) {
    const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 7, 4), veinMat.clone());
    vein.rotation.x = Math.PI / 2;
    const a = (i / 4) * Math.PI * 2;
    vein.position.set(Math.cos(a) * 2.4, Math.sin(a) * 1.9, 0);
    group.add(vein);
    addPulser(group, vein, 1.5 + i * 0.3, 0.15, 0.5);
  }

  // Stern engine cluster
  const stern = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 2.5, 10), steel);
  stern.rotation.x = Math.PI / 2;
  stern.position.set(0, 0, 5.2);
  group.add(stern);
  const sternGlow = new THREE.Mesh(new THREE.SphereGeometry(1.0, 10, 10), glowMat(0x44ff88));
  sternGlow.position.set(0, 0, 6.4);
  group.add(sternGlow);
  addPulser(group, sternGlow, 3, 0.5, 1);
  addThruster(group, new THREE.Vector3(0, 0, 6.8), 0x44ff88, 0.7);

  group.userData.boundingRadius = 9;
  return group;
}

// ─── Hirogen Hunter — predatory dagger ──────────────────────────────────────
export function createHirogenHunter() {
  const group = new THREE.Group();
  const gunmetal = hullMat(0x3c4048, { roughness: 0.25, metalness: 0.9 });
  const bone = hullMat(0x8a8678, { roughness: 0.5 });

  // Long dagger hull
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 0.5, 15, 8), gunmetal);
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  // Armoured "jaw" prow — split mandibles
  for (const side of [-1, 1]) {
    const jaw = new THREE.Mesh(new THREE.ConeGeometry(0.5, 4.5, 6), bone);
    jaw.rotation.x = -Math.PI / 2;
    jaw.rotation.z = side * 0.12;
    jaw.position.set(side * 0.7, -0.2, -8.8);
    group.add(jaw);
  }

  // Sensor eye between the jaws
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 12), glowMat(0xffcc33));
  eye.position.set(0, 0.3, -7.6);
  group.add(eye);
  addPulser(group, eye, 1.8, 0.6, 1);

  // Dorsal trophy spines
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.4, 5), bone);
    spike.position.set(0, 1.5, -3 + i * 1.8);
    group.add(spike);
  }

  // Swept hunting wings
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 8.5), gunmetal);
    wing.position.set(side * 1.9, -0.3, 2.5);
    wing.rotation.z = side * THREE.MathUtils.degToRad(55);
    wing.rotation.y = side * THREE.MathUtils.degToRad(-12);
    group.add(wing);
  }

  // Twin engine pods
  for (const side of [-1, 1]) {
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 3.2, 8), gunmetal);
    pod.rotation.x = Math.PI / 2;
    pod.position.set(side * 2.0, 0, 7.5);
    group.add(pod);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 8), glowMat(0x66aaff));
    glow.position.set(side * 2.0, 0, 9.2);
    group.add(glow);
    addPulser(group, glow, 6, 0.5, 1);
    addThruster(group, new THREE.Vector3(side * 2.0, 0, 9.4), 0x6699ff, 0.4);
  }

  group.userData.boundingRadius = 9;
  return group;
}

// ─── Borg Cube — greebled menace ────────────────────────────────────────────
export function createBorgCube() {
  const group = new THREE.Group();
  const borgDark = hullMat(0x1c241c, { roughness: 0.4, metalness: 0.85 });
  const borgMid = hullMat(0x2c3a2c, { roughness: 0.25, metalness: 0.9 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), borgDark);
  group.add(body);

  // Dense greebling: pipes, panels, struts on every face
  const faces = [
    { n: new THREE.Vector3(1, 0, 0) }, { n: new THREE.Vector3(-1, 0, 0) },
    { n: new THREE.Vector3(0, 1, 0) }, { n: new THREE.Vector3(0, -1, 0) },
    { n: new THREE.Vector3(0, 0, 1) }, { n: new THREE.Vector3(0, 0, -1) },
  ];
  for (const face of faces) {
    for (let i = 0; i < 14; i++) {
      const long = Math.random() < 0.4;
      const geo = long
        ? new THREE.BoxGeometry(0.4, 0.4, 3 + Math.random() * 4)
        : new THREE.BoxGeometry(1 + Math.random() * 1.6, 0.5 + Math.random() * 0.6, 1 + Math.random() * 1.6);
      const greeble = new THREE.Mesh(geo, Math.random() < 0.5 ? borgMid : borgDark);
      const u = (Math.random() - 0.5) * 10;
      const v = (Math.random() - 0.5) * 10;
      const pos = face.n.clone().multiplyScalar(6.2);
      if (face.n.x !== 0) { pos.y = u; pos.z = v; greeble.rotation.y = Math.PI / 2; }
      else if (face.n.y !== 0) { pos.x = u; pos.z = v; greeble.rotation.x = Math.PI / 2; }
      else { pos.x = u; pos.y = v; }
      greeble.position.copy(pos);
      if (long) greeble.rotation.z = Math.random() * Math.PI;
      group.add(greeble);
    }
    // Green glow vents per face
    for (let i = 0; i < 3; i++) {
      const vent = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), glowMat(0x33ff33, 0.7));
      const u = (Math.random() - 0.5) * 9;
      const v = (Math.random() - 0.5) * 9;
      const pos = face.n.clone().multiplyScalar(6.05);
      if (face.n.x !== 0) { pos.y = u; pos.z = v; }
      else if (face.n.y !== 0) { pos.x = u; pos.z = v; }
      else { pos.x = u; pos.y = v; }
      vent.position.copy(pos);
      vent.lookAt(pos.clone().add(face.n));
      group.add(vent);
      addPulser(group, vent, 1 + Math.random() * 2, 0.2, 0.8);
    }
  }

  const light = new THREE.PointLight(0x00ff00, 4, 40);
  group.add(light);

  // Tractor emitter
  const emitter = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), glowMat(0x00ff00));
  emitter.position.set(0, 0, -6.4);
  group.add(emitter);
  addPulser(group, emitter, 4, 0.5, 1);
  group.userData.tractorEmitter = emitter;

  group.userData.boundingRadius = 10;
  return group;
}

// ─── Borg Sphere (probe) ────────────────────────────────────────────────────
export function createBorgSphere() {
  const group = new THREE.Group();
  const borgDark = hullMat(0x1c241c, { roughness: 0.4, metalness: 0.85 });
  const borgMid = hullMat(0x2c3a2c, { roughness: 0.25, metalness: 0.9 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(5, 24, 18), borgDark);
  group.add(body);

  // Surface bands of tech
  for (let i = 0; i < 4; i++) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(5.02, 0.18, 6, 48), borgMid);
    band.rotation.x = Math.random() * Math.PI;
    band.rotation.y = Math.random() * Math.PI;
    group.add(band);
  }
  // Greeble patches on the sphere surface
  for (let i = 0; i < 24; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 5.0;
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    const greeble = new THREE.Mesh(
      new THREE.BoxGeometry(0.7 + Math.random(), 0.3, 0.7 + Math.random()),
      Math.random() < 0.5 ? borgMid : borgDark
    );
    greeble.position.copy(pos);
    greeble.lookAt(pos.clone().multiplyScalar(2));
    group.add(greeble);
  }
  // Glow ports
  for (let i = 0; i < 8; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const pos = new THREE.Vector3(
      5.1 * Math.sin(phi) * Math.cos(theta),
      5.1 * Math.cos(phi),
      5.1 * Math.sin(phi) * Math.sin(theta)
    );
    const port = new THREE.Mesh(new THREE.SphereGeometry(0.25, 6, 6), glowMat(0x33ff33));
    port.position.copy(pos);
    group.add(port);
    addPulser(group, port, 1 + Math.random() * 3, 0.3, 1);
  }

  const light = new THREE.PointLight(0x00ff00, 3, 30);
  group.add(light);

  group.userData.boundingRadius = 7;
  return group;
}

// ─── Krenim Temporal Ship ───────────────────────────────────────────────────
export function createKrenimTemporalShip() {
  const group = new THREE.Group();
  const violet = hullMat(0x6a5588, { roughness: 0.3, metalness: 0.75 });
  const darkViolet = hullMat(0x453560, { roughness: 0.4 });

  // Long armoured hull
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(2, 1, 18, 10), violet);
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  // Dorsal & ventral armour ridges
  for (const sign of [1, -1]) {
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 14), darkViolet);
    ridge.position.set(0, sign * 1.7, 0.5);
    group.add(ridge);
  }

  // Double counter-rotating temporal rings
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.28, 8, 36), glowMat(0xff8800));
  ring1.position.z = -1;
  group.add(ring1);
  addSpinner(group, ring1, 'z', 2);
  group.userData.temporalRing = ring1;

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.2, 8, 36), glowMat(0xffbb44, 0.7));
  ring2.position.z = 1.5;
  group.add(ring2);
  addSpinner(group, ring2, 'z', -3);

  // Forward temporal cannon prong
  const prong = new THREE.Mesh(new THREE.ConeGeometry(0.9, 6, 8), darkViolet);
  prong.rotation.x = -Math.PI / 2;
  prong.position.set(0, 0, -11.5);
  group.add(prong);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), glowMat(0xffaa00));
  muzzle.position.set(0, 0, -14.2);
  group.add(muzzle);
  addPulser(group, muzzle, 5, 0.3, 1);

  // Pulsing energy core
  const core = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 12), glowMat(0xaa44ff, 0.85));
  group.add(core);
  group.userData.energyCore = core;
  addPulser(group, core, 3.5, 0.4, 1);

  // Stern engines
  for (const side of [-1, 1]) {
    addThruster(group, new THREE.Vector3(side * 0.8, 0, 9.4), 0xcc88ff, 0.5);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), glowMat(0xcc88ff));
    glow.position.set(side * 0.8, 0, 9.2);
    group.add(glow);
    addPulser(group, glow, 6, 0.5, 1);
  }

  group.userData.boundingRadius = 11;
  return group;
}

// ─── Species 8472 Bioship ───────────────────────────────────────────────────
export function createSpecies8472Bioship() {
  const group = new THREE.Group();
  const fleshMat = hullMat(0x6a7a3a, { roughness: 0.7, metalness: 0.1, emissive: 0x121a06 });

  // Sinuous tapered body built from lathed profile
  const profile = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const r = Math.sin(t * Math.PI) * 1.9 * (1 - t * 0.45) + 0.12;
    profile.push(new THREE.Vector2(r, (t - 0.5) * 19));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 12), fleshMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Three curving organic arms near the head
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const armGroup = new THREE.Group();
    armGroup.position.set(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, -4.5);
    armGroup.rotation.z = angle;
    for (let seg = 0; seg < 4; seg++) {
      const segMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45 - seg * 0.09, 0.55 - seg * 0.09, 2.2, 7),
        fleshMat
      );
      segMesh.position.set(0, 1.0 + seg * 1.9, seg * -0.5);
      segMesh.rotation.x = seg * 0.25;
      armGroup.add(segMesh);
    }
    group.add(armGroup);
    addSpinner(group, armGroup, 'y', 0.15 * (i % 2 === 0 ? 1 : -1));
  }

  // Bio-energy maw at the bow
  const maw = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), glowMat(0xccff22));
  maw.position.set(0, 0, -9.8);
  group.add(maw);
  addPulser(group, maw, 2, 0.5, 1);
  group.userData.energyCore = maw;

  // Bioluminescent nodes along the body
  for (let i = 0; i < 7; i++) {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), glowMat(0x88ff44, 0.7));
    const a = i * 1.7;
    node.position.set(Math.cos(a) * 1.5, Math.sin(a) * 1.5, -6 + i * 2);
    group.add(node);
    addPulser(group, node, 1 + i * 0.4, 0.2, 0.9);
  }

  group.userData.boundingRadius = 11;
  return group;
}

// ─── Devore Warship — imperial interceptor ──────────────────────────────────
export function createDevoreWarship() {
  const group = new THREE.Group();
  const slate = hullMat(0x4a4a58, { roughness: 0.3, metalness: 0.85 });
  const crimson = hullMat(0x7a2030, { roughness: 0.4 });

  // Flattened arrowhead hull
  const hull = new THREE.Mesh(new THREE.ConeGeometry(3.4, 13, 4), slate);
  hull.rotation.x = -Math.PI / 2;
  hull.rotation.z = Math.PI / 4;
  hull.scale.set(1, 1, 0.4);
  hull.position.z = -1;
  group.add(hull);

  // Stern block
  const stern = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 4), slate);
  stern.position.set(0, 0, 4.5);
  group.add(stern);

  // Imperial crimson canopy stripe
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 9), crimson);
  stripe.position.set(0, 0.85, 0);
  group.add(stripe);

  // Command canopy
  const canopy = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    glowMat(0xff5566, 0.6)
  );
  canopy.scale.set(1, 0.6, 1.6);
  canopy.position.set(0, 0.9, 2.2);
  group.add(canopy);
  addPulser(group, canopy, 1.2, 0.4, 0.75);

  // Wingtip cannons
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.25, 2.4), slate);
    wing.position.set(side * 3.4, 0, 2.5);
    wing.rotation.y = side * -0.35;
    group.add(wing);
    const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 2.6, 6), crimson);
    gun.rotation.x = Math.PI / 2;
    gun.position.set(side * 4.9, 0, 1.0);
    group.add(gun);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.25, 6, 6), glowMat(0xff4444));
    tip.position.set(side * 4.9, 0, -0.4);
    group.add(tip);
    addPulser(group, tip, 4, 0.3, 1);
  }

  // Triple engine row
  for (const off of [-1.4, 0, 1.4]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), glowMat(0xff8866));
    glow.position.set(off, 0, 6.6);
    group.add(glow);
    addPulser(group, glow, 5, 0.5, 1);
    addThruster(group, new THREE.Vector3(off, 0, 6.8), 0xff6644, 0.4);
  }

  group.userData.boundingRadius = 9;
  return group;
}

// ─── Malon Freighter — industrial waste hauler ──────────────────────────────
export function createMalonFreighter() {
  const group = new THREE.Group();
  const ochre = hullMat(0x8a7a30, { roughness: 0.6, metalness: 0.5 });
  const dark = hullMat(0x4a4226, { roughness: 0.7 });

  // Bulky industrial hull
  const hull = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 14), ochre);
  group.add(hull);

  // Rounded bow
  const bow = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 10), ochre);
  bow.scale.set(0.96, 0.77, 1.2);
  bow.position.set(0, 0, -7);
  group.add(bow);

  // Waste tank pods slung on the sides — glowing toxic green
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 5, 10), dark);
      tank.rotation.x = Math.PI / 2;
      tank.position.set(side * 3.4, -0.5, -3 + i * 6);
      group.add(tank);
      const toxGlow = new THREE.Mesh(new THREE.CylinderGeometry(1.24, 1.24, 1.2, 10), glowMat(0x88ff44, 0.55));
      toxGlow.rotation.x = Math.PI / 2;
      toxGlow.position.copy(tank.position);
      group.add(toxGlow);
      addPulser(group, toxGlow, 1.2 + i, 0.25, 0.7);
    }
  }

  // Bridge tower
  const tower = new THREE.Mesh(new THREE.BoxGeometry(2, 2.2, 3), dark);
  tower.position.set(0, 3, 4);
  group.add(tower);
  const towerWin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.1), glowMat(0xffeeaa, 0.8));
  towerWin.position.set(0, 3.3, 2.45);
  group.add(towerWin);

  // Heavy engine block with theta-exhaust
  const engBlock = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 2), dark);
  engBlock.position.set(0, 0, 7.8);
  group.add(engBlock);
  for (const side of [-1, 1]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), glowMat(0xaaff44));
    glow.position.set(side * 1.2, 0, 8.9);
    group.add(glow);
    addPulser(group, glow, 3, 0.4, 0.9);
    addThruster(group, new THREE.Vector3(side * 1.2, 0, 9.2), 0x99ee33, 0.6);
  }

  group.userData.boundingRadius = 11;
  return group;
}

// ─── Swarm Ship — small crystalline dart ────────────────────────────────────
export function createSwarmShip() {
  const group = new THREE.Group();
  const crystal = hullMat(0x66708a, {
    roughness: 0.15, metalness: 0.9, emissive: 0x202840, emissiveIntensity: 0.6,
  });

  // Faceted dart body
  const body = new THREE.Mesh(new THREE.OctahedronGeometry(2.2, 0), crystal);
  body.scale.set(0.7, 0.5, 2.0);
  group.add(body);

  // Blade wings
  for (const side of [-1, 1]) {
    const blade = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), crystal);
    blade.scale.set(1.6, 0.15, 0.8);
    blade.position.set(side * 2.0, 0, 0.8);
    blade.rotation.z = side * 0.25;
    group.add(blade);
  }

  // Energy nucleus
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 10), glowMat(0xffcc33));
  group.add(nucleus);
  addPulser(group, nucleus, 8, 0.5, 1);
  group.userData.energyCore = nucleus;

  // Tail glow
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.3, 6, 6), glowMat(0xffaa00));
  tail.position.set(0, 0, 3.6);
  group.add(tail);
  addPulser(group, tail, 10, 0.4, 1);
  addThruster(group, new THREE.Vector3(0, 0, 3.8), 0xffaa00, 0.3);

  group.userData.boundingRadius = 5;
  return group;
}

// ─── Model factory ──────────────────────────────────────────────────────────
const MODEL_MAP = {
  'kazon-raider': createKazonRaider,
  'kazon-predator': createKazonPredator,
  'vidiian-cruiser': createVidiianCruiser,
  'hirogen-hunter': createHirogenHunter,
  'borg-probe': createBorgSphere,
  'borg-cube': createBorgCube,
  'species-8472': createSpecies8472Bioship,
  'devore-warship': createDevoreWarship,
  'krenim-timeship': createKrenimTemporalShip,
  'swarm-ship': createSwarmShip,
  'malon-freighter': createMalonFreighter,
};

const SCALE_MAP = {
  'borg-probe': 0.8,
};

export function createEnemyModel(enemyKey) {
  const factory = MODEL_MAP[enemyKey] || createKazonRaider;
  const model = factory();
  const s = SCALE_MAP[enemyKey] || 1;
  if (s !== 1) {
    model.scale.setScalar(s);
    model.userData.boundingRadius *= s;
  }
  return model;
}

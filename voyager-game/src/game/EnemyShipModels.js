import * as THREE from 'three';

const hullMat = (color, opts = {}) =>
  new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.3, ...opts });

const glowMat = (color) =>
  new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });

// ─── Kazon Raider ───────────────────────────────────────────────────────────
export function createKazonRaider() {
  const group = new THREE.Group();

  // Main hull — wide flat wedge
  const hull = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 10), hullMat(0x8B4513));
  group.add(hull);

  // Two angled wing fins
  for (const side of [-1, 1]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4, 6), hullMat(0x704010));
    fin.position.set(side * 3.2, 0, 0);
    fin.rotation.z = side * THREE.MathUtils.degToRad(30);
    group.add(fin);
  }

  // Forward cannon
  const cannon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 3, 8),
    hullMat(0x660000)
  );
  cannon.rotation.x = Math.PI / 2;
  cannon.position.set(0, 0, -6.5);
  group.add(cannon);

  // Engine glow spheres at rear
  for (const side of [-1, 1]) {
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), glowMat(0xff6600));
    glow.position.set(side * 1.5, 0, 5.5);
    group.add(glow);
  }

  group.userData.boundingRadius = 8;
  return group;
}

// ─── Borg Cube ──────────────────────────────────────────────────────────────
export function createBorgCube() {
  const group = new THREE.Group();

  // Main body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(12, 12, 12),
    hullMat(0x334433, { roughness: 0.15, metalness: 0.9 })
  );
  group.add(body);

  // Surface detail panels on each face
  const panelMat = hullMat(0x223322, { roughness: 0.1 });
  const faces = [
    { axis: 'x', sign: 1 }, { axis: 'x', sign: -1 },
    { axis: 'y', sign: 1 }, { axis: 'y', sign: -1 },
    { axis: 'z', sign: 1 }, { axis: 'z', sign: -1 },
  ];
  for (const face of faces) {
    for (let i = 0; i < 6; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.5), panelMat);
      const off1 = (Math.random() - 0.5) * 8;
      const off2 = (Math.random() - 0.5) * 8;
      if (face.axis === 'x') {
        panel.position.set(face.sign * 6.25, off1, off2);
        panel.rotation.y = Math.PI / 2;
      } else if (face.axis === 'y') {
        panel.position.set(off1, face.sign * 6.25, off2);
        panel.rotation.x = Math.PI / 2;
      } else {
        panel.position.set(off1, off2, face.sign * 6.25);
      }
      group.add(panel);
    }
  }

  // Green glow light at center
  const light = new THREE.PointLight(0x00ff00, 3, 30);
  group.add(light);

  // Tractor beam emitter
  const emitter = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), glowMat(0x00ff00));
  emitter.position.set(0, 0, -6.3);
  group.add(emitter);

  group.userData.boundingRadius = 10;
  return group;
}

// ─── Hirogen Hunter ─────────────────────────────────────────────────────────
export function createHirogenHunter() {
  const group = new THREE.Group();

  // Main hull — elongated cylinder
  const hull = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 0.8, 14, 12),
    hullMat(0x444455)
  );
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  // Two swept-back fins
  for (const side of [-1, 1]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3, 8), hullMat(0x555566));
    fin.position.set(side * 1.5, 0, 2);
    fin.rotation.z = side * THREE.MathUtils.degToRad(20);
    group.add(fin);
  }

  // Sensor dome at front
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 12, 12),
    hullMat(0x445577, { emissive: 0x112244, emissiveIntensity: 0.5 })
  );
  dome.position.set(0, 0, -7.5);
  group.add(dome);

  // Twin engine pods at rear with blue glow
  for (const side of [-1, 1]) {
    const pod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 3, 8),
      hullMat(0x555566)
    );
    pod.rotation.x = Math.PI / 2;
    pod.position.set(side * 1.8, 0, 8);
    group.add(pod);

    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), glowMat(0x4488ff));
    glow.position.set(side * 1.8, 0, 9.6);
    group.add(glow);
  }

  group.userData.boundingRadius = 9;
  return group;
}

// ─── Krenim Temporal Ship ───────────────────────────────────────────────────
export function createKrenimTemporalShip() {
  const group = new THREE.Group();

  // Main hull — tapered cylinder
  const hull = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 1, 16, 12),
    hullMat(0x8866aa)
  );
  hull.rotation.x = Math.PI / 2;
  group.add(hull);

  // Temporal weapon ring around midsection
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3, 0.3, 8, 32),
    glowMat(0xff8800)
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  group.userData.temporalRing = ring;

  // Forward prong
  const prong = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 5, 8),
    hullMat(0x9977bb)
  );
  prong.rotation.x = Math.PI / 2;
  prong.position.set(0, 0, -10.5);
  group.add(prong);

  // Energy core at center — pulsing emissive purple
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1, 12, 12),
    new THREE.MeshBasicMaterial({
      color: 0xaa44ff, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
  );
  group.add(core);
  group.userData.energyCore = core;

  group.userData.boundingRadius = 10;
  return group;
}

// ─── Species 8472 Bioship ───────────────────────────────────────────────────
export function createSpecies8472Bioship() {
  const group = new THREE.Group();

  // Main body — tapered organic shape
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 0.3, 18, 10),
    hullMat(0x556633, { roughness: 0.6, metalness: 0.2 })
  );
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Three organic fins at 120° intervals
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2.5, 6),
      hullMat(0x667744, { roughness: 0.7 })
    );
    fin.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 2);
    fin.rotation.z = angle;
    group.add(fin);
  }

  // Bio-pulse emitter at front
  const emitter = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 10, 10),
    glowMat(0xaaff00)
  );
  emitter.position.set(0, 0, -9.5);
  group.add(emitter);

  // Pulsing veins along hull
  const veinMat = new THREE.MeshBasicMaterial({
    color: 0x44ff22, transparent: true, opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3 + Math.PI / 6;
    const vein = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 16, 4),
      veinMat.clone()
    );
    vein.rotation.x = Math.PI / 2;
    vein.position.set(Math.cos(angle) * 1.1, Math.sin(angle) * 1.1, 0);
    group.add(vein);
  }

  group.userData.boundingRadius = 11;
  return group;
}

// ─── Model factory ──────────────────────────────────────────────────────────
const MODEL_MAP = {
  'kazon-raider': createKazonRaider,
  'kazon-predator': createKazonRaider,
  'vidiian-cruiser': createKazonRaider,
  'hirogen-hunter': createHirogenHunter,
  'borg-probe': createBorgCube,
  'borg-cube': createBorgCube,
  'species-8472': createSpecies8472Bioship,
  'devore-warship': createHirogenHunter,
  'krenim-timeship': createKrenimTemporalShip,
  'swarm-ship': createKazonRaider,
  'malon-freighter': createKazonRaider,
};

// Scale overrides so reused models look distinct
const SCALE_MAP = {
  'kazon-predator': 1.4,
  'borg-probe': 0.5,
  'swarm-ship': 0.5,
  'malon-freighter': 1.1,
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

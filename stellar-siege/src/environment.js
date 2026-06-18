// ============================================================================
//  STELLAR SIEGE — environment.js
//  Terrain, sky, lighting rig, and deterministic decorative props.
//  Art direction: sleek sci-fi alien battlefield — cool slate/teal rock with a
//  faint tech-grid feel, deep-space gradient sky, crisp directional shadows.
//
//  Contract (see ARCHITECTURE.md):
//    export function createEnvironment(scene, THREE, seed)
//      -> { ground: THREE.Mesh, sun: THREE.DirectionalLight, update(t): void }
//
//  Coordinate system: ground is the XZ plane, +Y up, y=0 is the top surface.
//  World spans [0..WORLD_W] x [0..WORLD_H]. Units stand on y=0.
// ============================================================================

import * as THREE from 'three';
import { WORLD_W, WORLD_H, TILE } from './config.js';

// ---------------------------------------------------------------------------
//  Tiny deterministic RNG (mulberry32) — NO Math.random anywhere below.
// ---------------------------------------------------------------------------
function makeRng(seed) {
  let a = (seed >>> 0) || 0x9e3779b9;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cheap deterministic value-noise (hash-based, smooth) for surface variation.
function hash2(ix, iz) {
  let h = Math.imul(ix | 0, 374761393) ^ Math.imul(iz | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function smooth(t) { return t * t * (3 - 2 * t); }
function valueNoise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const a = hash2(ix, iz), b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1), d = hash2(ix + 1, iz + 1);
  const u = smooth(fx), v = smooth(fz);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}
function fbm(x, z) {
  let sum = 0, amp = 0.5, freq = 1;
  for (let o = 0; o < 4; o++) {
    sum += amp * valueNoise(x * freq, z * freq);
    freq *= 2; amp *= 0.5;
  }
  return sum;
}

export function createEnvironment(scene, THREE_arg, seed) {
  // Prefer the imported THREE; fall back to the passed-in arg for safety.
  const T = THREE || THREE_arg;
  const rng = makeRng((seed | 0) || 1337);

  const group = new T.Group();
  group.name = 'environment';
  scene.add(group);

  const HW = WORLD_W * 0.5;
  const HH = WORLD_H * 0.5;
  const R = Math.max(WORLD_W, WORLD_H); // shadow / sky reference radius

  // -------------------------------------------------------------------------
  //  GROUND — PlaneGeometry rotated to the XZ plane, vertex-colored.
  //  Cool slate/teal rock with subtle fbm mottling + faint panel banding so it
  //  reads as alien tech-terrain without competing with the units on top.
  // -------------------------------------------------------------------------
  const SEG = 96; // vertex grid resolution (kept modest for perf)
  const groundGeo = new T.PlaneGeometry(WORLD_W, WORLD_H, SEG, SEG);

  const cDeep = new T.Color(0x14222b);  // shadowed crevice
  const cBase = new T.Color(0x223844);  // main slate-teal rock
  const cHigh = new T.Color(0x356070);  // lit ridge / teal sheen
  const cPanel = new T.Color(0x0c161c);  // dark panel seam

  const pos = groundGeo.attributes.position;
  const colors = [];
  const tmp = new T.Color();
  for (let i = 0; i < pos.count; i++) {
    // Geometry is still in its local XY space here (pre-rotation):
    // local x -> world X, local y -> world Z (because we rotate -90deg about X).
    const lx = pos.getX(i);
    const ly = pos.getY(i);
    const wx = lx + HW;            // 0..WORLD_W
    const wz = HH - ly;            // 0..WORLD_H

    // Base mottling.
    const n = fbm(wx * 0.06 + 11.3, wz * 0.06 + 7.7);
    tmp.copy(cBase).lerp(cHigh, smooth(THREE_clamp(n * 1.4, 0, 1)));
    tmp.lerp(cDeep, smooth(THREE_clamp(1 - n * 1.6, 0, 1)) * 0.55);

    // Faint large-scale panel banding aligned to TILE blocks (sci-fi plating).
    const bx = Math.abs(((wx / (TILE * 4)) % 1) - 0.5);
    const bz = Math.abs(((wz / (TILE * 4)) % 1) - 0.5);
    const seam = Math.min(bx, bz);
    if (seam > 0.46) tmp.lerp(cPanel, (seam - 0.46) / 0.04 * 0.4);

    // A touch of micro-sparkle variance so big flats aren't dead-uniform.
    const grain = (hash2(Math.floor(wx * 2.0), Math.floor(wz * 2.0)) - 0.5) * 0.05;
    tmp.r = THREE_clamp(tmp.r + grain, 0, 1);
    tmp.g = THREE_clamp(tmp.g + grain, 0, 1);
    tmp.b = THREE_clamp(tmp.b + grain, 0, 1);

    colors.push(tmp.r, tmp.g, tmp.b);

    // Very gentle height undulation (kept tiny so units still sit flat-ish).
    pos.setZ(i, (n - 0.5) * 0.6);
  }
  groundGeo.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
  groundGeo.rotateX(-Math.PI / 2); // local XY -> world XZ, +Y up
  groundGeo.computeVertexNormals();

  const groundMat = new T.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.12,
  });
  const ground = new T.Mesh(groundGeo, groundMat);
  ground.position.set(HW, 0, HH); // center the plane over [0..W]x[0..H]
  ground.receiveShadow = true;
  ground.name = 'ground';
  group.add(ground);

  // -------------------------------------------------------------------------
  //  GRID OVERLAY — faint emissive lines aligned to TILE so build placement
  //  reads clearly. Understated: low opacity, thin major lines every 4 tiles.
  // -------------------------------------------------------------------------
  const gridDivs = Math.round(WORLD_W / (TILE * 4)); // major cells
  const grid = new T.GridHelper(WORLD_W, gridDivs, 0x4fd6e0, 0x2c5560);
  grid.position.set(HW, 0.04, HH);
  grid.material.transparent = true;
  grid.material.opacity = 0.16;
  grid.material.depthWrite = false;
  grid.renderOrder = 1;
  group.add(grid);

  // -------------------------------------------------------------------------
  //  SKY — large inverted sphere with a vertical gradient (deep space-blue to
  //  dark teal horizon) plus a faint nebula band. Does not cast/receive shadow.
  // -------------------------------------------------------------------------
  const skyGeo = new T.SphereGeometry(R * 4, 32, 16);
  const skyMat = new T.ShaderMaterial({
    side: T.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top:    { value: new T.Color(0x070d1c) }, // deep space-blue (zenith)
      mid:    { value: new T.Color(0x0e2230) }, // teal mid
      bottom: { value: new T.Color(0x05080c) }, // dark horizon
      nebula: { value: new T.Color(0x2a5a6e) },
    },
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      void main() {
        vWorld = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vWorld;
      uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; uniform vec3 nebula;
      void main() {
        float h = clamp(vWorld.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(bottom, mid, smoothstep(0.0, 0.5, h));
        col = mix(col, top, smoothstep(0.45, 1.0, h));
        // faint nebula band drifting across the lower-mid sky
        float band = exp(-pow((h - 0.42) * 5.5, 2.0));
        float swirl = 0.5 + 0.5 * sin(vWorld.x * 6.0 + vWorld.z * 4.0);
        col += nebula * band * swirl * 0.10;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new T.Mesh(skyGeo, skyMat);
  sky.name = 'sky';
  sky.frustumCulled = false;
  group.add(sky);

  // Set a dark clear tone too (in case sky sphere ever culls at edges).
  scene.background = new T.Color(0x070d18);

  // Light atmospheric depth only — thin fog that never hides nearby units.
  scene.fog = new T.Fog(0x0b1822, R * 1.4, R * 3.2);

  // -------------------------------------------------------------------------
  //  LIGHTING RIG — hemisphere (sky/ground tint) + key directional sun with a
  //  map-covering orthographic shadow camera + soft ambient fill.
  // -------------------------------------------------------------------------
  const hemi = new T.HemisphereLight(0x9fdfff, 0x1a2c33, 0.55);
  group.add(hemi);

  const ambient = new T.AmbientLight(0xbfeaff, 0.22);
  group.add(ambient);

  const sun = new T.DirectionalLight(0xeafaff, 2.3);
  sun.position.set(HW - R * 0.55, R * 1.1, HH - R * 0.4);
  sun.target.position.set(HW, 0, HH);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);

  const d = R * 0.62; // ortho half-extent covering the whole map + margin
  const sc = sun.shadow.camera;
  sc.left = -d; sc.right = d; sc.top = d; sc.bottom = -d;
  sc.near = R * 0.2;
  sc.far = R * 3.2;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  sc.updateProjectionMatrix();

  group.add(sun);
  group.add(sun.target);

  // A faint cool rim/fill from the opposite side keeps metallic units crisp.
  const rim = new T.DirectionalLight(0x4f86ff, 0.35);
  rim.position.set(HW + R * 0.6, R * 0.5, HH + R * 0.5);
  rim.target.position.set(HW, 0, HH);
  group.add(rim);
  group.add(rim.target);

  // -------------------------------------------------------------------------
  //  DECORATIVE PROPS — deterministic low-poly rocks, crystal spires & wreckage.
  //  Kept off the two start corners (12,12) and (W-12,H-12) by >= ~16 units.
  //  Shared geometries + a few materials -> low draw/triangle cost.
  // -------------------------------------------------------------------------
  const rockGeo = new T.IcosahedronGeometry(1, 0);
  const spireGeo = new T.ConeGeometry(1, 1, 5);       // 5-sided crystal shard
  const wreckGeo = new T.BoxGeometry(1, 1, 1);

  const rockMat = new T.MeshStandardMaterial({ color: 0x2b4450, roughness: 1.0, metalness: 0.05, flatShading: true });
  const crystalMat = new T.MeshStandardMaterial({
    color: 0x2bd6e8, roughness: 0.25, metalness: 0.2,
    emissive: 0x0f6f7a, emissiveIntensity: 0.6, flatShading: true,
  });
  const wreckMat = new T.MeshStandardMaterial({ color: 0x39474e, roughness: 0.7, metalness: 0.55, flatShading: true });

  const baseA = new T.Vector2(12, 12);
  const baseB = new T.Vector2(WORLD_W - 12, WORLD_H - 12);
  const CLEAR = 18;       // keep >= ~16 units clear of each start
  const EDGE = 4;         // small inset from world edge

  const props = new T.Group();
  props.name = 'props';
  group.add(props);

  function clearOfBases(x, z) {
    if ((x - baseA.x) ** 2 + (z - baseA.y) ** 2 < CLEAR * CLEAR) return false;
    if ((x - baseB.x) ** 2 + (z - baseB.y) ** 2 < CLEAR * CLEAR) return false;
    return true;
  }

  // Crystal spire glow handles for subtle twinkle in update().
  const crystals = [];

  const TARGET = 64; // total props
  let placed = 0, guard = 0;
  while (placed < TARGET && guard < TARGET * 12) {
    guard++;
    const x = EDGE + rng() * (WORLD_W - EDGE * 2);
    const z = EDGE + rng() * (WORLD_H - EDGE * 2);
    if (!clearOfBases(x, z)) continue;

    const roll = rng();
    let mesh;
    if (roll < 0.58) {
      // Low-poly rock cluster
      mesh = new T.Mesh(rockGeo, rockMat);
      const s = 0.8 + rng() * 2.4;
      mesh.scale.set(s, s * (0.5 + rng() * 0.5), s);
      mesh.position.set(x, mesh.scale.y * 0.45, z);
      mesh.rotation.set(rng() * 0.5, rng() * Math.PI * 2, rng() * 0.5);
    } else if (roll < 0.85) {
      // Glowing crystal spire (single or paired shard)
      mesh = new T.Group();
      const shards = 1 + (rng() < 0.5 ? 1 : 0);
      for (let s = 0; s < shards; s++) {
        const shard = new T.Mesh(spireGeo, crystalMat);
        const h = 2.2 + rng() * 4.5;
        const r = 0.35 + rng() * 0.7;
        shard.scale.set(r, h, r);
        shard.position.set((rng() - 0.5) * 1.2, h * 0.5, (rng() - 0.5) * 1.2);
        shard.rotation.set((rng() - 0.5) * 0.3, rng() * Math.PI, (rng() - 0.5) * 0.3);
        shard.castShadow = true;
        mesh.add(shard);
        crystals.push({ mat: shard.material, phase: rng() * Math.PI * 2 });
      }
      mesh.position.set(x, 0, z);
    } else {
      // Angular metal wreckage / debris slab
      mesh = new T.Mesh(wreckGeo, wreckMat);
      mesh.scale.set(1.2 + rng() * 2.6, 0.4 + rng() * 1.2, 1.0 + rng() * 2.2);
      mesh.position.set(x, mesh.scale.y * 0.5, z);
      mesh.rotation.set((rng() - 0.5) * 0.4, rng() * Math.PI * 2, (rng() - 0.5) * 0.5);
    }

    mesh.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    mesh.castShadow = true;
    props.add(mesh);
    placed++;
  }

  // Note: crystalMat is shared, so twinkle pulses all spires together — cheap
  // and reads as a coherent ambient shimmer across the battlefield.

  // -------------------------------------------------------------------------
  //  UPDATE — subtle life: very slow sun drift + gentle crystal twinkle.
  //  Cheap; safe to call every frame.
  // -------------------------------------------------------------------------
  const baseSunX = sun.position.x;
  const baseSunZ = sun.position.z;
  function update(t) {
    const time = t || 0;
    // Very slow sun azimuth drift so shadows feel alive (tiny amplitude).
    const a = Math.sin(time * 0.02) * R * 0.06;
    sun.position.x = baseSunX + a;
    sun.position.z = baseSunZ + Math.cos(time * 0.02) * R * 0.04;

    // Shared crystal emissive twinkle (single material write).
    if (crystalMat) {
      crystalMat.emissiveIntensity = 0.5 + 0.18 * (0.5 + 0.5 * Math.sin(time * 1.3));
    }
  }

  return { ground, sun, update };
}

// Local clamp helper (avoids depending on THREE.MathUtils availability order).
function THREE_clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

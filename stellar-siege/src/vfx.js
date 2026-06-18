// vfx.js — pooled particle/effect emitters for Stellar Siege.
//
// World space: ground is the XZ plane, +Y up. All `pos` args are THREE.Vector3
// in world coords. Effects are short-lived (< 1.2s) and fully recycled.
//
// Architecture: a single fixed-size particle pool backed by ONE THREE.Points
// object (BufferGeometry with position/color/size attributes + a soft radial
// sprite texture, additive blended). Plus a small pool of expanding ground
// rings (thin ring meshes) for spawn/rally/selection pings. Emitters grab free
// slots; `update` integrates motion, fades, and frees expired slots. No
// per-frame allocation in `update`. When a pool is full, emitters skip
// gracefully so it stays robust under hundreds of calls/sec.

import * as THREE from 'three';

const MAX_PARTICLES = 2000;   // hard cap on simultaneous glow particles
const MAX_RINGS = 64;         // hard cap on simultaneous ground rings
const GROUND_Y = 0.06;        // ring lift to avoid z-fighting with the ground

// ---- particle "kind" behaviour constants -------------------------------
// gravity (units/s^2, applied to vy), drag (per-second velocity damping)
const SPARK_GRAVITY = -14;
const SPARK_DRAG = 2.2;
const DEBRIS_GRAVITY = -20;
const DEBRIS_DRAG = 1.4;
const FLASH_DRAG = 6;         // flashes barely move; heavy drag kills drift fast

// Build a soft radial-gradient sprite once, reused by every particle.
function makeGlowTexture() {
  const S = 64;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.30)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// Soft thin ring texture (bright edge, transparent center) for ground rings.
function makeRingTexture() {
  const S = 128;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0.0, 'rgba(255,255,255,0)');
  g.addColorStop(0.62, 'rgba(255,255,255,0)');
  g.addColorStop(0.80, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.92, 'rgba(255,255,255,1)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createVfx(scene, THREE_unused) {
  // (THREE is imported at module scope; the param is kept for contract
  // compatibility but the imported binding is authoritative.)

  // ---------------------------------------------------------------------
  // GLOW PARTICLE POOL — one Points object, parallel typed arrays.
  // ---------------------------------------------------------------------
  const positions = new Float32Array(MAX_PARTICLES * 3);
  const colors = new Float32Array(MAX_PARTICLES * 3);
  const sizes = new Float32Array(MAX_PARTICLES);

  // Per-particle simulation state (plain arrays, never touched by GPU).
  const vx = new Float32Array(MAX_PARTICLES);
  const vy = new Float32Array(MAX_PARTICLES);
  const vz = new Float32Array(MAX_PARTICLES);
  const life = new Float32Array(MAX_PARTICLES);     // seconds remaining
  const maxLife = new Float32Array(MAX_PARTICLES);
  const baseSize = new Float32Array(MAX_PARTICLES);
  const baseR = new Float32Array(MAX_PARTICLES);    // intrinsic color (pre-fade)
  const baseG = new Float32Array(MAX_PARTICLES);
  const baseB = new Float32Array(MAX_PARTICLES);
  const gravity = new Float32Array(MAX_PARTICLES);
  const drag = new Float32Array(MAX_PARTICLES);
  const grow = new Float32Array(MAX_PARTICLES);      // size growth/s (flashes shrink)
  const active = new Uint8Array(MAX_PARTICLES);

  // Free-slot stack for O(1) alloc; tracks the high-water mark drawn each frame.
  const freeStack = new Int32Array(MAX_PARTICLES);
  let freeCount = MAX_PARTICLES;
  for (let i = 0; i < MAX_PARTICLES; i++) freeStack[i] = MAX_PARTICLES - 1 - i;
  let liveCount = 0;   // number currently active (for draw range)
  let highWater = 0;   // highest active index + 1 (draw range upper bound)
  let dirty = false;   // attributes changed this frame -> needsUpdate

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geo.setDrawRange(0, 0);

  const glowTex = makeGlowTexture();

  // Custom shader so each particle has independent size + additive glow that
  // fades via vertex color (alpha baked into RGB since blending is additive).
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTex: { value: glowTex } },
    vertexShader: /* glsl */ `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // perspective-correct point scaling (300 tuned for a ~50-unit camera)
        gl_PointSize = size * (300.0 / max(-mv.z, 0.001));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      varying vec3 vColor;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        // additive: modulate the soft sprite by the (already faded) color
        gl_FragColor = vec4(vColor * t.a, t.a);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
    vertexColors: true,
    fog: false,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;   // particles span the world; culling the whole
                                  // cloud by one bbox would pop effects out.
  points.renderOrder = 10;
  scene.add(points);

  // ---------------------------------------------------------------------
  // GROUND RING POOL — preallocated thin ring meshes, additive, flat on XZ.
  // ---------------------------------------------------------------------
  const ringTex = makeRingTexture();
  const ringGeo = new THREE.PlaneGeometry(1, 1);  // textured quad, scaled per ring
  const rings = [];
  for (let i = 0; i < MAX_RINGS; i++) {
    const m = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        map: ringTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide,
        fog: false,
      })
    );
    m.rotation.x = -Math.PI / 2;   // lay flat on the ground (XZ plane)
    m.visible = false;
    m.frustumCulled = false;
    m.renderOrder = 9;
    scene.add(m);
    rings.push({
      mesh: m,
      active: false,
      life: 0,
      maxLife: 0,
      r0: 0,        // start radius
      r1: 0,        // end radius
    });
  }

  // ---- helpers ---------------------------------------------------------
  const _c = new THREE.Color();

  // Resolve a color arg (THREE.Color | hex number | undefined) -> {r,g,b}.
  function resolveColor(color, fr, fg, fb) {
    if (color == null) return [fr, fg, fb];
    if (color.isColor) return [color.r, color.g, color.b];
    if (typeof color === 'number') {
      _c.set(color);
      return [_c.r, _c.g, _c.b];
    }
    return [fr, fg, fb];
  }

  // Spawn one particle. Returns false if the pool is full (caller may stop).
  function spawn(px, py, pz, dvx, dvy, dvz, r, g, b, sz, lifeS, kind, intensity) {
    if (freeCount === 0) return false;
    const i = freeStack[--freeCount];
    active[i] = 1;
    liveCount++;
    if (i + 1 > highWater) highWater = i + 1;

    const i3 = i * 3;
    positions[i3] = px; positions[i3 + 1] = py; positions[i3 + 2] = pz;
    vx[i] = dvx; vy[i] = dvy; vz[i] = dvz;
    life[i] = lifeS; maxLife[i] = lifeS;
    baseSize[i] = sz;
    baseR[i] = r * intensity; baseG[i] = g * intensity; baseB[i] = b * intensity;

    if (kind === 'flash') { gravity[i] = 0; drag[i] = FLASH_DRAG; grow[i] = -sz * 0.9; }
    else if (kind === 'debris') { gravity[i] = DEBRIS_GRAVITY; drag[i] = DEBRIS_DRAG; grow[i] = -sz * 0.4; }
    else { gravity[i] = SPARK_GRAVITY; drag[i] = SPARK_DRAG; grow[i] = -sz * 0.5; } // spark

    // initialise the GPU-visible attributes so a same-frame draw looks right
    sizes[i] = sz;
    colors[i3] = baseR[i]; colors[i3 + 1] = baseG[i]; colors[i3 + 2] = baseB[i];
    dirty = true;
    return true;
  }

  function spawnRingSlot(px, pz, r, g, b, r0, r1, lifeS) {
    for (let i = 0; i < MAX_RINGS; i++) {
      const ring = rings[i];
      if (ring.active) continue;
      ring.active = true;
      ring.life = lifeS;
      ring.maxLife = lifeS;
      ring.r0 = r0;
      ring.r1 = r1;
      const m = ring.mesh;
      m.position.set(px, GROUND_Y, pz);
      m.material.color.setRGB(r, g, b);
      m.material.opacity = 1;
      m.scale.set(r0 * 2, r0 * 2, 1);
      m.visible = true;
      return ring;
    }
    return null; // pool full -> skip
  }

  // ---- public emitters -------------------------------------------------

  // Quick bright muzzle flash + a couple of tracer sparks along `dir`.
  function muzzleFlash(pos, dir, color) {
    const [r, g, b] = resolveColor(color, 1.0, 0.95, 0.6); // pale yellow default
    // central flash
    spawn(pos.x, pos.y, pos.z, 0, 0, 0, r, g, b, 2.6, 0.09, 'flash', 1.8);

    // forward heading (normalized); fall back to +X if dir is degenerate
    let hx = 0, hy = 0, hz = 0;
    if (dir) { hx = dir.x; hy = dir.y; hz = dir.z; }
    const hl = Math.hypot(hx, hy, hz);
    if (hl < 1e-4) { hx = 1; hy = 0; hz = 0; } else { hx /= hl; hy /= hl; hz /= hl; }

    // 3 tracer sparks shooting forward with a little spread
    for (let k = 0; k < 3; k++) {
      const sp = 9 + Math.random() * 6;
      const jx = (Math.random() - 0.5) * 1.2;
      const jy = (Math.random() - 0.5) * 0.8 + 0.2;
      const jz = (Math.random() - 0.5) * 1.2;
      if (!spawn(
        pos.x, pos.y, pos.z,
        hx * sp + jx, hy * sp + jy, hz * sp + jz,
        r, g, b, 0.9, 0.14 + Math.random() * 0.06, 'spark', 1.5)) break;
    }
  }

  // Small spark burst when a projectile hits. Sparks bounce off in all dirs.
  function impact(pos, color) {
    const [r, g, b] = resolveColor(color, 1.0, 0.8, 0.45);
    spawn(pos.x, pos.y, pos.z, 0, 0, 0, r, g, b, 1.6, 0.08, 'flash', 1.4);
    const n = 8;
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const up = 0.3 + Math.random() * 0.9;
      const sp = 4 + Math.random() * 5;
      if (!spawn(
        pos.x, pos.y + 0.1, pos.z,
        Math.cos(a) * sp, up * sp, Math.sin(a) * sp,
        r, g, b, 0.7, 0.22 + Math.random() * 0.12, 'spark', 1.2)) break;
    }
  }

  // Fiery explosion: flash core + expanding ground shock ring + debris sparks.
  function explosion(pos, scale = 1) {
    const s = scale;
    // hot white core flash
    spawn(pos.x, pos.y + 0.4 * s, pos.z, 0, 0, 0, 1.0, 0.95, 0.85, 5 * s, 0.12, 'flash', 2.2);
    // orange fireball flashes (a few stacked, slightly offset)
    for (let k = 0; k < 4; k++) {
      const ox = (Math.random() - 0.5) * 1.2 * s;
      const oz = (Math.random() - 0.5) * 1.2 * s;
      const oy = 0.3 * s + Math.random() * 0.8 * s;
      spawn(pos.x + ox, pos.y + oy, pos.z + oz, ox * 1.5, oy, oz * 1.5,
        1.0, 0.5, 0.12, (3 + Math.random() * 2) * s, 0.18 + Math.random() * 0.1, 'flash', 1.8);
    }
    // debris sparks flung outward (fiery orange -> they fade)
    const n = Math.min(28, Math.round(16 + 10 * s));
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const up = 0.4 + Math.random() * 1.4;
      const sp = (5 + Math.random() * 9) * s;
      const r = 1.0, g = 0.55 + Math.random() * 0.35, b = 0.15 * Math.random();
      if (!spawn(
        pos.x, pos.y + 0.2 * s, pos.z,
        Math.cos(a) * sp, up * sp, Math.sin(a) * sp,
        r, g, b, (0.8 + Math.random() * 0.6) * s, 0.4 + Math.random() * 0.4, 'debris', 1.4)) break;
    }
    // ground shock ring
    spawnRingSlot(pos.x, pos.z, 1.0, 0.6, 0.25, 0.6 * s, 4.5 * s, 0.5);
  }

  // Dust / energy puff during/after construction (rises gently, no big sparks).
  function buildPuff(pos) {
    const n = 14;
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2;
      const rad = 0.5 + Math.random() * 1.3;
      const sp = 1.2 + Math.random() * 1.8;
      // pale teal/cyan energy dust
      const r = 0.55 + Math.random() * 0.25;
      const g = 0.8 + Math.random() * 0.2;
      const b = 0.85 + Math.random() * 0.15;
      if (!spawn(
        pos.x + Math.cos(a) * rad * 0.4, pos.y + 0.1, pos.z + Math.sin(a) * rad * 0.4,
        Math.cos(a) * sp, 1.5 + Math.random() * 1.5, Math.sin(a) * sp,
        r, g, b, 1.1 + Math.random() * 0.6, 0.5 + Math.random() * 0.3, 'spark', 0.9)) break;
    }
  }

  // Expanding glowing ground ring — spawn feedback / rally / selection ping.
  function spawnRing(pos, color) {
    const [r, g, b] = resolveColor(color, 0.4, 0.85, 1.0); // cyan default
    spawnRingSlot(pos.x, pos.z, r, g, b, 0.4, 3.2, 0.55);
  }

  // ---- per-frame update ------------------------------------------------
  function update(dt) {
    if (dt > 0.1) dt = 0.1; // clamp big frame hitches so physics stays stable

    // --- particles ---
    if (liveCount > 0) {
      let newHigh = 0;
      for (let i = 0; i < highWater; i++) {
        if (!active[i]) continue;
        let l = life[i] - dt;
        if (l <= 0) {
          // recycle slot
          active[i] = 0;
          liveCount--;
          freeStack[freeCount++] = i;
          sizes[i] = 0;                 // hide (zero point size)
          const i3 = i * 3;
          colors[i3] = colors[i3 + 1] = colors[i3 + 2] = 0;
          dirty = true;
          continue;
        }
        life[i] = l;
        if (i + 1 > newHigh) newHigh = i + 1;

        // integrate velocity (gravity + linear drag)
        const dragF = 1 - Math.min(1, drag[i] * dt);
        vy[i] += gravity[i] * dt;
        vx[i] *= dragF; vy[i] *= dragF; vz[i] *= dragF;

        const i3 = i * 3;
        positions[i3] += vx[i] * dt;
        positions[i3 + 1] += vy[i] * dt;
        positions[i3 + 2] += vz[i] * dt;
        if (positions[i3 + 1] < 0.02) positions[i3 + 1] = 0.02; // don't sink below ground

        // fade: ease-out alpha on remaining life, baked into additive RGB
        const t = l / maxLife[i];           // 1 -> 0
        const fade = t * t;                 // quadratic falloff
        colors[i3] = baseR[i] * fade;
        colors[i3 + 1] = baseG[i] * fade;
        colors[i3 + 2] = baseB[i] * fade;

        // size animates toward 0 (or grows for non-flash early then shrinks)
        let sz = baseSize[i] + grow[i] * (1 - t);
        if (sz < 0) sz = 0;
        sizes[i] = sz;

        dirty = true;
      }
      highWater = newHigh;
    } else {
      highWater = 0;
    }

    if (dirty) {
      const drawN = Math.max(highWater, 0);
      geo.setDrawRange(0, drawN);
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      geo.attributes.size.needsUpdate = true;
      dirty = false;
    }

    // --- ground rings ---
    for (let i = 0; i < MAX_RINGS; i++) {
      const ring = rings[i];
      if (!ring.active) continue;
      const l = ring.life - dt;
      if (l <= 0) {
        ring.active = false;
        ring.mesh.visible = false;
        ring.mesh.material.opacity = 0;
        continue;
      }
      ring.life = l;
      const t = l / ring.maxLife;        // 1 -> 0
      const p = 1 - t;                   // 0 -> 1 progress
      const rad = ring.r0 + (ring.r1 - ring.r0) * (1 - t * t); // ease-out expand
      const m = ring.mesh;
      m.scale.set(rad * 2, rad * 2, 1);
      // fade in fast, fade out as it expands
      m.material.opacity = Math.min(1, p * 6) * (t * t) + 0.0;
    }
  }

  // ---- teardown (optional; not in contract but good hygiene) -----------
  function dispose() {
    scene.remove(points);
    geo.dispose();
    mat.dispose();
    glowTex.dispose();
    for (const ring of rings) {
      scene.remove(ring.mesh);
      ring.mesh.material.dispose();
    }
    ringGeo.dispose();
    ringTex.dispose();
  }

  return {
    muzzleFlash,
    impact,
    explosion,
    buildPuff,
    spawnRing,
    update,
    dispose,
  };
}

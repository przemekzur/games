import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.systems = [];
  }

  emit(config) {
    const {
      position, count = 30, color = 0x00ffff,
      speed = 5, spread = 1, life = 1.5,
      size = 1.5, gravity = 0, fadeOut = true,
    } = config;

    const positions = new Float32Array(count * 3);
    const velocities = [];
    const lifetimes = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * spread * speed,
        (Math.random() - 0.5) * spread * speed,
        (Math.random() - 0.5) * spread * speed,
      ));
      lifetimes.push(life * (0.5 + Math.random() * 0.5));
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size, color, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    this.scene.add(points);

    this.systems.push({
      points, geo, mat, velocities, lifetimes,
      maxLife: life, age: 0, gravity, fadeOut, count,
    });
  }

  // Phaser beam effect
  createPhaserBeam(from, to, color = 0xff6600, duration = 0.5) {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(0.15, 0.15, len, 6);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 0, len / 2);
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(from);
    mesh.lookAt(to);
    this.scene.add(mesh);

    // Glow around beam
    const glowGeo = new THREE.CylinderGeometry(0.5, 0.5, len, 6);
    glowGeo.rotateX(Math.PI / 2);
    glowGeo.translate(0, 0, len / 2);
    const glowMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.copy(from);
    glow.lookAt(to);
    this.scene.add(glow);

    this.systems.push({
      type: 'beam', mesh, glow, age: 0, maxLife: duration, mat, glowMat,
    });

    // Impact sparks
    this.emit({
      position: to, count: 15, color, speed: 8, spread: 0.8, life: 0.4, size: 1.2,
    });
  }

  // Torpedo effect
  createTorpedo(from, to, color = 0xff4400, speed = 80) {
    const geo = new THREE.SphereGeometry(0.4, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(from);
    this.scene.add(mesh);

    // Glow
    const glowGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const glowMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    mesh.add(glow);

    const dir = new THREE.Vector3().subVectors(to, from).normalize();
    const dist = from.distanceTo(to);

    this.systems.push({
      type: 'torpedo', mesh, glow, glowMat, mat,
      dir, speed, target: to.clone(),
      age: 0, maxLife: dist / speed + 0.5,
      onImpact: () => {
        this.createExplosion(to, color, 1.5);
      },
      impacted: false,
      totalDist: dist,
      traveled: 0,
    });
  }

  // Explosion
  createExplosion(position, color = 0xff6600, scale = 1) {
    // Core flash
    const flashGeo = new THREE.SphereGeometry(3 * scale, 16, 16);
    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending,
    });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    flash.position.copy(position);
    this.scene.add(flash);
    this.systems.push({
      type: 'flash', mesh: flash, mat: flashMat, age: 0, maxLife: 0.3, scale,
    });

    // Outer burst
    this.emit({
      position, count: 50, color, speed: 15 * scale,
      spread: 1, life: 0.8, size: 2.5 * scale,
    });

    // Secondary debris
    this.emit({
      position, count: 20, color: 0xffaa44,
      speed: 8 * scale, spread: 0.6, life: 1.2, size: 1.5,
    });
  }

  // Shield impact
  createShieldImpact(position, shipPos, color = 0x3399ff) {
    const dir = new THREE.Vector3().subVectors(position, shipPos).normalize();
    const impactPos = shipPos.clone().add(dir.multiplyScalar(8));

    // Shield ring
    const ringGeo = new THREE.TorusGeometry(4, 0.3, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(impactPos);
    ring.lookAt(position);
    this.scene.add(ring);

    this.systems.push({
      type: 'shield', mesh: ring, mat: ringMat, age: 0, maxLife: 0.5,
    });

    this.emit({
      position: impactPos, count: 20, color, speed: 6, spread: 0.5, life: 0.3, size: 1,
    });
  }

  update(elapsed, delta) {
    if (!delta) return;
    for (let i = this.systems.length - 1; i >= 0; i--) {
      const sys = this.systems[i];
      sys.age += delta;

      if (sys.age >= sys.maxLife) {
        this.removeSystem(sys, i);
        continue;
      }

      const t = sys.age / sys.maxLife;

      if (sys.type === 'beam') {
        const fade = t < 0.2 ? t / 0.2 : 1 - ((t - 0.2) / 0.8);
        sys.mat.opacity = fade * 0.9;
        sys.glowMat.opacity = fade * 0.2;
      } else if (sys.type === 'torpedo') {
        const move = delta * sys.speed;
        sys.mesh.position.addScaledVector(sys.dir, move);
        sys.traveled += move;
        if (sys.traveled >= sys.totalDist && !sys.impacted) {
          sys.impacted = true;
          sys.onImpact();
        }
        if (sys.impacted) sys.mat.opacity *= 0.8;
      } else if (sys.type === 'flash') {
        sys.mat.opacity = 1 - t;
        const s = 1 + t * 2;
        sys.mesh.scale.setScalar(s);
      } else if (sys.type === 'shield') {
        sys.mat.opacity = (1 - t) * 0.6;
        const s = 1 + t * 0.5;
        sys.mesh.scale.setScalar(s);
      } else {
        // Particle system
        const posArr = sys.geo.attributes.position.array;
        for (let j = 0; j < sys.count; j++) {
          const vel = sys.velocities[j];
          posArr[j * 3] += vel.x * delta;
          posArr[j * 3 + 1] += vel.y * delta + sys.gravity * delta;
          posArr[j * 3 + 2] += vel.z * delta;
        }
        sys.geo.attributes.position.needsUpdate = true;
        if (sys.fadeOut) sys.mat.opacity = 1 - t;
      }
    }
  }

  removeSystem(sys, idx) {
    if (sys.mesh) { this.scene.remove(sys.mesh); sys.mesh.geometry?.dispose(); }
    if (sys.glow) { this.scene.remove(sys.glow); sys.glow.geometry?.dispose(); }
    if (sys.points) { this.scene.remove(sys.points); sys.geo?.dispose(); }
    if (sys.mat) sys.mat.dispose();
    if (sys.glowMat) sys.glowMat.dispose();
    this.systems.splice(idx, 1);
  }

  dispose() {
    while (this.systems.length) this.removeSystem(this.systems[0], 0);
  }
}

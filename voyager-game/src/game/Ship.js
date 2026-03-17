import * as THREE from 'three';

export class Ship {
  constructor(scene) {
    this.scene = scene;
    this.mesh = new THREE.Group();
    this.isWarping = false;
    this.warpIntensity = 0;
    this.shieldVisible = false;
    this.shieldFlash = 0;
    this.thrusterParticles = [];
    this.velocity = new THREE.Vector3();
    this.targetRotation = new THREE.Euler();

    this.buildShip();
    this.createShield();
    this.createEngineGlow();
    scene.add(this.mesh);
  }

  buildShip() {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x888899, metalness: 0.7, roughness: 0.3,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xcc4444, metalness: 0.5, roughness: 0.4,
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Saucer section
    const saucer = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 0.8, 32),
      bodyMat
    );
    saucer.rotation.x = 0;
    saucer.position.set(0, 0, -2);
    this.mesh.add(saucer);

    // Bridge dome
    const bridge = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      bodyMat
    );
    bridge.position.set(0, 0.4, -2);
    this.mesh.add(bridge);

    // Engineering hull (secondary hull)
    const hull = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.2, 10, 12),
      bodyMat
    );
    hull.rotation.x = Math.PI / 2;
    hull.position.set(0, -2, 4);
    this.mesh.add(hull);

    // Neck connecting saucer to hull
    const neck = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2, 3),
      bodyMat
    );
    neck.position.set(0, -1, 1);
    this.mesh.add(neck);

    // Deflector dish
    const deflector = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: 0x00aaff, transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending,
      })
    );
    deflector.rotation.x = Math.PI / 2;
    deflector.position.set(0, -2.5, -0.5);
    this.mesh.add(deflector);

    // Nacelle pylons
    for (const side of [-1, 1]) {
      const pylon = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 3, 1),
        bodyMat
      );
      pylon.position.set(side * 3.5, -0.5, 5);
      pylon.rotation.z = side * -0.3;
      this.mesh.add(pylon);

      // Nacelle
      const nacelle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 8, 8),
        bodyMat
      );
      nacelle.rotation.x = Math.PI / 2;
      nacelle.position.set(side * 5.5, 1.5, 5);
      this.mesh.add(nacelle);

      // Nacelle glow strip
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.15, 7.5),
        glowMat
      );
      strip.position.set(side * 5.5, 2.15, 5);
      this.mesh.add(strip);

      // Bussard collectors (front of nacelles)
      const bussard = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 12, 12),
        new THREE.MeshBasicMaterial({
          color: 0xff3300, transparent: true, opacity: 0.7,
          blending: THREE.AdditiveBlending,
        })
      );
      bussard.position.set(side * 5.5, 1.5, 1);
      this.mesh.add(bussard);
      if (side === -1) this.bussardLeft = bussard;
      else this.bussardRight = bussard;
    }

    // Accent stripe on saucer
    const stripe = new THREE.Mesh(
      new THREE.TorusGeometry(4.5, 0.12, 4, 32),
      accentMat
    );
    stripe.rotation.x = Math.PI / 2;
    stripe.position.set(0, 0.45, -2);
    this.mesh.add(stripe);
  }

  createShield() {
    const geo = new THREE.SphereGeometry(12, 24, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x3399ff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      wireframe: true,
    });
    this.shieldMesh = new THREE.Mesh(geo, mat);
    this.mesh.add(this.shieldMesh);
  }

  createEngineGlow() {
    // Impulse engine glow
    const impulseGeo = new THREE.PlaneGeometry(2, 0.6);
    const impulseMat = new THREE.MeshBasicMaterial({
      color: 0xff4400, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    this.impulseGlow = new THREE.Mesh(impulseGeo, impulseMat);
    this.impulseGlow.position.set(0, -2, 9.2);
    this.mesh.add(this.impulseGlow);

    // Warp trail
    this.warpTrailGeo = new THREE.BufferGeometry();
    const trailCount = 100;
    const trailPos = new Float32Array(trailCount * 3);
    this.warpTrailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.PointsMaterial({
      color: 0x4488ff, size: 1.5, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.warpTrail = new THREE.Points(this.warpTrailGeo, trailMat);
    this.scene.add(this.warpTrail);
  }

  flashShield(duration = 0.5) {
    this.shieldFlash = duration;
  }

  setWarp(active) {
    this.isWarping = active;
  }

  update(elapsed, delta) {
    if (!delta) return;

    // Bussard collector pulsing
    const pulse = 0.5 + Math.sin(elapsed * 3) * 0.3;
    if (this.bussardLeft) this.bussardLeft.material.opacity = pulse;
    if (this.bussardRight) this.bussardRight.material.opacity = pulse;

    // Impulse engine brightness
    const impulseBase = this.isWarping ? 1 : 0.6;
    this.impulseGlow.material.opacity = impulseBase + Math.sin(elapsed * 5) * 0.15;

    // Warp intensity
    const warpTarget = this.isWarping ? 1 : 0;
    this.warpIntensity += (warpTarget - this.warpIntensity) * delta * 4;

    // Shield flash
    if (this.shieldFlash > 0) {
      this.shieldFlash -= delta;
      this.shieldMesh.material.opacity = Math.max(0, this.shieldFlash * 0.5);
    } else {
      this.shieldMesh.material.opacity *= 0.9;
    }

    // Gentle idle bob
    this.mesh.position.y = Math.sin(elapsed * 0.5) * 0.3;
    this.mesh.rotation.z = Math.sin(elapsed * 0.3) * 0.01;
  }

  getPosition() { return this.mesh.position.clone(); }
  getWorldPosition() {
    const pos = new THREE.Vector3();
    this.mesh.getWorldPosition(pos);
    return pos;
  }
}

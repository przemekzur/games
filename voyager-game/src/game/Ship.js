import * as THREE from 'three';

export class Ship {
  constructor(scene) {
    this.scene = scene;
    this.mesh = new THREE.Group();
    this.visualGroup = new THREE.Group();
    this.mesh.add(this.visualGroup);

    // Flight state
    this.keys = { w: false, s: false, a: false, d: false, ArrowUp: false, ArrowDown: false, Shift: false, Control: false };
    this.isWarping = false;
    this.forcedWarpMode = false;
    this.maxSpeed = 50;
    this.acceleration = 40;
    this.deceleration = 20;
    this.currentSpeed = 0;
    this.pitchSpeed = 1.5;
    this.yawSpeed = 1.5;
    this.speedMultiplier = 1;

    // Effects state
    this.warpIntensity = 0;
    this.shieldPulseTimer = 0;
    this.displacementPulseTimer = 0;
    this.displacementSpinAngle = 0;
    this.engines = [];
    this.engineMaterials = [];

    this.buildShip();
    this.createShieldShader();
    this.createEngineGlow();
    scene.add(this.mesh);

    window.addEventListener('keydown', (e) => this.handleKeyDown(e), false);
    window.addEventListener('keyup', (e) => this.handleKeyUp(e), false);
  }

  handleKeyDown(e) {
    if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = true;
    else if (this.keys.hasOwnProperty(e.key.toLowerCase())) this.keys[e.key.toLowerCase()] = true;
  }

  handleKeyUp(e) {
    if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = false;
    else if (this.keys.hasOwnProperty(e.key.toLowerCase())) this.keys[e.key.toLowerCase()] = false;
  }

  buildShip() {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xbbbbcc, metalness: 0.85, roughness: 0.15, emissive: 0x050510,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xdd5544, metalness: 0.5, roughness: 0.3, emissive: 0x331111,
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x66aaff, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    // Saucer section (faces -Z = forward)
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.8, 32), bodyMat);
    saucer.position.set(0, 0, -2);
    this.visualGroup.add(saucer);

    // Bridge dome
    const bridge = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), bodyMat
    );
    bridge.position.set(0, 0.4, -2);
    this.visualGroup.add(bridge);

    // Engineering hull (behind saucer, +Z direction)
    const hull = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.2, 10, 12), bodyMat);
    hull.rotation.x = Math.PI / 2;
    hull.position.set(0, -2, 4);
    this.visualGroup.add(hull);

    // Neck connecting saucer to hull
    const neck = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 3), bodyMat);
    neck.position.set(0, -1, 1);
    this.visualGroup.add(neck);

    // Deflector dish (front of engineering hull)
    const deflector = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x00ccff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending })
    );
    deflector.rotation.x = Math.PI / 2;
    deflector.position.set(0, -2.5, -0.5);
    this.visualGroup.add(deflector);

    // Deflector glow light
    const deflectorLight = new THREE.PointLight(0x00ccff, 3, 15);
    deflectorLight.position.set(0, -2.5, -0.5);
    this.visualGroup.add(deflectorLight);

    // Nacelles (behind and above, +Z direction)
    for (const side of [-1, 1]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3, 1), bodyMat);
      pylon.position.set(side * 3.5, -0.5, 5);
      pylon.rotation.z = side * -0.3;
      this.visualGroup.add(pylon);

      const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 8, 8), bodyMat);
      nacelle.rotation.x = Math.PI / 2;
      nacelle.position.set(side * 5.5, 1.5, 5);
      this.visualGroup.add(nacelle);

      // Warp coil glow strips on top of nacelles
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 7.5), glowMat.clone());
      strip.position.set(side * 5.5, 2.15, 5);
      this.visualGroup.add(strip);
      this.engineMaterials.push(strip.material);

      // Bussard collectors (front of nacelles, -Z = forward)
      const bussard = new THREE.Mesh(
        new THREE.SphereGeometry(0.75, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
      );
      bussard.position.set(side * 5.5, 1.5, 1);
      this.visualGroup.add(bussard);
      if (side === -1) this.bussardLeft = bussard;
      else this.bussardRight = bussard;

      // Engine exhaust glow (back of nacelles, +Z)
      const engine = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x66aaff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
      );
      engine.position.set(side * 5.5, 1.5, 9);
      this.visualGroup.add(engine);
      this.engines.push(engine);
      this.engineMaterials.push(engine.material);

      // Point light per engine for glow
      const glow = new THREE.PointLight(0x4488ff, 4, 25);
      glow.position.set(side * 5.5, 1.5, 9);
      this.visualGroup.add(glow);
    }

    // Accent stripe on saucer rim
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.12, 4, 32), accentMat);
    stripe.rotation.x = Math.PI / 2;
    stripe.position.set(0, 0.45, -2);
    this.visualGroup.add(stripe);

    // Second accent stripe for detail
    const stripe2 = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.08, 4, 32), accentMat);
    stripe2.rotation.x = Math.PI / 2;
    stripe2.position.set(0, 0.45, -2);
    this.visualGroup.add(stripe2);

    // Hull panel line — dark ring simulating panel separation
    const panelLineMat = new THREE.MeshBasicMaterial({ color: 0x222233 });
    const panelLine = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.03, 4, 32), panelLineMat);
    panelLine.rotation.x = Math.PI / 2;
    panelLine.position.set(0, 0.45, -2);
    this.visualGroup.add(panelLine);

    // Window dots along saucer edge
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xffffcc });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const win = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), windowMat);
      win.position.set(Math.cos(angle) * 4.6, 0.45, -2 + Math.sin(angle) * 4.6);
      this.visualGroup.add(win);
    }
  }

  createShieldShader() {
    this.shieldUniforms = {
      time: { value: 0 },
      pulse: { value: 0 },
      baseGlow: { value: 0 },  // hidden by default
      color: { value: new THREE.Color(0x00ffff) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.shieldUniforms,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float pulse;
        uniform float baseGlow;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = dot(viewDir, vNormal);
          fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
          fresnel = pow(fresnel, 2.0);
          float pattern = sin(vPosition.y * 10.0 + time * 5.0) * sin(vPosition.x * 10.0 + time * 5.0);
          pattern = pattern * 0.5 + 0.5;
          float intensity = fresnel * (0.3 + 0.7 * pattern) * (pulse + baseGlow);
          gl_FragColor = vec4(color, intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    this.shieldMesh = new THREE.Mesh(new THREE.SphereGeometry(22, 32, 32), mat);
    this.mesh.add(this.shieldMesh);
  }

  createEngineGlow() {
    const impulseGeo = new THREE.PlaneGeometry(2, 0.6);
    const impulseMat = new THREE.MeshBasicMaterial({
      color: 0xff4400, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    this.impulseGlow = new THREE.Mesh(impulseGeo, impulseMat);
    this.impulseGlow.position.set(0, -2, 9.2);
    this.visualGroup.add(this.impulseGlow);
  }

  pulseShield() { this.shieldPulseTimer = 1; }
  flashShield(duration = 0.5) { this.shieldPulseTimer = duration; }

  setShieldActive(active) {
    if (this.shieldUniforms) this.shieldUniforms.baseGlow.value = active ? 0.2 : 0;
  }

  setForcedWarpMode(active) { this.forcedWarpMode = active; }

  triggerDisplacementPulse(dur = 0.95) {
    this.displacementPulseTimer = dur;
  }

  setWarp(active) { this.isWarping = active; }

  update(elapsed, delta) {
    if (!delta) return;
    const t = elapsed;

    // ── Flight physics ──
    this.isWarping = this.keys.Shift || this.forcedWarpMode;
    const maxSpd = (this.isWarping ? this.maxSpeed * 10 : this.maxSpeed) * this.speedMultiplier;
    const accel = (this.isWarping ? this.acceleration * 5 : this.acceleration) * this.speedMultiplier;

    if (this.isWarping) {
      // Warp mode: auto-accelerate, WASD reserved for camera orbit
      this.currentSpeed += accel * delta;
    } else {
      // Normal mode: W/S thrust
      if (this.keys.w) {
        this.currentSpeed += accel * delta;
      } else if (this.keys.s) {
        this.currentSpeed -= accel * delta;
      } else {
        if (this.currentSpeed > 0)
          this.currentSpeed = Math.max(0, this.currentSpeed - this.deceleration * delta);
        else if (this.currentSpeed < 0)
          this.currentSpeed = Math.min(0, this.currentSpeed + this.deceleration * delta);
      }
    }

    // Smooth speed clamping — decelerate gracefully when above normal max after leaving warp
    const hardMin = -this.maxSpeed * 0.5 * this.speedMultiplier;
    if (this.currentSpeed > maxSpd) {
      this.currentSpeed = Math.max(maxSpd, this.currentSpeed - this.deceleration * 5 * delta);
    }
    this.currentSpeed = Math.max(hardMin, Math.min(maxSpd, this.currentSpeed));

    // Yaw (A/D) — always available to steer the ship
    if (this.keys.a) this.mesh.rotateY(this.yawSpeed * delta);
    if (this.keys.d) this.mesh.rotateY(-this.yawSpeed * delta);

    // Pitch (Arrow Up/Down) — always available
    if (this.keys.ArrowUp) this.mesh.rotateX(-this.pitchSpeed * delta);
    if (this.keys.ArrowDown) this.mesh.rotateX(this.pitchSpeed * delta);

    // Move ship forward along its local -Z axis (saucer faces -Z)
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    this.mesh.position.addScaledVector(forward, this.currentSpeed * delta);

    // ── Visual banking ──
    const speedNorm = Math.max(1, maxSpd);
    const speedRatio = Math.max(0, this.currentSpeed) / speedNorm;
    const yawInput = this.isWarping ? 0 : ((this.keys.a ? 1 : 0) + (this.keys.d ? -1 : 0));
    const pitchInput = (this.keys.ArrowUp ? 1 : 0) + (this.keys.ArrowDown ? -1 : 0);
    const bankZ = yawInput * 0.22;
    const bankX = pitchInput * 0.15;

    this.visualGroup.rotation.z = THREE.MathUtils.lerp(this.visualGroup.rotation.z, bankZ, delta * 4);
    this.visualGroup.rotation.x = THREE.MathUtils.lerp(this.visualGroup.rotation.x, bankX, delta * 3);

    // Displacement spin
    const spinTarget = Math.sin(this.displacementSpinAngle) * 0.65;
    this.visualGroup.rotation.y = THREE.MathUtils.lerp(this.visualGroup.rotation.y, spinTarget, delta * 5);

    this.visualGroup.position.y = THREE.MathUtils.lerp(
      this.visualGroup.position.y,
      Math.sin(t * 1.6) * 0.18 + speedRatio * 0.08,
      delta * 2.5
    );

    // ── Displacement spin ──
    if (this.displacementPulseTimer > 0) {
      this.displacementPulseTimer = Math.max(0, this.displacementPulseTimer - delta);
      this.displacementSpinAngle += delta * 19;
      for (const mat of this.engineMaterials) mat.opacity = Math.min(1, mat.opacity + 0.9 * delta);
    } else {
      this.displacementSpinAngle = THREE.MathUtils.lerp(this.displacementSpinAngle, 0, delta * 5.5);
    }

    // ── Engine glow intensity — much more vivid ──
    const warpMul = this.isWarping ? 1.5 : 1;
    const enginePulse = 1 + Math.sin(t * 6) * 0.08 + speedRatio * 0.5 + (this.isWarping ? 0.4 : 0);
    for (let i = 0; i < this.engines.length; i++) {
      const eng = this.engines[i];
      const d = Math.sin(t * (8 + i * 0.7)) * 0.04;
      const sScale = this.isWarping ? 1.8 + speedRatio * 1.6 : 1;
      eng.scale.set(enginePulse + d, enginePulse + d, sScale);
      // Warp coil strip [i*2] and engine sphere [i*2+1]
      this.engineMaterials[i * 2].opacity = (0.4 + speedRatio * 0.5 + (this.isWarping ? 0.3 : 0)) * warpMul;
      this.engineMaterials[i * 2 + 1].opacity = (0.6 + speedRatio * 0.3 + d * 2) * warpMul;
    }

    // Bussard collector pulsing
    const bPulse = 0.55 + Math.sin(t * 3) * 0.35;
    if (this.bussardLeft) this.bussardLeft.material.opacity = bPulse;
    if (this.bussardRight) this.bussardRight.material.opacity = bPulse;

    // Impulse engine
    const impulseBase = this.isWarping ? 1 : 0.7;
    this.impulseGlow.material.opacity = impulseBase + Math.sin(t * 5) * 0.2;

    // ── Shield shader ──
    if (this.shieldUniforms) {
      this.shieldUniforms.time.value = t;
      if (this.shieldPulseTimer > 0) {
        this.shieldPulseTimer -= delta;
        this.shieldUniforms.pulse.value = Math.max(0, this.shieldPulseTimer);
      } else {
        this.shieldUniforms.pulse.value = 0;
      }
    }
  }

  getPosition() { return this.mesh.position.clone(); }
  getWorldPosition() {
    const pos = new THREE.Vector3();
    this.mesh.getWorldPosition(pos);
    return pos;
  }
}

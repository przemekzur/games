import * as THREE from 'three';

// v2 upgrades:
//  • Variable-geometry warp pylons — nacelles rotate up when entering warp (the
//    iconic Intrepid-class move) and settle back down at impulse
//  • Animated bussard collector swirl blades
//  • RCS thruster puffs that flare on the correct side while turning
//  • Phaser strip and hull registry detail, more windows
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
    this.pylonAngle = 0;           // 0 = impulse position, 1 = warp position
    this.shieldPulseTimer = 0;
    this.displacementPulseTimer = 0;
    this.displacementSpinAngle = 0;
    this.engines = [];
    this.engineMaterials = [];
    this.nacelleAssemblies = [];   // pivoting pylon+nacelle groups
    this.bussardBlades = [];       // spinning swirl blades inside bussards
    this.rcsThrusters = { left: [], right: [], up: [], down: [] };

    this.buildShip();
    this.createShieldShader();
    this.createEngineGlow();
    this.createRCSThrusters();
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
      color: 0xc4c4d0, metalness: 0.6, roughness: 0.3, emissive: 0x050510,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x33333b, metalness: 0.8, roughness: 0.5,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x992222, metalness: 0.4, roughness: 0.4, emissive: 0x330000,
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    // --- SAUCER SECTION (Spoon shape) ---
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 4.8, 0.6, 64), bodyMat);
    saucer.scale.set(1, 1, 1.4);
    saucer.position.set(0, 0, -2.5);
    this.visualGroup.add(saucer);

    const saucerTop = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 5.5, 0.5, 64), bodyMat);
    saucerTop.scale.set(1, 1, 1.4);
    saucerTop.position.set(0, 0.55, -2.5);
    this.visualGroup.add(saucerTop);

    const saucerBot = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 2.5, 0.6, 64), bodyMat);
    saucerBot.scale.set(1, 1, 1.4);
    saucerBot.position.set(0, -0.6, -2.5);
    this.visualGroup.add(saucerBot);

    // Bridge / Main sensor dome
    const bridge = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), bodyMat);
    bridge.scale.set(1, 0.4, 1.2);
    bridge.position.set(0, 0.8, -3.0);
    this.visualGroup.add(bridge);

    // Bridge module detail
    const bridgeDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 0.18, 24), darkMat);
    bridgeDeck.position.set(0, 1.12, -3.0);
    this.visualGroup.add(bridgeDeck);

    // Secondary sensor dome (bottom)
    const lowerDome = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), bodyMat);
    lowerDome.scale.set(1, 0.4, 1.2);
    lowerDome.position.set(0, -0.9, -2.5);
    this.visualGroup.add(lowerDome);

    // Dorsal phaser strip — golden arc on the saucer
    const phaserStrip = new THREE.Mesh(
      new THREE.TorusGeometry(4.6, 0.06, 6, 64, Math.PI * 1.5),
      new THREE.MeshStandardMaterial({ color: 0xccaa55, metalness: 0.7, roughness: 0.3, emissive: 0x221a05 })
    );
    phaserStrip.rotation.x = Math.PI / 2;
    phaserStrip.rotation.z = Math.PI * 0.25;
    phaserStrip.scale.set(1, 1.4, 1);
    phaserStrip.position.set(0, 0.82, -2.5);
    this.visualGroup.add(phaserStrip);

    // --- ENGINEERING HULL ---
    const hullGeo = new THREE.CylinderGeometry(2.0, 1.2, 11, 32);
    const hull = new THREE.Mesh(hullGeo, bodyMat);
    hull.rotation.x = Math.PI / 2;
    hull.position.set(0, -1.2, 4.5);
    this.visualGroup.add(hull);

    // Spine/Neck blending saucer into hull
    const spine = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.8, 9), bodyMat);
    spine.position.set(0, -0.3, 1.5);
    this.visualGroup.add(spine);

    // Deflector Dish
    const deflectorGeo = new THREE.CylinderGeometry(1.5, 1.8, 0.6, 32);
    const deflector = new THREE.Mesh(deflectorGeo, new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
    deflector.rotation.x = Math.PI / 2;
    deflector.position.set(0, -1.2, -1.3);
    this.visualGroup.add(deflector);
    this.deflector = deflector;

    const deflectorLight = new THREE.PointLight(0x00ffff, 4, 25);
    deflectorLight.position.set(0, -1.2, -1.6);
    this.visualGroup.add(deflectorLight);

    const deflectorRim = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.15, 16, 32), darkMat);
    deflectorRim.rotation.x = Math.PI / 2;
    deflectorRim.position.set(0, -1.2, -1.1);
    this.visualGroup.add(deflectorRim);

    // --- VARIABLE-GEOMETRY NACELLE ASSEMBLIES ---
    // Each assembly pivots at the hull attachment point. At impulse the pylons
    // lie swept down/flat; engaging warp rotates the whole assembly so the
    // nacelles tilt up into warp position.
    for (const side of [-1, 1]) {
      const assembly = new THREE.Group();
      assembly.position.set(side * 1.2, -0.8, 6.5); // pivot at hull root
      this.visualGroup.add(assembly);
      this.nacelleAssemblies.push({ group: assembly, side });

      // Pylon — slanted blade from hull root up to the nacelle
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.35, 2.8), bodyMat);
      pylon.position.set(side * 1.9, 0.7, 0.6);
      pylon.rotation.z = side * 0.62;
      assembly.add(pylon);

      // Nacelle group at the pylon tip
      const nacelleGrp = new THREE.Group();
      nacelleGrp.position.set(side * 3.8, 2.0, 1.0);
      assembly.add(nacelleGrp);

      const nacelleGeo = new THREE.CylinderGeometry(0.8, 0.6, 12, 24);
      nacelleGeo.rotateX(Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, bodyMat);
      nacelleGrp.add(nacelle);

      // Dark accent strip on top
      const nStripe = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 11), darkMat);
      nStripe.position.set(0, 0.7, -0.5);
      nacelleGrp.add(nStripe);

      // Warp coil glow (blue side strips)
      const coilGeo = new THREE.CylinderGeometry(0.82, 0.62, 9, 24, 1, true, Math.PI * 1.25, Math.PI * 0.5);
      coilGeo.rotateX(Math.PI / 2);
      if (side === 1) coilGeo.rotateZ(Math.PI);
      const coil = new THREE.Mesh(coilGeo, glowMat.clone());
      coil.position.set(0, 0, 0.5);
      nacelleGrp.add(coil);
      this.engineMaterials.push(coil.material);

      // Bussard Collector (red dome at the front)
      const bussardGeo = new THREE.SphereGeometry(0.8, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2);
      bussardGeo.rotateX(-Math.PI / 2);
      bussardGeo.scale(1, 1, 1.2);
      const bussard = new THREE.Mesh(bussardGeo, new THREE.MeshBasicMaterial({
        color: 0xff3300, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending,
      }));
      bussard.position.set(0, 0, -5.8);
      nacelleGrp.add(bussard);

      // Spinning swirl blades inside the bussard (the classic intake vortex)
      const bladeGroup = new THREE.Group();
      bladeGroup.position.set(0, 0, -5.7);
      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 1.3, 0.1),
          new THREE.MeshBasicMaterial({ color: 0xffcc88, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
        );
        blade.rotation.z = (b / 3) * Math.PI;
        bladeGroup.add(blade);
      }
      nacelleGrp.add(bladeGroup);
      this.bussardBlades.push(bladeGroup);

      // Bussard inner glow core
      const bussardInner = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffaa55 }));
      bussardInner.position.set(0, 0, -5.6);
      bussardInner.scale.set(1, 1, 1.5);
      nacelleGrp.add(bussardInner);

      if (side === -1) this.bussardLeft = bussard;
      else this.bussardRight = bussard;

      // Engine exhaust (blue glow at the back)
      const exhaustGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const exhaust = new THREE.Mesh(exhaustGeo, new THREE.MeshBasicMaterial({
        color: 0x66aaff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
      }));
      exhaust.position.set(0, 0, 5.8);
      nacelleGrp.add(exhaust);
      this.engines.push(exhaust);
      this.engineMaterials.push(exhaust.material);

      // Exhaust light rides with the nacelle so it follows pylon animation
      const exhaustLight = new THREE.PointLight(0x4488ff, 4, 30);
      exhaustLight.position.set(0, 0, 5.0);
      nacelleGrp.add(exhaustLight);
    }

    // --- ACCENTS & DETAILS ---
    const topStripeGeo = new THREE.TorusGeometry(3.8, 0.15, 8, 64);
    const topStripe = new THREE.Mesh(topStripeGeo, accentMat);
    topStripe.rotation.x = Math.PI / 2;
    topStripe.scale.set(1, 1.4, 1);
    topStripe.position.set(0, 0.6, -2.5);
    this.visualGroup.add(topStripe);

    // Shuttlebay / Rear hull detailing
    const shuttlebay = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.0, 1.5), darkMat);
    shuttlebay.position.set(0, -0.6, 9.8);
    this.visualGroup.add(shuttlebay);
    const bayDoor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 0.1), new THREE.MeshStandardMaterial({ color: 0x666670, metalness: 0.5, roughness: 0.4 }));
    bayDoor.position.set(0, -0.6, 10.6);
    this.visualGroup.add(bayDoor);

    // Windows (Glowing dots)
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xffffee });
    for (let i = 0; i < 40; i++) {
      if (i > 15 && i < 25) continue;
      const angle = (i / 40) * Math.PI * 2;
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.1), windowMat);
      win.position.set(Math.cos(angle) * 5.3, 0.15, -2.5 + Math.sin(angle) * 5.3 * 1.4);
      win.lookAt(0, 0.15, -2.5);
      this.visualGroup.add(win);
    }
    // Second window deck (lower saucer)
    for (let i = 0; i < 28; i++) {
      if (i > 10 && i < 18) continue;
      const angle = (i / 28) * Math.PI * 2;
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.1), windowMat);
      win.position.set(Math.cos(angle) * 4.4, -0.55, -2.5 + Math.sin(angle) * 4.4 * 1.4);
      win.lookAt(0, -0.55, -2.5);
      this.visualGroup.add(win);
    }

    // Secondary hull windows
    for (let i = 0; i < 8; i++) {
      const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.15), windowMat);
      win1.position.set(1.8, -1.0, 2 + i * 1.0);
      this.visualGroup.add(win1);
      const win2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.15), windowMat);
      win2.position.set(-1.8, -1.0, 2 + i * 1.0);
      this.visualGroup.add(win2);
    }
  }

  // RCS thruster puffs — small glow quads at the saucer rim that flare while turning
  createRCSThrusters() {
    const mkThruster = (x, y, z, ry) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffeeaa, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), mat);
      quad.position.set(x, y, z);
      quad.rotation.y = ry;
      this.visualGroup.add(quad);
      return quad;
    };
    // Yaw thrusters fire opposite the turn: turning left (A) fires the right-side jets
    this.rcsThrusters.left = [mkThruster(5.8, 0.1, -2.5, Math.PI / 2)];
    this.rcsThrusters.right = [mkThruster(-5.8, 0.1, -2.5, Math.PI / 2)];
    // Pitch thrusters at bow top/bottom
    this.rcsThrusters.up = [mkThruster(0, -1.1, -9.6, 0)];
    this.rcsThrusters.down = [mkThruster(0, 1.0, -9.6, 0)];
  }

  createShieldShader() {
    this.shieldUniforms = {
      time: { value: 0 },
      pulse: { value: 0 },
      baseGlow: { value: 0 },
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
      this.currentSpeed += accel * delta;
    } else {
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

    const hardMin = -this.maxSpeed * 0.5 * this.speedMultiplier;
    if (this.currentSpeed > maxSpd) {
      this.currentSpeed = Math.max(maxSpd, this.currentSpeed - this.deceleration * 5 * delta);
    }
    this.currentSpeed = Math.max(hardMin, Math.min(maxSpd, this.currentSpeed));

    // Yaw (A/D)
    if (this.keys.a) this.mesh.rotateY(this.yawSpeed * delta);
    if (this.keys.d) this.mesh.rotateY(-this.yawSpeed * delta);

    // Pitch (Arrow Up/Down)
    if (this.keys.ArrowUp) this.mesh.rotateX(-this.pitchSpeed * delta);
    if (this.keys.ArrowDown) this.mesh.rotateX(this.pitchSpeed * delta);

    // Move ship forward along its local -Z axis
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    this.mesh.position.addScaledVector(forward, this.currentSpeed * delta);

    // ── Variable-geometry warp pylons ──
    // Smoothly rotate nacelle assemblies up into warp position and back
    const pylonTarget = this.isWarping ? 1 : 0;
    this.pylonAngle = THREE.MathUtils.lerp(this.pylonAngle, pylonTarget, delta * 2.2);
    for (const { group, side } of this.nacelleAssemblies) {
      group.rotation.z = side * 0.38 * this.pylonAngle;
    }

    // ── Bussard swirl blades spin (faster at warp) ──
    const bladeSpeed = 3 + this.pylonAngle * 9 + Math.abs(this.currentSpeed) * 0.02;
    for (const blades of this.bussardBlades) {
      blades.rotation.z += bladeSpeed * delta;
    }

    // ── RCS thruster flares ──
    const rcsFade = (jets, active) => {
      for (const jet of jets) {
        jet.material.opacity = THREE.MathUtils.lerp(jet.material.opacity, active ? 0.85 : 0, delta * 10);
      }
    };
    rcsFade(this.rcsThrusters.left, this.keys.a && !this.isWarping);
    rcsFade(this.rcsThrusters.right, this.keys.d && !this.isWarping);
    rcsFade(this.rcsThrusters.up, this.keys.ArrowDown);
    rcsFade(this.rcsThrusters.down, this.keys.ArrowUp);

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

    // ── Engine glow intensity ──
    const warpMul = this.isWarping ? 1.5 : 1;
    const enginePulse = 1 + Math.sin(t * 6) * 0.08 + speedRatio * 0.5 + (this.isWarping ? 0.4 : 0);
    for (let i = 0; i < this.engines.length; i++) {
      const eng = this.engines[i];
      const d = Math.sin(t * (8 + i * 0.7)) * 0.04;
      const sScale = this.isWarping ? 1.8 + speedRatio * 1.6 : 1;
      eng.scale.set(enginePulse + d, enginePulse + d, sScale);
      this.engineMaterials[i * 2].opacity = (0.4 + speedRatio * 0.5 + (this.isWarping ? 0.3 : 0)) * warpMul;
      this.engineMaterials[i * 2 + 1].opacity = (0.6 + speedRatio * 0.3 + d * 2) * warpMul;
    }

    // Bussard collector pulsing
    const bPulse = 0.55 + Math.sin(t * 3) * 0.35;
    if (this.bussardLeft) this.bussardLeft.material.opacity = bPulse;
    if (this.bussardRight) this.bussardRight.material.opacity = bPulse;

    // Deflector glow breathes, brighter at warp
    if (this.deflector) {
      this.deflector.material.opacity = 0.6 + Math.sin(t * 2.2) * 0.15 + this.pylonAngle * 0.25;
    }

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

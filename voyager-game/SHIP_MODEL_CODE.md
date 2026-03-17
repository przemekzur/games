# EXPLORATION CLASS SHIP - COMPLETE IMPLEMENTATION

This is the EXACT ship model from the original minified code, unminified and commented.
Copy this code directly into your rebuild.

\\\javascript
buildExplorationShip() {
  // Define all 10 materials with exact colors, roughness, and metalness
  const hullPrimary = new THREE.MeshStandardMaterial({
    color: 0xD6BD99,      // tan/beige
    roughness: 0.42,
    metalness: 0.62
  });
  
  const hullSecondary = new THREE.MeshStandardMaterial({
    color: 0xAAB2A7,      // light gray
    roughness: 0.5,
    metalness: 0.66
  });
  
  const hullAccent = new THREE.MeshStandardMaterial({
    color: 0x2B436A,      // dark cyan
    roughness: 0.72,
    metalness: 0.74
  });
  
  const accentCyan = new THREE.MeshStandardMaterial({
    color: 0x8BA8BA,      // blue-gray
    roughness: 0.42,
    metalness: 0.72
  });
  
  // Emissive materials for pulsing engine glow
  const engineGlow = new THREE.MeshStandardMaterial({
    color: 0xFF8EFC,              // bright magenta
    emissive: 0xFF7FFF,
    emissiveIntensity: 1.1,
    roughness: 0.18,
    metalness: 0.15
  });
  
  const engineYellow = new THREE.MeshStandardMaterial({
    color: 0xFFFF1F,              // bright yellow
    emissive: 0xFFFF7F,
    emissiveIntensity: 1.1,
    roughness: 0.18,
    metalness: 0.15
  });
  
  const nacelleGlow = new THREE.MeshStandardMaterial({
    color: 0x66FFFF,              // cyan
    emissive: 0x33FFFF,
    emissiveIntensity: 1.6,
    roughness: 0.1,
    metalness: 0.1
  });
  
  const nacelleGlow2 = new THREE.MeshStandardMaterial({
    color: 0xFFFF1F,              // yellow
    emissive: 0xFFFF7F,
    emissiveIntensity: 1,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const sensorBlue = new THREE.MeshStandardMaterial({
    color: 0x84A8AF,              // blue-gray
    emissive: 0x53F75F,
    emissiveIntensity: 0.95,
    roughness: 0.2,
    metalness: 0.2
  });
  
  const sensorOrange = new THREE.MeshStandardMaterial({
    color: 0xCA7A77,              // orange
    emissive: 0xC0A200,
    emissiveIntensity: 0.35,
    roughness: 0.5,
    metalness: 0.55
  });
  
  // Center position for all geometry
  const centerPos = new THREE.Vector3(0, 0.1, 8.5);
  
  // === MAIN SAUCER ===
  // Primary hull section - upper
  const mainHullUpper = new THREE.Mesh(
    new THREE.CylinderGeometry(12.8, 11.4, 0.85, 64),
    hullPrimary
  );
  mainHullUpper.position.copy(centerPos).add(new THREE.Vector3(0, 0.35, 0));
  this.visualGroup.add(mainHullUpper);
  this.hullNodes.push(mainHullUpper);
  
  // Primary hull section - lower
  const mainHullLower = new THREE.Mesh(
    new THREE.CylinderGeometry(11.3, 12.6, 0.72, 64),
    hullPrimary
  );
  mainHullLower.position.copy(centerPos).add(new THREE.Vector3(0, -0.4, 0));
  this.visualGroup.add(mainHullLower);
  
  // Main ring disk (critical for ship silhouette!)
  const mainRing = new THREE.Mesh(
    new THREE.TorusGeometry(12.15, 0.24, 18, 120),
    accentCyan
  );
  mainRing.rotation.x = Math.PI / 2;
  mainRing.position.copy(centerPos);
  this.visualGroup.add(mainRing);
  
  // === SENSOR DOMES ===
  // Top sensor dome
  const topSensor = new THREE.Mesh(
    new THREE.CylinderGeometry(2.1, 2.6, 0.45, 28),
    hullSecondary
  );
  topSensor.position.copy(centerPos).add(new THREE.Vector3(0, 0.88, 0.35));
  this.visualGroup.add(topSensor);
  
  // Upper lower dome
  const lowerDomeUpper = new THREE.Mesh(
    new THREE.SphereGeometry(1.45, 24, 18),
    accentCyan
  );
  lowerDomeUpper.position.copy(centerPos).add(new THREE.Vector3(0, 1.2, 0.45));
  lowerDomeUpper.scale.set(1, 0.42, 1);
  this.visualGroup.add(lowerDomeUpper);
  
  // Lower lower dome
  const lowerDomeLower = new THREE.Mesh(
    new THREE.SphereGeometry(1.7, 24, 16),
    hullAccent
  );
  lowerDomeLower.position.copy(centerPos).add(new THREE.Vector3(0, -0.98, -0.4));
  lowerDomeLower.scale.set(1, 0.32, 1);
  this.visualGroup.add(lowerDomeLower);
  
  // Bottom ring
  const bottomRing = new THREE.Mesh(
    new THREE.TorusGeometry(9.4, 0.09, 8, 96),
    sensorOrange
  );
  bottomRing.rotation.x = Math.PI / 2;
  bottomRing.position.copy(centerPos).add(new THREE.Vector3(0, 0.51, -0.2));
  this.visualGroup.add(bottomRing);
  
  // === HULL DETAIL BOXES ===
  // 56 small boxes arranged in two circles around the hull perimeter
  for (const heightOffset of [0.18, -0.06]) {
    for (let i = 0; i < 56; i++) {
      const angle = (i / 56) * Math.PI * 2;
      const detailBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.1, 0.46),
        engineGlow
      );
      detailBox.position.set(
        Math.cos(angle) * 10.5,
        centerPos.y + heightOffset,
        centerPos.z + Math.sin(angle) * 10.5
      );
      detailBox.lookAt(centerPos.x, centerPos.y + heightOffset, centerPos.z);
      this.visualGroup.add(detailBox);
    }
  }
  
  // Add emissive pulse to detail boxes
  this.addEmissivePulse(engineGlow, 0.5, 0.1, 0.85);
  
  // === MAIN BODY POD ===
  // Lower section main pod
  const mainPod = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 2.2, 9.8),
    hullPrimary
  );
  mainPod.position.set(0, -1.05, 2.5);
  this.visualGroup.add(mainPod);
  this.hullNodes.push(mainPod);
  
  // Pod connector section
  const podConnector = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.7, 6.2),
    hullSecondary
  );
  podConnector.position.set(0, -0.2, 1.7);
  this.visualGroup.add(podConnector);
  
  // Lower nacelle anchor cylinder
  const nacelleBase = new THREE.Mesh(
    new THREE.CylinderGeometry(2.85, 1.95, 20.5, 24),
    hullPrimary
  );
  nacelleBase.rotation.x = Math.PI / 2;
  nacelleBase.position.set(0, -2.15, -7.6);
  this.visualGroup.add(nacelleBase);
  this.hullNodes.push(nacelleBase);
  
  // Lower connector
  const lowerConnector = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.8, 12.8),
    hullSecondary
  );
  lowerConnector.position.set(0, -1.2, -8.2);
  this.visualGroup.add(lowerConnector);
  
  // Connection plate
  const connectionPlate = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.4, 0.2),
    hullAccent
  );
  connectionPlate.position.set(0, -2.1, -18.05);
  this.visualGroup.add(connectionPlate);
  
  // Ring connector at pod base
  const podRing = new THREE.Mesh(
    new THREE.TorusGeometry(2, 2.3, 0.42, 32),
    hullSecondary
  );
  podRing.rotation.x = Math.PI / 2;
  podRing.position.set(0, -2.1, 2.45);
  this.visualGroup.add(podRing);
  
  // Bottom engine mount
  const bottomEngineMount = new THREE.Mesh(
    new THREE.ConeGeometry(1.75, 32),
    sensorBlue
  );
  bottomEngineMount.position.set(0, -2.1, 2.75);
  this.visualGroup.add(bottomEngineMount);
  this.addEmissivePulse(sensorBlue, 0.85, 0.18, 1.7);
  
  // Bottom engine light
  const bottomEngineLight = new THREE.PointLight(0x788F1F, 0.9, 38, 2);
  bottomEngineLight.position.set(0, -2.1, 3);
  this.visualGroup.add(bottomEngineLight);
  this.shipLights.push(bottomEngineLight);
  
  // === MAIN ENGINE POD ===
  // Center engine pod
  const mainEngineBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.22, 0.8),
    engineYellow
  );
  mainEngineBody.position.set(0, 0.62, -3.55);
  this.visualGroup.add(mainEngineBody);
  this.engines.push(mainEngineBody);
  this.engineMaterials.push(engineYellow);
  this.addEmissivePulse(engineYellow, 0.9, 0.16, 2.1);
  
  // Side nacelle support structures (left)
  const leftNacelleSupport = new THREE.Mesh(
    new THREE.BoxGeometry(10.4, 0.9, 3.8),
    hullAccent
  );
  leftNacelleSupport.position.set(-5.4, 1.05, -10.3);
  leftNacelleSupport.rotation.z = Math.atan2(4.8, 8.4);
  this.visualGroup.add(leftNacelleSupport);
  
  // Side nacelle support structures (right)
  const rightNacelleSupport = new THREE.Mesh(
    new THREE.BoxGeometry(10.4, 0.9, 3.8),
    hullAccent
  );
  rightNacelleSupport.position.set(5.4, 1.05, -10.3);
  rightNacelleSupport.rotation.z = -Math.atan2(4.8, 8.4);
  this.visualGroup.add(rightNacelleSupport);
  
  // === NACELLE PODS (LEFT & RIGHT) ===
  // Factory function to create symmetric nacelle pods
  const createNacellePod = (xPos, phaseOffset) => {
    const nacelleGroup = new THREE.Group();
    nacelleGroup.position.set(xPos, 3.25, -0.2);
    
    // Main nacelle cylinder
    const nacelleCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.22, 22.8, 22),
      hullPrimary
    );
    nacelleCylinder.rotation.x = Math.PI / 2;
    nacelleCylinder.position.set(0, 0, -12.1);
    nacelleGroup.add(nacelleCylinder);
    
    // Nacelle connector ring
    const nacelleConnector = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.26, 18.4),
      accentCyan
    );
    nacelleConnector.position.set(0, 0.92, -12);
    nacelleGroup.add(nacelleConnector);
    
    // Engine glow sphere (pulsing)
    const engineGlowSphere = nacelleGlow.clone();
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 20, 18),
      engineGlowSphere
    );
    glowSphere.position.set(0, 0, -1);
    glowSphere.scale.set(1, 1, 1.3);
    nacelleGroup.add(glowSphere);
    this.addEmissivePulse(engineGlowSphere, 0.95, 0.34, 4.2, phaseOffset);
    
    // Side glow panels (2x per nacelle)
    const glowPanels = [nacelleGlow2.clone(), nacelleGlow2.clone()];
    for (let i = 0; i < glowPanels.length; i++) {
      const yOffset = i === 0 ? -1 : 1;
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.24, 17.2),
        glowPanels[i]
      );
      panel.position.set(0, yOffset * 0.56, -12);
      nacelleGroup.add(panel);
      this.addEmissivePulse(glowPanels[i], 1.0, 0.2, 2.6, phaseOffset + i * Math.PI);
    }
    
    // Engine exhaust cone
    const exhaustGlow = nacelleGlow2.clone();
    const exhaustCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.95, 24),
      exhaustGlow
    );
    exhaustCone.position.set(0, 0, -23.6);
    exhaustCone.rotation.y = Math.PI;
    nacelleGroup.add(exhaustCone);
    this.engines.push(exhaustCone);
    this.engineMaterials.push(exhaustGlow);
    this.addEmissivePulse(exhaustGlow, 1.25, 0.26, 3.2, phaseOffset);
    
    // Engine light (main)
    const engineLight = new THREE.PointLight(0x66FFFF, 1, 48, 2);
    engineLight.position.set(0, 0, -23.8);
    nacelleGroup.add(engineLight);
    this.shipLights.push(engineLight);
    
    // Engine light (secondary)
    const secondaryLight = new THREE.PointLight(0xFFFF1F, 0.55, 22, 2.2);
    secondaryLight.position.set(0, 0, -0.7);
    nacelleGroup.add(secondaryLight);
    this.shipLights.push(secondaryLight);
    
    // Animated parts (bobbing and rotating)
    this.addAnimatedPart(nacelleGroup, "position", "y", 0.03, 0.55, phaseOffset);
    this.addAnimatedPart(nacelleGroup, "rotation", "z", 0.006, 0.6, phaseOffset);
    
    return nacelleGroup;
  };
  
  // Add both nacelle pods
  this.visualGroup.add(createNacellePod(8.9, 0));
  this.visualGroup.add(createNacellePod(-8.9, Math.PI));
  
  // === FRONT SENSOR LIGHTS ===
  
  // Left front sensor
  const leftFrontSensor = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 10, 10),
    sensorBlue
  );
  leftFrontSensor.position.set(-12.2, 0.22, 8.4);
  this.visualGroup.add(leftFrontSensor);
  this.addEmissivePulse(sensorBlue, 0.75, 0.16, 1.1);
  
  const leftSensorLight = new THREE.PointLight(0xFF8483, 0.45, 12, 2);
  leftSensorLight.position.copy(leftFrontSensor.position);
  this.visualGroup.add(leftSensorLight);
  this.shipLights.push(leftSensorLight);
  
  // Right front sensor
  const rightFrontSensor = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 10, 10),
    sensorOrange
  );
  rightFrontSensor.position.set(12.2, 0.22, 8.4);
  this.visualGroup.add(rightFrontSensor);
  this.addEmissivePulse(sensorOrange, 0.75, 0.16, 1.1, Math.PI * 0.4);
  
  const rightSensorLight = new THREE.PointLight(0x53A548, 0.45, 12, 2);
  rightSensorLight.position.copy(rightFrontSensor.position);
  this.visualGroup.add(rightSensorLight);
  this.shipLights.push(rightSensorLight);
  
  // Bottom rear sensor
  const rearSensor = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 10, 10),
    engineGlow
  );
  rearSensor.position.set(0, -2, -18.4);
  this.visualGroup.add(rearSensor);
  this.addEmissivePulse(engineGlow, 0.7, 0.14, 1.3);
  
  const rearSensorLight = new THREE.PointLight(0xD0E57F, 0.4, 10, 2);
  rearSensorLight.position.copy(rearSensor.position);
  this.visualGroup.add(rearSensorLight);
  this.shipLights.push(rearSensorLight);
}
\\\

## Material Colors Reference

\\\
Primary Hull: #D6BD99 (tan)
Secondary Hull: #AAB2A7 (light gray)
Hull Accent: #2B436A (dark cyan)
Accent Cyan: #8BA8BA (blue-gray)
Engine Glow: #FF8EFC (bright magenta)
Engine Yellow: #FFFF1F (bright yellow)
Nacelle Glow: #66FFFF (cyan)
Sensor Blue: #84A8AF (blue)
Sensor Orange: #CA7A77 (orange)

Light Colors:
- Bottom engine: #788F1F
- Main engine: #66FFFF
- Secondary: #FFFF1F
- Left sensor: #FF8483
- Right sensor: #53A548
- Rear sensor: #D0E57F
\\\


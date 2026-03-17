import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.planets = [];
    this.asteroids = [];
    this.anomalies = [];
  }

  clearSystem() {
    for (const p of this.planets) {
      this.scene.remove(p.group);
      p.group.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
    }
    for (const a of this.asteroids) {
      this.scene.remove(a);
      a.geometry?.dispose(); a.material?.dispose();
    }
    for (const a of this.anomalies) {
      this.scene.remove(a.mesh);
    }
    this.planets = [];
    this.asteroids = [];
    this.anomalies = [];
  }

  generateSystem(systemData) {
    this.clearSystem();
    const rng = this.seededRandom(systemData.seed || systemData.id);

    // Planets
    const numPlanets = 1 + Math.floor(rng() * 4);
    for (let i = 0; i < numPlanets; i++) {
      this.createPlanet(rng, i, numPlanets);
    }

    // Asteroid belt chance
    if (rng() > 0.5) {
      this.createAsteroidBelt(rng);
    }

    // Anomaly chance
    if (systemData.hasAnomaly || rng() > 0.7) {
      this.createAnomaly(rng, systemData.anomalyType);
    }

    // Station chance
    if (systemData.hasStation) {
      this.createStation(rng);
    }
  }

  createPlanet(rng, index, total) {
    const group = new THREE.Group();
    const radius = 3 + rng() * 8;
    const distance = 40 + index * 35 + rng() * 20;
    const angle = rng() * Math.PI * 2;

    // Planet types with distinct visuals
    const types = [
      { color: 0x4488aa, emissive: 0x112233, name: 'Class M' },
      { color: 0xcc6633, emissive: 0x331100, name: 'Class L' },
      { color: 0x88aa44, emissive: 0x223300, name: 'Class H' },
      { color: 0x6644aa, emissive: 0x220044, name: 'Gas Giant' },
      { color: 0xaabbcc, emissive: 0x223344, name: 'Class Y' },
      { color: 0xdd8833, emissive: 0x442200, name: 'Class D' },
    ];
    const type = types[Math.floor(rng() * types.length)];

    const geo = new THREE.SphereGeometry(radius, 32, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: type.color, emissive: type.emissive,
      metalness: 0.1, roughness: 0.8,
    });
    const planet = new THREE.Mesh(geo, mat);
    group.add(planet);

    // Atmosphere glow
    const atmoGeo = new THREE.SphereGeometry(radius * 1.08, 32, 24);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: type.color, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Rings for gas giants
    if (type.name === 'Gas Giant' && rng() > 0.3) {
      const ringGeo = new THREE.TorusGeometry(radius * 1.6, radius * 0.3, 2, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x998877, transparent: true, opacity: 0.3, side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (rng() - 0.5) * 0.4;
      group.add(ring);
    }

    group.position.set(
      Math.cos(angle) * distance,
      (rng() - 0.5) * 15,
      Math.sin(angle) * distance,
    );
    group.userData = { type: type.name, radius, orbitAngle: angle, orbitDist: distance, rotSpeed: 0.1 + rng() * 0.3 };
    this.scene.add(group);
    this.planets.push({ group, mesh: planet, type: type.name, position: group.position.clone() });
  }

  createAsteroidBelt(rng) {
    const count = 30 + Math.floor(rng() * 40);
    const beltDist = 60 + rng() * 40;
    for (let i = 0; i < count; i++) {
      const size = 0.3 + rng() * 1.5;
      const geo = new THREE.DodecahedronGeometry(size, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x666655, roughness: 0.9, metalness: 0.2,
      });
      const asteroid = new THREE.Mesh(geo, mat);
      const angle = rng() * Math.PI * 2;
      const dist = beltDist + (rng() - 0.5) * 15;
      asteroid.position.set(
        Math.cos(angle) * dist,
        (rng() - 0.5) * 8,
        Math.sin(angle) * dist,
      );
      asteroid.rotation.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
      asteroid.userData.rotSpeed = new THREE.Vector3(
        (rng() - 0.5) * 0.5, (rng() - 0.5) * 0.5, (rng() - 0.5) * 0.5
      );
      this.scene.add(asteroid);
      this.asteroids.push(asteroid);
    }
  }

  createAnomaly(rng, type) {
    const anomalyTypes = type ? [type] : ['spatial-rift', 'subspace-tear', 'graviton-surge', 'quantum-flux'];
    const aType = anomalyTypes[Math.floor(rng() * anomalyTypes.length)];
    const colors = {
      'spatial-rift': 0x8800ff,
      'subspace-tear': 0x00ff88,
      'graviton-surge': 0xff8800,
      'quantum-flux': 0x0088ff,
    };
    const color = colors[aType] || 0x8800ff;

    const group = new THREE.Group();
    // Core
    const coreGeo = new THREE.SphereGeometry(2, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Mesh(coreGeo, coreMat));

    // Outer glow
    const glowGeo = new THREE.SphereGeometry(5, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    // Particle ring
    const ringGeo = new THREE.TorusGeometry(4, 0.2, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    const dist = 25 + rng() * 30;
    const angle = rng() * Math.PI * 2;
    group.position.set(Math.cos(angle) * dist, (rng() - 0.5) * 10, Math.sin(angle) * dist);
    this.scene.add(group);
    this.anomalies.push({ mesh: group, type: aType, ring, coreMat, glowMat });
  }

  createStation(rng) {
    const group = new THREE.Group();
    // Central hub
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(3, 3, 2, 8),
      new THREE.MeshStandardMaterial({ color: 0x667788, metalness: 0.8, roughness: 0.3 })
    );
    group.add(hub);
    // Docking ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(6, 0.5, 6, 24),
      new THREE.MeshStandardMaterial({ color: 0x556677, metalness: 0.7, roughness: 0.4 })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    // Beacon lights
    for (let i = 0; i < 4; i++) {
      const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, blending: THREE.AdditiveBlending })
      );
      const a = (i / 4) * Math.PI * 2;
      light.position.set(Math.cos(a) * 6, 0, Math.sin(a) * 6);
      group.add(light);
    }

    const dist = 20 + rng() * 15;
    group.position.set(dist, (rng() - 0.5) * 5, (rng() - 0.5) * 20);
    group.userData.rotSpeed = 0.1;
    this.scene.add(group);
    this.planets.push({ group, mesh: hub, type: 'Station', position: group.position.clone() });
  }

  seededRandom(seed) {
    let s = seed * 9301 + 49297;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  update(elapsed, delta) {
    if (!delta) return;
    for (const p of this.planets) {
      if (p.group.userData.rotSpeed) {
        p.mesh.rotation.y += p.group.userData.rotSpeed * delta;
      }
    }
    for (const a of this.asteroids) {
      const rs = a.userData.rotSpeed;
      a.rotation.x += rs.x * delta;
      a.rotation.y += rs.y * delta;
    }
    for (const a of this.anomalies) {
      a.ring.rotation.x += delta * 0.5;
      a.ring.rotation.y += delta * 0.3;
      a.coreMat.opacity = 0.4 + Math.sin(elapsed * 2) * 0.2;
      a.glowMat.opacity = 0.08 + Math.sin(elapsed * 1.5) * 0.04;
    }
  }
}

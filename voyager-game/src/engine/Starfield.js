import * as THREE from 'three';

export class Starfield {
  constructor(scene) {
    this.scene = scene;
    this.warpMode = false;
    this.warpIntensity = 0;
    this.createStars();
    this.createNebula();
    this.createDust();
  }

  createStars() {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const starColors = [
      [1, 1, 1], [0.8, 0.9, 1], [1, 0.95, 0.8],
      [1, 0.7, 0.5], [0.7, 0.8, 1], [1, 0.85, 0.6],
    ];
    for (let i = 0; i < count; i++) {
      const r = 2000 + Math.random() * 6000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
      sizes[i] = 1 + Math.random() * 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 2, sizeAttenuation: true,
      vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.stars = new THREE.Points(geo, mat);
    this.scene.add(this.stars);
  }

  createNebula() {
    this.nebulae = [];
    const nebulaColors = [0x220044, 0x002244, 0x441100, 0x003322, 0x330022];
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.PlaneGeometry(800 + Math.random() * 1200, 600 + Math.random() * 800);
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, `rgba(${60 + Math.random() * 100}, ${30 + Math.random() * 80}, ${80 + Math.random() * 120}, 0.15)`);
      gradient.addColorStop(0.5, `rgba(${20 + Math.random() * 40}, ${10 + Math.random() * 30}, ${40 + Math.random() * 60}, 0.06)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({
        map: texture, transparent: true, opacity: 0.3 + Math.random() * 0.2,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 4000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 4000
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData.rotSpeed = (Math.random() - 0.5) * 0.01;
      this.scene.add(mesh);
      this.nebulae.push(mesh);
    }
  }

  createDust() {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.5, color: 0x334455, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.dust = new THREE.Points(geo, mat);
    this.scene.add(this.dust);
  }

  setWarpMode(active) {
    this.warpMode = active;
  }

  update(elapsed, delta) {
    if (!delta) return;
    this.stars.rotation.y += delta * 0.001;

    // Warp stretch effect
    const target = this.warpMode ? 1 : 0;
    this.warpIntensity += (target - this.warpIntensity) * delta * 3;
    this.stars.material.size = 2 + this.warpIntensity * 6;

    for (const n of this.nebulae) {
      n.rotation.z += n.userData.rotSpeed * delta;
    }

    // Dust parallax
    if (this.dust) {
      this.dust.rotation.y += delta * 0.005;
    }
  }
}

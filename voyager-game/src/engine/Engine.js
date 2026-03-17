import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

export class Engine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.updatables = [];
    this.paused = false;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
    this.camera.position.set(0, 30, 60);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxDistance = 200;
    this.controls.minDistance = 15;
    this.controls.maxPolarAngle = Math.PI * 0.85;

    // Post-processing
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6, 0.4, 0.85
    );
    this.composer.addPass(this.bloomPass);

    // Lighting
    const ambient = new THREE.AmbientLight(0x112244, 0.8);
    this.scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffeedd, 1.5);
    sun.position.set(50, 30, 50);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x4488ff, 0.4);
    fill.position.set(-30, -10, -20);
    this.scene.add(fill);

    // Resize
    window.addEventListener('resize', () => this.onResize());

    this.animate();
  }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  addUpdatable(obj) { this.updatables.push(obj); }
  removeUpdatable(obj) {
    const idx = this.updatables.indexOf(obj);
    if (idx >= 0) this.updatables.splice(idx, 1);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.paused) return;
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();
    this.controls.update();
    for (const u of this.updatables) u.update(elapsed, delta);
    this.composer.render();
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }
}

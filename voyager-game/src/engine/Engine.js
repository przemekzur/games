import * as THREE from 'three';
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
    this.camera.position.set(0, 12, 40);

    // Camera follow state (no OrbitControls — ship flies, camera follows)
    this.cameraTarget = new THREE.Vector3();
    this.cameraOffset = new THREE.Vector3(0, 12, 40);

    // Post-processing
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6, 0.4, 0.85
    );
    this.composer.addPass(this.bloomPass);

    // Lighting
    const ambient = new THREE.AmbientLight(0x223355, 1.0);
    this.scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffeedd, 1.8);
    sun.position.set(50, 30, 50);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x4488ff, 0.5);
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

  // Follow a target (the ship) with smooth interpolation
  followTarget(targetPos, targetQuaternion, delta, lerpSpeed = 4) {
    // Compute desired camera position: behind and above the ship
    const offset = this.cameraOffset.clone().applyQuaternion(targetQuaternion);
    const desiredPos = targetPos.clone().add(offset);
    this.camera.position.lerp(desiredPos, Math.min(1, delta * lerpSpeed));
    // Look at point slightly ahead of ship
    const lookAhead = new THREE.Vector3(0, 2, -15).applyQuaternion(targetQuaternion).add(targetPos);
    this.cameraTarget.lerp(lookAhead, Math.min(1, delta * lerpSpeed));
    this.camera.lookAt(this.cameraTarget);
  }

  // Cinematic flyby — orbits around the ship for dramatic warp shots
  flybyCamera(targetPos, targetQuaternion, elapsed, delta) {
    const t = elapsed * 0.35;
    const radius = 28 + Math.sin(t * 0.7) * 12;
    const height = 6 + Math.sin(t * 0.5) * 10;
    const angle = t * 0.8;

    // Orbit position in ship-local space, then transform to world
    const localOffset = new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    const worldOffset = localOffset.applyQuaternion(targetQuaternion);
    const desiredPos = targetPos.clone().add(worldOffset);

    this.camera.position.lerp(desiredPos, Math.min(1, delta * 3));
    // Always look at the ship center
    this.cameraTarget.lerp(targetPos, Math.min(1, delta * 5));
    this.camera.lookAt(this.cameraTarget);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.paused) return;
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();
    for (const u of this.updatables) u.update(elapsed, delta);
    this.composer.render();
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }
}

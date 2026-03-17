import * as THREE from 'three';

// Full warp tunnel with multi-phase shader (normal warp → spore network → displacement burst)
export class WarpTunnel {
  constructor(scene) {
    this.mesh = new THREE.Group();
    this.currentOpacity = 0;
    this.targetOpacity = 0;
    this.localTime = 0;

    const geo = new THREE.CylinderGeometry(60, 60, 2000, 64, 1, true);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 0, -800);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0 },
        phase: { value: 0 },  // 0=off, 1=black-alert/warp, 2=spore, 3=displace
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        uniform float phase;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;

          // Fade ends of the cylinder
          float edgeFade = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.8, uv.y);

          // ── Normal warp streaks ──
          float speed = 25.0;
          float scrollOffset = time * speed;
          vec2 id = vec2(floor(uv.x * 200.0), floor(uv.y * 5.0 - scrollOffset));
          float n = hash(id);
          float streak = smoothstep(0.97, 1.0, n);
          float ringNoise = sin(uv.y * 150.0 - time * 40.0);
          float ring = smoothstep(0.95, 1.0, ringNoise) * 0.2;

          vec3 color1 = vec3(0.1, 0.4, 1.0);
          vec3 color2 = vec3(0.5, 0.1, 0.8);
          vec3 color3 = vec3(0.0, 0.8, 1.0);
          float mixFactor1 = (sin(uv.x * 10.0 + time * 2.0) + 1.0) * 0.5;
          float mixFactor2 = (cos(uv.x * 15.0 - time) + 1.0) * 0.5;
          vec3 baseColor = mix(mix(color1, color2, mixFactor1), color3, mixFactor2 * 0.5);
          vec3 warpColor = baseColor * (streak * 4.0 + ring + 0.3);
          float warpAlpha = edgeFade * clamp(streak + ring + 0.3, 0.0, 1.0);

          // ── Mycelial network (spore phase) ──
          vec2 p = uv * vec2(12.0, 20.0);
          float flow = time * 2.8;
          float curveA = sin(p.x + sin(p.y * 0.75 + flow) * 2.0 + flow * 1.7);
          float curveB = sin(p.y * 1.4 + cos(p.x * 0.65 - flow) * 2.2 - flow * 1.15);
          float fibers = smoothstep(0.92, 0.995, abs(curveA * curveB));
          float nodes = smoothstep(0.975, 1.0, hash(floor(p + vec2(flow * 4.0, flow * 2.5))));
          float radial = smoothstep(0.55, 0.0, abs(uv.x - 0.5));

          vec3 sporeBase = mix(vec3(0.05, 0.25, 0.45), vec3(0.18, 0.95, 0.75), radial);
          vec3 sporeColor = sporeBase * (0.24 + fibers * 2.8 + nodes * 1.4);
          float sporeAlpha = edgeFade * clamp(0.16 + fibers + nodes * 0.8, 0.0, 1.0);

          // ── Displacement burst ──
          float burst = smoothstep(0.2, 1.0, abs(sin(time * 35.0 + uv.y * 40.0)));
          vec3 displaceColor = vec3(0.8, 0.95, 1.0) * (0.55 + burst * 0.9);
          float displaceAlpha = edgeFade * clamp(0.4 + burst * 0.8, 0.0, 1.0);

          // ── Phase blending ──
          float sporeMix = smoothstep(1.4, 2.2, phase);
          float displaceMix = smoothstep(2.2, 3.0, phase);

          vec3 finalColor = mix(warpColor, sporeColor, sporeMix);
          finalColor = mix(finalColor, displaceColor, displaceMix);
          float alpha = mix(warpAlpha, sporeAlpha, sporeMix);
          alpha = mix(alpha, displaceAlpha, displaceMix);

          gl_FragColor = vec4(finalColor, alpha * opacity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.tunnel = new THREE.Mesh(geo, this.material);
    this.mesh.add(this.tunnel);
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  update(elapsed, delta, shipPosition, shipQuaternion, jumpPhase = 'idle') {
    if (!delta) return;
    this.localTime += delta;

    this.mesh.position.copy(shipPosition);
    this.mesh.quaternion.copy(shipQuaternion);

    // Target opacity based on warp/jump state
    const isActive = jumpPhase !== 'idle';
    this.targetOpacity = isActive ? 1 : 0;

    // Smooth opacity transition
    const rate = 4;
    if (this.currentOpacity < this.targetOpacity)
      this.currentOpacity = Math.min(this.targetOpacity, this.currentOpacity + rate * delta);
    else if (this.currentOpacity > this.targetOpacity)
      this.currentOpacity = Math.max(this.targetOpacity, this.currentOpacity - rate * delta);

    // Map phase names to shader values
    let phaseVal = 0;
    if (jumpPhase === 'black-alert') phaseVal = 1;
    if (jumpPhase === 'spore') phaseVal = 2;
    if (jumpPhase === 'displace') phaseVal = 3;

    this.material.uniforms.opacity.value = this.currentOpacity;
    this.material.uniforms.time.value = this.localTime;
    this.material.uniforms.phase.value = phaseVal;

    this.mesh.visible = this.currentOpacity > 0;
  }
}

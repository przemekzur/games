# VOYAGER GAME - ORIGINAL MINIFIED IMPLEMENTATION DETAILS

## FILE: index-6vEg3WMm.js (646 KB minified bundle)

### KEY CLASS MAPPINGS (Minified Names):
- Al = Ship class
- Y0 = Scene/Renderer setup (main Game class)
- j0 = Space/Starfield/Universe class
- Bt = PerspectiveCamera
- B0 = OrbitControls
- Ai = UnrealBloomPass
- W0 = EffectComposer
- X0 = RenderPass
- rc = WebGLRenderer
- Ze = MeshStandardMaterial
- ve = Mesh
- tn = Object3D/Group
- Rt/nt = BufferAttribute
- yt = BufferGeometry
- zr/Ns = Points with PointsMaterial
- Gt = SphereGeometry
-  = BoxGeometry
- It = CylinderGeometry
- Wi = ConeGeometry
- Ji = TorusGeometry
- To = LatheGeometry
- er = TetrahedronGeometry
- Kt = PointLight
- Vg = AmbientLight

---

## 1. CAMERA SETUP

**Location:** Scene initialization (Y0 class constructor)

\\\javascript
// Camera setup
this.camera=new Bt(75,n/s,.1,1e4)  // Bt = PerspectiveCamera

// Breakdown:
// FOV: 75 degrees
// Aspect: n/s (width/height)
// Near: 0.1
// Far: 10000
\\\

---

## 2. RENDERER & POST-PROCESSING

**Renderer Setup:**
\\\javascript
this.renderer=new rc({antialias:!1,alpha:!0})  // rc = WebGLRenderer
// antialias: false
// alpha: true (transparent background)

this.renderer.setPixelRatio(window.devicePixelRatio)
\\\

**Bloom Post-Processing (UnrealBloomPass):**
\\\javascript
const r=new X0(this.scene,this.camera)  // RenderPass
const o=new Ai(new ie(n,s),1.5,.4,.85)   // UnrealBloomPass with resolution (n,s)
// Parameters:
// - resolution: width x height
// - strength: 1.5
// - radius: 0.4
// - threshold: 0.85

o.threshold=0        // Threshold set to 0 (show all bright areas)
o.strength=1.5       // Bloom strength
o.radius=.5          // Bloom radius

this.composer=new W0(this.renderer)   // EffectComposer
this.composer.addPass(r)              // Add RenderPass
this.composer.addPass(o)              // Add BloomPass
\\\

---

## 3. CONTROLS

**OrbitControls (Camera orbits around center):**
\\\javascript
this.controls=new B0(this.camera,this.renderer.domElement)  // B0 = OrbitControls
this.controls.enableDamping=!0   // true - smooth damping
this.controls.dampingFactor=.05  // 0.05 - damping factor
\\\

**NOTE:** Original uses OrbitControls, NOT flight controls. The user must have been using a modified version or different control scheme. The ship has WASD movement handlers though:

\\\javascript
// Ship has keyboard state tracking:
this.keys={w:!1, s:!1, a:!1, d:!1, ArrowUp:!1, ArrowDown:!1, ArrowLeft:!1, ArrowRight:!1, Shift:!1}

// Event listeners:
window.addEventListener("keydown",t=>this.handleKeyDown(t),!1)
window.addEventListener("keyup",t=>this.handleKeyUp(t),!1)
\\\

---

## 4. STARFIELD / SPACE BACKGROUND

**Main Starfield (5000 stars):**
\\\javascript
createStarfield(e){
  const t=new yt  // BufferGeometry
  const n=5e3     // 5000 particles
  const s=new Float32Array(n*3)  // positions
  const r=new Float32Array(n*3)  // colors
  const o=[new ke(16777215),new ke(11393254),new ke(16758465)]
  // Colors: white, light blue, orange-white
  
  for(let _=0;_<n;_++){
    const f=500+Math.random()*2e3      // radius: 500-2500
    const d=2*Math.PI*Math.random()     // azimuth
    const S=Math.acos(2*Math.random()-1) // elevation
    // Spherical distribution
    const v=f*Math.sin(S)*Math.cos(d)
    const M=f*Math.sin(S)*Math.sin(d)
    const L=f*Math.cos(S)
    s[_*3]=v, s[_*3+1]=M, s[_*3+2]=L
    
    const A=o[Math.floor(Math.random()*o.length)]
    r[_*3]=A.r, r[_*3+1]=A.g, r[_*3+2]=A.b
  }
  
  this.starMaterial=new Ns({  // PointsMaterial
    size:2,
    vertexColors:!0,  // true
    transparent:!0,   // true
    opacity:.8,       // 0.8
    sizeAttenuation:!0  // true
  })
  this.starfield=new zr(t,this.starMaterial)  // Points
}
\\\

**Bright Starfield (500 brighter stars, inner sphere):**
\\\javascript
// 500 particles, radius 100-500
// Size: 4 (vs 2 for main starfield)
// Opacity: 1.0 (vs 0.8)
const a=500
const c=new Float32Array(a*3)
const h=new Float32Array(a*3)
for(let _=0;_<a;_++){
  const f=100+Math.random()*400
  const d=2*Math.PI*Math.random()
  const S=Math.acos(2*Math.random()-1)
  c[_*3]=f*Math.sin(S)*Math.cos(d)
  c[_*3+1]=f*Math.sin(S)*Math.sin(d)
  c[_*3+2]=f*Math.cos(S)
  h[_*3]=1, h[_*3+1]=1, h[_*3+2]=1  // white
}

this.brightStarMaterial=new Ns({
  size:4,
  vertexColors:!0,
  transparent:!0,
  opacity:1,
  sizeAttenuation:!0
})
\\\

**Space Dust (10000 background particles):**
\\\javascript
const u=1e4  // 10000 particles
const p=new yt
const m=new Float32Array(u*3)
for(let _=0;_<u;_++)
  m[_*3]=(Math.random()-.5)*4e3      // -2000 to +2000
  m[_*3+1]=(Math.random()-.5)*4e3
  m[_*3+2]=(Math.random()-.5)*4e3

const g=new Ns({
  color:8947848,      // gray
  size:.5,
  transparent:!0,
  opacity:.5,
  sizeAttenuation:!0
})
this.spaceDust=new zr(p,g)
\\\

**Starfield Animation (in update loop):**
\\\javascript
if(this.starfield){
  this.starfield.rotation.y+=.01*t
  this.starfield.rotation.x+=.005*t
  const s=Jt.lerp(this.starfield.scale.z,this.warpStretchTarget,Math.min(1,t*3.5))
  this.starfield.scale.set(1,1,s)  // Z-axis stretch for warp
}

if(this.brightStarfield){
  this.brightStarfield.rotation.y+=.015*t
  this.brightStarfield.rotation.x+=.008*t
  const s=Jt.lerp(this.brightStarfield.scale.z,this.brightWarpStretchTarget,Math.min(1,t*4.5))
  this.brightStarfield.scale.set(1,1,s)  // More aggressive stretch
}

this.spaceDust.rotation.y+=.002*t
this.spaceDust.rotation.x+=.001*t
\\\

---

## 5. WARP EFFECT

**Warp Mechanism (triggers on Shift key):**
\\\javascript
this.isWarping = this.keys.Shift || this.forcedWarpMode

// Warp stretches starfield on Z-axis:
setWarpStretch(e){
  e ? (
    this.warpStretchTarget=10,
    this.brightWarpStretchTarget=20
  ) : (
    this.warpStretchTarget=1,
    this.brightWarpStretchTarget=1
  )
}

// Speed multiplier when warping:
const s=(this.isWarping ? this.maxSpeed*10 : this.maxSpeed)*this.speedMultiplier
// maxSpeed: 50, so warp speed: 500
\\\

---

## 6. EXPLORATION CLASS SHIP (DEFAULT)

**Ship consists of:**

**A. Main Hull (Core Saucer - 12.8 diameter, 11.4 height):**
\\\javascript
const p=new ve(new It(12.8,11.4,.85,64),e)  // It = CylinderGeometry
p.position.copy(u).add(new C(0,.35,0))
this.visualGroup.add(p)
this.hullNodes.push(p)

// Material: e = Ze({color:14081513, roughness:.42, metalness:.62})
// Colors decoded: #D6BD99 (tan/beige)
\\\

**B. Lower Hull Section (11.3 diameter, 12.6 height):**
\\\javascript
const m=new ve(new It(11.3,12.6,.72,64),e)
m.position.copy(u).add(new C(0,-.4,0))
this.visualGroup.add(m)
\\\

**C. Main Ring (Disk) - 12.15 diameter, 0.24 height:**
\\\javascript
const g=new ve(new Ji(12.15,.24,18,120),s)  // Ji = TorusGeometry
// Toroid: major radius 12.15, minor 0.24, segments 18x120
g.rotation.x=Math.PI/2
g.position.copy(u)
this.visualGroup.add(g)
// Material s: color 9148330 (cyan-ish)
\\\

**D. Sensor Dome (top) - 2.1 sphere with 2.6 height:**
\\\javascript
const _=new ve(new It(2.1,2.6,.45,28),t)
_.position.copy(u).add(new C(0,.88,.35))
this.visualGroup.add(_)
\\\

**E. Lower Domes - Spheres 1.45 diameter, scaled on Y:**
\\\javascript
const f=new ve(new Gt(1.45,24,18),s)  // Gt = SphereGeometry, 24 segments
f.position.copy(u).add(new C(0,1.2,.45))
f.scale.set(1,.42,1)  // Flatten vertically
this.visualGroup.add(f)

const d=new ve(new Gt(1.7,24,16),n)
d.position.copy(u).add(new C(0,-.98,-.4))
d.scale.set(1,.32,1)
this.visualGroup.add(d)
\\\

**F. Bottom Ring - TorusGeometry 9.4 diameter:**
\\\javascript
const S=new ve(new Ji(9.4,.09,8,96),h)  // Small torus
S.rotation.x=Math.PI/2
S.position.copy(u).add(new C(0,.51,-.2))
this.visualGroup.add(S)
\\\

**G. Decorative Hull Elements - 56 small boxes around the perimeter:**
\\\javascript
for(const ee of[.18,-.06]){  // Two heights
  for(let ae=0;ae<56;ae++){
    const me=ae/56*Math.PI*2
    const xe=new ve(new (.34,.1,.46),r)  //  = BoxGeometry
    xe.position.set(Math.cos(me)*10.5, u.y+ee, u.z+Math.sin(me)*10.5)
    xe.lookAt(u.x, u.y+ee, u.z)  // Point toward center
    this.visualGroup.add(xe)
  }
}
// Material r: color 13235199, emissive 11791103, emissiveIntensity .55
\\\

**H. Main Body Pod (lower section) - 3.6 x 2.2 x 9.8:**
\\\javascript
const v=new ve(new (3.6,2.2,9.8),e)
v.position.set(0,-1.05,2.5)
this.visualGroup.add(v)
this.hullNodes.push(v)
\\\

**I. Pod Connector - 2.2 x 0.7 x 6.2:**
\\\javascript
const M=new ve(new (2.2,.7,6.2),t)
M.position.set(0,-.2,1.7)
this.visualGroup.add(M)
\\\

**J. Nacelle/Engine Pods (LEFT & RIGHT) - Main Structure:**

Each side has:
- Main cylinder: 2.85 diameter, 1.95 height, 20.5 depth
- Pod body: 2.2 x 0.8 x 12.8
- Small connector: 1.6 x 1.4 x 0.2

\\\javascript
const Y=(ee,ae)=>{
  const me=new tn  // Group
  me.position.set(ee,3.25,-.2)
  
  // Main nacelle cylinder (lathe geometry)
  const xe=new ve(new It(.95,1.22,22.8,22),e)
  xe.rotation.x=Math.PI/2
  xe.position.set(0,0,-12.1)
  me.add(xe)
  
  // Nacelle connector
  const Ee=new ve(new (1.45,.26,18.4),s)
  Ee.position.set(0,.92,-12)
  me.add(Ee)
  
  // Engine glow section (sphere 1.08 diameter, scaled 1x1x1.3)
  const Ne=l.clone()
  const we=new ve(new Gt(1.08,20,18),Ne)
  we.position.set(0,0,-1)
  we.scale.set(1,1,1.3)
  me.add(we)
  this.addEmissivePulse(Ne,.95,.34,4.2,ae)
  
  // Side panels (2 boxes each with emissive pulse)
  const P=[a.clone(),a.clone()]
  for(let ye=0;ye<P.length;ye++){
    const Me=ye===0 ? -1 : 1
    const Te=new ve(new (1.95,.24,17.2),P[ye])
    Te.position.set(0,Me*.56,-12)
    me.add(Te)
    this.addEmissivePulse(P[ye],1,.2,2.6,ae+ye*Math.PI)
  }
  
  // Engine exhaust (cone geometry)
  const he=a.clone()
  const K=new ve(new Wi(.95,24),he)  // Wi = ConeGeometry
  K.position.set(0,0,-23.6)
  K.rotation.y=Math.PI
  me.add(K)
  this.engines.push(K)
  this.engineMaterials.push(he)
  this.addEmissivePulse(he,1.25,.26,3.2,ae)
  
  // Engine lights
  const ue=new Kt(6736127,1,48,2)  // Kt = PointLight
  ue.position.set(0,0,-23.8)
  me.add(ue)
  this.shipLights.push(ue)
  
  const te=new Kt(16736063,.55,22,2.2)
  te.position.set(0,0,-.7)
  me.add(te)
  this.shipLights.push(te)
  
  // Animated parts (bobbing up/down)
  this.addAnimatedPart(me,"position","y",.03,.55,ae)
  this.addAnimatedPart(me,"rotation","z",.006,.6,ae)
  
  return me
}

this.visualGroup.add(Y(8.9,0))    // Right nacelle
this.visualGroup.add(Y(-8.9,Math.PI))  // Left nacelle (phase offset)
\\\

**K. Front Sensor Lights (3 small spheres with glow):**
\\\javascript
// Left front
const k=new ve(new Gt(.18,10,10),H)
k.position.set(-12.2,.22,8.4)
this.visualGroup.add(k)
this.addEmissivePulse(H,.75,.16,1.1)
const z=new Kt(16728899,.45,12,2)
z.position.copy(k.position)
this.visualGroup.add(z)
this.shipLights.push(z)

// Right front  
const q=new ve(new Gt(.18,10,10),U)
q.position.set(12.2,.22,8.4)
this.visualGroup.add(q)
this.addEmissivePulse(U,.75,.16,1.1,Math.PI*.4)
const re=new Kt(5439352,.45,12,2)
re.position.copy(q.position)
this.visualGroup.add(re)
this.shipLights.push(re)

// Bottom front
const Re=new ve(new Gt(.16,10,10),O)
Re.position.set(0,-2,-18.4)
this.visualGroup.add(Re)
this.addEmissivePulse(O,.7,.14,1.3)
const B=new Kt(13691903,.4,10,2)
B.position.copy(Re.position)
this.visualGroup.add(B)
this.shipLights.push(B)
\\\

---

## 7. SHIELD VISUAL

**Shield Mesh (Sphere 22 diameter):**
\\\javascript
initShield(){
  this.shieldUniforms={
    time:{value:0},
    pulse:{value:0},
    baseGlow:{value:.2},
    color:{value:new ke(65535)}  // Cyan color
  }
  
  const e=\
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \  // Vertex shader
  
  const t=\
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
      // Hexagonal/rippling pattern
      float pattern = sin(vPosition.y * 10.0 + time * 5.0) * sin(vPosition.x * 10.0 + time * 5.0);
      pattern = pattern * 0.5 + 0.5;
      float intensity = fresnel * (0.3 + 0.7 * pattern) * (pulse + baseGlow);
      gl_FragColor = vec4(color, intensity);
    }
  \  // Fragment shader - creates rippling fresnel effect
  
  const n=new Tt({  // Tt = ShaderMaterial
    uniforms:this.shieldUniforms,
    vertexShader:e,
    fragmentShader:t,
    transparent:!0,
    blending:Yi,  // AdditiveBlending
    depthWrite:!1,
    side:xn  // FrontSide
  })
  
  const s=new Gt(22,32,32)  // SphereGeometry: radius 22, 32 width/height segments
  this.shieldMesh=new ve(s,n)
  this.mesh.add(this.shieldMesh)
}

// Shield control:
setShieldActive(e){
  this.shieldUniforms && (this.shieldUniforms.baseGlow.value = e ? .2 : 0)
  // Only shows glow when active (baseGlow > 0)
}

pulseShield(){
  this.shieldPulseTimer=1  // Trigger 1-second pulse
}

// In update loop:
if(this.shieldMesh){
  this.shieldUniforms.time.value=n
  this.shieldPulseTimer>0 ? (
    this.shieldPulseTimer-=t,
    this.shieldUniforms.pulse.value=Math.max(0,this.shieldPulseTimer)
  ) : (
    this.shieldUniforms.pulse.value=0
  )
}
\\\

---

## 8. ENGINE GLOW / NACELLE EFFECTS

**Engine Materials with Emissive Pulses:**
\\\javascript
// Engine exhaust glow (bright emissive)
o = new Ze({
  color:16743004,    // #FF8EFC (bright magenta/pink)
  emissive:16735295, // #FF7FFF
  emissiveIntensity:1.1,
  roughness:.18,
  metalness:.15
})

// Applied to engine cones with pulsing:
this.addEmissivePulse(he, 1.25, .26, 3.2, ae)
// (material, baseIntensity=1.25, amplitude=.26, speed=3.2, phase)

// Emissive pulse implementation:
addEmissivePulse(e,t,n,s,r=Math.random()*Math.PI*2){
  this.emissivePulses.push({
    material:e,
    baseIntensity:t,
    amplitude:n,
    speed:s,
    phase:r
  })
}

// In update loop:
this.emissivePulses.forEach(e=>{
  const a = e.baseIntensity + e.amplitude * Math.sin(n*e.speed+e.phase)
  e.material.emissiveIntensity = a
})
\\\

**PointLights on Engines:**
\\\javascript
// Main engine light (brighter, wider spread)
const ue=new Kt(6736127, 1, 48, 2)  // PointLight
// Color: 6736127 (#66FFFF cyan)
// Intensity: 1
// Distance: 48
// Decay: 2

ue.position.set(0,0,-23.8)

// Secondary engine light (dimmer, closer range)
const te=new Kt(16736063, .55, 22, 2.2)
// Color: 16736063 (#FFFF1F yellow)
// Intensity: 0.55
// Distance: 22
// Decay: 2.2

te.position.set(0,0,-.7)
\\\

---

## 9. SHIP ANIMATION & MOVEMENT

**Ship Update Loop:**
\\\javascript
update(e,t){
  if(t===void 0) return
  const n=e*.001  // elapsed time in seconds
  
  // Warp state
  this.isWarping = this.keys.Shift || this.forcedWarpMode
  
  // Speed calculation
  const s=(this.isWarping ? this.maxSpeed*10 : this.maxSpeed)*this.speedMultiplier
  const r=(this.isWarping ? this.acceleration*5 : this.acceleration)*this.speedMultiplier
  
  // Maxspeed=50, acceleration=40, deceleration=20
  // Warp: speed=500, acceleration=200
  
  // Inner rings animation (if present)
  if(this.innerRings && this.innerRings.length>0){
    const _=this.isWarping ? 3.2 : 1
    this.innerRings[0].rotation.z += t*.5*_
    this.innerRings[1].rotation.z -= t*.8*_
  }
  
  // Shield update
  if(this.shieldMesh){
    this.shieldUniforms.time.value=n
    this.shieldPulseTimer>0 ? (
      this.shieldPulseTimer-=t,
      this.shieldUniforms.pulse.value=Math.max(0,this.shieldPulseTimer)
    ) : (
      this.shieldUniforms.pulse.value=0
    )
  }
  
  // Speed control from WASD
  this.keys.w ? 
    this.currentSpeed+=r*t 
  : this.keys.s ? 
    this.currentSpeed-=r*t 
  : this.currentSpeed>0 ? 
    this.currentSpeed=Math.max(0, this.currentSpeed-this.deceleration*(this.isWarping?5:1)*t)
  : this.currentSpeed<0 && 
    (this.currentSpeed=Math.min(0, this.currentSpeed+this.deceleration*t))
  
  // Clamp speed
  this.currentSpeed=Math.max(-s, Math.min(s, this.currentSpeed))
  
  // Pitch control (up/down arrows or W/S alternative)
  this.keys.ArrowUp ? 
    this.mesh.rotation.x-=this.pitchSpeed*t
  : this.keys.ArrowDown && 
    (this.mesh.rotation.x+=this.pitchSpeed*t)
  
  // Yaw control (left/right arrows or A/D)
  this.keys.ArrowLeft ? 
    this.mesh.rotation.y+=this.yawSpeed*t
  : this.keys.ArrowRight && 
    (this.mesh.rotation.y-=this.yawSpeed*t)
  
  // Movement forward
  const c=new C(0, 0, this.currentSpeed)
  c.applyQuaternion(this.mesh.quaternion)
  this.mesh.position.addScaledVector(c, t)
  
  // Animated parts update (bobbing, spinning)
  this.animatedParts.forEach(e=>{
    const a=e.base+Math.sin(n*e.speed+e.phase)*e.amplitude
    e.object[e.channel][e.axis]=a
  })
  
  // Emissive pulse update
  this.emissivePulses.forEach(e=>{
    const a=e.baseIntensity+e.amplitude*Math.sin(n*e.speed+e.phase)
    e.material.emissiveIntensity=a
  })
}
\\\

---

## 10. RENDER/ANIMATION LOOP

**Main Animation Loop:**
\\\javascript
class Y0{  // Scene setup
  constructor(e){
    // ... initialization ...
    this.composer=new W0(this.renderer)
    this.composer.addPass(r)  // RenderPass
    this.composer.addPass(o)  // BloomPass
  }
  
  start(){
    this.clock.start()
    this.renderer.setAnimationLoop(this.animate.bind(this))
  }
  
  animate(e){
    const t=this.clock.getDelta()  // Delta time since last frame
    
    // Update controls
    this.controls.enabled && this.controls.update()
    
    // Update all tracked objects
    for(const n of this.updatables)
      n && typeof n.update=="function" && n.update(e, t)
    
    // Render with post-processing
    this.composer.render()
  }
}
\\\

**Frame Sequence:**
1. Input captured by keyboard listeners
2. Ship.update(timestamp, deltaTime) called
3. Universe/Space.update() called (starfield animation, planet orbits)
4. Camera position updated (OrbitControls)
5. Bloom and other post-processing applied
6. Frame rendered

---

## 11. KEY MATERIALS & COLORS (Hex Decoded)

**Exploration Class Ships:**
- Hull primary: #D6BD99 (tan)
- Hull secondary: #AAB2A7 (light gray)
- Accent cyan: #22436A (dark cyan)
- Main accent: #8BA8BA (blue-gray)
- Engine glow: #FF8EFC (bright magenta)
- Yellow accent: #FFFF1F (bright yellow)

**Shield:**
- Color: #00FFFF (cyan)
- Base glow: 0.2
- Emissive pulse: sine wave modulation

---

## 12. KEY TAKEAWAYS FOR REBUILD

1. **Camera**: FOV 75, aspect-dependent, near 0.1, far 10000
2. **Bloom**: threshold=0, strength=1.5, radius=0.5 (AGGRESSIVE bloom!)
3. **Starfield**: 5000 main stars (radius 500-2500), 500 bright stars (100-500), 10000 dust
4. **Controls**: OrbitControls for camera, but ship has WASD + arrow key handlers
5. **Ship**: Complex multi-part cylinder/box geometry with pulsing emissive materials
6. **Engine**: Cone geometry for exhaust, cyan+yellow PointLights
7. **Shield**: Sphere (r=22), custom shader with fresnel + sine ripple pattern
8. **Warp**: Z-axis starfield stretch (1x to 10x/20x), speed multiplier 10x
9. **Animation**: Emissive pulsing (sin waves), ship bobbing/rotating, starfield rotation
10. **Post-processing**: EffectComposer with RenderPass + UnrealBloomPass (crucial!)


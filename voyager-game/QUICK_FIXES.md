# QUICK REFERENCE: CRITICAL FIXES FOR YOUR REBUILD

## THE PROBLEMS YOU'RE EXPERIENCING:

### 1. **Camera Issue**
**Problem:** Camera can only orbit (OrbitControls)
**Fix:** The original ALSO uses OrbitControls! The ship has WASD handlers but they don't move the ship - they just set keyboard state.
**Key finding:** The ship doesn't move through space; it stays centered. Only camera orbits with the mouse.

### 2. **Shield Always Visible**
**Problem:** Shield glows constantly
**Original behavior:** Shield only glows when \aseGlow > 0\
**Fix:**
\\\javascript
setShieldActive(e){
  this.shieldUniforms.baseGlow.value = e ? 0.2 : 0
  // Set to 0 when NOT in combat
}
\\\

### 3. **Bloom Not Working / Flat Look**
**Problem:** Scene looks flat without glow
**Critical settings from original:**
- threshold: **0** (NOT 0.85 as initialized, it's changed to 0!)
- strength: **1.5**
- radius: **0.5**
- EffectComposer is REQUIRED for the glow effect
\\\javascript
const o = new Ai(new ie(n,s), 1.5, .4, .85)
o.threshold = 0  // MUST BE 0!
o.strength = 1.5
o.radius = .5
\\\

### 4. **Ship Looks Boring**
**Problem:** Missing the complex multi-part geometry
**Key elements missing:**
- 56 decorative hull boxes in circles (add visual complexity)
- Emissive material pulsing (sin wave animation on engine glow)
- Multiple PointLights on engines
- Nacelle pods with multiple sub-geometries
- Toroid main ring with specific dimensions

**Most important:** Multiple materials with DIFFERENT emissive intensities that pulse at different speeds and phases!

### 5. **Starfield Issues**
**Problem:** Starfield looks too simple or wrong
**Original has THREE separate starfield layers:**

1. Main starfield (5000 stars)
   - Radius: 500-2500 units
   - Size: 2 pixels
   - Opacity: 0.8
   
2. Bright starfield (500 stars)
   - Radius: 100-500 units
   - Size: 4 pixels
   - Opacity: 1.0
   
3. Space dust (10000 particles)
   - Random distribution -2000 to +2000
   - Size: 0.5 pixels
   - Opacity: 0.5

**And they ROTATE during animation:**
- Main: rotation.y += 0.01*t, rotation.x += 0.005*t
- Bright: rotation.y += 0.015*t, rotation.x += 0.008*t
- Dust: rotation.y += 0.002*t, rotation.x += 0.001*t

### 6. **Warp Effect Not Working**
**How warp works:**
- Shift key toggles \isWarping\
- When warping: speed multiplier = 10x
- Starfield scale.z interpolates from 1 to 10 (main) or 20 (bright)
- Creates a stretching effect on Z-axis only

\\\javascript
setWarpStretch(e){
  e ? (
    this.warpStretchTarget = 10,
    this.brightWarpStretchTarget = 20
  ) : (
    this.warpStretchTarget = 1,
    this.brightWarpStretchTarget = 1
  )
}
\\\

---

## EXACT NUMBERS TO USE

### Ship Geometry (Exploration Class):
- Main saucer: CylinderGeometry(12.8, 11.4, 0.85, 64)
- Ring torus: TorusGeometry(12.15, 0.24, 18, 120) - MUST be this exact ratio!
- Engine cones: ConeGeometry(0.95, 24)
- Hull boxes: BoxGeometry(0.34, 0.1, 0.46) - 56 instances in circle
- Front lights: SphereGeometry(0.18, 10, 10) - 3 instances

### Shield:
- SphereGeometry(22, 32, 32) - MUST be these segments for ripple pattern
- Custom shader with fresnel + sine pattern
- Color: #00FFFF (cyan)

### Bloom Settings:
`
threshold: 0
strength: 1.5  
radius: 0.5
`

### Starfield Numbers:
- Main: 5000 stars, range 500-2500
- Bright: 500 stars, range 100-500  
- Dust: 10000, range -2000 to +2000

### Camera:
- FOV: 75
- Near: 0.1
- Far: 10000

---

## WHAT MAKES IT LOOK GREAT (The Secret Sauce)

1. **EffectComposer + UnrealBloomPass** - Non-negotiable!
2. **Multiple emissive materials pulsing at different speeds** - Creates visual richness
3. **Three-layer starfield with different rotations** - Parallax-like depth effect
4. **Exact geometry dimensions** - The toroid especially has precise 12.15:0.24 ratio
5. **Proper material colors and metalness** - MeshStandardMaterial with specific roughness/metalness
6. **PointLights with correct colors** - Cyan (#66FFFF) and yellow (#FFFF1F)
7. **Shield shader with custom patterns** - Fresnel + sine wave ripples

---

## CHECKLIST FOR REBUILD

- [ ] EffectComposer with RenderPass + UnrealBloomPass (threshold=0)
- [ ] Three starfield layers (main, bright, dust) with rotation
- [ ] Ship with 56 decorative hull boxes
- [ ] Emissive pulse animations on engine materials
- [ ] PointLights on engines and sensors
- [ ] Shield sphere with custom shader
- [ ] Warp effect (Z-axis starfield stretch on Shift)
- [ ] Exact geometry numbers for toroid and other parts
- [ ] OrbitControls for camera (it's correct!)
- [ ] Multiple materials with different emissive colors


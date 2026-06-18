# STELLAR SIEGE — module contracts

A browser RTS (StarCraft-like) built with Three.js (ESM via CDN importmap,
`three@0.160.0`) and PeerJS WebRTC lockstep. Single self-contained game folder,
no build step, deployed statically to GitHub Pages.

Art direction: **sleek sci-fi** — clean Terran-style mechs & structures, PBR
(`MeshStandardMaterial`), dynamic shadows, glowing faction-colored accents.

## Coordinate system
- Ground is the XZ plane, +Y is up. Units stand on y=0 and extend upward.
- World spans `[0..WORLD_W] x [0..WORLD_H]` (see `config.js`, 128x128 world units).
- A model returned by the factories is **centered at the origin on XZ**, sits on
  the ground (its base at y=0), and "faces" **+X** (rotate via parent for heading).
- Keep every model's horizontal footprint within the radius/footprint from config.

## Files OWNED by background agents (do not touch others' files)
- `src/models.js`      — procedural unit/building/resource/projectile meshes
- `src/environment.js` — terrain, sky, lighting rig, decorative props, fog-of-war
- `src/audio.js`       — procedural WebAudio sound effects + ambient bed
- `src/vfx.js`         — particle/effect emitters (explosions, muzzle, build, etc.)

Core files (config.js, sim.js, pathfinding.js, net.js, input.js, render.js,
hud.js, main.js, index.html) are owned by the lead and must NOT be created by agents.

---

## `models.js` contract
```js
import * as THREE from 'three';
import { FACTIONS } from './config.js';

// factionColor = { primary, accent, emissive } from FACTIONS[playerId], or null for neutral.
// Returns a THREE.Group centered at origin, facing +X, base at y=0.
// Set group.userData.kind. Provide an optional group.userData.animate(t, moving) for idle/walk.
export function createUnitModel(kind, factionColor): THREE.Group   // 'worker','trooper','striker','tank'
export function createBuildingModel(kind, factionColor): THREE.Group // 'hq','depot','barracks','factory','refinery','turret'
export function createResourceModel(kind): THREE.Group              // 'minerals','gas'
export function createProjectileModel(kind): THREE.Object3D         // 'bullet','shell'
```
- Use shared geometries/materials where possible (perf: hundreds of units).
- Enable `castShadow` on main meshes; ground receives shadows (handled by environment).
- `tank` should have a separately-addressable turret child named `'turret'` so the
  renderer can rotate it: `group.getObjectByName('turret')`.
- Keep total triangle budget modest; instancing-friendly is a plus but not required.

## `environment.js` contract
```js
import * as THREE from 'three';
// Build ground plane (WORLD_W x WORLD_H), grid hint, skybox/gradient, hemi+dir light
// with shadow camera covering the map, plus scattered rocks/props (deterministic,
// accept a seed number). Returns handles the renderer needs.
export function createEnvironment(scene, THREE, seed): {
  ground: THREE.Mesh,         // receiveShadow true
  sun: THREE.DirectionalLight,
  update(t): void,            // optional subtle animation (e.g. light drift) — may be no-op
}
```
- No fog so heavy it hides units; subtle atmospheric depth is good.
- Props must not spawn on the two start areas (corners). Keep them low-poly.

## `audio.js` contract
```js
// Lazy-init WebAudio on first user gesture. All synthesis, no asset files.
export function initAudio(): void           // safe to call repeatedly
export function playSound(name, opts?): void // name: 'select','move','attack','build',
                                             // 'complete','explosion','death','error','ui'
export function startAmbient(): void
export function stopAmbient(): void
export function setMuted(m: boolean): void
```
- `playSound` must be cheap and non-blocking; ignore unknown names gracefully.

## `vfx.js` contract
```js
import * as THREE from 'three';
export function createVfx(scene, THREE): {
  muzzleFlash(pos, dir, color): void,
  impact(pos, color): void,
  explosion(pos, scale?): void,
  buildPuff(pos): void,
  spawnRing(pos, color): void,    // selection/spawn feedback
  update(dt): void,               // advance & recycle particles; called each frame
}
```
- Use pooled `Points`/sprites; never allocate per-particle per frame in `update`.
- `pos` are THREE.Vector3 in world space. Keep effects short-lived (< 1.2s).

---

## Shared sim object shape (for agents that need to know what exists)
Entities have: `{ id, kind, owner, x, z, hp, maxHp }`. Units add `vx,vz,heading`.
Players are `0` and `1`. Resources are neutral (owner = -1).

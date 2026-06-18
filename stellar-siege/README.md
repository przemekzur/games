# Stellar Siege

A StarCraft-style **real-time strategy** game that runs entirely in the browser —
fully procedural 3D (Three.js, no asset files) with genuine **1v1 online multiplayer**.

## Play

Open `index.html` from a static server (the games hub already serves it), then:

- **Host Game** — generates a 5-letter room code. Share it with your opponent.
- **Join → ROOM CODE** — connect to a host's room.
- **Practice (solo sandbox)** — play against a passive base to learn the controls.

### Controls
- **Left-drag** box-select · **Left-click** select/place · **Right-click** move / attack / gather
- **Double-click** select all units of that type on screen
- **Ctrl+1–9** set control group · **1–9** recall group
- **A** attack-move · **S** stop · **Q/E** rotate camera · **F** focus selection · mouse-wheel zoom · screen-edge / arrow keys pan
- Select a **worker (Drone)** to open the build menu; select a **structure** to train units.

### Loop
Mine **minerals** with Drones, build a **Refinery** on a **Vespene Geyser** for gas, raise
your supply cap with **Command Nexus / Supply Pylons**, train **Troopers**, **Strikers** and
**Siege Tanks** from the Barracks & War Factory, and destroy every enemy structure and unit to win.

## How the multiplayer works (no server)

GitHub Pages is static-only, so there is no game server. Instead:

- **Signaling** is handled by the free public **PeerJS** broker — just to exchange WebRTC
  connection info using the room code as the peer id.
- Once connected, the two browsers talk **peer-to-peer over WebRTC**; no traffic flows
  through any server after the handshake.
- The game uses **deterministic lockstep**: both peers run the identical simulation
  (`src/sim.js`) seeded from the same number, and only exchange compact *command* packets
  (move/attack/build/train) each turn — never game state. A rolling checksum detects desync.

This is the same netcode model real RTS games use, and it needs zero backend infrastructure.

## Architecture

| File | Responsibility |
|---|---|
| `src/config.js` | Balance & data schema (units, buildings, costs, map) |
| `src/sim.js` | Deterministic simulation — economy, production, movement, combat, win |
| `src/pathfinding.js` | Grid A* + steering |
| `src/rng.js` | Seeded deterministic RNG (lockstep-safe) |
| `src/net.js` | PeerJS WebRTC transport + lockstep turn scheduler |
| `src/models.js` | Procedural 3D unit/building/resource meshes |
| `src/environment.js` | Terrain, sky, lighting rig, props, shadows |
| `src/vfx.js` | Pooled particle effects (explosions, muzzle flashes, rings) |
| `src/audio.js` | Procedural WebAudio SFX + ambient bed |
| `src/render.js` | Three.js scene, RTS camera, entity views, fog of war |
| `src/hud.js` | DOM HUD — resources, command card, minimap, selection |
| `src/input.js` | Selection, orders, placement, control groups, hotkeys |
| `src/main.js` | Lobby flow + lockstep game loop |

The simulation is fully decoupled from rendering, which is what makes deterministic
lockstep possible.

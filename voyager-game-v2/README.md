# Star Trek Voyager — Journey Home (Definitive Edition / v2)

A major upgrade of `voyager-game`, kept in its own folder so the original stays playable.

## Running

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

Saves use the `voyager-v2-save` localStorage key, so v1 and v2 saves never clash.

## What's new vs v1

### Story (`src/story/StoryEngine.js`)
- **10 chapters** instead of 7: new chapters *The Phage* (Vidiian space), *The Void*
  (morale survival arc), and a split of the finale into *Unimatrix Zero* + *Endgame*.
- **Persistent story flags**: dialog choices set flags (`flagMaquisTrust`,
  `flagSevenAboard`, `flagParisAce`, …) stored in game state and saved.
- **Branching dialog**: `dialogSequence` can be a *function of game state*, so
  later chapters react to earlier choices (e.g. Torres' attitude in Chapter 2
  depends on whether you made her chief engineer in Chapter 1; the Borg Queen's
  Endgame offer changes if Seven is aboard).
- **Conditional choices**: a choice may carry `when: (state) => bool`.
- New speakers and scenes: Seska hail, Vidiian surgeon, Annorax, the Borg Queen,
  Admiral Janeway, Night Aliens.

### Dynamics (`src/game/CombatSystem.js`, `src/game/EventSystem.js`)
- **Per-faction movement patterns**: attack runs (Kazon/Hirogen dive-and-peel),
  relentless head-on advance (Borg), fast strafing weave (8472/Swarm), classic orbit.
- **Speed-based evasion**: flying fast reduces enemy accuracy by up to 25% —
  piloting now matters during combat.
- **Critical hits** (scaling with sensor upgrades) and **Borg adaptation**
  (phasers lose effectiveness after 4 hits — switch to torpedoes).
- **Transphasic torpedoes**: after the Admiral Janeway scene, torpedoes hit 60% harder.
- **Escort wings**: Swarm vessels and Kazon Predators arrive with orbiting escort drones.
- **Interactive random events**: derelict salvage, distress calls (genuine or
  ambush), and a wandering trader — presented as choice dialogs, not just log lines.
- Visible weapon misses, staged multi-explosion kills with debris, plasma venting
  on heavily damaged enemies.

### Models (`src/game/EnemyShipModels.js`)
Every faction now has a unique model (v1 reused the Kazon raider for 5 factions):
- Kazon Predator carrier, Vidiian organic/mechanical graft cruiser, Devore
  arrowhead interceptor, Malon waste freighter with toxic-glow tanks, crystalline
  Swarm darts, Borg **Sphere** for probes, densely greebled Borg Cube,
  lathe-built Species 8472 bioship, double-ringed Krenim timeship.
- Models expose animatable parts via `userData` (pulsers, spinners, thrusters)
  that CombatSystem animates every frame.

### Animations (`src/game/Ship.js`)
- **Variable-geometry warp pylons** — the nacelles rotate up into warp position
  when you engage warp and settle back at impulse (the iconic Intrepid-class move).
- Spinning bussard collector swirl blades, RCS thruster puffs that flare on the
  correct side while turning, breathing deflector glow, extra window decks,
  dorsal phaser strip.
- Enemy thruster flames stretch with actual movement speed; Borg cubes rotate
  slowly instead of tracking; hit-flash on enemy glow parts.

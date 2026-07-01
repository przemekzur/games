# Red Frontier Remaining Roadmap

This roadmap is intentionally bounded. It is not the whole universe. It finishes the Earth to Mars campaign spine to a playable, understandable state.

## Design north star

Red Frontier is a story of humanity learning how to leave Earth without losing itself.

The playable spine should feel like:

1. Earth restores Cape Helios.
2. Earth validates robotic construction.
3. Earth chooses a limited cargo manifest.
4. Mars receives exactly what Earth sent.
5. Each cargo kit creates a concrete early-Mars consequence.
6. The player can understand the consequences on the hub, Earth recap, and Mars intro.

## Remaining tasks

### V6 — Mars Drone Pattern Prototype

Make `constructionDronePattern` tangible.

- Activate Drone Pattern Core on Mars.
- Wake one helper drone.
- Run one tiny job: stabilise cargo pad.
- Leave a visible result.
- No robot economy yet.

Task file: `agent-tasks/tasks/06-drone-pattern-prototype.md`

### V7 — Water Survey Field Marker

Make `waterSurvey` tangible.

- Survey marker points to a shallow ice seam.
- The first water/extractor action receives a clear hint or one-time benefit.
- If Water Survey Kit was omitted, no marker and no benefit.

Task file: `agent-tasks/tasks/07-water-survey-field-marker.md`

### V8 — Power Kit Stabilisation

Make `powerKit` tangible.

- Power Kit crate/battery gives a visible early stability effect.
- Keep it small: one-time reserve, emergency pulse, or first power structure support.
- If Power Kit was omitted, no benefit.

Task file: `agent-tasks/tasks/08-power-kit-stabilisation.md`

### V9 — Campaign Spine QA + Balance Pass

Stop adding systems and make the spine reliable.

- Verify all 4 choose-3 manifest combinations.
- Verify old all-kit payloads.
- Verify standalone Mars.
- Tighten copy and one-time flags.
- Fix bugs only.

Task file: `agent-tasks/tasks/09-spine-qa-balance.md`

### V10 — Player-Facing Completion Pass

Make the campaign feel complete enough to show.

- Hub status/continue/reset affordances.
- Earth completion recap clarity.
- Mars intro clarity.
- End-of-spine note after first crew/habitat milestone.
- No new simulation systems.

Task file: `agent-tasks/tasks/10-completion-polish.md`

## Hard stop after V10

After V10, do not add Moon, asteroids, factions, warp, or large new systems.

At that point the next step is a human playtest:

- fresh browser,
- complete Earth,
- choose different cargo manifests,
- start Mars,
- verify the first 10 minutes feel coherent.

Only after that should bigger arcs be planned.

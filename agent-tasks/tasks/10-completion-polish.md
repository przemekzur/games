# Task 10 — Player-Facing Completion Pass

## Use after

Use after Task 09 is implemented.

## Goal

Make the current Earth to Mars campaign spine feel complete enough to show.

Player feeling:

> I can play Earth, choose cargo, start Mars, see my consequences, and understand what to do next.

## Target files

Likely changed:

- `index.html`
- `red-frontier-earth/index.html`
- `mars-colony/index.html`

No new systems.

## Scope

### 1. Hub clarity

Improve player-facing flow if needed:

- Part I: The Long Launch.
- Part II: Mars Colony.
- Show cargo status if Earth complete.
- Optional simple reset/replay hint if safe.

Do not build a complex launcher.

### 2. Earth completion clarity

Earth completion should clearly communicate:

- cargo authorised,
- selected kits,
- omitted kit,
- Mars will remember this in same browser.

### 3. Mars opening clarity

Mars opening should clearly communicate:

- detected Earth payload if present,
- received kits only,
- omitted kit if relevant,
- standalone mode if no payload.

### 4. Early Mars flow clarity

Make the first 10 minutes readable:

- kit markers are visible enough,
- interactable markers give feedback,
- first Habitat shell behavior is understandable,
- drone pattern job is understandable,
- water/power effects are understandable.

### 5. End-of-spine note

After the first crew/habitat milestone, add a small campaign-spine note if safe:

`Earth prepared the landing. Mars made it useful. Red Frontier continues.`

This must not block gameplay or alter mission logic.

## Hard no

Do not add:

- new cargo kits,
- new maps,
- Moon,
- asteroids,
- factions,
- warp,
- robot economy,
- autonomy,
- dialogue trees,
- external assets,
- build step.

## Acceptance criteria

- Fresh player can understand intended order from hub.
- Earth completion explains cargo selection.
- Mars intro explains received cargo.
- Kit markers and interactions are understandable.
- No duplicate one-time effects after reload.
- Mars standalone remains playable.
- No console errors.

## Final recommendation

After this task, stop adding features and do a human playtest before planning the next arc.

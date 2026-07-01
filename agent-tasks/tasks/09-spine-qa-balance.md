# Task 09 — Campaign Spine QA + Balance Pass

## Use after

Use after Tasks 06, 07, and 08 are implemented or explicitly skipped.

## Goal

Stop adding systems and make the Earth to Mars spine reliable.

Player feeling:

> The campaign works from a fresh browser, remembers my choices, and does not break when I reload.

## Target files

Likely changed:

- `red-frontier-earth/index.html`
- `mars-colony/index.html`
- `index.html`

Do not touch `shared/red-frontier-missions.js` unless a bug is directly caused by shared mission state.

## Required QA matrix

Test all choose-3 manifests:

1. Power + Water + Habitat; Drone omitted.
2. Power + Water + Drone; Habitat omitted.
3. Power + Habitat + Drone; Water omitted.
4. Water + Habitat + Drone; Power omitted.

Also test:

5. old all-true payload,
6. Mars standalone with no Earth payload,
7. reload after each one-time effect,
8. old Mars save with no `campaign` field if practical.

## Balance goals

Keep cargo useful but not overpowering.

Guidance:

- Total early bonuses should feel helpful, not game-ending.
- Omitted kits should mean absence of benefit, not punishment.
- Habitat Shell should not leak beyond first Habitat.
- Drone helper reward should not be large.
- Water and Power benefits should remain small and clear.

## Copy goals

Tighten copy only where it helps clarity.

- Earth manifest should make each kit consequence understandable.
- Hub should summarize selected and omitted kits without clutter.
- Mars intro/receipt should list only received kits.
- ORION should stay dry, useful, and short.

## Bug-fix-only rule

This task is not for new features.

Allowed:

- bug fixes,
- balance tuning,
- copy clarity,
- save/reload safety,
- duplicate-effect fixes,
- UI readability fixes.

Not allowed:

- new cargo kits,
- new Mars objectives,
- Mars robot economy,
- autonomy,
- factions,
- Moon,
- asteroids,
- external assets,
- build step.

## Acceptance criteria

- All four choose-3 cargo combinations behave correctly.
- Each selected kit creates its effect.
- Each omitted kit is absent.
- Save/reload does not duplicate one-time effects.
- Earth still completes.
- Hub still launches both games.
- Mars standalone remains unchanged.
- No console errors.

## PR notes

The PR body should include the tested matrix and any balance numbers changed.

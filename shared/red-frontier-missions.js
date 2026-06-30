/**
 * Red Frontier — shared mission-chain engine.
 *
 * Small, DOM-agnostic helpers for a linear, data-driven mission chain, shared by
 * both Red Frontier episodes: the Earth prequel (`red-frontier-earth/`) and the
 * Mars colony campaign (`mars-colony/`). The goal is to make future missions easy
 * to author as *data* (an array of mission objects) instead of bespoke per-file
 * control flow — without changing gameplay.
 *
 * A mission is a plain object:
 *   {
 *     id:    'wake-orion',
 *     title: 'Wake ORION',
 *     hint:  'Reach the ORION terminal and bring the dormant AI online.', // optional
 *     done:  ctx => ctx.flags.orionAwake,   // required predicate
 *     reward:   ctx => { ... },             // optional side-effect on completion
 *     onComplete: ctx => { ... },           // optional side-effect on completion (ORION line, etc.)
 *     // ...any extra game-specific fields (the engine ignores them)
 *   }
 *
 * State is the minimal thing a game persists:  { idx }  — the index of the current
 * (first not-yet-complete) mission. `ctx` is whatever the game passes through to the
 * predicates/callbacks (typically its own game-state object).
 *
 * The engine deliberately knows nothing about the DOM, resources, or how a game
 * defines "done" — it only sequences a chain and fires hooks.
 */

export function createMissionState(){ return { idx: 0 }; }

export function getCurrentMission(missions, state){
  return (state && state.idx < missions.length) ? missions[state.idx] : null;
}

export function isComplete(missions, state){
  return !state || state.idx >= missions.length;
}

function safe(fn, ctx){
  try { return !!(fn && fn(ctx)); }
  catch(e){ console.warn('[rf-missions] predicate error:', e); return false; }
}

/**
 * Live progression. Advances past every mission whose `done(ctx)` is true, in order,
 * running each mission's optional `reward(ctx)` / `onComplete(ctx)` and the callback hooks:
 *   cb.onComplete(mission, index, ctx) — once per mission completed
 *   cb.onAdvance(state, ctx)           — once, if anything advanced this call
 *   cb.onAllComplete(ctx)              — once, when the final mission completes
 * Returns the number of missions advanced.
 */
export function advanceCompletedMissions(missions, state, ctx, cb = {}){
  let advanced = 0;
  while(state.idx < missions.length && safe(missions[state.idx].done, ctx)){
    const m = missions[state.idx];
    if(typeof m.reward === 'function') m.reward(ctx);
    if(typeof m.onComplete === 'function') m.onComplete(ctx);
    if(cb.onComplete) cb.onComplete(m, state.idx, ctx);
    state.idx++; advanced++;
    if(state.idx >= missions.length && cb.onAllComplete) cb.onAllComplete(ctx);
  }
  if(advanced && cb.onAdvance) cb.onAdvance(state, ctx);
  return advanced;
}

/**
 * Silent reconcile for loaded games: advance the index past already-satisfied missions
 * WITHOUT firing rewards, ORION lines, or callbacks (so loading a colony mid-chain shows
 * correct progress with no message spam). Returns the number advanced.
 */
export function reconcileMissionState(missions, state, ctx){
  let advanced = 0;
  while(state.idx < missions.length && safe(missions[state.idx].done, ctx)){ state.idx++; advanced++; }
  return advanced;
}

/**
 * DOM-agnostic view model for a mission list. Returns one row per mission:
 *   { id, title, hint, index, status: 'done' | 'active' | 'todo' }
 * Each episode renders these with its own markup/classes.
 */
export function missionRows(missions, state){
  const idx = state ? state.idx : 0;
  return missions.map((m, i) => ({
    id: m.id, title: m.title, hint: m.hint, index: i,
    status: i < idx ? 'done' : (i === idx ? 'active' : 'todo'),
  }));
}

/**
 * Fire-once "story beat" helper (used for the Mars milestone ORION lines).
 *   beats: [{ id, when(ctx) -> bool, ...payload }]
 *   seen:  a flag object that is mutated as beats fire (persist this with the save)
 *   onFire(beat, ctx): runs the first time a beat's when() becomes true
 * Pass fire=false to seed flags silently (e.g. on load) without running onFire.
 */
export function fireStoryBeats(beats, seen, ctx, onFire, fire = true){
  for(const b of beats){
    if(!seen[b.id] && safe(b.when, ctx)){
      seen[b.id] = true;
      if(fire && onFire) onFire(b, ctx);
    }
  }
}

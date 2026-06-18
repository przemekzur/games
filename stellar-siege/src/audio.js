// audio.js — Stellar Siege procedural WebAudio.
// All synthesis, no external asset files. Lazy-inited on first user gesture.
//
// Contract:
//   initAudio()               — lazy-create one AudioContext; safe to call repeatedly.
//   playSound(name, opts?)    — synth+play a short sfx; ignores unknown names.
//   startAmbient()/stopAmbient() — looping, evolving, MELODIC sci-fi music bed.
//   setMuted(m)               — master gain ~0 / normal (click-free ramp).
//
// Optional extras (callers feature-detect these):
//   setMusicVolume(v) / setSfxVolume(v) — separate submix levels (0..1).
//   isMuted()                 — boolean.
//
// Mix topology:
//   sfx sources  -> sfxBus  -> master -> destination
//   music nodes  -> musicBus -> master -> destination
//
// Audio is presentation-only and NOT part of the deterministic sim, so
// Math.random and ctx.currentTime scheduling are fine here.

// ---------------------------------------------------------------------------
// Module state (no AudioContext created at load — only inside initAudio()).
// ---------------------------------------------------------------------------
let ctx = null;          // AudioContext
let master = null;       // master GainNode -> destination
let sfxBus = null;       // sfx submix -> master
let musicBus = null;     // music submix -> master
let muted = false;
let masterLevel = 0.7;   // "normal" master level when un-muted
let sfxLevel = 1.0;      // sfx submix level (0..1)
let musicLevel = 0.35;   // music submix level (0..1) — sits under gameplay
let noiseBuffer = null;  // shared white-noise buffer

// Ambient/music bed state.
let ambient = null;      // running music engine handle, or null when stopped

// ---------------------------------------------------------------------------
// Init / master controls
// ---------------------------------------------------------------------------
export function initAudio() {
  if (ctx) return; // already inited — no-op
  const AC = (typeof window !== 'undefined') &&
    (window.AudioContext || window.webkitAudioContext);
  if (!AC) return; // no WebAudio support — degrade silently
  try {
    ctx = new AC();
  } catch (e) {
    ctx = null;
    return;
  }

  master = ctx.createGain();
  master.gain.value = muted ? 0.0001 : masterLevel;
  master.connect(ctx.destination);

  // Dedicated sfx submix.
  sfxBus = ctx.createGain();
  sfxBus.gain.value = sfxLevel;
  sfxBus.connect(master);

  // Dedicated music submix (kept low so music sits under gameplay).
  musicBus = ctx.createGain();
  musicBus.gain.value = musicLevel;
  musicBus.connect(master);

  noiseBuffer = makeNoiseBuffer(1.0);
}

export function setMuted(m) {
  muted = !!m;
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  const target = muted ? 0.0001 : masterLevel;
  // Ramp to avoid clicks; exponential needs a non-zero floor.
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
  master.gain.exponentialRampToValueAtTime(Math.max(target, 0.0001), now + 0.05);
  if (!muted) master.gain.setValueAtTime(masterLevel, now + 0.06);
}

export function isMuted() {
  return muted;
}

// Optional: independent submix controls (0..1). Smooth, click-free ramps.
export function setMusicVolume(v) {
  musicLevel = clamp(typeof v === 'number' ? v : musicLevel, 0, 1);
  if (!ctx || !musicBus) return;
  const now = ctx.currentTime;
  musicBus.gain.cancelScheduledValues(now);
  musicBus.gain.setValueAtTime(Math.max(musicBus.gain.value, 0.0001), now);
  musicBus.gain.linearRampToValueAtTime(Math.max(musicLevel, 0.0001), now + 0.3);
}

export function setSfxVolume(v) {
  sfxLevel = clamp(typeof v === 'number' ? v : sfxLevel, 0, 1);
  if (!ctx || !sfxBus) return;
  const now = ctx.currentTime;
  sfxBus.gain.cancelScheduledValues(now);
  sfxBus.gain.setValueAtTime(Math.max(sfxBus.gain.value, 0.0001), now);
  sfxBus.gain.linearRampToValueAtTime(Math.max(sfxLevel, 0.0001), now + 0.1);
}

// Some browsers start the context "suspended" until a gesture resumes it.
function ensureRunning() {
  if (ctx && ctx.state === 'suspended') {
    // Fire and forget — caller is expected to be inside a user gesture.
    ctx.resume().catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------
function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }

// One second of mono white noise, reused as a looping/oneshot source buffer.
function makeNoiseBuffer(seconds) {
  const len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

// MIDI note number -> frequency (A4=69=440Hz).
function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }

// A single oscillator with a percussive gain envelope, routed to `dest`.
// freq may be a number, or [from, to] for a pitch sweep over the sound.
function tone({
  freq = 440,
  type = 'sine',
  dur = 0.15,
  attack = 0.005,
  gain = 0.3,
  detune = 0,
  dest = sfxBus,
  delay = 0,
  glideType = 'exp', // 'exp' | 'lin' for the pitch sweep
} = {}) {
  if (!ctx) return null;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.detune.value = detune;

  if (Array.isArray(freq)) {
    const [f0, f1] = freq;
    osc.frequency.setValueAtTime(Math.max(1, f0), t0);
    if (glideType === 'lin') {
      osc.frequency.linearRampToValueAtTime(Math.max(1, f1), t0 + dur);
    } else {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur);
    }
  } else {
    osc.frequency.setValueAtTime(Math.max(1, freq), t0);
  }

  // Envelope: ramp up from a tiny floor (never hard-set to/from 0), then decay.
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(g);
  g.connect(dest);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
  return { osc, gain: g };
}

// A burst of filtered white noise, routed to `dest`.
function noiseBurst({
  dur = 0.2,
  gain = 0.3,
  attack = 0.002,
  type = 'lowpass',
  freq = 2000,
  freqTo = null,   // sweep cutoff if set
  q = 0.7,
  dest = sfxBus,
  delay = 0,
} = {}) {
  if (!ctx || !noiseBuffer) return null;
  const t0 = ctx.currentTime + delay;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  src.loop = true;

  const filt = ctx.createBiquadFilter();
  filt.type = type;
  filt.Q.value = q;
  filt.frequency.setValueAtTime(Math.max(20, freq), t0);
  if (freqTo != null) {
    filt.frequency.exponentialRampToValueAtTime(Math.max(20, freqTo), t0 + dur);
  }

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  // Start at a random offset so repeated bursts don't sound identical.
  const offset = Math.random() * 0.5;
  src.connect(filt);
  filt.connect(g);
  g.connect(dest);
  src.start(t0, offset);
  src.stop(t0 + dur + 0.02);
  return { src, filter: filt, gain: g };
}

// ---------------------------------------------------------------------------
// Sound definitions — snappy, modern, click-free. All route through sfxBus.
// ---------------------------------------------------------------------------
const SOUNDS = {
  // Bright short blip — high triangle + sine shimmer, fast decay.
  select(v) {
    tone({ type: 'triangle', freq: 1320, dur: 0.08, gain: 0.26 * v, attack: 0.002 });
    tone({ type: 'sine', freq: 1980, dur: 0.05, gain: 0.09 * v, attack: 0.001, delay: 0.005 });
  },

  // Soft confirming chirp — gentle upward lift, rounded.
  move(v) {
    tone({ type: 'sine', freq: [640, 880], dur: 0.13, gain: 0.22 * v, attack: 0.006, glideType: 'exp' });
    tone({ type: 'triangle', freq: 1100, dur: 0.06, gain: 0.06 * v, attack: 0.002, delay: 0.02 });
  },

  // Punchy laser/pew — saw with fast downward pitch sweep + click transient.
  attack(v) {
    tone({ type: 'sawtooth', freq: [1500, 260], dur: 0.15, gain: 0.22 * v, attack: 0.001 });
    tone({ type: 'square', freq: [820, 180], dur: 0.09, gain: 0.10 * v, attack: 0.001 });
    noiseBurst({ dur: 0.04, gain: 0.06 * v, type: 'highpass', freq: 2000 });
  },

  // Mechanical confirm — low servo thud + bandpassed clamp click.
  build(v) {
    tone({ type: 'square', freq: [210, 150], dur: 0.13, gain: 0.16 * v, attack: 0.003, glideType: 'lin' });
    noiseBurst({ dur: 0.09, gain: 0.15 * v, type: 'bandpass', freq: 1300, q: 1.4 });
    tone({ type: 'sine', freq: 88, dur: 0.12, gain: 0.16 * v, attack: 0.004 });
  },

  // Pleasant rising 3-note motif (C5 - E5 - G5) — construction finished.
  complete(v) {
    tone({ type: 'triangle', freq: 523.25, dur: 0.16, gain: 0.20 * v, attack: 0.004 });               // C5
    tone({ type: 'triangle', freq: 659.25, dur: 0.18, gain: 0.20 * v, attack: 0.004, delay: 0.09 });  // E5
    tone({ type: 'triangle', freq: 783.99, dur: 0.28, gain: 0.22 * v, attack: 0.004, delay: 0.18 });  // G5
    tone({ type: 'sine', freq: 1567.98, dur: 0.22, gain: 0.07 * v, attack: 0.004, delay: 0.18 });     // shimmer
  },

  // Filtered noise boom — lowpass cutoff sweep down + dual sine sub drop.
  explosion(v) {
    noiseBurst({ dur: 0.6, gain: 0.38 * v, type: 'lowpass', freq: 3200, freqTo: 110, q: 0.9, attack: 0.004 });
    tone({ type: 'sine', freq: [150, 38], dur: 0.5, gain: 0.42 * v, attack: 0.006 });
    tone({ type: 'sine', freq: [75, 28], dur: 0.55, gain: 0.30 * v, attack: 0.008 });
  },

  // Short descending tone — unit destroyed.
  death(v) {
    tone({ type: 'sawtooth', freq: [430, 70], dur: 0.42, gain: 0.20 * v, attack: 0.004, glideType: 'lin' });
    tone({ type: 'square', freq: [320, 55], dur: 0.38, gain: 0.09 * v, attack: 0.004, glideType: 'lin' });
    noiseBurst({ dur: 0.32, gain: 0.10 * v, type: 'lowpass', freq: 1400, freqTo: 200 });
  },

  // Soft low "denied" buzz — gently detuned squares through an implied lowness,
  // short and rounded so it reads as a warning, not an abrasive klaxon.
  error(v) {
    tone({ type: 'triangle', freq: 196, dur: 0.16, gain: 0.18 * v, attack: 0.004, detune: -14 });
    tone({ type: 'triangle', freq: 196, dur: 0.16, gain: 0.18 * v, attack: 0.004, detune: +14 });
    tone({ type: 'sine', freq: 98, dur: 0.18, gain: 0.10 * v, attack: 0.006 });
  },

  // Tiny tick — hover/menu.
  ui(v) {
    tone({ type: 'sine', freq: 2300, dur: 0.025, gain: 0.09 * v, attack: 0.001 });
  },
};

// ---------------------------------------------------------------------------
// playSound
// ---------------------------------------------------------------------------
export function playSound(name, opts) {
  if (!ctx) return;            // not inited — silent (caller should initAudio first)
  if (muted) return;           // skip synthesis entirely while muted
  const fn = SOUNDS[name];
  if (!fn) return;             // unknown name — ignore gracefully
  ensureRunning();
  const v = (opts && typeof opts.volume === 'number') ? clamp(opts.volume, 0, 2) : 1;
  try {
    fn(v);                     // polyphonic: each call spins up fresh nodes
  } catch (e) {
    // Never let an audio glitch break the game loop.
  }
}

// ===========================================================================
// MUSIC BED — calm, melodic, evolving sci-fi strategy music.
//
// Design:
//   * Slow 4-chord progression in A dorian-ish minor: Am - F - C - G  (i-VI-III-VII),
//     each chord held ~8s and crossfaded into the next via per-chord pad voices.
//   * Each chord = a few detuned saw/triangle voices through a shared lowpass with
//     a slow filter "bloom" so chords swell in (consonant, soft, no beating).
//   * A warm sub voice tracks the chord root for low-end body.
//   * A sparse bell/sine pluck layer plays notes from the current chord's scale at
//     a relaxed ~80 BPM feel, fed into a feedback delay for cheap reverb/space.
//   * A very quiet rhythmic pulse adds subtle motion without being busy.
//   * A look-ahead scheduler (setInterval ~25ms) schedules notes ahead on the
//     audio clock for smooth, glitch-free timing.
// ===========================================================================

// Chord progression as semitone offsets (relative to A2 root = MIDI 45), plus a
// scale (A dorian: A B C D E F# G) used by the melody layer for that chord.
const A2 = 45; // MIDI
// Each chord: root offset from A2, and the chord tones (offsets) for the pad.
const PROGRESSION = [
  { root: 0,  pad: [0, 7, 12, 15, 19] },   // Am  (A C E ...) — i
  { root: -4, pad: [0, 7, 12, 16, 19] },   // F   (F A C ...) — VI  (root = F2)
  { root: 3,  pad: [0, 7, 12, 16, 19] },   // C   (C E G ...) — III
  { root: -2, pad: [0, 7, 12, 16, 19] },   // G   (G B D ...) — VII
];
// A-dorian scale degrees (semitones from A) for the melody/arpeggio layer.
const DORIAN = [0, 2, 3, 5, 7, 9, 10, 12, 14, 15];

export function startAmbient() {
  if (!ctx) return;
  if (ambient) return; // already running
  ensureRunning();
  const now = ctx.currentTime;

  // --- Music bed master with a gentle 3s fade-in. ---
  const bed = ctx.createGain();
  bed.gain.setValueAtTime(0.0001, now);
  bed.gain.exponentialRampToValueAtTime(1.0, now + 3.0);
  bed.connect(musicBus);

  // --- Shared "space": feedback delay used as cheap reverb for melody/bells. ---
  const delay = ctx.createDelay(1.5);
  delay.delayTime.value = 0.42;
  const fb = ctx.createGain();
  fb.gain.value = 0.42;
  const wet = ctx.createGain();
  wet.gain.value = 0.5;
  // Tame the delay tail so repeats stay soft and dark.
  const wetLp = ctx.createBiquadFilter();
  wetLp.type = 'lowpass';
  wetLp.frequency.value = 2400;
  delay.connect(fb);
  fb.connect(delay);
  delay.connect(wetLp);
  wetLp.connect(wet);
  wet.connect(bed);

  // --- Pad bus: chord voices route here, then to the bed. ---
  const padBus = ctx.createGain();
  padBus.gain.value = 0.5;
  padBus.connect(bed);

  // --- Sub/pad warmth bus. ---
  const subBus = ctx.createGain();
  subBus.gain.value = 0.32;
  subBus.connect(bed);

  // --- Melody/bell bus (dry + into the delay for space). ---
  const melBus = ctx.createGain();
  melBus.gain.value = 0.42;
  melBus.connect(bed);
  melBus.connect(delay);

  // --- Quiet rhythmic pulse bus. ---
  const pulseBus = ctx.createGain();
  pulseBus.gain.value = 0.12;
  pulseBus.connect(bed);

  // Tempo for the melody/pulse feel (~80 BPM => 0.75s per beat).
  const beat = 0.75;
  const chordBeats = 12;            // ~9s per chord
  const chordDur = beat * chordBeats;

  // Scheduler bookkeeping.
  let chordIndex = 0;               // index into PROGRESSION
  let nextChordTime = now + 0.05;   // when to trigger the next chord
  let nextNoteTime = now + 0.05;    // when to schedule the next melody slot
  let beatCount = 0;                // melody slot counter
  const SCHEDULE_AHEAD = 0.4;       // seconds of look-ahead
  let running = true;

  // Track live oscillators only for clean shutdown; pad/melody voices are
  // short-lived and stop themselves, so we just need the persistent ones.
  const persistent = [];            // {osc} that run until stop()

  // ---- A held pad chord that blooms in and fades out (crossfade). ----
  function playChord(chord, t0, holdDur) {
    const root = A2 + chord.root;

    // Per-chord lowpass that "blooms" the chord in.
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 0.6;
    lp.frequency.setValueAtTime(320, t0);
    lp.frequency.linearRampToValueAtTime(1600, t0 + holdDur * 0.45);
    lp.frequency.linearRampToValueAtTime(900, t0 + holdDur);
    lp.connect(padBus);

    // Crossfade envelope for the whole chord (fade in ~2.5s, hold, fade out ~3s).
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, t0);
    cg.gain.exponentialRampToValueAtTime(0.5, t0 + 2.5);
    cg.gain.setValueAtTime(0.5, t0 + holdDur - 3.0);
    cg.gain.exponentialRampToValueAtTime(0.0001, t0 + holdDur + 0.5);
    cg.connect(lp);

    const stopAt = t0 + holdDur + 0.7;

    // A few detuned voices per chord tone — soft saw/triangle blend.
    chord.pad.forEach((semi, vi) => {
      const f = mtof(root + semi);
      // Two slightly detuned oscillators per tone for a wide, beat-free pad.
      [-5, 5].forEach((cents, k) => {
        const o = ctx.createOscillator();
        o.type = (vi % 2 === 0) ? 'sawtooth' : 'triangle';
        o.frequency.value = f;
        o.detune.value = cents + (Math.random() * 4 - 2);
        const vg = ctx.createGain();
        // Higher voices quieter — keeps it warm, not shrill.
        vg.gain.value = (0.10 / (1 + vi * 0.5)) * (k === 0 ? 1 : 0.8);
        o.connect(vg);
        vg.connect(cg);
        o.start(t0);
        o.stop(stopAt);
      });
    });

    // Warm sub voice on the chord root (one octave down), soft sine.
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = mtof(root - 12);
    const subg = ctx.createGain();
    subg.gain.setValueAtTime(0.0001, t0);
    subg.gain.exponentialRampToValueAtTime(0.5, t0 + 2.0);
    subg.gain.setValueAtTime(0.5, t0 + holdDur - 2.5);
    subg.gain.exponentialRampToValueAtTime(0.0001, t0 + holdDur + 0.4);
    sub.connect(subg);
    subg.connect(subBus);
    sub.start(t0);
    sub.stop(stopAt);
  }

  // ---- A soft bell/pluck melody note (sine + slight harmonic), into space. ----
  function playBell(midi, t0, vel) {
    const f = mtof(midi);
    // Fundamental sine pluck.
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = ctx.createGain();
    const peak = 0.16 * vel;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6);
    o.connect(g);
    g.connect(melBus);
    o.start(t0);
    o.stop(t0 + 1.7);

    // A quiet octave-up triangle gives it a bell-like sparkle.
    const o2 = ctx.createOscillator();
    o2.type = 'triangle';
    o2.frequency.value = f * 2;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t0);
    g2.gain.exponentialRampToValueAtTime(peak * 0.35, t0 + 0.01);
    g2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
    o2.connect(g2);
    g2.connect(melBus);
    o2.start(t0);
    o2.stop(t0 + 1.0);
  }

  // ---- A very quiet, soft rhythmic pulse (filtered sine blip). ----
  function playPulse(t0) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = mtof(A2 + PROGRESSION[chordIndex].root - 12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(0.5, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
    o.connect(g);
    g.connect(pulseBus);
    o.start(t0);
    o.stop(t0 + 0.2);
  }

  // ---- Look-ahead scheduler: chords + sparse melody + pulse. ----
  function pickMelodyMidi() {
    const chord = PROGRESSION[chordIndex];
    const root = A2 + chord.root;
    // Choose a scale degree, biased to the upper-mid register so it sings over the pad.
    const deg = DORIAN[Math.floor(Math.random() * DORIAN.length)];
    const octave = 12 * (1 + (Math.random() < 0.35 ? 1 : 0)); // mostly +1 oct, sometimes +2
    return root + deg + octave;
  }

  function schedule() {
    if (!running || !ctx) return;
    const lookTo = ctx.currentTime + SCHEDULE_AHEAD;

    // Chord changes.
    while (nextChordTime < lookTo) {
      playChord(PROGRESSION[chordIndex], nextChordTime, chordDur);
      chordIndex = (chordIndex + 1) % PROGRESSION.length;
      nextChordTime += chordDur;
    }

    // Melody + pulse on the beat grid (sparse — leave space).
    while (nextNoteTime < lookTo) {
      // Make sure chordIndex reflects the chord active at nextNoteTime.
      // (Chords advance every chordDur; melody just reads current chordIndex,
      // which is close enough for harmony and keeps it simple/cheap.)

      // Quiet pulse on every other beat (subtle motion, low volume).
      if (beatCount % 2 === 0) playPulse(nextNoteTime);

      // Sparse melody: ~40% chance per beat, never two long runs — leaves space.
      if (Math.random() < 0.4) {
        const midi = pickMelodyMidi();
        const vel = 0.6 + Math.random() * 0.4;
        playBell(midi, nextNoteTime, vel);
        // Occasional gentle answer note a beat later (small arpeggio feel).
        if (Math.random() < 0.3) {
          const chord = PROGRESSION[chordIndex];
          const root = A2 + chord.root;
          const deg = DORIAN[Math.floor(Math.random() * DORIAN.length)];
          playBell(root + deg + 12, nextNoteTime + beat * 0.5, vel * 0.7);
        }
      }

      beatCount++;
      nextNoteTime += beat;
    }
  }

  // Run the scheduler. ~25ms tick gives smooth, robust timing.
  let timer = null;
  try {
    schedule(); // prime immediately
    timer = setInterval(() => {
      try { schedule(); } catch (e) { /* never let music break the game */ }
    }, 25);
  } catch (e) {
    timer = null;
  }

  ambient = {
    stop() {
      running = false;
      if (timer != null) { try { clearInterval(timer); } catch (e) {} timer = null; }
      const t = ctx.currentTime;
      // Fade the whole bed out over ~1.5s, then let voices stop themselves.
      try {
        bed.gain.cancelScheduledValues(t);
        bed.gain.setValueAtTime(Math.max(bed.gain.value, 0.0001), t);
        bed.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
      } catch (e) {}
      // Persistent voices (if any) hard-stop after the fade.
      const stopAt = t + 1.7;
      persistent.forEach((o) => { try { o.stop(stopAt); } catch (e) {} });
      // Disconnect the bed a moment later so any scheduled-but-not-yet-stopped
      // voices are inaudible and get garbage-collected.
      try {
        setTimeout(() => { try { bed.disconnect(); } catch (e) {} }, 2200);
      } catch (e) {}
    },
  };
}

export function stopAmbient() {
  if (!ambient) return;
  try { ambient.stop(); } catch (e) {}
  ambient = null;
}

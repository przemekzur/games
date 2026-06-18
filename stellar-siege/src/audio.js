// audio.js — Stellar Siege procedural WebAudio.
// All synthesis, no external asset files. Lazy-inited on first user gesture.
//
// Contract:
//   initAudio()              — lazy-create one AudioContext; safe to call repeatedly.
//   playSound(name, opts?)   — synth+play a short sfx; ignores unknown names.
//   startAmbient()/stopAmbient() — looping evolving sci-fi drone bed.
//   setMuted(m)              — master gain 0 / normal.

// ---------------------------------------------------------------------------
// Module state (no AudioContext created at load — only inside initAudio()).
// ---------------------------------------------------------------------------
let ctx = null;          // AudioContext
let master = null;       // master GainNode -> destination
let sfxBus = null;       // sfx submix -> master
let muted = false;
let masterLevel = 0.7;   // "normal" master level when un-muted
let noiseBuffer = null;  // shared white-noise buffer

// Ambient bed state.
let ambient = null;      // { nodes..., stop() } or null when not running

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
  master.gain.value = muted ? 0 : masterLevel;
  master.connect(ctx.destination);

  // Dedicated sfx submix so the ambient bed can sit at its own level.
  sfxBus = ctx.createGain();
  sfxBus.gain.value = 1;
  sfxBus.connect(master);

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

// One second of mono white noise, reused as a looping/oneshot source buffer.
function makeNoiseBuffer(seconds) {
  const len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

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
// Sound definitions
// ---------------------------------------------------------------------------
const SOUNDS = {
  // Short bright blip/click — high triangle, fast decay.
  select(v) {
    tone({ type: 'triangle', freq: 1320, dur: 0.09, gain: 0.28 * v, attack: 0.002 });
    tone({ type: 'sine', freq: 1980, dur: 0.05, gain: 0.10 * v, attack: 0.001 });
  },

  // Soft confirming chirp, slightly lower than select, tiny upward lift.
  move(v) {
    tone({ type: 'sine', freq: [620, 760], dur: 0.12, gain: 0.24 * v, attack: 0.004 });
    tone({ type: 'triangle', freq: 930, dur: 0.06, gain: 0.07 * v, attack: 0.002, delay: 0.01 });
  },

  // Laser/pew — saw with a fast downward pitch sweep + a touch of click.
  attack(v) {
    tone({ type: 'sawtooth', freq: [1400, 280], dur: 0.16, gain: 0.22 * v, attack: 0.001 });
    tone({ type: 'square', freq: [900, 200], dur: 0.10, gain: 0.10 * v, attack: 0.001 });
    noiseBurst({ dur: 0.05, gain: 0.06 * v, type: 'highpass', freq: 1800 });
  },

  // Mechanical confirm — low thud + a short noise burst (servo/clamp).
  build(v) {
    tone({ type: 'square', freq: [220, 160], dur: 0.14, gain: 0.18 * v, attack: 0.003, glideType: 'lin' });
    noiseBurst({ dur: 0.10, gain: 0.16 * v, type: 'bandpass', freq: 1200, q: 1.2 });
    tone({ type: 'sine', freq: 90, dur: 0.12, gain: 0.16 * v, attack: 0.004 });
  },

  // Pleasant two-note rising arpeggio — construction finished.
  complete(v) {
    tone({ type: 'triangle', freq: 660, dur: 0.16, gain: 0.22 * v, attack: 0.004 });               // E5-ish
    tone({ type: 'triangle', freq: 990, dur: 0.26, gain: 0.22 * v, attack: 0.004, delay: 0.10 });  // B5-ish
    tone({ type: 'sine', freq: 1320, dur: 0.20, gain: 0.10 * v, attack: 0.004, delay: 0.10 });     // shimmer
  },

  // Filtered noise burst + low boom — lowpass sweep + sine drop.
  explosion(v) {
    noiseBurst({ dur: 0.6, gain: 0.40 * v, type: 'lowpass', freq: 3000, freqTo: 120, q: 0.8, attack: 0.004 });
    tone({ type: 'sine', freq: [140, 40], dur: 0.5, gain: 0.42 * v, attack: 0.006 });
    tone({ type: 'sine', freq: [70, 30], dur: 0.55, gain: 0.30 * v, attack: 0.008 });
  },

  // Descending tone with noise — unit destroyed.
  death(v) {
    tone({ type: 'sawtooth', freq: [440, 70], dur: 0.45, gain: 0.22 * v, attack: 0.004, glideType: 'lin' });
    tone({ type: 'square', freq: [330, 55], dur: 0.40, gain: 0.10 * v, attack: 0.004, glideType: 'lin' });
    noiseBurst({ dur: 0.35, gain: 0.12 * v, type: 'lowpass', freq: 1400, freqTo: 200 });
  },

  // Low buzzy denied sound — detuned square pair, short.
  error(v) {
    tone({ type: 'square', freq: 160, dur: 0.18, gain: 0.18 * v, attack: 0.003, detune: -18 });
    tone({ type: 'square', freq: 162, dur: 0.18, gain: 0.18 * v, attack: 0.003, detune: +18 });
  },

  // Tiny tick — hover/menu.
  ui(v) {
    tone({ type: 'sine', freq: 2200, dur: 0.03, gain: 0.10 * v, attack: 0.001 });
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

function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }

// ---------------------------------------------------------------------------
// Ambient bed — low evolving sci-fi drone/pad with slow filter + LFO + delay.
// ---------------------------------------------------------------------------
export function startAmbient() {
  if (!ctx) return;
  if (ambient) return; // already running
  ensureRunning();
  const now = ctx.currentTime;

  // Bed submix, faded in gently.
  const bed = ctx.createGain();
  bed.gain.setValueAtTime(0.0001, now);
  bed.gain.exponentialRampToValueAtTime(0.18, now + 4.0);

  // Slow lowpass that the LFO breathes through — gives the "evolving" feel.
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 380;
  lp.Q.value = 6;

  // Reverb-ish space via a feedback delay (cheap, no impulse response asset).
  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.37;
  const fb = ctx.createGain();
  fb.gain.value = 0.45;
  const wet = ctx.createGain();
  wet.gain.value = 0.5;
  delay.connect(fb);
  fb.connect(delay);
  delay.connect(wet);

  // Routing: oscillators -> lp -> bed (dry) + lp -> delay -> wet -> bed.
  lp.connect(bed);
  lp.connect(delay);
  wet.connect(bed);
  bed.connect(master);

  // Detuned oscillator stack forming a low, slightly dissonant pad.
  const baseFreqs = [55, 55.4, 82.5, 110.3]; // ~A1 root + fifth + octave, detuned
  const types = ['sawtooth', 'sawtooth', 'triangle', 'sine'];
  const oscs = [];
  baseFreqs.forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = types[i];
    o.frequency.value = f;
    o.detune.value = (Math.random() * 16) - 8;
    const og = ctx.createGain();
    og.gain.value = i === 3 ? 0.5 : 0.3; // sub sine a touch louder
    o.connect(og);
    og.connect(lp);
    o.start(now);
    oscs.push(o);
  });

  // Slow LFO sweeping the filter cutoff — the "breathing" motion.
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.06; // ~16s period
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 220;   // +/- Hz around lp cutoff
  lfo.connect(lfoGain);
  lfoGain.connect(lp.frequency);
  lfo.start(now);

  // Second, faster LFO adding a gentle amplitude shimmer.
  const lfo2 = ctx.createOscillator();
  lfo2.type = 'sine';
  lfo2.frequency.value = 0.13;
  const lfo2Gain = ctx.createGain();
  lfo2Gain.gain.value = 0.04;
  lfo2.connect(lfo2Gain);
  lfo2Gain.connect(bed.gain);
  lfo2.start(now);

  ambient = {
    stop() {
      const t = ctx.currentTime;
      bed.gain.cancelScheduledValues(t);
      bed.gain.setValueAtTime(Math.max(bed.gain.value, 0.0001), t);
      bed.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
      const stopAt = t + 1.7;
      oscs.forEach((o) => { try { o.stop(stopAt); } catch (e) {} });
      try { lfo.stop(stopAt); } catch (e) {}
      try { lfo2.stop(stopAt); } catch (e) {}
    },
  };
}

export function stopAmbient() {
  if (!ambient) return;
  try { ambient.stop(); } catch (e) {}
  ambient = null;
}

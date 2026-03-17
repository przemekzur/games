// Rich layered procedural sound effects using Web Audio API — cinematic sci-fi synthesis
export class SoundManager {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.activeLoops = new Map();
    this.resumed = false;

    // ── Master bus: compressor → master gain → destination ──
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.3;

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 12;
    this.compressor.ratio.value = 4;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.15;
    this.compressor.connect(this.master);
    this.master.connect(this.ctx.destination);

    // ── Reverb send: dry + wet routing through convolver ──
    this.dry = this.ctx.createGain();
    this.dry.gain.value = 0.75;
    this.dry.connect(this.compressor);

    this.reverb = this._createReverb(1.2);
    this.wet = this.ctx.createGain();
    this.wet.gain.value = 0.25;
    this.reverb.connect(this.wet);
    this.wet.connect(this.compressor);

    // Pre-generate reusable noise buffers
    this._noiseBufShort = this._createNoise(0.5);
    this._noiseBufMed = this._createNoise(2);
    this._noiseBufLong = this._createNoise(4);
  }

  // ══════════════════════════════════════════════════════════════
  //  PUBLIC API (unchanged)
  // ══════════════════════════════════════════════════════════════

  ensureResumed() {
    if (!this.resumed && this.ctx.state === 'suspended') {
      this.ctx.resume();
      this.resumed = true;
    }
  }

  setVolume(v) {
    this.master.gain.value = Math.max(0, Math.min(1, v));
  }

  play(name) {
    this.ensureResumed();
    const fn = this._sounds[name];
    if (fn) fn.call(this, false);
  }

  loop(name) {
    this.ensureResumed();
    if (this.activeLoops.has(name)) {
      this.activeLoops.get(name)();
      this.activeLoops.delete(name);
    }
    const fn = this._sounds[name];
    if (!fn) return () => {};
    const stop = fn.call(this, true);
    if (typeof stop === 'function') {
      this.activeLoops.set(name, stop);
      return () => {
        stop();
        this.activeLoops.delete(name);
      };
    }
    return () => {};
  }

  stopAll() {
    for (const [, stop] of this.activeLoops) stop();
    this.activeLoops.clear();
  }

  // ══════════════════════════════════════════════════════════════
  //  SOUND DISPATCH TABLE
  // ══════════════════════════════════════════════════════════════

  get _sounds() {
    return {
      engineIdle:          (l) => this._engineIdle(l),
      engineWarp:          (l) => this._engineWarp(l),
      phaserFire:          ()  => this._phaserFire(),
      torpedoLaunch:       ()  => this._torpedoLaunch(),
      explosion:           ()  => this._explosion(),
      shieldHit:           ()  => this._shieldHit(),
      alertKlaxon:         (l) => this._alertKlaxon(l),
      warpTunnelAmbient:   (l) => this._warpTunnelAmbient(l),
      uiClick:             ()  => this._uiClick(),
      dockingSound:        ()  => this._dockingSound(),
    };
  }

  // ══════════════════════════════════════════════════════════════
  //  DSP UTILITIES
  // ══════════════════════════════════════════════════════════════

  /** Stereo convolution reverb from generated impulse response */
  _createReverb(duration) {
    const rate = this.ctx.sampleRate;
    const length = rate * duration;
    const buffer = this.ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
      }
    }
    const conv = this.ctx.createConvolver();
    conv.buffer = buffer;
    return conv;
  }

  /** White noise buffer (mono) */
  _createNoise(duration) {
    const rate = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, rate * duration, rate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Soft-clip waveshaper distortion */
  _createDistortion(amount = 20) {
    const ws = this.ctx.createWaveShaper();
    const n = 44100;
    const curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
    }
    ws.curve = curve;
    ws.oversample = '4x';
    return ws;
  }

  /** Gain node routed through dry + reverb send */
  _out(volume = 1) {
    const g = this.ctx.createGain();
    g.gain.value = volume;
    g.connect(this.dry);
    g.connect(this.reverb);
    return g;
  }

  /** Gain node routed dry only (no reverb) */
  _outDry(volume = 1) {
    const g = this.ctx.createGain();
    g.gain.value = volume;
    g.connect(this.dry);
    return g;
  }

  /** Create looping noise source from pre-built buffer */
  _loopNoise(buf) {
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  /** Create one-shot noise source */
  _oneshotNoise(buf) {
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = false;
    return src;
  }

  /** Gracefully fade out a gain node and stop oscillators/sources after fade */
  _fadeAndStop(gains, nodes, fadeTime = 0.4) {
    const t = this.ctx.currentTime;
    for (const g of gains) {
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + fadeTime);
    }
    const stopAt = t + fadeTime + 0.05;
    for (const n of nodes) {
      try { n.stop(stopAt); } catch (_) { /* already stopped */ }
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  ENGINE IDLE — warm humming drone
  // ══════════════════════════════════════════════════════════════

  _engineIdle(looping) {
    const t = this.ctx.currentTime;

    // Layer 1: deep sawtooth bass
    const bassG = this._outDry(0.07);
    const bassSaw = this.ctx.createOscillator();
    bassSaw.type = 'sawtooth';
    bassSaw.frequency.value = 55;
    const bassLP = this.ctx.createBiquadFilter();
    bassLP.type = 'lowpass';
    bassLP.frequency.value = 200;
    bassLP.Q.value = 1;
    bassSaw.connect(bassLP);
    bassLP.connect(bassG);
    bassSaw.start(t);

    // Layer 2: sine sub-harmonic
    const subG = this._outDry(0.06);
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 110;
    sub.connect(subG);
    sub.start(t);

    // Layer 3: filtered noise for texture
    const noiseG = this._outDry(0.025);
    const noiseSrc = this._loopNoise(this._noiseBufLong);
    const noiseBP = this.ctx.createBiquadFilter();
    noiseBP.type = 'bandpass';
    noiseBP.frequency.value = 200;
    noiseBP.Q.value = 5;
    noiseSrc.connect(noiseBP);
    noiseBP.connect(noiseG);
    noiseSrc.start(t);

    // LFO modulating noise filter cutoff for gentle pulsing
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2;
    const lfoDepth = this.ctx.createGain();
    lfoDepth.gain.value = 75; // ±75Hz around 200 → 125-275Hz
    lfo.connect(lfoDepth);
    lfoDepth.connect(noiseBP.frequency);
    lfo.start(t);

    const gains = [bassG, subG, noiseG];
    const nodes = [bassSaw, sub, noiseSrc, lfo];

    if (!looping) {
      const dur = 2;
      for (const g of gains) {
        g.gain.setValueAtTime(g.gain.value, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      }
      for (const n of nodes) n.stop(t + dur + 0.05);
      return;
    }

    // Swell in
    for (const g of gains) {
      const v = g.gain.value;
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(v, t + 0.8);
    }

    return () => this._fadeAndStop(gains, nodes, 0.5);
  }

  // ══════════════════════════════════════════════════════════════
  //  ENGINE WARP — rising pitch, rumble, shimmer
  // ══════════════════════════════════════════════════════════════

  _engineWarp(looping) {
    const t = this.ctx.currentTime;

    // Layer 1: rising sawtooth
    const sawG = this._outDry(0.09);
    const saw = this.ctx.createOscillator();
    saw.type = 'sawtooth';
    saw.frequency.setValueAtTime(80, t);
    saw.frequency.linearRampToValueAtTime(220, t + 3);
    const sawLP = this.ctx.createBiquadFilter();
    sawLP.type = 'lowpass';
    sawLP.frequency.value = 400;
    saw.connect(sawLP);
    sawLP.connect(sawG);
    saw.start(t);

    // Layer 2: sub-bass rumble
    const subG = this._outDry(0.08);
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 40;
    subOsc.connect(subG);
    subOsc.start(t);

    // Layer 3: noise whoosh — highpass sweep
    const whooshG = this._out(0.05);
    const whooshSrc = this._loopNoise(this._noiseBufLong);
    const whooshHP = this.ctx.createBiquadFilter();
    whooshHP.type = 'highpass';
    whooshHP.frequency.setValueAtTime(500, t);
    whooshHP.frequency.linearRampToValueAtTime(2000, t + 3);
    whooshHP.Q.value = 1;
    whooshSrc.connect(whooshHP);
    whooshHP.connect(whooshG);
    whooshSrc.start(t);

    // Layer 4: high shimmer — detuned beating sines
    const shimG = this._out(0.03);
    const shimA = this.ctx.createOscillator();
    shimA.type = 'sine';
    shimA.frequency.value = 880;
    const shimB = this.ctx.createOscillator();
    shimB.type = 'sine';
    shimB.frequency.value = 887; // 7Hz beating
    shimA.connect(shimG);
    shimB.connect(shimG);
    shimA.start(t);
    shimB.start(t);

    // Intensity swell envelope
    const allGains = [sawG, subG, whooshG, shimG];
    for (const g of allGains) {
      const v = g.gain.value;
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(v, t + 2);
    }

    const allNodes = [saw, subOsc, whooshSrc, shimA, shimB];

    if (!looping) {
      const dur = 3;
      for (const g of allGains) {
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      }
      for (const n of allNodes) n.stop(t + dur + 0.05);
      return;
    }

    return () => this._fadeAndStop(allGains, allNodes, 0.6);
  }

  // ══════════════════════════════════════════════════════════════
  //  PHASER FIRE — sweeping beam with ring mod warble (~0.6s)
  // ══════════════════════════════════════════════════════════════

  _phaserFire() {
    const t = this.ctx.currentTime;
    const dur = 0.6;

    // Primary sine sweep 3000→600Hz
    const primG = this._out(0.18);
    primG.gain.setValueAtTime(0.18, t);
    primG.gain.exponentialRampToValueAtTime(0.001, t + dur);
    const prim = this.ctx.createOscillator();
    prim.type = 'sine';
    prim.frequency.setValueAtTime(3000, t);
    prim.frequency.exponentialRampToValueAtTime(600, t + 0.5);

    // Ring modulation: multiply by 15Hz for classic phaser warble
    const ringMod = this.ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.value = 15;
    const ringGain = this.ctx.createGain();
    ringGain.gain.value = 0;
    ringMod.connect(ringGain.gain);
    prim.connect(ringGain);
    ringGain.connect(primG);
    ringMod.start(t);
    prim.start(t);
    ringMod.stop(t + dur + 0.1);
    prim.stop(t + dur + 0.1);

    // Secondary triangle sweep, slightly delayed and detuned
    const secG = this._out(0.1);
    secG.gain.setValueAtTime(0.001, t);
    secG.gain.linearRampToValueAtTime(0.1, t + 0.02);
    secG.gain.exponentialRampToValueAtTime(0.001, t + dur);
    const sec = this.ctx.createOscillator();
    sec.type = 'triangle';
    sec.frequency.setValueAtTime(1500, t + 0.02);
    sec.frequency.exponentialRampToValueAtTime(400, t + 0.5);
    sec.connect(secG);
    sec.start(t + 0.02);
    sec.stop(t + dur + 0.1);

    // Noise transient burst at attack
    const burstG = this._out(0.15);
    burstG.gain.setValueAtTime(0.15, t);
    burstG.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    const burstSrc = this._oneshotNoise(this._noiseBufShort);
    const burstHP = this.ctx.createBiquadFilter();
    burstHP.type = 'highpass';
    burstHP.frequency.value = 2000;
    burstSrc.connect(burstHP);
    burstHP.connect(burstG);
    burstSrc.start(t);
    burstSrc.stop(t + 0.06);
  }

  // ══════════════════════════════════════════════════════════════
  //  TORPEDO LAUNCH — heavy thump, body, whoosh tail (~0.8s)
  // ══════════════════════════════════════════════════════════════

  _torpedoLaunch() {
    const t = this.ctx.currentTime;

    // Impact thump: sine at 60Hz, sharp attack
    const thumpG = this._outDry(0.3);
    thumpG.gain.setValueAtTime(0.001, t);
    thumpG.gain.linearRampToValueAtTime(0.3, t + 0.005);
    thumpG.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    const thump = this.ctx.createOscillator();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(60, t);
    thump.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    thump.connect(thumpG);
    thump.start(t);
    thump.stop(t + 0.15);

    // Body: filtered noise burst (bandpass 300Hz)
    const bodyG = this._out(0.12);
    bodyG.gain.setValueAtTime(0.12, t + 0.01);
    bodyG.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    const bodySrc = this._oneshotNoise(this._noiseBufShort);
    const bodyBP = this.ctx.createBiquadFilter();
    bodyBP.type = 'bandpass';
    bodyBP.frequency.value = 300;
    bodyBP.Q.value = 3;
    bodySrc.connect(bodyBP);
    bodyBP.connect(bodyG);
    bodySrc.start(t + 0.01);
    bodySrc.stop(t + 0.2);

    // Whoosh tail: noise through rising highpass
    const whooshG = this._out(0.1);
    whooshG.gain.setValueAtTime(0.1, t + 0.05);
    whooshG.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    const whooshSrc = this._oneshotNoise(this._noiseBufMed);
    const whooshHP = this.ctx.createBiquadFilter();
    whooshHP.type = 'highpass';
    whooshHP.frequency.setValueAtTime(200, t + 0.05);
    whooshHP.frequency.exponentialRampToValueAtTime(4000, t + 0.6);
    whooshSrc.connect(whooshHP);
    whooshHP.connect(whooshG);
    whooshSrc.start(t + 0.05);
    whooshSrc.stop(t + 0.75);

    // Sub-bass follow for weight
    const subG = this._outDry(0.12);
    subG.gain.setValueAtTime(0.12, t + 0.02);
    subG.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 35;
    subOsc.connect(subG);
    subOsc.start(t + 0.02);
    subOsc.stop(t + 0.25);

    // Delay echo (100ms, 30% vol)
    const delay = this.ctx.createDelay(0.2);
    delay.delayTime.value = 0.1;
    const delayG = this.ctx.createGain();
    delayG.gain.value = 0.3;
    thumpG.connect(delay);
    bodyG.connect(delay);
    delay.connect(delayG);
    delayG.connect(this.dry);
  }

  // ══════════════════════════════════════════════════════════════
  //  EXPLOSION — massive layered blast (~1.2s)
  // ══════════════════════════════════════════════════════════════

  _explosion() {
    const t = this.ctx.currentTime;

    // Mix bus with distortion
    const distortion = this._createDistortion(30);
    const mixG = this._out(0.22);
    distortion.connect(mixG);

    // Initial white noise crack (30ms at high volume)
    const crackG = this.ctx.createGain();
    crackG.gain.setValueAtTime(0.5, t);
    crackG.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    crackG.connect(distortion);
    const crackSrc = this._oneshotNoise(this._noiseBufShort);
    crackSrc.connect(crackG);
    crackSrc.start(t);
    crackSrc.stop(t + 0.05);

    // Low frequency rumble: layered detuned sines
    const rumbleFreqs = [40, 60, 80];
    const rumbleNodes = [];
    for (const freq of rumbleFreqs) {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
      g.connect(distortion);
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq + (Math.random() * 4 - 2); // slight random detune
      osc.connect(g);
      osc.start(t + 0.01);
      osc.stop(t + 1.1);
      rumbleNodes.push(osc);
    }

    // Debris: filtered noise (bandpass 800Hz)
    const debrisG = this.ctx.createGain();
    debrisG.gain.setValueAtTime(0.18, t + 0.03);
    debrisG.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
    debrisG.connect(distortion);
    const debrisSrc = this._oneshotNoise(this._noiseBufMed);
    const debrisBP = this.ctx.createBiquadFilter();
    debrisBP.type = 'bandpass';
    debrisBP.frequency.value = 800;
    debrisBP.Q.value = 2;
    debrisSrc.connect(debrisBP);
    debrisBP.connect(debrisG);
    debrisSrc.start(t + 0.02);
    debrisSrc.stop(t + 0.9);

    // Sub-bass boom
    const boomG = this._outDry(0.2);
    boomG.gain.setValueAtTime(0.2, t);
    boomG.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    const boom = this.ctx.createOscillator();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(30, t);
    boom.frequency.exponentialRampToValueAtTime(20, t + 0.5);
    boom.connect(boomG);
    boom.start(t);
    boom.stop(t + 0.65);
  }

  // ══════════════════════════════════════════════════════════════
  //  SHIELD HIT — bright impact with shimmer and crackle (~0.4s)
  // ══════════════════════════════════════════════════════════════

  _shieldHit() {
    const t = this.ctx.currentTime;

    // Bright harmonic impact: 2400Hz + 3600Hz
    const impG = this._out(0.14);
    impG.gain.setValueAtTime(0.001, t);
    impG.gain.linearRampToValueAtTime(0.14, t + 0.005);
    impG.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    const imp1 = this.ctx.createOscillator();
    imp1.type = 'sine';
    imp1.frequency.value = 2400;
    const imp2 = this.ctx.createOscillator();
    imp2.type = 'sine';
    imp2.frequency.value = 3600;
    imp1.connect(impG);
    imp2.connect(impG);
    imp1.start(t);
    imp2.start(t);
    imp1.stop(t + 0.25);
    imp2.stop(t + 0.25);

    // Shimmer: detuned beating sines for ~11Hz beat
    const shimG = this._out(0.08);
    shimG.gain.setValueAtTime(0.08, t);
    shimG.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    const shimA = this.ctx.createOscillator();
    shimA.type = 'sine';
    shimA.frequency.value = 1800;
    const shimB = this.ctx.createOscillator();
    shimB.type = 'sine';
    shimB.frequency.value = 1811;
    shimA.connect(shimG);
    shimB.connect(shimG);
    shimA.start(t);
    shimB.start(t);
    shimA.stop(t + 0.38);
    shimB.stop(t + 0.38);

    // Filtered sweep: bandpass noise 3000→1000Hz
    const sweepG = this._out(0.06);
    sweepG.gain.setValueAtTime(0.06, t);
    sweepG.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    const sweepSrc = this._oneshotNoise(this._noiseBufShort);
    const sweepBP = this.ctx.createBiquadFilter();
    sweepBP.type = 'bandpass';
    sweepBP.frequency.setValueAtTime(3000, t);
    sweepBP.frequency.exponentialRampToValueAtTime(1000, t + 0.3);
    sweepBP.Q.value = 3;
    sweepSrc.connect(sweepBP);
    sweepBP.connect(sweepG);
    sweepSrc.start(t);
    sweepSrc.stop(t + 0.35);

    // Electric crackle: 3 short noise bursts
    for (let i = 0; i < 3; i++) {
      const ct = t + 0.05 + i * 0.015; // 5ms on, ~10ms gap
      const cG = this._out(0.1);
      cG.gain.setValueAtTime(0.1, ct);
      cG.gain.exponentialRampToValueAtTime(0.001, ct + 0.006);
      const cSrc = this._oneshotNoise(this._noiseBufShort);
      const cHP = this.ctx.createBiquadFilter();
      cHP.type = 'highpass';
      cHP.frequency.value = 5000;
      cSrc.connect(cHP);
      cHP.connect(cG);
      cSrc.start(ct);
      cSrc.stop(ct + 0.008);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  ALERT KLAXON — urgent two-tone with warmth
  // ══════════════════════════════════════════════════════════════

  _alertKlaxon(looping) {
    const t = this.ctx.currentTime;

    // Square + triangle layered for warm urgency
    const mainG = this._outDry(0.12);
    const sqOsc = this.ctx.createOscillator();
    sqOsc.type = 'square';
    sqOsc.frequency.value = 600;
    const triOsc = this.ctx.createOscillator();
    triOsc.type = 'triangle';
    triOsc.frequency.value = 600;

    // Mix: square at 60%, triangle at 40%
    const sqMix = this.ctx.createGain();
    sqMix.gain.value = 0.6;
    const triMix = this.ctx.createGain();
    triMix.gain.value = 0.4;
    sqOsc.connect(sqMix);
    triOsc.connect(triMix);

    // Soft distortion for grit
    const dist = this._createDistortion(8);
    sqMix.connect(dist);
    triMix.connect(dist);
    dist.connect(mainG);

    // Two-tone alternation via square LFO: 600±100 → 500 and 700
    const lfo = this.ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 1.5;
    const lfoG = this.ctx.createGain();
    lfoG.gain.value = 100;
    lfo.connect(lfoG);
    lfoG.connect(sqOsc.frequency);
    lfoG.connect(triOsc.frequency);

    // Sub-bass pulse at same rate
    const subG = this._outDry(0.06);
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 100;
    subOsc.connect(subG);

    // Tremolo on sub at klaxon rate
    const subLfo = this.ctx.createOscillator();
    subLfo.type = 'square';
    subLfo.frequency.value = 1.5;
    const subLfoG = this.ctx.createGain();
    subLfoG.gain.value = 0.06;
    subLfo.connect(subLfoG);
    subLfoG.connect(subG.gain);

    const allOsc = [sqOsc, triOsc, lfo, subOsc, subLfo];
    for (const o of allOsc) o.start(t);

    const allGains = [mainG, subG];

    if (!looping) {
      const dur = 1.2;
      for (const g of allGains) {
        g.gain.setValueAtTime(g.gain.value, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      }
      for (const o of allOsc) o.stop(t + dur + 0.05);
      return;
    }

    return () => this._fadeAndStop(allGains, allOsc, 0.25);
  }

  // ══════════════════════════════════════════════════════════════
  //  WARP TUNNEL AMBIENT — immersive warp-space soundscape
  // ══════════════════════════════════════════════════════════════

  _warpTunnelAmbient(looping) {
    const t = this.ctx.currentTime;

    // Deep drone: sawtooth 45Hz + sine 90Hz
    const droneG = this._outDry(0.07);
    const droneSaw = this.ctx.createOscillator();
    droneSaw.type = 'sawtooth';
    droneSaw.frequency.value = 45;
    const droneLP = this.ctx.createBiquadFilter();
    droneLP.type = 'lowpass';
    droneLP.frequency.value = 150;
    droneSaw.connect(droneLP);
    droneLP.connect(droneG);
    droneSaw.start(t);

    const subG = this._outDry(0.06);
    const subSine = this.ctx.createOscillator();
    subSine.type = 'sine';
    subSine.frequency.value = 90;
    subSine.connect(subG);
    subSine.start(t);

    // Swirling mid A: bandpass noise at 400Hz with LFO 0.3Hz
    const swirlAG = this._out(0.04);
    const swirlASrc = this._loopNoise(this._noiseBufLong);
    const swirlABP = this.ctx.createBiquadFilter();
    swirlABP.type = 'bandpass';
    swirlABP.frequency.value = 400;
    swirlABP.Q.value = 4;
    const lfoA = this.ctx.createOscillator();
    lfoA.frequency.value = 0.3;
    const lfoAG = this.ctx.createGain();
    lfoAG.gain.value = 200;
    lfoA.connect(lfoAG);
    lfoAG.connect(swirlABP.frequency);
    swirlASrc.connect(swirlABP);
    swirlABP.connect(swirlAG);
    swirlASrc.start(t);
    lfoA.start(t);

    // Swirling mid B: bandpass noise at 600Hz with LFO 0.5Hz
    const swirlBG = this._out(0.04);
    const swirlBSrc = this._loopNoise(this._noiseBufLong);
    const swirlBBP = this.ctx.createBiquadFilter();
    swirlBBP.type = 'bandpass';
    swirlBBP.frequency.value = 600;
    swirlBBP.Q.value = 4;
    const lfoB = this.ctx.createOscillator();
    lfoB.frequency.value = 0.5;
    const lfoBG = this.ctx.createGain();
    lfoBG.gain.value = 200;
    lfoB.connect(lfoBG);
    lfoBG.connect(swirlBBP.frequency);
    swirlBSrc.connect(swirlBBP);
    swirlBBP.connect(swirlBG);
    swirlBSrc.start(t);
    lfoB.start(t);

    // High shimmer: close-beating sine cluster
    const shimG = this._out(0.02);
    const shimFreqs = [2000, 2003, 2007];
    const shimOscs = shimFreqs.map((f) => {
      const o = this.ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.connect(shimG);
      o.start(t);
      return o;
    });

    // Phase-shifting feel: allpass filter with LFO-modulated frequency
    const allpass = this.ctx.createBiquadFilter();
    allpass.type = 'allpass';
    allpass.frequency.value = 1000;
    allpass.Q.value = 5;
    const apLfo = this.ctx.createOscillator();
    apLfo.frequency.value = 0.15;
    const apLfoG = this.ctx.createGain();
    apLfoG.gain.value = 500;
    apLfo.connect(apLfoG);
    apLfoG.connect(allpass.frequency);
    apLfo.start(t);

    // Route swirl through allpass for phase effect
    swirlABP.connect(allpass);
    swirlBBP.connect(allpass);
    const apOutG = this._out(0.02);
    allpass.connect(apOutG);

    const allGains = [droneG, subG, swirlAG, swirlBG, shimG, apOutG];
    const allNodes = [droneSaw, subSine, swirlASrc, swirlBSrc, lfoA, lfoB, ...shimOscs, apLfo];

    // Fade in
    for (const g of allGains) {
      const v = g.gain.value;
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(v, t + 1.5);
    }

    if (!looping) {
      const dur = 3;
      for (const g of allGains) {
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      }
      for (const n of allNodes) n.stop(t + dur + 0.1);
      return;
    }

    return () => this._fadeAndStop(allGains, allNodes, 0.8);
  }

  // ══════════════════════════════════════════════════════════════
  //  UI CLICK — crisp, short tap (~0.08s)
  // ══════════════════════════════════════════════════════════════

  _uiClick() {
    const t = this.ctx.currentTime;

    // Primary tick
    const g1 = this._outDry(0.1);
    g1.gain.setValueAtTime(0.1, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    const o1 = this.ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.value = 1800;
    o1.connect(g1);
    o1.start(t);
    o1.stop(t + 0.03);

    // Subtle higher follow
    const g2 = this._outDry(0.05);
    g2.gain.setValueAtTime(0.001, t + 0.005);
    g2.gain.linearRampToValueAtTime(0.05, t + 0.007);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    const o2 = this.ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = 2400;
    o2.connect(g2);
    o2.start(t + 0.005);
    o2.stop(t + 0.045);
  }

  // ══════════════════════════════════════════════════════════════
  //  DOCKING SOUND — warm chime sequence C5→E5→G5 (~0.8s)
  // ══════════════════════════════════════════════════════════════

  _dockingSound() {
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    const spacing = 0.15;

    // Soft warm pad underneath
    const padG = this._out(0.025);
    padG.gain.setValueAtTime(0.025, t);
    padG.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    const padSrc = this._oneshotNoise(this._noiseBufMed);
    const padLP = this.ctx.createBiquadFilter();
    padLP.type = 'lowpass';
    padLP.frequency.value = 600;
    padLP.Q.value = 1;
    padSrc.connect(padLP);
    padLP.connect(padG);
    padSrc.start(t);
    padSrc.stop(t + 0.95);

    notes.forEach((freq, i) => {
      const nt = t + i * spacing;

      // Sine fundamental
      const g1 = this._out(0.12);
      g1.gain.setValueAtTime(0.001, nt);
      g1.gain.linearRampToValueAtTime(0.12, nt + 0.01);
      g1.gain.exponentialRampToValueAtTime(0.001, nt + 0.35);
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = freq;
      osc1.connect(g1);
      osc1.start(nt);
      osc1.stop(nt + 0.4);

      // Triangle harmonic (quiet, adds warmth)
      const g2 = this._out(0.04);
      g2.gain.setValueAtTime(0.001, nt);
      g2.gain.linearRampToValueAtTime(0.04, nt + 0.01);
      g2.gain.exponentialRampToValueAtTime(0.001, nt + 0.3);
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = freq * 2; // octave harmonic
      osc2.connect(g2);
      osc2.start(nt);
      osc2.stop(nt + 0.35);
    });
  }
}

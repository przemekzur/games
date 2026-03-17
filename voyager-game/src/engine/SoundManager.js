// Procedural sound effects using Web Audio API — no external files needed
export class SoundManager {
  constructor() {
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.connect(this.ctx.destination);
    this.master.gain.value = 0.3;
    this.activeLoops = new Map();
    this.resumed = false;
  }

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
    // Stop existing loop of same name
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
    for (const [name, stop] of this.activeLoops) {
      stop();
    }
    this.activeLoops.clear();
  }

  // Helper: create a gain node connected to master
  _gain(volume = 1) {
    const g = this.ctx.createGain();
    g.gain.value = volume;
    g.connect(this.master);
    return g;
  }

  // Helper: create white noise buffer
  _noiseBuffer(duration = 1) {
    const sr = this.ctx.sampleRate;
    const len = sr * duration;
    const buf = this.ctx.createBuffer(1, len, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  get _sounds() {
    return {
      engineIdle: (looping) => this._engineIdle(looping),
      engineWarp: (looping) => this._engineWarp(looping),
      phaserFire: () => this._phaserFire(),
      torpedoLaunch: () => this._torpedoLaunch(),
      explosion: () => this._explosion(),
      shieldHit: () => this._shieldHit(),
      alertKlaxon: (looping) => this._alertKlaxon(looping),
      warpTunnelAmbient: (looping) => this._warpTunnelAmbient(looping),
      uiClick: () => this._uiClick(),
      dockingSound: () => this._dockingSound(),
    };
  }

  // ── Engine Idle: low 60Hz sawtooth drone ──
  _engineIdle(looping) {
    const now = this.ctx.currentTime;
    const g = this._gain(0.06);
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 60;
    osc.connect(g);
    osc.start(now);
    if (!looping) {
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2);
      osc.stop(now + 2);
      return;
    }
    return () => {
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.3);
      osc.stop(t + 0.3);
    };
  }

  // ── Engine Warp: rising pitch drone + noise whoosh ──
  _engineWarp(looping) {
    const now = this.ctx.currentTime;
    const g = this._gain(0.12);

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(240, now + 2);
    osc.connect(g);
    osc.start(now);

    // White noise whoosh
    const noiseG = this._gain(0.07);
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = this._noiseBuffer(4);
    noiseSrc.loop = true;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 800;
    noiseSrc.connect(hp);
    hp.connect(noiseG);
    noiseSrc.start(now);

    if (!looping) {
      g.gain.exponentialRampToValueAtTime(0.001, now + 2);
      osc.stop(now + 2);
      noiseG.gain.exponentialRampToValueAtTime(0.001, now + 2);
      noiseSrc.stop(now + 2);
      return;
    }
    return () => {
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.3);
      noiseG.gain.setValueAtTime(noiseG.gain.value, t);
      noiseG.gain.linearRampToValueAtTime(0, t + 0.3);
      osc.stop(t + 0.4);
      noiseSrc.stop(t + 0.4);
    };
  }

  // ── Phaser Fire: descending sine sweep 2000→400Hz with vibrato ──
  _phaserFire() {
    const now = this.ctx.currentTime;
    const g = this._gain(0.25);
    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);

    // Vibrato LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 30;
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 0.4);

    osc.connect(g);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // ── Torpedo Launch: deep thump + filtered noise whoosh ──
  _torpedoLaunch() {
    const now = this.ctx.currentTime;

    // Thump
    const tG = this._gain(0.3);
    tG.gain.setValueAtTime(0.3, now);
    tG.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    const tOsc = this.ctx.createOscillator();
    tOsc.type = 'triangle';
    tOsc.frequency.value = 80;
    tOsc.connect(tG);
    tOsc.start(now);
    tOsc.stop(now + 0.1);

    // Whoosh
    const wG = this._gain(0.15);
    wG.gain.setValueAtTime(0.15, now + 0.05);
    wG.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    const nSrc = this.ctx.createBufferSource();
    nSrc.buffer = this._noiseBuffer(0.5);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1500, now);
    bp.frequency.exponentialRampToValueAtTime(400, now + 0.3);
    bp.Q.value = 2;
    nSrc.connect(bp);
    bp.connect(wG);
    nSrc.start(now + 0.05);
    nSrc.stop(now + 0.35);
  }

  // ── Explosion: white noise burst + low-pass sweep + boom ──
  _explosion() {
    const now = this.ctx.currentTime;

    // Noise burst
    const nG = this._gain(0.35);
    nG.gain.setValueAtTime(0.35, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    const nSrc = this.ctx.createBufferSource();
    nSrc.buffer = this._noiseBuffer(1);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2000, now);
    lp.frequency.exponentialRampToValueAtTime(200, now + 0.5);
    nSrc.connect(lp);
    lp.connect(nG);
    nSrc.start(now);
    nSrc.stop(now + 0.5);

    // Low boom
    const bG = this._gain(0.3);
    bG.gain.setValueAtTime(0.3, now);
    bG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    const bOsc = this.ctx.createOscillator();
    bOsc.type = 'sine';
    bOsc.frequency.value = 60;
    bOsc.connect(bG);
    bOsc.start(now);
    bOsc.stop(now + 0.5);
  }

  // ── Shield Hit: bright ping + shimmer ──
  _shieldHit() {
    const now = this.ctx.currentTime;

    // Ping
    const pG = this._gain(0.2);
    pG.gain.setValueAtTime(0.2, now);
    pG.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    const pOsc = this.ctx.createOscillator();
    pOsc.type = 'sine';
    pOsc.frequency.value = 1200;
    pOsc.connect(pG);
    pOsc.start(now);
    pOsc.stop(now + 0.15);

    // Shimmer (high-pass noise)
    const sG = this._gain(0.1);
    sG.gain.setValueAtTime(0.1, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    const nSrc = this.ctx.createBufferSource();
    nSrc.buffer = this._noiseBuffer(0.3);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 4000;
    nSrc.connect(hp);
    hp.connect(sG);
    nSrc.start(now);
    nSrc.stop(now + 0.2);
  }

  // ── Alert Klaxon: two-tone alternating square wave ──
  _alertKlaxon(looping) {
    const now = this.ctx.currentTime;
    const g = this._gain(0.15);
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 800;

    // Alternate 800/600 Hz at 2Hz rate using LFO + step
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'square';
    lfo.frequency.value = 2;
    lfoGain.gain.value = 100; // swing ±100 around 700 → 600 and 800
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.frequency.value = 700;

    osc.connect(g);
    osc.start(now);
    lfo.start(now);

    if (!looping) {
      g.gain.setValueAtTime(0.15, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1);
      osc.stop(now + 1);
      lfo.stop(now + 1);
      return;
    }
    return () => {
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.2);
      osc.stop(t + 0.3);
      lfo.stop(t + 0.3);
    };
  }

  // ── Warp Tunnel Ambient: deep rumble + LFO-modulated filtered noise ──
  _warpTunnelAmbient(looping) {
    const now = this.ctx.currentTime;

    // Deep rumble
    const rG = this._gain(0.1);
    const rOsc = this.ctx.createOscillator();
    rOsc.type = 'sine';
    rOsc.frequency.value = 40;
    rOsc.connect(rG);
    rOsc.start(now);

    // Mid swirl: noise through bandpass with LFO on cutoff
    const sG = this._gain(0.06);
    const nSrc = this.ctx.createBufferSource();
    nSrc.buffer = this._noiseBuffer(4);
    nSrc.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 600;
    bp.Q.value = 4;
    const lfo = this.ctx.createOscillator();
    const lfoG = this.ctx.createGain();
    lfo.frequency.value = 0.5;
    lfoG.gain.value = 400;
    lfo.connect(lfoG);
    lfoG.connect(bp.frequency);
    nSrc.connect(bp);
    bp.connect(sG);
    nSrc.start(now);
    lfo.start(now);

    if (!looping) {
      rG.gain.exponentialRampToValueAtTime(0.001, now + 2);
      rOsc.stop(now + 2);
      sG.gain.exponentialRampToValueAtTime(0.001, now + 2);
      nSrc.stop(now + 2);
      lfo.stop(now + 2);
      return;
    }
    return () => {
      const t = this.ctx.currentTime;
      rG.gain.setValueAtTime(rG.gain.value, t);
      rG.gain.linearRampToValueAtTime(0, t + 0.5);
      sG.gain.setValueAtTime(sG.gain.value, t);
      sG.gain.linearRampToValueAtTime(0, t + 0.5);
      rOsc.stop(t + 0.6);
      nSrc.stop(t + 0.6);
      lfo.stop(t + 0.6);
    };
  }

  // ── UI Click: quick tick ──
  _uiClick() {
    const now = this.ctx.currentTime;
    const g = this._gain(0.1);
    g.gain.setValueAtTime(0.1, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 2000;
    osc.connect(g);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // ── Docking Sound: C5, E5, G5 chime sequence ──
  _dockingSound() {
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const g = this._gain(0.15);
      const t = now + i * 0.1;
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(g);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }
}

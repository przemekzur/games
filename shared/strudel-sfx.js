(() => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    window.StrudelSfx = { play: () => {}, unlock: () => {}, setEnabled: () => {} };
    return;
  }

  let ac = null;
  let master = null;
  let enabled = true;

  function ctx() {
    if (ac) return ac;
    ac = new AudioCtx();
    master = ac.createGain();
    master.gain.value = 0.22;
    master.connect(ac.destination);
    return ac;
  }

  function unlock() {
    const audio = ctx();
    if (audio.state !== "running") {
      const resumePromise = audio.resume();
      if (resumePromise && typeof resumePromise.catch === "function") {
        resumePromise.catch(() => {});
      }
    }
  }

  function osc(params) {
    const audio = ctx();
    const t0 = audio.currentTime + (params.timeOffset || 0);
    const t1 = t0 + params.duration;
    const o = audio.createOscillator();
    const g = audio.createGain();
    const f = audio.createBiquadFilter();
    o.type = params.type || "sawtooth";
    o.frequency.setValueAtTime(Math.max(20, params.freq), t0);
    if (params.endFreq) {
      o.frequency.exponentialRampToValueAtTime(Math.max(20, params.endFreq), t1);
    }
    f.type = params.filterType || "lowpass";
    f.frequency.value = params.filterFreq || 4200;
    f.Q.value = params.q || 0.8;
    g.gain.setValueAtTime(Math.max(0.0001, params.gain || 0.12), t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t1);
    o.connect(f);
    f.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t1);
  }

  function noise(params) {
    const audio = ctx();
    const t0 = audio.currentTime + (params.timeOffset || 0);
    const t1 = t0 + params.duration;
    const length = Math.max(1, Math.floor(audio.sampleRate * params.duration));
    const buffer = audio.createBuffer(1, length, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audio.sampleRate * (params.decay || 0.05)));
    }
    const src = audio.createBufferSource();
    const f = audio.createBiquadFilter();
    const g = audio.createGain();
    src.buffer = buffer;
    f.type = params.filterType || "bandpass";
    f.frequency.value = params.filterFreq || 1300;
    f.Q.value = params.q || 0.9;
    g.gain.setValueAtTime(Math.max(0.0001, params.gain || 0.08), t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t1);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start(t0);
    src.stop(t1);
  }

  function arp(baseFreq, semitones, stepDur, wave, gain) {
    semitones.forEach((semi, idx) => {
      const f = baseFreq * (2 ** (semi / 12));
      osc({
        type: wave || "triangle",
        freq: f,
        endFreq: f * 0.985,
        duration: stepDur * 0.95,
        gain: gain || 0.075,
        filterFreq: 3600,
        timeOffset: idx * stepDur
      });
    });
  }

  const handlers = {
    start(intensity = 1) {
      arp(220, [0, 3, 7, 12], 0.045, "triangle", 0.09 * intensity);
      noise({ duration: 0.04, gain: 0.02 * intensity, filterFreq: 2400 });
    },
    pause(intensity = 1) {
      arp(220, [0, -3], 0.05, "square", 0.06 * intensity);
    },
    resume(intensity = 1) {
      arp(220, [0, 4], 0.05, "square", 0.06 * intensity);
    },
    shoot(intensity = 1) {
      osc({
        type: "square",
        freq: 900,
        endFreq: 420,
        duration: 0.08,
        gain: 0.1 * intensity,
        filterFreq: 3200
      });
      noise({ duration: 0.03, gain: 0.03 * intensity, filterFreq: 6400 });
    },
    hit(intensity = 1) {
      noise({ duration: 0.035, gain: 0.035 * intensity, filterFreq: 1900, q: 1.6 });
      osc({
        type: "triangle",
        freq: 210,
        endFreq: 78,
        duration: 0.12,
        gain: 0.11 * intensity,
        filterFreq: 950
      });
      osc({
        type: "square",
        freq: 620,
        endFreq: 230,
        duration: 0.055,
        gain: 0.05 * intensity,
        filterFreq: 2600,
        timeOffset: 0.004
      });
    },
    crash(intensity = 1) {
      noise({ duration: 0.32, gain: 0.18 * intensity, filterFreq: 780, q: 1.2 });
      osc({
        type: "triangle",
        freq: 180,
        endFreq: 42,
        duration: 0.34,
        gain: 0.1 * intensity,
        filterFreq: 900
      });
    },
    gameover(intensity = 1) {
      arp(220, [0, -3, -7, -12], 0.08, "triangle", 0.08 * intensity);
    },
    pickup(intensity = 1) {
      arp(440, [0, 4, 7], 0.035, "sine", 0.075 * intensity);
    },
    level(intensity = 1) {
      arp(260, [0, 4, 7, 12, 7], 0.035, "triangle", 0.08 * intensity);
    },
    serve(intensity = 1) {
      osc({
        type: "triangle",
        freq: 520,
        endFreq: 360,
        duration: 0.09,
        gain: 0.08 * intensity,
        filterFreq: 2400
      });
    },
    wall(intensity = 1) {
      osc({
        type: "square",
        freq: 300,
        endFreq: 280,
        duration: 0.05,
        gain: 0.05 * intensity,
        filterFreq: 3000
      });
    },
    paddle(intensity = 1) {
      osc({
        type: "square",
        freq: 520,
        endFreq: 420,
        duration: 0.07,
        gain: 0.06 * intensity,
        filterFreq: 3200
      });
    },
    score(intensity = 1) {
      arp(310, [0, 7, 12], 0.04, "triangle", 0.07 * intensity);
    },
    win(intensity = 1) {
      arp(280, [0, 4, 7, 12, 16], 0.05, "triangle", 0.085 * intensity);
    },
    lose(intensity = 1) {
      arp(260, [0, -2, -5, -9], 0.06, "sawtooth", 0.07 * intensity);
    },
    attack(intensity = 1) {
      noise({ duration: 0.022, gain: 0.025 * intensity, filterFreq: 1800, q: 1.5 });
      osc({
        type: "triangle",
        freq: 170,
        endFreq: 85,
        duration: 0.08,
        gain: 0.085 * intensity,
        filterFreq: 900
      });
      osc({
        type: "square",
        freq: 480,
        endFreq: 220,
        duration: 0.05,
        gain: 0.045 * intensity,
        filterFreq: 2300,
        timeOffset: 0.003
      });
    },
    uppercut(intensity = 1) {
      noise({ duration: 0.03, gain: 0.03 * intensity, filterFreq: 1500, q: 1.3 });
      osc({
        type: "sawtooth",
        freq: 220,
        endFreq: 510,
        duration: 0.1,
        gain: 0.095 * intensity,
        filterFreq: 1700
      });
      osc({
        type: "triangle",
        freq: 120,
        endFreq: 65,
        duration: 0.12,
        gain: 0.085 * intensity,
        filterFreq: 780
      });
    },
    sweep(intensity = 1) {
      noise({ duration: 0.07, gain: 0.045 * intensity, filterFreq: 1100, q: 1 });
      osc({
        type: "triangle",
        freq: 180,
        endFreq: 70,
        duration: 0.11,
        gain: 0.08 * intensity,
        filterFreq: 840
      });
    },
    dash(intensity = 1) {
      noise({ duration: 0.09, gain: 0.05 * intensity, filterFreq: 2200, q: 1.1 });
      osc({
        type: "sawtooth",
        freq: 520,
        endFreq: 180,
        duration: 0.12,
        gain: 0.07 * intensity,
        filterFreq: 2500
      });
    },
    impact(intensity = 1) {
      noise({ duration: 0.045, gain: 0.05 * intensity, filterFreq: 1200, q: 1.4 });
      osc({
        type: "triangle",
        freq: 195,
        endFreq: 62,
        duration: 0.13,
        gain: 0.11 * intensity,
        filterFreq: 820
      });
    },
    special(intensity = 1) {
      arp(320, [0, 7, 12, 15], 0.026, "sawtooth", 0.082 * intensity);
      noise({ duration: 0.1, gain: 0.04 * intensity, filterFreq: 5000, q: 1.1 });
      osc({
        type: "square",
        freq: 760,
        endFreq: 280,
        duration: 0.11,
        gain: 0.05 * intensity,
        filterFreq: 3000
      });
    },
    specialHit(intensity = 1) {
      noise({ duration: 0.15, gain: 0.07 * intensity, filterFreq: 900, q: 1.2 });
      osc({
        type: "sawtooth",
        freq: 310,
        endFreq: 72,
        duration: 0.18,
        gain: 0.12 * intensity,
        filterFreq: 980
      });
    },
    block(intensity = 1) {
      noise({ duration: 0.05, gain: 0.04 * intensity, filterFreq: 2400, q: 2.4 });
      osc({
        type: "square",
        freq: 760,
        endFreq: 440,
        duration: 0.06,
        gain: 0.045 * intensity,
        filterFreq: 3000
      });
      osc({
        type: "triangle",
        freq: 240,
        endFreq: 180,
        duration: 0.08,
        gain: 0.04 * intensity,
        filterFreq: 1200
      });
    },
    round(intensity = 1) {
      arp(250, [0, 7, 12], 0.03, "square", 0.075 * intensity);
      osc({
        type: "square",
        freq: 430,
        endFreq: 280,
        duration: 0.13,
        gain: 0.08 * intensity,
        filterType: "bandpass",
        filterFreq: 1200,
        q: 3
      });
      osc({
        type: "square",
        freq: 570,
        endFreq: 360,
        duration: 0.13,
        gain: 0.075 * intensity,
        filterType: "bandpass",
        filterFreq: 1400,
        q: 3,
        timeOffset: 0.11
      });
      noise({ duration: 0.08, gain: 0.035 * intensity, filterFreq: 2500, q: 1.2 });
    },
    ko(intensity = 1) {
      osc({
        type: "sawtooth",
        freq: 250,
        endFreq: 110,
        duration: 0.14,
        gain: 0.095 * intensity,
        filterFreq: 950
      });
      osc({
        type: "square",
        freq: 520,
        endFreq: 180,
        duration: 0.2,
        gain: 0.08 * intensity,
        filterType: "bandpass",
        filterFreq: 1350,
        q: 2.7,
        timeOffset: 0.02
      });
      arp(200, [0, -4, -9], 0.06, "triangle", 0.07 * intensity);
      noise({ duration: 0.18, gain: 0.05 * intensity, filterFreq: 900, q: 1.2 });
    },
    ui(intensity = 1) {
      osc({
        type: "triangle",
        freq: 420,
        endFreq: 380,
        duration: 0.06,
        gain: 0.04 * intensity,
        filterFreq: 2200
      });
    }
  };

  function play(name, intensity = 1) {
    if (!enabled) return;
    unlock();
    const fn = handlers[name] || handlers.ui;
    fn(Math.max(0.1, intensity));
  }

  window.StrudelSfx = {
    play,
    unlock,
    setEnabled(next) {
      enabled = !!next;
    }
  };

  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock);
})();

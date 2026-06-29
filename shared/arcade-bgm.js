(() => {
  "use strict";

  if (window.ArcadeBgm) return;

  const STORAGE_KEY = "arcade_bgm_settings_v1";

  // Each track is a small generative score. Optional fields fall back to the
  // defaults in normalizeTrack(), so older presets keep working untouched.
  const RAW_TRACKS = {
    neonDrive: {
      name: "Neon Drive",
      genre: "Synthwave",
      bpm: 124, root: 220, swing: 0.12,
      chords: [[0, 3, 7, 10], [5, 8, 12, 15], [3, 7, 10, 14], [-2, 2, 5, 8]],
      bass: [0, 0, 7, 7, 5, 0, 3, 3],
      lead: [12, 15, 19, 15, 17, 14, 12, 7],
      arp: [0, 7, 10, 12, 7, 10, 12, 15],
      kick: [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      openhat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      padWave: "sawtooth", color: 2400, reverb: 0.22, delay: 0.18, pump: 0.42
    },
    skylineFlow: {
      name: "Skyline Flow",
      genre: "Chillwave",
      bpm: 95, root: 196, swing: 0.16,
      chords: [[0, 4, 7, 11], [2, 5, 9, 12], [4, 7, 11, 14], [5, 9, 12, 16]],
      bass: [0, -5, 7, 0, 4, 0, 5, 0],
      lead: [11, 12, 14, 11, 12, 9, 7, 4],
      arp: [0, 4, 7, 11, 7, 4, 12, 7],
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      openhat: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      padWave: "triangle", color: 1900, reverb: 0.34, delay: 0.24, pump: 0.3
    },
    bossRush: {
      name: "Boss Rush",
      genre: "Drum & Bass",
      bpm: 150, root: 233.08, swing: 0,
      chords: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]],
      bass: [0, 12, 0, 12, 5, 17, 7, 19],
      lead: [12, 0, 12, 0, 16, 4, 19, 7],
      arp: [0, 12, 7, 16, 0, 12, 19, 7],
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
      hats: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      openhat: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      padWave: "sawtooth", color: 2800, reverb: 0.18, delay: 0.14, pump: 0.5
    },
    kombatArena: {
      name: "Kombat Arena",
      genre: "Industrial",
      bpm: 110, root: 164.81, swing: 0.06,
      chords: [[0, 1, 6], [-2, 1, 4], [0, 1, 6], [1, 4, 7]],
      bass: [0, 1, 0, 1, 0, 0, 12, 1],
      lead: [6, 7, 12, 13, 6, 1, 0, 12],
      arp: [0, 6, 7, 12, 6, 1, 7, 6],
      kick: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
      openhat: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      padWave: "sawtooth", color: 1500, reverb: 0.26, delay: 0.1, pump: 0.46
    },
    auroraDrift: {
      name: "Aurora Drift",
      genre: "Ambient",
      bpm: 84, root: 174.61, swing: 0,
      chords: [[0, 4, 7, 11, 14], [-3, 0, 4, 9, 12], [-5, 2, 5, 9, 12], [-1, 2, 7, 11, 14]],
      bass: [0, 0, -5, -5, -7, -7, -3, -3],
      lead: [19, 14, 11, 16, 14, 12, 9, 11],
      arp: [0, 7, 11, 14, 19, 14, 11, 7],
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      openhat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      padWave: "triangle", color: 1500, reverb: 0.55, delay: 0.32, pump: 0.2
    },
    pixelQuest: {
      name: "Pixel Quest",
      genre: "Chiptune",
      bpm: 132, root: 261.63, swing: 0.08,
      chords: [[0, 4, 7], [-3, 0, 5], [-5, -1, 2], [-1, 2, 7]],
      bass: [0, 0, 12, 0, -3, -3, 9, -3],
      lead: [12, 16, 19, 24, 19, 16, 12, 7],
      arp: [0, 4, 7, 12, 16, 12, 7, 4],
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      openhat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      padWave: "square", color: 3200, reverb: 0.16, delay: 0.2, pump: 0.34,
      leadWave: "square", chiptune: true
    },
    hyperCircuit: {
      name: "Hyper Circuit",
      genre: "Techno",
      bpm: 138, root: 207.65, swing: 0,
      chords: [[0, 3, 7, 10], [0, 3, 7, 10], [-2, 1, 5, 8], [3, 7, 10, 14]],
      bass: [0, 0, 0, 0, 0, 0, 0, 0],
      lead: [12, 12, 15, 12, 10, 12, 7, 15],
      arp: [0, 12, 7, 10, 0, 15, 7, 12],
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      hats: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      openhat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      padWave: "sawtooth", color: 2600, reverb: 0.2, delay: 0.22, pump: 0.55
    },
    crystalCove: {
      name: "Crystal Cove",
      genre: "Lo-Fi",
      bpm: 78, root: 220, swing: 0.22,
      chords: [[0, 3, 7, 10, 14], [-4, 0, 3, 7, 10], [-2, 2, 5, 9], [-5, -1, 2, 5]],
      bass: [0, 0, -4, 0, -2, -2, -5, -5],
      lead: [14, 12, 10, 7, 10, 12, 14, 15],
      arp: [0, 7, 10, 14, 10, 7, 12, 10],
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
      openhat: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      padWave: "triangle", color: 1300, reverb: 0.42, delay: 0.3, pump: 0.22
    }
  };

  function normalizeTrack(t) {
    return Object.assign({
      swing: 0, arp: null, openhat: null, clap: null,
      padWave: "triangle", leadWave: "square", color: 2200,
      reverb: 0.2, delay: 0.14, pump: 0.35, chiptune: false
    }, t);
  }

  const TRACKS = {};
  Object.keys(RAW_TRACKS).forEach((id) => { TRACKS[id] = normalizeTrack(RAW_TRACKS[id]); });
  const TRACK_IDS = Object.keys(TRACKS);

  const state = loadSettings();
  let audioContext;
  let masterGain;     // user volume
  let busComp;        // glue compressor (post-master)
  let musicBus;       // melodic content (gets sidechained)
  let pumpGain;       // sidechain duck node
  let drumBus;        // percussion (not ducked)
  let reverbSend, reverbNode;
  let delaySend, delayNode, delayFeedback, delayTone;
  let noiseBuffer;
  let schedulerId = 0;
  let running = false;
  let stepIndex = 0;
  let nextStepTime = 0;

  function loadSettings() {
    const fallback = { enabled: true, track: "neonDrive", volume: 0.26 };
    let raw = null;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn("BGM settings unavailable:", error);
    }
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      const track = TRACK_IDS.includes(parsed.track) ? parsed.track : fallback.track;
      const volume = Number.isFinite(parsed.volume) ? clamp(parsed.volume, 0, 1) : fallback.volume;
      return { enabled: parsed.enabled !== false, track, volume };
    } catch (error) {
      console.warn("Invalid BGM settings, using defaults:", error);
      return fallback;
    }
  }

  function saveSettings() {
    const payload = JSON.stringify({
      enabled: state.enabled,
      track: state.track,
      volume: state.volume
    });
    try {
      window.localStorage.setItem(STORAGE_KEY, payload);
    } catch (error) {
      console.warn("Could not persist BGM settings:", error);
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();

      // Master chain: [musicBus -> pumpGain] + [drumBus] + sends -> masterGain -> comp -> out
      masterGain = audioContext.createGain();
      masterGain.gain.value = state.volume;

      busComp = audioContext.createDynamicsCompressor();
      busComp.threshold.setValueAtTime(-16, audioContext.currentTime);
      busComp.knee.setValueAtTime(24, audioContext.currentTime);
      busComp.ratio.setValueAtTime(3, audioContext.currentTime);
      busComp.attack.setValueAtTime(0.006, audioContext.currentTime);
      busComp.release.setValueAtTime(0.18, audioContext.currentTime);

      masterGain.connect(busComp);
      busComp.connect(audioContext.destination);

      pumpGain = audioContext.createGain();
      pumpGain.gain.value = 1;
      pumpGain.connect(masterGain);

      musicBus = audioContext.createGain();
      musicBus.gain.value = 1;
      musicBus.connect(pumpGain);

      drumBus = audioContext.createGain();
      drumBus.gain.value = 1;
      drumBus.connect(masterGain);

      // Reverb send (generated impulse)
      reverbSend = audioContext.createGain();
      reverbSend.gain.value = 0;
      reverbNode = audioContext.createConvolver();
      reverbNode.buffer = buildImpulse(2.4, 2.6);
      reverbSend.connect(reverbNode);
      reverbNode.connect(masterGain);

      // Feedback delay send (eighth-note-ish, set per track)
      delaySend = audioContext.createGain();
      delaySend.gain.value = 0;
      delayNode = audioContext.createDelay(1.2);
      delayNode.delayTime.value = 0.32;
      delayFeedback = audioContext.createGain();
      delayFeedback.gain.value = 0.34;
      delayTone = audioContext.createBiquadFilter();
      delayTone.type = "lowpass";
      delayTone.frequency.value = 2600;
      delaySend.connect(delayNode);
      delayNode.connect(delayTone);
      delayTone.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayTone.connect(masterGain);
    }
    return audioContext;
  }

  function buildImpulse(seconds, decay) {
    const ctx = getContextForBuffer();
    const rate = ctx.sampleRate;
    const length = Math.max(1, Math.floor(rate * seconds));
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch += 1) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i += 1) {
        const t = i / length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
      }
    }
    return impulse;
  }

  // buildImpulse runs inside getContext(); use the in-flight context directly.
  function getContextForBuffer() {
    return audioContext;
  }

  function unlockAudio() {
    const ctx = getContext();
    if (ctx.state !== "running") {
      const resumePromise = ctx.resume();
      if (resumePromise && typeof resumePromise.catch === "function") {
        resumePromise.catch((error) => console.warn("Could not resume BGM context:", error));
      }
    }
  }

  function toFrequency(root, semitoneOffset) {
    return root * Math.pow(2, semitoneOffset / 12);
  }

  function getNoiseBuffer() {
    if (noiseBuffer) return noiseBuffer;
    const ctx = getContext();
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) {
      channel[i] = (Math.random() * 2 - 1) * 0.8;
    }
    noiseBuffer = buffer;
    return noiseBuffer;
  }

  // Tonal voice. `bus` selects destination; `send`/`echo` feed the FX buses.
  function playTone(frequency, time, options = {}) {
    const ctx = getContext();
    const duration = options.duration ?? 0.14;
    const peakGain = options.gain ?? 0.12;
    const attack = options.attack ?? 0.004;
    const release = options.release ?? Math.max(0.05, duration * 0.75);
    const filterFreq = options.filter ?? 1800;
    const bus = options.bus || musicBus;
    const voices = options.detuneSpread ? 2 : 1;

    const amp = ctx.createGain();
    const toneFilter = ctx.createBiquadFilter();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    toneFilter.type = options.filterType ?? "lowpass";
    toneFilter.frequency.setValueAtTime(filterFreq, time);
    toneFilter.Q.setValueAtTime(options.q ?? 0.9, time);

    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, peakGain), time + attack);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration + release);

    for (let v = 0; v < voices; v += 1) {
      const osc = ctx.createOscillator();
      osc.type = options.wave ?? "sawtooth";
      osc.frequency.setValueAtTime(Math.max(20, frequency), time);
      let detune = Number.isFinite(options.detune) ? options.detune : 0;
      if (options.detuneSpread) detune += v === 0 ? -options.detuneSpread : options.detuneSpread;
      if (detune) osc.detune.setValueAtTime(detune, time);
      osc.connect(toneFilter);
      osc.start(time);
      osc.stop(time + duration + release + 0.02);
    }

    toneFilter.connect(amp);
    const out = panner || amp;
    if (panner) {
      panner.pan.setValueAtTime(clamp(options.pan ?? 0, -1, 1), time);
      amp.connect(panner);
    }
    out.connect(bus);
    if (options.send && reverbSend) { amp.connect(reverbSend); }
    if (options.echo && delaySend) { amp.connect(delaySend); }
  }

  function playNoise(time, options = {}) {
    const ctx = getContext();
    const duration = options.duration ?? 0.08;
    const gain = options.gain ?? 0.13;
    const highpass = options.highpass ?? 2200;
    const bus = options.bus || drumBus;

    const source = ctx.createBufferSource();
    const hp = ctx.createBiquadFilter();
    const lp = ctx.createBiquadFilter();
    const amp = ctx.createGain();

    source.buffer = getNoiseBuffer();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(highpass, time);
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(options.lowpass ?? 9000, time);

    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), time + 0.003);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    source.connect(hp);
    hp.connect(lp);
    lp.connect(amp);
    amp.connect(bus);
    source.start(time);
    source.stop(time + duration + 0.02);
  }

  function playKick(time, gain = 0.52) {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const click = ctx.createOscillator();
    const amp = ctx.createGain();
    const clickAmp = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, time);

    osc.type = "sine";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(44, time + 0.16);
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(gain, time + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);

    click.type = "triangle";
    click.frequency.setValueAtTime(1400, time);
    clickAmp.gain.setValueAtTime(gain * 0.5, time);
    clickAmp.gain.exponentialRampToValueAtTime(0.0001, time + 0.02);

    osc.connect(filter); filter.connect(amp); amp.connect(drumBus);
    click.connect(clickAmp); clickAmp.connect(drumBus);
    osc.start(time); osc.stop(time + 0.24);
    click.start(time); click.stop(time + 0.03);
  }

  function playSnare(time, gain = 0.18) {
    playNoise(time, { duration: 0.16, gain, highpass: 1500, lowpass: 7200 });
    playTone(190, time, {
      duration: 0.07, gain: gain * 0.4, wave: "triangle",
      filter: 1100, filterType: "bandpass", bus: drumBus
    });
  }

  function playClap(time, gain = 0.16) {
    [0, 0.012, 0.024].forEach((offset, i) => {
      playNoise(time + offset, {
        duration: 0.05, gain: gain * (i === 2 ? 1 : 0.6),
        highpass: 1800, lowpass: 6000
      });
    });
  }

  function playHat(time, gain = 0.1, open = false) {
    playNoise(time, {
      duration: open ? 0.22 : 0.045, gain,
      highpass: 6000, lowpass: 13000
    });
  }

  function triggerPump(time, depth) {
    if (!pumpGain || depth <= 0) return;
    pumpGain.gain.cancelScheduledValues(time);
    pumpGain.gain.setValueAtTime(clamp(1 - depth, 0.1, 1), time + 0.001);
    pumpGain.gain.setTargetAtTime(1, time + 0.02, 0.08);
  }

  function renderStep(track, step, time, stepDuration) {
    const step16 = step % 16;
    const bar = Math.floor(step / 16) % 4;
    const accent = step16 % 4 === 0 ? 1 : 0.84;
    const chord = track.chords[bar];

    if (track.kick[step16]) {
      playKick(time, 0.44 + 0.14 * accent);
      triggerPump(time, track.pump);
    }
    if (track.snare[step16]) playSnare(time, 0.16 + 0.05 * accent);
    if (track.clap && track.clap[step16]) playClap(time, 0.15);
    if (track.hats[step16]) playHat(time, step16 % 2 === 0 ? 0.08 : 0.055, false);
    if (track.openhat && track.openhat[step16]) playHat(time, 0.07, true);

    // Pad / chord stab every quarter note.
    if (step16 % 4 === 0) {
      const chordDuration = stepDuration * 3.7;
      for (let i = 0; i < chord.length; i += 1) {
        playTone(toFrequency(track.root, chord[i]), time, {
          duration: chordDuration,
          gain: 0.07,
          wave: track.padWave,
          detuneSpread: track.padWave === "sawtooth" ? 7 : 0,
          filter: 800 + i * 420,
          pan: -0.3 + i * (0.6 / Math.max(1, chord.length - 1)),
          release: 0.18,
          send: true
        });
      }
    }

    // Bass on eighth notes.
    if (step16 % 2 === 0) {
      const bassSemitone = track.bass[(step16 / 2) % track.bass.length] - 12;
      playTone(toFrequency(track.root, bassSemitone), time, {
        duration: stepDuration * 1.8,
        gain: 0.16,
        wave: track.chiptune ? "square" : "sawtooth",
        filter: track.chiptune ? 900 : 520,
        release: 0.08
      });
    }

    // Lead on off-beats.
    if (step16 % 2 === 1) {
      const leadSemitone = track.lead[((step16 - 1) / 2) % track.lead.length];
      playTone(toFrequency(track.root, leadSemitone), time, {
        duration: stepDuration * 0.95,
        gain: 0.085,
        wave: track.leadWave,
        filter: track.color,
        pan: step16 < 8 ? -0.16 : 0.18,
        attack: 0.002,
        release: 0.07,
        echo: true
      });
    }

    // Arpeggio sparkle on every 16th (quieter, panned, sent to reverb).
    if (track.arp) {
      const arpSemitone = track.arp[step16 % track.arp.length] + 12;
      playTone(toFrequency(track.root, arpSemitone), time, {
        duration: stepDuration * 0.6,
        gain: 0.045,
        wave: track.chiptune ? "square" : "triangle",
        filter: track.color + 600,
        pan: step16 % 2 === 0 ? 0.28 : -0.28,
        attack: 0.001,
        release: 0.05,
        send: true,
        echo: true
      });
    }
  }

  function getCurrentTrack() {
    return TRACKS[state.track] || TRACKS.neonDrive;
  }

  function applyTrackFx(track) {
    const ctx = getContext();
    if (reverbSend) reverbSend.gain.setTargetAtTime(track.reverb, ctx.currentTime, 0.1);
    if (delaySend) delaySend.gain.setTargetAtTime(track.delay, ctx.currentTime, 0.1);
    if (delayNode) {
      // dotted-eighth feel relative to tempo
      const dt = clamp((60 / track.bpm) * 0.75, 0.05, 1.1);
      delayNode.delayTime.setTargetAtTime(dt, ctx.currentTime, 0.1);
    }
  }

  function schedulerTick() {
    if (!running) return;
    const ctx = getContext();
    const track = getCurrentTrack();
    const stepDuration = (60 / track.bpm) / 4;
    while (nextStepTime < ctx.currentTime + 0.15) {
      const step16 = stepIndex % 16;
      const swingOffset = (step16 % 2 === 1) ? stepDuration * track.swing : 0;
      renderStep(track, stepIndex, nextStepTime + swingOffset, stepDuration);
      stepIndex = (stepIndex + 1) % 64;
      nextStepTime += stepDuration;
    }
  }

  function startPlayback() {
    unlockAudio();
    if (running) return;
    running = true;
    stepIndex = 0;
    applyTrackFx(getCurrentTrack());
    nextStepTime = getContext().currentTime + 0.06;
    schedulerId = window.setInterval(schedulerTick, 25);
    renderUiState();
  }

  function stopPlayback() {
    if (!running) return;
    running = false;
    if (schedulerId) {
      window.clearInterval(schedulerId);
      schedulerId = 0;
    }
    renderUiState();
  }

  function setVolume(nextVolume) {
    state.volume = clamp(nextVolume, 0, 1);
    if (masterGain) {
      masterGain.gain.setTargetAtTime(state.volume, getContext().currentTime, 0.015);
    }
    saveSettings();
  }

  function changeTrack(trackId) {
    if (!TRACKS[trackId]) return;
    state.track = trackId;
    saveSettings();
    if (running) {
      applyTrackFx(getCurrentTrack());
      stepIndex = 0;
      nextStepTime = getContext().currentTime + 0.04;
    }
    renderUiState();
  }

  function setEnabled(enabled) {
    state.enabled = Boolean(enabled);
    saveSettings();
    if (state.enabled) {
      startPlayback();
    } else {
      stopPlayback();
    }
    renderUiState();
  }

  let rootEl;
  let toggleButton;
  let trackSelect;
  let volumeRange;
  let nowPlaying;

  function injectStyles() {
    if (document.getElementById("arcade-bgm-style")) return;
    const style = document.createElement("style");
    style.id = "arcade-bgm-style";
    // Host pages can re-skin the panel by setting the --bgm-* custom properties.
    // Defaults below keep the dark look the individual games ship with.
    style.textContent = `
      #arcade-bgm {
        --_bg: var(--bgm-bg, #0e1525);
        --_fg: var(--bgm-fg, #e9f4ff);
        --_muted: var(--bgm-muted, #9fb6d2);
        --_accent: var(--bgm-accent, #6be1ff);
        --_accent-ink: var(--bgm-accent-ink, #0a1530);
        --_border: var(--bgm-border, #2b3c5e);
        --_field: var(--bgm-field, #0a1322);
        --_font: var(--bgm-font, "Segoe UI", "Inter", Arial, sans-serif);
        --_mono: var(--bgm-mono, ui-monospace, "Cascadia Mono", monospace);
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 9999;
        width: min(300px, calc(100vw - 24px));
        border: 1px solid var(--_border);
        background: var(--_bg);
        box-shadow: 0 14px 34px rgba(6, 10, 20, 0.28);
        color: var(--_fg);
        font-family: var(--_font);
        padding: 13px 14px;
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #arcade-bgm[data-collapsed="true"] { transform: translateY(calc(100% - 46px)); }
      #arcade-bgm .bgm-head {
        display: flex; align-items: center; justify-content: space-between;
        gap: 8px; margin-bottom: 11px;
      }
      #arcade-bgm .bgm-title {
        font-family: var(--_mono);
        font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
        text-transform: uppercase; color: var(--_fg);
        display: flex; align-items: center; gap: 9px;
      }
      #arcade-bgm .eq { display: inline-flex; gap: 2px; align-items: flex-end; height: 13px; }
      #arcade-bgm .eq i {
        width: 3px; height: 4px;
        background: var(--_accent);
        animation: bgmEq 0.9s ease-in-out infinite;
      }
      #arcade-bgm .eq i:nth-child(2) { animation-delay: 0.15s; }
      #arcade-bgm .eq i:nth-child(3) { animation-delay: 0.3s; }
      #arcade-bgm .eq i:nth-child(4) { animation-delay: 0.45s; }
      #arcade-bgm[data-running="false"] .eq i { animation-play-state: paused; height: 4px; }
      @keyframes bgmEq { 0%, 100% { height: 4px; } 50% { height: 13px; } }
      #arcade-bgm .bgm-collapse {
        border: none; background: transparent; color: var(--_muted); cursor: pointer;
        font-size: 16px; line-height: 1; padding: 2px 4px;
      }
      #arcade-bgm .bgm-badge { font-family: var(--_mono); font-size: 10px; letter-spacing: 0.04em; color: var(--_muted); }
      #arcade-bgm .bgm-row {
        display: grid; grid-template-columns: 56px 1fr; align-items: center;
        gap: 8px; margin-bottom: 9px;
      }
      #arcade-bgm label { font-family: var(--_mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--_muted); }
      #arcade-bgm select, #arcade-bgm input[type="range"] { width: 100%; }
      #arcade-bgm select {
        border: 1px solid var(--_border);
        background: var(--_field); color: var(--_fg); padding: 7px 9px; font-size: 13px;
        font-family: var(--_font); border-radius: 2px;
      }
      #arcade-bgm input[type="range"] { accent-color: var(--_accent); }
      #arcade-bgm .bgm-actions {
        display: flex; align-items: center; justify-content: space-between; gap: 10px;
      }
      #arcade-bgm button.bgm-toggle {
        border: 1px solid var(--_accent);
        background: var(--_accent);
        color: var(--_accent-ink); border-radius: 2px; padding: 7px 16px;
        font-family: var(--_mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
        text-transform: uppercase; cursor: pointer;
        transition: filter 0.14s ease;
      }
      #arcade-bgm button.bgm-toggle:hover { filter: brightness(0.94); }
      #arcade-bgm .bgm-now { font-family: var(--_mono); font-size: 10px; letter-spacing: 0.03em; color: var(--_muted); }
      #arcade-bgm .bgm-now b { color: var(--_fg); font-weight: 600; }
      @media (max-width: 640px) {
        #arcade-bgm { right: 12px; left: 12px; width: auto; bottom: 12px; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderUiState() {
    if (!rootEl) return;
    if (toggleButton) toggleButton.textContent = state.enabled ? "Pause" : "Play";
    if (trackSelect) {
      trackSelect.value = state.track;
      trackSelect.disabled = !state.enabled;
    }
    if (volumeRange) {
      volumeRange.value = String(Math.round(state.volume * 100));
      volumeRange.disabled = !state.enabled;
    }
    if (nowPlaying) {
      const t = getCurrentTrack();
      nowPlaying.innerHTML = `<b>${t.name}</b> · ${t.genre} · ${t.bpm} BPM`;
    }
    rootEl.dataset.running = running ? "true" : "false";
  }

  function mountUi() {
    if (document.getElementById("arcade-bgm")) return;

    rootEl = document.createElement("section");
    rootEl.id = "arcade-bgm";
    rootEl.setAttribute("aria-label", "Background music controls");

    const options = TRACK_IDS
      .map((id) => `<option value="${id}">${TRACKS[id].name} · ${TRACKS[id].genre}</option>`)
      .join("");
    rootEl.innerHTML = `
      <div class="bgm-head" id="arcade-bgm-head">
        <div class="bgm-title"><span class="eq"><i></i><i></i><i></i><i></i></span> Soundtrack</div>
        <button class="bgm-collapse" id="arcade-bgm-collapse" type="button" aria-label="Collapse music panel">▾</button>
      </div>
      <div class="bgm-now" id="arcade-bgm-now"></div>
      <div class="bgm-row" style="margin-top:10px;">
        <label for="arcade-bgm-track">Track</label>
        <select id="arcade-bgm-track">${options}</select>
      </div>
      <div class="bgm-row">
        <label for="arcade-bgm-volume">Volume</label>
        <input id="arcade-bgm-volume" type="range" min="0" max="100" step="1" />
      </div>
      <div class="bgm-actions">
        <button class="bgm-toggle" id="arcade-bgm-toggle" type="button"></button>
        <span class="bgm-badge">Saved across games</span>
      </div>
    `;

    document.body.appendChild(rootEl);

    toggleButton = document.getElementById("arcade-bgm-toggle");
    trackSelect = document.getElementById("arcade-bgm-track");
    volumeRange = document.getElementById("arcade-bgm-volume");
    nowPlaying = document.getElementById("arcade-bgm-now");
    const collapse = document.getElementById("arcade-bgm-collapse");

    toggleButton.addEventListener("click", () => setEnabled(!state.enabled));
    trackSelect.addEventListener("change", (event) => changeTrack(event.target.value));
    volumeRange.addEventListener("input", (event) => setVolume(Number(event.target.value) / 100));

    function setCollapsed(collapsed) {
      rootEl.dataset.collapsed = collapsed ? "true" : "false";
      collapse.textContent = collapsed ? "▴" : "▾";
      collapse.setAttribute("aria-label", collapsed ? "Expand music panel" : "Collapse music panel");
    }
    // Start collapsed on phones so the panel never covers page content; expanded on larger screens.
    const startCollapsed = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
    setCollapsed(startCollapsed);
    collapse.addEventListener("click", () => setCollapsed(rootEl.dataset.collapsed !== "true"));

    renderUiState();
  }

  function primeInteractionStart() {
    const startFromUserGesture = () => {
      unlockAudio();
      if (state.enabled) startPlayback();
    };
    window.addEventListener("pointerdown", startFromUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", startFromUserGesture, { once: true });
  }

  function init() {
    injectStyles();
    mountUi();
    primeInteractionStart();
    if (!state.enabled) stopPlayback();
  }

  window.addEventListener("pagehide", stopPlayback);

  window.ArcadeBgm = {
    start: () => setEnabled(true),
    stop: () => setEnabled(false),
    setTrack: changeTrack,
    setVolume,
    tracks: () => TRACK_IDS.slice()
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

(() => {
  "use strict";

  if (window.ArcadeBgm) return;

  const STORAGE_KEY = "arcade_bgm_settings_v1";
  const TRACKS = {
    neonDrive: {
      name: "Neon Drive",
      bpm: 124,
      root: 220,
      chords: [
        [0, 3, 7, 10], // Am7
        [5, 8, 12, 15], // Fmaj7
        [3, 7, 10, 14], // Cmaj7
        [-2, 2, 5, 8]   // G7
      ],
      bass: [0, 0, 7, 7, 5, 0, 3, 3],
      lead: [12, 15, 19, 15, 17, 14, 12, 7],
      kick: [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1]
    },
    skylineFlow: {
      name: "Skyline Flow",
      bpm: 95,
      root: 196,
      chords: [
        [0, 4, 7, 11], // Gmaj7
        [2, 5, 9, 12], // Am7
        [4, 7, 11, 14], // Bm7
        [5, 9, 12, 16] // Cmaj7
      ],
      bass: [0, -5, 7, 0, 4, 0, 5, 0],
      lead: [11, 12, 14, 11, 12, 9, 7, 4],
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1]
    },
    bossRush: {
      name: "Boss Rush",
      bpm: 142,
      root: 233.08,
      chords: [
        [0, 4, 7],
        [5, 9, 12],
        [7, 11, 14],
        [0, 4, 7]
      ],
      bass: [0, 12, 0, 12, 5, 17, 7, 19],
      lead: [12, 0, 12, 0, 16, 4, 19, 7],
      kick: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      hats: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    kombatArena: {
      name: "Kombat Arena",
      bpm: 110,
      root: 164.81, // E
      chords: [
        [0, 1, 6], // Phrygian cluster
        [-2, 1, 4],
        [0, 1, 6],
        [1, 4, 7]
      ],
      bass: [0, 1, 0, 1, 0, 0, 12, 1],
      lead: [6, 7, 12, 13, 6, 1, 0, 12],
      kick: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1]
    }
  };
  const TRACK_IDS = Object.keys(TRACKS);

  const state = loadSettings();
  let audioContext;
  let masterGain;
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
      masterGain = audioContext.createGain();
      masterGain.gain.value = state.volume;
      masterGain.connect(audioContext.destination);
    }
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
    const durationSeconds = 1;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * durationSeconds, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) {
      channel[i] = (Math.random() * 2 - 1) * 0.8;
    }
    noiseBuffer = buffer;
    return noiseBuffer;
  }

  function playTone(frequency, time, options = {}) {
    const ctx = getContext();
    const duration = options.duration ?? 0.14;
    const peakGain = options.gain ?? 0.12;
    const attack = options.attack ?? 0.004;
    const release = options.release ?? Math.max(0.05, duration * 0.75);
    const filterFreq = options.filter ?? 1800;

    const osc = ctx.createOscillator();
    const toneFilter = ctx.createBiquadFilter();
    const amp = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    osc.type = options.wave ?? "sawtooth";
    osc.frequency.setValueAtTime(Math.max(20, frequency), time);
    if (Number.isFinite(options.detune)) {
      osc.detune.setValueAtTime(options.detune, time);
    }

    toneFilter.type = options.filterType ?? "lowpass";
    toneFilter.frequency.setValueAtTime(filterFreq, time);
    toneFilter.Q.setValueAtTime(options.q ?? 0.9, time);

    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, peakGain), time + attack);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration + release);

    if (panner) {
      panner.pan.setValueAtTime(clamp(options.pan ?? 0, -1, 1), time);
      osc.connect(toneFilter);
      toneFilter.connect(amp);
      amp.connect(panner);
      panner.connect(masterGain);
    } else {
      osc.connect(toneFilter);
      toneFilter.connect(amp);
      amp.connect(masterGain);
    }

    osc.start(time);
    osc.stop(time + duration + release + 0.02);
  }

  function playNoise(time, options = {}) {
    const ctx = getContext();
    const duration = options.duration ?? 0.08;
    const gain = options.gain ?? 0.13;
    const highpass = options.highpass ?? 2200;

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
    amp.connect(masterGain);

    source.start(time);
    source.stop(time + duration + 0.02);
  }

  function playKick(time, gain = 0.52) {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(260, time);
    osc.type = "sine";
    osc.frequency.setValueAtTime(145, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(gain, time + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc.connect(filter);
    filter.connect(amp);
    amp.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.22);
  }

  function playSnare(time, gain = 0.18) {
    playNoise(time, { duration: 0.16, gain, highpass: 1400, lowpass: 6800 });
    playTone(190, time, {
      duration: 0.07,
      gain: gain * 0.36,
      wave: "triangle",
      filter: 1100,
      filterType: "bandpass"
    });
  }

  function playHat(time, gain = 0.1) {
    playNoise(time, { duration: 0.045, gain, highpass: 5200, lowpass: 12000 });
  }

  function renderStep(track, step, time, stepDuration) {
    const step16 = step % 16;
    const bar = Math.floor(step / 16) % 4;
    const accent = step16 % 4 === 0 ? 1 : 0.84;

    if (track.kick[step16]) playKick(time, 0.42 + 0.15 * accent);
    if (track.snare[step16]) playSnare(time, 0.16 + 0.05 * accent);
    if (track.hats[step16]) playHat(time, step16 % 2 === 0 ? 0.082 : 0.058);

    if (step16 % 4 === 0) {
      const chord = track.chords[bar];
      const chordDuration = stepDuration * 3.7;
      for (let i = 0; i < chord.length; i += 1) {
        const semitone = chord[i];
        playTone(toFrequency(track.root, semitone), time, {
          duration: chordDuration,
          gain: 0.08,
          wave: "triangle",
          filter: 900 + i * 420,
          pan: -0.25 + i * 0.25,
          release: 0.12
        });
      }
    }

    if (step16 % 2 === 0) {
      const bassSemitone = track.bass[(Math.floor(step16 / 2)) % track.bass.length] - 12;
      playTone(toFrequency(track.root, bassSemitone), time, {
        duration: stepDuration * 1.8,
        gain: 0.14,
        wave: "sawtooth",
        filter: 500,
        release: 0.08
      });
    }

    if (step16 % 2 === 1) {
      const leadSemitone = track.lead[(Math.floor(step16 / 2)) % track.lead.length];
      playTone(toFrequency(track.root, leadSemitone), time, {
        duration: stepDuration * 0.95,
        gain: 0.095,
        wave: "square",
        filter: 2200,
        pan: step16 < 8 ? -0.14 : 0.16,
        attack: 0.002,
        release: 0.06
      });
    }
  }

  function getCurrentTrack() {
    return TRACKS[state.track] || TRACKS.neonDrive;
  }

  function schedulerTick() {
    if (!running) return;
    const ctx = getContext();
    const track = getCurrentTrack();
    const stepDuration = (60 / track.bpm) / 4;
    while (nextStepTime < ctx.currentTime + 0.15) {
      renderStep(track, stepIndex, nextStepTime, stepDuration);
      stepIndex = (stepIndex + 1) % 64;
      nextStepTime += stepDuration;
    }
  }

  function startPlayback() {
    unlockAudio();
    if (running) return;
    running = true;
    stepIndex = 0;
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
      stepIndex = 0;
      nextStepTime = getContext().currentTime + 0.04;
    }
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

  function injectStyles() {
    if (document.getElementById("arcade-bgm-style")) return;
    const style = document.createElement("style");
    style.id = "arcade-bgm-style";
    style.textContent = `
      #arcade-bgm {
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 9999;
        width: min(320px, calc(100vw - 20px));
        border-radius: 14px;
        border: 1px solid rgba(112, 182, 255, 0.32);
        background: linear-gradient(145deg, rgba(10, 18, 34, 0.88), rgba(20, 14, 40, 0.82));
        backdrop-filter: blur(8px);
        box-shadow: 0 12px 36px rgba(3, 8, 17, 0.55);
        color: #e9f4ff;
        font-family: "Segoe UI", "Inter", Arial, sans-serif;
        padding: 12px;
      }
      #arcade-bgm .bgm-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
      }
      #arcade-bgm .bgm-title {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        color: #7fe4ff;
      }
      #arcade-bgm .bgm-badge {
        font-size: 11px;
        color: #c8d6ea;
        opacity: 0.9;
      }
      #arcade-bgm .bgm-row {
        display: grid;
        grid-template-columns: 56px 1fr;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      #arcade-bgm label {
        font-size: 12px;
        color: #bdd0e7;
      }
      #arcade-bgm select,
      #arcade-bgm input[type="range"] {
        width: 100%;
      }
      #arcade-bgm select {
        border-radius: 8px;
        border: 1px solid rgba(126, 168, 255, 0.42);
        background: rgba(8, 13, 24, 0.9);
        color: #e7f3ff;
        padding: 7px 9px;
        font-size: 13px;
      }
      #arcade-bgm input[type="range"] {
        accent-color: #79daff;
      }
      #arcade-bgm .bgm-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      #arcade-bgm button {
        border: 1px solid rgba(124, 205, 255, 0.42);
        background: linear-gradient(90deg, #6be1ff, #b997ff);
        color: #0a1530;
        border-radius: 999px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }
      #arcade-bgm button:hover {
        filter: brightness(1.05);
      }
      @media (max-width: 640px) {
        #arcade-bgm {
          right: 10px;
          left: 10px;
          width: auto;
          bottom: 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderUiState() {
    if (!rootEl) return;
    if (toggleButton) {
      toggleButton.textContent = state.enabled ? "Pause Music" : "Play Music";
    }
    if (trackSelect) {
      trackSelect.value = state.track;
      trackSelect.disabled = !state.enabled;
    }
    if (volumeRange) {
      volumeRange.value = String(Math.round(state.volume * 100));
      volumeRange.disabled = !state.enabled;
    }
    rootEl.dataset.running = running ? "true" : "false";
  }

  function mountUi() {
    if (document.getElementById("arcade-bgm")) return;

    rootEl = document.createElement("section");
    rootEl.id = "arcade-bgm";
    rootEl.setAttribute("aria-label", "Background music controls");

    const options = TRACK_IDS
      .map((id) => `<option value="${id}">${TRACKS[id].name}</option>`)
      .join("");
    rootEl.innerHTML = `
      <div class="bgm-head">
        <div class="bgm-title">Background Music</div>
        <div class="bgm-badge">Synth Arcade</div>
      </div>
      <div class="bgm-row">
        <label for="arcade-bgm-track">Track</label>
        <select id="arcade-bgm-track">${options}</select>
      </div>
      <div class="bgm-row">
        <label for="arcade-bgm-volume">Volume</label>
        <input id="arcade-bgm-volume" type="range" min="0" max="100" step="1" />
      </div>
      <div class="bgm-actions">
        <button id="arcade-bgm-toggle" type="button"></button>
        <span class="bgm-badge">Saved across games</span>
      </div>
    `;

    document.body.appendChild(rootEl);

    toggleButton = document.getElementById("arcade-bgm-toggle");
    trackSelect = document.getElementById("arcade-bgm-track");
    volumeRange = document.getElementById("arcade-bgm-volume");

    toggleButton.addEventListener("click", () => setEnabled(!state.enabled));
    trackSelect.addEventListener("change", (event) => {
      changeTrack(event.target.value);
    });
    volumeRange.addEventListener("input", (event) => {
      const value = Number(event.target.value) / 100;
      setVolume(value);
    });

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
    setVolume
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

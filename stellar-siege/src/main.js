// ============================================================================
//  STELLAR SIEGE — entry point. Lobby flow, shared-seed sim, lockstep loop.
// ============================================================================
import { Sim } from './sim.js';
import { Net, Lockstep, makeRoomCode } from './net.js';
import { Renderer } from './render.js';
import { Hud } from './hud.js';
import { Input } from './input.js';
import * as Audio from './audio.js';

const $ = (id) => document.getElementById(id);
const audio = {
  playSound: (n, o) => Audio.playSound(n, o),
  init: () => Audio.initAudio(),
};

let net = null;
let lockstep = null;
let netBuffer = [];
let started = false;

// Route ALL incoming net data through one dispatcher (handles lobby + game).
function onNetData(d) {
  if (d && d.type === 'start') { if (!started) startGame(d.seed, 1, { net, solo: false }); return; }
  if (lockstep) lockstep.onRemote(d);
  else netBuffer.push(d);
}

// --------------------------------------------------------------------------
//  Lobby
// --------------------------------------------------------------------------
function setMenuMsg(t, bad) { const e = $('menu-msg'); e.textContent = t || ''; e.className = 'menu-msg' + (bad ? ' bad' : ''); }

function doHost() {
  audio.init();
  const code = makeRoomCode();
  const seed = (Math.random() * 0xffffffff) >>> 0;
  net = new Net();
  net.onData = onNetData;
  net.onStatus = (state, info) => {
    if (state === 'waiting') { $('code-display').textContent = code; $('host-wait').style.display = 'block'; setMenuMsg('Share this code with your opponent.'); }
    else if (state === 'connected') { setMenuMsg('Opponent connected — launching…'); net.send({ type: 'start', seed }); startGame(seed, 0, { net, solo: false }); }
    else if (state === 'error') setMenuMsg('Network error: ' + info + ' (try again)', true);
  };
  net.host(code);
  setMenuMsg('Creating room…');
}

function doJoin() {
  audio.init();
  const code = ($('join-code').value || '').trim().toUpperCase();
  if (code.length < 4) { setMenuMsg('Enter the room code first.', true); return; }
  net = new Net();
  net.onData = onNetData;
  net.onStatus = (state, info) => {
    if (state === 'joining') setMenuMsg('Connecting to ' + code + '…');
    else if (state === 'connected') setMenuMsg('Connected — waiting for host…');
    else if (state === 'error') setMenuMsg('Could not reach room ' + code + ' (' + info + ')', true);
    else if (state === 'closed') setMenuMsg('Connection closed.', true);
  };
  net.join(code);
}

function doPractice() {
  audio.init();
  const seed = (Math.random() * 0xffffffff) >>> 0;
  startGame(seed, 0, { net: null, solo: true });
}

// --------------------------------------------------------------------------
//  Game
// --------------------------------------------------------------------------
function startGame(seed, localPlayer, { net: n, solo }) {
  if (started) return;
  started = true;
  net = n;
  $('menu').style.display = 'none';
  $('hud').style.display = 'block';
  Audio.initAudio(); Audio.startAmbient();

  const sim = new Sim(seed);
  lockstep = new Lockstep(sim, {
    localPlayer, solo,
    send: net ? (m) => net.send(m) : null,
    onDesync: (t) => hud.alert('Desync detected at turn ' + t + ' — match may diverge', 'bad'),
    onStall: (s) => hud.setStatus(s ? 'Waiting for opponent…' : '', s ? 'warn' : ''),
  });
  // flush any turn packets that arrived before we were ready
  for (const d of netBuffer) lockstep.onRemote(d);
  netBuffer = [];
  if (net) net.onData = onNetData;

  const renderer = new Renderer($('game'), sim, localPlayer);
  const hud = new Hud($('hud'), localPlayer);
  const input = new Input({ renderer, sim, hud, lockstep, localPlayer, audio });
  input.attach();

  // handle mid-game disconnect: keep playing solo
  if (net) {
    const prevStatus = net.onStatus;
    net.onStatus = (state, info) => {
      if (state === 'closed' || state === 'error') { hud.alert('Opponent disconnected', 'warn'); lockstep.setSolo(true); }
    };
  }

  const hq = sim.buildings.find(b => b.owner === localPlayer && b.kind === 'hq');
  if (hq) renderer.focusOn(hq.x, hq.z);

  window.__game = { sim, lockstep, renderer, hud, input, localPlayer };

  hud.alert('Build workers, expand, and crush the enemy base!', 'info');

  let last = performance.now();
  let ended = false;
  let lastAtkSnd = 0;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    lockstep.update(dt);

    const events = sim.drainEvents();
    renderer.handleEvents(events);
    for (const ev of events) {
      if (ev.t === 'fire') { if (now - lastAtkSnd > 55) { audio.playSound('attack', { volume: 0.5 }); lastAtkSnd = now; } }
      else if (ev.t === 'death') audio.playSound(ev.big ? 'explosion' : 'death', { volume: ev.big ? 1 : 0.6 });
      else if (ev.t === 'complete' && ev.owner === localPlayer) { audio.playSound('complete'); hud.alert(sim.byId.get(ev.id) ? '' : '', 'info'); }
      else if (ev.t === 'spawn' && ev.owner === localPlayer) audio.playSound('build', { volume: 0.4 });
      else if (ev.t === 'denied' && ev.owner === localPlayer) { hud.alert(ev.msg, 'bad'); audio.playSound('error'); }
      else if (ev.t === 'eliminated' && ev.owner !== localPlayer) hud.alert('Enemy eliminated!', 'info');
    }

    input.update(dt);
    renderer.frame(dt, now / 1000);
    hud.updateResources(sim.players[localPlayer]);
    hud.drawMinimap(sim, renderer);

    if (sim.winner !== null && !ended) {
      ended = true;
      audio.playSound(sim.winner === localPlayer ? 'complete' : 'death');
      hud.showResult(sim.winner === localPlayer);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// --------------------------------------------------------------------------
//  Wire menu buttons
// --------------------------------------------------------------------------
addEventListener('DOMContentLoaded', () => {
  $('btn-host').addEventListener('click', doHost);
  $('btn-join').addEventListener('click', doJoin);
  $('btn-practice').addEventListener('click', doPractice);
  $('join-code').addEventListener('keydown', (e) => { if (e.key === 'Enter') doJoin(); });
  if (!window.Peer) setMenuMsg('Loading network library…');
});

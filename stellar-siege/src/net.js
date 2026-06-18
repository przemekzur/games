// ============================================================================
//  Networking — PeerJS WebRTC transport + deterministic lockstep scheduler.
//  No server: signaling via the free public PeerJS cloud broker, then P2P.
//  Both peers run the identical Sim; only compact command packets cross the wire.
// ============================================================================
import { SIM_DT } from './config.js';

const ROOM_PREFIX = 'stsg-';                 // namespaces our peer ids on the broker
const TURN_TICKS = 4;                        // sim ticks per lockstep turn (5 turns/s)
const TURN_DELAY = 2;                        // turns of input latency (~400ms)
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function makeRoomCode(rng) {
  let s = '';
  for (let i = 0; i < 5; i++) s += CODE_CHARS[Math.floor((rng ? rng() : Math.random()) * CODE_CHARS.length)];
  return s;
}

// --- WebRTC transport --------------------------------------------------------
export class Net {
  constructor() {
    this.peer = null;
    this.conn = null;
    this.onData = () => {};
    this.onStatus = () => {};   // (state, info)
    this.connected = false;
    this.isHost = false;
    this.code = null;
  }

  _newPeer(id) {
    if (!window.Peer) throw new Error('PeerJS not loaded');
    return id ? new window.Peer(id, { debug: 1 }) : new window.Peer({ debug: 1 });
  }

  host(code) {
    this.isHost = true;
    this.code = code;
    this.onStatus('hosting', code);
    this.peer = this._newPeer(ROOM_PREFIX + code);
    this.peer.on('open', () => this.onStatus('waiting', code));
    this.peer.on('error', (e) => this.onStatus('error', e.type || String(e)));
    this.peer.on('connection', (conn) => { this._bind(conn); });
  }

  join(code) {
    this.isHost = false;
    this.code = code;
    this.onStatus('joining', code);
    this.peer = this._newPeer();
    this.peer.on('open', () => {
      const conn = this.peer.connect(ROOM_PREFIX + code, { reliable: true });
      this._bind(conn);
    });
    this.peer.on('error', (e) => this.onStatus('error', e.type || String(e)));
  }

  _bind(conn) {
    this.conn = conn;
    conn.on('open', () => { this.connected = true; this.onStatus('connected', this.code); });
    conn.on('data', (d) => this.onData(d));
    conn.on('close', () => { this.connected = false; this.onStatus('closed'); });
    conn.on('error', (e) => this.onStatus('error', e.type || String(e)));
  }

  send(obj) { if (this.conn && this.connected) { try { this.conn.send(obj); } catch (_) {} } }
  close() { try { this.conn && this.conn.close(); } catch (_) {} try { this.peer && this.peer.destroy(); } catch (_) {} }
}

// --- Lockstep scheduler ------------------------------------------------------
// Groups sim ticks into turns; a turn runs only once BOTH peers' command packets
// for that turn have arrived. Commands are sealed TURN_DELAY turns ahead.
export class Lockstep {
  constructor(sim, opts) {
    this.sim = sim;
    this.localPlayer = opts.localPlayer;          // 0 or 1
    this.solo = !!opts.solo;
    this.send = opts.send || (() => {});
    this.onDesync = opts.onDesync || (() => {});
    this.onStall = opts.onStall || (() => {});

    this.local = new Map();          // turn -> local player's commands
    this.remote = new Map();         // turn -> remote player's commands
    this.localChk = new Map();       // turn -> our checksum at seal time
    this.turn = 0;                   // turn currently executing
    this.tickInTurn = 0;
    this.sealTurn = 0;               // next turn index to seal
    this.pending = [];               // commands accumulating for the next seal
    this.acc = 0;
    this.stalled = false;
    this.desynced = false;

    for (let t = 0; t < TURN_DELAY; t++) this._seal(); // bootstrap empty turns
  }

  setSolo(v) {
    this.solo = v;
    if (v) { // fill any missing remote turns so we never stall again
      for (let t = this.turn; t <= this.sealTurn; t++) if (!this.remote.has(t)) this.remote.set(t, []);
    }
  }

  queue(cmd) { cmd.owner = this.localPlayer; this.pending.push(cmd); }

  _seal() {
    const t = this.sealTurn++;
    const cmds = this.pending; this.pending = [];
    this.local.set(t, cmds);
    this.localChk.set(t, this.sim.checksum());
    if (this.solo) this.remote.set(t, []);
    else this.send({ type: 'turn', turn: t, cmds, checksum: this.localChk.get(t) });
  }

  onRemote(msg) {
    if (!msg || msg.type !== 'turn') return;
    this.remote.set(msg.turn, msg.cmds || []);
    // desync check against our own sealed checksum for that turn
    if (this.localChk.has(msg.turn) && this.localChk.get(msg.turn) !== msg.checksum && !this.desynced) {
      this.desynced = true; this.onDesync(msg.turn);
    }
  }

  _canRun() { return this.local.has(this.turn) && this.remote.has(this.turn); }

  update(dt) {
    if (this.sim.winner !== null) return;
    this.acc += dt;
    let guard = 0;
    while (this.acc >= SIM_DT && guard++ < 12) {
      if (this.tickInTurn === 0) {
        if (!this._canRun()) { this.stalled = true; this.onStall(true); break; }
        if (this.stalled) { this.stalled = false; this.onStall(false); }
        for (const c of this.local.get(this.turn)) this.sim.applyCommand(c);
        for (const c of this.remote.get(this.turn)) this.sim.applyCommand(c);
      }
      this.sim.step();
      this.tickInTurn++;
      this.acc -= SIM_DT;
      if (this.tickInTurn >= TURN_TICKS) {
        // free old maps
        this.local.delete(this.turn); this.remote.delete(this.turn); this.localChk.delete(this.turn);
        this.tickInTurn = 0; this.turn++;
        this._seal();
      }
      if (this.sim.winner !== null) break;
    }
    if (this.acc > 0.5) this.acc = 0.5; // avoid spiral of death while stalled
  }
}

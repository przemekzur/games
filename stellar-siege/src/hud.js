// ============================================================================
//  HUD — in-game DOM overlay: resources, command card, selection, minimap.
//  Pure view. main.js feeds it data and listens to hud.onAction / hud.onMinimap.
// ============================================================================
import { MAP_W, MAP_H, WORLD_W, WORLD_H, FACTIONS } from './config.js';

const el = (tag, cls, parent) => { const e = document.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; };

export class Hud {
  constructor(root, localPlayer) {
    this.root = root;
    this.localPlayer = localPlayer;
    this.onAction = () => {};
    this.onMinimap = () => {};
    this._build();
  }

  _build() {
    // top resource bar
    const top = el('div', 'hud-top', this.root);
    this.elMin = this._res(top, '◆', 'min', '#7fd0ff');
    this.elGas = this._res(top, '❖', 'gas', '#7fe6a0');
    this.elSup = this._res(top, '▣', 'sup', '#ffd27f');
    const spacer = el('div', 'hud-spacer', top);
    this.elStatus = el('div', 'hud-status', top);
    // audio mute toggle
    this.onMute = () => {};
    this.muted = false;
    this.elMute = el('button', 'hud-mute', top);
    this.elMute.innerHTML = '<span>♪</span>';
    this.elMute.title = 'Mute audio (M)';
    this.elMute.addEventListener('click', () => this.toggleMute());

    // bottom command panel
    const bottom = el('div', 'hud-bottom', this.root);
    // minimap
    const mmWrap = el('div', 'hud-minimap', bottom);
    this.minimap = el('canvas', 'mm-canvas', mmWrap);
    this.minimap.width = 220; this.minimap.height = 220;
    this.mmctx = this.minimap.getContext('2d');
    const mmEvt = (e, btn) => {
      const r = this.minimap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * WORLD_W;
      const z = ((e.clientY - r.top) / r.height) * WORLD_H;
      this.onMinimap(x, z, btn);
    };
    this.minimap.addEventListener('mousedown', (e) => { e.preventDefault(); mmEvt(e, e.button); });
    this.minimap.addEventListener('contextmenu', (e) => e.preventDefault());

    // selection panel
    const sel = el('div', 'hud-select', bottom);
    this.selTitle = el('div', 'sel-title', sel);
    this.selBody = el('div', 'sel-body', sel);

    // command card (3x4 grid)
    const card = el('div', 'hud-card', bottom);
    this.cardBtns = [];
    for (let i = 0; i < 12; i++) {
      const b = el('button', 'card-btn', card);
      b.addEventListener('click', () => { const a = b._action; if (a && !a.disabled) this.onAction(a.id, a.payload); });
      b.addEventListener('mouseenter', () => this._tip(b));
      b.addEventListener('mouseleave', () => this._hideTip());
      this.cardBtns.push(b);
    }
    this.tipEl = el('div', 'hud-tip', this.root);
    this.tipEl.style.display = 'none';

    // alert line
    this.alertEl = el('div', 'hud-alert', this.root);

    // result banner
    this.resultEl = el('div', 'hud-result', this.root);
    this.resultEl.style.display = 'none';
  }

  _res(parent, icon, key, color) {
    const w = el('div', 'res', parent);
    const i = el('span', 'res-ic', w); i.textContent = icon; i.style.color = color;
    const v = el('span', 'res-v', w); v.textContent = '0';
    w._v = v; return w;
  }

  updateResources(p) {
    this.elMin._v.textContent = Math.floor(p.minerals);
    this.elGas._v.textContent = Math.floor(p.gas);
    this.elSup._v.textContent = `${p.supplyUsed}/${p.supplyMax}`;
    this.elSup.classList.toggle('res-cap', p.supplyUsed >= p.supplyMax && p.supplyMax > 0);
  }

  toggleMute() {
    this.muted = !this.muted;
    this.elMute.classList.toggle('muted', this.muted);
    this.elMute.innerHTML = this.muted ? '<span>♪</span>' : '<span>♪</span>';
    this.onMute(this.muted);
  }

  setStatus(text, kind) {
    this.elStatus.textContent = text || '';
    this.elStatus.className = 'hud-status' + (kind ? ' ' + kind : '');
  }

  // selection: { count, title, members:[{kind,name,hp,maxHp,color}], queue:[{kind,frac}] }
  setSelection(info) {
    this.selTitle.textContent = info.title || '';
    this.selBody.innerHTML = '';
    if (info.queue && info.queue.length) {
      const q = el('div', 'sel-queue', this.selBody);
      info.queue.forEach((it, i) => {
        const c = el('div', 'qchip', q);
        c.textContent = it.label;
        const bar = el('i', '', c); bar.style.width = Math.round((it.frac || 0) * 100) + '%';
        if (i === 0) c.classList.add('qactive');
      });
    }
    if (info.members) {
      const grid = el('div', 'sel-grid', this.selBody);
      for (const m of info.members.slice(0, 24)) {
        const chip = el('div', 'uchip', grid);
        chip.style.borderColor = m.color || '#456';
        const frac = Math.max(0, m.hp / m.maxHp);
        const hb = el('i', 'uchip-hp', chip);
        hb.style.width = Math.round(frac * 100) + '%';
        hb.style.background = frac > 0.5 ? '#55ff77' : frac > 0.25 ? '#ffcc44' : '#ff5555';
        chip.title = `${m.name} ${Math.ceil(m.hp)}/${m.maxHp}`;
        chip.textContent = (m.name || '?')[0];
      }
    }
  }

  // actions: array up to 12 of {id,label,hot,cost,disabled,tip,payload,accent} (null = empty slot)
  setCommandCard(actions) {
    for (let i = 0; i < 12; i++) {
      const b = this.cardBtns[i];
      const a = actions[i];
      b._action = a || null;
      if (!a) { b.style.display = 'none'; b.className = 'card-btn'; b.innerHTML = ''; continue; }
      b.style.display = '';
      b.className = 'card-btn' + (a.disabled ? ' disabled' : '') + (a.active ? ' active' : '');
      const cost = a.cost ? `<span class="cb-cost">${a.cost.minerals || 0}${a.cost.gas ? '<i>·' + a.cost.gas + '</i>' : ''}</span>` : '';
      b.innerHTML = `<span class="cb-label">${a.label}</span>${cost}` + (a.hot ? `<span class="cb-hot">${a.hot}</span>` : '');
      if (a.accent) b.style.setProperty('--cb-accent', a.accent);
    }
  }

  _tip(b) {
    const a = b._action; if (!a || !a.tip) { this._hideTip(); return; }
    let html = `<b>${a.name || a.label}</b>`;
    if (a.cost) html += ` <span class="tip-cost">◆${a.cost.minerals || 0}${a.cost.gas ? ' ❖' + a.cost.gas : ''}</span>`;
    html += `<br>${a.tip}`;
    this.tipEl.innerHTML = html;
    const r = b.getBoundingClientRect();
    this.tipEl.style.display = 'block';
    this.tipEl.style.left = Math.min(r.left, innerWidth - 240) + 'px';
    this.tipEl.style.top = (r.top - this.tipEl.offsetHeight - 8) + 'px';
  }
  _hideTip() { this.tipEl.style.display = 'none'; }

  alert(text, kind = 'warn') {
    this.alertEl.textContent = text;
    this.alertEl.className = 'hud-alert show ' + kind;
    clearTimeout(this._alertT);
    this._alertT = setTimeout(() => { this.alertEl.className = 'hud-alert'; }, 2600);
  }

  showResult(win) {
    this.resultEl.style.display = 'flex';
    this.resultEl.innerHTML = `<div class="result-card ${win ? 'win' : 'lose'}">
      <h1>${win ? 'VICTORY' : 'DEFEAT'}</h1>
      <p>${win ? 'Enemy forces eliminated.' : 'Your colony has fallen.'}</p>
      <button onclick="location.reload()">Play again</button></div>`;
  }

  // ----- minimap -----------------------------------------------------------
  drawMinimap(sim, renderer) {
    const ctx = this.mmctx, W = this.minimap.width, H = this.minimap.height;
    const sx = W / WORLD_W, sz = H / WORLD_H;
    ctx.fillStyle = '#05080c'; ctx.fillRect(0, 0, W, H);
    // explored terrain
    const img = this._mmImg || (this._mmImg = ctx.createImageData(MAP_W, MAP_H));
    const d = img.data;
    for (let i = 0; i < MAP_W * MAP_H; i++) {
      const e = renderer.explored[i], v = renderer.vis[i];
      let r = 12, g = 22, bl = 30;
      if (e) { r = 26; g = 42; bl = 52; }
      if (v) { r = 34; g = 56; bl = 66; }
      d[i * 4] = r; d[i * 4 + 1] = g; d[i * 4 + 2] = bl; d[i * 4 + 3] = 255;
    }
    if (!this._mmCanvas) { this._mmCanvas = document.createElement('canvas'); this._mmCanvas.width = MAP_W; this._mmCanvas.height = MAP_H; this._mmc = this._mmCanvas.getContext('2d'); }
    this._mmc.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this._mmCanvas, 0, 0, W, H);

    // resources
    for (const r of sim.resources) {
      if (r.amount <= 0 || !renderer.explored[renderer._cellIndex(r.x, r.z)]) continue;
      ctx.fillStyle = r.kind === 'gas' ? '#3fa66a' : '#5fa8d8';
      ctx.fillRect(r.x * sx - 1, r.z * sz - 1, 3, 3);
    }
    // buildings
    for (const b of sim.buildings) {
      const visible = b.owner === this.localPlayer || renderer.fogVisibleAt(b.x, b.z) || renderer.explored[renderer._cellIndex(b.x, b.z)];
      if (!visible) continue;
      if (b.owner !== this.localPlayer && !renderer.fogVisibleAt(b.x, b.z)) continue;
      ctx.fillStyle = '#' + FACTIONS[b.owner].primary.toString(16).padStart(6, '0');
      const s = Math.max(3, b.footprint * sx);
      ctx.fillRect(b.x * sx - s / 2, b.z * sz - s / 2, s, s);
    }
    // units
    for (const u of sim.units) {
      if (u.owner !== this.localPlayer && !renderer.fogVisibleAt(u.x, u.z)) continue;
      ctx.fillStyle = u.owner === this.localPlayer ? '#9fe8ff' : '#ff8a7a';
      ctx.fillRect(u.x * sx - 1, u.z * sz - 1, 2.5, 2.5);
    }
    // camera viewport
    const f = renderer.camFocus;
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5;
    const vw = renderer.camDist * 0.62, vh = renderer.camDist * 0.42;
    ctx.strokeRect((f.x - vw / 2) * sx, (f.z - vh / 2) * sz, vw * sx, vh * sz);
  }
}

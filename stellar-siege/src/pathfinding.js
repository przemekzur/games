// Deterministic grid A* pathfinding + helpers for unit steering.
// Obstacle grid is rebuilt by the sim whenever buildings/resources change.
import { MAP_W, MAP_H, TILE } from './config.js';

export function worldToCell(x, z) {
  return [Math.floor(x / TILE), Math.floor(z / TILE)];
}
export function cellCenter(cx, cz) {
  return { x: (cx + 0.5) * TILE, z: (cz + 0.5) * TILE };
}
export function inBounds(cx, cz) {
  return cx >= 0 && cz >= 0 && cx < MAP_W && cz < MAP_H;
}

// grid: Uint8Array length MAP_W*MAP_H, 1 = blocked.
export function makeGrid() { return new Uint8Array(MAP_W * MAP_H); }
export const idx = (cx, cz) => cz * MAP_W + cx;

// Find nearest non-blocked cell to (cx,cz) via expanding ring (deterministic).
export function nearestOpen(grid, cx, cz) {
  if (inBounds(cx, cz) && !grid[idx(cx, cz)]) return [cx, cz];
  for (let r = 1; r < 24; r++) {
    for (let dz = -r; dz <= r; dz++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const nx = cx + dx, nz = cz + dz;
        if (inBounds(nx, nz) && !grid[idx(nx, nz)]) return [nx, nz];
      }
    }
  }
  return [cx, cz];
}

const SQRT2 = 1.41421356;

// A* returning a list of world-space waypoints {x,z}, or null if unreachable.
// Treats start/goal leniently (snaps to nearest open cell). Deterministic.
export function findPath(grid, sx, sz, tx, tz) {
  let [scx, scz] = worldToCell(sx, sz);
  let [gcx, gcz] = worldToCell(tx, tz);
  [scx, scz] = nearestOpen(grid, scx, scz);
  [gcx, gcz] = nearestOpen(grid, gcx, gcz);
  if (scx === gcx && scz === gcz) return [{ x: tx, z: tz }];

  const N = MAP_W * MAP_H;
  const gScore = new Float32Array(N).fill(Infinity);
  const fScore = new Float32Array(N).fill(Infinity);
  const came = new Int32Array(N).fill(-1);
  const closed = new Uint8Array(N);
  const startI = idx(scx, scz), goalI = idx(gcx, gcz);
  gScore[startI] = 0;
  const h = (cx, cz) => {
    const dx = Math.abs(cx - gcx), dz = Math.abs(cz - gcz);
    return (dx + dz) + (SQRT2 - 2) * Math.min(dx, dz);
  };
  fScore[startI] = h(scx, scz);

  // Binary min-heap of cell indices keyed by fScore.
  const heap = [startI];
  const heapPush = (i) => {
    heap.push(i); let c = heap.length - 1;
    while (c > 0) {
      const p = (c - 1) >> 1;
      if (fScore[heap[p]] <= fScore[heap[c]]) break;
      [heap[p], heap[c]] = [heap[c], heap[p]]; c = p;
    }
  };
  const heapPop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last; let c = 0;
      for (;;) {
        const l = 2 * c + 1, r = l + 1; let s = c;
        if (l < heap.length && fScore[heap[l]] < fScore[heap[s]]) s = l;
        if (r < heap.length && fScore[heap[r]] < fScore[heap[s]]) s = r;
        if (s === c) break;
        [heap[s], heap[c]] = [heap[c], heap[s]]; c = s;
      }
    }
    return top;
  };

  let found = false, guard = 0;
  const NB = [[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,SQRT2],[1,-1,SQRT2],[-1,1,SQRT2],[-1,-1,SQRT2]];
  while (heap.length && guard++ < 20000) {
    const cur = heapPop();
    if (cur === goalI) { found = true; break; }
    if (closed[cur]) continue;
    closed[cur] = 1;
    const ccx = cur % MAP_W, ccz = (cur / MAP_W) | 0;
    for (let n = 0; n < 8; n++) {
      const dx = NB[n][0], dz = NB[n][1];
      const nx = ccx + dx, nz = ccz + dz;
      if (!inBounds(nx, nz)) continue;
      const ni = idx(nx, nz);
      if (grid[ni] || closed[ni]) continue;
      // Prevent cutting through diagonal wall corners.
      if (dx !== 0 && dz !== 0) {
        if (grid[idx(ccx + dx, ccz)] || grid[idx(ccx, ccz + dz)]) continue;
      }
      const tentative = gScore[cur] + NB[n][2];
      if (tentative < gScore[ni]) {
        came[ni] = cur;
        gScore[ni] = tentative;
        fScore[ni] = tentative + h(nx, nz);
        heapPush(ni);
      }
    }
  }
  if (!found) return null;

  // Reconstruct + simplify collinear runs into waypoints.
  const cells = [];
  for (let c = goalI; c !== -1; c = came[c]) cells.push(c);
  cells.reverse();
  const pts = [];
  for (let i = 0; i < cells.length; i++) {
    const cx = cells[i] % MAP_W, cz = (cells[i] / MAP_W) | 0;
    pts.push(cellCenter(cx, cz));
  }
  // Collapse straight segments.
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    if (i === 0 || i === pts.length - 1) { out.push(pts[i]); continue; }
    const a = pts[i - 1], b = pts[i], c = pts[i + 1];
    const dax = b.x - a.x, daz = b.z - a.z, dbx = c.x - b.x, dbz = c.z - b.z;
    if (dax * dbz - daz * dbx !== 0) out.push(b); // keep only turns
  }
  // Replace final waypoint with exact requested target.
  out[out.length - 1] = { x: tx, z: tz };
  return out;
}

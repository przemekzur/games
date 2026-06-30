# 🕹️ Arcade Hub

A collection of browser games behind one launcher page, hosted on GitHub Pages.

**▶ Play it live: https://przemekzur.github.io/games/**

## Games

| Game | Type | Tech |
|---|---|---|
| [Asteroids](asteroids/) | Arcade shooter | Vanilla JS / Canvas |
| [Mortal Combat 1: Neo Exchange](mortal-combat-1/) | Fighting | Vanilla JS / Canvas |
| [DOOM](doom/) | Retro raycasting FPS | Vanilla JS / Canvas |
| [Snake: Childhood Remix](snake/) | Arcade classic | Vanilla JS / Canvas |
| [Pong: Neon Rally](pong/) | Arcade duel | Vanilla JS / Canvas |
| [Breakout: Prism Crash](breakout/) | Arcade action | Vanilla JS / Canvas |
| [River Raid](river-raid/) | Vertical shooter | Vanilla JS / Canvas |
| [Fintech Heroes: Ledger of Dominion](fintech-heroes/) | Turn strategy RPG | Vanilla JS |
| [Echoes of the Hollow Crown](hollow-crown/) | Action RPG | Vanilla JS / Canvas |
| [Space Invaders: Neon Siege](space-invaders/) | Arcade shooter | Vanilla JS / Canvas |
| [Star Trek Voyager — Journey Home](voyager-game/) | 3D space strategy | Three.js + Vite |
| [Star Trek Voyager — Definitive Edition](voyager-game-v2/) | 3D space strategy | Three.js + Vite |
| [Red Frontier — The Long Launch](red-frontier-earth/) | Narrative prequel / campaign bridge | Vanilla JS |
| [Red Frontier — Mars Colony](mars-colony/) | 3D colony / terraforming strategy | Three.js (CDN) |
| [Jetpack Rush: Neon Run](jetpack-rush/) | Endless runner | Vanilla JS / Canvas |
| [Stellar Siege](stellar-siege/) | 3D multiplayer RTS (StarCraft-like) | Three.js (CDN) + PeerJS lockstep |
| [Grass Frenzy](grass-frenzy/) | Casual arcade | Vanilla JS / Canvas |
| [Loop](loop/) | Thinking puzzle | Vanilla JS / Canvas |

Most games are plain HTML/JS — open their folder's `index.html` or serve the repo
root with any static server. The two Voyager games are Vite projects; see their
folders for `npm run dev` instructions ([voyager-game-v2/README.md](voyager-game-v2/README.md)
documents what's new in the Definitive Edition).

## Running locally

```bash
# the hub + all static games
npx serve .          # then open http://localhost:3000

# a Voyager game (dev server with hot reload)
cd voyager-game-v2
npm install
npm run dev
```

## Deployment

Every push to `main` triggers [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml),
which builds both Voyager games with Vite, bundles them with the static games and
the hub page, and publishes everything to GitHub Pages. You never commit build
output — `dist/` folders are gitignored.

## 🤝 Contributing

Contributions are welcome — bug fixes, new features for existing games, or even
a whole new game cabinet for the hub.

### How it works

`main` is protected: it can't be deleted or force-pushed, and changes land only
through pull requests. The flow:

1. **Fork** this repo and clone your fork.
2. **Create a branch** for your change:
   ```bash
   git checkout -b feat/my-improvement
   ```
3. **Make your change** and test it locally (see *Running locally* above).
   - For static games: just open the game in a browser.
   - For the Voyager games: `npm run dev` to test, and make sure `npm run build` still passes.
4. **Push to your fork** and **open a Pull Request** against `main`.
5. A maintainer reviews and approves — once merged, the site auto-deploys.

### Adding a new game

1. Create a new top-level folder (kebab-case, e.g. `my-game/`) with an `index.html` entry point.
2. Add a card for it in the hub's [index.html](index.html) (copy an existing `<article class="card">` block).
3. If your game needs a build step, add the build + copy steps to
   [deploy-pages.yml](.github/workflows/deploy-pages.yml) the same way the Voyager games are handled.

### Ground rules

- Keep games self-contained in their own folder — shared code goes in [shared/](shared/).
- No build output in commits (`dist/`, `node_modules/` are gitignored).
- Match the style of the code you're touching.
- Be excellent to each other in issues and reviews.

Found a bug but don't want to fix it yourself? [Open an issue](https://github.com/przemekzur/games/issues) —
include the game, what happened, and your browser.

# Design

Visual system for the Arcade Hub launcher. Register: brand. Lane: repertory-cinema programme, warm printed stock with framed dark posters. Deliberately not the neon-on-black gamer reflex.

## Theme

Light. The page is a printed programme on warm bone stock under gallery light; the 18 animated SVG covers are dark framed posters hung on it. Depth comes from the art and from hairline rules and restrained shadow, never from glow or glass.

## Color (OKLCH)

Strategy: restrained-committed. Bone + ink carry ~90% of the surface; one theatrical vermilion is the single accent, used rarely so it stays loud. Neutrals are tinted warm (hue ~75) toward the paper, never pure gray or `#000`.

- `--paper`     `oklch(0.962 0.010 78)` page background (warm bone)
- `--paper-2`   `oklch(0.930 0.014 78)` recessed bands, inset frames
- `--paper-3`   `oklch(0.890 0.016 78)` poster matte behind art
- `--ink`       `oklch(0.215 0.018 60)` primary text, wordmark (warm near-black)
- `--ink-2`     `oklch(0.380 0.022 62)` secondary text, loglines
- `--ink-3`     `oklch(0.520 0.020 64)` mono metadata, captions (passes 4.5:1 on paper)
- `--rule`      `oklch(0.840 0.014 78)` hairline rules and frames
- `--accent`    `oklch(0.555 0.190 31)` vermilion: marquee kicker, active filter, enter arrows
- `--accent-ink``oklch(0.470 0.180 31)` vermilion for small text / on hover (passes 4.5:1)

Contrast intent: ink/paper ≈ 13:1, ink-2/paper ≈ 7:1, ink-3/paper ≈ 4.6:1, accent-ink/paper ≈ 4.8:1. Accent at full chroma is used only for large text (≥18px) and UI marks where 3:1 applies.

## Typography

Three families, a magazine shape (display + neutral body + mono catalog voice). Loaded from Google Fonts with `display=swap` and system fallbacks.

- **Display** Bricolage Grotesque (700 / 800), `font-optical-sizing: auto`. Wordmark, marquee title, game titles, section heads. `text-wrap: balance`, tight tracking at large sizes.
- **Body** Hanken Grotesk (400 / 500 / 600). Loglines, descriptions, buttons. `text-wrap: pretty` on prose; measure capped ~62ch.
- **Mono** Martian Mono (400 / 600), letter-spacing 0.04–0.10em. Index numerals 01–18, genre codes, counts, soundtrack labels, colophon. Used sparingly as catalog voice.

Scale: fluid `clamp()` for display only, ratio ≥1.25, `max ≤ 2.5× min`. Fixed rem for body/UI. Min body 16px.

## Spacing & Layout

- Scale (rem): 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4.5 / 7. Fluid section gaps via `clamp()`. Rhythm = tight caption groups against generous section separations.
- Page: left-aligned, asymmetric. Max width ~1180px with comfortable gutters.
- **Masthead**: wordmark + mono programme line, top hairline rule. Not centered.
- **Marquee**: asymmetric 2-column (framed poster | billing). Rotates through ~5 flagship titles, auto-advances ~7s, paused on hover, on keyboard focus, by an explicit pause/play toggle, and under reduced-motion. Prev-next stepper + dot picker. Bill text is a polite live region; inactive frames are `aria-hidden`.
- **Controls**: underlined editorial search + a row of mono text-toggle genre filters (active = vermilion underline) + live count.
- **Programme index**: `repeat(auto-fill, minmax(238px, 1fr))` poster wall. Each item is a framed poster with a gallery-caption below (mono index, display title, mono genre), not a bordered SaaS card. Whole tile is the link.

## Components

- **Framed poster**: `--paper-3` matte, 1px `--rule` frame, 16/10 art, subtle shadow. Hover: lift 4px, frame → accent, "Enter ▸" reveal.
- **Button (Enter)**: solid ink fill, paper text, vermilion arrow; hover → accent fill. Ghost variant: ruled outline.
- **Filter toggle**: mono label, transparent; active gets a vermilion underline and ink color.
- **Soundtrack module** (shared BGM panel, rethemed): the injected `#arcade-bgm` panel reads CSS variables (`--bgm-bg`, `--bgm-fg`, `--bgm-accent`, etc.) with dark defaults so the games stay dark; the launcher overrides them to paper/ink/vermilion so the panel reads as an integrated "SOUNDTRACK" module.

## Motion

- Tokens: `--ease-out-expo cubic-bezier(0.16,1,0.3,1)`, `--ease-out-quart cubic-bezier(0.25,1,0.5,1)`.
- Entrance: index tiles stagger in (translateY + opacity), `delay = calc(var(--i) * 38ms)`, capped; 500ms expo.
- Marquee: crossfade + slight rise, 520ms expo.
- Hover/press: 140ms quart. No animation of layout-driving properties.
- `prefers-reduced-motion`: disable auto-advance and stagger, crossfade only, freeze poster art.

## Accessibility

WCAG AA. Visible focus rings (2px accent + offset), semantic `<header>/<main>/<section>/<footer>`, ordered headings, alt text per poster, `aria-pressed` filters, `aria-live` count, 44px+ targets. No information by color alone (genre also labeled in text).

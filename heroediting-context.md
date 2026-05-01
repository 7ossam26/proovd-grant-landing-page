# Hero Editing Context

Handoff doc for continuing work on `src/components/sections/Hero.js`.

## Project basics

- **Repo:** `proovd-grant-landing-page` (Next.js 16, React 19, Tailwind v4 with `@theme`, no TS)
- **Section under work:** `src/components/sections/Hero.js`
- **Dev server:** `npm run dev` → http://localhost:3000
- **Project rules:** read `CLAUDE.md` first. Hard rules:
  - Only the 9 brand colors. No grays, no pure black, no pure white.
  - `#3BED97` (brand-primary) appears exactly TWICE on the page: logo dot + final CTA.
  - No shadows, gradients, glow, blur. No icon-cards. No Lucide icons (inline SVG only).
  - Satoshi is the only font. Tailwind v4 with `@theme` (no `tailwind.config.js`).
  - JS, not TS.
- **Color drift warning:** Figma uses `#45D891`/`#41ED98` for green — wrong. Always `#3BED97` per `/docs/design-rules/Color.md`.

## Hero.js — what's there now

### Structure (top→bottom of file)

1. **Constants block** — phone marquee config, name/handle/amount pools, pledge layouts, timings.
2. **`Hero()` component** — state, four `useEffect`s, JSX.

### Layout (DOM)

```
<section h-[100svh] relative overflow-hidden bg-ink>
  <style>{...inline keyframes + .proovd-pledge-popup CSS...}</style>

  <div absolute inset-0 overflow-hidden style={{containerType:"size"}}>
    <img hero-bg.webp absolute inset-0 object-cover />          (z: auto, behind everything)
    <div ref={marqueeRef} absolute inset-0 overflow-hidden>
      <div .proovd-marquee-track>
        {PHONE_LOOP.map → div.proovd-phone.proovd-phone-orbit > video}
      </div>
    </div>
    <img hero-founder.png absolute inset-0 object-cover z-[60] />
    <div data-testid="desktop-pledge-layer" hidden md:block z-[70]>
      {CENTER_STACK.cards}            (4-card stack, bottom-center)
      {SIDE_POPUPS}                   (6 popups, fade in/out independently)
    </div>
    <div data-testid="mobile-pledge-stack" md:hidden z-[70]> (3-card stack, mobile only)
  </div>

  <div absolute bottom-0 left-0 right-0 bg-ink z-[80] containerType:"inline-size">
    <h1>Sell out before the product exists</h1>
  </div>
</section>
```

**Important layout decision:** the bottom heading bar is **absolute-positioned over** the image container (z-[80]), not pushed below it via flex. This was changed so the founder/bg images get the full `100svh` to render in. Don't re-introduce a flex column.

### Layering (z-index)

- bg image: default
- phone marquee: default (sits on bg)
- founder PNG: `z-[60]`
- nav bar (in `Nav.js`, separate component): `z-50` — founder overlaps it on purpose
- pledge layers: `z-[70]`
- bottom heading bar: `z-[80]`

### Phone marquee

- 8 portrait videos in `/public/assets/videos/hero-phone-{1..8}.webm`, doubled for seamless loop (`PHONE_LOOP = [...PHONES, ...PHONES]`).
- `.proovd-marquee-track` runs a CSS keyframe `proovd-marquee` translating `-50%` over `MARQUEE_DURATION_S` seconds (currently 12s).
- Each phone has `top: ${topCqi}cqi` jitter and a `--phone-rotate` var.
- **Position-driven scale** (key custom behavior): a `useEffect` runs a `requestAnimationFrame` loop that, on every frame, calls `getBoundingClientRect()` on each `.proovd-phone`, normalizes its horizontal distance from the marquee container's center to `[0,1]`, applies smoothstep easing, and writes `--phone-scale` to that element. CSS rule `.proovd-phone-orbit { transform: rotate(var(--phone-rotate,0deg)) scale(var(--phone-scale,1)); }` consumes it.
  - Result: phones are **smaller in the middle of the screen** (behind the founder) and **larger at the edges** — creates a depth illusion.
  - Tunables: `PHONE_SCALE_MIN` and `PHONE_SCALE_MAX` (currently 0.65 → 1.5).
- Reduced-motion: rAF effect bails, phones default to `scale(1)` via the CSS fallback rule.
- IntersectionObserver pauses videos when offscreen.

### Pledge cards

Two layers:
1. **Center stack (`CENTER_STACK`)** — single 4-card stack at `bottom-[12%] left-1/2`, scale `1.0`, rendered with the existing `.proovd-pledge-deal` keyframe (drop-in animation from `globals.css`). Cycled by an interval that bumps one card's `version` per tick (re-keys, re-runs deal animation).
2. **Side popups (`SIDE_POPUPS`)** — 6 single cards positioned around the founder. Each runs an **independent show/hide lifecycle**:
   - Show: opacity 0→1 + scale 0.9→1 + translateY 0.7cqi→0 (via `.proovd-pledge-popup.is-visible`, 420ms cubic-bezier)
   - Linger: 2400 + rand(1400) ms
   - Hide: reverse transition
   - Hidden: 900 + rand(1200) ms
   - Repeat with new `randomPledge()` data
   - Initial stagger: 400 + i\*320 ms

The lifecycle is implemented in a `useEffect` with mutually-recursive `showSlot`/`hideSlot` functions and a `cancelled` ref + timer array for cleanup. Reduced-motion: all popups statically visible, no cycling.

### Mobile pledge stack

Separate `<div md:hidden>` at `bottom-[12%] left-1/2`, scale `0.6`. Just 3 cards stacked with the deal animation. Cycled by the same interval as center cards.

### Heading

- Text: "Sell out before the product exists" (sentence case — was Title Case).
- `text-brand-lime`, `font-black`, `letterSpacing: -0.04em`.
- Font size: `clamp(1.2rem, 5.5cqi, 3.25rem)` (intentionally smaller than original).
- Padding: `clamp(0.5rem, 1.4cqb, 1.25rem)` top/bottom.
- The bar's own `containerType: "inline-size"` makes its `cqi` reference its own width, not the hero container.

## What was changed in this editing session

In rough order:

1. **Reverted Nav.js** to its older simpler version (absolute `bg-ink` bar, whisper-colored Features/Contact, mint Sign up, hamburger SVG). Removed the per-section recolor logic and the fade-out-past-hero behavior. Nav is now `z-50`, founder PNG is `z-[60]` so it overlaps the nav.
2. **Bumped pledge layer z-indexes** from `z-20` to `z-[70]` so they stay above the now-`z-[60]` founder PNG.
3. **Layout restructure** — section is no longer `flex flex-col`; image container is `absolute inset-0` and bottom bar is `absolute bottom-0 z-[80]`. Image gets full 100svh of vertical room.
4. **Heading** — sentence-cased, font shrunk to ~5.5cqi, padding halved.
5. **Pledge cards rewrite** — replaced the 7-stack `PLEDGE_STACKS` with `CENTER_STACK` (single 4-card center stack) + `SIDE_POPUPS` (6 fading popups). Added `.proovd-pledge-popup` CSS class for the smooth opacity/transform transition.
6. **Phones bigger + more spaced** — `PHONE_WIDTH` 11→13cqi, `PHONE_GAP` introduced as a separate constant (current value: 15.6cqi desktop, 4.4cqi mobile, user-tuned), marquee duration 15s → 12s.
7. **Phone scale changed from time-based to position-based** — replaced the `proovd-phone-orbit-local` keyframe (which pulsed each phone 1.18↔0.78 on a 7s loop) with a rAF loop that scales by viewport-X distance from center. Removed the `animationDelay` prop from each phone. Constants: `PHONE_SCALE_MIN`/`PHONE_SCALE_MAX` (currently 0.65 / 1.5).

## Open / common gotchas

- **Founder + bg must scale identically** if you ever apply a `transform` to one. They're meant to be 1:1 aligned (per `/docs/landing-page-structure-export.md`) so the founder PNG cutout overlaps the founder visible in the bg. Earlier in the session I tried unequal scales — broke the depth illusion.
- **`cqi` units** in the heading bar reference the bar's own width because of its `containerType: "inline-size"`. Don't remove that or the heading will explode.
- **Pledge bottom positions** must stay `≥ ~10%` from the bottom of the image container or the bottom bar (z-[80]) will cover them on smaller viewports.
- **Reduced motion**: every animated effect has a `prefers-reduced-motion` early return — don't add new animation without one.
- **Random names per render**: live cards randomize from `BACKER_NAMES` × `AFFILIATES` pools every cycle. The static screenshot mock shows the same name on every card — that's not a bug, it's a design comp.

## Files most likely to need editing

- `src/components/sections/Hero.js` — this section
- `src/components/layout/Nav.js` — nav bar (recently reverted to simple version)
- `src/components/ui/PledgeCard.js` — the card component itself (haven't touched it this session)
- `src/app/globals.css` — `.proovd-pledge-deal` keyframe + reduce-motion overrides live here
- `src/app/layout.js` — preloads `hero-founder.png` and `hero-bg.webp`

## How to run / verify

```
npm run dev          # localhost:3000
npm run build        # required before commit
npm run test:e2e     # Playwright; required before commit per CLAUDE.md
```

Commit format: `Phase N: <short summary>`.

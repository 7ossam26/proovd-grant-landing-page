# Feature Section Build Guide

Use this when building a new feature section (FeatureMatch, FeatureProof, etc.) that shares the FeaturePitch layout. The reference implementation is `src/components/sections/FeaturePitch.js`. Only the stamp asset, the cards' images, the arc text, and the right-column copy change between sections.

Always follow `CLAUDE.md` (colors, no shadows/gradients, Satoshi font, etc.).

---

## Layout

Two-column section, side-by-side at `md+`, stacked vertically below `md`.

- **Left column** = layered visual (bg photo → cards conveyor → arc text → stamp/asset)
- **Right column** = solid-color copy block + single CTA

---

## The 5-part recipe

### 1. Container queries on the left column

```jsx
<div
  className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:min-h-screen overflow-hidden md:overflow-visible"
  style={{ containerType: "inline-size" }}
>
```

- `aspect-[4/5]` gives absolute children real dimensions on mobile (without it the column collapses).
- `md:aspect-auto md:min-h-screen` switches to viewport-tall on desktop.
- `containerType: "inline-size"` enables `cqi` units inside the column.

### 2. Size everything in `cqi`

Reference numbers (desktop col ≈ 812px, mobile col ≈ 393px):

| Element | Value | Desktop | Mobile |
|---|---|---|---|
| Stamp width | `clamp(180px, 50cqi, 320px)` | 320px | 196px |
| Chain offset from center | `12cqi` | ~97px | ~47px |
| Chain width / height | `64cqi` / `27cqi` | ~520 / 220px | ~251 / 106px |
| Card widths | `13–14cqi` | ~105–115px | ~51–55px |

Use `clamp(min-px, Ncqi, max-px)` whenever you need a floor/ceiling. Don't hardcode plain px for anything that should scale.

### 3. Z-index stack (back → front)

```js
const Z_BG = 1;     // background photo
const Z_CARDS = 2;  // conveyor — BEHIND the stamp so cards emerge from it
const Z_TEXT = 3;   // arc text
const Z_STAMP = 4;  // stamp + main asset (mic / image / video)
```

### 4. Two looping animations

**Arc text marquee** — SVG `<textPath>` + `<animate>` on `startOffset`:
- Repeat the phrase ~24× with a separator so the path is always full.
- `from="-100%" to="0%"` flows the text INTO the stamp. Reverse to flip direction.

**Cards conveyor** — duplicated flex track translated forever:
- Render `[...CARDS, ...CARDS]` as a flex row with `width: max-content`.
- Animate `translateX(-50%) → 0` linearly. Both halves are identical → seamless loop.
- The container needs `overflow: hidden` + explicit `height`, and its left edge sits ~12cqi past the stamp center so the first ~13cqi is hidden behind the stamp (cards appear to emerge from it).
- The CSS lives in `src/app/globals.css` under `.pitch-cards-track` / `@keyframes pitch-cards-marquee`. Reuse it as-is.

### 5. Reduced motion

Detect `prefers-reduced-motion` with `useEffect` + `matchMedia` and skip the SVG `<animate>` element when set. Cards already handle this via the global `@media (prefers-reduced-motion: reduce)` rule.

---

## Right column (copy + CTA)

```jsx
<div
  className="relative w-full md:w-[55%] flex flex-col justify-center py-12 md:py-24"
  style={{
    backgroundColor: "#BCFCA1",   // pull from Color.md per section
    zIndex: 20,                   // covers any conveyor cards bleeding in
    paddingLeft:  "clamp(1.5rem, 5vw, 5rem)",
    paddingRight: "clamp(1.5rem, 5vw, 5rem)",
  }}
>
```

- Heading: `clamp(1.875rem, 3vw, 2.625rem)`, `mb-6 md:mb-8`
- Paragraph: `clamp(1rem, 1.25vw, 1.125rem)`, `max-w: 52ch`, `mb-8 md:mb-12`
- Button: `text-base md:text-xl px-8 md:px-14 py-3 md:py-4`
- CTA href from env var, default `"#"`. Fire `trackEvent("cta_primary_click", { location: "<section_id>" })`.

---

## Building a sibling section

1. Copy `FeaturePitch.js` to `Feature<Name>.js`.
2. Change the section `id` and the `aria-labelledby` heading id.
3. **Swap the stamp asset** — replace the `<video>` inside Layer 3 with the new asset (image, different video, etc.). Tune `VIDEO_INSET` if the new asset has different inner padding.
4. Update `TEXT_PHRASE`, the `CARDS` array entries, and `/assets/feature-<name>-*.png` paths.
5. Update the right-column heading, paragraph, CTA env var, and the analytics `location` string.
6. Add every new placeholder asset to `/docs/assets-needed.md` with a `<!-- TODO(assets): ... -->` comment.

---

## Don't

- Don't hardcode px for anything that should scale — use cqi.
- Don't gate the cards conveyor with `hidden md:block` — cqi handles the mobile sizing; let the cards show on mobile too.
- Don't add per-card fade/stagger on the conveyor — the duplicated track IS the loop.
- Don't put the stamp's z-index below the cards — they must appear to emerge from behind it.
- Don't introduce shadows, gradients, glow, blur, grays, pure black, or pure white (per `CLAUDE.md`).

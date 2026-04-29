# CtaStrip.js — Snapshot for Claude Chat

> Use this doc to give a fresh Claude Code session full context on `CtaStrip.js` before asking it to modify the component.

---

## File location

```
src/components/sections/CtaStrip.js
```

---

## Full source

```jsx
"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";

const PRIMARY = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";
const SECONDARY = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";
const isExternal = (h) => /^https?:\/\//i.test(h);

export default function CtaStrip() {
  const ref = useSectionInView("cta-strip");
  return (
    <Section
      id="contact"
      tone="forest"
      width="fullbleed"
      aria-labelledby="cta-strip-heading"
      className="relative overflow-hidden min-h-[400px] flex items-center py-24"
    >
      {/* TODO(assets): CTA strip left graphic — see /docs/assets-needed.md */}
      {/* Left placeholder ~386×399px, hidden on mobile */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[386px] h-[399px] bg-[#D9D9D9] hidden md:block"
      />

      {/* TODO(assets): CTA strip right graphic — see /docs/assets-needed.md */}
      {/* Right placeholder ~386×399px, hidden on mobile */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[386px] h-[399px] bg-[#D9D9D9] hidden md:block"
      />

      <div ref={ref} className="relative z-10 w-full flex flex-col items-center text-center px-6">
        <p className="text-brand-lime uppercase tracking-widest text-sm font-bold mb-4">
          PROOVD
        </p>
        <h2
          id="cta-strip-heading"
          className="text-surface text-4xl md:text-5xl font-black mb-4"
        >
          Start shipping today.
        </h2>
        <p className="text-text-whisper text-lg mb-10 max-w-lg">
          Validate your idea with real backers, not your friends&apos; opinions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Mint CTA — brand-primary (#3BED97) — 2nd of 2 allowed uses on the entire page */}
          <Button
            variant="mint"
            href={PRIMARY}
            onClick={() => {
              trackEvent("cta_primary_click", { location: "cta_strip" });
              if (isExternal(PRIMARY)) {
                trackEvent("outbound_cta_redirect", { destination: PRIMARY });
              }
            }}
          >
            Create account
          </Button>
          <Button
            variant="outline"
            href={SECONDARY}
            onClick={() => {
              trackEvent("cta_secondary_click", { location: "cta_strip" });
              if (isExternal(SECONDARY)) {
                trackEvent("outbound_cta_redirect", { destination: SECONDARY });
              }
            }}
          >
            Contact sales
          </Button>
        </div>
      </div>
    </Section>
  );
}
```

---

## Dependencies

### `src/components/ui/Section.js`
Wrapper that maps `tone` → background color and `width` → inner container max-width.

| tone | bg class |
|---|---|
| `forest` | `bg-brand-forest` |
| `paper` | `bg-surface` |
| `midnight` | `bg-ink` |
| etc. | … |

`width="fullbleed"` skips the inner `<div>` entirely — children fill the full section width.

### `src/components/ui/Button.js`
Generic button/anchor. Relevant variants used here:

| variant | style |
|---|---|
| `mint` | `bg-brand-primary (#3BED97) text-ink` — **max 1 use on the whole page** |
| `outline` | transparent, `border border-brand-lime text-brand-lime` (dark tone default) |

---

## Layout structure

```
<section>  bg-brand-forest, fullbleed, min-h-[400px], overflow-hidden
  ├── <div> LEFT placeholder  — absolute, 386×399px, hidden on mobile
  ├── <div> RIGHT placeholder — absolute, 386×399px, hidden on mobile
  └── <div> content           — relative z-10, centered column
        ├── <p>  eyebrow "PROOVD"          text-brand-lime
        ├── <h2> "Start shipping today."   text-surface
        ├── <p>  sub-copy                  text-text-whisper
        └── <div> buttons row
              ├── Button variant="mint"    → PRIMARY env var
              └── Button variant="outline" → SECONDARY env var
```

---

## Key rules that apply here

- **`mint` CTA is the 2nd (and last) allowed use of `brand-primary (#3BED97)` on the entire page.** The first use is the logo dot. Do not add any more mint/primary uses.
- Both placeholder `<div>`s are `bg-[#D9D9D9]` — this is a deliberate temporary placeholder color, **not** a brand color. They must be replaced with real assets when ready (tracked in `/docs/assets-needed.md`).
- No shadows, gradients, glow, or blur anywhere.
- CTA `href` values always come from `NEXT_PUBLIC_CTA_PRIMARY_URL` / `NEXT_PUBLIC_CTA_SECONDARY_URL` env vars; default `"#"`.
- Analytics events fired: `cta_primary_click`, `cta_secondary_click`, `outbound_cta_redirect`.
- Section `id="contact"` — used by nav anchor links.
- `useSectionInView("cta-strip")` drives the active nav highlight.
- Font: Satoshi only. No other fonts.
- JavaScript (not TypeScript). Tailwind v4 with `@theme`.

---

## Pending TODOs

- Replace left placeholder div with real left decorative graphic (~386×399px).
- Replace right placeholder div with real right decorative graphic (~386×399px).
- Both are documented in `/docs/assets-needed.md`.

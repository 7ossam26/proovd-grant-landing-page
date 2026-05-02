# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Required reading before writing code

Read these in order — they contain rules that override default behavior:

1. [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — what Proovd is (two-sided marketplace: founders + affiliates)
2. [`docs/TECH_STACK.md`](docs/TECH_STACK.md) — locked tech decisions
3. [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) — file structure, env vars, analytics events, git conventions, section tones
4. [`docs/design-rules/Color.md`](docs/design-rules/Color.md) — every color rule is absolute (text-on-bg pairings, button recipes, forbidden pairings)
5. [`AURA-Proovd.md`](AURA-Proovd.md) — design philosophy, anti-AI-template patterns, motion freedom rules
6. [`EXECUTION_PLAN.md`](EXECUTION_PLAN.md) — current phase and Figma reference nodes

## Commands

```bash
npm run dev            # Next dev server on :3000
npm run build          # Production build (must pass before commit)
npm start              # Run production build
npm run lint           # ESLint (eslint-config-next)
npm run test:e2e       # Playwright — auto-starts dev server via webServer config
```

Run a single Playwright spec or test:
```bash
npx playwright test tests/e2e/phase-3-features.spec.js
npx playwright test -g "hero shows CTA"
npx playwright show-report          # view HTML report after run
```

## Architecture

### Page composition
[`src/app/page.js`](src/app/page.js) is the entire landing page — it composes `Nav`, `<main>` with section components in fixed order (`Hero`, `FeaturePitch`, `FeatureMatch`, `FeatureProof`, `LongScroll`, `CtaStrip`), then `Footer` and `FeatureSnapController` (a client-only scroll-snap coordinator for the three feature panels). The page is a Server Component; only the bits that need browser APIs are `"use client"`.

### Component layers (under `src/components/`)
- `ui/` — primitives shared across sections: `Button`, `Section` (wraps tone → bg color), `typography`, `PledgeCard`, `IconsBgFrame`, `FeatureSectionNav`, `EcosystemPlaceholder`. Touch these to change the design system, not individual sections.
- `layout/` — `Nav`, `Footer`, `CookieBanner`. Persistent chrome.
- `sections/` — one file per landing-page section. These are the units the marketing page is built from; edit one section without touching others.
- Top-level `AnalyticsLifecycle.js`, `ClarityScript.js`, `FeatureSnapController.js` — global client-only behaviors mounted in `layout.js` / `page.js`.

### Tone → background color (the `Section` contract)
The `Section` primitive accepts `tone` (`paper` | `midnight` | `forest` | `meadow` | `sage` | `zest` | `breeze`). Each tone maps to one of the 9 brand colors and dictates which text colors and button variants are legal inside it. **Don't bypass this** — never set a section background directly. The text-on-bg pairings in `Color.md` are enforced per-tone.

### Tailwind v4 (no config file)
All design tokens live in `@theme` inside [`src/app/globals.css`](src/app/globals.css). The 9 brand colors are declared there with `--color-*: initial` to wipe Tailwind's defaults — meaning `bg-gray-500`, `text-black`, `bg-white` etc. **don't exist** as classes. If you write one it silently produces no styles. Use `bg-surface`, `text-ink`, `bg-brand-forest`, etc.

### Path alias
`@/*` → `./src/*` (configured in [`jsconfig.json`](jsconfig.json)). Always import via `@/components/...`, never relative `../../`.

### Env-driven CTAs
Every CTA href reads from `NEXT_PUBLIC_CTA_PRIMARY_URL` / `NEXT_PUBLIC_CTA_SECONDARY_URL`, defaulting to `"#"`. Destinations get changed in Dokploy env vars, not in code. Analytics vars (`NEXT_PUBLIC_UMAMI_*`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`) are optional — when unset, scripts don't load and the page still works.

### Analytics events
The full event taxonomy is in [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) (`cta_primary_click`, `nav_click`, `section_scroll_reached`, etc.). Umami fires unconditionally; Clarity only fires after consent via [`src/lib/consent.js`](src/lib/consent.js).

### Deployment
Dockerfile → Hostinger VPS via Dokploy. Push to `main` triggers auto-deploy. No GitHub Actions, no PR workflow.

## Hard rules (absolute — these override everything else)

- Only the 9 brand colors. No grays, no pure black, no pure white.
- **Brand-primary (#3BED97)** appears on the page **exactly twice**: logo dot + one mint CTA in the final CTA strip. Nowhere else.
- No shadows, gradients, glow, blur anywhere. Ever. (Effects baked into PNG/WEBP assets are fine — never CSS.)
- No bento-grid feature cards (icon + heading + desc stacked in container). No icons inside container shapes.
- No Lucide or component-library icons. Inline SVG only.
- **Figma drift warning**: the Figma file uses `#45D891` / `#41ED98` for "primary green" — that is wrong. Always use `#3BED97` per Color.md.
- Satoshi is the only font. Self-hosted from Fontshare (weights 400/500/700/900).
- JavaScript, not TypeScript. Tailwind v4 with `@theme` (no `tailwind.config.js`).
- Every CTA href comes from env vars, default `"#"`.
- Every placeholder asset has a `<!-- TODO(assets): ... -->` comment and an entry in [`docs/assets-needed.md`](docs/assets-needed.md).
- No `whileInView` / scroll-triggered animations. Hover/click state changes only. (Per `TECH_STACK.md`.)
- No `useState` / `useEffect` unless the component has actual user-driven state or must react to browser prefs.

## Before you finish a session

- Run `npm run build` and verify clean build
- Run `npm run test:e2e` and verify all prior + current phase tests pass
- Update [`docs/assets-needed.md`](docs/assets-needed.md) with any new placeholders
- Commit with message `Phase N: <short summary>` and push to main (auto-deploys via Dokploy)

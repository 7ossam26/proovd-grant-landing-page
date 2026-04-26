# Proovd Landing Page Structure Export

Generated: 2026-04-26

Purpose: this file is meant to be sent to another AI or reviewer for feedback on the current folder structure and landing page section structure before a possible restructure or visual adjustment.

## Project Snapshot

Proovd is a pre-launch marketing landing page for an affiliate-powered startup validation platform. The page targets founders who want real pledge-based validation before building, and affiliates/content creators who can promote early-stage ideas to niche audiences.

Current repo scope: landing page only at `proovd.io`. The product app is out of scope.

Current execution status: `EXECUTION_PLAN.md` marks Phases 0 through 7 as done.

Framework and stack:

- Next.js App Router
- JavaScript, not TypeScript
- Tailwind CSS v4 using `@theme`
- Satoshi font, self-hosted from Fontshare
- Motion package for hover/click interaction only
- Playwright e2e tests
- Docker deployment to Hostinger VPS through Dokploy
- Umami and Microsoft Clarity analytics

## Non-Negotiable Design Constraints

Only these nine colors exist:

- `#FAFAFA` surface
- `#09110C` ink
- `#1E4D2F` brand-forest
- `#BCFCA1` brand-lime
- `#5AAA77` brand-sage
- `#DCE8CA` text-whisper
- `#3BED97` brand-primary
- `#EAFF72` brand-citrus
- `#C8FCFF` brand-sky

Absolute rules:

- No gray, pure black, or pure white.
- No shadows, gradients, glow, blur, glassmorphism, noise, grain, or mesh effects.
- `brand-primary` (`#3BED97`) appears exactly twice on the page: logo dot and the mint CTA in the final CTA strip.
- No Lucide icons. Inline SVG only.
- No feature cards.
- No icon inside a container shape.
- Satoshi is the only font.
- All CTA hrefs must come from environment variables, defaulting to `"#"`.
- Every placeholder asset must have a `TODO(assets)` comment and an entry in `docs/assets-needed.md`.

## Current Folder Structure

This is a pruned structure focused on files relevant to the landing page. Generated folders, dependencies, build output, and local worktrees are intentionally omitted.

```text
.
|-- AGENTS.md
|-- CLAUDE.md
|-- Dockerfile
|-- EXECUTION_PLAN.md
|-- PRELAUNCH_CHECKLIST.md
|-- README.md
|-- eslint.config.mjs
|-- jsconfig.json
|-- next.config.mjs
|-- package.json
|-- playwright.config.js
|-- postcss.config.mjs
|-- docs/
|   |-- PROJECT_CONTEXT.md
|   |-- TECH_STACK.md
|   |-- CONVENTIONS.md
|   |-- assets-needed.md
|   |-- design-rules/
|   |   |-- Color.md
|   |   `-- anti-ai-slop.md
|   `-- landing-page-structure-export.md
|-- public/
|   |-- favicon.ico
|   |-- logo.svg
|   `-- fonts/
|       `-- satoshi/
|           |-- satoshi-regular.woff2
|           |-- satoshi-medium.woff2
|           |-- satoshi-bold.woff2
|           `-- satoshi-black.woff2
|-- src/
|   |-- app/
|   |   |-- globals.css
|   |   |-- layout.js
|   |   |-- opengraph-image.js
|   |   |-- page.js
|   |   |-- robots.js
|   |   `-- sitemap.js
|   |-- components/
|   |   |-- AnalyticsLifecycle.js
|   |   |-- ClarityScript.js
|   |   |-- layout/
|   |   |   |-- CookieBanner.js
|   |   |   |-- Footer.js
|   |   |   `-- Nav.js
|   |   |-- sections/
|   |   |   |-- CtaStrip.js
|   |   |   |-- FeatureMatch.js
|   |   |   |-- FeaturePitch.js
|   |   |   |-- FeatureProof.js
|   |   |   |-- Hero.js
|   |   |   `-- LongScroll.js
|   |   `-- ui/
|   |       |-- Button.js
|   |       |-- EcosystemPlaceholder.js
|   |       |-- Section.js
|   |       `-- typography.js
|   `-- lib/
|       |-- analytics.js
|       |-- consent.js
|       `-- useSectionInView.js
`-- tests/
    `-- e2e/
        |-- full-landing.spec.js
        |-- phase-1-foundation.spec.js
        |-- phase-2-nav-hero.spec.js
        |-- phase-3-features.spec.js
        |-- phase-4-longscroll.spec.js
        |-- phase-5-cta-footer.spec.js
        `-- phase-6-analytics.spec.js
```

## Source Ownership Map

`src/app/page.js`

- Owns page composition only.
- Renders the landing page in this order: `Nav`, `Hero`, `FeaturePitch`, `FeatureMatch`, `FeatureProof`, `LongScroll`, `CtaStrip`, `Footer`.

`src/app/layout.js`

- Owns global metadata, viewport color, font preload, skip link, consent provider, cookie banner, analytics lifecycle, Clarity script, and optional production Umami script.

`src/app/globals.css`

- Imports Tailwind.
- Defines Satoshi font faces.
- Defines the nine-color Tailwind v4 theme.
- Sets body background, text color, and global focus-visible outline.

`src/components/layout/*`

- `Nav.js`: sticky dark navigation, desktop links, mobile full-screen menu.
- `Footer.js`: four-column footer link grid and bottom brand row.
- `CookieBanner.js`: cookie consent dialog wired to consent state.

`src/components/sections/*`

- One file per landing page section.
- Most sections are client components because they call `useSectionInView` and/or track click events.

`src/components/ui/*`

- `Button.js`: flat CTA variants and anchor/button switching.
- `Section.js`: tone, width, and spacing wrapper.
- `typography.js`: tone-aware text helpers, currently not heavily used by the section files.
- `EcosystemPlaceholder.js`: temporary inline SVG for the long-scroll value prop illustrations.

`src/lib/*`

- `analytics.js`: Umami tracking wrapper, scroll-depth tracking, time-on-page tracking.
- `consent.js`: consent context and persistence.
- `useSectionInView.js`: IntersectionObserver hook that fires `section_scroll_reached` once per section.

## Landing Page Render Order

```jsx
<>
  <Nav />
  <main id="main">
    <Hero />
    <FeaturePitch />
    <FeatureMatch />
    <FeatureProof />
    <LongScroll />
    <CtaStrip />
  </main>
  <Footer />
</>
```

## Section Breakdown

### 1. Navigation

File: `src/components/layout/Nav.js`

Role:

- Keeps the Proovd logo and primary navigation visible.
- Sends users to the features area, contact CTA, or signup URL.

Structure:

- Sticky top navigation on `bg-ink`.
- Logo image links to `/`.
- Desktop links: `Features`, `Contact`, `Sign up`.
- Mobile menu uses inline SVG hamburger and close icons.
- Mobile overlay is full-screen on `bg-ink`.

Important details:

- Signup URL uses `NEXT_PUBLIC_CTA_PRIMARY_URL || "#"`.
- Logo dot is intended to be the first allowed use of `brand-primary`.
- Tracks `nav_click` with targets `features`, `contact`, and `signup`.

### 2. Hero

File: `src/components/sections/Hero.js`

Section id: `hero`

Role:

- First impression and main positioning statement.

Structure:

- Full-width dark hero on `bg-ink`.
- Top hero visual placeholder, currently a `bg-[#D9D9D9]` div.
- One large H1: `Sell out before the product exists`.
- No CTA currently appears in the hero.

Assets:

- Needs hero panel image around `1555x657`.
- Placeholder is tracked in `docs/assets-needed.md`.

Analytics:

- Fires `section_scroll_reached` for `hero`.

### 3. Feature Pitch

File: `src/components/sections/FeaturePitch.js`

Section id: `features-pitch`

Role:

- Explains how founders submit or record an idea and get a structured pitch.

Structure:

- `bg-brand-lime`.
- Two-column layout on large screens.
- Left side is a portrait visual placeholder.
- Right side is eyebrow, heading, body copy, and CTA.

Primary copy:

- Eyebrow: `Talk it out or type it.`
- Heading: `Pitch your idea in ten minutes.`
- CTA: `Try Now`

CTA:

- Uses `NEXT_PUBLIC_CTA_PRIMARY_URL || "#"`.
- Button variant: primary on light tone.
- Tracks `cta_primary_click` with location `feature_pitch`.

Assets:

- Needs Feature Pitch visual around `786x1117`.

### 4. Feature Match

File: `src/components/sections/FeatureMatch.js`

Section id: `features-match`

Role:

- Explains creator/affiliate matching within 72 hours.

Structure:

- `bg-surface`.
- Two-column layout on large screens.
- Left side is a portrait visual placeholder.
- Right side is eyebrow, heading, body copy, and CTA.

Primary copy:

- Eyebrow: `Affiliates in your niche.`
- Heading: `Get matched with creators in 72 hours.`
- CTA: `Try Now`

CTA:

- Uses `NEXT_PUBLIC_CTA_PRIMARY_URL || "#"`.
- Tracks `cta_primary_click` with location `feature_match`.

Assets:

- Needs Feature Match visual around `786x1117`.

### 5. Feature Proof

File: `src/components/sections/FeatureProof.js`

Section id: `features-proof`

Role:

- Explains pledge-based proof and real-time dashboard feedback.

Structure:

- `bg-brand-forest`.
- Two-column layout on large screens.
- Left side is a portrait visual placeholder.
- Right side is eyebrow, heading, body copy, and CTA.

Primary copy:

- Eyebrow: `Real money from real backers, tracked live.`
- Heading: `People pledge. You get proof.`
- CTA: `Try Now`

CTA:

- Uses `NEXT_PUBLIC_CTA_PRIMARY_URL || "#"`.
- Button variant: secondary.
- Tracks `cta_primary_click` with location `feature_proof`.

Assets:

- Needs Feature Proof visual around `786x1117`.

### 6. Long Scroll Ecosystem

File: `src/components/sections/LongScroll.js`

Section id: `how-it-works`

Role:

- Provides five longer value-prop blocks after the three main feature panels.

Structure:

- `bg-ink`.
- Hidden H2 for accessibility: `How Proovd works`.
- Top envelope/graphic placeholder.
- Five alternating two-column text/illustration blocks.
- Uses `EcosystemPlaceholder` inline SVG for each illustration.
- Uses Motion only for a hover rotation on the illustration wrapper.

Current blocks:

1. `Ramble at us. We'll handle the pitch.`
2. `Every pledge comes with a reason.`
3. `72 hours to know if creators want in`
4. `Your friends lied. backers don't.`
5. `Show the shape. Keep the secret.`

Assets:

- Needs envelope/top graphic.
- Needs five ecosystem SVG illustrations at `public/assets/ecosystem-1.svg` through `ecosystem-5.svg`.

Analytics:

- Fires `section_scroll_reached` for `how-it-works`.

### 7. CTA Strip

File: `src/components/sections/CtaStrip.js`

Section id: `contact`

Role:

- Final conversion strip.

Structure:

- Uses `Section` with tone `forest` and width `fullbleed`.
- `bg-brand-forest`.
- Left and right decorative placeholder graphics, hidden on mobile.
- Centered eyebrow, heading, body, and two CTAs.

Primary copy:

- Eyebrow: `PROOVD`
- Heading: `Start shipping today.`
- Body: `Validate your idea with real backers, not your friends' opinions.`

CTA behavior:

- Primary: `Create account`, uses `NEXT_PUBLIC_CTA_PRIMARY_URL || "#"`.
- Secondary: `Contact sales`, uses `NEXT_PUBLIC_CTA_SECONDARY_URL || "#"`.
- Primary uses `variant="mint"`, intended as the second and final `brand-primary` use on the page.
- Tracks `cta_primary_click`, `cta_secondary_click`, and `outbound_cta_redirect` for external destinations.

Assets:

- Needs CTA strip left graphic.
- Needs CTA strip right graphic.

### 8. Footer

File: `src/components/layout/Footer.js`

Role:

- Provides bottom navigation and legal/resource links.

Structure:

- `bg-brand-forest`.
- Four footer columns: Platform, Legal, Resources, Company.
- Bottom row with logo and copyright.

Important details:

- Most links are currently `"#"` placeholders.
- Tracks `footer_link_click`.
- Tracks `external_link_click` if a footer link is an external URL.

## Shared CTA and Analytics Surface

CTA environment variables:

- `NEXT_PUBLIC_CTA_PRIMARY_URL`, default `"#"`.
- `NEXT_PUBLIC_CTA_SECONDARY_URL`, default `"#"`.
- `NEXT_PUBLIC_SITE_URL`, default in docs is `http://localhost:3000`; layout currently falls back to `https://proovd.io`.

Analytics events present in code:

- `nav_click`
- `cta_primary_click`
- `cta_secondary_click`
- `footer_link_click`
- `section_scroll_reached`
- `external_link_click`
- `outbound_cta_redirect`
- `time_on_page_bucket`
- `page_exit_scroll_depth`

Section tracking:

- `Hero`, `FeaturePitch`, `FeatureMatch`, `FeatureProof`, `LongScroll`, and `CtaStrip` use `useSectionInView`.

## Current Placeholder Assets

The page still uses temporary placeholder visuals in these places:

- Hero panel image
- Feature Pitch visual
- Feature Match visual
- Feature Proof visual
- Long-scroll envelope/top graphic
- Five ecosystem illustrations
- CTA strip left graphic
- CTA strip right graphic
- Optional static OG image

`docs/assets-needed.md` is the source of truth for this list.

## Existing Tests

Playwright specs:

- `tests/e2e/phase-1-foundation.spec.js`
- `tests/e2e/phase-2-nav-hero.spec.js`
- `tests/e2e/phase-3-features.spec.js`
- `tests/e2e/phase-4-longscroll.spec.js`
- `tests/e2e/phase-5-cta-footer.spec.js`
- `tests/e2e/phase-6-analytics.spec.js`
- `tests/e2e/full-landing.spec.js`

Package scripts:

- `npm run build`
- `npm run test:e2e`
- `npm run lint`
- `npm run dev`

## Structure Notes For A Restructure Review

These are the main things a reviewer should evaluate:

- The page currently has more than the strict pre-launch minimum of hero, features-as-prose, email capture, and footer.
- There is no email capture section; conversion is handled through CTA links.
- The three feature panels are separate files with very similar structure. That makes them easy to reorder but duplicates layout logic.
- The long-scroll ecosystem section is content-heavy and may be the best candidate for trimming, merging, or turning into a stronger narrative section.
- The final CTA strip is the only place with the mint CTA and should remain the only `brand-primary` CTA.
- The footer has a conventional four-column structure even though the anti-slop rules warn against generic four-column footers.
- `Section.js` and `typography.js` exist, but several sections use custom section markup and inline styles directly instead of those primitives.
- Placeholder assets strongly influence the current visual rhythm; actual assets may change whether the section order feels heavy or balanced.
- Current nav links are sparse: `Features`, `Contact`, `Sign up`.
- All repeated `Try Now` CTAs point to the same primary URL and may need clearer intent if the page is restructured.

## Suggested Prompt To Send With This File

Use this prompt when asking another AI for feedback:

```text
Review this Proovd landing page structure export. I am considering a restructure or visual adjustment. Please evaluate the current folder structure, section order, content hierarchy, duplication, and landing page narrative flow.

Important: do not suggest gradients, shadows, gray colors, pure black, pure white, Lucide icons, generic feature cards, icon blobs, testimonial walls, logo marquees, FAQ accordions, generic SaaS sections, or any design pattern banned by the included rules. Keep recommendations compatible with the nine-color brand system and the current Next.js JavaScript/Tailwind v4 stack.

I want practical recommendations for what to keep, what to merge, what to remove, what to rename, and how to make the page feel more intentional without adding generic landing page clutter.
```

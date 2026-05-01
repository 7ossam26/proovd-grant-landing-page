# Proovd Landing Page — Structure Export

Generated: 2026-04-27

Purpose: send to another AI for feedback on the current folder structure and landing page section structure before a possible restructure or visual adjustment.

---

## Project Snapshot

Proovd is a pre-launch marketing landing page for an affiliate-powered startup validation platform. The page targets founders who want real pledge-based validation before building, and affiliates/content creators who can promote early-stage ideas to niche audiences.

Repo scope: landing page only at `proovd.io`. The product app is a separate repo.

Execution status: `EXECUTION_PLAN.md` marks Phases 0 through 7 as done. The page is fully built; all sections are implemented.

Stack:

- Next.js 15 App Router
- JavaScript only (no TypeScript)
- Tailwind CSS v4 using `@theme` (no `tailwind.config.js`)
- Satoshi font, self-hosted from Fontshare — only font used
- Playwright e2e tests
- Docker deployed to VPS via Dokploy
- Umami + Microsoft Clarity analytics

---

## Non-Negotiable Design Constraints

Nine colors only. No others exist:

- `#FAFAFA` — surface (near-white)
- `#0D0D0D` — ink (near-black)
- `#2C5A3D` — brand-forest
- `#BCFCA1` — brand-lime
- `#7BB68B` — brand-sage
- `#A8A8A8` — text-whisper
- `#3BED97` — brand-primary
- `#EAFF72` — brand-citrus
- `#C8FCFF` — brand-sky

Absolute rules:

- No pure black (`#000`), pure white (`#fff`), or grays.
- No shadows, gradients, glow, blur, glassmorphism, noise, grain, or mesh effects.
- `brand-primary` (`#3BED97`) appears exactly **twice** on the entire page: the logo dot in the Nav and the mint CTA button in the final CTA strip. Nowhere else.
- No Lucide icons. Inline SVG only.
- No feature cards (icon + heading + desc stacked inside a container shape).
- Satoshi is the only font.
- All CTA `href` values come from environment variables, defaulting to `"#"`.
- Every placeholder asset has a `TODO(assets)` comment and an entry in `docs/assets-needed.md`.

---

## Current Folder Structure

Pruned — build output, node_modules, .git, and local worktrees are intentionally omitted.

```text
.
├── AGENTS.md
├── CLAUDE.md
├── Dockerfile
├── EXECUTION_PLAN.md
├── PRELAUNCH_CHECKLIST.md
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── playwright.config.js
├── postcss.config.mjs
├── docs/
│   ├── PROJECT_CONTEXT.md
│   ├── TECH_STACK.md
│   ├── CONVENTIONS.md
│   ├── assets-needed.md
│   ├── analytics-events.md
│   ├── design-rules/
│   │   └── Color.md
│   └── landing-page-structure-export.md   ← this file
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── fonts/
│   │   └── satoshi/
│   │       ├── satoshi-regular.woff2
│   │       ├── satoshi-medium.woff2
│   │       ├── satoshi-bold.woff2
│   │       └── satoshi-black.woff2
│   └── assets/
│       ├── hero-bg.jpg
│       ├── hero-founder.png
│       ├── feature-pitch-bg.png
│       ├── feature-pitch-card-1..4.png
│       ├── icons-bg.png
│       └── videos/
│           ├── hero-phone-1..14.mp4 + .webm   (14 clips)
│           └── feature-pitch-mic.mp4 + .webm
├── src/
│   ├── app/
│   │   ├── globals.css          ← Tailwind @theme tokens, @font-face, base styles
│   │   ├── layout.js            ← root layout, metadata, analytics lifecycle
│   │   ├── page.js              ← page composition (imports all sections in order)
│   │   ├── opengraph-image.js
│   │   ├── robots.js
│   │   └── sitemap.js
│   ├── components/
│   │   ├── AnalyticsLifecycle.js
│   │   ├── ClarityScript.js
│   │   ├── layout/
│   │   │   ├── Nav.js           ← dark sticky nav, 3 links, mobile overlay
│   │   │   ├── Footer.js        ← 4-column link grid + bottom brand row
│   │   │   └── CookieBanner.js
│   │   ├── sections/            ← one file per landing page section
│   │   │   ├── Hero.js
│   │   │   ├── FeaturePitch.js
│   │   │   ├── FeatureMatch.js
│   │   │   ├── FeatureProof.js
│   │   │   ├── LongScroll.js
│   │   │   └── CtaStrip.js
│   │   └── ui/
│   │       ├── Button.js              ← 5 variants: primary, secondary, outline, ghost, mint
│   │       ├── Section.js             ← tone + width wrapper
│   │       ├── PledgeCard.js          ← pledge amount UI card
│   │       ├── EcosystemPlaceholder.js← placeholder SVG for LongScroll illustrations
│   │       └── typography.js
│   └── lib/
│       ├── analytics.js         ← Umami trackEvent, scroll depth, time-on-page
│       ├── consent.js           ← cookie consent context
│       └── useSectionInView.js  ← IntersectionObserver hook for section tracking
└── tests/
    └── e2e/
        ├── full-landing.spec.js
        ├── phase-1-foundation.spec.js
        ├── phase-2-nav-hero.spec.js
        ├── phase-3-features.spec.js
        ├── phase-4-longscroll.spec.js
        ├── phase-5-cta-footer.spec.js
        └── phase-6-analytics.spec.js
```

---

## Landing Page Render Order

`src/app/page.js`:

```jsx
<>
  <Nav />          {/* absolute overlay on top of Hero */}
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

---

## Section Breakdown (current implementation)

### Nav

File: `src/components/layout/Nav.js`
Position: absolute overlay on top of the Hero section — not a standalone section in the flow.

Structure:
- `bg-ink` bar with `py-2` / `py-[0.7cqi]` padding (responsive).
- Left: Proovd logo SVG (the dot inside is `brand-primary` — **1st of 2 allowed uses on the page**).
- Desktop links: `Features` → `#features-pitch`, `Contact` → `#contact`, `Sign up` → `NEXT_PUBLIC_CTA_PRIMARY_URL`.
- Mobile: text "Menu" button triggers a full-screen `bg-ink` overlay with the same 3 links.
- Tracks: `nav_click` with targets `features`, `contact`, `signup`.

---

### Section 1 — Hero

File: `src/components/sections/Hero.js`
Section id: `hero`
Background: `bg-ink`
Status: **fully built**

Layout: two stacked sub-areas:

1. **Visual panel** — responsive aspect-ratio box (`393/710` mobile, `255/136` desktop)
2. **Headline bar** — centered text below the visual, `bg-ink`

#### Visual panel — 4 layered elements (bottom to top)

**Layer 1 — `hero-bg.jpg`**
Full-bleed background photo. `object-cover`, `fetchPriority="high"`.

**Layer 2 — Phone marquee strip**
A horizontal infinite-scroll strip of 14 phone screen videos (`hero-phone-1` through `hero-phone-14`, both `.webm` and `.mp4`). Each phone has a slightly different `top` offset and rotation for visual depth. The full strip is duplicated (`PHONE_LOOP = [...PHONES, ...PHONES]`) so the marquee loops seamlessly. Animation: `proovd-marquee` keyframe at `60s` duration (adjustable). Videos are paused when off-screen via `IntersectionObserver`. Width: `31cqi` on mobile, `11cqi` on desktop.

**Layer 3 — `hero-founder.png`**
Founder PNG cutout with transparent background, overlaid `z-10` on top of the phone strip. Must align 1:1 with `hero-bg.jpg` to create a depth illusion (founder appears to stand in front of the phones).

**Layer 4 — Pledge cards**
`PledgeCard` components scatter across the bottom of the panel, animating in sequentially with a spring reveal (`proovd-pledge-reveal`, 900ms, `cubic-bezier(0.22, 1, 0.36, 1)`).

- **Desktop**: 7 stacks at defined positions across the width. 16 total card slots (some stacks have 1 card, some have 2–3 stacked). Each card has its own `rotation`, `x`/`y` offset, and `stackIndex`/`cardIndex` for z-ordering. Cards appear every `750ms` starting `300ms` after mount.
- **Mobile**: 3 cards centered at the bottom, stacked with rotation.
- `prefers-reduced-motion`: all cards show immediately, marquee pauses.

#### Headline bar

- H1: `"Sell Out Before The Product Exists"`
- Color: `text-brand-lime`
- Weight: Black (900)
- Font size: `4xl` → `6xl` → `7xl`
- Letter spacing: `-0.04em`
- **No CTA button in the Hero.**

---

### Section 2 — Feature Pitch

File: `src/components/sections/FeaturePitch.js`
Section id: `features-pitch`
Layout: 50/50 horizontal split — left visual / right copy. Stacks on mobile.
Status: **fully built**

#### Left column (56.4% width) — layered visual

All layers are `position: absolute` within a `relative` container.

**Layer 1 — `feature-pitch-bg.png`** (z-index 1)
Blurred room/studio photo, full-bleed.

**Layer 2 — Animated card chain** (z-index 2, desktop only)
4 pitch output card images arranged horizontally. Each card has a rotation and vertical offset. Cards animate in with `pitch-card-slide` (opacity 0 → 1, custom translate, `3s` cycle, `0.4s` stagger between cards, infinite). Cards are positioned to appear to emerge from behind the stamp. Hidden on mobile.

Cards: `feature-pitch-card-1.png` through `feature-pitch-card-4.png`.

**Layer 3 — Curved typing SVG text** (z-index 3)
Inline `<svg>` with a `<textPath>` along an arc path. Text types character by character (`50ms` per character) and loops. The arc curves from the lower-left up toward the stamp. Text is `#FAFAFA`, Satoshi Bold, 36px. On `prefers-reduced-motion`: shows full text immediately.

Current typing text: `"this is my ideaaaa"`

**Layer 4 — Stamp + mic video** (z-index 4, centered in the photo)
`icons-bg.png` is a stamp/badge graphic `320px` wide, centered (`translate(-50%, -50%)`). Inside the stamp's interior, `feature-pitch-mic.mp4`/`.webm` plays (autoplay, muted, loop) showing a mic recording UI.

#### Right column (55% width) — copy

Background: `#BCFCA1` (brand-lime)

- Heading: `"Your pitch done in ten minutes"` — `text-ink`, bold, `clamp(1.875rem, 3vw, 2.625rem)`
- Body: "Record yourself explaining the idea like you would to a friend, or write it out if you prefer. Our AI turns the mess into a structured pitch — problem, solution, competition — and fills your listing for you. Review it, fix what's wrong, submit." — `text-brand-forest`
- CTA: `"Try Now"` — variant `primary`, tone `light` (forest bg, surface text) → `NEXT_PUBLIC_CTA_PRIMARY_URL`
- Tracks: `cta_primary_click`, location `feature_pitch`

---

### Section 3 — Feature Match

File: `src/components/sections/FeatureMatch.js`
Section id: `features-match`
Background: `bg-surface` (#FAFAFA)
Layout: 50/50 horizontal split — left visual / right copy. Stacks on mobile.
Status: **built — visual asset still a gray placeholder**

#### Left column
`TODO(assets)`: Feature Match visual (~786×1117, portrait). Currently `bg-[#D9D9D9]` placeholder.

#### Right column
- Label: `"Affiliates in your niche."` — `text-brand-sage`, medium weight
- Heading: `"Get matched with creators in 72 hours."` — `text-ink`, black weight
- Body: "Affiliates in your niche, already trusted by your audience. We match you with content creators who have 40K to 250K followers in the space your idea lives in. They see your pitch within three days. If none of them want in, you get your fee back." — `text-brand-forest`
- CTA: `"Try Now"` — variant `primary`, tone `light` → `NEXT_PUBLIC_CTA_PRIMARY_URL`
- Tracks: `cta_primary_click`, location `feature_match`

---

### Section 4 — Feature Proof

File: `src/components/sections/FeatureProof.js`
Section id: `features-proof`
Background: `bg-brand-forest` (#2C5A3D)
Layout: 50/50 horizontal split — left visual / right copy. Stacks on mobile.
Status: **built — visual asset still a gray placeholder**

#### Left column
`TODO(assets)`: Feature Proof visual (~786×1117, portrait). Currently `bg-[#D9D9D9]` placeholder.

#### Right column
- Label: `"Real money from real backers, tracked live."` — `text-brand-lime`, medium weight
- Heading: `"People pledge. You get proof."` — `text-surface`, black weight
- Body: "Real money from real backers, tracked live. Affiliates share your idea with their audience over three weeks. Every click, every pledge, every backer's reason for buying lands in your dashboard in real time." — `text-text-whisper`
- CTA: `"Try Now"` — variant `secondary` (brand-lime bg, brand-forest text) → `NEXT_PUBLIC_CTA_PRIMARY_URL`
- Tracks: `cta_primary_click`, location `feature_proof`

---

### Section 5 — Long Scroll (How It Works)

File: `src/components/sections/LongScroll.js`
Section id: `how-it-works`
Background: `bg-ink`
Status: **built — illustrations are `EcosystemPlaceholder` SVG stubs**

Structure:
- Visually hidden H2: `"How Proovd works"` (accessibility)
- **Top area**: large centered graphic (`TODO(assets)` — envelope/top illustration). Currently a `#D9D9D9` square placeholder up to `1000px` wide.
- **5 value-prop blocks**: alternating left/right layout (text ↔ illustration). Gap between blocks: `clamp(7rem, 12vw, 12rem)`. Each illustration has a `hover:rotate-2` transition.

The 5 blocks:

| # | Heading | Summary |
|---|---|---|
| 1 | "Ramble at us. We'll handle the pitch." | Record or write casually. AI extracts problem, solution, competition. |
| 2 | "Every pledge comes with a reason." | Backers answer one question before pledging. Get all responses + click-through, affiliate performance, hour-by-hour conversion in the dashboard. |
| 3 | "72 hours to know if creators want in" | Post idea. Niche affiliates see it within 3 days. |
| 4 | "Your friends lied. backers don't." | Surveys and social replies are worthless. A $30 pledge is worth everything. |
| 5 | "Show the shape. Keep the secret." | Teaser mode: reveal problem + early traction to attract affiliates without showing the full blueprint. |

All 5 blocks use `EcosystemPlaceholder` (a temporary inline SVG). Real illustrations pending.

Tracks: `section_scroll_reached` for `how-it-works`.

---

### Section 6 — CTA Strip

File: `src/components/sections/CtaStrip.js`
Section id: `contact`
Background: `bg-brand-forest` (via `Section` wrapper, `tone="forest"`, `width="fullbleed"`)
Status: **fully built — decorative graphics are gray placeholders**

Structure:
- Left and right decorative graphic placeholders (`386×399px`, hidden on mobile) — `TODO(assets)`
- Centered content stack:
  - Eyebrow: `"PROOVD"` — uppercase, `text-brand-lime`, tracked, small
  - Heading: `"Start shipping today."` — `text-surface`, 4xl → 5xl, black weight
  - Body: `"Validate your idea with real backers, not your friends' opinions."` — `text-text-whisper`
  - Two CTA buttons (horizontal on desktop, stacked on mobile):
    1. `"Create account"` — variant `mint` (`bg-brand-primary` #3BED97 — **2nd and final allowed use of brand-primary on the page**) → `NEXT_PUBLIC_CTA_PRIMARY_URL`
    2. `"Contact sales"` — variant `outline` (lime border + text, hover fills forest) → `NEXT_PUBLIC_CTA_SECONDARY_URL`
- Tracks: `cta_primary_click`, `cta_secondary_click`, `outbound_cta_redirect`

---

### Footer

File: `src/components/layout/Footer.js`
Background: `bg-brand-forest`

Structure:
- 4-column link grid (collapses to 2-col on tablet, 1-col on mobile):
  - **Platform**: For Founders, For Affiliates, How It Works, Pricing, Success Stories
  - **Legal**: Terms of Service, Privacy Policy, IP Protection Policy, Backer Disclaimer, Cookie Settings
  - **Resources**: Pitch Guide, Playbook, Affiliate Toolkit, Blog, FAQ
  - **Company**: About, Careers, Contact, Press
- Bottom row: Proovd logo + `© 2026 Proovd. All rights reserved.`
- Most links are `"#"` placeholders. Tracks: `footer_link_click`, `external_link_click`.

---

## Shared CTA & Analytics Surface

Environment variables:
- `NEXT_PUBLIC_CTA_PRIMARY_URL` — default `"#"`
- `NEXT_PUBLIC_CTA_SECONDARY_URL` — default `"#"`
- `NEXT_PUBLIC_SITE_URL` — fallback `https://proovd.io`

Analytics events wired in code:
- `nav_click`
- `cta_primary_click`
- `cta_secondary_click`
- `footer_link_click`
- `section_scroll_reached` (Hero, FeaturePitch, FeatureMatch, FeatureProof, LongScroll, CtaStrip)
- `external_link_click`
- `outbound_cta_redirect`
- `time_on_page_bucket`
- `page_exit_scroll_depth`

---

## Outstanding Placeholder Assets

All below currently render as `#D9D9D9` gray boxes or stubs:

| Asset | Section | Notes |
|---|---|---|
| `hero-bg.jpg` | Hero | Exists — full-bleed background photo |
| `hero-founder.png` | Hero | Exists — founder PNG cutout, transparent bg |
| `hero-phone-1..14.mp4/.webm` | Hero marquee | Exist — 14 phone screen recordings |
| `feature-pitch-bg.png` | FeaturePitch left | Exists — blurred studio photo |
| `feature-pitch-mic.mp4/.webm` | FeaturePitch stamp | Exists — mic recording screencast |
| `icons-bg.png` | FeaturePitch stamp | Exists — stamp/badge graphic |
| `feature-pitch-card-1..4.png` | FeaturePitch chain | Exist — AI pitch output card mockups |
| Feature Match visual | FeatureMatch | **Missing** — ~786×1117 portrait |
| Feature Proof visual | FeatureProof | **Missing** — ~786×1117 portrait |
| LongScroll top graphic | LongScroll | **Missing** — envelope/header illustration |
| LongScroll block illustrations (×5) | LongScroll | **Missing** — one per value-prop block |
| CtaStrip left graphic | CtaStrip | **Missing** — ~386×399px |
| CtaStrip right graphic | CtaStrip | **Missing** — ~386×399px |

---

## Structural Observations For A Restructure Review

- **Three back-to-back feature panels** (FeaturePitch, FeatureMatch, FeatureProof) have nearly identical layout: left visual / right copy / CTA. The layout logic is duplicated across three files. Easy to reorder but could feel repetitive when scrolling.
- **Hero has no CTA.** The only conversion action in the hero area is the Nav "Sign up" link. The hero positions the product but does not actively convert.
- **All "Try Now" CTAs point to the same URL.** The three feature panels each have a `"Try Now"` button to the same `NEXT_PUBLIC_CTA_PRIMARY_URL`. There is no differentiation by audience (founders vs affiliates).
- **Long-scroll section is content-heavy.** Five value-prop blocks plus a top graphic is a significant scroll commitment. The blocks cover both founder and affiliate value props without clearly separating them.
- **No email capture.** Conversion is purely CTA-link-based (sign up URL). No inline waitlist form.
- **Footer is conventional.** Four-column structure is standard SaaS. The anti-slop rules warn against generic patterns; the footer currently matches that pattern.
- **`Section.js` and `typography.js` are underused.** Several sections use custom markup and inline styles directly instead of those primitives. The wrapper components and the section files are not fully aligned.
- **Placeholder assets define current visual rhythm.** When real assets arrive for FeatureMatch, FeatureProof, LongScroll, and CtaStrip, the perceived weight of those sections will shift — which may reveal imbalance in the current order.
- **Nav links are sparse:** Features, Contact, Sign up. If the page gains more sections, nav may need to grow.

---

## Suggested Prompt To Use With This File

```text
Review this Proovd landing page structure export. I am considering a restructure or visual adjustment to the landing page sections. Please evaluate the current section order, content hierarchy, narrative flow, duplication, and conversion logic.

Important constraints — do NOT suggest:
- Gradients, shadows, glow, blur, glassmorphism
- Gray, pure black (#000), or pure white (#fff)
- Lucide icons or any icon library (inline SVG only)
- Generic feature cards (icon + heading + desc inside a container)
- Icon blobs, testimonial walls, logo marquees, FAQ accordions, pricing tables, or any generic SaaS landing page pattern
- Anything requiring TypeScript or changing the tech stack

The brand uses only 9 colors (listed above). brand-primary (#3BED97) can appear exactly twice — it is already used in the Nav logo dot and the final CTA strip mint button. Do not add a third use.

Please give practical recommendations on:
1. What to keep as-is
2. What sections to merge, split, or reorder
3. What to remove or cut for a tighter pre-launch page
4. How to improve narrative flow for a first-time visitor who doesn't know what Proovd is
5. Whether the Hero should have a CTA, and what form it should take given the constraints
```

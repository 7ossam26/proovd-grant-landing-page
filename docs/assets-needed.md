# Assets Needed

User will provide these before launch. All current placeholders reference this file.

## Already provided
- [x] Logo SVG → /public/logo.svg

## Still needed before launch
- [ ] Favicon (placeholder: solid #3BED97 square at `src/app/icon.js`, Phase 1)
- [x] Hero background photo → `/public/assets/hero-bg.jpg` (full-bleed, behind phone marquee)
- [x] Hero founder PNG cutout → `/public/assets/hero-founder.png` (transparent background, centered, foreground layer)
- [x] Hero phone marquee videos → `/public/assets/videos/hero-phone-{1..5}.mp4` (with `.webm` variants where available; phone-1 has both, phones 2–5 currently mp4 only — provide `.webm` for phones 2, 3, 4, 5 to improve loading)
- [ ] Feature Pitch visual (Phase 3) — ~786×1117 portrait, replaces `bg-[#D9D9D9]` placeholder in `src/components/sections/FeaturePitch.js`
- [ ] Feature Match visual (Phase 3) — ~786×1117 portrait, replaces `bg-[#D9D9D9]` placeholder in `src/components/sections/FeatureMatch.js`
- [ ] Feature Proof visual (Phase 3) — ~786×1117 portrait, replaces `bg-[#D9D9D9]` placeholder in `src/components/sections/FeatureProof.js`
- [ ] Envelope / top graphic for long-scroll section (Phase 4) — centered, ~800–1000px wide, aspect-square, replaces `bg-[#D9D9D9]` placeholder in `src/components/sections/LongScroll.js`
- [ ] Ecosystem illustration 1 (Phase 4) — 210×210 SVG, replaces `EcosystemPlaceholder` in block 1 ("Ramble at us") → `/public/assets/ecosystem-1.svg`
- [ ] Ecosystem illustration 2 (Phase 4) — 210×210 SVG, replaces `EcosystemPlaceholder` in block 2 ("Every pledge") → `/public/assets/ecosystem-2.svg`
- [ ] Ecosystem illustration 3 (Phase 4) — 210×210 SVG, replaces `EcosystemPlaceholder` in block 3 ("72 hours") → `/public/assets/ecosystem-3.svg`
- [ ] Ecosystem illustration 4 (Phase 4) — 210×210 SVG, replaces `EcosystemPlaceholder` in block 4 ("Your friends lied") → `/public/assets/ecosystem-4.svg`
- [ ] Ecosystem illustration 5 (Phase 4) — 210×210 SVG, replaces `EcosystemPlaceholder` in block 5 ("Show the shape") → `/public/assets/ecosystem-5.svg`
- [ ] CTA strip left graphic (Phase 5) — ~386×399px, positioned absolute left of centered content in `src/components/sections/CtaStrip.js`, hidden on mobile
- [ ] CTA strip right graphic (Phase 5) — ~386×399px, positioned absolute right of centered content in `src/components/sections/CtaStrip.js`, hidden on mobile
- [ ] Optional static OG image at `/public/og.png` (Phase 7 — dynamic generator at `src/app/opengraph-image.js` is used by default; drop in a static PNG here and repoint `openGraph.images` in `src/app/layout.js` if a hand-designed card is preferred)

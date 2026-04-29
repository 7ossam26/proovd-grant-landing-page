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
- [x] Feature Match background photo → `/public/assets/Feature-match-bg.png`
- [x] Feature Match founder card → `/public/assets/founder-componant.png`
- [x] Feature Match affiliate card → `/public/assets/affiliate-component.png`
- [x] Feature Match cupid video (MP4) → `/public/assets/videos/cupid.mp4`
- [ ] Feature Match cupid video (WebM) → optional `.webm` (VP9) variant for `cupid.mp4` to improve loading
- [ ] Feature Proof background photo → `/public/assets/feature-proof-bg.png` — blurred desk/workspace photo, portrait crop, behind both vertical conveyors
- [ ] Feature Proof dollar bill → `/public/assets/feature-proof-dollar.png` — single $100 bill PNG, transparent bg, ~400px wide, used in bottom conveyor
- [ ] Feature Proof trophy video (WebM) → `/public/assets/videos/feature-proof-trophy.webm` — VP9, no audio, <1.5MB, plays inside stamp frame
- [ ] Feature Proof trophy video (MP4) → `/public/assets/videos/feature-proof-trophy.mp4` — H.264, faststart, no audio, <1.5MB, MP4 fallback for trophy.webm
- [x] Feature Proof stamp frame → reuses `/public/assets/icons-bg.png` from FeaturePitch / FeatureMatch — no new export needed
- [x] Feature Proof pledge cards → reuses `src/components/ui/PledgeCard.js` from Hero — no new component needed
- [x] LongScroll envelope back (Phase 4) → `/public/assets/longscroll-envelope-back.webp` — full envelope shape, sits behind spilling stamps
- [x] LongScroll envelope front (Phase 4) → `/public/assets/longscroll-envelope-front.webp` — front flap, sits on top of stamps to clip them
- [x] LongScroll stamp 1 (Phase 4, "Ramble at us") → `/public/assets/longscroll-stamp-ramble.png`
- [x] LongScroll stamp 2 (Phase 4, "Every pledge") → `/public/assets/longscroll-stamp-reason.png`
- [x] LongScroll stamp 3 (Phase 4, "72 hours", landscape orientation) → `/public/assets/longscroll-stamp-72.png`
- [x] LongScroll stamp 4 (Phase 4, "Your friends lied") → `/public/assets/longscroll-stamp-friends-lied.png`
- [x] LongScroll stamp 5 (Phase 4, "Show the shape") → `/public/assets/longscroll-stamp-shape.png`
- [ ] LongScroll spill stamp 1 (Phase 4) → `/public/assets/longscroll-spill-1.png` — small founder-at-desk stamp, top-center of envelope
- [ ] LongScroll spill stamp 2 (Phase 4) → `/public/assets/longscroll-spill-2.png` — medium creator-with-stamp, center of envelope
- [ ] LongScroll spill stamp 3 (Phase 4) → `/public/assets/longscroll-spill-3.png` — small profile stamp, left side of envelope
- [ ] LongScroll spill stamp 4 (Phase 4) → `/public/assets/longscroll-spill-4.png` — small gradient stamp, right side of envelope
- [x] CTA strip left graphic (Phase 5) → `/public/assets/cta-strip-left-affiliate.png` — affiliate creator with phone rig, anchors top-left of `src/components/sections/CtaStrip.js`, hidden on mobile
- [x] CTA strip right graphic (Phase 5) → `/public/assets/cta-strip-right-phone.png` — vintage white telephone with Proovd P logo, anchors bottom-right of `src/components/sections/CtaStrip.js`, hidden on mobile
- [x] Footer outlined logomark (Phase 5) → `/public/assets/footer-logomark-outlined.png` — outlined Proovd leaf logomark, transparent bg, anchors bottom-left of `src/components/layout/Footer.js` and bleeds off both edges
- [ ] Optional static OG image at `/public/og.png` (Phase 7 — dynamic generator at `src/app/opengraph-image.js` is used by default; drop in a static PNG here and repoint `openGraph.images` in `src/app/layout.js` if a hand-designed card is preferred)

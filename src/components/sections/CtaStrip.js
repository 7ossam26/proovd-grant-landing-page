"use client";

import Section from "@/components/ui/Section";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";

const PRIMARY = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";
const SECONDARY = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";
const isExternal = (h) => /^https?:\/\//i.test(h);

// ─── Tunables ────────────────────────────────────────────────────────────────

const SIDE_PHOTO_WIDTH = "clamp(180px, 18vw, 320px)";
// Force 1:1 ratio. `object-cover` on the <img> centers the asset and crops
// top/bottom evenly to fit the square box.
const SIDE_PHOTO_HEIGHT = SIDE_PHOTO_WIDTH;
const STRIP_MIN_HEIGHT = "clamp(420px, 48vw, 560px)";
// Negative offset that pulls the top of the left photo above the section
// and the bottom of the right photo below it, so they "escape" the panel.
const SIDE_PHOTO_OFFSET = "clamp(-80px, -9vw, -60px)";
// Horizontal inset from the page edge for each side photo.
const SIDE_PHOTO_INSET = "clamp(16px, 2.5vw, 48px)";

// Z-stack
const Z_BG_PHOTOS = 1;
const Z_CONTENT = 10;

export default function CtaStrip() {
  const ref = useSectionInView("cta-strip");

  return (
    <Section
      id="contact"
      tone="forest"
      width="fullbleed"
      aria-labelledby="cta-strip-heading"
      className="relative flex items-center"
      style={{
        minHeight: STRIP_MIN_HEIGHT,
        paddingTop: "clamp(3rem, 6vw, 6rem)",
        paddingBottom: "clamp(3rem, 6vw, 6rem)",
        zIndex: 2,
      }}
    >
      {/* ─── Left photo — affiliate creator with phone rig.
            Negative `top` lifts it above the section's top edge. */}
      <img
        src="/assets/cta-strip-left-affiliate.png"
        alt=""
        aria-hidden="true"
        className="absolute hidden md:block pointer-events-none select-none object-cover"
        style={{
          width: SIDE_PHOTO_WIDTH,
          height: SIDE_PHOTO_HEIGHT,
          top: SIDE_PHOTO_OFFSET,
          left: SIDE_PHOTO_INSET,
          zIndex: Z_BG_PHOTOS,
        }}
      />

      {/* ─── Right photo — vintage phone with Proovd P logo.
            Negative `bottom` pushes it below the section's bottom edge. */}
      <img
        src="/assets/cta-strip-right-phone.png"
        alt=""
        aria-hidden="true"
        className="absolute hidden md:block pointer-events-none select-none object-cover"
        style={{
          width: SIDE_PHOTO_WIDTH,
          height: SIDE_PHOTO_HEIGHT,
          bottom: SIDE_PHOTO_OFFSET,
          right: SIDE_PHOTO_INSET,
          zIndex: Z_BG_PHOTOS,
        }}
      />

      {/* ─── Centered content ────────────────────────────────────────── */}
      <div
        ref={ref}
        className="relative w-full flex flex-col items-center text-center px-6"
        style={{ zIndex: Z_CONTENT }}
      >
        {/* Eyebrow — brand-lime on brand-forest per Color.md */}
        <p
          className="uppercase tracking-widest font-bold mb-4"
          style={{
            color: "#BCFCA1",
            fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          }}
        >
          Ready?
        </p>

        {/* Heading — surface on brand-forest */}
        <h2
          id="cta-strip-heading"
          className="font-medium mb-4 leading-tight"
          style={{
            color: "#FAFAFA",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
          }}
        >
          Start Shipping Today.
        </h2>

        {/* Sub-copy — text-whisper on brand-forest, NEVER surface, NEVER lime */}
        <p
          className="mb-10"
          style={{
            color: "#DCE8CA",
            fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
            maxWidth: "32rem",
          }}
        >
          Free forever for solo makers. No card required.
        </p>

        {/* Buttons — rounded pill style per design.
            Raw <a> elements are used here because Button.js does not accept a
            `style` prop, and these CTAs need inline color tokens to match the
            surface-white pill + brand-lime outline pill design exactly. */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* PRIMARY — surface bg + ink text, fully rounded pill */}
          <a
            href={PRIMARY}
            onClick={() => {
              trackEvent("cta_primary_click", { location: "cta_strip" });
              if (isExternal(PRIMARY)) {
                trackEvent("outbound_cta_redirect", { destination: PRIMARY });
              }
            }}
            className="inline-block px-8 py-3 text-base md:text-lg font-bold rounded-none cursor-pointer transition-colors duration-150"
            style={{ backgroundColor: "#FAFAFA", color: "#09110C" }}
          >
            Create account
          </a>

          {/* SECONDARY — outline brand-lime, fully rounded pill */}
          <a
            href={SECONDARY}
            onClick={() => {
              trackEvent("cta_secondary_click", { location: "cta_strip" });
              if (isExternal(SECONDARY)) {
                trackEvent("outbound_cta_redirect", { destination: SECONDARY });
              }
            }}
            className="inline-block px-8 py-3 text-base md:text-lg font-bold rounded-none border-2 cursor-pointer transition-colors duration-150"
            style={{
              backgroundColor: "transparent",
              color: "#BCFCA1",
              borderColor: "#BCFCA1",
            }}
          >
            Contact sales
          </a>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import IconsBgFrame from "@/components/ui/IconsBgFrame";

// ─── Tunables ────────────────────────────────────────────────────────────────

// Stamp + cupid video
const STAMP_WIDTH = "clamp(180px, 40cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";
const VIDEO_INSET = { top: "26%", left: "14%", right: "14%", bottom: "26%" };

// Founder card (left of stamp)
const FOUNDER_LEFT = "4cqi";
const FOUNDER_TOP = "50%";
const FOUNDER_WIDTH = "clamp(100px, 22cqi, 178px)";
const FOUNDER_NAME = "Mr. Founder";
const FOUNDER_TITLE = "AI SAAS";
const FOUNDER_LABEL_GAP = "1.2cqi";

// Affiliate card (right of stamp)
const AFFILIATE_RIGHT = "2cqi";
const AFFILIATE_TOP = "50%";
const AFFILIATE_WIDTH = "clamp(90px, 20cqi, 160px)";

// Z-index stack
const Z_BG = 1;
const Z_CARDS = 2;
const Z_STAMP = 3;

// CTA
const ctaUrl = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";

export default function FeatureMatch() {
  const ref = useSectionInView("features-match");

  return (
    <section
      ref={ref}
      id="features-match"
      aria-labelledby="features-match-heading"
      className="scroll-mt-20 flex flex-col md:flex-row min-h-screen"
    >
      {/* Left column — static layered visual */}
      <div
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:min-h-screen overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        {/* Layer 1 — background photo */}
        <img
          src="/assets/Feature-match-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: Z_BG }}
        />

        {/* Layer 2a — Founder card with name + title labels */}
        <div
          className="absolute pointer-events-none select-none flex flex-col items-center"
          style={{
            left: FOUNDER_LEFT,
            top: FOUNDER_TOP,
            transform: "translateY(-50%)",
            width: FOUNDER_WIDTH,
            zIndex: Z_CARDS,
            gap: FOUNDER_LABEL_GAP,
          }}
        >
          <img
            src="/assets/founder-componant.webp"
            alt="Example founder profile"
            className="w-full h-auto block"
          />
          <div
            className="font-bold text-center w-full"
            style={{
              backgroundColor: "#DCE8CA",
              color: "#1E4D2F",
              fontSize: "clamp(0.875rem, 1.8cqi, 1.125rem)",
              padding: "clamp(0.4rem, 1cqi, 0.6rem) clamp(0.75rem, 2cqi, 1.25rem)",
            }}
          >
            {FOUNDER_NAME}
          </div>
          <div
            className="font-medium text-center"
            style={{
              backgroundColor: "#DCE8CA",
              color: "#1E4D2F",
              fontSize: "clamp(0.75rem, 1.4cqi, 0.95rem)",
              padding: "clamp(0.3rem, 0.8cqi, 0.5rem) clamp(1rem, 3cqi, 1.5rem)",
            }}
          >
            {FOUNDER_TITLE}
          </div>
        </div>

        {/* Layer 2b — Affiliate card */}
        <img
          src="/assets/affiliate-component.webp"
          alt="Example affiliate profile"
          className="absolute pointer-events-none select-none"
          style={{
            right: AFFILIATE_RIGHT,
            top: AFFILIATE_TOP,
            transform: "translateY(-50%)",
            width: AFFILIATE_WIDTH,
            height: "auto",
            zIndex: Z_CARDS,
          }}
        />

        {/* Layer 3 — stamp frame + cupid video */}
        <div
          className="absolute"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            width: STAMP_WIDTH,
            transform: "translate(-50%, -50%)",
            zIndex: Z_STAMP,
          }}
        >
          <IconsBgFrame
            fill="#0A110F"
            className="relative w-full h-auto block"
            style={{ zIndex: 1 }}
          />

          <div
            className="absolute overflow-hidden"
            style={{
              top: VIDEO_INSET.top,
              left: VIDEO_INSET.left,
              right: VIDEO_INSET.right,
              bottom: VIDEO_INSET.bottom,
              borderRadius: "4px",
              zIndex: 2,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            >
              <source src="/assets/videos/cupid.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      {/* Right column — copy + CTA */}
      <div
        className="relative w-full md:w-[55%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#FAFAFA",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <p
          className="mb-4"
          style={{
            color: "#5AAA77",
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
          }}
        >
          Affiliates in your niche.
        </p>

        <h2
          id="features-match-heading"
          className="font-bold leading-tight mb-6 md:mb-8"
          style={{
            color: "#09110C",
            fontSize: "clamp(1.875rem, 3vw, 2.625rem)",
          }}
        >
          Get matched with creators in 72 hours.
        </h2>

        <p
          className="leading-relaxed mb-8 md:mb-12"
          style={{
            color: "#1E4D2F",
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            maxWidth: "52ch",
          }}
        >
          Affiliates in your niche, already trusted by your audience. We match
          you with content creators who have 40K to 250K followers in the
          space your idea lives in. They see your pitch within three days. If
          none of them want in, you get your fee back.
        </p>

        <div>
          <Button
            variant="primary"
            tone="light"
            href={ctaUrl}
            onClick={() =>
              trackEvent("cta_primary_click", { location: "feature_match" })
            }
            className="text-base md:text-xl px-8 md:px-14 py-3 md:py-4"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

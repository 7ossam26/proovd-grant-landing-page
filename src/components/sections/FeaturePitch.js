"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ *
 *  Tunables
 * ------------------------------------------------------------------ */

// Long verbatim "uhh, I've been thinking" pitch. Long enough to fill the arc once;
// no repetition factor needed.
const TEXT_PHRASE =
  "I, uhh, I’ve been thinking about this idea, and, umm, it’s kind of like a SaaS platform, you know? Like, it would help… well, I guess it helps teams organize things, but not just like normal project tools, more like it, uhh, understands what you’re doing and suggests what to do next? Or, umm, maybe it automates parts of it? I’m still figuring that out. It’s sort of like… you log in, and it kind of adapts to your workflow automatically, I think. I mean, I’m not totally sure what the main feature is yet, but the idea is that it saves time and, uhh, reduces, you know, decision fatigue? Yeah, I just, umm, I feel like there’s something there, I just haven’t fully nailed down what it actually does yet.";
const TEXT_SCROLL_DURATION_S = 9;        // 14s → 9s, faster

// Curved text (SVG)
const TEXT_LEFT = "0%";
const TEXT_TOP = "32%";
const TEXT_WIDTH = "55%";
const TEXT_FONT_SIZE = 18;
const TEXT_FILL = "#FAFAFA";
const TEXT_ARC_PATH = "M 10,30 Q 120,210 380,90";
const TEXT_VIEWBOX = "0 0 400 220";

// Stamp + mic video — shared across all 3 features for consistent sizing.
const STAMP_WIDTH = "clamp(220px, 42cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// Card chain — sizes vary along an arc-mirroring shape (small → big → small),
// no rotation per the new design. Vertical offsets trace the arc apex.
const CHAIN_LEFT = "calc(50% + 12cqi)";
const CHAIN_TOP = "calc(50% - 5cqi)";
const CHAIN_WIDTH = "64cqi";
const CHAIN_HEIGHT = "30cqi";
const CHAIN_GAP = "0.6cqi";
const CHAIN_DURATION_S = 8;              // 12s → 8s, faster

// Per-card data — width varies on an arc; marginTop traces the arc apex (apex card lowest).
const CARDS = [
  { src: "/assets/feature-pitch-card-1.png", width: "12cqi",   marginTop: "0cqi" },
  { src: "/assets/feature-pitch-card-2.png", width: "15cqi",   marginTop: "2cqi" },
  { src: "/assets/feature-pitch-card-3.png", width: "17.5cqi", marginTop: "4cqi" },
  { src: "/assets/feature-pitch-card-4.png", width: "14cqi",   marginTop: "2cqi" },
];

// Z-index stack
const Z_BG = 1;
const Z_CARDS = 2;
const Z_STAMP = 4;
const Z_TEXT = 3;

const CONVEYOR_CARDS = [...CARDS, ...CARDS];

/* ------------------------------------------------------------------ */

export default function FeaturePitch() {
  const ref = useSectionInView("features-pitch");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={ref}
      id="features-pitch"
      aria-labelledby="features-pitch-heading"
      className="proovd-snap-section scroll-mt-20 flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0"
    >
      <div
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden md:overflow-visible"
        style={{ containerType: "inline-size" }}
      >
        {/* Layer 1 — blurred room photo */}
        {/* TODO(assets): /public/assets/feature-pitch-bg.webp */}
        <img
          src="/assets/feature-pitch-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: Z_BG }}
        />

        {/* Layer 4 — curved typing text arcing toward the centered stamp */}
        <svg
          className="absolute"
          style={{ left: TEXT_LEFT, top: TEXT_TOP, width: TEXT_WIDTH, zIndex: Z_TEXT }}
          viewBox={TEXT_VIEWBOX}
          aria-hidden="true"
        >
          <defs>
            <path id="text-arc" d={TEXT_ARC_PATH} />
          </defs>
          <text
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: TEXT_FONT_SIZE,
              fill: TEXT_FILL,
            }}
          >
            <textPath href="#text-arc" startOffset="0%">
              {!reducedMotion && (
                <animate
                  attributeName="startOffset"
                  from="-100%"
                  to="0%"
                  dur={`${TEXT_SCROLL_DURATION_S}s`}
                  repeatCount="indefinite"
                />
              )}
              {TEXT_PHRASE}
            </textPath>
          </text>
        </svg>

        {/* Layer 2 — endless cards conveyor (BEHIND the stamp). No rotation; size + vertical
            offset together trace the same arc shape as the curved text. */}
        <div
          className="absolute"
          style={{
            left: CHAIN_LEFT,
            top: CHAIN_TOP,
            width: CHAIN_WIDTH,
            height: CHAIN_HEIGHT,
            overflow: "hidden",
            zIndex: Z_CARDS,
          }}
        >
          <div
            className="pitch-cards-track flex flex-row"
            style={{
              gap: CHAIN_GAP,
              alignItems: "flex-start",
              animationDuration: `${CHAIN_DURATION_S}s`,
            }}
          >
            {CONVEYOR_CARDS.map((card, i) => (
              // TODO(assets): {card.src}
              <div key={i} className="flex-shrink-0">
                <img
                  src={card.src}
                  alt=""
                  aria-hidden="true"
                  className="h-auto object-contain pointer-events-none select-none block"
                  style={{
                    width: card.width,
                    marginTop: card.marginTop,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3 — stamp-masked mic video */}
        <div
          className="absolute"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            width: STAMP_WIDTH,
            zIndex: Z_STAMP,
            transform: "translate(-50%, -50%)",
            aspectRatio: `${STAMP_ASPECT}`,
          }}
        >
          {/* TODO(assets): /public/assets/videos/feature-pitch-mic.webm */}
          <StampMaskedVideo
            videoSrc="/assets/videos/feature-pitch-mic.webm"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Right column — copy + CTA */}
      <div
        className="relative w-full md:w-[55%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#BCFCA1",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <h2
          id="features-pitch-heading"
          className="text-ink font-bold leading-tight mb-6 md:mb-8"
          style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
        >
          Your pitch done in ten minutes
        </h2>

        <p
          className="text-brand-forest leading-relaxed mb-8 md:mb-12"
          style={{
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            maxWidth: "52ch",
          }}
        >
          Record yourself explaining the idea like you would to a friend, or
          write it out if you prefer. Our AI turns the mess into a structured
          pitch — problem, solution, competition — and fills your listing for
          you. Review it, fix what&apos;s wrong, submit.
        </p>

        <div>
          <Button
            variant="primary"
            tone="light"
            href={ctaUrl}
            onClick={() =>
              trackEvent("cta_primary_click", { location: "feature_pitch" })
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

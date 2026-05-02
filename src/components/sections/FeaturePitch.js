"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import FeatureSectionNav from "@/components/ui/FeatureSectionNav";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ *
 *  Tunables
 * ------------------------------------------------------------------ */

// Long verbatim "uhh, I've been thinking" pitch.
const TEXT_PHRASE =
  "I, uhh, I’ve been thinking about this idea, and, umm, it’s kind of like a SaaS platform, you know? Like, it would help… well, I guess it helps teams organize things, but not just like normal project tools, more like it, uhh, understands what you’re doing and suggests what to do next? Or, umm, maybe it automates parts of it? I’m still figuring that out. It’s sort of like… you log in, and it kind of adapts to your workflow automatically, I think. I mean, I’m not totally sure what the main feature is yet, but the idea is that it saves time and, uhh, reduces, you know, decision fatigue? Yeah, I just, umm, I feel like there’s something there, I just haven’t fully nailed down what it actually does yet.";

// One continuous semi-circular arc whose midpoint sits exactly at the
// stamp center (SVG 50, 50). The two halves below are a De Casteljau
// subdivision of the single curve `M 0 15 Q 50 85, 100 15` — so they
// share an identical tangent at the meeting point and visually read
// as one uninterrupted arc that the stamp covers in the middle.
//   - Text rides the LEFT half (flowing into the stamp)
//   - Card images ride the RIGHT half (flowing out)
//   - rotate="auto" tilts each card to the path tangent (beads on string)
const ARC_VIEWBOX = "0 0 100 100";
const TEXT_ARC_PATH = "M 0 15 Q 25 50, 50 50";  // upper-left → stamp center
const CARD_ARC_PATH = "M 50 50 Q 75 50, 100 15"; // stamp center → upper-right
const TEXT_FONT_SIZE = 3.6;  // viewBox units (≈ panel-relative %)
const TEXT_FILL = "#FAFAFA";
const TEXT_DURATION_S = 9;
const CARD_DURATION_S = 8;

// Card render box in SVG units. preserveAspectRatio="xMidYMid meet" inside
// each <image> means the underlying PNG keeps its own aspect ratio inside
// this box (no distortion).
const CARD_W = 16;
const CARD_H = 20;
const CARDS = [
  { src: "/assets/feature-pitch-card-1.png" },
  { src: "/assets/feature-pitch-card-2.png" },
  { src: "/assets/feature-pitch-card-3.png" },
  { src: "/assets/feature-pitch-card-4.png" },
];

// Stamp + mic video — width / video-scale come from .proovd-stamp-frame
// (responsive via CSS vars).
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// Z-index stack — cards/text sit BEHIND the stamp so they appear to flow
// in/out of it.
const Z_BG = 1;
const Z_FLOW = 2;
const Z_STAMP = 3;

// Bezier helper for rendering static (reduced-motion) card positions.
function quadBezierPoint(p0, p1, p2, t) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}
const CARD_PATH_P0 = { x: 50, y: 50 };
const CARD_PATH_P1 = { x: 75, y: 50 };
const CARD_PATH_P2 = { x: 100, y: 15 };

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
      className="proovd-feature-snap flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0"
    >
      <div
        className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden md:overflow-visible"
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

        {/* Single SVG — text rides the LEFT half of one continuous smile-shaped
            arc that passes under the stamp; cards ride the RIGHT half and
            rotate to follow the path tangent. Both halves share the apex
            point at the stamp's center, so visually it reads as one
            uninterrupted curve that the stamp interrupts in the middle. */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={ARC_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          style={{ zIndex: Z_FLOW }}
          aria-hidden="true"
        >
          <defs>
            <path id="pitch-text-arc" d={TEXT_ARC_PATH} />
            <path id="pitch-card-arc" d={CARD_ARC_PATH} />
          </defs>

          {/* Text scrolling INTO the stamp along the left half */}
          <text
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: TEXT_FONT_SIZE,
              fill: TEXT_FILL,
            }}
          >
            <textPath href="#pitch-text-arc" startOffset="0%">
              {!reducedMotion && (
                <animate
                  attributeName="startOffset"
                  from="-100%"
                  to="0%"
                  dur={`${TEXT_DURATION_S}s`}
                  repeatCount="indefinite"
                />
              )}
              {TEXT_PHRASE}
            </textPath>
          </text>

          {/* Cards emerging from the stamp along the right half. Each card
              is offset in time so the chain stays evenly distributed along
              the path. rotate="auto" tilts each card to the path tangent. */}
          {CARDS.map((card, i) => {
            const t = i / CARDS.length;
            const staticPos = quadBezierPoint(CARD_PATH_P0, CARD_PATH_P1, CARD_PATH_P2, t);
            return (
              <g
                key={card.src}
                transform={reducedMotion ? `translate(${staticPos.x}, ${staticPos.y})` : undefined}
              >
                <image
                  href={card.src}
                  width={CARD_W}
                  height={CARD_H}
                  x={-CARD_W / 2}
                  y={-CARD_H / 2}
                  preserveAspectRatio="xMidYMid meet"
                />
                {!reducedMotion && (
                  <animateMotion
                    dur={`${CARD_DURATION_S}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    begin={`-${t * CARD_DURATION_S}s`}
                  >
                    <mpath href="#pitch-card-arc" />
                  </animateMotion>
                )}
              </g>
            );
          })}
        </svg>

        {/* Layer 3 — stamp-masked mic video */}
        <div
          className="absolute proovd-stamp-frame"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
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
        className="relative w-full md:w-[60%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#BCFCA1",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <FeatureSectionNav location="feature_pitch" animate />

        <h2
          id="features-pitch-heading"
          className="text-ink font-bold leading-tight mb-5 md:mb-6"
          style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
        >
          Your pitch done in ten minutes
        </h2>

        <p
          className="text-brand-forest leading-relaxed mb-6 md:mb-8"
          style={{
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            maxWidth: "48ch",
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
            className="!text-[#BBFCA2] text-sm md:text-base px-6 md:px-10 py-2.5 md:py-3"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

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

// One continuous arc whose midpoint sits exactly at the stamp center
// (SVG 50, 50). Both halves are a De Casteljau subdivision of the single
// curve `M 0 35 Q 50 65, 100 35` — same tangent at the meeting point so
// they read as one uninterrupted curve passing behind the stamp.
// Curve is intentionally gentle (depth 15) so cards rotating with the
// tangent vary by ~8° between neighbours instead of ~16°+.
//   - Text rides the LEFT half (flowing into the stamp)
//   - Card images ride the RIGHT half (flowing out)
//   - rotate="auto" tilts each card to the path tangent (beads on string)
const ARC_VIEWBOX = "0 0 100 100";
const TEXT_ARC_PATH = "M 0 35 Q 25 50, 50 50";  // upper-left → stamp center
const CARD_ARC_PATH = "M 50 50 Q 75 50, 100 35"; // stamp center → upper-right
const TEXT_FONT_SIZE = 4.7;  // viewBox units (≈ panel-relative %)
const TEXT_FILL = "#FAFAFA";
const TEXT_DURATION_S = 7;
const CARD_DURATION_S = 2;

// Card render box in SVG units. preserveAspectRatio="xMidYMid meet" inside
// each <image> means the underlying PNG keeps its own aspect ratio inside
// this box (no distortion). Smaller box → more visible gap between cards
// on the arc (since the path length is fixed and cards fill less of it).
const CARD_W = 15;
const CARD_H = 19;

// ─── Card rotation knobs ────────────────────────────────────────────────
// AUTO_ROTATE_CARDS = true → each card tilts to the path tangent at its
//   current position (beads-on-a-string). false → cards stay upright and
//   only their position rides the arc.
// CARD_TILT_DEG → constant offset added on top of the auto rotation
//   (or used as the only rotation when AUTO_ROTATE_CARDS is false).
//   Try negative values to lean cards into the curve, positive to lean out.
const AUTO_ROTATE_CARDS = true;
const CARD_TILT_DEG = 0;
// Number of cards visible on the arc at once. Lower = more space between
// cards (each card takes 1/N of the path). To use all 4 PNG assets,
// set the slice below to (0, 4) — but spacing tightens.
const CARDS = [
  { src: "/assets/feature-pitch-card-1.png" },
  { src: "/assets/feature-pitch-card-2.png" },
  { src: "/assets/feature-pitch-card-3.png" },
  { src: "/assets/feature-pitch-card-4.png" },
].slice(0, 5);

// ─── "Magical" entry/exit knobs ──────────────────────────────────────────
// Cards fade + blur in over the first FADE_IN_T fraction of their journey
// (emerging out of the stamp), and fade + blur back out over the last
// FADE_OUT_T fraction (dissolving at the upper-right). Set BLUR_MAX_STD to
// 0 to disable blur entirely (purely opacity fade) — keeps the brand
// "no blur" rule intact while still softening the pop.
const CARD_FADE_IN_T = 0.22;
const CARD_FADE_OUT_T = 0.22;
const CARD_BLUR_MAX_STD = 2.5;

// Stamp + mic video — width / video-scale come from .proovd-stamp-frame
// (responsive via CSS vars).
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// Mobile-only stamp tunables (viewport < 768px). Adjust freely.
const MOBILE_STAMP_WIDTH = "180px";   // global mobile default = 219px
const MOBILE_VIDEO_SCALE = 0.85;       // global mobile default = 0.69

// Stamp background — fills the stamp shape around the scaled video.
const STAMP_BG_COLOR = "#0E1211";      // ink (default)

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
const CARD_PATH_P2 = { x: 100, y: 35 };

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
      style={{ backgroundColor: "#BCFCA1" }}
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

            {/* Spatial fade for the scrolling text — characters near the
                path start (X=0) and end (X=50) are masked to transparent,
                so they materialize/dematerialize as they scroll through. */}
            <linearGradient
              id="pitch-text-fade-grad"
              x1="0"
              y1="0"
              x2="50"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset={CARD_FADE_IN_T} stopColor="white" stopOpacity="1" />
              <stop offset={1 - CARD_FADE_OUT_T} stopColor="white" stopOpacity="1" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask
              id="pitch-text-fade-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="100"
              height="100"
            >
              <rect width="100" height="100" fill="url(#pitch-text-fade-grad)" />
            </mask>

            {/* Per-card Gaussian blur filters with stdDeviation animated in
                sync with the card's animateMotion — high blur at spawn and
                exit, zero in the middle. */}
            {!reducedMotion &&
              CARD_BLUR_MAX_STD > 0 &&
              CARDS.map((_, i) => {
                const t = i / CARDS.length;
                const begin = `-${t * CARD_DURATION_S}s`;
                return (
                  <filter
                    key={`pitch-card-blur-${i}`}
                    id={`pitch-card-blur-${i}`}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation={CARD_BLUR_MAX_STD}>
                      <animate
                        attributeName="stdDeviation"
                        values={`${CARD_BLUR_MAX_STD};0;0;${CARD_BLUR_MAX_STD}`}
                        keyTimes={`0;${CARD_FADE_IN_T};${1 - CARD_FADE_OUT_T};1`}
                        dur={`${CARD_DURATION_S}s`}
                        repeatCount="indefinite"
                        begin={begin}
                      />
                    </feGaussianBlur>
                  </filter>
                );
              })}
          </defs>

          {/* Text scrolling INTO the stamp along the left half */}
          <text
            mask="url(#pitch-text-fade-mask)"
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
            const begin = `-${t * CARD_DURATION_S}s`;
            const useBlur = !reducedMotion && CARD_BLUR_MAX_STD > 0;
            return (
              <g
                key={card.src}
                transform={reducedMotion ? `translate(${staticPos.x}, ${staticPos.y})` : undefined}
                style={useBlur ? { filter: `url(#pitch-card-blur-${i})` } : undefined}
              >
                {/* Inner <g> holds CARD_TILT_DEG. animateMotion's auto-rotate
                    is applied to the OUTER <g>, so the two compose: card is
                    first tilted by CARD_TILT_DEG, then rotated to follow the
                    path tangent. */}
                <g transform={`rotate(${CARD_TILT_DEG})`}>
                  <image
                    href={card.src}
                    width={CARD_W}
                    height={CARD_H}
                    x={-CARD_W / 2}
                    y={-CARD_H / 2}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
                {!reducedMotion && (
                  <>
                    {/* Materialize / dematerialize at the path endpoints. */}
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes={`0;${CARD_FADE_IN_T};${1 - CARD_FADE_OUT_T};1`}
                      dur={`${CARD_DURATION_S}s`}
                      repeatCount="indefinite"
                      begin={begin}
                    />
                    <animateMotion
                      dur={`${CARD_DURATION_S}s`}
                      repeatCount="indefinite"
                      rotate={AUTO_ROTATE_CARDS ? "auto" : "0"}
                      begin={begin}
                    >
                      <mpath href="#pitch-card-arc" />
                    </animateMotion>
                  </>
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
            "--stamp-width-mobile": MOBILE_STAMP_WIDTH,
            "--video-scale-mobile": MOBILE_VIDEO_SCALE,
          }}
        >
          {/* TODO(assets): /public/assets/videos/feature-pitch-mic.webm */}
          <StampMaskedVideo
            videoSrc="/assets/videos/feature-pitch-mic.webm"
            bgColor={STAMP_BG_COLOR}
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
          The Messy Version Works
        </h2>

        <p
          className="text-brand-forest leading-relaxed mb-6 md:mb-8"
          style={{
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            maxWidth: "48ch",
          }}
        >
          Record yourself explaining the idea like you would to a friend, or write it out if that’s easier. Proovd turns the rough version into a structured pitch and fills your listing, so you can skim it, fix what feels off, and submit in about 10 minutes.
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

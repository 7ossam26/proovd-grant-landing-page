"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ *
 *  Tunables — edit these to adjust the visual without touching JSX
 * ------------------------------------------------------------------ */

// Looping curved-text marquee — text flows endlessly along the arc into the stamp
const TEXT_PHRASE = "this is my ideaaaa";
const TEXT_SEPARATOR = "   •   ";   // bullet + spaces between repeats
const TEXT_REPEAT = 24;                  // copies laid down on the path so it's always full
const TEXT_SCROLL_DURATION_S = 14;       // seconds per full -100% startOffset shift

// Curved text (SVG)
const TEXT_LEFT = "0%";
const TEXT_TOP = "38%";
const TEXT_WIDTH = "55%";
const TEXT_FONT_SIZE = 36;
const TEXT_FILL = "#FAFAFA";
// Counterclockwise arc — dips down through the middle, rises toward the stamp.
const TEXT_ARC_PATH = "M 10,30 Q 120,210 380,90";
const TEXT_VIEWBOX = "0 0 400 220";

// Stamp + mic video (centered in the bg photo)
// width uses cqi so the stamp scales with the column's inline size on mobile,
// then caps at 320px on desktop where the column gets wide.
const STAMP_WIDTH = "clamp(180px, 50cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";
const VIDEO_INSET = { top: "13%", left: "15%", right: "15%", bottom: "13%" };

// Card chain — cqi units so chain + cards scale with the column at every breakpoint.
// Desktop col ≈ 812px → 12cqi ≈ 97px, 64cqi ≈ 520px (matches the previous fixed-px sizing).
// Mobile col ≈ 393px → 12cqi ≈ 47px, 64cqi ≈ 251px (a peek of cards behind the stamp).
const CHAIN_LEFT = "calc(50% + 12cqi)";   // overlaps the stamp's right edge so cards emerge from under it
const CHAIN_TOP = "calc(50% - 5cqi)";
const CHAIN_WIDTH = "64cqi";
const CHAIN_HEIGHT = "27cqi";             // tall enough to fit rotated cards without clipping their corners
const CHAIN_GAP = "0.6cqi";
const CHAIN_DURATION_S = 12;              // one full conveyor cycle (seamless because the set is duplicated)

// Per-card data — width/marginTop in cqi so cards scale with the column.
const CARDS = [
  { src: "/assets/feature-pitch-card-1.png", width: "14cqi",   rotate: 0,  marginTop: "0cqi" },
  { src: "/assets/feature-pitch-card-2.png", width: "14cqi",   rotate: -1, marginTop: "2cqi" },
  { src: "/assets/feature-pitch-card-3.png", width: "13.5cqi", rotate: 4,  marginTop: "1cqi" },
  { src: "/assets/feature-pitch-card-4.png", width: "13cqi",   rotate: 8,  marginTop: "2.5cqi" },
];

// Z-index stack — cards sit BELOW the stamp so they emerge from behind it
const Z_BG = 1;
const Z_CARDS = 2;
const Z_STAMP = 4;
const Z_TEXT = 3;

const REPEATED_TEXT = `${TEXT_PHRASE}${TEXT_SEPARATOR}`.repeat(TEXT_REPEAT);
// Track has [...CARDS, ...CARDS] so translating from -50% to 0 of the duplicated row produces a seamless loop
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
      className="scroll-mt-20 flex flex-col md:flex-row min-h-screen"
    >
      {/* Left column — layered visual.
          aspect-[4/5] gives the absolute children dimensions on mobile;
          containerType enables cqi units so the stamp scales with column width. */}
      <div
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:min-h-screen overflow-hidden md:overflow-visible"
        style={{ containerType: "inline-size" }}
      >
        {/* Layer 1 — blurred room photo */}
        {/* TODO(assets): /public/assets/feature-pitch-bg.png */}
        <img
          src="/assets/feature-pitch-bg.png"
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
              {REPEATED_TEXT}
            </textPath>
          </text>
        </svg>

        {/* Layer 2 — endless cards conveyor (BEHIND the stamp; they emerge from behind it).
            overflow:hidden clips the duplicated track so it doesn't bleed out the left side of the column;
            the container's left edge sits ~60px inside the stamp, and stamp z-index hides cards there
            so they appear to emerge from behind the stamp. */}
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
                    transform: `rotate(${card.rotate}deg)`,
                    marginTop: card.marginTop,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3 — stamp centered in the background photo, with mic video on top */}
        <div
          className="absolute"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            width: STAMP_WIDTH,
            zIndex: Z_STAMP,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* TODO(assets): /public/assets/icons-bg.png */}
          <img
            src="/assets/icons-bg.png"
            alt=""
            aria-hidden="true"
            className="relative w-full h-auto block"
            style={{ zIndex: 1 }}
          />

          {/* Mic video sits on top of the stamp interior */}
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
            {/* TODO(assets): /public/assets/videos/feature-pitch-mic.mp4 */}
            {/* TODO(assets): /public/assets/videos/feature-pitch-mic.webm */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/assets/videos/feature-pitch-mic.mp4"
                type="video/mp4"
              />
              <source
                src="/assets/videos/feature-pitch-mic.webm"
                type="video/webm"
              />
            </video>
          </div>
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

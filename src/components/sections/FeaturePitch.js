"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ *
 *  Tunables — edit these to adjust the visual without touching JSX
 * ------------------------------------------------------------------ */

// Typing animation
const TYPING_FULL = "this is my ideaaaa";
const TYPING_INTERVAL_MS = 50;        // per-character speed
const TYPING_PAUSE_MS = 100;         // hold at end before restarting

// Curved text (SVG)
const TEXT_LEFT = "0%";
const TEXT_TOP = "40%";
const TEXT_WIDTH = "55%";
const TEXT_FONT_SIZE = 36;
const TEXT_FILL = "#FAFAFA";
// Counterclockwise arc — dips down through the middle, rises toward the stamp.
const TEXT_ARC_PATH = "M 10,30 Q 120,210 380,90";
const TEXT_VIEWBOX = "0 0 400 220";

// Stamp + mic video (centered in the bg photo)
const STAMP_WIDTH_PX = 320;
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";
const VIDEO_INSET = { top: "8%", left: "11%", right: "11%", bottom: "8%" };

// Card chain (positioned relative to stamp center)
const CHAIN_LEFT = "calc(50% + 175px)";   // start just past the stamp's right edge
const CHAIN_TOP = "calc(50% - 40px)";
const CHAIN_WIDTH_PX = 520;
const CHAIN_GAP_PX = 14;

// Card animation
const CARD_DURATION_S = 5;            // total cycle: enter → hold → exit
const CARD_STAGGER_S = 0.4;           // delay between successive cards
const CARD_TIMING = "ease-in-out";

// Per-card data — add / remove entries here to change the chain
const CARDS = [
  { src: "/assets/feature-pitch-card-1.png", width: 115, rotate: -6, marginTop: 0 },
  { src: "/assets/feature-pitch-card-2.png", width: 115, rotate: -1, marginTop: 16 },
  { src: "/assets/feature-pitch-card-3.png", width: 110, rotate: 4, marginTop: 8 },
  { src: "/assets/feature-pitch-card-4.png", width: 105, rotate: 8, marginTop: 20 },
];

// Z-index stack — cards sit BELOW the stamp so they emerge from behind it
const Z_BG = 1;
const Z_CARDS = 2;
const Z_STAMP = 4;
const Z_TEXT = 3;

/* ------------------------------------------------------------------ */

export default function FeaturePitch() {
  const ref = useSectionInView("features-pitch");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplayedText(TYPING_FULL);
      return;
    }

    let i = 0;
    let resetTimeout;
    let interval;

    const startInterval = () => {
      interval = setInterval(() => {
        i += 1;
        if (i <= TYPING_FULL.length) {
          setDisplayedText(TYPING_FULL.slice(0, i));
        } else {
          clearInterval(interval);
          resetTimeout = setTimeout(() => {
            i = 0;
            setDisplayedText("");
            startInterval();
          }, TYPING_PAUSE_MS);
        }
      }, TYPING_INTERVAL_MS);
    };

    startInterval();

    return () => {
      clearInterval(interval);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="features-pitch"
      aria-labelledby="features-pitch-heading"
      className="scroll-mt-20 flex flex-col md:flex-row min-h-screen"
    >
      {/* Left column — layered visual */}
      <div className="relative w-full md:w-[57%] md:min-h-screen overflow-visible">
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
              {displayedText}
            </textPath>
          </text>
        </svg>

        {/* Layer 2 — chained output cards (BEHIND the stamp; they emerge from behind it) */}
        <div
          className="absolute hidden md:flex flex-row"
          style={{
            left: CHAIN_LEFT,
            top: CHAIN_TOP,
            width: `${CHAIN_WIDTH_PX}px`,
            height: "auto",
            zIndex: Z_CARDS,
            gap: `${CHAIN_GAP_PX}px`,
            alignItems: "flex-start",
          }}
        >
          {CARDS.map((card, i) => (
            // TODO(assets): {card.src}
            <div
              key={card.src}
              className="pitch-card-anim flex-shrink-0"
              style={{
                opacity: 0,
                animation: `pitch-card-slide ${CARD_DURATION_S}s ${CARD_TIMING} ${i * CARD_STAGGER_S}s infinite`,
              }}
            >
              <img
                src={card.src}
                alt=""
                aria-hidden="true"
                className="h-auto object-contain pointer-events-none select-none block"
                style={{
                  width: `${card.width}px`,
                  transform: `rotate(${card.rotate}deg)`,
                  marginTop: `${card.marginTop}px`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Layer 3 — stamp centered in the background photo, with mic video on top */}
        <div
          className="absolute"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            width: `${STAMP_WIDTH_PX}px`,
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
        className="relative w-full md:w-[55%] flex flex-col justify-center py-24"
        style={{
          backgroundColor: "#BCFCA1",
          zIndex: 20,
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          paddingRight: "clamp(2rem, 5vw, 5rem)",
        }}
      >
        <h2
          id="features-pitch-heading"
          className="text-ink font-black leading-tight mb-8"
          style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
        >
          Your pitch done in ten minutes
        </h2>

        <p
          className="text-brand-forest leading-relaxed mb-12"
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
            className="text-xl px-14 py-4"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

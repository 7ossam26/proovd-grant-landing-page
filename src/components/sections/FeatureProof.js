"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import FeatureSectionNav from "@/components/ui/FeatureSectionNav";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

/* ------------------------------------------------------------------ *
 *  Tunables
 * ------------------------------------------------------------------ */

// Stamp width / video-scale come from .proovd-stamp-frame (CSS vars, responsive).
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// SVG works in a 100×100 viewBox with preserveAspectRatio="none" so curves stretch
// to fill any column shape. All path coords are percentages of the column.
// Top paths converge at the stamp's top edge (~y=32); bottom paths emerge from
// the stamp's bottom edge (~y=68). Stamp is centered at (50,50) and roughly
// 36% tall in the SVG's stretched coords.
const TOP_PATHS = [
  { id: "proof-top-l", d: "M 18 -8 L 18 32" },
  { id: "proof-top-c", d: "M 50 -8 L 50 32" },
  { id: "proof-top-r", d: "M 82 -8 L 82 32" },
];
const BOTTOM_PATHS = [
  { id: "proof-bot-l", d: "M 18 68 L 18 108" },
  { id: "proof-bot-c", d: "M 50 68 L 50 108" },
  { id: "proof-bot-r", d: "M 82 68 L 82 108" },
];

const TOP_DUR_S = 5.0;        // travel time pledge → stamp
const BOTTOM_DUR_S = 5.0;     // travel time stamp → outer corners
const TOKENS_PER_LANE = 4;    // staggered along each lane

// Tokens fade in quickly then dissolve right as they enter/exit the stamp edge.
const FADE_VALUES = "0;1;1;0";
const TOP_FADE_KEYTIMES = "0;0.08;0.88;1";   // stay visible until stamp
const BOT_FADE_KEYTIMES = "0;0.12;0.90;1";   // appear right from stamp

const Z_BG = 1;
const Z_FUNNEL = 2;
const Z_STAMP = 4;

const PLEDGE_DATA = [
  { amount: 25, name: "Max Q." },
  { amount: 50, name: "Sara K." },
  { amount: 75, name: "Jay M." },
  { amount: 100, name: "Alex T." },
  { amount: 22, name: "Kim R." },
  { amount: 64, name: "Tom B." },
  { amount: 39, name: "Lee S." },
  { amount: 84, name: "Ana P." },
  { amount: 15, name: "Rob W." },
  { amount: 27, name: "Mia C." },
  { amount: 41, name: "Dan F." },
  { amount: 90, name: "Zoe L." },
];

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ */

export default function FeatureProof() {
  const ref = useSectionInView("features-proof");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <section
      ref={ref}
      id="features-proof"
      aria-labelledby="features-proof-heading"
      className="proovd-feature-snap flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0"
    >
      <div
        className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <img
          src="/assets/feature-proof-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: Z_BG }}
        />

        {/* Funnel SVG — viewBox stretches with preserveAspectRatio="none" so paths
            fit any column dimensions. */}
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: Z_FUNNEL }}
            aria-hidden="true"
          >
            <defs>
              {TOP_PATHS.map((p) => (
                <path key={p.id} id={p.id} d={p.d} />
              ))}
              {BOTTOM_PATHS.map((p) => (
                <path key={p.id} id={p.id} d={p.d} />
              ))}
            </defs>

            {/* Top — pledge notification cards flowing into the stamp */}
            {TOP_PATHS.flatMap((path, laneIdx) =>
              Array.from({ length: TOKENS_PER_LANE }).map((_, i) => {
                const beginOffset = (i / TOKENS_PER_LANE) * TOP_DUR_S + laneIdx * 0.23;
                const pledge = PLEDGE_DATA[(laneIdx * TOKENS_PER_LANE + i) % PLEDGE_DATA.length];
                return (
                  <g key={`top-${laneIdx}-${i}`}>
                    <PledgeToken amount={pledge.amount} name={pledge.name} />
                    {!reducedMotion && (
                      <>
                        <animate
                          attributeName="opacity"
                          values={FADE_VALUES}
                          keyTimes={TOP_FADE_KEYTIMES}
                          dur={`${TOP_DUR_S}s`}
                          repeatCount="indefinite"
                          begin={`-${beginOffset}s`}
                        />
                        <animateMotion
                          dur={`${TOP_DUR_S}s`}
                          repeatCount="indefinite"
                          rotate="0"
                          begin={`-${beginOffset}s`}
                        >
                          <mpath href={`#${path.id}`} />
                        </animateMotion>
                      </>
                    )}
                  </g>
                );
              })
            )}

            {/* Bottom — dollar bills flowing out of the stamp */}
            {BOTTOM_PATHS.flatMap((path, laneIdx) =>
              Array.from({ length: TOKENS_PER_LANE }).map((_, i) => {
                const beginOffset = (i / TOKENS_PER_LANE) * BOTTOM_DUR_S + laneIdx * 0.31;
                const sizeVar = [0.85, 1, 1.1][i % 3];
                return (
                  <g key={`bot-${laneIdx}-${i}`}>
                    <DollarToken scale={sizeVar} />
                    {!reducedMotion && (
                      <>
                        <animate
                          attributeName="opacity"
                          values={FADE_VALUES}
                          keyTimes={BOT_FADE_KEYTIMES}
                          dur={`${BOTTOM_DUR_S}s`}
                          repeatCount="indefinite"
                          begin={`-${beginOffset}s`}
                        />
                        <animateMotion
                          dur={`${BOTTOM_DUR_S}s`}
                          repeatCount="indefinite"
                          rotate="0"
                          begin={`-${beginOffset}s`}
                        >
                          <mpath href={`#${path.id}`} />
                        </animateMotion>
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}

        {/* Stamp-masked trophy video */}
        <div
          className="absolute proovd-stamp-frame"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            transform: "translate(-50%, -50%)",
            zIndex: Z_STAMP,
            aspectRatio: `${STAMP_ASPECT}`,
            "--video-scale": 0.65,
          }}
        >
          {mounted && (
            <StampMaskedVideo
              videoSrc="/assets/videos/feature-proof-trophy.webm"
              videoSrcMp4="/assets/videos/feature-proof-trophy.mp4"
              fit="contain"
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      <div
        className="relative w-full md:w-[60%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#1E4D2F",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <FeatureSectionNav location="feature_proof" tone="forest" />



        <h2
          id="features-proof-heading"
          className="font-bold leading-tight mb-5 md:mb-6"
          style={{
            color: "#FAFAFA",
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          }}
        >
          People pledge. You get proof.
        </h2>

        <p
          className="leading-relaxed mb-6 md:mb-8"
          style={{
            color: "#DCE8CA",
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            maxWidth: "48ch",
          }}
        >
          Real money from real backers, tracked live. Affiliates share your
          idea with their audience over three weeks. Every click, every
          pledge, every backer&apos;s reason for buying lands in your
          dashboard in real time.
        </p>

        <div>
          <Button
            variant="secondary"
            tone="dark"
            href={ctaUrl}
            onClick={() =>
              trackEvent("cta_primary_click", { location: "feature_proof" })
            }
            className="text-sm md:text-base px-6 md:px-10 py-2.5 md:py-3"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

// Mini pledge notification card — mirrors the PledgeCard design from the Hero.
// Centered at (0,0) so animateMotion places the card center on the path.
function PledgeToken({ amount, name }) {
  const w = 12;
  const h = 8;
  const x = -w / 2;
  const y = -h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#BCFCA1" stroke="#1E4D2F" strokeWidth={0.35} />
      {/* Top notch bar */}
      <rect x={x + 1.8} y={y} width={4} height={0.7} fill="#1E4D2F" />
      {/* "NEW PLEDGE" label */}
      <text x={x + 0.9} y={y + 2.2} fontSize={1.3} fontFamily="Satoshi, sans-serif" fontWeight={700} fill="#1E4D2F">
        NEW PLEDGE
      </text>
      {/* Amount */}
      <text x={x + 0.9} y={y + 6.4} fontSize={4.2} fontFamily="Satoshi, sans-serif" fontWeight={900} fill="#09110C">
        ${amount}
      </text>
      {/* Name */}
      <text x={x + 0.9} y={y + h - 0.7} fontSize={1.4} fontFamily="Satoshi, sans-serif" fontWeight={500} fill="#09110C">
        {name}
      </text>
    </g>
  );
}

function DollarToken({ scale = 1 }) {
  const w = 10 * scale;
  const h = 4.3 * scale;
  return (
    <g transform={`translate(${-w / 2}, ${-h / 2})`}>
      <image
        href="/assets/feature-proof-dollar.webp"
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

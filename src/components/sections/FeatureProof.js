"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

/* ------------------------------------------------------------------ *
 *  Tunables
 * ------------------------------------------------------------------ */

const STAMP_WIDTH = "clamp(220px, 42cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// SVG works in a 100×100 viewBox with preserveAspectRatio="none" so curves stretch
// to fill any column shape. All path coords are percentages of the column.
const TOP_PATHS = [
  { id: "proof-top-l", d: "M 12 -8 C 18 18, 30 36, 50 50" },
  { id: "proof-top-c", d: "M 50 -8 C 50 14, 50 32, 50 50" },
  { id: "proof-top-r", d: "M 88 -8 C 82 18, 70 36, 50 50" },
];
const BOTTOM_PATHS = [
  { id: "proof-bot-l", d: "M 50 50 C 30 64, 18 82, 12 108" },
  { id: "proof-bot-c", d: "M 50 50 C 50 68, 50 86, 50 108" },
  { id: "proof-bot-r", d: "M 50 50 C 70 64, 82 82, 88 108" },
];

const TOP_DUR_S = 5.0;        // travel time pledge → stamp
const BOTTOM_DUR_S = 5.0;     // travel time stamp → outer corners
const TOKENS_PER_LANE = 4;    // staggered along each lane

const Z_BG = 1;
const Z_FUNNEL = 2;
const Z_STAMP = 4;

const PLEDGE_AMOUNTS = [25, 50, 75, 100, 22, 64, 39, 84, 15, 27, 41, 90];

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
      className="proovd-snap-section scroll-mt-20 flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0"
    >
      <div
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden"
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

            {/* Top — pledge tokens flowing into the stamp */}
            {TOP_PATHS.flatMap((path, laneIdx) =>
              Array.from({ length: TOKENS_PER_LANE }).map((_, i) => {
                const beginOffset = (i / TOKENS_PER_LANE) * TOP_DUR_S + laneIdx * 0.23;
                const amount = PLEDGE_AMOUNTS[(laneIdx * TOKENS_PER_LANE + i) % PLEDGE_AMOUNTS.length];
                return (
                  <g key={`top-${laneIdx}-${i}`}>
                    <PledgeToken amount={amount} />
                    {!reducedMotion && (
                      <animateMotion
                        dur={`${TOP_DUR_S}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                        begin={`-${beginOffset}s`}
                      >
                        <mpath href={`#${path.id}`} />
                      </animateMotion>
                    )}
                  </g>
                );
              })
            )}

            {/* Bottom — dollar tokens flowing outward */}
            {BOTTOM_PATHS.flatMap((path, laneIdx) =>
              Array.from({ length: TOKENS_PER_LANE }).map((_, i) => {
                const beginOffset = (i / TOKENS_PER_LANE) * BOTTOM_DUR_S + laneIdx * 0.31;
                const sizeVar = [0.85, 1, 1.1][i % 3];
                return (
                  <g key={`bot-${laneIdx}-${i}`}>
                    <DollarToken scale={sizeVar} />
                    {!reducedMotion && (
                      <animateMotion
                        dur={`${BOTTOM_DUR_S}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                        begin={`-${beginOffset}s`}
                      >
                        <mpath href={`#${path.id}`} />
                      </animateMotion>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}

        {/* Stamp-masked trophy video */}
        <div
          className="absolute"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            width: STAMP_WIDTH,
            transform: "translate(-50%, -50%)",
            zIndex: Z_STAMP,
            aspectRatio: `${STAMP_ASPECT}`,
          }}
        >
          {mounted && (
            <StampMaskedVideo
              videoSrc="/assets/videos/feature-proof-trophy.webm"
              videoSrcMp4="/assets/videos/feature-proof-trophy.mp4"
              className="w-full h-full"
              fit="contain"
            />
          )}
        </div>
      </div>

      <div
        className="relative w-full md:w-[55%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#1E4D2F",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <p
          className="mb-4"
          style={{
            color: "#BCFCA1",
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
          }}
        >
          Real money from real backers, tracked live.
        </p>

        <h2
          id="features-proof-heading"
          className="font-bold leading-tight mb-6 md:mb-8"
          style={{
            color: "#FAFAFA",
            fontSize: "clamp(1.875rem, 3vw, 2.625rem)",
          }}
        >
          People pledge. You get proof.
        </h2>

        <p
          className="leading-relaxed mb-8 md:mb-12"
          style={{
            color: "#DCE8CA",
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            maxWidth: "52ch",
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
            className="text-base md:text-xl px-8 md:px-14 py-3 md:py-4"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

// Simplified pledge token — small lime card with $amount; legible at the funnel scale,
// echoes PledgeCard's lime/forest palette.
function PledgeToken({ amount }) {
  // Centered at (0,0) so animateMotion's translation places the token's center on the path.
  const w = 9;
  const h = 4;
  return (
    <g transform={`translate(${-w / 2}, ${-h / 2})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill="#BCFCA1"
        stroke="#1E4D2F"
        strokeWidth={0.4}
      />
      <text
        x={w / 2}
        y={h / 2 + 1}
        fontSize={2.6}
        fontFamily="Satoshi, sans-serif"
        fontWeight={900}
        fill="#09110C"
        textAnchor="middle"
      >
        ${amount}
      </text>
    </g>
  );
}

function DollarToken({ scale = 1 }) {
  const w = 5 * scale;
  const h = 2.5 * scale;
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

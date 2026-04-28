"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import PledgeCard from "@/components/ui/PledgeCard";

/* ------------------------------------------------------------------ *
 *  Tunables — edit these to adjust the visual without touching JSX
 * ------------------------------------------------------------------ */

// Stamp + trophy video
const STAMP_WIDTH = "clamp(180px, 50cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";
const VIDEO_INSET = { top: "8%", left: "11%", right: "11%", bottom: "8%" };

// Where each conveyor meets the stamp — measured from the column's vertical center.
// Stamp half-height is ≈ 25cqi (since stamp width is ~50cqi and icons-bg is ~square).
// Using 17cqi here means each conveyor extends 8cqi PAST the stamp's near edge,
// so cards visibly cross the stamp's top/bottom border before disappearing behind it.
//   higher → conveyor stops further BEFORE the stamp (less overlap)
//   lower  → conveyor extends DEEPER into the stamp area
const CONVEYOR_TO_CENTER_OFFSET = "17cqi";
const TOP_CONVEYOR_BOTTOM = `calc(50% + ${CONVEYOR_TO_CENTER_OFFSET})`;
const BOTTOM_CONVEYOR_TOP = `calc(50% + ${CONVEYOR_TO_CENTER_OFFSET})`;

// Per-lane horizontal positions — kept INSIDE the stamp's horizontal span (~25%–75%)
// so cards visibly enter/exit through the stamp's top and bottom edges.
const LANE_POSITIONS = [
  { left: "32%", transform: "translateX(-50%)" },
  { left: "50%", transform: "translateX(-50%)" },
  { left: "68%", transform: "translateX(-50%)" },
];

// Per-lane animation durations — staggered to create a natural waterfall.
// Top and bottom use independent arrays so the two halves never beat in sync.
const TOP_LANE_DURATIONS = ["18s", "24s", "21s"];
const BOTTOM_LANE_DURATIONS = ["22s", "16s", "26s"];

// Pledge card sizing — PledgeCard's text is hardcoded in px (text-[92px], etc.),
// so shrinking width alone breaks layout. We scale the whole card via transform.
// PledgeCard natural size ≈ 360w × 195h.
const PLEDGE_SCALE = 0.32;
const PLEDGE_NATURAL_W = 360;
const PLEDGE_NATURAL_H = 195;
const PLEDGE_LAYOUT_W_PX = Math.round(PLEDGE_NATURAL_W * PLEDGE_SCALE);
const PLEDGE_LAYOUT_H_PX = Math.round(PLEDGE_NATURAL_H * PLEDGE_SCALE);
const PLEDGE_GAP_PX = 18;

// Dollar bill sizing
const DOLLAR_WIDTH = "clamp(70px, 11cqi, 110px)";
const DOLLAR_GAP_PX = 16;
const DOLLAR_COUNT_PER_LANE = 12;

const PLEDGES = [
  { amount: 75, name: "Max Q", handle: "maxq.lab" },
  { amount: 50, name: "Sara K", handle: "sarak.builds" },
  { amount: 75, name: "Jay M", handle: "jay.mxyz" },
  { amount: 100, name: "Lia P", handle: "lia.eats.ai" },
  { amount: 25, name: "Dev R", handle: "dev.r.codes" },
  { amount: 75, name: "Tom W", handle: "tom.dotwav" },
];

// Z-index stack — pledges + dollars sit BEHIND the stamp so they appear to enter/exit it
const Z_BG = 1;
const Z_PLEDGES = 2;
const Z_DOLLARS = 2;
const Z_STAMP = 4;

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ */

export default function FeatureProof() {
  const ref = useSectionInView("features-proof");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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
      className="scroll-mt-20 flex flex-col md:flex-row min-h-screen"
    >
      {/* Left column — layered visual.
          aspect-[4/5] gives absolute children dimensions on mobile;
          containerType enables cqi units inside the column. */}
      <div
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:min-h-screen overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        {/* Layer 1 — background photo */}
        {/* TODO(assets): /public/assets/feature-proof-bg.png */}
        <img
          src="/assets/feature-proof-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: Z_BG }}
        />

        {/* Layer 2a — TOP conveyor: pledges falling DOWN into the stamp's TOP edge.
            Bottom edge sits inside the stamp; stamp z-index hides cards beyond it. */}
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: 0,
            bottom: TOP_CONVEYOR_BOTTOM,
            zIndex: Z_PLEDGES,
          }}
          aria-hidden="true"
        >
          {LANE_POSITIONS.map((pos, laneIdx) => (
            <div
              key={`pledge-lane-${laneIdx}`}
              className="absolute proof-lane"
              style={{
                ...pos,
                top: 0,
                width: `${PLEDGE_LAYOUT_W_PX}px`,
                gap: `${PLEDGE_GAP_PX}px`,
                "--proof-lane-duration": TOP_LANE_DURATIONS[laneIdx],
                animation: reducedMotion ? "none" : undefined,
              }}
            >
              {[...PLEDGES, ...PLEDGES].map((p, i) => (
                <div
                  key={`pledge-${laneIdx}-${i}`}
                  style={{
                    width: `${PLEDGE_LAYOUT_W_PX}px`,
                    height: `${PLEDGE_LAYOUT_H_PX}px`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: `${PLEDGE_NATURAL_W}px`,
                      transform: `scale(${PLEDGE_SCALE})`,
                      transformOrigin: "top left",
                    }}
                  >
                    <PledgeCard
                      amount={p.amount}
                      name={p.name}
                      handle={p.handle}
                      rotation={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Layer 2b — BOTTOM conveyor: dollars falling DOWN out of the stamp's BOTTOM edge */}
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: BOTTOM_CONVEYOR_TOP,
            bottom: 0,
            zIndex: Z_DOLLARS,
          }}
          aria-hidden="true"
        >
          {LANE_POSITIONS.map((pos, laneIdx) => {
            const dollars = Array.from({ length: DOLLAR_COUNT_PER_LANE });
            return (
              <div
                key={`dollar-lane-${laneIdx}`}
                className="absolute proof-lane"
                style={{
                  ...pos,
                  top: 0,
                  width: DOLLAR_WIDTH,
                  gap: `${DOLLAR_GAP_PX}px`,
                  "--proof-lane-duration": BOTTOM_LANE_DURATIONS[laneIdx],
                  animation: reducedMotion ? "none" : undefined,
                }}
              >
                {[...dollars, ...dollars].map((_, i) => (
                  // TODO(assets): /public/assets/feature-proof-dollar.png
                  <img
                    key={`dollar-${laneIdx}-${i}`}
                    src="/assets/feature-proof-dollar.png"
                    alt=""
                    aria-hidden="true"
                    className="block w-full h-auto select-none"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -2 : 3}deg)`,
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Layer 3 — stamp + trophy video (centered) */}
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
          {/* TODO(assets): /public/assets/icons-bg.png — reused from FeaturePitch / FeatureMatch */}
          <img
            src="/assets/icons-bg.png"
            alt=""
            aria-hidden="true"
            className="relative w-full h-auto block"
            style={{ zIndex: 1 }}
          />

          {/* Trophy video sits ABOVE the stamp frame, inside its interior */}
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
            {/* TODO(assets): /public/assets/videos/feature-proof-trophy.webm */}
            {/* TODO(assets): /public/assets/videos/feature-proof-trophy.mp4 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/assets/videos/feature-proof-trophy.webm"
                type="video/webm"
              />
              <source
                src="/assets/videos/feature-proof-trophy.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      {/* Right column — Forest palette */}
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

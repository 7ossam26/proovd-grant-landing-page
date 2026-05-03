"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import FeatureSectionNav from "@/components/ui/FeatureSectionNav";
import PledgeCard from "@/components/ui/PledgeCard";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

/* ------------------------------------------------------------------ *
 *  Tunables
 * ------------------------------------------------------------------ */

// Stamp width / video-scale come from .proovd-stamp-frame (CSS vars, responsive).
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// Three vertical lanes clustered tightly inside the stamp's horizontal span
// (stamp width ≈ 24.13cqi, centered → spans ~38%–62% of the column) so cards
// visibly cross the stamp's top/bottom edge without bleeding past its sides.
const LANE_POSITIONS = [
  { left: "41%" },
  { left: "50%" },
  { left: "59%" },
];

// Each conveyor extends past the stamp's near edge so cards visibly enter/exit
// through the stamp before the stamp z-index hides them.
const CONVEYOR_TO_CENTER_OFFSET = "5cqi";
const TOP_CONVEYOR_BOTTOM = `calc(50% + ${CONVEYOR_TO_CENTER_OFFSET})`;
const BOTTOM_CONVEYOR_TOP = `calc(50% + ${CONVEYOR_TO_CENTER_OFFSET})`;

// Per-lane durations — all identical so every lane moves at the same speed.
const LANE_DURATION = "20s";
const TOP_LANE_DURATIONS = [LANE_DURATION, LANE_DURATION, LANE_DURATION];
const BOTTOM_LANE_DURATIONS = [LANE_DURATION, LANE_DURATION, LANE_DURATION];

// PledgeCard is hardcoded to 360w × ~195h with px text. Scale via transform on
// a wrapper; the wrapper's own box is the post-rotation footprint.
const PLEDGE_SCALE = 0.16;
const PLEDGE_NATURAL_W = 360;
const PLEDGE_NATURAL_H = 195;
const PLEDGE_LAYOUT_W_PX = Math.round(PLEDGE_NATURAL_W * PLEDGE_SCALE);
const PLEDGE_LAYOUT_H_PX = Math.round(PLEDGE_NATURAL_H * PLEDGE_SCALE);
const PLEDGE_GAP_PX = 44;

const DOLLAR_WIDTH = "clamp(24px, 3.6cqi, 38px)";
const DOLLAR_GAP_PX = 36;
const DOLLAR_COUNT_PER_LANE = 12;

const PLEDGES = [
  { amount: 75, name: "Max Q", handle: "maxq.lab" },
  { amount: 50, name: "Sara K", handle: "sarak.builds" },
  { amount: 75, name: "Jay M", handle: "jay.mxyz" },
  { amount: 100, name: "Lia P", handle: "lia.eats.ai" },
  { amount: 25, name: "Dev R", handle: "dev.r.codes" },
  { amount: 75, name: "Tom W", handle: "tom.dotwav" },
];

const Z_BG = 1;
const Z_PLEDGES = 2;
const Z_DOLLARS = 2;
const Z_STAMP = 4;

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

/* ------------------------------------------------------------------ */

export default function FeatureProof() {
  const ref = useSectionInView("features-proof");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

        {mounted && (
          <>
            {/* TOP conveyor — pledge cards falling into the stamp's top edge */}
            <div
              className="absolute left-0 right-0 overflow-hidden pointer-events-none"
              style={{ top: 0, bottom: TOP_CONVEYOR_BOTTOM, zIndex: Z_PLEDGES }}
              aria-hidden="true"
            >
              {LANE_POSITIONS.map((pos, laneIdx) => (
                <div
                  key={`pledge-lane-${laneIdx}`}
                  className="absolute proof-lane"
                  style={{
                    left: pos.left,
                    top: 0,
                    width: `${PLEDGE_LAYOUT_H_PX}px`,
                    gap: `${PLEDGE_GAP_PX}px`,
                    "--proof-lane-duration": TOP_LANE_DURATIONS[laneIdx],
                  }}
                >
                  {[...PLEDGES, ...PLEDGES].map((p, i) => (
                    <div
                      key={`pledge-${laneIdx}-${i}`}
                      style={{
                        width: `${PLEDGE_LAYOUT_H_PX}px`,
                        height: `${PLEDGE_LAYOUT_W_PX}px`,
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${PLEDGE_NATURAL_W}px`,
                          height: `${PLEDGE_NATURAL_H}px`,
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: `-${PLEDGE_NATURAL_H / 2}px`,
                          marginLeft: `-${PLEDGE_NATURAL_W / 2}px`,
                          transform: `scale(${PLEDGE_SCALE}) rotate(-90deg)`,
                          transformOrigin: "center center",
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

            {/* BOTTOM conveyor — dollar bills falling out of the stamp's bottom edge */}
            <div
              className="absolute left-0 right-0 overflow-hidden pointer-events-none"
              style={{ top: BOTTOM_CONVEYOR_TOP, bottom: 0, zIndex: Z_DOLLARS }}
              aria-hidden="true"
            >
              {LANE_POSITIONS.map((pos, laneIdx) => (
                <div
                  key={`dollar-lane-${laneIdx}`}
                  className="absolute proof-lane"
                  style={{
                    left: pos.left,
                    top: 0,
                    width: DOLLAR_WIDTH,
                    gap: `${DOLLAR_GAP_PX}px`,
                    "--proof-lane-duration": BOTTOM_LANE_DURATIONS[laneIdx],
                  }}
                >
                  {Array.from({ length: DOLLAR_COUNT_PER_LANE * 2 }).map((_, i) => (
                    <img
                      key={`dollar-${laneIdx}-${i}`}
                      src="/assets/feature-proof-dollar.webp"
                      alt=""
                      aria-hidden="true"
                      className="block w-full h-auto select-none"
                      draggable={false}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
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
          Find The People Who’d Pay For It
        </h2>

        <p
          className="leading-relaxed mb-6 md:mb-8"
          style={{
            color: "#DCE8CA",
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            maxWidth: "48ch",
          }}
        >
          For three weeks, creators put your idea in front of people who can actually back it.
          Proovd tracks the campaign live, from the first click to the pledge that tells you someone wanted this badly enough to pay.
          Your dashboard shows what’s landing, who’s buying in,
          and where the idea should go next.
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

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

// ─── Tunables ────────────────────────────────────────────────────────────────

const STAMP_WIDTH = "clamp(220px, 42cqi, 320px)";
const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

// 5x5 grid; selected tile (Rhea) at row 2 col 3 (zero-indexed → idx 12).
const GRID_COLS = 5;
const GRID_ROWS = 5;
const SELECTED_INDEX = 12;
const TILE_GAP = "1.4cqi";
const GRID_PADDING = "4cqi";

const Z_BG = 1;
const Z_GRID = 2;
const Z_STAMP = 3;
const Z_CURSOR = 5;

const ctaUrl = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";

// Phase timings — used as fractions of the total animation duration (PHASE.hold).
const PHASE = {
  gridIn: 0.0,
  enlarge: 1.0,
  cursorIn: 1.6,
  click: 2.4,
  fadeOthers: 2.6,
  hold: 3.6,
};

export default function FeatureMatch() {
  const ref = useSectionInView("features-match");
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playVersion, setPlayVersion] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined" || !window.IntersectionObserver) return;
    let lastFire = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const now = Date.now();
            if (now - lastFire > 800) {
              setPlayVersion((v) => v + 1);
              lastFire = now;
            }
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="features-match"
      aria-labelledby="features-match-heading"
      className="proovd-snap-section scroll-mt-20 flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0"
    >
      <div
        ref={containerRef}
        className="relative w-full md:w-[56.4%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <img
          src="/assets/Feature-match-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: Z_BG }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: Z_GRID, padding: GRID_PADDING }}
          aria-hidden="true"
        >
          <AffiliateGrid key={playVersion} reducedMotion={reducedMotion} />
        </div>

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
          <StampMaskedVideo
            videoSrc="/assets/videos/cupid.webm"
            className="w-full h-full"
            fit="contain"
          />
        </div>
      </div>

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

function AffiliateGrid({ reducedMotion }) {
  const total = GRID_COLS * GRID_ROWS;
  const selectedRow = Math.floor(SELECTED_INDEX / GRID_COLS);
  const selectedCol = SELECTED_INDEX % GRID_COLS;

  if (reducedMotion) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <SelectedTileStatic />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gap: TILE_GAP,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          if (i === SELECTED_INDEX) {
            return <SelectedTile key={i} />;
          }
          return <GridTile key={i} index={i} />;
        })}
      </div>
      <Cursor selectedRow={selectedRow} selectedCol={selectedCol} />
    </div>
  );
}

function GridTile({ index }) {
  // Stagger the appearance + fade-out by index for the soft, non-uniform feel.
  const inDelay = (index * 0.018) % 0.3;
  const outDelay = (index * 0.012) % 0.3;
  const inEnd = (0.18 + inDelay) / PHASE.hold;
  const fadeStart = (PHASE.fadeOthers + outDelay) / PHASE.hold;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 0.6],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        times: [0, inEnd, fadeStart, 1],
        duration: PHASE.hold,
        ease: "easeInOut",
      }}
      style={{
        backgroundColor: "#DCE8CA",
        border: "1px solid #1E4D2F",
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ color: "#5AAA77", fontSize: "1.6cqi", fontWeight: 700 }}
      >
        {/* TODO(assets): /public/assets/affiliate-grid/avatar-{1..25}.webp */}
        ●
      </div>
    </motion.div>
  );
}

function SelectedTile() {
  // grid-in → enlarge → click dip → click bounce → final emphasis (stays).
  const t1 = 0.18 / PHASE.hold;
  const t2 = PHASE.enlarge / PHASE.hold;
  const t3 = PHASE.click / PHASE.hold;
  const t4 = (PHASE.click + 0.07) / PHASE.hold;
  const t5 = (PHASE.click + 0.14) / PHASE.hold;
  const t6 = PHASE.fadeOthers / PHASE.hold;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1.18, 1.05, 1.18, 1.32, 1.32],
        opacity: [0, 1, 1, 1, 1, 1, 1],
      }}
      transition={{
        times: [0, t1, t2, t3, t4, t5, t6],
        duration: PHASE.hold,
        ease: "easeInOut",
      }}
      style={{
        backgroundColor: "#1E4D2F",
        border: "2px solid #1E4D2F",
        position: "relative",
        zIndex: 4,
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ color: "#BCFCA1", fontWeight: 900 }}
      >
        <div style={{ fontSize: "3.2cqi", lineHeight: 1 }}>R</div>
        <div style={{ fontSize: "1cqi", marginTop: "0.2cqi", color: "#DCE8CA", fontWeight: 500 }}>
          Rhea
        </div>
      </div>
    </motion.div>
  );
}

function SelectedTileStatic() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: "26cqi",
        height: "26cqi",
        backgroundColor: "#1E4D2F",
        color: "#BCFCA1",
      }}
    >
      <div style={{ fontSize: "6cqi", fontWeight: 900 }}>R</div>
      <div style={{ fontSize: "1.6cqi", marginTop: "1cqi" }}>Rhea</div>
      <div style={{ fontSize: "1.3cqi", color: "#DCE8CA" }}>@rhea.affiliate</div>
    </div>
  );
}

function Cursor({ selectedRow, selectedCol }) {
  const targetXPct = ((selectedCol + 0.5) / GRID_COLS) * 100;
  const targetYPct = ((selectedRow + 0.5) / GRID_ROWS) * 100;

  const t0 = 0;
  const t1 = PHASE.cursorIn / PHASE.hold;
  const t2 = (PHASE.click - 0.05) / PHASE.hold;
  const t3 = PHASE.click / PHASE.hold;
  const t4 = PHASE.fadeOthers / PHASE.hold;
  const t5 = 1;

  return (
    <motion.div
      className="absolute"
      initial={false}
      animate={{
        left: ["92%", "92%", `${targetXPct}%`, `${targetXPct}%`, `${targetXPct}%`, `${targetXPct}%`],
        top: ["92%", "92%", `${targetYPct}%`, `${targetYPct}%`, `${targetYPct}%`, `${targetYPct}%`],
        opacity: [0, 1, 1, 1, 0, 0],
        scale: [0.9, 1, 1, 0.86, 0.86, 0.86],
      }}
      transition={{
        times: [t0, t1, t2, t3, t4, t5],
        duration: PHASE.hold,
        ease: "easeInOut",
      }}
      style={{
        zIndex: Z_CURSOR,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      <svg width="24" height="28" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 2 L3 22 L9 17 L13 26 L17 24 L13 15 L21 15 Z"
          fill="#09110C"
          stroke="#FAFAFA"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

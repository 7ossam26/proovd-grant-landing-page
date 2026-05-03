"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionInView } from "@/lib/useSectionInView";

// ─── Tunables ────────────────────────────────────────────────────────────────

// Envelope graphic
const ENVELOPE_MAX_WIDTH = "clamp(420px, 62vw, 880px)";
const ENVELOPE_ASPECT_W = 1;
const ENVELOPE_ASPECT_H = 1.05;
const ENVELOPE_ASPECT = `${ENVELOPE_ASPECT_W} / ${ENVELOPE_ASPECT_H}`;
// Fraction of envelope height kept visible — the TOP is clipped so the
// envelope appears to slide up from underneath the section above. The
// asset has ~10% transparent padding above the V-flap, so the effective
// clip = ENVELOPE_VISIBLE_RATIO minus that empty band.
const ENVELOPE_VISIBLE_RATIO = 0.72;
// Negative top margin (% of width) needed to clip (1 - visible) of the height.
const ENVELOPE_CLIP_MARGIN = `-${(
  (1 - ENVELOPE_VISIBLE_RATIO) *
  (ENVELOPE_ASPECT_H / ENVELOPE_ASPECT_W) *
  100
).toFixed(2)}%`;

// ─── Spill stamps — adjust these to position each stamp ──────────────────────
// Each stamp straddles the front layer's V-mouth: the TOP is cropped behind
// the front panel, the BOTTOM hangs through the V opening. Tune top/left to
// reposition, width to resize, rotate (deg) to tilt.

// 1. Founder at desk
const SPILL_1_SRC    = "/assets/longscroll-spill-1.webp";
const SPILL_1_ALT    = "Stamp showing founder writing at desk";
const SPILL_1_TOP    = "32%";
const SPILL_1_LEFT   = "42%";
const SPILL_1_WIDTH  = "16%";
const SPILL_1_ROTATE = -4;

// 2. Cat (tall portrait)
const SPILL_2_SRC    = "/assets/longscroll-spill-2.webp";
const SPILL_2_ALT    = "Stamp showing a glowing cat in green and blue";
const SPILL_2_TOP    = "40%";
const SPILL_2_LEFT   = "32%";
const SPILL_2_WIDTH  = "20%";
const SPILL_2_ROTATE = 6;

// 3. Rocket (small landscape)
const SPILL_3_SRC    = "/assets/longscroll-spill-3.webp";
const SPILL_3_ALT    = "Stamp showing a green rocket";
const SPILL_3_TOP    = "55%";
const SPILL_3_LEFT   = "70%";
const SPILL_3_WIDTH  = "14%";
const SPILL_3_ROTATE = 14;

// 4. Girl with green leaf
const SPILL_4_SRC    = "/assets/longscroll-spill-4.webp";
const SPILL_4_ALT    = "Stamp showing a person holding a green leaf";
const SPILL_4_TOP    = "48%";
const SPILL_4_LEFT   = "10%";
const SPILL_4_WIDTH  = "16%";
const SPILL_4_ROTATE = -16;

// 5. Hand over face
const SPILL_5_SRC    = "/assets/longscroll-spill-5.webp";
const SPILL_5_ALT    = "Stamp showing a green hand over a face";
const SPILL_5_TOP    = "60%";
const SPILL_5_LEFT   = "52%";
const SPILL_5_WIDTH  = "12%";
const SPILL_5_ROTATE = 18;

const SPILL_STAMPS = [
  { src: SPILL_1_SRC, alt: SPILL_1_ALT, top: SPILL_1_TOP, left: SPILL_1_LEFT, width: SPILL_1_WIDTH, rotate: SPILL_1_ROTATE },
  { src: SPILL_2_SRC, alt: SPILL_2_ALT, top: SPILL_2_TOP, left: SPILL_2_LEFT, width: SPILL_2_WIDTH, rotate: SPILL_2_ROTATE },
  { src: SPILL_3_SRC, alt: SPILL_3_ALT, top: SPILL_3_TOP, left: SPILL_3_LEFT, width: SPILL_3_WIDTH, rotate: SPILL_3_ROTATE },
  { src: SPILL_4_SRC, alt: SPILL_4_ALT, top: SPILL_4_TOP, left: SPILL_4_LEFT, width: SPILL_4_WIDTH, rotate: SPILL_4_ROTATE },
  { src: SPILL_5_SRC, alt: SPILL_5_ALT, top: SPILL_5_TOP, left: SPILL_5_LEFT, width: SPILL_5_WIDTH, rotate: SPILL_5_ROTATE },
];

// Z-stack: front flap clips spill stamps so they appear inside the envelope
const Z_ENVELOPE_BACK  = 1;
const Z_SPILL_STAMPS   = 2;
const Z_ENVELOPE_FRONT = 3;

// Single stamp width applied to all blocks.
const STAMP_WIDTH = "clamp(120px, 13vw, 200px)";
const STAMP_WIDTH_RAMBLE       = STAMP_WIDTH;
const STAMP_WIDTH_REASON       = STAMP_WIDTH;
const STAMP_WIDTH_FRIENDS_LIED = STAMP_WIDTH;
const STAMP_WIDTH_SHAPE        = STAMP_WIDTH;

const BLOCKS = [
  {
    stamp: "/assets/longscroll-stamp-ramble.png",
    stampAlt: "Stamp showing a head silhouette with thoughts spilling out",
    stampWidth: STAMP_WIDTH_RAMBLE,
    heading: "Ramble at us. We'll handle the pitch.",
    body:
      "Hit record and describe your idea like you'd explain it to a friend at a bar. Our AI pulls out the problem, the solution, and where you fit against competition.",
  },
  {
    stamp: "/assets/longscroll-stamp-reason.png",
    stampAlt: "Stamp showing a row of stars above a ballot box",
    stampWidth: STAMP_WIDTH_REASON,
    heading: "Every pledge comes with a reason.",
    body:
      "Before anyone backs your idea, they answer one question: why do you want this? You get every response in your dashboard, alongside click-through rates, best-performing affiliates, and hour-by-hour conversion.",
  },
  {
    stamp: "/assets/longscroll-stamp-friends-lied.png",
    stampAlt: "Stamp showing scales of justice in green and blue",
    stampWidth: STAMP_WIDTH_FRIENDS_LIED,
    heading: "Your friends lied. Backers don't.",
    body:
      'Surveys, Twitter replies, and "omg I\'d totally pay for this" are worth nothing. A backer putting $30 down is worth everything.',
  },
  {
    stamp: "/assets/longscroll-stamp-shape.png",
    stampAlt: "Stamp showing a padlock in green and blue",
    stampWidth: STAMP_WIDTH_SHAPE,
    heading: "Show the shape. Keep the secret.",
    body:
      "Teaser mode lets you reveal just enough — the problem, the niche, early traction — to get affiliates interested without handing over the full blueprint.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function LongScroll() {
  const sectionRef = useSectionInView("how-it-works");
  const blockRefs = useRef([]);
  const [revealedBlocks, setRevealedBlocks] = useState(() =>
    BLOCKS.map(() => false)
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedBlocks(BLOCKS.map(() => true));
      return;
    }

    const observers = blockRefs.current.map((node, i) => {
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            void node.getBoundingClientRect();
            requestAnimationFrame(() =>
              setRevealedBlocks((prev) => {
                if (prev[i]) return prev;
                const next = [...prev];
                next[i] = true;
                return next;
              })
            );
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      style={{
        backgroundColor: "#FAFAFA",
        paddingTop: 0,
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
        overflow: "hidden",
      }}
    >
      <h2 id="how-it-works-heading" className="sr-only">
        How Proovd works
      </h2>

      <div className="mx-auto px-6" style={{ maxWidth: "min(96rem, 100%)" }}>
        {/* ─── Envelope graphic with spilling stamps ─────────────────────
            isolation: isolate locks the stacking context so the three
            z-layers below (back/stamps/front) order purely against each
            other — nothing outside this container can slip between them.
            The outer wrapper clips the TOP of the envelope (negative
            margin-top on the inner box) so it looks like the envelope is
            sliding up from underneath the section above. */}
        <div
          className="mx-auto"
          style={{
            width: ENVELOPE_MAX_WIDTH,
            maxWidth: "100%",
            overflow: "hidden",
            marginBottom: "clamp(3rem, 6vw, 6rem)",
          }}
          aria-hidden="true"
        >
        <div
          className="relative"
          style={{
            width: "100%",
            aspectRatio: ENVELOPE_ASPECT,
            marginTop: ENVELOPE_CLIP_MARGIN,
            isolation: "isolate",
          }}
        >
          {/* Layer 1 — envelope back (full envelope shape) */}
          <img
            src="/assets/longscroll-envelope-back.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            style={{ zIndex: Z_ENVELOPE_BACK }}
          />

          {/* Layer 2 — spilling stamps (between back and front layers) */}
          {SPILL_STAMPS.map((stamp, i) => (
            <img
              key={`spill-${i}`}
              src={stamp.src}
              alt={stamp.alt}
              className="absolute pointer-events-none select-none h-auto"
              style={{
                top: stamp.top,
                left: stamp.left,
                width: stamp.width,
                transform: `rotate(${stamp.rotate}deg)`,
                zIndex: Z_SPILL_STAMPS,
              }}
            />
          ))}

          {/* Layer 3 — envelope front flap (clips overlapping stamp tops) */}
          <img
            src="/assets/longscroll-envelope-front.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            style={{ zIndex: Z_ENVELOPE_FRONT }}
          />
        </div>
        </div>

        {/* ─── 5 alternating value-prop blocks ─────────────────────────── */}
        <div
          className="flex flex-col mx-auto"
          style={{
            gap: "clamp(3.5rem, 6vw, 6rem)",
            maxWidth: "min(56rem, 100%)",
          }}
        >
          {BLOCKS.map((block, i) => {
            const stampOnRight = i % 2 === 1;
            const revealed = revealedBlocks[i];

            // Asymmetric lg columns — stamp column hugs its content, text
            // column gets the remainder. Keeps the gap tight at any width.
            // Mobile (<lg) stays single-column / stacked.
            const lgCols = stampOnRight
              ? "lg:grid-cols-[minmax(0,1fr)_auto]"
              : "lg:grid-cols-[auto_minmax(0,1fr)]";

            // Stamps slide in from their own side; text fades up with a
            // small delay so the eye lands on the stamp first.
            const stampEnterStyle = {
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "translateX(0)"
                : `translateX(${stampOnRight ? "28px" : "-28px"})`,
              transition:
                "opacity 750ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "opacity, transform",
            };
            const textEnterStyle = {
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 750ms ease-out 140ms, transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms",
              willChange: "opacity, transform",
            };

            return (
              <div
                key={i}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className={`grid grid-cols-1 ${lgCols} gap-8 lg:gap-10 items-center`}
              >
                {/* Stamp illustration */}
                <div
                  className={`flex justify-center ${
                    stampOnRight ? "lg:order-2 lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  <div style={stampEnterStyle}>
                    <div className="inline-block transition-transform duration-[400ms] ease-out hover:rotate-2">
                      <img
                        src={block.stamp}
                        alt={block.stampAlt}
                        className="block h-auto select-none"
                        style={{ width: block.stampWidth }}
                      />
                    </div>
                  </div>
                </div>

                {/* Copy — text aligns to the same side as its block's stamp:
                    stamp-left blocks left-align, stamp-right blocks right-align. */}
                <div
                  className={`flex flex-col items-center text-center ${
                    stampOnRight
                      ? "lg:order-1 lg:items-end lg:text-right"
                      : "lg:items-start lg:text-left"
                  }`}
                  style={textEnterStyle}
                >
                  <h3
                    className="font-medium leading-tight mb-3"
                    style={{
                      color: "#09110C",
                      fontSize: "clamp(1.375rem, 2.2vw, 2.25rem)",
                    }}
                  >
                    {block.heading}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: "#1E4D2F",
                      fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)",
                      maxWidth: "52ch",
                    }}
                  >
                    {block.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useSectionInView } from "@/lib/useSectionInView";

// ─── Tunables ────────────────────────────────────────────────────────────────

// Envelope graphic
const ENVELOPE_MAX_WIDTH = "clamp(360px, 50vw, 720px)";
const ENVELOPE_ASPECT = "1 / 1.05";

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

// Per-block stamp widths — adjust these to control each illustration's size
const STAMP_WIDTH_RAMBLE       = "clamp(180px, 22vw, 320px)";
const STAMP_WIDTH_REASON       = "clamp(200px, 24vw, 360px)";
const STAMP_WIDTH_72           = "clamp(220px, 28vw, 420px)"; // landscape — wider ceiling
const STAMP_WIDTH_FRIENDS_LIED = "clamp(200px, 24vw, 360px)";
const STAMP_WIDTH_SHAPE        = "clamp(200px, 24vw, 360px)";

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
    stamp: "/assets/longscroll-stamp-72.png",
    stampAlt: "Wide horizontal stamp showing a 72:00:00 countdown timer",
    stampWidth: STAMP_WIDTH_72,
    heading: "72 hours to know if creators want in",
    body:
      "Post your idea. Affiliates in your niche, already trusted by your exact audience, see it within three days.",
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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      style={{
        backgroundColor: "#FAFAFA",
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
      }}
    >
      <h2 id="how-it-works-heading" className="sr-only">
        How Proovd works
      </h2>

      <div className="mx-auto px-6" style={{ maxWidth: "min(96rem, 100%)" }}>
        {/* ─── Envelope graphic with spilling stamps ─────────────────────
            isolation: isolate locks the stacking context so the three
            z-layers below (back/stamps/front) order purely against each
            other — nothing outside this container can slip between them. */}
        <div
          className="relative mx-auto"
          style={{
            width: ENVELOPE_MAX_WIDTH,
            aspectRatio: ENVELOPE_ASPECT,
            marginBottom: "clamp(6rem, 14vw, 14rem)",
            isolation: "isolate",
          }}
          aria-hidden="true"
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

        {/* ─── 5 alternating value-prop blocks ─────────────────────────── */}
        <div
          className="flex flex-col"
          style={{ gap: "clamp(7rem, 12vw, 12rem)" }}
        >
          {BLOCKS.map((block, i) => {
            const stampOnRight = i % 2 === 1;

            return (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Stamp illustration */}
                <div
                  className={`flex justify-center ${stampOnRight ? "lg:order-2" : ""}`}
                >
                  <div className="inline-block transition-transform duration-[400ms] ease-out hover:rotate-2">
                    <img
                      src={block.stamp}
                      alt={block.stampAlt}
                      className="block h-auto select-none"
                      style={{ width: block.stampWidth }}
                    />
                  </div>
                </div>

                {/* Copy — center-aligned so all 5 text blocks line up
                    on the same vertical axis even though stamps alternate L/R */}
                <div
                  className={`flex flex-col items-center text-center ${stampOnRight ? "lg:order-1" : ""}`}
                >
                  <h3
                    className="font-medium leading-tight mb-5"
                    style={{
                      color: "#09110C",
                      fontSize: "clamp(1.75rem, 3.5vw, 3.625rem)",
                    }}
                  >
                    {block.heading}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: "#1E4D2F",
                      fontSize: "clamp(1rem, 1.25vw, 1.25rem)",
                      maxWidth: "50ch",
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

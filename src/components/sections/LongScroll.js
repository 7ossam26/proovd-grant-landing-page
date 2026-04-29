"use client";

import { useSectionInView } from "@/lib/useSectionInView";

// ─── Tunables ────────────────────────────────────────────────────────────────

// Envelope graphic
const ENVELOPE_MAX_WIDTH = "clamp(360px, 50vw, 720px)";
const ENVELOPE_ASPECT = "1 / 1.05";

// Spilling stamps — placeholders until real assets land.
// Positions match the design composition; swap the placeholder div for an <img>
// when /public/assets/longscroll-spill-N.png files arrive.
const SPILL_STAMPS = [
  { top: "8%",  left: "44%", width: "16%", rotate: -2,  alt: "Founder at desk" },
  { top: "30%", left: "38%", width: "26%", rotate: 4,   alt: "Creator with stamp" },
  { top: "22%", left: "10%", width: "14%", rotate: -18, alt: "Profile stamp" },
  { top: "18%", left: "78%", width: "13%", rotate: 12,  alt: "Gradient stamp" },
];

// Z-stack: front flap clips spill stamps so they appear inside the envelope
const Z_ENVELOPE_BACK  = 1;
const Z_SPILL_STAMPS   = 2;
const Z_ENVELOPE_FRONT = 3;

const BLOCKS = [
  {
    stamp: "/assets/longscroll-stamp-ramble.png",
    stampAlt: "Stamp showing a head silhouette with thoughts spilling out",
    stampWidth: "clamp(180px, 22vw, 320px)",
    heading: "Ramble at us. We'll handle the pitch.",
    body:
      "Hit record and describe your idea like you'd explain it to a friend at a bar. Our AI pulls out the problem, the solution, and where you fit against competition.",
  },
  {
    stamp: "/assets/longscroll-stamp-reason.png",
    stampAlt: "Stamp showing a row of stars above a ballot box",
    stampWidth: "clamp(200px, 24vw, 360px)",
    heading: "Every pledge comes with a reason.",
    body:
      "Before anyone backs your idea, they answer one question: why do you want this? You get every response in your dashboard, alongside click-through rates, best-performing affiliates, and hour-by-hour conversion.",
  },
  {
    stamp: "/assets/longscroll-stamp-72.png",
    stampAlt: "Wide horizontal stamp showing a 72:00:00 countdown timer",
    // Landscape stamp — wider clamp ceiling than the others
    stampWidth: "clamp(220px, 28vw, 420px)",
    heading: "72 hours to know if creators want in",
    body:
      "Post your idea. Affiliates in your niche, already trusted by your exact audience, see it within three days.",
  },
  {
    stamp: "/assets/longscroll-stamp-friends-lied.png",
    stampAlt: "Stamp showing scales of justice in green and blue",
    stampWidth: "clamp(200px, 24vw, 360px)",
    heading: "Your friends lied. Backers don't.",
    body:
      'Surveys, Twitter replies, and "omg I\'d totally pay for this" are worth nothing. A backer putting $30 down is worth everything.',
  },
  {
    stamp: "/assets/longscroll-stamp-shape.png",
    stampAlt: "Stamp showing a padlock in green and blue",
    stampWidth: "clamp(200px, 24vw, 360px)",
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
        {/* ─── Envelope graphic with spilling stamps ───────────────────── */}
        <div
          className="relative mx-auto"
          style={{
            width: ENVELOPE_MAX_WIDTH,
            aspectRatio: ENVELOPE_ASPECT,
            marginBottom: "clamp(6rem, 14vw, 14rem)",
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
            <div
              key={`spill-${i}`}
              className="absolute pointer-events-none select-none"
              style={{
                top: stamp.top,
                left: stamp.left,
                width: stamp.width,
                transform: `rotate(${stamp.rotate}deg)`,
                zIndex: Z_SPILL_STAMPS,
              }}
            >
              {/* TODO(assets): /public/assets/longscroll-spill-${i + 1}.png — stamp #${i + 1} spilling from envelope */}
              <div
                className="w-full"
                style={{ aspectRatio: "3 / 4", backgroundColor: "#DCE8CA" }}
                aria-label={stamp.alt}
                role="img"
              />
            </div>
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
                <div className={stampOnRight ? "lg:order-2" : ""}>
                  <div className="inline-block transition-transform duration-[400ms] ease-out hover:rotate-2">
                    <img
                      src={block.stamp}
                      alt={block.stampAlt}
                      className="block h-auto select-none"
                      style={{ width: block.stampWidth }}
                    />
                  </div>
                </div>

                {/* Copy */}
                <div className={stampOnRight ? "lg:order-1" : ""}>
                  <h3
                    className="font-black leading-tight mb-5"
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

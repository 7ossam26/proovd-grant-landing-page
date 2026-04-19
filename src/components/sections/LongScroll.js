"use client";

import { motion } from "motion/react";
import EcosystemPlaceholder from "@/components/ui/EcosystemPlaceholder";
import { useSectionInView } from "@/lib/useSectionInView";

const BLOCKS = [
  {
    heading: "Ramble at us. We'll handle the pitch.",
    body: "Hit record and describe your idea like you'd explain it to a friend at a bar. Our AI pulls out the problem, the solution, and where you fit against competition.",
  },
  {
    heading: "Every pledge comes with a reason.",
    body: "Before anyone backs your idea, they answer one question: why do you want this? You get every response in your dashboard, alongside click-through rates, best-performing affiliates, and hour-by-hour conversion",
  },
  {
    heading: "72 hours to know if creators want in",
    body: "Post your idea. Affiliates in your niche already trusted by your exact audience see it within three days",
  },
  {
    heading: "Your friends lied. backers don't.",
    body: "Surveys, Twitter replies, and 'omg I'd totally pay for this' are worth nothing. A backer putting $30 down is worth everything.",
  },
  {
    heading: "Show the shape. Keep the secret.",
    body: "Teaser mode lets you reveal just enough the problem, the niche, early traction to get affiliates interested without handing over the full blueprint",
  },
];

export default function LongScroll() {
  const sectionRef = useSectionInView("how-it-works");

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-ink"
      style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Envelope / top graphic placeholder */}
        <div className="flex justify-center mb-24 lg:mb-32">
          {/* TODO(assets): envelope/top graphic for long-scroll — see /docs/assets-needed.md */}
          <div
            className="bg-[#D9D9D9] aspect-square w-full rounded-md"
            style={{ maxWidth: "clamp(600px, 80vw, 1000px)" }}
            aria-hidden="true"
          />
        </div>

        {/* 5 value-prop blocks */}
        <div className="flex flex-col" style={{ gap: "clamp(7rem, 12vw, 12rem)" }}>
          {BLOCKS.map((block, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Illustration — always first in DOM so mobile stacks it above text */}
                <div className={isEven ? "lg:order-2" : ""}>
                  <motion.div
                    whileHover={{ rotate: 2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block"
                  >
                    <EcosystemPlaceholder />
                  </motion.div>
                </div>

                {/* Text */}
                <div className={isEven ? "lg:order-1" : ""}>
                  <h3
                    className="text-surface font-black leading-tight mb-5"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.625rem)" }}
                  >
                    {block.heading}
                  </h3>
                  <p
                    className="text-text-whisper leading-relaxed"
                    style={{
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

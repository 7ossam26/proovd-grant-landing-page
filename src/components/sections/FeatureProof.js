"use client";

import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

export default function FeatureProof() {
  return (
    <section id="features-proof" className="bg-brand-forest scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
        {/*
         * TODO(assets): Feature Proof visual (~786×1117, portrait) — see /docs/assets-needed.md
         */}
        <div
          className="bg-[#D9D9D9] aspect-[786/1117] lg:aspect-auto"
          aria-hidden="true"
        />

        <div
          className="flex flex-col justify-center py-16"
          style={{
            paddingLeft: "clamp(2rem, 5vw, 5rem)",
            paddingRight: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <p
            className="text-brand-lime font-medium mb-5"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
          >
            Real money from real backers, tracked live.
          </p>

          <h2
            className="text-surface font-black leading-tight mb-8"
            style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
          >
            People pledge. You get proof.
          </h2>

          <p
            className="text-text-whisper leading-relaxed mb-12"
            style={{
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
              href={ctaUrl}
              onClick={() =>
                trackEvent("cta_primary_click", { location: "feature_proof" })
              }
              className="text-xl px-14 py-4"
            >
              Try Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

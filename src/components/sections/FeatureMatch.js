"use client";

import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

export default function FeatureMatch() {
  return (
    <section id="features-match" className="bg-surface scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
        {/*
         * TODO(assets): Feature Match visual (~786×1117, portrait) — see /docs/assets-needed.md
         */}
        <div
          className="bg-[#D9D9D9] aspect-[786/1117] lg:aspect-auto"
          aria-hidden="true"
        />

        <div
          className="flex flex-col justify-center py-32"
          style={{
            paddingLeft: "clamp(2rem, 5vw, 5rem)",
            paddingRight: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <p
            className="text-brand-sage font-medium mb-5"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
          >
            Affiliates in your niche.
          </p>

          <h2
            className="text-ink font-black leading-tight mb-8"
            style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
          >
            Get matched with creators in 72 hours.
          </h2>

          <p
            className="text-brand-forest leading-relaxed mb-12"
            style={{
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

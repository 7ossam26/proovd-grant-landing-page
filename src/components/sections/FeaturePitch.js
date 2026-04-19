"use client";

import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

export default function FeaturePitch() {
  return (
    <section id="features-pitch" className="bg-brand-lime scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
        {/*
         * TODO(assets): Feature Pitch visual (~786×1117, portrait) — see /docs/assets-needed.md
         */}
        <div
          className="bg-[#D9D9D9] aspect-[786/1117] lg:aspect-auto"
          aria-hidden="true"
        />

        <div
          className="flex flex-col justify-center py-24"
          style={{
            paddingLeft: "clamp(2rem, 5vw, 5rem)",
            paddingRight: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <p
            className="text-brand-sage font-medium mb-5"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
          >
            Talk it out or type it.
          </p>

          <h2
            className="text-ink font-black leading-tight mb-8"
            style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
          >
            Pitch your idea in ten minutes.
          </h2>

          <p
            className="text-brand-forest leading-relaxed mb-12"
            style={{
              fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
              maxWidth: "52ch",
            }}
          >
            Record yourself explaining the idea like you would to a friend, or
            write it out if you prefer. Our AI turns the mess into a structured
            pitch — problem, solution, competition — and fills your listing for
            you. Review it, fix what&apos;s wrong, submit.
          </p>

          <div>
            <Button
              variant="primary"
              tone="light"
              href={ctaUrl}
              onClick={() =>
                trackEvent("cta_primary_click", { location: "feature_pitch" })
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

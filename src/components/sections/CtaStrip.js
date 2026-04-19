"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";

const PRIMARY = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";
const SECONDARY = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";
const isExternal = (h) => /^https?:\/\//i.test(h);

export default function CtaStrip() {
  const ref = useSectionInView("cta-strip");
  return (
    <Section
      id="contact"
      tone="forest"
      width="fullbleed"
      aria-labelledby="cta-strip-heading"
      className="relative overflow-hidden min-h-[400px] flex items-center py-24"
    >
      {/* TODO(assets): CTA strip left graphic — see /docs/assets-needed.md */}
      {/* Left placeholder ~386×399px, hidden on mobile */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[386px] h-[399px] bg-[#D9D9D9] hidden md:block"
      />

      {/* TODO(assets): CTA strip right graphic — see /docs/assets-needed.md */}
      {/* Right placeholder ~386×399px, hidden on mobile */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[386px] h-[399px] bg-[#D9D9D9] hidden md:block"
      />

      <div ref={ref} className="relative z-10 w-full flex flex-col items-center text-center px-6">
        <p className="text-brand-lime uppercase tracking-widest text-sm font-bold mb-4">
          PROOVD
        </p>
        <h2
          id="cta-strip-heading"
          className="text-surface text-4xl md:text-5xl font-black mb-4"
        >
          Start shipping today.
        </h2>
        <p className="text-text-whisper text-lg mb-10 max-w-lg">
          Validate your idea with real backers, not your friends&apos; opinions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Mint CTA — brand-primary (#3BED97) — 2nd of 2 allowed uses on the entire page */}
          <Button
            variant="mint"
            href={PRIMARY}
            onClick={() => {
              trackEvent("cta_primary_click", { location: "cta_strip" });
              if (isExternal(PRIMARY)) {
                trackEvent("outbound_cta_redirect", { destination: PRIMARY });
              }
            }}
          >
            Create account
          </Button>
          <Button
            variant="outline"
            href={SECONDARY}
            onClick={() => {
              trackEvent("cta_secondary_click", { location: "cta_strip" });
              if (isExternal(SECONDARY)) {
                trackEvent("outbound_cta_redirect", { destination: SECONDARY });
              }
            }}
          >
            Contact sales
          </Button>
        </div>
      </div>
    </Section>
  );
}

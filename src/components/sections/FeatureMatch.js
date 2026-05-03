"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";
import FeatureSectionNav from "@/components/ui/FeatureSectionNav";
import { StampMaskedVideo, STAMP_ASPECT } from "@/components/ui/IconsBgFrame";

// ─── Tunables ────────────────────────────────────────────────────────────────

const STAMP_LEFT = "50%";
const STAMP_TOP = "50%";

const Z_BG = 1;
const Z_CARDS = 2;
const Z_STAMP = 3;

const ctaUrl = process.env.NEXT_PUBLIC_CTA_SECONDARY_URL || "#";

export default function FeatureMatch() {
  const ref = useSectionInView("features-match");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section
      ref={ref}
      id="features-match"
      aria-labelledby="features-match-heading"
      className={`proovd-feature-snap flex flex-col md:flex-row md:h-[100svh] min-h-screen md:min-h-0 ${
        inView ? "proovd-match-in-view" : ""
      }`}
    >
      <div
        className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:h-full overflow-hidden"
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
          className="absolute inset-0 flex items-center justify-between"
          style={{
            zIndex: Z_CARDS,
            paddingLeft: "5cqi",
            paddingRight: "5cqi",
          }}
          aria-hidden="true"
        >
          <div className="proovd-match-founder">
            <FounderCard />
          </div>
          {/* Invisible spacer matches the stamp footprint so the two cards
              push to the edges and the absolutely-positioned stamp lands
              centered between them. */}
          <div
            className="proovd-stamp-frame"
            style={{ visibility: "hidden", aspectRatio: `${STAMP_ASPECT}` }}
          />
          <div className="proovd-match-affiliate">
            <AffiliateCard />
          </div>
        </div>

        <div
          className="absolute proovd-stamp-frame"
          style={{
            left: STAMP_LEFT,
            top: STAMP_TOP,
            transform: "translate(-50%, -50%)",
            zIndex: Z_STAMP,
            aspectRatio: `${STAMP_ASPECT}`,
            "--video-scale": 0.85,
          }}
        >
          <StampMaskedVideo
            videoSrc="/assets/videos/cupid.webm"
            fit="contain"
            className="w-full h-full"
          />
        </div>
      </div>

      <div
        className="relative w-full md:w-[60%] flex flex-col justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#FAFAFA",
          zIndex: 20,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <FeatureSectionNav location="feature_match" />

        <h2
          id="features-match-heading"
          className="font-bold leading-tight mb-5 md:mb-6"
          style={{
            color: "#09110C",
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          }}
        >
          Get matched with creators in 72 hours.
        </h2>

        <p
          className="leading-relaxed mb-6 md:mb-8"
          style={{
            color: "#1E4D2F",
            fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
            maxWidth: "48ch",
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
            className="text-sm md:text-base px-6 md:px-10 py-2.5 md:py-3"
          >
            Try Now
          </Button>
        </div>
      </div>
    </section>
  );
}

function FounderCard() {
  const pillBase = {
    backgroundColor: "#DCE8CA",
    color: "#1E4D2F",
    border: "1px solid #1E4D2F",
    whiteSpace: "nowrap",
  };
  const founderPillStyle = {
    ...pillBase,
    padding: "1cqi 4.5cqi",
    fontSize: "3cqi",
    fontWeight: 700,
  };
  const tagPillStyle = {
    ...pillBase,
    padding: "0.5cqi 3.6cqi",
    fontSize: "2.5cqi",
    fontWeight: 500,
  };
  return (
    <div
      className="flex flex-col items-center"
      style={{ gap: "1.4cqi", width: "28cqi" }}
    >
      {/* TODO(assets): /public/assets/founder-componant.webp */}
      <img
        src="/assets/founder-componant.webp"
        alt=""
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      <div style={founderPillStyle}>Mr. Founder</div>
      <div style={tagPillStyle}>AI SAAS</div>
    </div>
  );
}

function AffiliateCard() {
  return (
    <div
      style={{
        width: "27cqi",
      }}
    >
      {/* TODO(assets): /public/assets/affiliate-component.webp */}
      <img
        src="/assets/affiliate-component.webp"
        alt=""
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

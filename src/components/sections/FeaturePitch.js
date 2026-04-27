"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useSectionInView } from "@/lib/useSectionInView";
import Button from "@/components/ui/Button";

const ctaUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

const TYPING_FULL = "this is my ideaaaa";

export default function FeaturePitch() {
  const ref = useSectionInView("features-pitch");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplayedText(TYPING_FULL);
      return;
    }

    let i = 0;
    let resetTimeout;
    let interval;

    const startInterval = () => {
      interval = setInterval(() => {
        i += 1;
        if (i <= TYPING_FULL.length) {
          setDisplayedText(TYPING_FULL.slice(0, i));
        } else {
          clearInterval(interval);
          resetTimeout = setTimeout(() => {
            i = 0;
            setDisplayedText("");
            startInterval();
          }, 2200);
        }
      }, 90);
    };

    startInterval();

    return () => {
      clearInterval(interval);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="features-pitch"
      aria-labelledby="features-pitch-heading"
      className="scroll-mt-20 flex flex-col md:flex-row min-h-screen"
    >
      {/* Left column — layered visual */}
      <div className="relative w-full md:w-[45%] md:min-h-screen overflow-visible">
        {/* Layer 1 — blurred room photo */}
        {/* TODO(assets): /public/assets/feature-pitch-bg.png */}
        <img
          src="/assets/feature-pitch-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 1 }}
        />

        {/* Layer 2 — curved typing text arcing toward the centered stamp */}
        <svg
          className="absolute"
          style={{ left: "0%", top: "30%", width: "50%", zIndex: 2 }}
          viewBox="0 0 400 220"
          aria-hidden="true"
        >
          <defs>
            {/* Counterclockwise arc — dips down through the middle, rises toward the stamp */}
            <path id="text-arc" d="M 10,30 Q 120,210 380,90" />
          </defs>
          <text
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: 36,
              fill: "#FAFAFA",
            }}
          >
            <textPath href="#text-arc" startOffset="5%">
              {displayedText}
            </textPath>
          </text>
        </svg>

        {/* Layer 3 — stamp centered in the background photo, with mic video on top */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "320px",
            zIndex: 3,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* TODO(assets): /public/assets/icons-bg.png */}
          <img
            src="/assets/icons-bg.png"
            alt=""
            aria-hidden="true"
            className="relative w-full h-auto block"
            style={{ zIndex: 1 }}
          />

          {/* Mic video sits on top of the stamp interior */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: "8%",
              left: "11%",
              right: "11%",
              bottom: "8%",
              borderRadius: "4px",
              zIndex: 2,
            }}
          >
            {/* TODO(assets): /public/assets/videos/feature-pitch-mic.mp4 */}
            {/* TODO(assets): /public/assets/videos/feature-pitch-mic.webm */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/assets/videos/feature-pitch-mic.mp4"
                type="video/mp4"
              />
              <source
                src="/assets/videos/feature-pitch-mic.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>

        {/* Layer 4 — chained output cards sliding in left → right from the stamp */}
        <div
          className="absolute hidden md:flex flex-row"
          style={{
            left: "calc(50% + 150px)",
            top: "calc(50% - 40px)",
            width: "520px",
            height: "auto",
            zIndex: 4,
            gap: "14px",
            alignItems: "flex-start",
          }}
        >
          {/* TODO(assets): /public/assets/feature-pitch-card-1.png */}
          <div
            className="pitch-card-anim flex-shrink-0"
            style={{
              opacity: 0,
              animation: "pitch-card-slide 5s ease-in-out 0s infinite",
            }}
          >
            <img
              src="/assets/feature-pitch-card-1.png"
              alt=""
              aria-hidden="true"
              className="h-auto object-contain pointer-events-none select-none block"
              style={{
                width: "115px",
                transform: "rotate(-6deg)",
                marginTop: "0px",
              }}
            />
          </div>
          {/* TODO(assets): /public/assets/feature-pitch-card-2.png */}
          <div
            className="pitch-card-anim flex-shrink-0"
            style={{
              opacity: 0,
              animation: "pitch-card-slide 5s ease-in-out 0.4s infinite",
            }}
          >
            <img
              src="/assets/feature-pitch-card-2.png"
              alt=""
              aria-hidden="true"
              className="h-auto object-contain pointer-events-none select-none block"
              style={{
                width: "115px",
                transform: "rotate(-1deg)",
                marginTop: "16px",
              }}
            />
          </div>
          {/* TODO(assets): /public/assets/feature-pitch-card-3.png */}
          <div
            className="pitch-card-anim flex-shrink-0"
            style={{
              opacity: 0,
              animation: "pitch-card-slide 5s ease-in-out 0.8s infinite",
            }}
          >
            <img
              src="/assets/feature-pitch-card-3.png"
              alt=""
              aria-hidden="true"
              className="h-auto object-contain pointer-events-none select-none block"
              style={{
                width: "110px",
                transform: "rotate(4deg)",
                marginTop: "8px",
              }}
            />
          </div>
          {/* TODO(assets): /public/assets/feature-pitch-card-4.png */}
          <div
            className="pitch-card-anim flex-shrink-0"
            style={{
              opacity: 0,
              animation: "pitch-card-slide 5s ease-in-out 1.2s infinite",
            }}
          >
            <img
              src="/assets/feature-pitch-card-4.png"
              alt=""
              aria-hidden="true"
              className="h-auto object-contain pointer-events-none select-none block"
              style={{
                width: "105px",
                transform: "rotate(8deg)",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Right column — copy + CTA */}
      <div
        className="relative w-full md:w-[55%] flex flex-col justify-center py-24"
        style={{
          backgroundColor: "#BCFCA1",
          zIndex: 20,
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          paddingRight: "clamp(2rem, 5vw, 5rem)",
        }}
      >
        <h2
          id="features-pitch-heading"
          className="text-ink font-black leading-tight mb-8"
          style={{ fontSize: "clamp(1.875rem, 3vw, 2.625rem)" }}
        >
          Your pitch done in ten minutes
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
    </section>
  );
}

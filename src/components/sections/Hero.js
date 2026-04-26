"use client";

import { useSectionInView } from "@/lib/useSectionInView";
import PledgeCard from "@/components/ui/PledgeCard";

const PHONES = [
  { src: "hero-phone-1", topCqi: 0, rotate: -3 },
  { src: "hero-phone-2", topCqi: -3, rotate: 2 },
  { src: "hero-phone-3", topCqi: -6, rotate: -1 },
  { src: "hero-phone-4", topCqi: -1.5, rotate: 4 },
  { src: "hero-phone-5", topCqi: -4.5, rotate: -2 },
];

const PHONE_LOOP = [...PHONES, ...PHONES];

const PLEDGES = [
  {
    amount: "10",
    rotation: -4,
    position: "bottom-[12%] left-[4%]",
    origin: "bottom left",
  },
  {
    amount: "75",
    rotation: 2,
    position: "bottom-[8%] left-[28%]",
    origin: "bottom left",
  },
  {
    amount: "32",
    rotation: -2,
    position: "bottom-[12%] right-[20%]",
    origin: "bottom right",
  },
  {
    amount: "15",
    rotation: 3,
    position: "bottom-[6%] right-[2%]",
    origin: "bottom right",
  },
];

const PLEDGE_SCALE =
  "clamp(0.45, calc(100cqi / 1400), 1.15)";

export default function Hero() {
  const ref = useSectionInView("hero");

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink"
    >
      <style>{`
        @keyframes proovd-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .proovd-marquee-track {
          animation: proovd-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .proovd-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div
        className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        {/* TODO(assets): hero background photo (full-bleed) — see /docs/assets-needed.md */}
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 overflow-hidden">
          <div
            className="proovd-marquee-track flex flex-row items-end"
            style={{ width: "max-content", gap: "1.2cqi" }}
          >
            {PHONE_LOOP.map((phone, i) => (
              <div
                key={`${phone.src}-${i}`}
                className="relative shrink-0 overflow-hidden rounded-[28px] border-2 border-ink"
                style={{
                  width: "13cqi",
                  aspectRatio: "9 / 19.5",
                  top: `${phone.topCqi}cqi`,
                  transform: `rotate(${phone.rotate}deg)`,
                }}
              >
                {/* TODO(assets): phone marquee video (.webm + .mp4) — see /docs/assets-needed.md */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source
                    src={`/assets/videos/${phone.src}.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`/assets/videos/${phone.src}.mp4`}
                    type="video/mp4"
                  />
                </video>
              </div>
            ))}
          </div>
        </div>

        {/* TODO(assets): founder PNG cutout (transparent background, aligned 1:1 with hero-bg.jpg) — see /docs/assets-needed.md */}
        <img
          src="/assets/hero-founder.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center z-10"
        />

        <div className="absolute inset-0 z-20 pointer-events-none select-none">
          {PLEDGES.map((pledge, i) => (
            <div
              key={i}
              className={`hidden md:block absolute ${pledge.position}`}
              style={{
                transform: `rotate(${pledge.rotation}deg) scale(${PLEDGE_SCALE})`,
                transformOrigin: pledge.origin,
              }}
            >
              <PledgeCard
                amount={pledge.amount}
                name="Mira O."
                handle="maya.builds"
                rotation={0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink py-6 px-4 md:py-10 md:px-8">
        <h1
          id="hero-heading"
          className="text-brand-lime font-black leading-none text-4xl md:text-6xl xl:text-7xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Sell out before the product exists
        </h1>
      </div>
    </section>
  );
}

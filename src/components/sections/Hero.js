"use client";

import { useEffect, useState } from "react";
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
const PHONE_WIDTH = "11cqi";
const PHONE_MARQUEE_TOP_OFFSET = "8cqi";

const PLEDGE_STACKS = [
  {
    position: "bottom-[12%] left-[4%]",
    origin: "bottom left",
    cards: [
      { amount: "10", rotation: -4, x: "0cqi", y: "0cqi" },
      { amount: "24", rotation: -7, x: "-0.45cqi", y: "-0.45cqi" },
    ],
  },
  {
    position: "bottom-[1%] left-[8%]",
    origin: "bottom left",
    cards: [{ amount: "48", rotation: 3, x: "0cqi", y: "0cqi" }],
  },
  {
    position: "bottom-[8%] left-[28%]",
    origin: "bottom left",
    cards: [
      { amount: "75", rotation: 2, x: "0cqi", y: "0cqi" },
      { amount: "55", rotation: -2, x: "-0.55cqi", y: "-0.4cqi" },
      { amount: "90", rotation: 4, x: "0.45cqi", y: "-0.8cqi" },
    ],
  },
  {
    position: "bottom-[12%] right-[20%]",
    origin: "bottom right",
    cards: [
      { amount: "32", rotation: -2, x: "0cqi", y: "0cqi" },
      { amount: "18", rotation: 2, x: "0.55cqi", y: "-0.45cqi" },
    ],
  },
  {
    position: "bottom-[6%] right-[2%]",
    origin: "bottom right",
    cards: [
      { amount: "15", rotation: 3, x: "0cqi", y: "0cqi" },
      { amount: "27", rotation: -2, x: "0.45cqi", y: "-0.4cqi" },
    ],
  },
];

const PRIMARY_PLEDGES = PLEDGE_STACKS.map((stack, stackIndex) => ({
  ...stack.cards[0],
  position: stack.position,
  origin: stack.origin,
  stackIndex,
  cardIndex: 0,
}));

const STACKED_PLEDGES = PLEDGE_STACKS.flatMap((stack, stackIndex) =>
  stack.cards.slice(1).map((card, cardIndex) => ({
    ...card,
    position: stack.position,
    origin: stack.origin,
    stackIndex,
    cardIndex: cardIndex + 1,
  }))
);

const PLEDGES = [...PRIMARY_PLEDGES, ...STACKED_PLEDGES];

const PLEDGE_SCALE = 0.6;
const PLEDGE_LIMIT = 10;
const PLEDGE_REVEAL_DELAY_MS = 350;
const PLEDGE_REVEAL_INTERVAL_MS = 700;

export default function Hero() {
  const ref = useSectionInView("hero");
  const [visiblePledgeCount, setVisiblePledgeCount] = useState(0);

  useEffect(() => {
    const maxPledges = Math.min(PLEDGE_LIMIT, PLEDGES.length);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let count = 0;
    let timer;

    if (reduceMotion) {
      setVisiblePledgeCount(maxPledges);
      return;
    }

    const revealNext = () => {
      count += 1;
      setVisiblePledgeCount(count);

      if (count < maxPledges) {
        timer = window.setTimeout(revealNext, PLEDGE_REVEAL_INTERVAL_MS);
      }
    };

    timer = window.setTimeout(revealNext, PLEDGE_REVEAL_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

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
        @keyframes proovd-pledge-reveal {
          from {
            opacity: 0;
            transform: translateY(1.2cqi) scale(0.96);
          }
          65% {
            opacity: 1;
            transform: translateY(-0.18cqi) scale(1.01);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .proovd-pledge-reveal {
          animation: proovd-pledge-reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .proovd-marquee-track {
            animation-play-state: paused;
          }
          .proovd-pledge-reveal {
            animation: none;
          }
        }
      `}</style>

      <div
        className="relative w-full aspect-[4/3] md:aspect-[255/136] overflow-hidden"
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
            style={{
              width: "max-content",
              gap: "2.4cqi",
              marginTop: PHONE_MARQUEE_TOP_OFFSET,
            }}
          >
            {PHONE_LOOP.map((phone, i) => (
              <div
                key={`${phone.src}-${i}`}
                className="relative shrink-0"
                style={{
                  width: PHONE_WIDTH,
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
          {PLEDGES.slice(0, visiblePledgeCount).map((pledge, i) => (
            <div
              key={i}
              className={`hidden md:block absolute ${pledge.position}`}
              style={{
                transform: `translate(${pledge.x}, ${pledge.y}) rotate(${pledge.rotation}deg) scale(${PLEDGE_SCALE})`,
                transformOrigin: pledge.origin,
                zIndex: pledge.stackIndex * 10 + pledge.cardIndex + 1,
              }}
            >
              <div className="proovd-pledge-reveal">
                <PledgeCard
                  amount={pledge.amount}
                  name="Mira O."
                  handle="maya.builds"
                  rotation={0}
                />
              </div>
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

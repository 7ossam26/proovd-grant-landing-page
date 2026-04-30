"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionInView } from "@/lib/useSectionInView";
import PledgeCard from "@/components/ui/PledgeCard";

const PHONES = [
  { src: "hero-phone-1", topCqi: 0, rotate: -3 },
  { src: "hero-phone-2", topCqi: -3, rotate: 2 },
  { src: "hero-phone-3", topCqi: -6, rotate: -1 },
  { src: "hero-phone-4", topCqi: -1.5, rotate: 4 },
  { src: "hero-phone-5", topCqi: -4.5, rotate: -2 },
  { src: "hero-phone-6", topCqi: -2, rotate: 3 },
  { src: "hero-phone-7", topCqi: -5, rotate: -3 },
  { src: "hero-phone-8", topCqi: -1, rotate: 2 },
];

const PHONE_LOOP = [...PHONES, ...PHONES];
const MARQUEE_DURATION_S = 60; // increase to slow down, decrease to speed up
const PHONE_WIDTH_MOBILE = "31cqi";
const PHONE_WIDTH = "11cqi";
const PHONE_MARQUEE_TOP_OFFSET_MOBILE = "40cqi";
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
    position: "bottom-[4%] left-[18%]",
    origin: "bottom left",
    cards: [
      { amount: "64", rotation: -1, x: "0cqi", y: "0cqi" },
      { amount: "22", rotation: 3, x: "-0.5cqi", y: "-0.45cqi" },
      { amount: "39", rotation: -4, x: "0.55cqi", y: "-0.85cqi" },
    ],
  },
  {
    position: "bottom-[8%] left-[38%]",
    origin: "bottom left",
    cards: [
      { amount: "75", rotation: 2, x: "0cqi", y: "0cqi" },
      { amount: "55", rotation: -2, x: "-0.55cqi", y: "-0.4cqi" },
      { amount: "90", rotation: 4, x: "0.45cqi", y: "-0.8cqi" },
    ],
  },
  {
    position: "bottom-[10%] left-[51%]",
    origin: "bottom left",
    cards: [
      { amount: "84", rotation: -2, x: "0cqi", y: "0cqi" },
      { amount: "41", rotation: 3, x: "-0.5cqi", y: "-0.45cqi" },
      { amount: "68", rotation: -5, x: "0.55cqi", y: "-0.85cqi" },
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

const MOBILE_PLEDGES = [
  { amount: "75", rotation: 1, x: "0cqi", y: "0cqi" },
  { amount: "42", rotation: -4, x: "-1.1cqi", y: "-1.1cqi" },
  { amount: "28", rotation: 4, x: "1cqi", y: "-1.7cqi" },
];

const PLEDGE_SCALE = 0.6;
const MOBILE_PLEDGE_SCALE = 0.72;
const PLEDGE_LIMIT = 16;
const PLEDGE_REVEAL_DELAY_MS = 300;
const PLEDGE_REVEAL_INTERVAL_MS = 750;

export default function Hero() {
  const ref = useSectionInView("hero");
  const [visiblePledgeCount, setVisiblePledgeCount] = useState(0);
  const marqueeRef = useRef(null);

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

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (video.paused) video.play().catch(() => { });
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { root: container, threshold: 0 }
    );

    container.querySelectorAll("video").forEach((v) => observer.observe(v));
    return () => observer.disconnect();
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
          animation: proovd-marquee ${MARQUEE_DURATION_S}s linear infinite;
          margin-top: ${PHONE_MARQUEE_TOP_OFFSET_MOBILE};
        }
        .proovd-phone {
          width: ${PHONE_WIDTH_MOBILE};
        }
        @keyframes proovd-pledge-reveal {
          from {
            transform: translateY(1.2cqi) scale(0.96);
          }
          65% {
            transform: translateY(-0.18cqi) scale(1.01);
          }
          to {
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
        @media (min-width: 768px) {
          .proovd-marquee-track {
            margin-top: ${PHONE_MARQUEE_TOP_OFFSET};
          }
          .proovd-phone {
            width: ${PHONE_WIDTH};
          }
        }
      `}</style>

      <div
        className="relative w-full aspect-[393/710] md:aspect-[255/136] overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        {/* TODO(assets): hero background photo (full-bleed) — see /docs/assets-needed.md */}
        <img
          src="/assets/hero-bg.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%]"
        />

        <div ref={marqueeRef} className="absolute inset-0 overflow-hidden">
          <div
            className="proovd-marquee-track flex flex-row items-end"
            style={{
              width: "max-content",
              gap: "2.4cqi",
            }}
          >
            {PHONE_LOOP.map((phone, i) => (
              <div
                key={`${phone.src}-${i}`}
                className="proovd-phone relative shrink-0"
                style={{
                  aspectRatio: "9 / 19.5",
                  top: `${phone.topCqi}cqi`,
                  transform: `rotate(${phone.rotate}deg)`,
                }}
              >
                {/* TODO(assets): phone marquee video (.webm) — see /docs/assets-needed.md */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                >
                  <source
                    src={`/assets/videos/${phone.src}.webm`}
                    type="video/webm"
                  />
                </video>
              </div>
            ))}
          </div>
        </div>

        {/* TODO(assets): founder PNG cutout (transparent background, aligned 1:1 with hero-bg.webp) — see /docs/assets-needed.md */}
        <img
          src="/assets/hero-founder.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] z-10"
        />

        <div
          data-testid="desktop-pledge-layer"
          className="hidden md:block absolute inset-0 z-20 pointer-events-none select-none"
        >
          {PLEDGES.slice(0, visiblePledgeCount).map((pledge, i) => (
            <div
              key={i}
              className={`absolute ${pledge.position}`}
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

        <div
          data-testid="mobile-pledge-stack"
          className="md:hidden absolute bottom-[2.5%] left-1/2 z-20 pointer-events-none select-none"
          style={{
            transform: `translateX(-50%) scale(${MOBILE_PLEDGE_SCALE})`,
            transformOrigin: "bottom center",
          }}
        >
          <div className="relative h-[154px] w-[360px]">
            {MOBILE_PLEDGES.slice(0, visiblePledgeCount).map((pledge, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-0"
                style={{
                  transform: `translate(${pledge.x}, ${pledge.y}) rotate(${pledge.rotation}deg)`,
                  transformOrigin: "bottom center",
                  zIndex: i + 1,
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
      </div>

      <div className="bg-ink py-6 px-4 text-center md:py-10 md:px-8">
        <h1
          id="hero-heading"
          className="text-brand-lime font-black leading-none text-4xl md:text-6xl xl:text-7xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Sell Out Before The Product Exists
        </h1>
      </div>
    </section>
  );
}

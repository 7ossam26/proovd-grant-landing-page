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
const MARQUEE_DURATION_S = 15;
const ORBIT_DURATION_S = 3.6;
const PHONE_WIDTH_MOBILE = "31cqi";
const PHONE_WIDTH = "11cqi";
const PHONE_MARQUEE_TOP_OFFSET_MOBILE = "40cqi";
const PHONE_MARQUEE_TOP_OFFSET = "8cqi";

// Pools used by randomPledge() — names + handles vary so the loop never repeats noticeably.
const BACKER_NAMES = [
  "Max Q.", "Sara K.", "Jay M.", "Lia P.", "Dev R.", "Tom W.", "Mira O.",
  "Ren A.", "Vik P.", "Ana D.", "Kai L.", "Noa F.", "Ezra T.", "Indi B.",
  "June H.", "Rae S.", "Cam G.", "Theo V.", "Quin J.", "Sage M.", "Wren C.",
  "Iris N.", "Otis E.", "Luca Y.", "Pax R.", "Ari Z.", "Hugo K.", "Marlo D.",
  "Suri T.", "Cleo W.", "Bea L.", "Asher P.", "Niko F.", "Frey O.", "Jules S.",
  "Vera B.", "Kit H.", "Romi V.", "Tate G.", "Olive M.",
];

const AFFILIATES = [
  "maya.builds", "jay.mxyz", "lia.eats.ai", "dev.r.codes", "tom.dotwav",
  "sarak.builds", "maxq.lab", "ren.angles", "vikram.codes", "ana.draws",
  "kai.studio", "noa.frames", "ezra.threads", "indi.brews", "june.hertz",
  "rae.sees", "camg.studio", "theov.ai", "quinj.lab", "sagem.codes",
  "wrenc.kit", "iris.nyte", "otis.exe", "luca.ynk", "paxr.shop",
  "ari.zen", "hugo.kicks", "marlo.does", "suri.thinks", "cleo.wave",
];

const AMOUNTS = [10, 15, 18, 22, 24, 27, 32, 39, 41, 48, 50, 55, 64, 68, 75, 84, 90, 100, 120, 150, 180, 220];

const randomPledge = () => ({
  amount: String(AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]),
  name: BACKER_NAMES[Math.floor(Math.random() * BACKER_NAMES.length)],
  handle: AFFILIATES[Math.floor(Math.random() * AFFILIATES.length)],
});

// 7 desktop stacks, totalling 16 slots: 1, 1, 4, 4, 4, 1, 1 — middle three are stacked + larger,
// outer four are single cards at varied scales.
const PLEDGE_STACKS = [
  {
    position: "bottom-[16%] left-[3%]",
    origin: "bottom left",
    scale: 0.46,
    cards: [{ rotation: -4, x: "0cqi", y: "0cqi" }],
  },
  {
    position: "bottom-[5%] left-[12%]",
    origin: "bottom left",
    scale: 0.56,
    cards: [{ rotation: 3, x: "0cqi", y: "0cqi" }],
  },
  {
    position: "bottom-[6%] left-[24%]",
    origin: "bottom left",
    scale: 0.70,
    cards: [
      { rotation: -1, x: "0cqi", y: "0cqi" },
      { rotation: 3, x: "-0.5cqi", y: "-0.45cqi" },
      { rotation: -4, x: "0.55cqi", y: "-0.85cqi" },
      { rotation: 2, x: "-0.25cqi", y: "-1.25cqi" },
    ],
  },
  {
    position: "bottom-[10%] left-[40%]",
    origin: "bottom left",
    scale: 0.78,
    cards: [
      { rotation: 2, x: "0cqi", y: "0cqi" },
      { rotation: -2, x: "-0.55cqi", y: "-0.4cqi" },
      { rotation: 4, x: "0.45cqi", y: "-0.8cqi" },
      { rotation: -3, x: "-0.15cqi", y: "-1.2cqi" },
    ],
  },
  {
    position: "bottom-[8%] left-[58%]",
    origin: "bottom left",
    scale: 0.72,
    cards: [
      { rotation: -2, x: "0cqi", y: "0cqi" },
      { rotation: 3, x: "-0.5cqi", y: "-0.45cqi" },
      { rotation: -5, x: "0.55cqi", y: "-0.85cqi" },
      { rotation: 1, x: "-0.2cqi", y: "-1.25cqi" },
    ],
  },
  {
    position: "bottom-[14%] right-[14%]",
    origin: "bottom right",
    scale: 0.54,
    cards: [{ rotation: -3, x: "0cqi", y: "0cqi" }],
  },
  {
    position: "bottom-[7%] right-[2%]",
    origin: "bottom right",
    scale: 0.50,
    cards: [{ rotation: 3, x: "0cqi", y: "0cqi" }],
  },
];

// Flatten stacks into 16 slots, recording stack/card index + per-stack scale.
const PLEDGE_SLOTS = PLEDGE_STACKS.flatMap((stack, stackIndex) =>
  stack.cards.map((card, cardIndex) => ({
    ...card,
    position: stack.position,
    origin: stack.origin,
    scale: stack.scale,
    stackIndex,
    cardIndex,
  }))
);

const SLOT_COUNT = PLEDGE_SLOTS.length; // 16

// Mobile — 3 slots stacked at bottom center.
const MOBILE_SLOTS = [
  { rotation: 1, x: "0cqi", y: "0cqi" },
  { rotation: -4, x: "-1.1cqi", y: "-1.1cqi" },
  { rotation: 4, x: "1cqi", y: "-1.7cqi" },
];

const MOBILE_PLEDGE_SCALE = 0.6;
const PLEDGE_REVEAL_DELAY_MS = 250;
const PLEDGE_REVEAL_INTERVAL_MS = 600;
const PLEDGE_LOOP_INTERVAL_MS = 1500;

export default function Hero() {
  const ref = useSectionInView("hero");
  const marqueeRef = useRef(null);
  // Each slot holds { data, version } once revealed; null while still hidden.
  const [slots, setSlots] = useState(() => Array(SLOT_COUNT).fill(null));
  const [mobileSlots, setMobileSlots] = useState(() => Array(MOBILE_SLOTS.length).fill(null));

  // Initial staggered reveal — fills both desktop (16) and mobile (3) slot arrays
  // with random pledges. Mobile finishes faster because its array is shorter.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setSlots(Array.from({ length: SLOT_COUNT }, () => ({ data: randomPledge(), version: 0 })));
      setMobileSlots(Array.from({ length: MOBILE_SLOTS.length }, () => ({ data: randomPledge(), version: 0 })));
      return;
    }

    let desktopIdx = 0;
    let mobileIdx = 0;
    let timer;

    const revealNext = () => {
      if (desktopIdx < SLOT_COUNT) {
        const i = desktopIdx;
        setSlots((prev) => {
          const next = [...prev];
          next[i] = { data: randomPledge(), version: 0 };
          return next;
        });
        desktopIdx += 1;
      }
      if (mobileIdx < MOBILE_SLOTS.length) {
        const i = mobileIdx;
        setMobileSlots((prev) => {
          const next = [...prev];
          next[i] = { data: randomPledge(), version: 0 };
          return next;
        });
        mobileIdx += 1;
      }
      if (desktopIdx < SLOT_COUNT) {
        timer = window.setTimeout(revealNext, PLEDGE_REVEAL_INTERVAL_MS);
      }
    };

    timer = window.setTimeout(revealNext, PLEDGE_REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Continuous fan-in: after initial reveal, replace one desktop + one mobile slot per tick
  // with new randomized data (incrementing version forces a key change and re-runs the deal animation).
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cycle = 0;
    const id = window.setInterval(() => {
      setSlots((prev) => {
        if (prev.some((s) => s === null)) return prev;
        const next = [...prev];
        const target = cycle % SLOT_COUNT;
        next[target] = {
          data: randomPledge(),
          version: (next[target]?.version ?? 0) + 1,
        };
        return next;
      });
      setMobileSlots((prev) => {
        if (prev.some((s) => s === null)) return prev;
        const next = [...prev];
        const target = cycle % MOBILE_SLOTS.length;
        next[target] = {
          data: randomPledge(),
          version: (next[target]?.version ?? 0) + 1,
        };
        return next;
      });
      cycle += 1;
    }, PLEDGE_LOOP_INTERVAL_MS);

    return () => window.clearInterval(id);
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
      className="proovd-snap-section relative overflow-hidden bg-ink flex flex-col h-[100svh]"
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
        .proovd-phone-orbit {
          animation: proovd-phone-orbit-local ${ORBIT_DURATION_S}s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes proovd-phone-orbit-local {
          0%, 100% { transform: rotate(var(--phone-rotate, 0deg)) scale(1.18); }
          50%      { transform: rotate(var(--phone-rotate, 0deg)) scale(0.78); }
        }
        @media (prefers-reduced-motion: reduce) {
          .proovd-marquee-track { animation-play-state: paused; }
          .proovd-phone-orbit { animation: none; transform: rotate(var(--phone-rotate, 0deg)) scale(1); }
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
        className="relative flex-1 min-h-0 w-full overflow-hidden"
        style={{ containerType: "size" }}
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
                className="proovd-phone proovd-phone-orbit relative shrink-0"
                style={{
                  aspectRatio: "9 / 19.5",
                  top: `${phone.topCqi}cqi`,
                  "--phone-rotate": `${phone.rotate}deg`,
                  animationDelay: `${-((i % PHONES.length) * (ORBIT_DURATION_S / PHONES.length))}s`,
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
          {PLEDGE_SLOTS.map((slot, i) => {
            const cell = slots[i];
            if (!cell) return null;
            return (
              <div
                key={i}
                className={`absolute ${slot.position}`}
                style={{
                  transform: `translate(${slot.x}, ${slot.y}) scale(${slot.scale})`,
                  transformOrigin: slot.origin,
                  zIndex: slot.stackIndex * 10 + slot.cardIndex + 1,
                }}
              >
                <div
                  key={cell.version}
                  className="proovd-pledge-deal"
                  style={{
                    "--rot": `${slot.rotation}deg`,
                  }}
                >
                  <PledgeCard
                    amount={cell.data.amount}
                    name={cell.data.name}
                    handle={cell.data.handle}
                    rotation={0}
                  />
                </div>
              </div>
            );
          })}
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
            {MOBILE_SLOTS.map((slot, i) => {
              const cell = mobileSlots[i];
              if (!cell) return null;
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-0"
                  style={{
                    transform: `translate(${slot.x}, ${slot.y})`,
                    transformOrigin: "bottom center",
                    zIndex: i + 1,
                  }}
                >
                  <div
                    key={cell.version}
                    className="proovd-pledge-deal"
                    style={{
                      "--rot": `${slot.rotation}deg`,
                    }}
                  >
                    <PledgeCard
                      amount={cell.data.amount}
                      name={cell.data.name}
                      handle={cell.data.handle}
                      rotation={0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="bg-ink text-center flex-shrink-0"
        style={{
          paddingTop: "clamp(0.75rem, 2.2cqb, 2rem)",
          paddingBottom: "clamp(0.75rem, 2.2cqb, 2rem)",
          paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
          paddingRight: "clamp(1rem, 4vw, 2.5rem)",
          containerType: "inline-size",
        }}
      >
        <h1
          id="hero-heading"
          className="text-brand-lime font-black leading-none"
          style={{
            letterSpacing: "-0.04em",
            fontSize: "clamp(1.6rem, 7.5cqi, 4.5rem)",
          }}
        >
          Sell Out Before The Product Exists
        </h1>
      </div>
    </section>
  );
}

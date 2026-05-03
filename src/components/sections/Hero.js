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
const MARQUEE_DURATION_S_MOBILE = 7.5;
const MARQUEE_DURATION_S = 11;
const PHONE_SCALE_MIN_MOBILE = 0.70;
const PHONE_SCALE_MAX_MOBILE = 1.2;
const PHONE_SCALE_MIN = 0.65;
const PHONE_SCALE_MAX = 1.5;
const PHONE_WIDTH_MOBILE = "36cqi";
const PHONE_WIDTH = "13cqi";
const PHONE_GAP_MOBILE = "20cqi";
const PHONE_GAP = "15.6cqi";
const PHONE_MARQUEE_TOP_OFFSET_MOBILE = "40cqi";
const PHONE_MARQUEE_TOP_OFFSET = "8cqi";

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

let _pledgeId = 0;
const newCell = () => ({ data: randomPledge(), version: 0, id: ++_pledgeId });

// Single hero stack — sits center-bottom, larger than the side popups.
const CENTER_STACK = {
  scale: 0.78,
  cards: [
    { rotation: 2, x: "0cqi", y: "0cqi" },
    { rotation: -2, x: "-0.55cqi", y: "-0.4cqi" },
    { rotation: 4, x: "0.45cqi", y: "-0.8cqi" },
    { rotation: -3, x: "-0.15cqi", y: "-1.2cqi" },
  ],
};

const CENTER_CARD_COUNT = CENTER_STACK.cards.length;

// Mobile — 3 slots stacked at bottom center.
const MOBILE_SLOTS = [
  { rotation: 1, x: "0cqi", y: "-15cqi" },
  { rotation: -4, x: "-1.1cqi", y: "-15cqi" },
  { rotation: 4, x: "1cqi", y: "-15cqi" },
];

const MOBILE_PLEDGE_SCALE = 0.6;
const PLEDGE_REVEAL_DELAY_MS = 200;
const PLEDGE_REVEAL_INTERVAL_MS = 500;
const PLEDGE_LOOP_INTERVAL_MS = 1500;

// Heading bar — mobile vs desktop knobs. Desktop values match the previous inline styles 1:1.
const HEADING_FONT_MOBILE = "clamp(2rem, 11cqi, 5rem)";
const HEADING_FONT = "clamp(1.3rem, 5.7cqi, 3.55rem)";
const HEADING_PAD_TOP_MOBILE = "clamp(0.7rem, 1cqb, 1rem)";
const HEADING_PAD_TOP = "clamp(1rem, 2cqb, 2rem)";
const HEADING_PAD_BOTTOM_MOBILE = "clamp(0.9rem, 3cqb, 1.6rem)";
const HEADING_PAD_BOTTOM = "clamp(0.8rem, 2cqb, 2rem)";

export default function Hero() {
  const ref = useSectionInView("hero");
  const marqueeRef = useRef(null);
  const [centerCards, setCenterCards] = useState(() => Array(CENTER_CARD_COUNT).fill(null));
  const [mobileSlots, setMobileSlots] = useState(() => Array(MOBILE_SLOTS.length).fill(null));

  // Initial center-stack reveal + mobile reveal (staggered).
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setCenterCards(Array.from({ length: CENTER_CARD_COUNT }, () => newCell()));
      setMobileSlots(Array.from({ length: MOBILE_SLOTS.length }, () => newCell()));
      return;
    }

    let centerIdx = 0;
    let mobileIdx = 0;
    let timer;

    const revealNext = () => {
      if (centerIdx < CENTER_CARD_COUNT) {
        const i = centerIdx;
        setCenterCards((prev) => {
          const next = [...prev];
          next[i] = newCell();
          return next;
        });
        centerIdx += 1;
      }
      if (mobileIdx < MOBILE_SLOTS.length) {
        const i = mobileIdx;
        setMobileSlots((prev) => {
          const next = [...prev];
          next[i] = newCell();
          return next;
        });
        mobileIdx += 1;
      }
      if (centerIdx < CENTER_CARD_COUNT || mobileIdx < MOBILE_SLOTS.length) {
        timer = window.setTimeout(revealNext, PLEDGE_REVEAL_INTERVAL_MS);
      }
    };

    timer = window.setTimeout(revealNext, PLEDGE_REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Continuous cycle for the center stack and mobile stack.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setCenterCards((prev) => {
        if (prev.some((c) => c === null)) return prev;
        // Shift: oldest at index 0 falls off, all cards sink one slot, new pledge lands on top.
        return [...prev.slice(1), newCell()];
      });
      setMobileSlots((prev) => {
        if (prev.some((s) => s === null)) return prev;
        return [...prev.slice(1), newCell()];
      });
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

  // Position-driven phone scale: large at viewport edges, small at center (behind founder).
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;
    const desktopMq = window.matchMedia("(min-width: 768px)");
    let isDesktop = desktopMq.matches;
    const onBreakpointChange = (e) => { isDesktop = e.matches; };
    desktopMq.addEventListener("change", onBreakpointChange);

    const tick = () => {
      const containerRect = container.getBoundingClientRect();
      const mid = containerRect.left + containerRect.width / 2;
      const halfRange = containerRect.width / 2 || 1;
      const minScale = isDesktop ? PHONE_SCALE_MIN : PHONE_SCALE_MIN_MOBILE;
      const maxScale = isDesktop ? PHONE_SCALE_MAX : PHONE_SCALE_MAX_MOBILE;
      const phones = container.querySelectorAll(".proovd-phone");
      phones.forEach((phone) => {
        const rect = phone.getBoundingClientRect();
        const phoneCenter = rect.left + rect.width / 2;
        let t = Math.abs(phoneCenter - mid) / halfRange;
        if (t < 0) t = 0;
        if (t > 1) t = 1;
        // Smoothstep so the transition through center feels organic.
        const eased = t * t * (3 - 2 * t);
        const scale = minScale + (maxScale - minScale) * eased;
        phone.style.setProperty("--phone-scale", scale.toFixed(3));
      });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      desktopMq.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="proovd-feature-snap relative overflow-hidden bg-ink h-[100svh]"
    >
      <style>{`
        @keyframes proovd-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .proovd-marquee-track {
          animation: proovd-marquee ${MARQUEE_DURATION_S_MOBILE}s linear infinite;
          margin-top: ${PHONE_MARQUEE_TOP_OFFSET_MOBILE};
          gap: ${PHONE_GAP_MOBILE};
        }
        .proovd-phone {
          width: ${PHONE_WIDTH_MOBILE};
        }
        .proovd-phone-orbit {
          transform: rotate(var(--phone-rotate, 0deg)) scale(var(--phone-scale, 1));
          transform-origin: center;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .proovd-marquee-track { animation-play-state: paused; }
          .proovd-phone-orbit { transform: rotate(var(--phone-rotate, 0deg)) scale(1); }
        }
        .proovd-hero-heading-bar {
          padding-top: ${HEADING_PAD_TOP_MOBILE};
          padding-bottom: ${HEADING_PAD_BOTTOM_MOBILE};
        }
        .proovd-hero-heading {
          font-size: ${HEADING_FONT_MOBILE};
        }
        @media (min-width: 768px) {
          .proovd-marquee-track {
            animation: proovd-marquee ${MARQUEE_DURATION_S}s linear infinite;
            margin-top: ${PHONE_MARQUEE_TOP_OFFSET};
            gap: ${PHONE_GAP};
          }
          .proovd-phone {
            width: ${PHONE_WIDTH};
          }
          .proovd-hero-heading-bar {
            padding-top: ${HEADING_PAD_TOP};
            padding-bottom: ${HEADING_PAD_BOTTOM};
          }
          .proovd-hero-heading {
            font-size: ${HEADING_FONT};
          }
        }
      `}</style>

      <div
        className="absolute inset-0 overflow-hidden"
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
            style={{ width: "max-content" }}
          >
            {PHONE_LOOP.map((phone, i) => (
              <div
                key={`${phone.src}-${i}`}
                className="proovd-phone proovd-phone-orbit relative shrink-0"
                style={{
                  aspectRatio: "9 / 19.5",
                  top: `${phone.topCqi}cqi`,
                  "--phone-rotate": `${phone.rotate}deg`,
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
          src="/assets/hero-founder.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] z-[60] pointer-events-none"
        />

        {/* Desktop pledge layer */}
        <div
          data-testid="desktop-pledge-layer"
          className="hidden md:block absolute inset-0 z-[70] pointer-events-none select-none"
        >
          {/* Center stack — single, larger */}
          {CENTER_STACK.cards.map((card, i) => {
            const cell = centerCards[i];
            if (!cell) return null;
            return (
              <div
                key={`center-${cell.id}`}
                className="absolute bottom-[15%] left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${card.x}), ${card.y}) scale(${CENTER_STACK.scale})`,
                  transformOrigin: "bottom center",
                  zIndex: 100 + i,
                }}
              >
                <div
                  key={cell.version}
                  className="proovd-pledge-deal"
                  style={{ "--rot": `${card.rotation}deg` }}
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
          className="md:hidden absolute bottom-[12%] left-1/2 z-[70] pointer-events-none select-none"
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
                  key={`mobile-${cell.id}`}
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
                    style={{ "--rot": `${slot.rotation}deg` }}
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
        className="proovd-hero-heading-bar absolute bottom-0 left-0 right-0 bg-ink text-center z-[80]"
        style={{
          paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
          paddingRight: "clamp(1rem, 4vw, 2.5rem)",
          containerType: "inline-size",
        }}
      >
        <h1
          id="hero-heading"
          className="proovd-hero-heading text-brand-lime font-black leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          Sell Out Before The Product Exists
        </h1>
      </div>
    </section>
  );
}

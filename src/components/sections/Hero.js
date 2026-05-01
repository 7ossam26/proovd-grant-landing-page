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
const MARQUEE_DURATION_S = 12;
const PHONE_SCALE_MIN = 0.65;
const PHONE_SCALE_MAX = 1.5;
const PHONE_WIDTH_MOBILE = "36cqi";
const PHONE_WIDTH = "13cqi";
const PHONE_GAP_MOBILE = "4.4cqi";
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

// Single hero stack — sits center-bottom, larger than the side popups.
const CENTER_STACK = {
  scale: 1.0,
  cards: [
    { rotation: 2, x: "0cqi", y: "0cqi" },
    { rotation: -2, x: "-0.55cqi", y: "-0.4cqi" },
    { rotation: 4, x: "0.45cqi", y: "-0.8cqi" },
    { rotation: -3, x: "-0.15cqi", y: "-1.2cqi" },
  ],
};

const CENTER_CARD_COUNT = CENTER_STACK.cards.length;

// Six side popups — each one independently fades in, lingers, fades out, then re-appears with a new pledge.
const SIDE_POPUPS = [
  { position: "bottom-[18%] left-[3%]", origin: "bottom left", scale: 0.50, rotation: -4 },
  { position: "bottom-[6%] left-[13%]", origin: "bottom left", scale: 0.58, rotation: 3 },
  { position: "bottom-[12%] left-[26%]", origin: "bottom left", scale: 0.62, rotation: -2 },
  { position: "bottom-[12%] right-[26%]", origin: "bottom right", scale: 0.62, rotation: 2 },
  { position: "bottom-[18%] right-[14%]", origin: "bottom right", scale: 0.55, rotation: -3 },
  { position: "bottom-[6%] right-[3%]", origin: "bottom right", scale: 0.50, rotation: 3 },
];

const SIDE_COUNT = SIDE_POPUPS.length;

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

const SIDE_VISIBLE_BASE_MS = 2400;
const SIDE_VISIBLE_JITTER_MS = 1400;
const SIDE_HIDDEN_BASE_MS = 900;
const SIDE_HIDDEN_JITTER_MS = 1200;
const SIDE_INITIAL_STAGGER_MS = 320;

export default function Hero() {
  const ref = useSectionInView("hero");
  const marqueeRef = useRef(null);
  const [centerCards, setCenterCards] = useState(() => Array(CENTER_CARD_COUNT).fill(null));
  const [sidePopups, setSidePopups] = useState(() =>
    Array.from({ length: SIDE_COUNT }, () => ({ data: null, version: 0, visible: false }))
  );
  const [mobileSlots, setMobileSlots] = useState(() => Array(MOBILE_SLOTS.length).fill(null));

  // Initial center-stack reveal + mobile reveal (staggered).
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setCenterCards(Array.from({ length: CENTER_CARD_COUNT }, () => ({ data: randomPledge(), version: 0 })));
      setMobileSlots(Array.from({ length: MOBILE_SLOTS.length }, () => ({ data: randomPledge(), version: 0 })));
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
          next[i] = { data: randomPledge(), version: 0 };
          return next;
        });
        centerIdx += 1;
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

    let cycle = 0;
    const id = window.setInterval(() => {
      setCenterCards((prev) => {
        if (prev.some((c) => c === null)) return prev;
        const next = [...prev];
        const target = cycle % CENTER_CARD_COUNT;
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

  // Independent show/hide lifecycle for each side popup.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setSidePopups(
        Array.from({ length: SIDE_COUNT }, () => ({ data: randomPledge(), version: 0, visible: true }))
      );
      return;
    }

    const cancelled = { current: false };
    const timers = [];
    const schedule = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    const showSlot = (slotIdx) => {
      if (cancelled.current) return;
      setSidePopups((prev) => {
        const next = [...prev];
        const cur = next[slotIdx] ?? { version: 0 };
        next[slotIdx] = {
          data: randomPledge(),
          version: (cur.version ?? 0) + 1,
          visible: true,
        };
        return next;
      });
      schedule(() => hideSlot(slotIdx), SIDE_VISIBLE_BASE_MS + Math.random() * SIDE_VISIBLE_JITTER_MS);
    };

    const hideSlot = (slotIdx) => {
      if (cancelled.current) return;
      setSidePopups((prev) => {
        const next = [...prev];
        if (next[slotIdx]) {
          next[slotIdx] = { ...next[slotIdx], visible: false };
        }
        return next;
      });
      schedule(() => showSlot(slotIdx), SIDE_HIDDEN_BASE_MS + Math.random() * SIDE_HIDDEN_JITTER_MS);
    };

    for (let i = 0; i < SIDE_COUNT; i++) {
      schedule(() => showSlot(i), 400 + i * SIDE_INITIAL_STAGGER_MS);
    }

    return () => {
      cancelled.current = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
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

    const tick = () => {
      const containerRect = container.getBoundingClientRect();
      const mid = containerRect.left + containerRect.width / 2;
      const halfRange = containerRect.width / 2 || 1;
      const phones = container.querySelectorAll(".proovd-phone");
      phones.forEach((phone) => {
        const rect = phone.getBoundingClientRect();
        const phoneCenter = rect.left + rect.width / 2;
        let t = Math.abs(phoneCenter - mid) / halfRange;
        if (t < 0) t = 0;
        if (t > 1) t = 1;
        // Smoothstep so the transition through center feels organic.
        const eased = t * t * (3 - 2 * t);
        const scale = PHONE_SCALE_MIN + (PHONE_SCALE_MAX - PHONE_SCALE_MIN) * eased;
        phone.style.setProperty("--phone-scale", scale.toFixed(3));
      });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className="proovd-snap-section relative overflow-hidden bg-ink h-[100svh]"
    >
      <style>{`
        @keyframes proovd-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .proovd-marquee-track {
          animation: proovd-marquee ${MARQUEE_DURATION_S}s linear infinite;
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
        .proovd-pledge-popup {
          opacity: 0;
          transform: rotate(var(--rot, 0deg)) translateY(0.7cqi) scale(0.9);
          transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .proovd-pledge-popup.is-visible {
          opacity: 1;
          transform: rotate(var(--rot, 0deg)) translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .proovd-marquee-track { animation-play-state: paused; }
          .proovd-phone-orbit { transform: rotate(var(--phone-rotate, 0deg)) scale(1); }
          .proovd-pledge-popup { opacity: 1 !important; transform: rotate(var(--rot, 0deg)) !important; transition: none !important; }
        }
        @media (min-width: 768px) {
          .proovd-marquee-track {
            margin-top: ${PHONE_MARQUEE_TOP_OFFSET};
            gap: ${PHONE_GAP};
          }
          .proovd-phone {
            width: ${PHONE_WIDTH};
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
          src="/assets/hero-founder.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] z-[60]"
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
                key={`center-${i}`}
                className="absolute bottom-[12%] left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${card.x}), ${card.y}) scale(${CENTER_STACK.scale})`,
                  transformOrigin: "bottom center",
                  zIndex: i + 1,
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

          {/* Side popups — fade in/out independently */}
          {SIDE_POPUPS.map((slot, i) => {
            const cell = sidePopups[i];
            if (!cell || !cell.data) return null;
            return (
              <div
                key={`side-${i}`}
                className={`absolute ${slot.position}`}
                style={{
                  transform: `scale(${slot.scale})`,
                  transformOrigin: slot.origin,
                  zIndex: 50 + i,
                }}
              >
                <div
                  key={cell.version}
                  className={`proovd-pledge-popup ${cell.visible ? "is-visible" : ""}`}
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
        className="absolute bottom-0 left-0 right-0 bg-ink text-center z-[80]"
        style={{
          paddingTop: "clamp(0.5rem, 1.4cqb, 1.25rem)",
          paddingBottom: "clamp(0.5rem, 1.4cqb, 1.25rem)",
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
            fontSize: "clamp(1.2rem, 5.5cqi, 3.25rem)",
          }}
        >
          Sell out before the product exists
        </h1>
      </div>
    </section>
  );
}

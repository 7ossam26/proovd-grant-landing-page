"use client";

import { useSectionInView } from "@/lib/useSectionInView";

export default function Hero() {
  const ref = useSectionInView("hero");
  return (
    <section
      ref={ref}
      id="hero"
      className="bg-ink lg:min-h-[90vh] flex flex-col px-5 sm:px-8 md:px-12 lg:px-20 pt-10 pb-12"
    >
      {/*
       * TODO(assets): hero panel image (~1555×657, rounded rect) — see /docs/assets-needed.md
       * Replace this placeholder div with the actual hero visual once delivered.
       */}
      <div
        className="bg-[#D9D9D9] rounded-2xl w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/9] lg:aspect-[1555/657]"
        aria-hidden="true"
      />

      <h1
        className="text-brand-lime font-black leading-none lg:mt-auto pt-6 sm:pt-8"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 6.5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        Sell out before the product exists
      </h1>
    </section>
  );
}

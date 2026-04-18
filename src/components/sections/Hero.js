export default function Hero() {
  return (
    <section className="bg-ink min-h-[90vh] flex flex-col px-5 sm:px-8 md:px-12 lg:px-20 pt-10 pb-12">
      {/*
       * TODO(assets): hero panel image (~1555×657, rounded rect) — see /docs/assets-needed.md
       * Replace this placeholder div with the actual hero visual once delivered.
       */}
      <div
        className="bg-[#D9D9D9] rounded-2xl w-full"
        style={{ aspectRatio: "1555 / 657" }}
        aria-hidden="true"
      />

      <h1
        className="text-brand-lime font-black leading-none mt-auto pt-8"
        style={{
          fontSize: "clamp(4rem, 6vw, 6.5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        Sell out before the product exists
      </h1>
    </section>
  );
}

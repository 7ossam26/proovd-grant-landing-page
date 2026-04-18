"use client";

/*
 * MINT VARIANT: brand-primary (#3BED97) background.
 * USE AT MOST ONCE on the entire page — reserved for the Phase 5 CTA strip. Never use elsewhere.
 */

export default function Button({
  variant = "primary",
  tone = "dark",
  href,
  onClick,
  children,
  className = "",
  "data-event": dataEvent,
}) {
  const base =
    "inline-block font-medium text-base px-6 py-3 transition-colors duration-150 cursor-pointer";

  const variants = {
    primary:
      tone === "light"
        ? "bg-brand-forest text-surface hover:bg-brand-sage"
        : "bg-surface text-ink hover:bg-text-whisper",
    secondary: "bg-brand-lime text-brand-forest hover:bg-brand-sage",
    outline:
      tone === "light"
        ? "bg-transparent border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-surface"
        : "bg-transparent border border-brand-lime text-brand-lime hover:bg-brand-lime hover:text-brand-forest",
    ghost:
      tone === "light"
        ? "bg-transparent text-brand-forest hover:bg-brand-lime"
        : "bg-transparent text-brand-lime hover:bg-brand-forest",
    // MINT: brand-primary (#3BED97) bg — USE AT MOST ONCE on the entire page (Phase 5 CTA strip only)
    mint: "bg-brand-primary text-ink hover:bg-brand-lime",
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;
  const content = variant === "ghost" ? <>{children} &rarr;</> : children;
  const shared = { className: cls, onClick, "data-event": dataEvent };

  if (href) {
    return (
      <a href={href} {...shared}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...shared}>
      {content}
    </button>
  );
}

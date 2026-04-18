const tones = {
  paper:    "bg-surface",
  midnight: "bg-ink",
  forest:   "bg-brand-forest",
  meadow:   "bg-brand-lime",
  sage:     "bg-brand-sage",
  zest:     "bg-brand-citrus",
  breeze:   "bg-brand-sky",
};

const widths = {
  prose:    "max-w-4xl mx-auto px-6",
  narrow:   "max-w-2xl mx-auto px-6",
  wide:     "max-w-6xl mx-auto px-6",
  fullbleed: null,
};

const spacings = {
  tight:  "py-16",
  normal: "py-24",
  loose:  "py-32",
};

export default function Section({
  id,
  tone = "paper",
  width = "wide",
  spacing = "normal",
  children,
  className = "",
}) {
  const bg = tones[tone] ?? tones.paper;
  const py = spacings[spacing] ?? spacings.normal;
  const inner = widths[width];

  if (inner === null) {
    return (
      <section id={id} className={`${bg} ${py} ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={`${bg} ${py} ${className}`}>
      <div className={inner}>{children}</div>
    </section>
  );
}

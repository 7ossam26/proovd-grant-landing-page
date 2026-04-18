const eyebrowColors = {
  midnight: "text-brand-lime",
  forest:   "text-brand-lime",
  paper:    "text-brand-sage",
  meadow:   "text-brand-sage",
  sage:     "text-brand-forest",
  zest:     "text-brand-forest",
  breeze:   "text-brand-sage",
};

const headingColors = {
  midnight: "text-surface",
  forest:   "text-surface",
  paper:    "text-ink",
  meadow:   "text-ink",
  sage:     "text-surface",
  zest:     "text-ink",
  breeze:   "text-ink",
};

const bodyColors = {
  midnight: "text-text-whisper",
  forest:   "text-text-whisper",
  paper:    "text-brand-forest",
  meadow:   "text-brand-forest",
  sage:     "text-surface",
  zest:     "text-brand-forest",
  breeze:   "text-brand-forest",
};

// clamp: h1 48–110px, h2 36–72px, h3 28–48px
const headingSizes = {
  1: "[font-size:clamp(3rem,8vw,6.875rem)]",
  2: "[font-size:clamp(2.25rem,5vw,4.5rem)]",
  3: "[font-size:clamp(1.75rem,3.5vw,3rem)]",
};

export function Eyebrow({ children, tone = "midnight", className = "" }) {
  const color = eyebrowColors[tone] ?? "text-brand-lime";
  return (
    <p className={`uppercase text-sm tracking-widest font-medium ${color} ${className}`}>
      {children}
    </p>
  );
}

export function Heading({ level = 2, children, tone = "midnight", color, className = "" }) {
  const Tag = `h${level}`;
  const colorCls = color ?? headingColors[tone] ?? "text-surface";
  const sizeCls = headingSizes[level] ?? headingSizes[2];
  return (
    <Tag
      className={`font-black tracking-[-0.03em] leading-none ${sizeCls} ${colorCls} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Body({ children, tone = "midnight", className = "" }) {
  const color = bodyColors[tone] ?? "text-text-whisper";
  return (
    <p className={`leading-relaxed ${color} ${className}`}>{children}</p>
  );
}

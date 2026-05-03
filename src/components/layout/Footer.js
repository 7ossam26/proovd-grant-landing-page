"use client";

// ─── Tunables ────────────────────────────────────────────────────────────────

const LOGOMARK_WIDTH = "clamp(280px, 32vw, 520px)";

// Two top-level sections; each renders as a heading over a 2-column grid
// of links. The split mirrors the reference layout exactly.
const FOOTER_SECTIONS = [
  {
    heading: "Legal",
    columns: [
      [
        { label: "Terms of Service", href: "#" },
        { label: "IP Protection Policy", href: "#" },
      ],
      [
        { label: "Privacy Policy", href: "#" },
        { label: "Backer Disclaimer", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    ],
  },
  {
    heading: "Company",
    columns: [
      [
        { label: "About", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
      [
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#FAFAFA" }}>
      <div
        className="relative overflow-hidden"
        style={{
          // Top padding clears the CtaStrip right photo, which overflows
          // ~60–120px into the footer via SIDE_PHOTO_OFFSET in CtaStrip.js.
          paddingTop: "clamp(8rem, 13vw, 11rem)",
          paddingBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {/* Outlined logomark — bleeds off the bottom-left corner */}
        <img
          src="/assets/footer-logomark-outlined.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            left: "-4vw",
            top: "-6vw",
            width: LOGOMARK_WIDTH,
            height: "auto",
            zIndex: 1,
          }}
        />

        {/* Two sections side-by-side on desktop, stacked on mobile.
            Pushed right of the logomark via lg:pl-[35%]. */}
        <nav
          aria-label="Footer"
          className="relative grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 px-6 md:px-12 lg:pl-[35%]"
          style={{ zIndex: 2 }}
        >
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.heading}>
              <h3
                className="font-bold mb-4"
                style={{
                  color: "#1E4D2F",
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                }}
              >
                {section.heading}
              </h3>
              <div className="grid grid-cols-2 gap-x-8">
                {section.columns.map((column, ci) => (
                  <ul key={ci} className="space-y-2">
                    {column.map((link) => (
                      <li
                        key={link.label}
                        style={{
                          color: "#1E4D2F",
                          fontSize: "clamp(0.875rem, 1vw, 1rem)",
                        }}
                      >
                        <a
                          href={link.href}
                          className="hover:underline"
                          style={{ color: "#1E4D2F" }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}

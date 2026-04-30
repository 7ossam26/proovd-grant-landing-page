"use client";

import Image from "next/image";

// ─── Tunables ────────────────────────────────────────────────────────────────

const LOGOMARK_WIDTH = "clamp(280px, 32vw, 520px)";

const LINK_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "For Founders", href: "#" },
      { label: "For Affiliates", href: "#" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
      { label: "Success Stories", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "IP Protection Policy", href: "#" },
      { label: "Backer Disclaimer", href: "#" },
      { label: "Cookie Settings", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Pitch Guide", href: "#" },
      { label: "Playbook", href: "#" },
      { label: "Affiliate Toolkit", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Press", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#FAFAFA" }}>
      {/* ─── Link container — tinted surface, big logomark + 4 columns ── */}
      <div
        className="footer-link-container relative overflow-hidden"
        style={{
          paddingTop: "clamp(2rem, 4vw, 4rem)",
          paddingBottom: "clamp(1rem, 1vw, 1rem)",
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

        {/* Link columns — push right of the logomark on desktop */}
        <nav
          aria-label="Footer"
          className="relative grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 px-6 md:px-12 lg:pl-[40%]"
          style={{ zIndex: 2 }}
        >
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3
                className="font-bold mb-4"
                style={{
                  color: "#1E4D2F",
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                {col.links.map((link) => (
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
            </div>
          ))}
        </nav>

        {/* ─── Copyright row — sits inside the link container, centered ── */}
        <div
          className="relative flex flex-col items-center text-center px-6 md:px-12"
          style={{
            zIndex: 2,
            paddingTop: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Proovd logo" width={24} height={24} />
            <p className="text-sm" style={{ color: "#1E4D2F" }}>
              &copy; 2026 Proovd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

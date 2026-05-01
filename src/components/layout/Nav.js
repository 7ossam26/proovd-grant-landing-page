"use client";

import { useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { useActiveSection } from "@/lib/useActiveSection";

const signupUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

const SECTION_IDS = ["hero", "features-pitch", "features-match", "features-proof"];

// Per-section pairings — controls link colors when scrolled past Hero.
// Hero ('hero') keeps the original ink/lime/primary palette via the bar/logo state.
const PAIRINGS = {
  "features-pitch": { link: "#09110C", signup: "#09110C" },
  "features-match": { link: "#1E4D2F", signup: "#09110C" },
  "features-proof": { link: "#BCFCA1", signup: "#FAFAFA" },
};

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS, "hero");
  const isHero = active === "hero" || !PAIRINGS[active];
  const pairing = PAIRINGS[active] ?? { link: "#DCE8CA", signup: "#3BED97" };

  // On Hero, links use brand-primary (signup) + text-whisper (others) on the dark bar.
  // Past Hero, the bar/logo fade out and links recolor per the section pairing.
  const heroLinkColor = "#DCE8CA";
  const heroSignupColor = "#3BED97";
  const linkColor = isHero ? heroLinkColor : pairing.link;
  const signupColor = isHero ? heroSignupColor : pairing.signup;

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed left-0 right-0 top-0 z-50"
        style={{ pointerEvents: "none" }}
      >
        {/* Bar + logo — only visible on Hero. Fades out past Hero. */}
        <div
          className="absolute inset-0 bg-ink transition-opacity duration-300"
          style={{
            opacity: isHero ? 1 : 0,
            pointerEvents: isHero ? "auto" : "none",
          }}
          aria-hidden={!isHero}
        />
        <div className="relative flex items-center justify-between px-5 sm:px-8 md:px-[4.6cqi] pt-3 pb-2 md:pt-[2.6cqi] md:pb-[0.7cqi]" style={{ pointerEvents: "auto" }}>
          {/* Logo — visible on Hero only */}
          <a
            href="/"
            aria-label="Proovd home"
            className="transition-opacity duration-300"
            style={{
              opacity: isHero ? 1 : 0,
              pointerEvents: isHero ? "auto" : "none",
            }}
          >
            <Image
              src="/logo.svg"
              alt="Proovd"
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] md:h-[1.7cqi] md:w-[1.7cqi]"
            />
          </a>

          {/* Desktop links — always present, color shifts per section */}
          <div className="hidden md:flex items-center md:gap-[3.1cqi]">
            <a
              href="#features-pitch"
              className="transition-colors duration-300 md:text-[1.18cqi]"
              style={{ color: linkColor }}
              onClick={() => trackEvent("nav_click", { target: "features" })}
            >
              Features
            </a>
            <a
              href="#contact"
              className="transition-colors duration-300 md:text-[1.18cqi]"
              style={{ color: linkColor }}
              onClick={() => trackEvent("nav_click", { target: "contact" })}
            >
              Contact
            </a>
            <a
              href={signupUrl}
              className="transition-colors duration-300 font-bold md:text-[1.18cqi]"
              style={{ color: signupColor }}
              onClick={() => trackEvent("nav_click", { target: "signup" })}
            >
              Sign up
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-whisper text-base font-bold"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              opacity: isHero ? 1 : 0,
              pointerEvents: isHero ? "auto" : "none",
              transition: "opacity 300ms",
            }}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 bg-ink flex-col ${menuOpen ? "flex" : "hidden"}`}
      >
        <div className="flex justify-end px-5 sm:px-8 md:px-12 lg:px-20 py-5">
          <button
            aria-label="Close menu"
            className="text-brand-lime"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="3" x2="21" y2="21" />
              <line x1="21" y1="3" x2="3" y2="21" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-10">
          <a
            href="#features-pitch"
            className="text-text-whisper text-2xl"
            onClick={() => {
              setMenuOpen(false);
              trackEvent("nav_click", { target: "features" });
            }}
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-text-whisper text-2xl"
            onClick={() => {
              setMenuOpen(false);
              trackEvent("nav_click", { target: "contact" });
            }}
          >
            Contact
          </a>
          <a
            href={signupUrl}
            className="text-brand-primary hover:text-brand-lime transition-colors text-2xl font-medium"
            onClick={() => {
              setMenuOpen(false);
              trackEvent("nav_click", { target: "signup" });
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}

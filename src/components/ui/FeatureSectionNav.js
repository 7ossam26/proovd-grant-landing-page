"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const signupUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

// Per Color.md:
//   tone="forest" — link text is text-whisper (dark navigation rule); underline matches.
//                   Sign up reads as bold surface text pre-hover (display color on forest).
//                   Hover follows "Primary button on brand-forest": surface bg, brand-forest text.
//   tone="ink"    — link text is text-whisper (dark navigation rule); underline matches.
//                   Sign up reads as bold surface text pre-hover (display color on ink).
//                   Hover follows "Primary button on ink": surface bg, ink text.
//   default       — brand-forest text on light surfaces (lime, surface).
//                   Sign up reads as bold ink text pre-hover (emphasis color on lime/surface).
//                   Hover follows "Primary button on lime/surface": brand-forest bg, surface text.
const TONE = {
  forest:  { text: "#DCE8CA", underline: "#DCE8CA", signupColor: "#FAFAFA", signupHoverBg: "#FAFAFA", signupHoverText: "#1E4D2F" },
  ink:     { text: "#DCE8CA", underline: "#DCE8CA", signupColor: "#FAFAFA", signupHoverBg: "#FAFAFA", signupHoverText: "#09110C" },
  default: { text: "#1E4D2F", underline: "#1E4D2F", signupColor: "#09110C", signupHoverBg: "#1E4D2F", signupHoverText: "#FAFAFA" },
};

export default function FeatureSectionNav({ location, tone = "default", animate = false }) {
  const navRef = useRef(null);
  const [visible, setVisible] = useState(!animate);
  const palette = TONE[tone] || TONE.default;

  useEffect(() => {
    if (!animate) return;
    if (!navRef.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(navRef.current);
    return () => io.disconnect();
  }, [animate]);

  return (
    <nav
      ref={navRef}
      aria-label="Section nav"
      data-animate={animate}
      data-visible={visible}
      className="proovd-pitch-nav hidden md:flex absolute top-[2.6cqi] items-center gap-[3.1cqi]"
      style={{
        right: "clamp(1.5rem, 5vw, 5rem)",
        // CSS vars consumed by .proovd-pitch-nav-link / .proovd-pitch-nav-signup in globals.css.
        "--nav-link-color": palette.text,
        "--nav-underline-color": palette.underline,
        "--nav-signup-color": palette.signupColor,
        "--nav-signup-hover-bg": palette.signupHoverBg,
        "--nav-signup-hover-text": palette.signupHoverText,
      }}
    >
      <a
        href="#features-pitch"
        data-active="true"
        className="proovd-pitch-nav-link font-medium md:text-[1.18cqi]"
        onClick={() => trackEvent("nav_click", { target: "features", location })}
      >
        Features
      </a>
      <a
        href="#contact"
        className="proovd-pitch-nav-link font-medium md:text-[1.18cqi]"
        onClick={() => trackEvent("nav_click", { target: "contact", location })}
      >
        Contact
      </a>
      <a
        href={signupUrl}
        className="proovd-pitch-nav-signup font-bold md:text-[1.18cqi] px-5 md:px-[1.6cqi] py-2 md:py-[0.65cqi] -ml-5 md:ml-[-1.6cqi]"
        onClick={() => trackEvent("nav_click", { target: "signup", location })}
      >
        Sign up
      </a>
    </nav>
  );
}

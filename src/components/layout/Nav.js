"use client";

import { useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const signupUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Main"
        className="absolute left-0 right-0 top-5 md:top-[2.6cqi] z-50 bg-ink py-2.5 md:py-[0.7cqi]"
      >
        <div className="px-5 sm:px-8 md:px-[4.6cqi] flex items-center justify-between">
          {/* Logo — brand-primary dot (1 of 2 allowed uses on the page) */}
          <a href="/" aria-label="Proovd home">
            <Image
              src="/logo.svg"
              alt="Proovd"
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] md:h-[1.7cqi] md:w-[1.7cqi]"
            />
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center md:gap-[3.1cqi]"
          >
            <a
              href="#features-pitch"
              className="text-text-whisper hover:text-surface transition-colors md:text-[1.18cqi]"
              onClick={() => trackEvent("nav_click", { target: "features" })}
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-text-whisper hover:text-surface transition-colors md:text-[1.18cqi]"
              onClick={() => trackEvent("nav_click", { target: "contact" })}
            >
              Contact
            </a>
            <a
              href={signupUrl}
              className="text-brand-primary hover:text-brand-lime transition-colors font-bold md:text-[1.18cqi]"
              onClick={() => trackEvent("nav_click", { target: "signup" })}
            >
              Sign up
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-lime"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
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

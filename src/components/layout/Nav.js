"use client";

import { useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const signupUrl = process.env.NEXT_PUBLIC_CTA_PRIMARY_URL || "#";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-ink sticky top-0 z-50 py-5">
        <div className="px-5 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo — brand-primary dot (1 of 2 allowed uses on the page) */}
          <a href="/" aria-label="Proovd home">
            <Image src="/logo.svg" alt="Proovd" width={30} height={30} priority />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#features-pitch"
              className="text-text-whisper hover:text-surface transition-colors text-base"
              onClick={() => trackEvent("nav_click", { target: "features" })}
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-text-whisper hover:text-surface transition-colors text-base"
              onClick={() => trackEvent("nav_click", { target: "contact" })}
            >
              Contact
            </a>
            {/* Sign up — brand-primary text (2nd of 2 allowed uses on the page) */}
            <a
              href={signupUrl}
              className="text-brand-primary hover:text-brand-lime transition-colors text-base font-medium"
              onClick={() => trackEvent("nav_click", { target: "signup" })}
            >
              Sign up
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-lime"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
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
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-ink flex flex-col"
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
              className="text-brand-primary text-2xl font-medium"
              onClick={() => {
                setMenuOpen(false);
                trackEvent("nav_click", { target: "signup" });
              }}
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </>
  );
}

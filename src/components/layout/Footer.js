"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const footerColumns = [
  { title: "Platform", links: [
    { label: "For Founders", href: "#" },
    { label: "For Affiliates", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#" },
    { label: "Success Stories", href: "#" },
  ]},
  { title: "Legal", links: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "IP Protection Policy", href: "#" },
    { label: "Backer Disclaimer", href: "#" },
    { label: "Cookie Settings", href: "#cookie-settings" },
  ]},
  { title: "Resources", links: [
    { label: "Pitch Guide", href: "#" },
    { label: "Playbook", href: "#" },
    { label: "Affiliate Toolkit", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
  ]},
  { title: "Company", links: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Press", href: "#" },
  ]},
];

export default function Footer() {
  return (
    <footer className="bg-brand-forest pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* 4-column link grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-brand-lime text-sm font-bold uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-whisper text-sm hover:text-brand-lime transition-colors"
                      onClick={() => {
                        trackEvent("footer_link_click", {
                          column: col.title,
                          label: link.label,
                        });
                        if (/^https?:\/\//i.test(link.href)) {
                          trackEvent("external_link_click", { href: link.href });
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-3 border-t border-brand-forest pt-8">
          <Image src="/logo.svg" alt="" aria-hidden="true" width={24} height={24} />
          <p className="text-text-whisper text-sm">
            &copy; 2026 Proovd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

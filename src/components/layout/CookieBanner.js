"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/lib/consent";
import Button from "@/components/ui/Button";

export default function CookieBanner() {
  const ctx = useConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!ctx) return null;
  if (!mounted) return null;
  if (ctx.consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      data-testid="cookie-banner"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[60] bg-ink border border-brand-lime rounded-md p-5"
    >
      <p className="text-text-whisper text-sm leading-relaxed mb-4">
        We use cookies to understand how visitors use this site. Umami counts
        visits without cookies. Microsoft Clarity uses cookies for heatmaps and
        session replay — only with your consent.
      </p>
      <div className="flex flex-wrap gap-3 mb-3">
        <Button
          variant="secondary"
          onClick={ctx.accept}
          className="text-sm px-5 py-2"
        >
          Accept
        </Button>
        <Button
          variant="outline"
          onClick={ctx.decline}
          className="text-sm px-5 py-2"
        >
          Decline
        </Button>
      </div>
      <a
        href="#cookie-settings"
        className="text-brand-lime underline text-xs"
      >
        Cookie settings
      </a>
    </div>
  );
}

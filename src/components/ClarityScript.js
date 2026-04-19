"use client";

import { useEffect } from "react";
import { useConsent } from "@/lib/consent";

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityScript() {
  const ctx = useConsent();
  const consent = ctx?.consent;

  useEffect(() => {
    if (!PROJECT_ID) return;
    if (consent !== "accepted") return;
    if (typeof window === "undefined") return;
    if (window.clarity) return;

    (function (c, l, a, r, i) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      const t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      t.setAttribute("data-clarity", "true");
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", PROJECT_ID);
  }, [consent]);

  return null;
}

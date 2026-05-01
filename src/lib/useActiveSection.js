"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds, defaultId = null) {
  const [active, setActive] = useState(defaultId ?? sectionIds[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const ratios = new Map();
    sectionIds.forEach((id) => ratios.set(id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        let topId = sectionIds[0];
        let topRatio = -1;
        ratios.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });
        if (topRatio > 0) setActive(topId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./analytics";

export function useSectionInView(sectionId) {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current || fired.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !fired.current) {
          trackEvent("section_scroll_reached", { section_id: sectionId });
          fired.current = true;
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [sectionId]);

  return ref;
}

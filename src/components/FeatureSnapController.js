"use client";

import { useEffect } from "react";

// Going down: deactivate quickly past FeatureProof so the user can scroll out.
const RELEASE_DOWN_PX = 4;
// Going up: activate earlier from below so wheel-up gestures don't overshoot
// past FeatureProof before mandatory snap engages.
const ENTRY_UP_PX = 60;

export default function FeatureSnapController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 768px)");
    let raf = null;
    let active = false;
    let direction = 1;

    const apply = (on) => {
      if (on === active) return;
      document.documentElement.classList.toggle("proovd-snap-active", on);
      active = on;
    };

    const update = () => {
      raf = null;
      if (!mq.matches) return apply(false);

      const start = document.getElementById("hero");
      const end = document.getElementById("features-proof");
      if (!start || !end) return apply(false);

      const scrollY = window.scrollY;
      const startTop = start.offsetTop;
      const endTop = end.offsetTop;
      const upper =
        direction < 0 ? endTop + ENTRY_UP_PX : endTop + RELEASE_DOWN_PX;

      apply(scrollY >= startTop && scrollY <= upper);
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    const onWheel = (e) => {
      if (e.deltaY > 0) direction = 1;
      else if (e.deltaY < 0) direction = -1;
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    mq.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      mq.removeEventListener("change", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
      apply(false);
    };
  }, []);

  return null;
}

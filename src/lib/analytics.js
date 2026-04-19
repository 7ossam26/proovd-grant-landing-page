"use client";

export function trackEvent(name, payload = {}) {
  if (typeof window === "undefined") return;
  if (window.umami?.track) {
    try {
      window.umami.track(name, payload);
    } catch {}
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, payload);
  }
}

export function redirectWithTracking(destination, event = "outbound_cta_redirect") {
  trackEvent(event, { destination });
  if (typeof window !== "undefined") {
    window.location.href = destination;
  }
}

export function registerScrollDepthTracking() {
  if (typeof window === "undefined") return () => {};
  let maxDepth = 0;
  const onScroll = () => {
    const d = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    );
    if (d > maxDepth) maxDepth = d;
  };
  const onPageHide = () => {
    trackEvent("page_exit_scroll_depth", { percent: maxDepth });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", onPageHide);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pagehide", onPageHide);
  };
}

export function registerTimeOnPageTracking() {
  if (typeof window === "undefined") return () => {};
  const thresholds = [30, 60, 180, 300];
  const timers = thresholds.map((s) =>
    setTimeout(() => trackEvent("time_on_page_bucket", { seconds: s }), s * 1000)
  );
  return () => timers.forEach(clearTimeout);
}

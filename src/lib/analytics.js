"use client";

export function trackEvent(name, payload = {}) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, payload);
  // Phase 6: window.umami?.track(name, payload);
}

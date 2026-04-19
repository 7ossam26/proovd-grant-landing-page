"use client";

import { useEffect } from "react";
import {
  registerScrollDepthTracking,
  registerTimeOnPageTracking,
} from "@/lib/analytics";

export default function AnalyticsLifecycle() {
  useEffect(() => {
    const cleanupScroll = registerScrollDepthTracking();
    const cleanupTime = registerTimeOnPageTracking();
    return () => {
      cleanupScroll();
      cleanupTime();
    };
  }, []);

  return null;
}

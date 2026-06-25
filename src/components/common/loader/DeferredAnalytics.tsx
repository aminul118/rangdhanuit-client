"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const DeferredAnalytics = () => {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setLoadAnalytics(true);
      ["mousemove", "scroll", "touchstart", "keydown"].forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    ["mousemove", "scroll", "touchstart", "keydown"].forEach((event) => {
      window.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      ["mousemove", "scroll", "touchstart", "keydown"].forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  if (!loadAnalytics) return null;

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics gaId="G-RKTJLQEYCK" />
    </>
  );
};

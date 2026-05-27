"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const DeferredAnalytics = () => {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadAnalytics(true);
    }, 2000); // delay analytics by 2 seconds to prioritize main thread tasks

    return () => clearTimeout(timer);
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

"use client";

import { useEffect, useRef } from "react";

type ConsentPayload = {
  choice: "accepted" | "declined" | "custom";
  analytics: boolean;
};

const STORAGE_KEY = "tnc-consent";
const VERCEL_INSIGHTS_ID = "__vercel_insights";
const VERCEL_SPEED_INSIGHTS_ID = "__vercel_speed_insights";

function shouldAllowAnalytics(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as ConsentPayload;
    return parsed.choice === "accepted" && parsed.analytics !== false;
  } catch {
    return false;
  }
}

export default function AnalyticsLoader() {
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadAnalytics = () => {
      if (loadedRef.current || !shouldAllowAnalytics()) return;

      const insightsAlreadyLoaded = Boolean(document.getElementById(VERCEL_INSIGHTS_ID));
      const speedAlreadyLoaded = Boolean(document.getElementById(VERCEL_SPEED_INSIGHTS_ID));

      if (!insightsAlreadyLoaded) {
        const insights = document.createElement("script");
        insights.id = VERCEL_INSIGHTS_ID;
        insights.src = "/_vercel/insights/script.js";
        insights.defer = true;
        document.body.appendChild(insights);
      }

      if (!speedAlreadyLoaded) {
        const speed = document.createElement("script");
        speed.id = VERCEL_SPEED_INSIGHTS_ID;
        speed.src = "/_vercel/speed-insights/script.js";
        speed.defer = true;
        document.body.appendChild(speed);
      }

      loadedRef.current = true;
    };

    loadAnalytics();

    const onConsentChange = () => loadAnalytics();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadAnalytics();
    };

    window.addEventListener("tnc-consent-change", onConsentChange as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("tnc-consent-change", onConsentChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}

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
    // Avoid injecting Vercel analytics scripts during local dev profiling.
    if (process.env.NODE_ENV !== "production") return;

    const loadAnalytics = () => {
      if (loadedRef.current || !shouldAllowAnalytics()) return;

      const dispatch = (name: "tnc-analytics-loaded" | "tnc-analytics-error", detail: unknown) => {
        window.dispatchEvent(new CustomEvent(name, { detail }));
      };

      const insightsAlreadyLoaded = Boolean(document.getElementById(VERCEL_INSIGHTS_ID));
      const speedAlreadyLoaded = Boolean(document.getElementById(VERCEL_SPEED_INSIGHTS_ID));

      if (!insightsAlreadyLoaded) {
        const insights = document.createElement("script");
        insights.id = VERCEL_INSIGHTS_ID;
        insights.src = "/_vercel/insights/script.js";
        insights.defer = true;
        insights.addEventListener("load", () => {
          document.documentElement.dataset.tncInsightsLoaded = "true";
          dispatch("tnc-analytics-loaded", { provider: "vercel", script: "insights" });
        });
        insights.addEventListener("error", () => {
          dispatch("tnc-analytics-error", { provider: "vercel", script: "insights", src: insights.src });
        });
        document.body.appendChild(insights);
      }

      if (!speedAlreadyLoaded) {
        const speed = document.createElement("script");
        speed.id = VERCEL_SPEED_INSIGHTS_ID;
        speed.src = "/_vercel/speed-insights/script.js";
        speed.defer = true;
        speed.addEventListener("load", () => {
          document.documentElement.dataset.tncSpeedInsightsLoaded = "true";
          dispatch("tnc-analytics-loaded", { provider: "vercel", script: "speed-insights" });
        });
        speed.addEventListener("error", () => {
          dispatch("tnc-analytics-error", { provider: "vercel", script: "speed-insights", src: speed.src });
        });
        document.body.appendChild(speed);
      }

      loadedRef.current = true;
    };

    const scheduleLoad = () => {
      if (loadedRef.current || !shouldAllowAnalytics()) return;
      if ("requestIdleCallback" in window) {
        (window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout?: number }) => number;
        }).requestIdleCallback(loadAnalytics, { timeout: 3000 });
      } else {
        globalThis.setTimeout(loadAnalytics, 1500);
      }
    };

    scheduleLoad();

    const onConsentChange = () => scheduleLoad();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) scheduleLoad();
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

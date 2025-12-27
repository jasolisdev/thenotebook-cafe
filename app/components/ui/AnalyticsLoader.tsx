"use client";

import { useEffect, useRef } from "react";

type ConsentPayload = {
  choice: "accepted" | "declined" | "custom";
  analytics: boolean;
};

const STORAGE_KEY = "tnc-consent";
const VERCEL_INSIGHTS_ID = "__vercel_insights";
const VERCEL_SPEED_INSIGHTS_ID = "__vercel_speed_insights";
const GA4_ID = "__ga4_gtag";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Extend window for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

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

/**
 * Initialize GA4 consent mode with default denied state.
 * This must be called before any gtag commands.
 */
function initializeGtagConsent() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Set default consent state to denied
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

/**
 * Update GA4 consent state when user accepts cookies.
 */
function updateGtagConsent(granted: boolean) {
  if (typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export default function AnalyticsLoader() {
  const loadedRef = useRef(false);
  const ga4InitializedRef = useRef(false);

  useEffect(() => {
    // Initialize GA4 consent mode immediately (before scripts load)
    // This sets default denied state for GDPR compliance
    if (!ga4InitializedRef.current && GA4_MEASUREMENT_ID) {
      initializeGtagConsent();
      ga4InitializedRef.current = true;
    }

    // Avoid injecting analytics scripts during local dev (except GA4 consent init)
    if (process.env.NODE_ENV !== "production") return;

    const dispatch = (name: "tnc-analytics-loaded" | "tnc-analytics-error", detail: unknown) => {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    };

    const loadGA4 = () => {
      if (!GA4_MEASUREMENT_ID) return;

      const ga4AlreadyLoaded = Boolean(document.getElementById(GA4_ID));
      if (ga4AlreadyLoaded) return;

      // Load gtag.js script
      const gtagScript = document.createElement("script");
      gtagScript.id = GA4_ID;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
      gtagScript.async = true;
      gtagScript.addEventListener("load", () => {
        // Initialize GA4 after script loads
        window.gtag("js", new Date());
        window.gtag("config", GA4_MEASUREMENT_ID, {
          send_page_view: true,
        });
        document.documentElement.dataset.tncGa4Loaded = "true";
        dispatch("tnc-analytics-loaded", { provider: "ga4", id: GA4_MEASUREMENT_ID });
      });
      gtagScript.addEventListener("error", () => {
        dispatch("tnc-analytics-error", { provider: "ga4", src: gtagScript.src });
      });
      document.head.appendChild(gtagScript);
    };

    const loadVercelAnalytics = () => {
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
    };

    const loadAnalytics = () => {
      if (loadedRef.current) return;

      const consentGranted = shouldAllowAnalytics();

      // Update GA4 consent state
      updateGtagConsent(consentGranted);

      if (!consentGranted) return;

      // Load all analytics when consent is granted
      loadGA4();
      loadVercelAnalytics();

      loadedRef.current = true;
    };

    const scheduleLoad = () => {
      // Always update consent state, even if already loaded
      updateGtagConsent(shouldAllowAnalytics());

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

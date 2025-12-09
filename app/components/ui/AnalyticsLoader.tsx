"use client";

import { useEffect, useRef, useState } from "react";

type ConsentPayload = {
  choice: "accepted" | "declined" | "custom";
  analytics: boolean;
};

const STORAGE_KEY = "tnc-consent";
const VERCEL_ANALYTICS_ID = "__vercel";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadAnalytics = () => {
      if (loadedRef.current || !shouldAllowAnalytics()) return;
      if (document.getElementById(VERCEL_ANALYTICS_ID)) {
        loadedRef.current = true;
        setReady(true);
        return;
      }
      const script = document.createElement("script");
      script.id = VERCEL_ANALYTICS_ID;
      script.src = "/_vercel/insights/script.js";
      script.defer = true;
      document.body.appendChild(script);
      loadedRef.current = true;
      setReady(true);
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

  return ready ? null : null;
}

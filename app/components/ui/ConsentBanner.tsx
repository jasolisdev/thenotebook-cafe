
"use client";

import { useEffect, useState } from "react";
import "../../styles/components/consent-banner.css";

const STORAGE_KEY = "tnc-consent";

type ConsentValue = "accepted" | "declined";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }

    const handleOpen = () => setVisible(true);
    window.addEventListener("tnc-open-consent", handleOpen as EventListener);
    return () => window.removeEventListener("tnc-open-consent", handleOpen as EventListener);
  }, []);

  const persist = (value: ConsentValue, analytics: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: value, analytics }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tnc-consent-change", { detail: { choice: value, analytics } }));
    }
    setVisible(false);
  };

  const handleAcceptAll = () => {
    persist("accepted", true);
  };

  const handleReject = () => {
    persist("declined", false);
  };

  if (!visible) return null;

  return (
    <div
      className={`consent-banner ${visible ? 'show' : ''}`}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="consent-banner__text">
        <h4 className="consent-banner__headline">We use cookies</h4>
        <p className="consent-banner__copy">
          To improve your experience and keep the coffee flowing smoothly, we use cookies.
        </p>
      </div>
      <div className="consent-banner__actions">
        <button
          type="button"
          className="consent-banner__button consent-banner__button--outline"
          onClick={handleReject}
        >
          Decline
        </button>
        <button
          type="button"
          className="consent-banner__button consent-banner__button--solid"
          onClick={handleAcceptAll}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

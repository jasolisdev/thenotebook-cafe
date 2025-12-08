
"use client";

import { useEffect, useState } from "react";
import "../../styles/components/consent-banner.css";

const STORAGE_KEY = "tnc-consent";

type ConsentValue = "accepted" | "declined";

const CookieIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01" />
    <path d="M16 15.5v.01" />
    <path d="M12 12v.01" />
    <path d="M11 17v.01" />
    <path d="M7 14v.01" />
  </svg>
);

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
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <div className="consent-banner__content animate-float">
        <div className="consent-banner__icon" aria-hidden>
          <CookieIcon className="w-7 h-7 text-cafe-brown" />
        </div>
        <div className="consent-banner__text">
          <p className="consent-banner__headline">Cookies?</p>
          <p className="consent-banner__copy">
            We use essentials to run the site, and optional analytics (if you allow) to improve your experience (and because they’re delicious).
          </p>
        </div>
        <div className="consent-banner__actions">
          <button
            type="button"
            className="consent-banner__button consent-banner__button--solid"
            onClick={handleAcceptAll}
          >
            Accept
          </button>
          <button
            type="button"
            className="consent-banner__button consent-banner__button--ghost"
            onClick={handleReject}
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

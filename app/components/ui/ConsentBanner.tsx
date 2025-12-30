/**
 * @file ConsentBanner Component
 * @description Cookie consent banner with analytics integration
 * Styles consolidated in app/globals.css (COOKIE CONSENT BANNER section)
 */
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tnc-consent";

type ConsentValue = "accepted" | "declined";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const openBanner = useCallback(() => {
    setShouldRender(true);
    setTimeout(() => setVisible(true), 10);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(openBanner, 1500);
      return () => clearTimeout(timer);
    }

    window.addEventListener("tnc-open-consent", openBanner as EventListener);
    return () => window.removeEventListener("tnc-open-consent", openBanner as EventListener);
  }, [openBanner]);

  const persist = (value: ConsentValue, analytics: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: value, analytics }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tnc-consent-change", { detail: { choice: value, analytics } }));
    }
    // Trigger slide-out animation before unmounting
    setVisible(false);
    setTimeout(() => setShouldRender(false), 500); // Match animation duration
  };

  const handleAcceptAll = () => {
    persist("accepted", true);
  };

  const handleReject = () => {
    persist("declined", false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`consent-banner ${visible ? 'show' : ''} ${expanded ? 'expanded' : ''}`}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="consent-banner__text">
        <h4 className="consent-banner__headline">We use cookies</h4>
        <p className="consent-banner__copy">
          To improve your experience and keep the coffee flowing smoothly, we use cookies.
          <button
            type="button"
            className="consent-banner__link"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Hide details" : "Read more..."}
          </button>
        </p>
        {expanded && (
          <p className="consent-banner__details">
            You can change your preferences anytime by clicking Cookies in the footer.
            <a className="consent-banner__link" href="/privacy">
              Learn more →
            </a>
          </p>
        )}
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

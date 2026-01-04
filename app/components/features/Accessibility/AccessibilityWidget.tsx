"use client";

import React, { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  XMarkIcon,
  ContrastIcon,
  EyeIcon,
  ResetIcon,
  ChevronLeftIcon,
  MousePointerIcon,
  LinkIcon,
  RulerIcon,
  PauseIcon,
  BrainIcon,
} from "@/app/components/ui/AccessibilityIcons";
import { WheelchairIcon } from "@/app/components/ui/SocialIcons";
import { logger } from "@/app/lib";

interface AccessibilitySettings {
  textSize: "normal" | "large" | "xl";
  grayscale: boolean;
  highContrast: boolean;
  readableFont: boolean;
  hideImages: boolean;
  cursorSize: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  bionicReading: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textSize: "normal",
  grayscale: false,
  highContrast: false,
  readableFont: false,
  hideImages: false,
  cursorSize: false,
  highlightLinks: false,
  dyslexiaFont: false,
  readingGuide: false,
  stopAnimations: false,
  bionicReading: false,
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const AccessibilityWidget: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"settings" | "statement">("settings");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const saved = localStorage.getItem("accessibility-settings");
    if (!saved) return defaultSettings;
    try {
      const parsed = JSON.parse(saved) as AccessibilitySettings;
      return parsed;
    } catch (e) {
      logger.error("Failed to load accessibility settings", e);
      return defaultSettings;
    }
  });

  const isDefaultSettings = useMemo(() => {
    return (
      Object.keys(defaultSettings) as (keyof AccessibilitySettings)[]
    ).every((key) => settings[key] === defaultSettings[key]);
  }, [settings]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    }
  }, [settings]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Lazy-load OpenDyslexic font when dyslexia font is enabled
  useEffect(() => {
    if (settings.dyslexiaFont) {
      // Check if font is already loaded
      const existingStyle = document.getElementById("opendyslexic-font");
      if (!existingStyle) {
        const style = document.createElement("style");
        style.id = "opendyslexic-font";
        style.textContent = `
          @font-face {
            font-family: "OpenDyslexic";
            src: url("/fonts/OpenDyslexic-Regular.woff") format("woff");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "OpenDyslexic";
            src: url("/fonts/OpenDyslexic-Bold.woff") format("woff");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "OpenDyslexic";
            src: url("/fonts/OpenDyslexic-Italic.woff") format("woff");
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [settings.dyslexiaFont]);

  // Apply settings to document
  useEffect(() => {
    const html = document.documentElement;

    // Toggles
    if (settings.grayscale) html.classList.add("acc-grayscale");
    else html.classList.remove("acc-grayscale");
    if (settings.highContrast) html.classList.add("acc-contrast");
    else html.classList.remove("acc-contrast");
    if (settings.readableFont) html.classList.add("acc-readable-font");
    else html.classList.remove("acc-readable-font");
    if (settings.hideImages) html.classList.add("acc-hide-images");
    else html.classList.remove("acc-hide-images");
    if (settings.cursorSize) html.classList.add("acc-cursor-lg");
    else html.classList.remove("acc-cursor-lg");
    if (settings.highlightLinks) html.classList.add("acc-highlight-links");
    else html.classList.remove("acc-highlight-links");
    if (settings.dyslexiaFont) html.classList.add("acc-dyslexia-font");
    else html.classList.remove("acc-dyslexia-font");
    if (settings.readingGuide) html.classList.add("acc-reading-guide");
    else html.classList.remove("acc-reading-guide");
    if (settings.stopAnimations) html.classList.add("acc-stop-animations");
    else html.classList.remove("acc-stop-animations");
  }, [settings]);

  // Bionic Reading Logic
  useEffect(() => {
    const applyBionicReading = () => {
      if (settings.bionicReading) {
        // Broaden the selector to include nav, footer, and other key areas
        // Specifically use .nav-link for navigation to avoid hitting the brand logo/title link
        const textElements = document.querySelectorAll(
          "main p, main h1, main h2, main h3, main h4, main h5, main h6, main li, main a, main button, main span:not(.bionic-skip), nav a.nav-link, footer a, footer span:not(.bionic-skip), .menu-link-text",
        );
        textElements.forEach((el) => {
          const element = el as HTMLElement;
          // Skip elements that are already processed or should be skipped
          if (
            !element.getAttribute("data-bionic-original") &&
            element.textContent &&
            element.textContent.trim().length > 0
          ) {
            element.setAttribute("data-bionic-original", element.innerHTML);
            const words = element.innerText.split(" ");
            const newHtml = words
              .map((word) => {
                const mid = Math.ceil(word.length / 2);
                const left = escapeHtml(word.slice(0, mid));
                const right = escapeHtml(word.slice(mid));
                return `<b class="bionic-bold">${left}</b>${right}`;
              })
              .join(" ");
            element.innerHTML = newHtml;
          }
        });
      } else {
        const textElements = document.querySelectorAll(
          "[data-bionic-original]",
        );
        textElements.forEach((element) => {
          const original = element.getAttribute("data-bionic-original");
          if (original) {
            element.innerHTML = original;
            element.removeAttribute("data-bionic-original");
          }
        });
      }
    };

    // Delay to ensure page content is fully rendered after navigation
    const timeoutId = setTimeout(() => {
      applyBionicReading();
    }, 50);

    // Watch for DOM changes (dynamic content)
    let observer: MutationObserver | null = null;
    if (settings.bionicReading) {
      observer = new MutationObserver((mutations) => {
        // Check if new content was added
        const hasNewContent = mutations.some(
          (mutation) =>
            mutation.type === "childList" && mutation.addedNodes.length > 0,
        );
        if (hasNewContent) {
          // Delay to ensure content is fully rendered
          setTimeout(applyBionicReading, 100);
        }
      });

      const mainElement = document.querySelector("main");
      if (mainElement) {
        observer.observe(mainElement, {
          childList: true,
          subtree: true,
        });
      }
    }

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [settings.bionicReading, pathname]);

  // Reading Guide Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const guide = document.getElementById("reading-guide-line");
      if (guide && settings.readingGuide) {
        guide.style.top = `${e.clientY}px`;
      }
    };

    if (settings.readingGuide) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [settings.readingGuide]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] as boolean }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setView("settings");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`fixed bottom-6 left-6 z-[1110] w-14 h-14 bg-cafe-brown text-cafe-cream rounded-full shadow-2xl flex items-center justify-center hover:scale-105 hover:bg-cafe-black transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-cafe-tan/50 border ${isDefaultSettings ? "border-cafe-tan/40" : "border-gold/90 shadow-[0_0_0_3px_rgba(196,164,132,0.18)]"}`}
        aria-label="Accessibility Options"
      >
        <WheelchairIcon size={28} className="-mt-0.5" />
      </button>

      {/* Dim Overlay (Full screen, bottom layer) */}
      <div
        className={`acc-dim-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Tan Panel (Slides from left, middle layer) */}
      <div
        className={`acc-layer-backdrop ${isOpen ? "open" : ""}`}
      />

      {/* Drawer (Slides from left, top layer) */}
      <div
        className={`acc-widget-panel ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-cafe-tan/20 bg-cafe-cream flex items-center justify-between shrink-0">
          {view === "settings" ? (
            <>
              <h2 className="font-display font-bold text-xl text-cafe-black">
                Accessibility Tools
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-cafe-tan/15 flex items-center justify-center text-cafe-brown transition-colors focus:outline-none focus:ring-2 focus:ring-cafe-tan/40"
                aria-label="Close accessibility panel"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setView("settings");
                  // Scroll to top of content area when going back to settings
                  setTimeout(() => {
                    if (contentRef.current) {
                      contentRef.current.scrollTop = 0;
                    }
                  }, 50);
                }}
                className="flex items-center gap-2 font-display font-bold text-xl text-cafe-black hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-cafe-tan/40"
                aria-label="Back to settings"
              >
                <ChevronLeftIcon className="w-6 h-6" />
                <span>Back to Settings</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-cafe-tan/15 flex items-center justify-center text-cafe-brown transition-colors focus:outline-none focus:ring-2 focus:ring-cafe-tan/40"
                aria-label="Close accessibility panel"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-6 bg-cafe-mist"
        >
          {view === "settings" ? (
            <div className="space-y-4">
              <p className="text-sm text-cafe-brown/70 font-sans mb-4">
                Customize your viewing experience with our accessibility tools.
              </p>

              {/* Toggles */}
              <div className="space-y-3">
                <ToggleButton
                  label="Bionic Reading"
                  icon={<BrainIcon className="w-6 h-6" />}
                  active={settings.bionicReading}
                  onClick={() => toggleSetting("bionicReading")}
                />

                <ToggleButton
                  label="Reading Guide"
                  icon={<RulerIcon className="w-6 h-6" />}
                  active={settings.readingGuide}
                  onClick={() => toggleSetting("readingGuide")}
                />

                <ToggleButton
                  label="High Contrast"
                  icon={<ContrastIcon className="w-6 h-6" />}
                  active={settings.highContrast}
                  onClick={() => toggleSetting("highContrast")}
                />

                <ToggleButton
                  label="Grayscale"
                  icon={<EyeIcon className="w-6 h-6" />}
                  active={settings.grayscale}
                  onClick={() => toggleSetting("grayscale")}
                />

                <ToggleButton
                  label="Dyslexia Font"
                  icon={
                    <span className="font-serif font-bold text-xl px-1">D</span>
                  }
                  active={settings.dyslexiaFont}
                  onClick={() => toggleSetting("dyslexiaFont")}
                />

                <ToggleButton
                  label="Highlight Links"
                  icon={<LinkIcon className="w-6 h-6" />}
                  active={settings.highlightLinks}
                  onClick={() => toggleSetting("highlightLinks")}
                />

                <ToggleButton
                  label="Large Cursor"
                  icon={<MousePointerIcon className="w-6 h-6" />}
                  active={settings.cursorSize}
                  onClick={() => toggleSetting("cursorSize")}
                />

                <ToggleButton
                  label="Hide Images"
                  icon={<EyeIcon className="w-6 h-6" />}
                  active={settings.hideImages}
                  onClick={() => toggleSetting("hideImages")}
                />

                <ToggleButton
                  label="Stop Animations"
                  icon={<PauseIcon className="w-6 h-6" />}
                  active={settings.stopAnimations}
                  onClick={() => toggleSetting("stopAnimations")}
                />
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-cafe-brown/90 animate-slide-in-left">
              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">
                Our Commitment to Accessibility
              </h3>
              <p className="mb-4 text-cafe-brown/80">
                We want everyone to enjoy The Notebook Café online. We aim for
                WCAG 2.1 AA alignment and keep iterating with feedback from our
                community.
              </p>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">
                Features Available
              </h3>
              <ul className="list-disc pl-5 mb-4 space-y-1 text-cafe-brown/80">
                <li>
                  <strong>Visual Options:</strong> High-contrast mode, grayscale,
                  hide images, and pause animations.
                </li>
                <li>
                  <strong>Reading Aids:</strong> Dyslexia-friendly font, bionic
                  reading, and a reading guide line.
                </li>
                <li>
                  <strong>Focus Helpers:</strong> Larger cursor, link
                  highlights.
                </li>
              </ul>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">
                How We Test
              </h3>
              <p className="mb-4 text-cafe-brown/80">
                We review pages with keyboard-only navigation, screen
                magnifiers, and automated checks, and we welcome your feedback
                to improve further.
              </p>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">
                Need Assistance?
              </h3>
              <p className="mb-8 text-cafe-brown/80">
                If any part of this site is hard to use, email us at{" "}
                <a
                  href="mailto:thenotebookcafellc@gmail.com"
                  className="font-semibold text-cafe-black underline"
                >
                  thenotebookcafellc@gmail.com
                </a>{" "}
                and we’ll work with you directly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === "settings" && (
          <div className="p-6 border-t border-cafe-tan/20 bg-cafe-cream shrink-0 space-y-3">
            <button
              onClick={() => {
                setView("statement");
                // Scroll to top of content area when opening statement
                setTimeout(() => {
                  if (contentRef.current) {
                    contentRef.current.scrollTop = 0;
                  }
                }, 50);
              }}
              className="w-full py-3 px-4 bg-white hover:bg-cafe-tan/10 text-cafe-brown rounded-xl font-bold transition-colors text-sm border border-cafe-tan/20"
            >
              Read Accessibility Statement
            </button>
            <button
              onClick={resetSettings}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-cafe-tan/25 text-cafe-brown hover:bg-cafe-tan/10 rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-cafe-tan/40 bg-white"
            >
              <ResetIcon className="w-5 h-5" />
              Reset Settings
            </button>
          </div>
        )}
      </div>

      {/* Reading Guide Line */}
      {settings.readingGuide && (
        <div
          id="reading-guide-line"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "#DC2626",
            pointerEvents: "none",
            zIndex: 9999,
            boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
          }}
        />
      )}
    </>
  );
};

// Helper Component for consistency
const ToggleButton = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${active ? "bg-cafe-tan/15 text-cafe-black border-cafe-tan/50 shadow-sm" : "bg-white text-cafe-brown border-cafe-tan/20 hover:border-cafe-tan/40 hover:bg-cafe-tan/5"}`}
  >
    {icon}
    <span className="font-bold flex-1 text-left">{label}</span>
    <div
      className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? "bg-cafe-tan" : "bg-cafe-beige"}`}
    >
      <div
        className={`w-4 h-4 rounded-full transition-transform ${active ? "translate-x-4 bg-cafe-white" : "translate-x-0 bg-cafe-brown/30"}`}
      />
    </div>
  </button>
);

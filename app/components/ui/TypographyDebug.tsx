"use client";

import { useEffect, useState } from "react";

/**
 * Typography Debug Component
 *
 * Adds visual debugging for all text elements showing:
 * - Font family
 * - Font weight
 * - Font size
 *
 * Usage: Add <TypographyDebug enabled /> to your layout to show debug overlay
 */
export default function TypographyDebug({ enabled = true }: { enabled?: boolean }) {
  const [isActive, setIsActive] = useState(enabled);

  useEffect(() => {
    if (!isActive) {
      document.documentElement.classList.remove("debug-typography");
      // Clean up data attributes
      document.querySelectorAll("[data-debug]").forEach((el) => {
        el.removeAttribute("data-debug");
        el.removeAttribute("data-level");
      });
      return;
    }

    document.documentElement.classList.add("debug-typography");

    const updateDebugInfo = () => {
      // Get all text elements
      const selectors = "h1, h2, h3, h4, h5, h6, p, button, a, label, span:not(:empty)";
      const elements = document.querySelectorAll(selectors);

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const styles = window.getComputedStyle(htmlEl);

        // Get font info
        const fontFamily = styles.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
        const fontWeight = styles.fontWeight;
        const fontSize = styles.fontSize;

        // Shorten font names
        const shortFont = fontFamily
          .replace("Playfair Display", "Playfair")
          .replace("system-ui", "System")
          .substring(0, 12);

        // Create debug label
        const debugLabel = `${shortFont} ${fontWeight} ${fontSize}`;
        htmlEl.setAttribute("data-debug", debugLabel);

        // Add heading level
        const tagName = el.tagName.toLowerCase();
        if (tagName.startsWith("h") && tagName.length === 2) {
          htmlEl.setAttribute("data-level", tagName[1]);
        }
      });
    };

    // Initial update
    updateDebugInfo();

    // Update on resize (font sizes may change)
    window.addEventListener("resize", updateDebugInfo);

    // Update periodically for dynamic content
    const interval = setInterval(updateDebugInfo, 2000);

    return () => {
      window.removeEventListener("resize", updateDebugInfo);
      clearInterval(interval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="debug-typography-legend">
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#ef4444" }} />
        <span>H1 Headings</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#f87171" }} />
        <span>H2 Headings</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#fca5a5" }} />
        <span>H3 Headings</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#3b82f6" }} />
        <span>Paragraphs</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#22c55e" }} />
        <span>Buttons</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#06b6d4" }} />
        <span>Links</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#a855f7", border: "1px dashed #a855f7" }} />
        <span>Spans</span>
      </div>
      <div className="debug-legend-item">
        <div className="debug-legend-color" style={{ background: "#f97316" }} />
        <span>Labels</span>
      </div>
      <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #374151", color: "#9ca3af", fontSize: "9px" }}>
        Set <code style={{ background: "#374151", padding: "2px 4px", borderRadius: "2px" }}>enabled=&#123;false&#125;</code> to hide
      </div>
    </div>
  );
}

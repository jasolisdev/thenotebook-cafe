"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * DarkModeToggle Component
 *
 * Elegant toggle for switching between light and dark themes.
 * Features smooth animations and coffee-inspired design.
 *
 * @component
 * @example
 * ```tsx
 * <DarkModeToggle />
 * ```
 */
export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="dark-mode-toggle-skeleton">
        <div className="w-14 h-7 rounded-full bg-cafe-tan/10" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="dark-mode-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <span className="dark-mode-toggle__track">
        <span className="dark-mode-toggle__thumb">
          {isDark ? (
            <Moon size={14} strokeWidth={2.5} />
          ) : (
            <Sun size={14} strokeWidth={2.5} />
          )}
        </span>
      </span>
    </button>
  );
}

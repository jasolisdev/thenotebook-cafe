"use client";

import { useEffect, useState } from "react";

/**
 * Props for the AnnouncementBanner component
 */
type AnnouncementBannerProps = {
  /**
   * Announcement text to display
   * @default "Grand Opening 2026"
   */
  text?: string;
};

/**
 * AnnouncementBanner Component
 *
 * Sticky banner at the top of all pages displaying announcement text
 * with animated coffee cup icons and rising steam effects.
 *
 * @component
 * @example
 * ```tsx
 * import AnnouncementBanner from '@/app/components/ui/AnnouncementBanner';
 *
 * // Default text
 * <AnnouncementBanner />
 *
 * // Custom text
 * <AnnouncementBanner text="Join us for opening day!" />
 * ```
 *
 * @description
 * Features:
 * - Fixed positioning at top of viewport (z-index: 50)
 * - Gold gradient background matching site aesthetic
 * - Animated steam rising from coffee cups (2s loop, staggered)
 * - Responsive spacing (8px → 12px gap between cups and text)
 * - Client-side hydration handling to prevent mismatch
 *
 * Styles: app/styles/components/announcement.css
 * - `.announcement-banner` - Container with fixed positioning
 * - `.announcement-steam` - Rising steam animation
 * - Responsive gaps via CSS clamp()
 *
 * @param {AnnouncementBannerProps} props - Component props
 * @returns {React.JSX.Element|null} Rendered banner or null if not mounted
 */
export default function AnnouncementBanner({
  text = "Grand Opening 2026",
}: AnnouncementBannerProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);

  /**
   * Set mounted state after initial render
   * Prevents hydration mismatch issues
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="announcement-banner" role="banner" aria-label="Announcement">
      <div className="announcement-content">
        {/* Left Coffee Cup with Steam */}
        <div className="announcement-icon" aria-hidden="true">
          <svg
            className="announcement-coffee-cup"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="announcement-steam announcement-steam-1"></div>
          <div className="announcement-steam announcement-steam-2"></div>
          <div className="announcement-steam announcement-steam-3"></div>
        </div>

        {/* Announcement Text */}
        <div className="announcement-text-wrapper">
          <div className="announcement-text-scroll">
            <span className="announcement-text">{text}</span>
          </div>
        </div>

        {/* Right Coffee Cup with Steam */}
        <div className="announcement-icon" aria-hidden="true">
          <svg
            className="announcement-coffee-cup"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="announcement-steam announcement-steam-1"></div>
          <div className="announcement-steam announcement-steam-2"></div>
          <div className="announcement-steam announcement-steam-3"></div>
        </div>
      </div>
    </div>
  );
}

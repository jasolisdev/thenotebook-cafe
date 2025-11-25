"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiSpotify, SiInstagram, SiFacebook } from "react-icons/si";
import AnnouncementBanner from "../ui/AnnouncementBanner";

// Suppress hydration warnings for client-only components
const isBrowser = typeof window !== "undefined";

/**
 * Responsive breakpoint types for navigation behavior
 */
type Breakpoint = "sm" | "md" | "lg" | "xl";

/**
 * Props for the SiteHeader component
 */
type SiteHeaderProps = {
  /** Instagram profile URL */
  instagramUrl?: string;

  /** Spotify playlist URL */
  spotifyUrl?: string;

  /**
   * Breakpoint at which mobile menu switches to desktop navigation
   * @default "lg"
   */
  burgerUntil?: Breakpoint;

  /** Optional custom announcement text */
  announcementText?: string;
};

/**
 * Breakpoint pixel values for responsive behavior
 */
const BP_PX: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * SiteHeader Component
 *
 * Global navigation header with responsive mobile drawer menu.
 * Includes announcement banner, desktop navigation, and full-screen mobile overlay.
 *
 * @component
 * @example
 * ```tsx
 * import SiteHeader from '@/app/components/layout/SiteHeader';
 *
 * // Basic usage
 * <SiteHeader />
 *
 * // With social links
 * <SiteHeader
 *   instagramUrl="https://instagram.com/notebookcafe"
 *   spotifyUrl="https://open.spotify.com/playlist/..."
 * />
 *
 * // Custom breakpoint
 * <SiteHeader burgerUntil="md" />
 * ```
 *
 * @description
 * Features:
 * - Fixed announcement banner at top
 * - Responsive navigation (desktop: horizontal, mobile: full-screen overlay)
 * - Active page highlighting
 * - Mobile drawer with social links and vibe text
 * - Keyboard navigation (ESC to close drawer)
 * - Body scroll lock when drawer is open
 * - Decorative floating coffee beans in drawer
 *
 * Navigation Structure:
 * - Desktop: Home | Menu | Story | Contact
 * - Mobile: HOME | MENU | STORY | CONTACT + social icons + footer
 *
 * @param {SiteHeaderProps} props - Component props
 * @returns {React.JSX.Element} Rendered header
 */
export default function SiteHeader({
  instagramUrl,
  spotifyUrl,
  burgerUntil = "lg",
  announcementText,
}: SiteHeaderProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  /**
   * Handles mobile menu toggle button click
   * Prevents event bubbling and toggles drawer state
   */
  const handleToggle = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !open;
    setOpen(newState);
  };

  /**
   * Close drawer when navigating to a new page
   */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /**
   * Close drawer on ESC key press
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Lock body scroll when drawer is open
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Checks if the given href matches the current pathname
   * Used for active link highlighting
   *
   * @param {string} href - Link href to check
   * @returns {boolean} True if link is active
   */
  const isActive = (href: string): boolean => pathname === href;

  const bpPx = useMemo(() => BP_PX[burgerUntil], [burgerUntil]);

  return (
    <div suppressHydrationWarning>
      {/* Announcement Banner */}
      <AnnouncementBanner text={announcementText} />

      {/* Responsive breakpoint styles */}
      <style jsx>{`
        @media (min-width: ${bpPx}px) {
          .burger-btn {
            display: none !important;
          }
          .nav-desktop-show {
            display: inline-flex !important;
          }
        }
        @media (max-width: ${bpPx - 0.02}px) {
          .nav-desktop-show {
            display: none !important;
          }
        }
      `}</style>

      {/* Header Navigation Bar */}
      <div className="header-container">
        <header
          className={`site-header ${open ? "header-open" : ""}`}
          role="banner"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="site-brand brand-inline"
            aria-label="The Notebook Café - Home"
          >
            <Image
              src="/thenotebookcafe-navbar-dark.png"
              alt="The Notebook Café"
              width={200}
              height={68}
              priority
              className="brand-logo"
            />
            <span className="sr-only">The Notebook Café</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="site-nav nav-desktop-show"
            aria-label="Primary navigation"
          >
            <Link
              className={isActive("/") ? "nav-active" : ""}
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              className={isActive("/menu") ? "nav-active" : ""}
              href="/menu"
              aria-current={isActive("/menu") ? "page" : undefined}
            >
              Menu
            </Link>
            <Link
              className={isActive("/story") ? "nav-active" : ""}
              href="/story"
              aria-current={isActive("/story") ? "page" : undefined}
            >
              Story
            </Link>
            <Link
              className={isActive("/contact") ? "nav-active" : ""}
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className={`icon-btn-primary burger burger-btn ${open ? "is-open" : ""}`}
            onClick={handleToggle}
            type="button"
          >
            <span className="burger-lines">
              <span />
            </span>
          </button>
        </header>
      </div>

      {/* Mobile Drawer - Full-screen overlay */}
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        {/* Drawer Content */}
        <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
          {/* Mobile Navigation Links */}
          <nav className="drawer-nav" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`drawer-nav-item ${open ? "is-visible" : ""} ${isActive("/") ? "nav-active" : ""}`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              HOME
            </Link>
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className={`drawer-nav-item ${open ? "is-visible" : ""} ${isActive("/menu") ? "nav-active" : ""}`}
              aria-current={isActive("/menu") ? "page" : undefined}
            >
              MENU
            </Link>
            <Link
              href="/story"
              onClick={() => setOpen(false)}
              className={`drawer-nav-item ${open ? "is-visible" : ""} ${isActive("/story") ? "nav-active" : ""}`}
              aria-current={isActive("/story") ? "page" : undefined}
            >
              STORY
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`drawer-nav-item ${open ? "is-visible" : ""} ${isActive("/contact") ? "nav-active" : ""}`}
              aria-current={isActive("/contact") ? "page" : undefined}
            >
              CONTACT
            </Link>
          </nav>

          {/* Drawer Footer */}
          <div className={`drawer-footer ${open ? "is-visible" : ""}`}>
            {/* Vibe Statement */}
            <p className="drawer-vibe-text">
              Low lights, good sound, better coffee.
            </p>

            {/* Social Links Header */}
            <p className="drawer-follow-text">Follow us!</p>

            {/* Social Icons */}
            <div className="drawer-social-icons">
              <a
                href={
                  spotifyUrl ||
                  "https://open.spotify.com/playlist/58qhSWWn3g1QeCKoVFoAJk"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify Playlist"
                className="drawer-social-icon"
              >
                <span className="icon-wrapper">
                  <SiSpotify size={20} />
                </span>
              </a>
              <a
                href={instagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="drawer-social-icon"
              >
                <span className="icon-wrapper icon-adjust">
                  <SiInstagram size={20} />
                </span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="drawer-social-icon"
              >
                <span className="icon-wrapper icon-adjust">
                  <SiFacebook size={20} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Decorative Coffee Beans */}
        <div className="drawer-floating-items" aria-hidden="true">
          <Image
            src="/notebook-coffeebean-up-right.svg"
            alt=""
            className="drawer-bean-1"
            width={160}
            height={160}
          />
          <Image
            src="/notebook-coffeebean-up-left.svg"
            alt=""
            className="drawer-bean-2"
            width={160}
            height={160}
          />
        </div>
      </aside>
    </div>
  );
}

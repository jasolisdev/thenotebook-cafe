"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { SiSpotify, SiInstagram, SiFacebook } from "react-icons/si";
import AnnouncementBanner from "./AnnouncementBanner";

// Suppress hydration warnings for client-only components
const isBrowser = typeof window !== 'undefined';

type Breakpoint = "sm" | "md" | "lg" | "xl";

type Props = {
  instagramUrl?: string;
  spotifyUrl?: string;
  burgerUntil?: Breakpoint;
  announcementText?: string;
};

const BP_PX: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function SiteHeader({ instagramUrl, spotifyUrl, burgerUntil = "lg", announcementText }: Props) {
  const [open, setOpen] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0); // Changed from boolean to offset value
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount
  const headerRef = useRef<HTMLDivElement>(null); // Direct DOM reference
  const lastScrollY = useRef(0);
  const currentOffset = useRef(0); // Track offset in ref for immediate updates
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔴 BURGER CLICKED! Current state:', open);
    const newState = !open;
    setOpen(newState);
    console.log('🔴 Setting state to:', newState);
  };

  useEffect(() => {
    console.log('✅ Drawer state updated to:', open);
    console.log('✅ Drawer element:', document.querySelector('.drawer'));
    console.log('✅ Drawer has "open" class:', document.querySelector('.drawer.open'));
  }, [open]);

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close drawer when navigating to a new page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    if (!isBrowser) return;

    console.log('🎬 SiteHeader scroll effect mounting...');

    // Initialize scroll position immediately
    const initialScrollY = window.scrollY;
    lastScrollY.current = initialScrollY;
    currentOffset.current = 0;
    setIsAtTop(initialScrollY < 10);

    const MAX_OFFSET = 120; // Maximum pixels to hide (navbar height + announcement banner)

    const handleScroll = () => {
      if (!headerRef.current) return;

      const currentScrollY = window.scrollY;
      console.log('📜 Scroll event fired! Y:', currentScrollY, 'Last:', lastScrollY.current);

      setIsAtTop(currentScrollY < 10);

      // At top of page, always show header
      if (currentScrollY < 10) {
        currentOffset.current = 0;
        headerRef.current.style.transform = 'translateY(0px)';
        lastScrollY.current = currentScrollY;
        console.log('🏠 At top, reset to 0');
        return;
      }

      // Calculate scroll delta
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Update offset based on scroll direction
      let newOffset = currentOffset.current + scrollDelta;
      // Clamp between 0 (fully visible) and MAX_OFFSET (fully hidden)
      const clampedOffset = Math.max(0, Math.min(newOffset, MAX_OFFSET));

      console.log('🎯 Updating offset:', currentOffset.current, '→', clampedOffset, 'delta:', scrollDelta);

      currentOffset.current = clampedOffset;
      headerRef.current.style.transform = `translateY(-${clampedOffset}px)`;

      lastScrollY.current = currentScrollY;
    };

    console.log('✅ Attaching scroll listener...');
    window.addEventListener('scroll', handleScroll, { passive: true });
    console.log('✅ Scroll listener attached!');

    return () => {
      console.log('🛑 SiteHeader scroll effect unmounting...');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array - only set up once

  const isActive = (href: string) => pathname === href;
  const bpPx = useMemo(() => BP_PX[burgerUntil], [burgerUntil]);

  return (
    <div suppressHydrationWarning>
      <AnnouncementBanner text={announcementText} />
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

      {/* Header container wraps nav bar only */}
      <div
        ref={headerRef}
        className="header-container"
      >
        <div className={`header-dark ${isAtTop ? "header-transparent" : ""} ${open ? "header-open" : ""}`}>
          <Link href="/" className="brand-dark brand-inline" aria-label="Home">
            <Image
              src="/notebook-cafe-navbar-dark.png"
              alt="The Notebook Café"
              width={160}
              height={55}
              priority
              className="brand-logo"
            />
            <span className="sr-only">The Notebook Café</span>
          </Link>

          <nav className="nav-dark nav-desktop-show" aria-label="Primary">
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
              className={isActive("/events") ? "nav-active" : ""}
              href="/events"
              aria-current={isActive("/events") ? "page" : undefined}
            >
              Events
            </Link>
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className={`icon-btn--dark burger burger-btn ${open ? "is-open" : ""}`}
            onClick={handleToggle}
            type="button"
          >
            <span className="burger-lines">
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Drawer - outside header container, below announcement banner */}
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <nav className="drawer-nav" aria-label="Mobile">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/") ? 'nav-active' : ''}`}
              >
                HOME
              </Link>
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/menu") ? 'nav-active' : ''}`}
              >
                MENU
              </Link>
              <Link
                href="/story"
                onClick={() => setOpen(false)}
                className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/story") ? 'nav-active' : ''}`}
              >
                STORY
              </Link>
              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/events") ? 'nav-active' : ''}`}
              >
                EVENTS
              </Link>
            </nav>

            <div className={`drawer-footer ${open ? 'is-visible' : ''}`}>
              {/* Vibe Statement */}
              <p className="drawer-vibe-text">Low lights, good sound, better coffee.</p>

              {/* Follow Us */}
              <p className="drawer-follow-text">Follow us!</p>

              {/* Social Icons */}
              <div className="drawer-social-icons">
                <a
                  href={spotifyUrl || "https://open.spotify.com/playlist/58qhSWWn3g1QeCKoVFoAJk"}
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

          {/* Floating Coffee Beans in Drawer */}
          <div className="drawer-floating-items">
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

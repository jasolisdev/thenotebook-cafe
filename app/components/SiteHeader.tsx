"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl";

type Props = {
  instagramUrl?: string;
  burgerUntil?: Breakpoint;
};

const BP_PX: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function SiteHeader({ instagramUrl, burgerUntil = "md" }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleToggle = () => {
    console.log('Toggle clicked, current open state:', open);
    setOpen(!open);
  };

  useEffect(() => {
    console.log('Drawer open state changed to:', open);
  }, [open]);

  useEffect(() => {
    if (open) setOpen(false);
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

  const isActive = (href: string) => pathname === href;
  const bpPx = useMemo(() => BP_PX[burgerUntil], [burgerUntil]);

  return (
    <>
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

      <div className="header-dark">
        <Link href="/" className="brand-dark" aria-label="Home">
          <Image
            src="/logo.png"
            alt="The Notebook Café"
            width={28}
            height={28}
            className="rounded-full shadow-sm"
            priority
          />
          <span>THE NOTEBOOK CAFÉ</span>
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
            className={isActive("/about") ? "nav-active" : ""}
            href="/about"
            aria-current={isActive("/about") ? "page" : undefined}
          >
            About
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

      <div
        className={`drawer-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <nav className="drawer-nav" aria-label="Mobile">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/") ? 'nav-active' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            HOME
          </Link>
          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/menu") ? 'nav-active' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            MENU
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/about") ? 'nav-active' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            ABOUT
          </Link>
        </nav>

        <div className={`drawer-footer ${open ? 'is-visible' : ''}`}>
          {/* Vibe Statement */}
          <p className="drawer-vibe-text">Low lights, good sound, better coffee.</p>

          {/* Social Icons */}
          <div className="drawer-social-icons">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="drawer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
            <a
              href={instagramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="drawer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="drawer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Stay in the Loop */}
          <p className="drawer-stay-in-loop">Stay in the Loop</p>

          {/* Location and Opening */}
          <p className="drawer-location-text">
            University Ave & Orange St. | Opening Early 2026
          </p>
        </div>
      </aside>
    </>
  );
}

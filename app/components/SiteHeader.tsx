"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiSpotify, SiInstagram, SiFacebook } from "react-icons/si";
import { useScrollDirection } from "../hooks/useScrollDirection";

type Breakpoint = "sm" | "md" | "lg" | "xl";

type Props = {
  instagramUrl?: string;
  spotifyUrl?: string;
  burgerUntil?: Breakpoint;
};

const BP_PX: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function SiteHeader({ instagramUrl, spotifyUrl, burgerUntil = "md" }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Use custom scroll direction hook
  const scrollDirection = useScrollDirection({ threshold: 10 });

  // Header is hidden when scrolling down, visible when scrolling up or at top
  const isHeaderHidden = scrollDirection === 'down';

  // Debug logging
  useEffect(() => {
    console.log('[SiteHeader] Scroll direction:', scrollDirection, '| Header hidden:', isHeaderHidden);
  }, [scrollDirection, isHeaderHidden]);

  const handleToggle = () => {
    setOpen(!open);
  };

  // Close drawer when route changes
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when drawer is open
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

      {/* Backdrop outside container for proper layering */}
      <div
        className={`drawer-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Header container wraps nav and drawer for proper z-index stacking */}
      <div className={`header-container ${isHeaderHidden ? 'header-hidden' : ''}`} data-hidden={isHeaderHidden}>
        <div className="header-dark">
        <Link href="/" className="brand-dark" aria-label="Home">
          <Image
            src="/logo.png"
            alt="The Notebook Café"
            width={44}
            height={44}
            className="rounded-full shadow-sm brand-logo"
            priority
          />
          <span className="brand-text">THE NOTEBOOK CAFÉ</span>
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
            href="/about"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/about") ? 'nav-active' : ''}`}
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
              href="https://open.spotify.com/playlist/58qhSWWn3g1QeCKoVFoAJk"
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
              href="https://instagram.com/thenotebookcafellc"
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
              href="https://www.facebook.com/profile.php?id=61571875252956"
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

        {/* Floating Coffee Beans in Drawer */}
        <div className="drawer-floating-items">
          <img
            src="/notebook-coffeebean-up-right.svg"
            alt=""
            className="drawer-bean-1"
          />
          <img
            src="/notebook-coffeebean-up-left.svg"
            alt=""
            className="drawer-bean-2"
          />
        </div>
      </aside>
      </div>
    </>
  );
}

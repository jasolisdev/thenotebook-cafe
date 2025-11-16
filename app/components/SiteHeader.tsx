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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header at top of page
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      <div className={`header-container ${headerVisible ? '' : 'header-hidden'}`}>
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

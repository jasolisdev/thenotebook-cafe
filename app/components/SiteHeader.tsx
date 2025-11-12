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
          <span>The Notebook Café</span>
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
        <button
          aria-label="Close menu"
          className="drawer-close"
          onClick={() => setOpen(false)}
          type="button"
        >
          <span className="drawer-x" />
        </button>

        <nav className="drawer-nav" aria-label="Mobile">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/") ? 'nav-active' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={`drawer-nav-item ${open ? 'is-visible' : ''} ${isActive("/about") ? 'nav-active' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            About
          </Link>
        </nav>

        <div className={`drawer-footer ${open ? 'is-visible' : ''}`}>
          <div className="text-xs uppercase tracking-widest opacity-50">
            The Notebook Café
          </div>
          <div className="text-xs opacity-30 mt-1">
            Opening Fall 2025
          </div>
        </div>
      </aside>
    </>
  );
}

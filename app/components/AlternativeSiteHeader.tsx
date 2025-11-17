"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollDirection } from "../hooks/useScrollDirection";

type Props = {
  instagramUrl?: string;
  spotifyUrl?: string;
};

/**
 * Alternative simplified header for testing scroll-based hide/show behavior.
 * This is a minimal prototype to test the scroll effect across all screen sizes.
 */
export default function AlternativeSiteHeader({ instagramUrl, spotifyUrl }: Props) {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection({ threshold: 10 });

  // Hide header when scrolling down, show when scrolling up or at top
  const isHeaderHidden = scrollDirection === 'down';

  // Debug logging
  console.log('[AlternativeSiteHeader] Direction:', scrollDirection, '| Hidden:', isHeaderHidden);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="alt-header"
      data-scroll-direction={scrollDirection}
      style={{
        transform: isHeaderHidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="alt-header-inner">
        {/* Brand */}
        <Link href="/" className="alt-brand">
          THE NOTEBOOK CAFÉ
        </Link>

        {/* Navigation */}
        <nav className="alt-nav">
          <Link
            href="/"
            className={`alt-nav-link ${isActive("/") ? "alt-nav-active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`alt-nav-link ${isActive("/menu") ? "alt-nav-active" : ""}`}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className={`alt-nav-link ${isActive("/about") ? "alt-nav-active" : ""}`}
          >
            About
          </Link>
        </nav>

        {/* Debug info */}
        <div className="alt-debug">
          Scroll: {scrollDirection}
        </div>
      </div>

      <style jsx>{`
        .alt-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: linear-gradient(135deg, rgba(15, 12, 10, 0.95) 0%, rgba(22, 17, 13, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(201, 154, 88, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .alt-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 4vw, 40px);
          gap: 20px;
        }

        .alt-brand {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 0.05em;
          color: var(--ink-cream);
          transition: opacity 0.2s ease;
        }

        .alt-brand:hover {
          opacity: 0.8;
        }

        .alt-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .alt-nav-link {
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 1px;
          color: rgba(244, 240, 233, 0.7);
          transition: color 0.2s ease;
          position: relative;
        }

        .alt-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(201, 154, 88, 1);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .alt-nav-link:hover,
        .alt-nav-link.alt-nav-active {
          color: rgba(244, 240, 233, 1);
        }

        .alt-nav-link:hover::after {
          transform: scaleX(1);
        }

        .alt-debug {
          font-family: monospace;
          font-size: 12px;
          color: rgba(201, 154, 88, 0.6);
          padding: 4px 8px;
          background: rgba(201, 154, 88, 0.1);
          border-radius: 4px;
        }

        /* Responsive: hide debug on mobile */
        @media (max-width: 640px) {
          .alt-debug {
            display: none;
          }

          .alt-nav {
            gap: 16px;
          }

          .alt-nav-link {
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  );
}

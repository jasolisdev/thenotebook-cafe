"use client";

import Link from "next/link";
import { Mail, Phone, Instagram } from "lucide-react";

/**
 * SiteFooter Component
 *
 * Minimal, centered footer for mobile-first design.
 *
 * @component
 * @example
 * ```tsx
 * import SiteFooter from '@/app/components/layout/SiteFooter';
 *
 * <SiteFooter />
 * ```
 *
 * @returns {React.JSX.Element} Rendered footer
 */
export default function SiteFooter(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      <div className="simple-footer__container">
        {/* Brand Title */}
        <h2 className="simple-footer__title">THE NOTEBOOK CAFÉ</h2>

        {/* Icon Row */}
        <div className="simple-footer__icons">
          <a
            href="mailto:hello@thenotebookcafe.com"
            aria-label="Email"
            className="simple-footer__icon-button"
          >
            <Mail size={24} strokeWidth={2} />
          </a>
          <a
            href="tel:+19512344567"
            aria-label="Phone"
            className="simple-footer__icon-button"
          >
            <Phone size={24} strokeWidth={2} />
          </a>
          <a
            href="https://www.instagram.com/thenotebookcafellc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="simple-footer__icon-button"
          >
            <Instagram size={24} strokeWidth={2} />
          </a>
        </div>

        {/* Footer Links */}
        <nav className="simple-footer__nav">
          <Link href="/terms" className="simple-footer__link">
            TERMS
          </Link>
          <span className="simple-footer__separator">|</span>
          <Link href="/privacy" className="simple-footer__link">
            POLICY
          </Link>
          <span className="simple-footer__separator">|</span>
          <Link href="/refunds" className="simple-footer__link">
            REFUNDS
          </Link>
        </nav>

        {/* Copyright */}
        <p className="simple-footer__copyright">
          &copy; {year} HANDCRAFTED WITH CARE
        </p>
      </div>
    </footer>
  );
}

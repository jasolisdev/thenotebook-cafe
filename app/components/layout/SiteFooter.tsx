"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

type SiteFooterProps = {
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{
    variant: "welcome" | "footer" | "hero" | "cards";
  }>;
  vibeCopy?: string;
};

export default function SiteFooter({
  showFloatingItems = false,
  FloatingItemsComponent,
}: SiteFooterProps): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {showFloatingItems && FloatingItemsComponent && (
        <FloatingItemsComponent variant="footer" />
      )}

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand & Contact */}
          <div className="footer-brand">
            <h4 className="footer-brand-name">THE NOTEBOOK CAFÉ</h4>
            <div className="footer-contact">
              <p>📍 3512 9th St, Riverside, CA 92501</p>
              <p>📞 (951) 823-0004</p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">NAVIGATION</h5>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/story">Story</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Information Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">INFORMATION</h5>
            <ul className="footer-links">
              <li><Link href="/hours">Hours</Link></li>
              <li><Link href="/contact">Location</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">POLICIES</h5>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">SOCIAL MEDIA</h5>
            <div className="footer-social-icons">
              <a
                href="https://instagram.com/notebookcafe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@notebookcafe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="footer-social-link"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          © {year} The Notebook Café LLC — Riverside, CA
        </div>
      </div>
    </footer>
  );
}

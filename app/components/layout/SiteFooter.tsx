"use client";

import Link from "next/link";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaTiktok } from "react-icons/fa";
import NewsletterForm from "../features/NewsLetterForm";
import { useCallback } from "react";

/**
 * SiteFooter Component
 *
 * Global footer with business information, newsletter, and navigation.
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
  const openConsent = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tnc-open-consent"));
    }
  }, []);

  return (
    <footer className="relative overflow-hidden pt-20 pb-10" style={{ backgroundColor: 'var(--cafe-charcoal)', borderTop: '1px solid var(--coffee-800)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--coffee-50)' }}>The Notebook Café</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--coffee-100)', opacity: 0.7 }}>
              Crafting moments of clarity and connection through exceptional coffee.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: 'var(--coffee-50)' }}>Explore</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--coffee-100)', opacity: 0.7 }}>
              <li><Link href="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link href="/menu" className="hover:opacity-100 transition-opacity">Menu</Link></li>
              <li><Link href="/story" className="hover:opacity-100 transition-opacity">Our Story</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link href="/careers" className="hover:opacity-100 transition-opacity">Careers</Link></li>
            </ul>
          </div>

          {/* Visit Us Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: 'var(--coffee-50)' }}>Visit Us</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--coffee-100)', opacity: 0.7 }}>
              <li>3512 9th St</li>
              <li>Riverside, CA 92501</li>
              <li className="pt-2">Mon-Sat: 7am - 6pm</li>
              <li>Sun: <span className="italic opacity-70">Closed</span></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: 'var(--coffee-50)' }}>Stay Connected</h4>
            <p className="text-xs mb-4" style={{ color: 'var(--coffee-100)', opacity: 0.7 }}>Join our newsletter for brewing tips and events.</p>

            {/* Newsletter Form - Inline */}
            <NewsletterForm source="footer" inline={true} />

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/thenotebookcafellc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-100 cursor-pointer transition-opacity"
                style={{ color: 'var(--coffee-100)', opacity: 0.7 }}
              >
                <PiInstagramLogoFill className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@thenotebookcafe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:opacity-100 cursor-pointer transition-opacity"
                style={{ color: 'var(--coffee-100)', opacity: 0.7 }}
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-3 md:gap-6" style={{ borderTop: '1px solid rgba(var(--coffee-100-rgb), 0.1)', color: 'var(--coffee-100)', opacity: 0.4 }}>
          <div className="text-center md:text-left">
            <p>&copy; {year} The Notebook Café. All rights reserved.</p>
            <p className="mt-1 md:mt-0">Made with ♥ in Riverside.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={openConsent}
              className="hover:opacity-100 transition-opacity"
            >
              Cookies
            </button>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link href="/refunds" className="hover:opacity-100 transition-opacity">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

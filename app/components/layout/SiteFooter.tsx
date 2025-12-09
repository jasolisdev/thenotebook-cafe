"use client";

import Link from "next/link";
import { PiInstagramLogoFill, PiTwitterLogoFill } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
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
    <footer className="bg-cafe-charcoal text-cafe-mist pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-white mb-6">The Notebook Café</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Crafting moments of clarity and connection through exceptional coffee.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-cafe-terracotta font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Visit Us Column */}
          <div>
            <h4 className="text-cafe-terracotta font-serif text-lg mb-6">Visit Us</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>3512 9th St</li>
              <li>Riverside, CA 92501</li>
              <li className="pt-2">Mon-Sat: 7am - 6pm</li>
              <li>Sun: <span className="italic opacity-70">Closed</span></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-cafe-terracotta font-serif text-lg mb-6">Stay Connected</h4>
            <p className="text-xs mb-4 opacity-70">Join our newsletter for brewing tips and events.</p>

            {/* Newsletter Form - Inline */}
            <NewsletterForm source="footer" inline={true} />

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/thenotebookcafellc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white cursor-pointer transition-colors"
              >
                <PiInstagramLogoFill className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white cursor-pointer transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-white cursor-pointer transition-colors"
              >
                <PiTwitterLogoFill className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 gap-3 md:gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={openConsent}
              className="hover:text-white transition-colors"
            >
              Cookies
            </button>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/refunds" className="hover:text-white transition-colors">Refunds</Link>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {year} The Notebook Café. All rights reserved.</p>
            <p className="mt-1 md:mt-0">Made with ♥ in Riverside.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

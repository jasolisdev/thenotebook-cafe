"use client";

import Link from "next/link";
import { Mail, Instagram } from "lucide-react";
import { FaYelp } from "react-icons/fa";

/**
 * SiteFooter Component
 *
 * Minimal horizontal footer with brand signature and social icons.
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
  const openConsentBanner = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tnc-open-consent"));
    }
  };

  return (
    <footer className="pb-12 pt-12 border-t border-white/10 bg-cafe-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Brand signature */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-sm font-medium uppercase text-white/90 bionic-skip" style={{ fontFamily: "var(--font-sans)", letterSpacing: "1.5px" }}>
            THE NOTEBOOK CAFÉ
          </span>
        </div>

        {/* Social Icons - No background circles, icons only */}
        <div className="flex items-center space-x-8">
          <a
            href="mailto:thenotebookcafellc@gmail.com"
            className="text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Email Us"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://yelp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Yelp"
          >
            <FaYelp size={20} />
          </a>
          <a
            href="https://tiktok.com/@thenotebookcafe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors duration-300"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.617a8.171 8.171 0 0 0 5.429 2.03V7.228a4.793 4.793 0 0 1-1.659-.542Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/thenotebookcafellc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>

      {/* Legal Links and Copyright */}
      <div className="mt-12 flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-6">
          <Link
            href="/terms"
            className="text-[9px] text-white/60 uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            TERMS
          </Link>
          <Link
            href="/privacy"
            className="text-[9px] text-white/60 uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            POLICY
          </Link>
          <Link
            href="/refunds"
            className="text-[9px] text-white/60 uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            REFUNDS
          </Link>
          <button
            type="button"
            onClick={openConsentBanner}
            className="text-[9px] text-white/60 uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            COOKIES
          </button>
        </div>
        <div className="text-[9px] text-white/40 uppercase tracking-[0.3em]">
          &copy; {year} Handcrafted with care
        </div>
      </div>
    </footer>
  );
}

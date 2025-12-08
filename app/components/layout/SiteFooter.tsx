"use client";

import Link from "next/link";
import { Instagram, Headphones, Mail } from "lucide-react";

/**
 * SiteFooter Component
 *
 * Global footer with business information and navigation.
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
    <footer className="pt-20 pb-10 bg-cafe-black text-cafe-mist">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-serif text-3xl" style={{ color: 'var(--cafe-cream)' }}>The Notebook Café</h3>
          <p className="font-light max-w-md" style={{ color: 'rgba(238, 230, 221, 0.88)' }}>
            A space for creatives, thinkers, and coffee lovers.
            Where house music meets premium espresso in the heart of Riverside.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://www.instagram.com/thenotebookcafellc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cafe-cream hover:text-cafe-tan transition-colors cursor-pointer"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Contact</h4>
          <div className="font-light leading-relaxed space-y-1" style={{ color: 'rgba(238, 230, 221, 0.9)' }}>
            <a href="tel:9518230004" className="hover:text-cafe-cream transition-colors mt-2 block" style={{ color: 'inherit' }}>(951) 823-0004</a>
            <a href="mailto:hello@notebook.cafe" className="hover:text-cafe-cream transition-colors" style={{ color: 'inherit' }}>hello@notebook.cafe</a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Location</h4>
          <address className="not-italic font-light leading-relaxed" style={{ color: 'rgba(238, 230, 221, 0.9)' }}>
            3512 9th St<br />
            Riverside, CA 92501<br />
          </address>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Hours</h4>
          <div className="font-light space-y-1" style={{ color: 'rgba(238, 230, 221, 0.9)' }}>
            <p><span className="w-12 inline-block">Mon–Sat</span> 7:00am — 6pm</p>
            <p><span className="w-12 inline-block">Sun</span> <span className="italic" style={{ color: 'rgba(238, 230, 221, 0.5)' }}>Closed</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Navigation</h4>
          <div className="flex flex-col gap-2 font-light" style={{ color: 'rgba(238, 230, 221, 0.88)' }}>
            <Link href="/" className="hover:text-cafe-cream transition-colors">Home</Link>
            <Link href="/menu" className="hover:text-cafe-cream transition-colors">Menu</Link>
            <Link href="/story" className="hover:text-cafe-cream transition-colors">Story</Link>
            <Link href="/events" className="hover:text-cafe-cream transition-colors">Events</Link>
            <Link href="/contact" className="hover:text-cafe-cream transition-colors">Contact</Link>
            <Link href="/careers" className="hover:text-cafe-cream transition-colors">Careers</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs" style={{ color: 'rgba(238, 230, 221, 0.65)' }}>
        <div className="flex flex-col items-center md:items-start gap-1">
          <p>&copy; {year} The Notebook Café. All rights reserved.</p>
          <p className="text-white/40">
            Made with{" "}
            <span style={{ color: 'var(--cafe-cream)', fontSize: '1.1em', lineHeight: 1 }}>♥</span>
            {" "}in Riverside.
          </p>
        </div>
        <div className="flex gap-6 items-center flex-wrap justify-center md:justify-end">
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.dispatchEvent(new Event("tnc-open-consent"))}
            className="hover:text-cafe-cream transition-colors"
            style={{ color: 'inherit' }}
          >
            Cookies
          </button>
          <Link href="/privacy" className="hover:text-cafe-cream transition-colors" style={{ color: 'inherit' }}>Privacy</Link>
          <Link href="/terms" className="hover:text-cafe-cream transition-colors" style={{ color: 'inherit' }}>Terms</Link>
          <Link href="/accessibility" className="hover:text-cafe-cream transition-colors" style={{ color: 'inherit' }}>Accessibility</Link>
          <Link href="/refunds" className="hover:text-cafe-cream transition-colors" style={{ color: 'inherit' }}>Refunds</Link>
        </div>
      </div>
    </footer>
  );
}

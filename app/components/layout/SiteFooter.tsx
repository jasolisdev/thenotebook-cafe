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
          <h3 className="font-serif text-3xl text-cafe-mist">The Notebook Café</h3>
          <p className="font-light max-w-md text-cafe-beige/70">
            A space for creatives, thinkers, and coffee lovers.
            Where house music meets premium espresso in the heart of Riverside.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://www.instagram.com/thenotebookcafellc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cafe-mist hover:text-cafe-tan transition-colors cursor-pointer"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Contact</h4>
          <div className="font-light leading-relaxed text-cafe-beige/70 space-y-1">
            <a href="tel:9518230004" className="text-cafe-beige/70 hover:text-white transition-colors mt-2 block">(951) 823-0004</a>
            <a href="mailto:hello@notebook.cafe" className="text-cafe-beige/70 hover:text-white transition-colors">hello@notebook.cafe</a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Location</h4>
          <address className="not-italic font-light leading-relaxed text-cafe-beige/70">
            3512 9th St<br />
            Riverside, CA 92501<br />
          </address>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Hours</h4>
          <div className="font-light space-y-1 text-cafe-beige/70">
            <p><span className="w-12 inline-block">M-Th</span> 6:30am — 4pm</p>
            <p><span className="w-12 inline-block">F-Sa</span> 6:30am — 6pm</p>
            <p><span className="w-12 inline-block">Sun</span> <span className="italic text-cafe-beige/50">Closed</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Navigation</h4>
          <div className="flex flex-col gap-2 font-light text-cafe-beige/70">
            <Link href="/" className="text-cafe-beige/70 hover:text-white transition-colors">Home</Link>
            <Link href="/menu" className="text-cafe-beige/70 hover:text-white transition-colors">Menu</Link>
            <Link href="/story" className="text-cafe-beige/70 hover:text-white transition-colors">Story</Link>
            <Link href="/events" className="text-cafe-beige/70 hover:text-white transition-colors">Events</Link>
            <Link href="/contact" className="text-cafe-beige/70 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>&copy; {year} The Notebook Café. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-white/30 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-white/30 hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

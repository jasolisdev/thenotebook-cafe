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
    <footer className="pt-20 pb-10" style={{ backgroundColor: '#2C2420', color: '#F4F1EA' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-serif text-3xl" style={{ color: '#F4F1EA' }}>The Notebook Café</h3>
          <p className="font-light max-w-md" style={{ color: 'rgba(203, 185, 164, 0.7)' }}>
            A space for creatives, thinkers, and coffee lovers.
            Where house music meets premium espresso in the heart of Riverside.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://www.instagram.com/thenotebookcafellc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="cursor-pointer transition-colors"
              style={{ color: '#F4F1EA' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#A48D78'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#F4F1EA'}
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://open.spotify.com/user/notebookcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="cursor-pointer transition-colors"
              style={{ color: '#F4F1EA' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#A48D78'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#F4F1EA'}
            >
              <Headphones size={24} />
            </a>
            <a
              href="mailto:hello@thenotebookcafe.com"
              aria-label="Email"
              className="cursor-pointer transition-colors"
              style={{ color: '#F4F1EA' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#A48D78'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#F4F1EA'}
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em]" style={{ color: '#A48D78' }}>Location</h4>
          <address className="not-italic font-light leading-relaxed" style={{ color: 'rgba(203, 185, 164, 0.7)' }}>
            3512 9th St<br />
            Riverside, CA 92501<br />
            <a href="tel:9518230004" className="transition-colors mt-2 block" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>(951) 823-0004</a>
          </address>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em]" style={{ color: '#A48D78' }}>Hours</h4>
          <div className="font-light space-y-1" style={{ color: 'rgba(203, 185, 164, 0.7)' }}>
            <p><span className="w-12 inline-block">M-Th</span> 6:30am — 4pm</p>
            <p><span className="w-12 inline-block">F-Sa</span> 6:30am — 6pm</p>
            <p><span className="w-12 inline-block">Sun</span> <span className="italic" style={{ color: 'rgba(203, 185, 164, 0.5)' }}>Closed</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase text-xs tracking-[0.2em]" style={{ color: '#A48D78' }}>Navigation</h4>
          <div className="flex flex-col gap-2 font-light" style={{ color: 'rgba(203, 185, 164, 0.7)' }}>
            <Link href="/" className="transition-colors" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>Home</Link>
            <Link href="/menu" className="transition-colors" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>Menu</Link>
            <Link href="/story" className="transition-colors" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>Story</Link>
            <Link href="/events" className="transition-colors" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>Events</Link>
            <Link href="/contact" className="transition-colors" style={{ color: 'rgba(203, 185, 164, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 185, 164, 0.7)'}>Contact</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.3)' }}>
        <p>&copy; {year} The Notebook Café. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)'}>Privacy</Link>
          <Link href="/terms" className="transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)'}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}

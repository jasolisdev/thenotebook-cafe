import Link from "next/link";
import React from "react";

/**
 * Props for the SiteFooter component
 */
type SiteFooterProps = {
  /**
   * Whether to show decorative floating items (coffee beans, plants, etc.)
   * @default false
   */
  showFloatingItems?: boolean;

  /**
   * React component to render floating decorative elements
   * Receives a 'variant' prop to determine which decorations to show
   */
  FloatingItemsComponent?: React.ComponentType<{
    variant: "welcome" | "footer" | "hero" | "cards";
  }>;

  /**
   * Vibe quote text from Sanity CMS
   * Falls back to default text if not provided
   */
  vibeCopy?: string;
};

/**
 * SiteFooter Component
 *
 * Global footer displayed across all pages of the website.
 * Contains business information, navigation links, and copyright notice.
 *
 * @component
 * @example
 * ```tsx
 * // Basic footer
 * <SiteFooter />
 *
 * // Footer with floating decorations (homepage)
 * import HomeFloatingItems from '@/app/components/decorative/HomeFloatingItems';
 * <SiteFooter showFloatingItems={true} FloatingItemsComponent={HomeFloatingItems} />
 * ```
 *
 * @param {SiteFooterProps} props - Component props
 * @returns {React.JSX.Element} Rendered footer
 */
export default function SiteFooter({
  showFloatingItems = false,
  FloatingItemsComponent,
  vibeCopy,
}: SiteFooterProps): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="home-footer text-center text-[13px] leading-6 py-12 px-5 relative">
      {/* Floating decorative items (optional) */}
      {showFloatingItems && FloatingItemsComponent && (
        <FloatingItemsComponent variant="footer" />
      )}

      <div className="max-w-[700px] mx-auto relative z-10">
        {/* Business Name */}
        <div className="text-[11px] uppercase tracking-widest mb-4 opacity-60">
          The Notebook Café
        </div>

        {/* Address and Phone */}
        <div className="text-[13px] sm:text-[14px] leading-relaxed text-light-muted mb-6">
          <div>3512 9TH ST, RIVERSIDE CA 92501</div>
          <div className="mt-1">(951) 823-0004</div>
        </div>

        {/* Footer Navigation */}
        <nav className="footer-nav mb-4" aria-label="Footer navigation">
          <Link href="/" className="footer-nav-link">
            Home
          </Link>
          <span className="footer-nav-separator" aria-hidden="true">
            •
          </span>
          <Link href="/menu" className="footer-nav-link">
            Menu
          </Link>
          <span className="footer-nav-separator" aria-hidden="true">
            •
          </span>
          <Link href="/story" className="footer-nav-link">
            Story
          </Link>
          <span className="footer-nav-separator" aria-hidden="true">
            •
          </span>
          <Link href="/contact" className="footer-nav-link">
            Contact Us
          </Link>
        </nav>

        {/* Vibe Quote */}
        <p className="footer-vibe-quote mb-6">
          {vibeCopy || "Low lights, good sound, better coffee."}
        </p>

        {/* Copyright Notice */}
        <div className="text-light-muted">
          © {year} The Notebook Café LLC — Riverside, CA
        </div>
      </div>
    </footer>
  );
}

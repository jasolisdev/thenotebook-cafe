import Link from "next/link";

type FooterProps = {
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{ variant: "welcome" | "footer" | "hero" | "cards" }>;
};

export default function SiteFooter({
  showFloatingItems = false,
  FloatingItemsComponent,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="home-footer text-center text-[13px] leading-6 py-12 px-5 relative">
      {showFloatingItems && FloatingItemsComponent && (
        <FloatingItemsComponent variant="footer" />
      )}
      <div className="max-w-[700px] mx-auto relative z-10">
        <div className="text-[11px] uppercase tracking-widest mb-4 opacity-60">
          The Notebook Café
        </div>

        {/* Address and Phone */}
        <div className="text-[13px] sm:text-[14px] leading-relaxed ink-cream-dim mb-6">
          <div>3512 9TH ST, RIVERSIDE CA 92501</div>
          <div className="mt-1">(951) 823-0004</div>
        </div>

        {/* Footer Navigation */}
        <nav className="footer-nav mb-4">
          <Link href="/" className="footer-nav-link">
            Home
          </Link>
          <span className="footer-nav-separator">•</span>
          <Link href="/menu" className="footer-nav-link">
            Menu
          </Link>
          <span className="footer-nav-separator">•</span>
          <Link href="/story" className="footer-nav-link">
            Story
          </Link>
        </nav>



        {/* Vibe Copy */}
        {home?.vibeCopy && (
          <div className="welcome-vibe-section mt-40 sm:mt-24 lg:mt-28 pb-0">
            <div className="welcome-quote-mark">&quot;</div>
            <p className="welcome-vibe-text scroll-reveal">
              {home.vibeCopy}
            </p>
            <div className="welcome-quote-mark welcome-quote-mark-end">&quot;</div>
          </div>
        )}

        <div className="ink-cream-dim">
          © {year} The Notebook Café LLC — Riverside, CA
        </div>
      </div>
    </footer>
  );
}

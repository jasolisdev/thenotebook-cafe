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

        {/* About Summary */}
        <p className="text-[13px] sm:text-[14px] leading-relaxed ink-cream-dim mb-6 max-w-[600px] mx-auto">
          The Notebook Café is a house-music–inspired coffee space in Riverside, blending warm lighting, soulful rhythms, and craft espresso into a place designed for creatives and locals to slow down, meet up, and feel inspired.
        </p>

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
          <Link href="/about" className="footer-nav-link">
            About
          </Link>
        </nav>

        <div className="ink-cream-dim">
          © {year} The Notebook Café LLC — Riverside, CA
        </div>
      </div>
    </footer>
  );
}

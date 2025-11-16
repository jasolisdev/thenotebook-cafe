import Link from "next/link";

type FooterProps = {
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{ variant: string }>;
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
      <div className="max-w-[600px] mx-auto relative z-10">
        <div className="text-[11px] uppercase tracking-widest mb-3 opacity-60">
          The Notebook Café
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

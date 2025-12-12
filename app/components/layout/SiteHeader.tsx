"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const badgeColors = {
  tan: '#A48D78',
  white: '#FAF9F6',
};

type SiteHeaderProps = {
  instagramUrl?: string;
  spotifyUrl?: string;
  cartCount?: number;
  onCartClick?: () => void;
};

export default function SiteHeader({
  instagramUrl,
  spotifyUrl,
  cartCount = 0,
  onCartClick,
}: SiteHeaderProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartBadge, setCartBadge] = useState<number>(cartCount ?? 0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showSolidBg, setShowSolidBg] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [forceHighContrast, setForceHighContrast] = useState<boolean>(false);
  const pathname = usePathname();
  const forceSolidRoutes = ["/terms", "/privacy", "/refunds"];
  const forceSolidBg = forceSolidRoutes.some((route) => pathname?.startsWith(route));
  const drawerWasOpen = useRef(false);
  const lastScrollY = useRef(0);
  const forceSolidRef = useRef(forceSolidBg);

  const isActive = (path: string): boolean => pathname === path;
  const navLinkBase =
    "nav-link text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-tan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cafe-mist";
  const solidBg = showSolidBg || forceSolidBg || isOpen || forceHighContrast;
  const activeLinkClass = solidBg ? "font-semibold text-cafe-black" : "font-semibold text-cafe-cream";
  const inactiveLinkClass = solidBg
    ? "text-cafe-brown hover:text-cafe-black hover:-translate-y-0.5"
    : "text-cafe-cream/80 hover:text-cafe-cream hover:-translate-y-0.5";
  const logoSrc = solidBg ? "/tnc-navbar-logo.png" : "/tnc-navbar-logo-light.png";

  // Hide on scroll down, show on scroll up, transparent at top
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const atTop = currentScrollY < 10;
          const scrollingDown = currentScrollY > lastScrollY.current;
          const scrollingUp = currentScrollY < lastScrollY.current;

          setIsAtTop(atTop);

          // Show/hide navbar based on scroll direction
          if (scrollingDown) {
            // Keep nav transparent while it is on its way out
            setShowSolidBg(forceSolidRef.current);

            if (currentScrollY > 100) {
              setIsVisible(false);
            }
          } else if (scrollingUp) {
            // Scrolling up - show navbar with solid background
            setIsVisible(true);
            setShowSolidBg(forceSolidRef.current || !atTop);
          } else if (atTop) {
            // At the very top - show transparent
            setIsVisible(true);
            setShowSolidBg(forceSolidRef.current ? true : false);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // deps intentionally empty; forceSolidBg read via ref

  // Track drawer state
  useEffect(() => {
    drawerWasOpen.current = isOpen;
  }, [isOpen]);

  // Close drawer on route change and scroll to top if drawer was open
  useEffect(() => {
    if (drawerWasOpen.current) {
      // Drawer was open during navigation, ensure proper scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Sync cart count from global events when not passed explicitly
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCartBadge(cartCount ?? 0);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [cartCount]);

  // Respect accessibility hide-images toggle for nav contrast/logo
  useEffect(() => {
    const updateContrast = () => {
      if (typeof document === "undefined") return;
      const isHideImages = document.documentElement.classList.contains("acc-hide-images");
      setForceHighContrast(isHideImages);
      forceSolidRef.current = forceSolidBg || isHideImages;
      setShowSolidBg((prev) => (isHideImages ? true : prev));
    };

    updateContrast();
    const observer = new MutationObserver(updateContrast);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [forceSolidBg]);

  // Keep forceSolidBg available inside scroll handler without changing deps length
  useEffect(() => {
    forceSolidRef.current = forceSolidBg;
  }, [forceSolidBg]);

  useEffect(() => {
    const handleCartCount = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === "number") {
        setCartBadge(detail);
      } else {
        const bodyCount = Number(document.body.dataset.cartCount || 0);
        setCartBadge(bodyCount);
      }
    };
    window.addEventListener("cart-count-change", handleCartCount as EventListener);
    return () => window.removeEventListener("cart-count-change", handleCartCount as EventListener);
  }, []);

  const handleCartClick = () => {
    // Close mobile nav if open before toggling cart
    if (isOpen) setIsOpen(false);
    if (onCartClick) {
      onCartClick();
      return;
    }
    // Dispatch event to open cart drawer (now available on all pages)
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <>
      {/* <AnnouncementBanner text={announcementText} /> */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${isOpen ? '' : (solidBg ? 'backdrop-blur-xl' : 'backdrop-blur-none')} border-b transition-all duration-300 ease-in-out ${
          isOpen
            ? 'bg-cafe-mist border-cafe-tan/10'
            : solidBg
            ? 'bg-cafe-mist/85 border-cafe-tan/10'
            : 'bg-transparent border-transparent'
        }`}
        data-at-top={isAtTop}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="flex items-center cursor-pointer group gap-2.5"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Image
                src={logoSrc}
                alt="The Notebook Café Logo"
                width={65}
                height={65}
                className="w-[56px] h-[56px] sm:w-[65px] sm:h-[65px]"
                priority
              />
              <div className="flex flex-col">
                <span
                  className="font-serif text-2xl sm:text-3xl leading-none tracking-tight"
                  style={{ color: solidBg ? 'var(--cafe-black)' : 'var(--cafe-cream)' }}
                >
                  The Notebook
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.22em] leading-none"
                  style={{
                    color: solidBg
                      ? 'var(--cafe-tan)'
                      : 'var(--cafe-terracotta)'
                  }}
                >
                  Café
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-7">
              <Link
                href="/"
                className={`${navLinkBase} ${isActive("/") ? activeLinkClass : inactiveLinkClass}`}
              >
                Home
                {isActive("/") && (
                  <span
                    className="nav-underline"
                    style={!solidBg ? { background: 'linear-gradient(90deg, transparent, var(--cafe-cream), transparent)' } : undefined}
                  />
                )}
              </Link>
              <Link
                href="/menu"
                className={`${navLinkBase} ${isActive("/menu") ? activeLinkClass : inactiveLinkClass}`}
              >
                Menu
                {isActive("/menu") && (
                  <span
                    className="nav-underline"
                    style={!solidBg ? { background: 'linear-gradient(90deg, transparent, var(--cafe-cream), transparent)' } : undefined}
                  />
                )}
              </Link>
              <Link
                href="/story"
                className={`${navLinkBase} ${isActive("/story") ? activeLinkClass : inactiveLinkClass}`}
              >
                Story
                {isActive("/story") && (
                  <span
                    className="nav-underline"
                    style={!solidBg ? { background: 'linear-gradient(90deg, transparent, var(--cafe-cream), transparent)' } : undefined}
                  />
                )}
              </Link>
              <Link
                href="/contact"
                className={`${navLinkBase} ${isActive("/contact") ? activeLinkClass : inactiveLinkClass}`}
              >
                Contact
                {isActive("/contact") && (
                  <span
                    className="nav-underline"
                    style={!solidBg ? { background: 'linear-gradient(90deg, transparent, var(--cafe-cream), transparent)' } : undefined}
                  />
                )}
              </Link>
              <Link
                href="/careers"
                className={`${navLinkBase} ${isActive("/careers") ? activeLinkClass : inactiveLinkClass}`}
              >
                Careers
                {isActive("/careers") && (
                  <span
                    className="nav-underline"
                    style={!solidBg ? { background: 'linear-gradient(90deg, transparent, var(--cafe-cream), transparent)' } : undefined}
                  />
                )}
              </Link>

              <div className="h-4 w-px bg-cafe-beige/50"></div>

              <button
                type="button"
                className="relative cursor-pointer group"
                onClick={handleCartClick}
                aria-label="Open cart"
              >
                <ShoppingBag
                  className={`transition-colors ${solidBg ? 'text-cafe-black group-hover:text-cafe-tan' : 'text-cafe-cream group-hover:text-cafe-cream'}`}
                  strokeWidth={1.5}
                  size={22}
                />
                {cartBadge > 0 && (
                  <span
                    className="absolute -bottom-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-1 ring-white/70"
                    style={{ backgroundColor: badgeColors.tan, color: badgeColors.white }}
                  >
                    {cartBadge}
                  </span>
                )}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-6">
              <button
                type="button"
                className="relative cursor-pointer"
                onClick={handleCartClick}
                aria-label="Open cart"
              >
                <ShoppingBag className={solidBg ? "text-cafe-black" : "text-cafe-cream"} size={24} strokeWidth={1.5} />
                {cartBadge > 0 && (
                  <span
                    className="absolute -bottom-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-1 ring-white/70"
                    style={{ backgroundColor: badgeColors.tan, color: badgeColors.white }}
                  >
                    {cartBadge}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                type="button"
              >
                <span className={`hamburger-icon ${solidBg ? '' : 'hamburger-light'}`}>
                  <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                  <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                  <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Mobile Menu - Double Layer Right-to-Left */}
        {/* Layer 1: Backdrop (Tan) */}
        <div className={`menu-layer-backdrop md:hidden ${isOpen ? 'open' : ''}`} />

        {/* Layer 2: Main Drawer (Charcoal) */}
        <div className={`menu-drawer-cinematic md:hidden ${isOpen ? 'open' : ''}`}>
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="menu-drawer-close"
            aria-label="Close menu"
            type="button"
          >
            <div className="menu-drawer-close-x" />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4vh' }}>
            {/* Navigation Links */}
            {[
              { href: '/', label: 'Home' },
              { href: '/menu', label: 'Menu' },
              { href: '/story', label: 'Story' },
              { href: '/contact', label: 'Contact' },
              { href: '/careers', label: 'Careers' }
            ].map((link) => (
              <div key={link.href} className="menu-link-wrapper">
                <div className={`menu-link-text ${isActive(link.href) ? 'active' : ''}`}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}

            {/* Footer / Copyright */}
            <div className="menu-drawer-footer">
              <div className="menu-drawer-footer-text">
                Est. Riverside 2026
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const forceSolidRoutes = ["/terms", "/privacy", "/refunds"];
  const forceSolidBg = forceSolidRoutes.some((route) => pathname?.startsWith(route));
  const drawerWasOpen = useRef(false);
  const lastScrollY = useRef(0);
  const forceSolidRef = useRef(forceSolidBg);

  const isActive = (path: string): boolean => pathname === path;
  const navLinkBase =
    "nav-link text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-tan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cafe-mist";
  const solidBg = showSolidBg || forceSolidBg || isOpen || forceHighContrast;
  const isHeroTop = pathname === "/" && isAtTop && !isOpen && !forceHighContrast;

  // New scroll-based color system
  // At top (transparent) = light text (off-white)
  // Scrolled (glassmorphism) = dark text (deep espresso)
  const isScrolled = !isAtTop;
  const useLightText = isAtTop && !isOpen;
  const useDarkText = isScrolled || isOpen;

  const activeLinkClass = useLightText
    ? "font-semibold text-coffee-50"
    : "font-semibold text-coffee-900";
  const inactiveLinkClass = useLightText
    ? "text-coffee-50 hover:text-coffee-50/80 hover:-translate-y-0.5"
    : "text-coffee-900/80 hover:text-coffee-900 hover:-translate-y-0.5";

  // Logo: dark when light text (at top), light when dark text (scrolled)
  const logoSrc = useLightText ? "/tnc-navbar-logo-dark-v1.png" : "/tnc-navbar-logo-light-v1.png";

  // Hide on scroll down, show on scroll up, transparent at top
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const atTop = currentScrollY < 20;
          const scrollingDown = currentScrollY > lastScrollY.current;
          const scrollingUp = currentScrollY < lastScrollY.current;

          // Update state immediately
          setIsAtTop(atTop);

          // At the very top - show transparent navbar
          if (atTop) {
            setIsVisible(true);
            setShowSolidBg(forceSolidRef.current ? true : false);
          }
          // Scrolling down - hide navbar
          else if (scrollingDown && currentScrollY > 100) {
            setIsVisible(false);
            setShowSolidBg(true);
          }
          // Scrolling up - show navbar with glassmorphism
          else if (scrollingUp) {
            setIsVisible(true);
            setShowSolidBg(true);
          }
          // Just scrolled from top - show glassmorphism immediately
          else if (!atTop && currentScrollY > 20) {
            setIsVisible(true);
            setShowSolidBg(true);
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

  // Handle mobile drawer link clicks - navigate then close drawer
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Prevent default navigation
    e.preventDefault();

    // Don't navigate if already on this page
    if (pathname === href) {
      setIsOpen(false);
      return;
    }

    // Start navigation immediately to begin page load
    router.push(href);

    // Keep drawer open while page loads, then close with smooth transition
    setTimeout(() => {
      setIsOpen(false);
    }, 450); // Delay allows page content to load before drawer slides away
  };

  // Prefetch hero images on hover for instant page transitions
  const prefetchPageImage = (route: string) => {
    const heroImages: Record<string, string> = {
      '/menu': '/menu/tnc-menu-hero-bg.png',
      '/story': '/story/tnc-story-hero-bg.png',
      '/contact': '/contact/tnc-contact-hero-bg.png',
      '/careers': '/careers/tnc-career-hero-bg.png',
    };

    const imageSrc = heroImages[route];
    if (imageSrc) {
      // Create image object to trigger browser cache
      // Use window.Image to avoid conflict with Next.js Image component
      const img = new window.Image();
      img.src = imageSrc;
    }
  };

  return (
    <>
      {/* <AnnouncementBanner text={announcementText} /> */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all ease-in-out ${
          isScrolled ? 'backdrop-blur-md shadow-md' : ''
        } ${
          isOpen
            ? 'border-coffee-50/20'
            : isScrolled
            ? 'border-coffee-50/20'
            : 'border-transparent'
        }`}
        data-at-top={isAtTop}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: isOpen
            ? 'var(--cafe-mist)'
            : isScrolled
            ? 'rgba(var(--coffee-50-rgb), 0.9)'
            : 'transparent',
          transitionDuration: '500ms',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className={`grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500 ${
            isAtTop ? 'py-8' : 'py-3'
          }`}>
            {/* Logo - Left */}
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
                className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px]"
                priority
              />
              <div className="flex flex-col">
                <span
                  className="font-serif whitespace-nowrap text-xl sm:text-2xl md:text-3xl leading-none tracking-tight"
                  style={{ color: useLightText ? 'var(--coffee-50)' : 'var(--coffee-900)' }}
                >
                  The Notebook
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.22em] leading-none"
                  style={{
                    color: useLightText ? 'var(--coffee-50)' : 'var(--coffee-900)',
                    opacity: 0.8
                  }}
                >
                  Café
                </span>
              </div>
            </Link>

            {/* Navigation - Center */}
            <div className="hidden md:flex items-center justify-center space-x-7">
              <Link
                href="/"
                className={`${navLinkBase} ${isActive("/") ? activeLinkClass : inactiveLinkClass}`}
              >
                Home
              </Link>
              <Link
                href="/menu"
                onMouseEnter={() => prefetchPageImage('/menu')}
                className={`${navLinkBase} ${isActive("/menu") ? activeLinkClass : inactiveLinkClass}`}
              >
                Menu
              </Link>
              <Link
                href="/story"
                onMouseEnter={() => prefetchPageImage('/story')}
                className={`${navLinkBase} ${isActive("/story") ? activeLinkClass : inactiveLinkClass}`}
              >
                Story
              </Link>
              <Link
                href="/contact"
                onMouseEnter={() => prefetchPageImage('/contact')}
                className={`${navLinkBase} ${isActive("/contact") ? activeLinkClass : inactiveLinkClass}`}
              >
                Contact
              </Link>
              <Link
                href="/careers"
                onMouseEnter={() => prefetchPageImage('/careers')}
                className={`${navLinkBase} ${isActive("/careers") ? activeLinkClass : inactiveLinkClass}`}
              >
                Careers
              </Link>
            </div>

            {/* Cart & Social - Right */}
            <div className="hidden md:flex items-center justify-end gap-4">
              {/* Cart Icon */}
              <button
                type="button"
                className="relative cursor-pointer group"
                onClick={handleCartClick}
                aria-label="Open cart"
              >
                <ShoppingBag
                  className={`transition-colors ${useLightText ? 'text-coffee-50 group-hover:text-coffee-50/80' : 'text-coffee-900 group-hover:text-coffee-900/80'}`}
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

              {/* Divider */}
              <div className="h-4 w-px bg-cafe-beige/50"></div>

              {/* Instagram Icon + Follow Button */}
              <a
                href="https://instagram.com/thenotebookcafellc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group"
              >
                {/* Instagram Icon */}
                <svg
                  className={`w-5 h-5 transition-colors ${useLightText ? 'text-coffee-50 group-hover:text-coffee-50/80' : 'text-coffee-900 group-hover:text-coffee-900/80'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {/* Follow Button */}
                <span
                  className={`${navLinkBase} !text-[10px] px-3 py-1.5 border rounded transition-all ${useLightText ? 'border-coffee-50/40 text-coffee-50 hover:border-coffee-50/80 hover:text-coffee-50/80' : 'border-coffee-900/40 text-coffee-900 hover:border-coffee-900/80 hover:text-coffee-900/80'}`}
                >
                  Follow
                </span>
              </a>
            </div>

            <div className="md:hidden col-start-3 flex items-center justify-end gap-6">
              <button
                type="button"
                className="relative cursor-pointer"
                onClick={handleCartClick}
                aria-label="Open cart"
              >
                <ShoppingBag className={useLightText ? "text-coffee-50" : "text-coffee-900"} size={24} strokeWidth={1.5} />
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
                <span className={`hamburger-icon ${useLightText ? 'hamburger-light' : ''}`}>
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
            ].map((link, index) => (
              <div key={link.href} className="menu-link-wrapper">
                {/* The masked content container */}
                <div
                  className="menu-link-content"
                  style={{ transitionDelay: isOpen ? `${0.4 + (index * 0.08)}s` : '0s' }}
                >
                  {/* Index Number */}
                  <span className="menu-item-number">0{index + 1}</span>

                  {/* Main Label */}
                  <Link
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className={`menu-link-text ${isActive(link.href) ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
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

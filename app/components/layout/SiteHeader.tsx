/**
 * @fileoverview Main navigation header component
 * @module components/layout/SiteHeader
 *
 * @description
 * Responsive navigation header with sticky positioning, scroll detection,
 * mobile hamburger menu, and shopping cart integration. Features dynamic
 * background opacity based on scroll position and route.
 *
 * @example
 * ```tsx
 * <SiteHeader
 *   instagramUrl="https://instagram.com/..."
 *   spotifyUrl="https://spotify.com/..."
 * />
 * ```
 */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/app/components/providers/CartProvider";

type SiteHeaderProps = {
  instagramUrl?: string;
  spotifyUrl?: string;
  cartCount?: number;
  onCartClick?: () => void;
};

export default function SiteHeader({
  instagramUrl,
  spotifyUrl,
}: SiteHeaderProps): React.JSX.Element {
  const { items, open: openCart } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [forceHighContrast, setForceHighContrast] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const forceSolidRoutes = ["/terms", "/privacy", "/refunds"];
  const forceSolidBg = forceSolidRoutes.some((route) => pathname?.startsWith(route));
  const drawerWasOpen = useRef(false);
  const lastScrollY = useRef(0);
  const scrollDeltaAcc = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);
  const headerHeightRef = useRef<number>(80);

  const isActive = (path: string): boolean => pathname === path;
  const navLinkBase =
    "nav-link text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:text-cafe-tan";
  const instagramHref = instagramUrl || "https://instagram.com/thenotebookcafellc";
  const spotifyHref = spotifyUrl?.trim() || "";

  // New scroll-based color system
  // At top (transparent) = light text (off-white)
  // Scrolled (glassmorphism) = dark text (deep espresso)
  const forceSolid = forceSolidBg || forceHighContrast;
  const atTopVisual = isAtTop && !forceSolid;
  const isScrolled = !atTopVisual;
  const useLightText = atTopVisual;

  const activeLinkClass = useLightText
    ? "font-semibold text-coffee-50"
    : "font-semibold text-coffee-900";
  const inactiveLinkClass = useLightText
    ? "text-coffee-50 hover:text-coffee-50/80 hover:-translate-y-0.5"
    : "text-coffee-900/80 hover:text-coffee-900 hover:-translate-y-0.5";

  // Logo: dark when light text (at top), light when dark text (scrolled)
  const logoSrc = useLightText ? "/tnc-navbar-logo-dark-v1.png" : "/tnc-navbar-logo-light-v1.png";
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Hide on scroll down, show on scroll up, transparent at top
  useEffect(() => {
    let ticking = false;
    // Buffer before hiding to prevent jitter at the very top
    const hideAfterPx = 60; 
    const toggleThresholdPx = 10;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const atTop = currentScrollY < 20;
          const delta = currentScrollY - lastScrollY.current;

          setIsAtTop(atTop);

          // Always show at the very top
          if (atTop) {
            setIsVisible(true);
            scrollDeltaAcc.current = 0;
          } else {
            // Accumulate scroll delta to avoid trigger-happy toggling
            const directionChanged =
              (delta > 0 && scrollDeltaAcc.current < 0) || (delta < 0 && scrollDeltaAcc.current > 0);
            
            if (directionChanged) {
              scrollDeltaAcc.current = 0;
            }

            scrollDeltaAcc.current += delta;

            // Only hide if we've scrolled past the buffer and accumulated enough downward movement
            if (scrollDeltaAcc.current > toggleThresholdPx && currentScrollY > hideAfterPx) {
              setIsVisible(false);
              scrollDeltaAcc.current = 0; // Reset to prevent repeated triggering
            } else if (scrollDeltaAcc.current < -toggleThresholdPx) {
              setIsVisible(true);
              scrollDeltaAcc.current = 0;
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const syncHeaderHeight = useCallback(() => {
    if (typeof window === "undefined") return;
    const el = navRef.current;
    if (!el) return;
    const height = Math.max(0, Math.round(el.getBoundingClientRect().height));
    headerHeightRef.current = height;
    document.documentElement.style.setProperty("--site-header-height", `${height}px`);
  }, []);

  // Publish header height as a CSS variable for other UI (sticky offsets, etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    syncHeaderHeight();
    const el = navRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => syncHeaderHeight());
    observer.observe(el);
    window.addEventListener("resize", syncHeaderHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, [syncHeaderHeight]);

  // Broadcast header visibility to pages that need sticky positioning.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("tnc-header-state", {
        detail: {
          visible: isVisible,
          atTop: atTopVisual,
          height: headerHeightRef.current,
        },
      })
    );
  }, [isVisible, atTopVisual]);

  // Track drawer state
  useEffect(() => {
    drawerWasOpen.current = isOpen;
  }, [isOpen]);

  // Close drawer on route change and scroll to top if drawer was open
  useEffect(() => {
    const wasOpen = drawerWasOpen.current;
    const rafId = requestAnimationFrame(() => {
      if (wasOpen) window.scrollTo(0, 0);
      setIsOpen(false);
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.dataset.navOpen = isOpen ? "true" : "false";
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.dataset.navOpen = "false";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Respect accessibility hide-images toggle for nav contrast/logo
  useEffect(() => {
    const updateContrast = () => {
      if (typeof document === "undefined") return;
      const isHideImages = document.documentElement.classList.contains("acc-hide-images");
      setForceHighContrast(isHideImages);
    };

    updateContrast();
    const observer = new MutationObserver(updateContrast);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [forceSolidBg]);

  // Handle mobile drawer link clicks - navigate then close drawer
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Prevent default navigation
    e.preventDefault();

    // Don't navigate if already on this page
    if (pathname === href) {
      setIsOpen(false);
      return;
    }

    // Close the drawer immediately
    setIsOpen(false);

    router.push(href);
  };

  // Prefetch hero images on hover for instant page transitions
  const prefetchPageImage = (route: string) => {
    const heroImages: Record<string, string> = {
    };

    const imageSrc = heroImages[route];
    if (imageSrc) {
      const img = new window.Image();
      img.src = imageSrc;
    }
  };

  return (
    <>
      {/* <AnnouncementBanner text={announcementText} /> */}

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1001] border-b transform-gpu will-change-transform transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled ? 'backdrop-blur-md shadow-md' : ''
        } ${
          isOpen
            ? 'border-transparent'
            : isScrolled
            ? 'border-coffee-50/20'
            : 'border-transparent'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        data-at-top={atTopVisual}
        style={{
          backgroundColor: atTopVisual
            ? 'transparent'
            : isOpen
            ? 'var(--color-cafe-mist)'
            : forceSolid
            ? 'var(--color-cafe-mist)'
            : isScrolled
            ? 'rgba(var(--coffee-50-rgb), 0.9)'
            : 'transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 max-[390px]:px-4 lg:px-12">
	          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center transition-all duration-500 py-4">
            {/* Logo - Left (Desktop only) */}
            <Link
              href="/"
              className="hidden md:flex items-center cursor-pointer group gap-2.5"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Image
                src={logoSrc}
                alt="The Notebook Café logo — Riverside, CA"
                width={65}
                height={65}
                className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px]"
                priority
              />
              <div className="flex flex-col">
                <span
                  className="font-serif whitespace-nowrap text-xl sm:text-2xl md:text-3xl leading-none tracking-tight bionic-skip"
                  style={{ color: useLightText ? 'var(--color-coffee-50)' : 'var(--color-coffee-900)' }}
                >
                  The Notebook
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.22em] leading-none bionic-skip"
                  style={{
                    color: useLightText ? 'var(--color-coffee-50)' : 'var(--color-coffee-900)',
                    opacity: 0.8
                  }}
                >
                  Café
                </span>
              </div>
            </Link>

            {/* Mobile Title - Centered */}
            <Link
              href="/"
              className="flex md:hidden items-center justify-center cursor-pointer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <span
                className="font-serif whitespace-nowrap text-xl leading-none tracking-tight bionic-skip"
                style={{ color: useLightText ? 'var(--color-coffee-50)' : 'var(--color-coffee-900)' }}
              >
                The Notebook Café
              </span>
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

            {/* Social - Right */}
            <div className="hidden md:flex items-center justify-end gap-4">
              {/* Cart button - hidden until online ordering launches */}
              <button
                type="button"
                onClick={() => {
                  openCart();
                  window.dispatchEvent(new Event("open-cart"));
                }}
                aria-label="Shopping cart"
                className={`hidden relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  useLightText ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                <ShoppingBag
                  size={18}
                  className={useLightText ? "text-coffee-50" : "text-coffee-900/80"}
                />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] leading-[18px] font-bold text-center"
                    style={{
                      backgroundColor: "var(--color-cafe-tan)",
                      color: "var(--color-cafe-white)",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
	              {/* Instagram Icon + Follow Button */}
	              <a
	                href={instagramHref}
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
	                  className={`${navLinkBase} !text-2xs px-3 py-1.5 border rounded transition-all ${useLightText ? 'border-coffee-50/40 text-coffee-50 hover:border-coffee-50/80 hover:text-coffee-50/80' : 'border-coffee-900/40 text-coffee-900 hover:border-coffee-900/80 hover:text-coffee-900/80'}`}
	                >
		                  Follow
		                </span>
		              </a>

	              {spotifyHref && (
	                <a
	                  href={spotifyHref}
	                  target="_blank"
	                  rel="noopener noreferrer"
	                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
	                  aria-label="Spotify"
	                >
	                  <svg
	                    className={`w-5 h-5 transition-colors ${useLightText ? 'text-coffee-50' : 'text-coffee-900/80'}`}
	                    viewBox="0 0 24 24"
	                    fill="currentColor"
	                    aria-hidden="true"
	                  >
	                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.318a.75.75 0 0 1-1.03.246c-2.824-1.725-6.381-2.115-10.575-1.158a.75.75 0 1 1-.334-1.463c4.583-1.045 8.513-.597 11.672 1.333a.75.75 0 0 1 .267 1.042zm1.474-3.28a.9.9 0 0 1-1.237.295c-3.233-1.988-8.163-2.564-11.99-1.402a.9.9 0 1 1-.525-1.722c4.369-1.329 9.783-.68 13.516 1.613a.9.9 0 0 1 .236 1.216zm.127-3.416c-3.875-2.301-10.269-2.512-13.969-1.389a1.05 1.05 0 1 1-.61-2.008c4.248-1.29 11.314-1.041 15.79 1.615a1.05 1.05 0 0 1-1.07 1.782z" />
	                  </svg>
	                </a>
	              )}
            </div>

            <div className="md:hidden col-start-3 flex items-center justify-end gap-6">
              {/* Cart button - hidden until online ordering launches */}
              <button
                type="button"
                onClick={() => {
                  openCart();
                  window.dispatchEvent(new Event("open-cart"));
                }}
                aria-label="Shopping cart"
                className="hidden relative w-12 h-12 flex items-center justify-center"
              >
                <ShoppingBag
                  size={20}
                  className={useLightText ? "text-coffee-50" : "text-coffee-900/80"}
                />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] leading-[18px] font-bold text-center"
                    style={{
                      backgroundColor: "var(--color-cafe-tan)",
                      color: "var(--color-cafe-white)",
                    }}
                  >
                    {cartCount}
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
        <div
          className={`menu-layer-backdrop md:hidden ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Layer 2: Main Drawer (Charcoal) */}
        <div className={`menu-drawer-cinematic md:hidden ${isOpen ? 'open' : ''}`}>
          <div className="menu-links-group">
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
                  style={{ transitionDelay: isOpen ? `${0.2 + (index * 0.08)}s` : '0s' }}
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

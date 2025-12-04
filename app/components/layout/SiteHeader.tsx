"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BookOpen, ShoppingBag, Menu } from "lucide-react";
import { PiSpotifyLogoFill, PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const badgeColors = {
  tan: '#A48D78',
  white: '#FAF9F6',
};

type SiteHeaderProps = {
  instagramUrl?: string;
  spotifyUrl?: string;
  announcementText?: string;
  cartCount?: number;
  onCartClick?: () => void;
};

export default function SiteHeader({
  instagramUrl,
  spotifyUrl,
  announcementText,
  cartCount = 0,
  onCartClick,
}: SiteHeaderProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartBadge, setCartBadge] = useState<number>(cartCount ?? 0);
  const pathname = usePathname();
  const drawerWasOpen = useRef(false);

  const isActive = (path: string): boolean => pathname === path;

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
    setIsOpen(false);
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
    setCartBadge(cartCount ?? 0);
  }, [cartCount]);

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

      <nav className="sticky top-0 z-40 bg-cafe-mist/85 backdrop-blur-xl border-b border-cafe-tan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="flex items-center cursor-pointer group gap-2.5"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Image
                src="/tnc-navbar-logo.png"
                alt="The Notebook Café Logo"
                width={65}
                height={65}
                className="w-[56px] h-[56px] sm:w-[65px] sm:h-[65px]"
                priority
              />
              <div className="flex flex-col">
                <span
                  className="font-serif text-2xl sm:text-3xl leading-none tracking-tight"
                  style={{ color: 'var(--cafe-black)' }}
                >
                  The Notebook
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.22em] leading-none"
                  style={{ color: 'var(--cafe-tan)' }}
                >
                  Café
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link
                href="/"
                className={`text-sm tracking-[0.22em] uppercase transition-all ${isActive("/")
                  ? "font-bold text-cafe-black border-b border-cafe-black pb-1"
                  : "text-cafe-brown hover:text-cafe-black"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className={`text-sm tracking-[0.22em] uppercase transition-all ${isActive("/menu")
                  ? "font-bold text-cafe-black border-b border-cafe-black pb-1"
                  : "text-cafe-brown hover:text-cafe-black"
                  }`}
              >
                Menu
              </Link>
              <Link
                href="/story"
                className={`text-sm tracking-[0.22em] uppercase transition-all ${isActive("/story")
                  ? "font-bold text-cafe-black border-b border-cafe-black pb-1"
                  : "text-cafe-brown hover:text-cafe-black"
                  }`}
              >
                Story
              </Link>
              <Link
                href="/events"
                className={`text-sm tracking-[0.22em] uppercase transition-all ${isActive("/events")
                  ? "font-bold text-cafe-black border-b border-cafe-black pb-1"
                  : "text-cafe-brown hover:text-cafe-black"
                  }`}
              >
                Events
              </Link>

              <div className="h-4 w-px bg-cafe-beige/50"></div>

              <button
                type="button"
                className="relative cursor-pointer group"
                onClick={handleCartClick}
                aria-label="Open cart"
              >
                <ShoppingBag
                  className="text-cafe-black group-hover:text-cafe-tan transition-colors"
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
                <ShoppingBag className="text-cafe-black" size={24} strokeWidth={1.5} />
                {cartBadge > 0 && (
                  <span
                    className="absolute -bottom-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-1 ring-white/70"
                    style={{ backgroundColor: badgeColors.tan, color: badgeColors.white }}
                  >
                    {cartBadge}
                  </span>
                )}
              </button>
              <button onClick={() => setIsOpen(!isOpen)}>
                <Menu className="text-cafe-black" size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-cafe-mist border-t border-cafe-tan/20 overflow-hidden"
            >
              <div className="px-4 py-8 space-y-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left font-serif text-3xl text-cafe-black hover:text-cafe-tan transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left font-serif text-3xl text-cafe-black hover:text-cafe-tan transition-colors"
                >
                  Menu
                </Link>
                <Link
                  href="/story"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left font-serif text-3xl text-cafe-black hover:text-cafe-tan transition-colors"
                >
                  Story
                </Link>
                <Link
                  href="/events"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left font-serif text-3xl text-cafe-black hover:text-cafe-tan transition-colors"
                >
                  Events
                </Link>
                <div className="pt-8 border-t border-cafe-beige">
                  <p className="text-sm text-cafe-brown mb-2 font-medium">3838 11th St, Riverside, CA 92501</p>
                  <p className="text-sm text-cafe-brown font-medium">Mon-Sun: 7am - 7pm</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </>
  );
}

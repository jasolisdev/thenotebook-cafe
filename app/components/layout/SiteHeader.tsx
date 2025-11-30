"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Instagram, Coffee } from "lucide-react";
import { PiSpotifyLogoFill, PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import AnnouncementBanner from "../ui/AnnouncementBanner";

type SiteHeaderProps = {
  instagramUrl?: string;
  spotifyUrl?: string;
  announcementText?: string;
};

export default function SiteHeader({
  instagramUrl,
  spotifyUrl,
  announcementText,
}: SiteHeaderProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  // Close drawer on route change and scroll to top
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* <AnnouncementBanner text={announcementText} /> */}

      <nav
        className="relative z-10 border-b border-cafe-beige/20"
        style={{
          backgroundColor: "rgba(250, 249, 246, 0.95)",
          color: "#4A3B32",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="The Notebook Café logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-sm transition-transform duration-300 group-hover:rotate-3"
              priority
            />
            <span
              className="font-serif text-2xl tracking-tight text-cafe-black"
              style={{ color: "#2C2420" }}
            >
              The Notebook Café
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive("/") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
                }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive("/menu") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
                }`}
            >
              Menu
            </Link>
            <Link
              href="/story"
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive("/story") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
                }`}
            >
              Story
            </Link>
            <Link
              href="/events"
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive("/events") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
                }`}
            >
              Events
            </Link>
            <Link
              href="/contact"
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive("/contact") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Social/Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={instagramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cafe-brown hover:text-cafe-tan transition-colors"
              aria-label="Instagram"
              style={{ color: "#4A3B32" }}
            >
              <Instagram size={20} />
            </a>
            <a
              href={spotifyUrl || instagramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cafe-tan text-white px-5 py-2 text-xs uppercase tracking-widest rounded-sm hover:bg-cafe-brown transition-colors"
              style={{ backgroundColor: "#A48D78" }}
            >
              Follow
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden text-cafe-black burger ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="burger-lines">
              <span />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 drawer ${isOpen ? "open" : ""}`}
        style={{
          backgroundColor: "#F4F0E9",
          color: "#2C2420",
          boxShadow: "0 20px 60px rgba(42,31,22,0.18)",
          zIndex: 90,
          height: "100vh",
        }}
      >
        <div className="flex flex-col h-full px-8 pb-10 pt-6 relative drawer-shell">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="drawer-links-wrapper">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/story", label: "Story" },
                { href: "/events", label: "Events" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`drawer-link ${isOpen ? "drawer-link-visible" : ""} ${isActive(item.href) ? "drawer-link-active" : ""
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center drawer-social-block">
            <div className="w-12 h-0.5 bg-cafe-beige/50"></div>
            <div className="flex gap-4 mt-1">
              <a
                href={spotifyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-social-icon"
                aria-label="Spotify"
              >
                <span className="drawer-icon-inner">
                  <PiSpotifyLogoFill size={22} />
                </span>
              </a>
              <a
                href={instagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-social-icon"
                aria-label="Instagram"
              >
                <span className="drawer-icon-inner drawer-icon-offset">
                  <PiInstagramLogoFill size={22} />
                </span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-social-icon"
                aria-label="TikTok"
              >
                <span className="drawer-icon-inner drawer-icon-offset">
                  <PiTiktokLogoFill size={22} />
                </span>
              </a>
            </div>
            <p className="font-sans text-sm tracking-widest drawer-est">EST. 2025</p>
          </div>

          {/* Decorative */}
          <div className="absolute bottom-12 right-12 opacity-10 pointer-events-none animate-float-slow">
            <Coffee size={120} />
          </div>
        </div>
      </div>
    </>
  );
}

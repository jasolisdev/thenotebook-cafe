"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Instagram, Menu as MenuIcon, X, Coffee } from "lucide-react";
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

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const handleNavClick = () => {
    setIsOpen(false);
    scrollToTop();
  };

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
    scrollToTop();
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
      <AnnouncementBanner text={announcementText} />

      <nav
        className="sticky top-0 z-50 border-b border-cafe-beige/20"
        style={{
          backgroundColor: "rgba(250, 249, 246, 0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#4A3B32",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 bg-cafe-black text-white flex items-center justify-center rounded-sm font-serif text-xl pt-1 transition-transform group-hover:rotate-3"
              style={{ backgroundColor: "#2C2420", color: "#FFFFFF" }}
            >
              N
            </div>
            <span
              className="font-serif text-2xl tracking-tight text-cafe-black"
              style={{ color: "#2C2420" }}
            >
              The Notebook
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              onClick={handleNavClick}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                isActive("/") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={handleNavClick}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                isActive("/menu") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
              }`}
            >
              Menu
            </Link>
            <Link
              href="/story"
              onClick={handleNavClick}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                isActive("/story") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
              }`}
            >
              Story
            </Link>
            <Link
              href="/events"
              onClick={handleNavClick}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                isActive("/events") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
              }`}
            >
              Events
            </Link>
            <Link
              href="/contact"
              onClick={handleNavClick}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                isActive("/contact") ? "text-cafe-tan font-semibold" : "text-cafe-brown hover:text-cafe-tan"
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
        className={`fixed inset-0 z-[80] drawer ${isOpen ? "open" : ""} ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#F4F0E9",
          color: "#2C2420",
          boxShadow: "0 20px 60px rgba(42,31,22,0.18)",
          zIndex: 80,
          top: "0",
          height: "100vh",
        }}
      >
        <div className="flex flex-col h-full p-8 pt-20 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-cafe-black hover:rotate-90 transition-transform duration-300 md:hidden"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col gap-8 mt-24 items-center text-center">
            <Link
              href="/"
              onClick={handleNavClick}
              className="font-serif text-4xl text-cafe-black hover:text-cafe-tan transition-colors tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={handleNavClick}
              className="font-serif text-4xl text-cafe-black hover:text-cafe-tan transition-colors tracking-wide"
            >
              Menu
            </Link>
            <Link
              href="/story"
              onClick={handleNavClick}
              className="font-serif text-4xl text-cafe-black hover:text-cafe-tan transition-colors tracking-wide"
            >
              Story
            </Link>
            <Link
              href="/events"
              onClick={handleNavClick}
              className="font-serif text-4xl text-cafe-black hover:text-cafe-tan transition-colors tracking-wide"
            >
              Events
            </Link>
            <Link
              href="/contact"
              onClick={handleNavClick}
              className="font-serif text-4xl text-cafe-black hover:text-cafe-tan transition-colors tracking-wide"
            >
              Contact
            </Link>
          </div>

          <div className="mt-auto flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-sm tracking-widest text-cafe-tan italic">
              Low lights, good sound, better coffee.
            </p>
            <div className="w-12 h-0.5 bg-cafe-beige/50"></div>
            <div className="flex gap-4 mt-1">
              <a
                href={spotifyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-cafe-cream text-cafe-brown border border-cafe-beige/60 hover:-translate-y-[2px] transition-transform shadow-sm"
                aria-label="Spotify"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 1.75A10.25 10.25 0 1 0 22.25 12 10.262 10.262 0 0 0 12 1.75zm4.646 14.566a.749.749 0 0 1-1.03.256 7.425 7.425 0 0 0-7.232-.21.75.75 0 0 1-.638-1.36 8.925 8.925 0 0 1 8.7.252.75.75 0 0 1 .2 1.062zm1.373-3.064a.937.937 0 0 1-.33.252.749.749 0 0 1-.61-.04 9.9 9.9 0 0 0-9.63-.28.75.75 0 1 1-.64-1.358 11.4 11.4 0 0 1 11.07.325.75.75 0 0 1 .14 1.1zm.07-3.187a.75.75 0 0 1-.648.425.77.77 0 0 1-.325-.075 12.88 12.88 0 0 0-12.25-.377.75.75 0 0 1-.65-1.354 14.38 14.38 0 0 1 13.66.42.75.75 0 0 1 .213.961z" />
                </svg>
              </a>
              <a
                href={instagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-cafe-cream text-cafe-brown border border-cafe-beige/60 hover:-translate-y-[2px] transition-transform shadow-sm"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.25A3.75 3.75 0 1 0 15.75 12 3.754 3.754 0 0 0 12 8.25zm0 6.25A2.5 2.5 0 1 1 14.5 12 2.503 2.503 0 0 1 12 14.5zM17.75 7a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-cafe-cream text-cafe-brown border border-cafe-beige/60 hover:-translate-y-[2px] transition-transform shadow-sm"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M13 10h2.5l.5-3H13V5.5c0-.864.22-1.5 1.5-1.5H16V1.14C15.395 1.048 14.292 1 13.75 1 11.178 1 9.5 2.657 9.5 5.3V7H7v3h2.5v9h3.5z" />
                </svg>
              </a>
            </div>
            <p className="font-sans text-sm tracking-widest text-cafe-tan">EST. 2025</p>
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

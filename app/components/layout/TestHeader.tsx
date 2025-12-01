"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * MINIMAL TEST HEADER - FOR DEBUGGING SCROLL ISSUES
 *
 * This is a bare-bones navigation with:
 * - No drawer/hamburger
 * - No scroll manipulation
 * - No useEffect hooks
 * - No body overflow changes
 *
 * Use this to test if scroll issues are caused by SiteHeader or something else
 */
export default function TestHeader() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-[120] border-b"
      style={{
        backgroundColor: "rgba(250, 249, 246, 0.98)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "#CBB9A4",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl" style={{ color: "#2C2420" }}>
          TEST HEADER
        </Link>

        {/* Simple Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm uppercase ${
              pathname === "/" ? "font-bold" : "font-normal"
            }`}
            style={{ color: pathname === "/" ? "#A48D78" : "#4A3B32" }}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`text-sm uppercase ${
              pathname === "/menu" ? "font-bold" : "font-normal"
            }`}
            style={{ color: pathname === "/menu" ? "#A48D78" : "#4A3B32" }}
          >
            Menu
          </Link>
          <Link
            href="/story"
            className={`text-sm uppercase ${
              pathname === "/story" ? "font-bold" : "font-normal"
            }`}
            style={{ color: pathname === "/story" ? "#A48D78" : "#4A3B32" }}
          >
            Story
          </Link>
          <Link
            href="/events"
            className={`text-sm uppercase ${
              pathname === "/events" ? "font-bold" : "font-normal"
            }`}
            style={{ color: pathname === "/events" ? "#A48D78" : "#4A3B32" }}
          >
            Events
          </Link>
          <Link
            href="/contact"
            className={`text-sm uppercase ${
              pathname === "/contact" ? "font-bold" : "font-normal"
            }`}
            style={{ color: pathname === "/contact" ? "#A48D78" : "#4A3B32" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

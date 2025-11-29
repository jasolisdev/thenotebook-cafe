"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Link
        href="/"
        className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
          isActive("/") ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'
        }`}
      >
        Home
      </Link>
      <Link
        href="/menu"
        className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
          isActive("/menu") ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'
        }`}
      >
        Menu
      </Link>
      <Link
        href="/story"
        className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
          isActive("/story") ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'
        }`}
      >
        Story
      </Link>
      <Link
        href="/events"
        className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
          isActive("/events") ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'
        }`}
      >
        Events
      </Link>
      <Link
        href="/contact"
        className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
          isActive("/contact") ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'
        }`}
      >
        Contact
      </Link>
    </>
  );
}

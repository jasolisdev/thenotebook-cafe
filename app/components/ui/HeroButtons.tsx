"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/menu"
        className="hero-button-primary px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors duration-300"
      >
        Explore Our Menu
      </Link>
      <Link
        href="/contact"
        className="hero-button-secondary px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors duration-300"
      >
        Visit Us
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  const openCart = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <Link
        href="/menu"
        className="group relative bg-cafe-black text-cafe-white px-6 py-3 sm:px-8 sm:py-4 rounded-sm uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:bg-cafe-brown hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Our Menu
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-cafe-tan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Link>
      <button
        type="button"
        className="group bg-transparent text-cafe-black border-2 border-cafe-black px-6 py-3 sm:px-8 sm:py-4 rounded-sm uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:bg-cafe-black hover:text-cafe-white hover:shadow-lg hover:-translate-y-0.5 cursor-default"
        onClick={openCart}
      >
        <span className="flex items-center gap-1.5 sm:gap-2">
          Online Ordering Soon
          <ArrowRight size={14} className="opacity-60 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </button>
    </div>
  );
}

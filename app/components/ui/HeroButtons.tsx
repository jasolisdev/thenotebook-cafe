"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Link
        href="/menu"
        className="group relative bg-cafe-black text-cafe-white px-6 py-3 sm:px-8 sm:py-4 rounded-sm uppercase tracking-[0.2em] text-2xs sm:text-xs font-semibold transition-all duration-300 hover:bg-cafe-brown hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Our Menu
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-cafe-tan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Link>
    </div>
  );
}

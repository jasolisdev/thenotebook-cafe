"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";

type Props = { instagramUrl?: string };

export default function SiteHeader({ instagramUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10">
      {/* Row: Logo + Title + (Desktop Nav) + (Mobile Button) */}
      <div className="flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="The Notebook Café logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] object-contain"
            priority
          />
          <span className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-neutral-900">
            The Notebook Café
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-[14px] text-neutral-700">
          <a href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-neutral-900 transition-colors">
            About
          </a>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors flex items-center"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.6} />
            </a>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden h-10 w-10 rounded-2xl bg-white/85 border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          <span className="relative block h-[14px] w-[20px]">
            <span
              className={`absolute inset-x-0 top-0 h-[2px] rounded bg-black transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded bg-black transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-[2px] rounded bg-black transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden mt-[calc(var(--rule)*0.5)] rounded-xl border border-black/10 bg-white/92 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.10)] p-3">
          <nav className="flex flex-col text-[16px] text-neutral-800">
            <a href="/" className="px-2 py-2 rounded hover:bg-black/[.04]">
              Home
            </a>
            <a href="/about" className="px-2 py-2 rounded hover:bg-black/[.04]">
              About
            </a>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 rounded hover:bg-black/[.04] flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

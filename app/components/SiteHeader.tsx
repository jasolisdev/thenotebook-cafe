"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SiteHeaderProps = {
  instagramUrl?: string;
};

export default function SiteHeader({ instagramUrl }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 w-full px-5 sm:px-8 md:px-10 pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between text-center sm:text-left">
      {/* Logo */}
      <div className="leading-tight flex-1 flex flex-col items-start">
        <a href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="The Notebook Café logo"
            width={140}
            height={60}
            className="w-auto h-10 sm:h-12 object-contain drop-shadow-[0_0_12px_rgba(182,138,58,0.3)]"
            priority
          />
        </a>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center gap-5 text-[0.8rem] text-neutral-400 font-light">
        <a href="/" className="hover:text-neutral-200 transition-colors">
          Home
        </a>
        <a href="/about" className="hover:text-neutral-200 transition-colors">
          About
        </a>

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-200 transition-colors flex items-center"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
          </a>
        )}
      </nav>

      {/* Burger Button */}
      <button
        className="sm:hidden absolute right-5 top-6 text-neutral-300 hover:text-neutral-100 transition-colors h-8 w-8 flex items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="relative block h-5 w-6">
          <span
            className={`absolute left-0 right-0 block h-[2px] bg-current rounded transition-all duration-200 ${
              open ? "rotate-45 top-1/2 translate-y-[-1px]" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 right-0 block h-[2px] bg-current rounded transition-all duration-200 ${
              open ? "opacity-0" : "top-1/2 -translate-y-1/2"
            }`}
          />
          <span
            className={`absolute left-0 right-0 block h-[2px] bg-current rounded transition-all duration-200 ${
              open ? "-rotate-45 top-1/2 translate-y-[-1px]" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Page-Turn Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black backdrop-blur-[2px] z-30 sm:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Notebook “page” */}
            <motion.div
              key="menu"
              initial={{ rotateY: -90, x: "-100%", opacity: 0 }}
              animate={{ rotateY: 0, x: 0, opacity: 1 }}
              exit={{ rotateY: -90, x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
              }}
              className="fixed top-0 left-0 bottom-0 z-40 sm:hidden
             w-[85%] max-w-[340px]
             bg-[#fefcf9]
             dark:bg-[rgba(15,15,15,0.98)]
             shadow-[20px_0_80px_rgba(0,0,0,0.8)]
             border-r border-[rgba(182,138,58,0.25)]
             origin-left overflow-hidden
             flex flex-col pt-24 px-8 pb-16"
              style={{
                backgroundImage: `
      repeating-linear-gradient(#fefbf4 0px, #fefbf4 22px, #f5eddb 23px),
      linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.02))
    `,
                backgroundSize: "100% 23px",
              }}
            >
              {/* Paper edge highlight */}
              <div className="pointer-events-none absolute top-0 right-[-30px] h-full w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-neutral-700/30" />

              {/* Nav links */}
              <nav className="flex flex-col gap-8 text-lg font-medium text-neutral-800 dark:text-neutral-100">
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-[rgba(182,138,58,0.9)] transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="hover:text-[rgba(182,138,58,0.9)] transition-colors"
                >
                  About
                </a>

                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="hover:text-[rgba(182,138,58,0.9)] transition-colors flex items-center gap-2"
                  >
                    <span>Instagram</span>
                    <Instagram className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

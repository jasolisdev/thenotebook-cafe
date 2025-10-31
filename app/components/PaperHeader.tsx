"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  instagramUrl?: string;
};

export default function PaperHeader({ instagramUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top band content inside the sheet */}
      <div className="header">
        {/* Brand (logo + name) */}
        <a href="/" className="brand">
          <Image
            src="/logo.png"
            alt="The Notebook Café"
            width={28}
            height={28}
            className="rounded-full shadow-sm"
            priority
          />
          <span>The Notebook Café</span>
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <a className="nav-link" href="/">
            Home
          </a>
          <a className="nav-link" href="/about">
            About
          </a>
          {instagramUrl && (
            <a
              className="nav-link"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          )}
        </nav>

        {/* Mobile burger (morphs to X) */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className={`icon-btn burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-lines">
            <span />
          </span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Inside X button (same style as burger) */}
        <button
          aria-label="Close menu"
          className="icon-btn drawer-close"
          onClick={() => setOpen(false)}
        >
          <span className="drawer-x" />
        </button>

        <nav className="drawer-nav">
          <a href="/" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="/about" onClick={() => setOpen(false)}>
            About
          </a>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Instagram
            </a>
          )}
        </nav>
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";

export default function StoryLink() {
  return (
    <Link
      href="/story"
      className="relative inline-block pb-1 uppercase text-xs tracking-[0.2em] font-semibold text-cafe-tan transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-cafe-black hover:after:scale-x-100"
    >
      Read Our Story
    </Link>
  );
}

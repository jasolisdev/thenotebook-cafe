"use client";

import Link from "next/link";

export default function StoryLink() {
  return (
    <Link
      href="/story"
      className="uppercase text-xs tracking-widest font-semibold pb-1 transition-colors inline-block text-cafe-tan border-b border-cafe-tan hover:text-cafe-black hover:border-cafe-black"
    >
      Read Our Riverside Story
    </Link>
  );
}

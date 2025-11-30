"use client";

import Link from "next/link";

export default function StoryLink() {
  return (
    <Link
      href="/story"
      className="uppercase text-xs tracking-widest font-semibold pb-1 transition-colors inline-block"
      style={{ color: '#A48D78', borderBottom: '1px solid #A48D78' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#2C2420';
        e.currentTarget.style.borderBottomColor = '#2C2420';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#A48D78';
        e.currentTarget.style.borderBottomColor = '#A48D78';
      }}
    >
      Read Our Story
    </Link>
  );
}

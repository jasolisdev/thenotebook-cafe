"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/menu"
        className="px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors duration-300"
        style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A48D78'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2C2420'}
      >
        View Menu
      </Link>
      <Link
        href="/contact"
        className="px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors duration-300"
        style={{ border: '1px solid #4A3B32', backgroundColor: 'transparent', color: '#2C2420' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4A3B32';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#2C2420';
        }}
      >
        Visit Us
      </Link>
    </div>
  );
}

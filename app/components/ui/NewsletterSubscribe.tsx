"use client";

import { useState } from "react";

/**
 * Newsletter Subscription Form Component
 *
 * Email subscription form for the "Stay in the Loop" section
 */
export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [borderColor, setBorderColor] = useState("rgba(237, 231, 216, 0.3)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-6 py-4 text-base border-2 rounded-sm focus:outline-none transition-all duration-300"
        style={{
          borderColor: borderColor,
          color: 'var(--cafe-cream)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          boxShadow: borderColor === 'var(--cafe-tan)' ? '0 0 0 3px rgba(164, 141, 120, 0.15)' : 'none',
        }}
        onFocus={() => setBorderColor('var(--cafe-tan)')}
        onBlur={() => setBorderColor('rgba(237, 231, 216, 0.25)')}
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 text-xs md:text-sm uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-lg whitespace-nowrap"
        style={{
          backgroundColor: 'var(--cafe-black)',
          color: 'var(--cafe-white)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          borderRadius: '4px',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%), var(--cafe-black)',
        }}
      >
        <span>Subscribe</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}

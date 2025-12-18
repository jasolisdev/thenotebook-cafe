"use client";

import React from 'react';
import { MapPin } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-24 bg-cafe-white border-t border-cafe-luxe-oat/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
         <span className="text-[10px] uppercase tracking-[0.4em] text-cafe-tan-dark font-bold block mb-8 italic">Stay Connected</span>
         <h2 className="text-4xl md:text-6xl font-serif mb-8 italic tracking-tight text-cafe-black">The Story Continues.</h2>
         <p className="text-xl font-light text-cafe-black/60 max-w-2xl mx-auto mb-16 leading-relaxed">
           Sign up to receive notes from the shop, seasonal menu previews, and invitations to our local Riverside gatherings. No clutter, just craft.
         </p>
         
         <form 
           className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-6" 
           onSubmit={(e) => e.preventDefault()}
         >
            <div className="relative w-full group">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full bg-transparent border-b border-cafe-black/20 py-4 focus:border-cafe-black focus:outline-none transition-colors text-lg font-light text-center sm:text-left text-cafe-black"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cafe-black transition-all duration-500 group-focus-within:w-full" />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto px-12 py-5 bg-cafe-black text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-cafe-brown transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
         </form>
         
         <p className="mt-8 text-[9px] text-cafe-black/30 uppercase tracking-widest">
           No spam. Only hand-crafted updates.
         </p>

         <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 text-xs md:text-sm uppercase tracking-[0.2em] opacity-70 text-cafe-black/70">
            <a
              href="https://instagram.com/thenotebookcafellc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-100 hover:text-cafe-brown transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              thenotebookcafellc
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Riverside, CA
            </div>
         </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

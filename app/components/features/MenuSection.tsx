"use client";

import React from 'react';
import Link from 'next/link';
import { MENU_ITEMS as ALL_MENU_ITEMS } from '@/app/constants';

// Select specific featured items from the real menu (Meals & Desserts)
const FEATURED_IDS = ['33', '36', '29', '41', '31', '39'];
const FEATURED_ITEMS = ALL_MENU_ITEMS.filter(item => FEATURED_IDS.includes(item.id));

const MenuSection: React.FC = () => {
  return (
    <section id="menu" className="py-24 bg-cafe-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cafe-tan-dark font-bold block mb-4">The Selection</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-cafe-black">Featured Items</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {FEATURED_ITEMS.map((item) => (
            <div key={item.id} className="group cursor-default">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold font-serif text-cafe-black group-hover:text-cafe-tan-dark transition-colors">{item.name}</h3>
                <div className="flex-grow mx-4 border-b border-cafe-luxe-oat/40" />
                <span className="font-medium text-cafe-black">{item.price}</span>
              </div>
              <p className="text-cafe-black/60 text-sm leading-relaxed max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/menu" className="group flex items-center space-x-4 px-10 py-4 border border-cafe-black/20 hover:border-cafe-black transition-all duration-300 text-cafe-black">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold">View Our Full Menu</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBagIcon, MenuIcon, XMarkIcon } from './ui/Icons';
import { useCart } from '../context/CartContext';

export const SiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, count } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/story' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-latte-50/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="relative z-10 flex flex-col items-center group">
            <span className="font-display text-3xl font-bold text-latte-900 tracking-tight">Milli</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-latte-400 font-bold group-hover:text-latte-900 transition-colors">Coffee Shop</span>
          </Link>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`
                  px-5 py-2 rounded-full text-sm font-display font-semibold transition-all
                  ${location.pathname === link.path 
                    ? 'bg-latte-200 text-latte-900' 
                    : 'text-latte-800 hover:bg-latte-100 hover:text-latte-900'}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={openCart} 
              className="relative p-3 rounded-full bg-latte-900 text-latte-50 hover:bg-latte-800 transition-colors shadow-md hover:shadow-lg active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-latte-400 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-latte-50">
                  {count}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-latte-900 hover:bg-latte-100 rounded-full"
            >
              {isMobileMenuOpen ? <XMarkIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-latte-50 transition-transform duration-500 md:hidden pt-24 px-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-display font-bold text-latte-900 hover:text-latte-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-auto pb-10">
           <img src="https://illustrations.popsy.co/amber/surr-coffee-break.svg" alt="Decoration" className="w-48 mx-auto opacity-50" />
        </div>
      </div>
    </>
  );
};
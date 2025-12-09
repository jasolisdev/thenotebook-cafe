import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#story' },
    { name: 'AI Barista', href: '#barista' },
    { name: 'Location', href: '#footer' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-coffee-50/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`p-2 rounded-full transition-colors duration-300 ${isScrolled ? 'bg-coffee-200 text-coffee-800' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
            <Coffee className="w-6 h-6" />
          </div>
          <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-coffee-900' : 'text-white'}`}>
            Velvet Bean
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-coffee-500 ${
                isScrolled ? 'text-coffee-800' : 'text-coffee-100 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            isScrolled 
              ? 'bg-coffee-800 text-white hover:bg-coffee-700' 
              : 'bg-white text-coffee-900 hover:bg-coffee-100'
          }`}>
            <ShoppingBag className="w-4 h-4" />
            Order
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-coffee-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
             <X className={`w-8 h-8 ${isScrolled ? 'text-coffee-900' : 'text-white'}`} />
          ) : (
             <Menu className={`w-8 h-8 ${isScrolled ? 'text-coffee-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-coffee-50 border-t border-coffee-200 p-6 shadow-xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-coffee-800 text-lg font-serif font-medium py-2 border-b border-coffee-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full mt-2 bg-coffee-800 text-white py-3 rounded-lg font-medium flex justify-center items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Order Online
          </button>
        </div>
      )}
    </nav>
  );
};
import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee } from 'lucide-react';
import { NavItem, PageView } from '../types';
import { APP_NAME, NAVIGATION_ITEMS } from '../constants';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-8 pt-4 md:pt-6 ${
          isScrolled ? 'pt-2' : ''
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-4 rounded-full transition-all duration-500 ${
            isScrolled || isMobileMenuOpen 
              ? 'bg-cream/80 backdrop-blur-md shadow-lg border border-terra-100' 
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group z-50"
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <span className={`font-serif text-2xl font-bold tracking-wide transition-colors duration-300 ${isMobileMenuOpen ? 'text-terra-900' : 'text-terra-900'}`}>
              Terra<span className="font-light italic">&</span>Bean
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  currentPage === item.view 
                    ? 'bg-terra-800 text-terra-100' 
                    : 'text-terra-900 hover:bg-terra-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-terra-800 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cream z-40 transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center space-y-8">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                setIsMobileMenuOpen(false);
              }}
              className={`font-serif text-4xl transition-all duration-300 ${
                currentPage === item.view ? 'text-terra-600 italic' : 'text-charcoal hover:text-terra-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
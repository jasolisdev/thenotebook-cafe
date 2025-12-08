import React from 'react';
import { Link } from 'react-router-dom';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-latte-900 text-latte-100 relative pt-20 pb-12">
      
      {/* Wavy Top Border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-16 fill-latte-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block mb-6">
             <span className="font-display text-4xl font-bold text-white">Milli.</span>
          </Link>
          <p className="font-sans text-latte-200 leading-relaxed max-w-sm">
            A cozy corner for coffee lovers. We brew memories, one cup at a time. Come visit us and taste the difference.
          </p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-white mb-6">Links</h3>
          <ul className="space-y-3 font-sans">
            <li><Link to="/menu" className="hover:text-latte-400 transition-colors">Our Menu</Link></li>
            <li><Link to="/story" className="hover:text-latte-400 transition-colors">About Us</Link></li>
            <li><Link to="/events" className="hover:text-latte-400 transition-colors">Events</Link></li>
            <li><Link to="/contact" className="hover:text-latte-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-white mb-6">Socials</h3>
          <ul className="space-y-3 font-sans">
            <li><a href="#" className="hover:text-latte-400 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-latte-400 transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-latte-400 transition-colors">Twitter</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-latte-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-latte-300">
        <p>© 2024 Milli Coffee Shop. All rights reserved.</p>
        <p>Made with 🤍 in Riverside.</p>
      </div>
    </footer>
  );
};
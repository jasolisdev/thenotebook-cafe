import React from 'react';
import { Instagram, Facebook, Twitter, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-coffee-900 text-coffee-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="w-6 h-6 text-coffee-400" />
              <span className="font-serif text-2xl font-bold text-white">Velvet Bean</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Crafting moments of clarity and connection through exceptional coffee.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#barista" className="hover:text-white transition-colors">AI Barista</a></li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Visit Us</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>123 Artisan Avenue</li>
              <li>Design District, NY 10012</li>
              <li className="pt-2">Mon-Fri: 7am - 7pm</li>
              <li>Sat-Sun: 8am - 6pm</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="text-white font-serif text-lg mb-6">Stay Connected</h4>
             <p className="text-xs mb-4 opacity-70">Join our newsletter for brewing tips and events.</p>
             <div className="flex">
               <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border-none outline-none text-white px-4 py-2 text-sm w-full rounded-l-sm focus:bg-white/20 transition-colors"
               />
               <button className="bg-coffee-500 text-white px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-coffee-600 transition-colors rounded-r-sm">
                 Join
               </button>
             </div>
             <div className="flex gap-4 mt-6">
               <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
               <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
               <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
          <p>&copy; 2024 Velvet Bean Coffee Co. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};
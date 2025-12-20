import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-terra-900 text-terra-100 pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-terra-800 pb-16">
          <div className="md:col-span-2">
            <h4 className="font-serif text-3xl mb-6">Stay Grounded.</h4>
            <p className="font-sans text-terra-200/60 max-w-sm mb-8 leading-relaxed">
              Join our newsletter for brewing guides, new origin drops, and invitations to our sunset tasting events.
            </p>
            <div className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-terra-700 w-full py-2 focus:outline-none focus:border-terra-300 transition-colors placeholder-terra-700"
              />
              <button className="text-terra-300 hover:text-white transition-colors">
                <ArrowUpRight />
              </button>
            </div>
          </div>

          <div>
            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-terra-500 mb-6">Explore</span>
            <ul className="space-y-4 font-serif text-xl">
              <li><a href="#" className="hover:text-terra-300 transition-colors hover:italic">Menu</a></li>
              <li><a href="#" className="hover:text-terra-300 transition-colors hover:italic">Our Story</a></li>
              <li><a href="#" className="hover:text-terra-300 transition-colors hover:italic">Careers</a></li>
              <li><a href="#" className="hover:text-terra-300 transition-colors hover:italic">Wholesale</a></li>
            </ul>
          </div>

          <div>
            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-terra-500 mb-6">Visit</span>
            <ul className="space-y-4 font-sans text-sm text-terra-200/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>123 Bohemian Grove<br/>Arts District, CA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@terraandbean.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
               <Instagram className="w-5 h-5 cursor-pointer hover:text-terra-300 transition-colors" />
               <Facebook className="w-5 h-5 cursor-pointer hover:text-terra-300 transition-colors" />
               <Twitter className="w-5 h-5 cursor-pointer hover:text-terra-300 transition-colors" />
            </div>
          </div>
        </div>

        {/* Big Text */}
        <div className="w-full overflow-hidden">
          <h1 className="font-serif text-[12vw] leading-none text-center text-terra-800 select-none whitespace-nowrap tracking-tighter hover:text-terra-700 transition-colors duration-700 cursor-default">
            TERRA & BEAN
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-terra-800 text-xs text-terra-500 font-sans uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Terra & Bean</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
          alt="Coffee Shop Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-coffee-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm animate-fade-in-up">
          Est. 2024
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8 drop-shadow-lg">
          Brewed for the <br />
          <span className="italic font-light text-coffee-200">Dreamers</span>
        </h1>
        <p className="text-coffee-100 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Experience coffee in its purest form. Ethically sourced beans, 
          roasted with passion, and served in a space designed for pause.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#menu" className="px-8 py-4 bg-white text-coffee-900 text-sm font-bold uppercase tracking-widest hover:bg-coffee-100 transition-colors duration-300 min-w-[160px]">
            View Menu
          </a>
          <a href="#barista" className="px-8 py-4 border border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 min-w-[160px]">
             Ask Barista
          </a>
        </div>
      </div>

      {/* Decorative Bottom Edge (Torn Paper Effect simulation via SVG) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-coffee-50"
          ></path>
        </svg>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/50">
          <ArrowDown size={24} />
      </div>
    </div>
  );
};
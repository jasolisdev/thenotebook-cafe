import React from 'react';
import { Button } from '../components/Button';
import { PageView } from '../types';
import { ArrowRight, ArrowDown, Star, Coffee } from 'lucide-react';

interface HomeProps {
  setPage: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="animate-fade-in bg-cream">
      
      {/* Editorial Hero */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           {/* Abstract organic shapes */}
           <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-terra-200/30 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-sage-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-serif text-[15vw] lg:text-[10rem] leading-[0.8] text-terra-900 tracking-tighter">
              SLOW <br/> <span className="italic text-terra-500 ml-16 md:ml-32">Down</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-charcoal/80 max-w-md ml-auto leading-relaxed mt-8">
              Artisanal coffee for the <span className="italic font-serif text-3xl">wild spirit</span>. 
              Sourced with conscience, brewed with patience.
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center ml-auto max-w-md pt-8">
              <Button onClick={() => setPage('menu')} size="lg">Explore Menu</Button>
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setPage('story')}>
                <span className="font-sans text-sm font-bold uppercase tracking-widest text-terra-800 border-b border-transparent group-hover:border-terra-800 transition-all">Our Story</span>
                <ArrowRight size={16} className="text-terra-800 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] w-full">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden rotate-3 shadow-2xl transition-transform hover:rotate-0 duration-700">
              <img 
                src="https://picsum.photos/800/1200?random=1" 
                alt="Latte Art" 
                className="w-full h-full object-cover"
              />
            </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs rotate-[-6deg]">
               <p className="font-serif text-lg italic text-terra-800">"The Honey Lavender Latte is basically a hug in a mug."</p>
               <div className="flex gap-1 mt-2 text-terra-500">
                 <Star size={12} fill="currentColor" />
                 <Star size={12} fill="currentColor" />
                 <Star size={12} fill="currentColor" />
                 <Star size={12} fill="currentColor" />
                 <Star size={12} fill="currentColor" />
               </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-terra-300" />
        </div>
      </header>

      {/* Marquee */}
      <div className="bg-terra-900 py-6 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">Single Origin</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">Ethically Sourced</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">House-Made Syrups</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">Fresh Pastries</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
           <span className="text-terra-100 font-serif text-4xl mx-8 italic">Single Origin</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">Ethically Sourced</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">House-Made Syrups</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
          <span className="text-terra-100 font-serif text-4xl mx-8 italic">Fresh Pastries</span>
          <span className="text-terra-500 font-sans text-2xl mx-8">•</span>
        </div>
      </div>

      {/* Sticky Scroll Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="lg:sticky lg:top-32 h-fit">
            <span className="text-terra-500 font-sans uppercase tracking-widest text-sm font-bold block mb-4">The Ritual</span>
            <h2 className="font-serif text-6xl md:text-7xl text-terra-900 mb-8 leading-none">
              Brewed for <br/> <span className="italic text-terra-600">Connection</span>
            </h2>
            <p className="font-sans text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              We believe in the power of a quiet moment. Our space is designed as a sanctuary from the noise—a place where the wifi is strong, but the community is stronger.
            </p>
            <Button variant="outline" onClick={() => setPage('story')}>Read the Philosophy</Button>
          </div>

          <div className="space-y-12">
            <div className="group relative overflow-hidden rounded-[2rem]">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
               <img src="https://picsum.photos/600/800?random=2" alt="Interior" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute bottom-8 left-8 z-20 text-white">
                 <h3 className="font-serif text-3xl">The Space</h3>
                 <p className="font-sans text-sm opacity-80 mt-2">Designed for dreamers.</p>
               </div>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] lg:ml-20">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
               <img src="https://picsum.photos/600/800?random=3" alt="Roasting" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute bottom-8 left-8 z-20 text-white">
                 <h3 className="font-serif text-3xl">The Roast</h3>
                 <p className="font-sans text-sm opacity-80 mt-2">Small batch, always fresh.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / CTA */}
      <section className="bg-sage-600 text-cream py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative z-10">
          <div>
            <div className="inline-block bg-sage-500/50 rounded-full p-4 mb-8">
              <Coffee size={32} />
            </div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
              Let us pick your <br/><span className="italic opacity-80">perfect cup.</span>
            </h2>
            <p className="font-sans text-xl opacity-90 mb-10 max-w-md">
              Indecisive? Our AI Barista knows the menu inside and out. Tell it your mood, and sip something new.
            </p>
            <Button className="bg-cream text-sage-600 hover:bg-white border-0" onClick={() => setPage('menu')}>Try AI Barista</Button>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-full border border-white/20 p-8 animate-spin-slow">
                <div className="w-full h-full rounded-full border border-white/20 p-8">
                  <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/800/800?random=4)'}}></div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream text-sage-600 rounded-full w-24 h-24 flex items-center justify-center font-serif text-xl font-bold shadow-xl z-20">
               Tasty
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};
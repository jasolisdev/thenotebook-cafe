import React from 'react';
import { Reveal } from '../components/ui/Reveal';

export const Story: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-latte-50">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <Reveal>
           <span className="font-display font-bold text-latte-400 text-sm uppercase tracking-widest mb-4 block">About Us</span>
           <h1 className="font-display text-5xl md:text-7xl font-bold text-latte-900 mb-8">
             Brewing Happiness.
           </h1>
           <div className="w-24 h-2 bg-latte-200 rounded-full mx-auto"></div>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <Reveal>
             <div className="relative">
               <div className="absolute inset-0 bg-latte-200 rounded-[3rem] rotate-3 transform"></div>
               <img 
                 src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" 
                 className="relative w-full rounded-[3rem] shadow-xl z-10"
                 alt="Cafe Interior"
               />
             </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="md:pl-10">
              <h2 className="font-display text-3xl font-bold text-latte-900 mb-6">A Cozy Escape.</h2>
              <p className="font-sans text-lg text-latte-800 leading-relaxed mb-6">
                Milli started as a small dream to create the most comfortable corner in Riverside. We believe that coffee isn't just a drink—it's a hug in a mug.
              </p>
              <p className="font-sans text-lg text-latte-800 leading-relaxed">
                Our space is designed with soft curves, warm lighting, and comfy chairs that invite you to stay for hours. Whether you're reading a book or catching up with a friend, you're home here.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-lg border border-latte-100 text-center">
           <Reveal>
             <h2 className="font-display text-3xl font-bold text-latte-900 mb-12">Our Values</h2>
           </Reveal>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <Reveal delay={0.1}>
               <div>
                 <div className="w-20 h-20 bg-latte-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🌱</div>
                 <h3 className="font-display font-bold text-xl text-latte-900 mb-2">Sustainable</h3>
                 <p className="text-latte-800">Ethically sourced beans that support farmers.</p>
               </div>
             </Reveal>
             <Reveal delay={0.2}>
               <div>
                 <div className="w-20 h-20 bg-latte-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🤝</div>
                 <h3 className="font-display font-bold text-xl text-latte-900 mb-2">Community</h3>
                 <p className="text-latte-800">A place where everyone knows your name.</p>
               </div>
             </Reveal>
             <Reveal delay={0.3}>
               <div>
                 <div className="w-20 h-20 bg-latte-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎨</div>
                 <h3 className="font-display font-bold text-xl text-latte-900 mb-2">Creativity</h3>
                 <p className="text-latte-800">Supporting local artists and musicians.</p>
               </div>
             </Reveal>
           </div>
        </div>

      </div>
    </div>
  );
};
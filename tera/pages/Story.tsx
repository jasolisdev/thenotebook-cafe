import React from 'react';
import { PageHero } from '../components/PageHero';

export const Story: React.FC = () => {
  return (
    <div className="animate-fade-in bg-cream">
      <PageHero 
        title="Our Roots" 
        subtitle="From soil to soul." 
        image="https://picsum.photos/1920/1080?random=4"
        height="large"
      />

      {/* Intro Block */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
           <div className="md:col-span-4 sticky top-32">
              <h2 className="font-serif text-5xl md:text-7xl text-terra-900 mb-6 leading-[0.9]">
                Not Just <br/> <span className="italic text-terra-500">Coffee</span>.
              </h2>
              <div className="w-20 h-1 bg-terra-800 mb-8"></div>
           </div>
           <div className="md:col-span-8">
              <p className="font-serif text-3xl md:text-4xl text-terra-800 leading-tight mb-12">
                "Terra & Bean was born in a small notebook during a backpacking trip through the lush coffee regions of Costa Rica."
              </p>
              <div className="columns-1 md:columns-2 gap-12 font-sans text-gray-600 leading-relaxed text-lg space-y-6">
                <p>
                  It started with a simple idea: coffee should slow you down, not just speed you up. 
                  We wanted to bring that sense of connection—to the earth, to the farmers, and to each other—back home.
                </p>
                <p>
                  We roast in small batches. We bake from scratch every morning. We believe that aesthetics aren't just about how things look, but how they make you feel.
                </p>
                <p>
                  Our "Boho" style isn't a trend; it's a reflection of our eclectic community and our desire to stay grounded in natural materials and honest ingredients.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="py-12 overflow-hidden">
        <div className="flex gap-8 -ml-20 animate-marquee hover:[animation-play-state:paused]">
           {[1,2,3,4,5].map((i) => (
             <div key={i} className="w-[30vw] h-[40vh] flex-shrink-0">
               <img src={`https://picsum.photos/600/800?random=${i + 10}`} className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
             </div>
           ))}
             {[1,2,3,4,5].map((i) => (
             <div key={`dup-${i}`} className="w-[30vw] h-[40vh] flex-shrink-0">
               <img src={`https://picsum.photos/600/800?random=${i + 10}`} className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
             </div>
           ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h3 className="font-serif text-4xl md:text-6xl text-terra-900 mb-8">A Place for You</h3>
        <p className="font-sans text-xl text-gray-600 leading-relaxed mb-12">
           Today, Terra & Bean is more than a coffee shop. It's a gathering place for dreamers, creators, and neighbors. 
           Whether you're here for the Wi-Fi or the single-origin pour-over, you are part of our story.
        </p>
        <img src="https://picsum.photos/1200/600?random=20" alt="Coffee Shop Interior" className="w-full rounded-[2rem] shadow-xl" />
      </section>
    </div>
  );
};
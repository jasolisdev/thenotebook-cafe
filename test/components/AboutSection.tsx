import React from 'react';
import { Clock, MapPin, Wifi } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
             <h2 className="text-sm font-bold tracking-widest text-coffee-600 uppercase mb-3">Our Story</h2>
             <h3 className="text-4xl md:text-5xl font-serif text-coffee-900 mb-6">More than just caffeine.</h3>
             <p className="text-coffee-700 leading-relaxed mb-6 font-light text-lg">
               Velvet Bean began in a small garage with a 5kg roaster and a big dream: to slow down the world, one cup at a time. We believe coffee is a ritual, not a routine.
             </p>
             <p className="text-coffee-700 leading-relaxed mb-10 font-light text-lg">
               Our beans are direct-trade, ensuring farmers get paid fairly. Our milk is locally sourced. Our space is designed for you to think, create, and connect.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                   <Clock className="w-6 h-6 text-coffee-500" />
                   <h4 className="font-serif font-bold text-coffee-900">Slow Bar</h4>
                   <p className="text-sm text-coffee-600">Pour-overs take time. Taste the difference.</p>
                </div>
                <div className="flex flex-col gap-2">
                   <MapPin className="w-6 h-6 text-coffee-500" />
                   <h4 className="font-serif font-bold text-coffee-900">Local Origins</h4>
                   <p className="text-sm text-coffee-600">Beans roasted right here in the city.</p>
                </div>
                <div className="flex flex-col gap-2">
                   <Wifi className="w-6 h-6 text-coffee-500" />
                   <h4 className="font-serif font-bold text-coffee-900">Creative Space</h4>
                   <p className="text-sm text-coffee-600">Fast wifi, plenty of outlets, good vibes.</p>
                </div>
             </div>
          </div>

          {/* Image Grid */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1442512595367-f2d30a2919d3?q=80&w=1000&auto=format&fit=crop" 
                alt="Latte Art" 
                className="w-full h-80 object-cover rounded-lg mt-12"
              />
              <img 
                src="https://images.unsplash.com/photo-1507133750069-775b0f0053b3?q=80&w=1000&auto=format&fit=crop" 
                alt="Coffee Shop Interior" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
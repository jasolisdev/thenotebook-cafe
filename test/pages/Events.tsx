import React from 'react';
import { EVENTS } from '../data';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';

export const Events: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-latte-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-latte-900 mb-4">Gallery & Events</h1>
            <p className="text-latte-800 font-sans text-lg">Join us for cozy gatherings and workshops.</p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {EVENTS.map((event, idx) => (
            <Reveal key={event.id} delay={idx * 0.1}>
              <div className="group bg-white rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-latte-100 shadow-sm hover:shadow-xl transition-all duration-300">
                
                {/* Date Badge */}
                <div className="w-24 h-24 bg-latte-100 rounded-[1.5rem] flex flex-col items-center justify-center shrink-0 group-hover:bg-latte-900 group-hover:text-white transition-colors">
                  <span className="font-display font-bold text-sm uppercase">{event.date.split(' ')[0]}</span>
                  <span className="font-display font-bold text-3xl">{event.date.split(' ')[1]}</span>
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left">
                   <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                     <span className="px-3 py-1 bg-latte-50 rounded-full font-display font-bold text-xs uppercase text-latte-400 border border-latte-200">
                       {event.type}
                     </span>
                     <span className="px-3 py-1 bg-latte-50 rounded-full font-display font-bold text-xs text-latte-800 border border-latte-200">
                       {event.time}
                     </span>
                   </div>
                   <h3 className="font-display font-bold text-2xl text-latte-900 mb-2">
                     {event.title}
                   </h3>
                   <p className="font-sans text-latte-800 leading-relaxed">
                     {event.description}
                   </p>
                </div>

                {/* Action */}
                <div className="shrink-0">
                  <Button variant="primary" className="rounded-2xl">I'll be there!</Button>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
};
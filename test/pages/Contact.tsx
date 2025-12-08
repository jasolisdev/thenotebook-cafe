import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '../components/ui/Icons';

export const Contact: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-latte-50 pb-20">
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1">
            <Reveal>
               <h1 className="font-display text-5xl md:text-7xl font-bold text-latte-900 mb-8 leading-tight">
                 Let's meet <br/> for coffee!
               </h1>
            </Reveal>

            <div className="space-y-8">
               <Reveal delay={0.1}>
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-latte-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-latte-100 rounded-full flex items-center justify-center text-latte-900 shrink-0">
                      <MapPinIcon />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-latte-900 mb-1">Visit Us</h3>
                      <p className="text-latte-800">123 Riverside Avenue<br/>Riverside, CA 90210</p>
                    </div>
                 </div>
               </Reveal>

               <Reveal delay={0.2}>
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-latte-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-latte-100 rounded-full flex items-center justify-center text-latte-900 shrink-0">
                      <MailIcon />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-latte-900 mb-1">Get in Touch</h3>
                      <p className="text-latte-800">hello@millicoffee.com</p>
                      <p className="text-latte-800">(555) 123-4567</p>
                    </div>
                 </div>
               </Reveal>

               <Reveal delay={0.3}>
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-latte-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-latte-100 rounded-full flex items-center justify-center text-latte-900 shrink-0">
                      <ClockIcon />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-latte-900 mb-1">Open Hours</h3>
                      <div className="grid grid-cols-2 gap-x-8 text-latte-800">
                         <span>Mon-Fri</span><span>07:00 — 19:00</span>
                         <span>Sat-Sun</span><span>08:00 — 20:00</span>
                      </div>
                    </div>
                 </div>
               </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2 h-full min-h-[400px]">
             <Reveal delay={0.2}>
               <div className="relative w-full h-full min-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                 <img 
                   src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop" 
                   className="absolute inset-0 w-full h-full object-cover"
                   alt="Map Location"
                 />
                 <div className="absolute inset-0 bg-latte-900/10 hover:bg-transparent transition-colors"></div>
                 <div className="absolute bottom-8 left-8 right-8">
                   <Button fullWidth size="lg" className="shadow-xl">
                     Get Directions
                   </Button>
                 </div>
               </div>
             </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
};
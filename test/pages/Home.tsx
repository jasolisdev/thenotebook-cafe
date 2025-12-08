import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Marquee } from '../components/ui/Marquee';
import { 
  CoffeeIcon, ZapIcon, HeartIcon, MusicNoteIcon, 
  ArmchairIcon, WifiIcon, MailIcon, StarIcon, SparklesIcon 
} from '../components/ui/Icons';

// Data from provided content
const signaturePours = [
  {
    name: "Iced Brown Sugar Oat",
    description: "Caramelized brown sugar layered with velvety oat milk and slow-steeped espresso.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Matcha Cloud",
    description: "Ceremonial grade matcha poured over cold foam for a soft, cloudlike finish.",
    image: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Classic Cold Brew",
    description: "18-hour brew for a chocolatey, low-acid sip served over crystal-clear ice.",
    image: "https://images.unsplash.com/photo-1461023058943-716c7f0aa4c8?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Espresso Tonic",
    description: "Bright espresso lifted by artisanal tonic, citrus oils, and a crack of ice.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
  }
];

const atmosphereFeatures = [
  {
    title: "Fiber Optic Wi-Fi",
    description: "Gigabit speeds for heavy workflows.",
    icon: WifiIcon
  },
  {
    title: "Power Everywhere",
    description: "Outlets at every single seat.",
    icon: ZapIcon
  },
  {
    title: "Warm Ambience",
    description: "2700K lighting for eye comfort.",
    icon: ArmchairIcon
  },
  {
    title: "Acoustics",
    description: "Sound-treated for conversation.",
    icon: MusicNoteIcon
  }
];

const vibeImages = [
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop"
];

export const Home: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-latte-50 overflow-hidden">
      
      {/* 1. HERO SECTION (Layout Preserved) */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6">
        {/* Background Blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-latte-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-latte-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-latte-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text */}
          <div className="text-center md:text-left order-2 md:order-1">
            <Reveal>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-latte-100 text-latte-500 text-xs font-bold uppercase tracking-widest border border-latte-200">
                Est. Riverside 2025
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-latte-900 mb-6 leading-tight">
                Where Every Cup <br/>
                <span className="text-latte-400 italic">Tells a Story</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-sans text-lg text-latte-800 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Come for the coffee, stay for the vibe. A curated sanctuary for writers, dreamers, and you.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link to="/menu">
                <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Check Menu
                </Button>
              </Link>
            </Reveal>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative flex justify-center">
            <div className="relative animate-float">
               {/* Use a coffee cup image with transparent bg */}
               <img 
                 src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop" 
                 alt="Delicious Latte"
                 className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
               />
               
               {/* Decorative Element: Music Vibe Card */}
               <div className="absolute -top-6 -right-12 bg-white/90 backdrop-blur-sm p-4 rounded-[2rem] shadow-xl transform rotate-6 z-20 flex gap-4 items-center border border-latte-100 animate-[float_8s_ease-in-out_infinite_1s]">
                  <div className="w-10 h-10 bg-latte-900 rounded-full flex items-center justify-center text-white shrink-0">
                    <MusicNoteIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-latte-400 block">Now Playing</span>
                    <span className="font-display font-bold text-latte-900 whitespace-nowrap">Lo-Fi Beats</span>
                  </div>
                  {/* Visualizer */}
                  <div className="flex gap-1 items-end h-4 pb-1">
                    <div className="w-1 bg-latte-400 rounded-full animate-equalize" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 bg-latte-400 rounded-full animate-equalize" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 bg-latte-400 rounded-full animate-equalize" style={{ animationDelay: '0.4s' }}></div>
                  </div>
               </div>
               
               {/* Decorative Element: Origin Tag */}
               <div className="absolute bottom-8 -left-8 bg-white p-3 pr-5 rounded-full shadow-lg z-20 flex items-center gap-3 border border-latte-100 animate-[float_7s_ease-in-out_infinite_2s]">
                 <div className="w-10 h-10 bg-latte-100 rounded-full flex items-center justify-center text-latte-900">
                   <CoffeeIcon className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-latte-400 block">Single Origin</span>
                   <span className="font-display font-bold text-latte-900 text-sm">Ethiopia</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* 2. SIGNATURE POURS SECTION */}
      <section className="py-24 bg-latte-100/50 rounded-t-[3rem] -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-latte-400 block mb-2">Signature Pours</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-latte-900">
                Crafted With Care
              </h2>
              <p className="mt-4 text-latte-800 max-w-2xl mx-auto">
                Small-batch recipes we obsess over—balanced, nuanced, and poured with a steady hand.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signaturePours.map((pour, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-latte-50 group">
                  <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 relative">
                    <img src={pour.image} alt={pour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-latte-900 mb-2">{pour.name}</h3>
                  <p className="text-sm text-latte-800 leading-relaxed opacity-80">{pour.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="outline" className="rounded-full">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 relative">
             <Reveal>
               <div className="grid grid-cols-2 gap-4">
                 <img 
                   src="https://images.unsplash.com/photo-1442512595331-e89e7385a861?q=80&w=600&auto=format&fit=crop" 
                   alt="Pastry" 
                   className="w-full h-64 object-cover rounded-[2rem] shadow-lg mt-12"
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop" 
                   alt="Coffee Shop" 
                   className="w-full h-64 object-cover rounded-[2rem] shadow-lg"
                 />
               </div>
               {/* Rating Badge */}
               <div className="absolute -bottom-6 -left-6 bg-latte-900 text-latte-50 p-6 rounded-tr-[2rem] rounded-bl-[2rem] shadow-xl max-w-[200px] z-20">
                  <p className="font-display text-4xl font-bold mb-1">4.9</p>
                  <div className="flex text-latte-400 mb-2 space-x-1">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Customer Rating</p>
               </div>
             </Reveal>
           </div>

           <div className="order-1 lg:order-2 lg:pl-10">
              <Reveal>
                <span className="text-latte-400 font-bold tracking-widest uppercase text-xs mb-4 block">Our Philosophy</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-latte-900 mb-8 leading-tight">
                  Crafted for <br/> <span className="text-latte-400 italic">Creatives</span>
                </h2>
                <div className="w-20 h-2 bg-latte-200 rounded-full mb-8"></div>
                <p className="text-lg text-latte-800 mb-6 leading-relaxed">
                  We believe that great ideas start with great coffee. Whether you're sketching your next masterpiece, writing the next great novel, or just enjoying a moment of silence.
                </p>
                <p className="text-lg text-latte-800 mb-8 leading-relaxed">
                  Our beans are ethically sourced, roasted in small batches, and brewed with precision to fuel your inspiration.
                </p>
                <div className="flex gap-12 border-t border-latte-200 pt-8">
                   <div>
                     <h4 className="font-display text-3xl font-bold text-latte-900">100%</h4>
                     <p className="text-xs uppercase tracking-wider text-latte-500 font-bold mt-1">Organic Beans</p>
                   </div>
                   <div>
                     <h4 className="font-display text-3xl font-bold text-latte-900">Daily</h4>
                     <p className="text-xs uppercase tracking-wider text-latte-500 font-bold mt-1">Fresh Pastries</p>
                   </div>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* 4. LOW LIGHTS SECTION (Dark Mode) */}
      <section className="py-24 px-6 bg-latte-900 text-latte-50 rounded-[3rem] mx-4 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-latte-800 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-latte-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <Reveal>
              <h2 className="font-display text-5xl md:text-6xl leading-tight font-bold">
                Low lights, <br/> good sound, <br/> <span className="text-latte-300 italic">better coffee.</span>
              </h2>
              <div className="w-24 h-1 bg-latte-500 rounded-full mt-6"></div>
              <p className="text-lg text-latte-200 mt-6 leading-relaxed max-w-lg">
                We designed The Notebook Café as a sanctuary for the creatives, the writers, and the dreamers of Riverside. It is not just about the caffeine—it is about the headspace.
              </p>
              <div className="pt-4">
                <Link to="/story" className="inline-flex items-center text-latte-300 font-bold uppercase tracking-widest hover:text-white transition-colors border-b-2 border-latte-300 pb-1">
                  Read Our Story
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="relative">
             <Reveal delay={0.2}>
               <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1507133750069-bef72f3707a9?q=80&w=600&auto=format&fit=crop" className="w-full h-64 object-cover rounded-[2rem] translate-y-8 opacity-80" alt="Dark Vibe" />
                 <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop" className="w-full h-64 object-cover rounded-[2rem] opacity-80" alt="Coffee Pour" />
               </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* 5. THE TRINITY SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-latte-300 to-transparent mb-16"></div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Reveal delay={0.1}>
              <div className="text-center px-4">
                <div className="w-20 h-20 mx-auto bg-white border border-latte-200 rounded-full flex items-center justify-center text-latte-400 mb-6 shadow-sm">
                  <CoffeeIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-latte-900 mb-3">Craft Espresso</h3>
                <p className="text-latte-800 leading-relaxed">Roasted locally, extracted with precision. We respect the bean and the process.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center px-4 relative">
                {/* Dividers for Desktop */}
                <div className="hidden md:block absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-latte-300 to-transparent"></div>
                <div className="hidden md:block absolute right-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-latte-300 to-transparent"></div>
                
                <div className="w-20 h-20 mx-auto bg-white border border-latte-200 rounded-full flex items-center justify-center text-latte-400 mb-6 shadow-sm">
                  <MusicNoteIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-latte-900 mb-3">Curated Sound</h3>
                <p className="text-latte-800 leading-relaxed">Deep house, soul, and lo-fi grooves tuned to keep you in flow.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center px-4">
                <div className="w-20 h-20 mx-auto bg-white border border-latte-200 rounded-full flex items-center justify-center text-latte-400 mb-6 shadow-sm">
                  <ArmchairIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-latte-900 mb-3">Creative Comfort</h3>
                <p className="text-latte-800 leading-relaxed">Cozy seating, warm light, plenty of outlets—stay as long as you need.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. ATMOSPHERE SECTION */}
      <section className="py-24 bg-latte-100/50 rounded-[3rem] overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1">
                 <div className="grid md:grid-cols-2 gap-8">
                    {atmosphereFeatures.map((feat, i) => {
                      const Icon = feat.icon;
                      return (
                        <Reveal key={i} delay={i * 0.1}>
                           <div className="flex gap-4">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-latte-400 shrink-0 shadow-sm">
                               <Icon className="w-6 h-6" />
                             </div>
                             <div>
                               <h4 className="font-display text-lg font-bold text-latte-900 mb-1">{feat.title}</h4>
                               <p className="text-sm text-latte-800 leading-relaxed">{feat.description}</p>
                             </div>
                           </div>
                        </Reveal>
                      )
                    })}
                 </div>
               </div>
               <div className="order-1 lg:order-2 text-right">
                  <Reveal>
                    <span className="text-latte-400 font-bold uppercase tracking-widest text-xs mb-4 block">The Atmosphere</span>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-latte-900 mb-6 leading-tight">
                       Designed for <br/> <span className="text-latte-400 italic">Focus</span>
                    </h2>
                    <p className="text-lg text-latte-800 ml-auto max-w-md leading-relaxed">
                       A sanctuary with warm lighting, deep playlists, and Wi-Fi that never drops. Settle in for an hour or stay all day.
                    </p>
                  </Reveal>
               </div>
            </div>
         </div>

         {/* Vibe Images Strip */}
         <div className="flex gap-6 overflow-x-auto pb-8 px-6 no-scrollbar snap-x">
            {vibeImages.map((src, i) => (
              <div key={i} className="flex-none w-80 md:w-96 aspect-[4/3] rounded-[2rem] overflow-hidden snap-center shadow-md relative group">
                 <img src={src} alt="Vibe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-latte-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
         </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
             <div className="w-16 h-16 bg-latte-100 text-latte-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <MailIcon className="w-8 h-8" />
             </div>
             <h2 className="font-display text-4xl md:text-5xl font-bold text-latte-900 mb-4">Join the Inner Circle</h2>
             <p className="text-latte-800 mb-10">Be the first to know about our grand opening, special tastings, and secret menu items.</p>
             
             <div className="bg-white p-2 rounded-full shadow-lg border border-latte-100 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-3 rounded-full outline-none text-latte-900 placeholder:text-latte-300"
                />
                <Button size="md" className="rounded-full shadow-md">Subscribe</Button>
             </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
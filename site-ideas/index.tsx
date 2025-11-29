import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Coffee,
  Music,
  BookOpen,
  MapPin,
  Clock,
  Instagram,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Calendar,
  Mail,
  Headphones,
  Phone
} from 'lucide-react';

// --- Types ---

type Page = 'home' | 'menu' | 'story' | 'events' | 'contact';
type MenuCategory = 'drinks' | 'meals' | 'desserts';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  tag?: 'new' | 'seasonal' | 'popular';
  image?: string;
}

interface EventItem {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  type: 'music' | 'community' | 'art';
}

// --- Data ---

const MENU_ITEMS: MenuItem[] = [
  // Drinks
  { id: '1', name: 'Notebook Signature Latte', description: 'Espresso, steamed oat milk, house-made honey lavender syrup.', price: '$6.50', category: 'drinks', tag: 'popular', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Riverside Cold Brew', description: 'Slow-steeped 24 hours. Smooth, chocolatey notes. Served over ice.', price: '$5.00', category: 'drinks', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Espresso Tonic', description: 'Double shot espresso over fever-tree tonic water with a rosemary sprig.', price: '$6.00', category: 'drinks', tag: 'seasonal', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Ceremonial Matcha', description: 'Grade A matcha whisked to perfection. Unsweetened or with vanilla.', price: '$6.25', category: 'drinks', image: 'https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&q=80&w=800' },

  // Meals
  { id: '5', name: 'Avocado Toast & Dukkah', description: 'Sourdough, smashed avocado, pistachio dukkah, chili oil, microgreens.', price: '$12.00', category: 'meals', tag: 'popular', image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&q=80&w=800' },
  { id: '6', name: 'Prosciutto & Fig Tartine', description: 'Toasted baguette, goat cheese, prosciutto di parma, fig jam, arugula.', price: '$14.00', category: 'meals', image: 'https://images.unsplash.com/photo-1514792368985-f80e9d482a02?auto=format&fit=crop&q=80&w=800' },
  { id: '7', name: 'Market Bowl', description: 'Quinoa, roasted sweet potato, kale, chickpeas, tahini dressing.', price: '$13.50', category: 'meals', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800' },

  // Desserts
  { id: '8', name: 'Olive Oil Cake', description: 'Moist citrus olive oil cake served with greek yogurt and orange zest.', price: '$7.00', category: 'desserts', tag: 'new', image: 'https://images.unsplash.com/photo-1551024601-bec0273e8a9c?auto=format&fit=crop&q=80&w=800' },
  { id: '9', name: 'Dark Chocolate Croissant', description: 'Flaky pastry filled with 70% dark chocolate valrhona batons.', price: '$5.50', category: 'desserts', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800' },
];

const EVENTS: EventItem[] = [
  { id: '1', date: 'Oct 12', time: '7:00 PM', title: 'Sunday Deep House Sessions', description: 'Resident DJ Marcus spinning vinyl only. Deep, soulful grooves.', type: 'music' },
  { id: '2', date: 'Oct 15', time: '6:00 PM', title: 'Writers\' Block: Open Mic', description: 'Poetry, short stories, and acoustic sets. Sign up at the door.', type: 'community' },
  { id: '3', date: 'Oct 20', time: '10:00 AM', title: 'Latte Art Throwdown', description: 'Local baristas compete. Free entry for spectators.', type: 'community' },
];

// --- Components ---

interface RevealProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

const Navigation = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ page, label }: { page: Page, label: string }) => (
    <button
      onClick={() => { setPage(page); setIsOpen(false); }}
      className={`text-sm tracking-widest uppercase transition-colors duration-300 ${activePage === page ? 'text-cafe-tan font-semibold' : 'text-cafe-brown hover:text-cafe-tan'}`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-cafe-black text-cafe-mist text-xs text-center py-2 tracking-wide">
        OPENING FALL 2024 — RIVERSIDE, CA
      </div>

      <nav className="sticky top-0 z-50 glass-panel border-b border-cafe-beige/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setPage('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-cafe-black text-white flex items-center justify-center rounded-sm font-serif text-xl pt-1 transition-transform group-hover:rotate-3">N</div>
            <span className="font-serif text-2xl tracking-tight text-cafe-black">The Notebook</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <NavLink page="home" label="Home" />
            <NavLink page="menu" label="Menu" />
            <NavLink page="story" label="Story" />
            <NavLink page="events" label="Events" />
            <NavLink page="contact" label="Contact" />
          </div>

          {/* Desktop Social/Action */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-cafe-brown hover:text-cafe-tan transition-colors">
              <Instagram size={20} />
            </a>
            <button className="bg-cafe-tan text-white px-5 py-2 text-xs uppercase tracking-widest rounded-sm hover:bg-cafe-brown transition-colors">
              Follow
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-cafe-black" onClick={() => setIsOpen(true)}>
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] bg-cafe-white transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-cafe-black hover:rotate-90 transition-transform duration-300"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col gap-8 mt-24 items-center">
            <button onClick={() => { setPage('home'); setIsOpen(false); }} className="font-serif text-4xl text-cafe-black hover:text-cafe-tan">Home</button>
            <button onClick={() => { setPage('menu'); setIsOpen(false); }} className="font-serif text-4xl text-cafe-black hover:text-cafe-tan">Menu</button>
            <button onClick={() => { setPage('story'); setIsOpen(false); }} className="font-serif text-4xl text-cafe-black hover:text-cafe-tan">Story</button>
            <button onClick={() => { setPage('events'); setIsOpen(false); }} className="font-serif text-4xl text-cafe-black hover:text-cafe-tan">Events</button>
            <button onClick={() => { setPage('contact'); setIsOpen(false); }} className="font-serif text-4xl text-cafe-black hover:text-cafe-tan">Contact</button>
          </div>

          <div className="mt-auto flex flex-col items-center gap-6">
            <div className="w-12 h-0.5 bg-cafe-beige/50"></div>
            <p className="text-cafe-tan font-sans text-sm tracking-widest">EST. 2024</p>
          </div>

          {/* Decorative */}
          <div className="absolute bottom-12 right-12 opacity-10 pointer-events-none animate-float-slow">
            <Coffee size={120} />
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="bg-cafe-black text-cafe-mist pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2 space-y-6">
        <h3 className="font-serif text-3xl">The Notebook Café</h3>
        <p className="text-cafe-beige/70 font-light max-w-md">
          A space for creatives, thinkers, and coffee lovers.
          Where house music meets premium espresso in the heart of Riverside.
        </p>
        <div className="flex gap-4 pt-4">
          <Instagram className="text-cafe-mist hover:text-cafe-tan cursor-pointer transition-colors" />
          <Headphones className="text-cafe-mist hover:text-cafe-tan cursor-pointer transition-colors" />
          <Mail className="text-cafe-mist hover:text-cafe-tan cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Location</h4>
        <address className="not-italic text-cafe-beige/70 font-light leading-relaxed">
          3512 9th St<br />
          Riverside, CA 92501<br />
          <a href="tel:9518230004" className="hover:text-white transition-colors mt-2 block">(951) 823-0004</a>
        </address>
      </div>

      <div className="space-y-4">
        <h4 className="uppercase text-xs tracking-[0.2em] text-cafe-tan">Hours</h4>
        <div className="text-cafe-beige/70 font-light space-y-1">
          <p><span className="w-12 inline-block">M-Th</span> 6:30am — 4pm</p>
          <p><span className="w-12 inline-block">F-Sa</span> 6:30am — 6pm</p>
          <p><span className="w-12 inline-block">Sun</span> 6:30am — 4pm</p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
      <p>&copy; 2024 The Notebook Café. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const HomeView = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-cafe-mist px-6">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <span className="inline-block text-cafe-tan text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium">Est. Riverside 2024</span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cafe-black leading-[0.9] mb-8">
              Where Every Cup <br />
              <span className="italic text-cafe-tan">Tells a Story</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-cafe-brown/80 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
              Premium coffee, curated house music, and a space designed for the creative mind.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setPage('menu')}
                className="bg-cafe-black text-white px-8 py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-cafe-tan transition-colors duration-300"
              >
                View Menu
              </button>
              <button
                onClick={() => setPage('contact')}
                className="border border-cafe-brown text-cafe-black px-8 py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-cafe-brown hover:text-white transition-colors duration-300"
              >
                Visit Us
              </button>
            </div>
          </Reveal>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 left-10 md:left-20 animate-float-slow opacity-20 pointer-events-none">
          <Coffee size={48} className="text-cafe-tan" />
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-20 animate-float-medium opacity-20 pointer-events-none">
          <Music size={40} className="text-cafe-tan" />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-32 px-6 bg-cafe-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-4 border border-cafe-tan/30 rounded-sm transform rotate-3 transition-transform group-hover:rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000"
                alt="Cafe Interior"
                className="relative rounded-sm shadow-xl grayscale-[20%] contrast-[1.1] w-full h-[500px] object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl text-cafe-black">Not Just a Coffee Shop. <br /><span className="italic text-cafe-tan">A Sanctuary.</span></h2>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-cafe-cream flex items-center justify-center shrink-0">
                    <Coffee size={20} className="text-cafe-brown" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-cafe-black">Craft Espresso</h4>
                    <p className="text-cafe-brown/70 font-light">Roasted locally, extracted with precision. We respect the bean.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-cafe-cream flex items-center justify-center shrink-0">
                    <Music size={20} className="text-cafe-brown" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-cafe-black">Curated Sound</h4>
                    <p className="text-cafe-brown/70 font-light">Deep house, soul, and lo-fi grooves. No Top 40 here.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-cafe-cream flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-cafe-brown" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-cafe-black">Creative Community</h4>
                    <p className="text-cafe-brown/70 font-light">A space designed for you to stay, study, and create.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <button onClick={() => setPage('story')} className="text-cafe-tan uppercase text-xs tracking-widest font-semibold border-b border-cafe-tan pb-1 hover:text-cafe-black hover:border-cafe-black transition-colors">
                Read Our Story
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atmosphere Carousel (Visual only for now) */}
      <section className="py-24 bg-cafe-black text-cafe-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <Reveal>
            <h2 className="font-serif text-4xl">The Vibe</h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </Reveal>
        </div>

        <div className="flex gap-6 px-6 overflow-x-auto scrollbar-hide snap-x pb-8">
          {[
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
          ].map((src, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-[4/5] relative group snap-center rounded-sm overflow-hidden cursor-pointer">
              <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-serif text-xl italic">The Notebook No. {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-cafe-tan/10">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <Mail className="mx-auto mb-6 text-cafe-tan" size={32} />
            <h2 className="font-serif text-3xl md:text-4xl text-cafe-black mb-4">Join the Inner Circle</h2>
            <p className="text-cafe-brown/80 mb-8 font-light">Be the first to know about our grand opening, special tastings, and secret menu items.</p>

            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white border border-cafe-beige px-6 py-4 outline-none focus:border-cafe-tan transition-colors placeholder:text-cafe-beige"
              />
              <button className="bg-cafe-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-cafe-tan transition-colors">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

const MenuView = () => {
  const [activeTab, setActiveTab] = useState<MenuCategory>('drinks');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-cafe-white pb-20">
      {/* Header */}
      <div className="bg-cafe-black text-white py-20 px-6 text-center">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Our Menu</h1>
        <p className="text-cafe-beige font-light max-w-lg mx-auto">Thoughtfully sourced, carefully prepared. We believe in quality over quantity.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8">
        {/* Tabs */}
        <div className="bg-white shadow-lg rounded-sm p-2 flex justify-center gap-2 overflow-x-auto">
          {(['drinks', 'meals', 'desserts'] as MenuCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-sm uppercase text-xs tracking-widest font-semibold transition-all ${activeTab === cat ? 'bg-cafe-tan text-white shadow-md' : 'text-cafe-brown hover:bg-cafe-mist'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mt-16">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <div
                className="group cursor-pointer flex gap-4 items-start"
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2 border-b border-cafe-beige/20 pb-2 group-hover:border-cafe-tan/50 transition-colors">
                    <h3 className="font-serif text-xl text-cafe-black group-hover:text-cafe-tan transition-colors">{item.name}</h3>
                    <span className="font-sans font-medium text-cafe-brown">{item.price}</span>
                  </div>
                  <p className="text-cafe-brown/70 text-sm font-light leading-relaxed">{item.description}</p>
                  {item.tag && (
                    <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-cafe-tan px-2 py-1 bg-cafe-tan/10 rounded-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Seasonal Highlight */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
        <div className="bg-cafe-mist rounded-sm p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center border border-cafe-beige/30">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-cafe-tan">
              <Sparkles size={16} />
              <span className="uppercase text-xs tracking-widest font-bold">Seasonal Special</span>
            </div>
            <h3 className="font-serif text-3xl text-cafe-black">Lavender Honey Oat Latte</h3>
            <p className="text-cafe-brown/80 font-light">
              Our house-made syrup infused with dried lavender buds and organic wildflower honey,
              paired with our signature espresso blend and creamy oat milk.
            </p>
          </div>
          <div className="w-full md:w-1/3 aspect-square rounded-sm overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800" className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cafe-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            {selectedItem.image && (
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 md:p-10 flex-1 relative flex flex-col justify-center">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-cafe-brown hover:text-cafe-tan transition-colors"
              >
                <X size={24} />
              </button>
              <span className="text-cafe-tan text-xs uppercase tracking-widest font-bold mb-2">{selectedItem.category}</span>
              <h3 className="font-serif text-3xl mb-4 text-cafe-black">{selectedItem.name}</h3>
              <p className="text-cafe-brown/80 font-light mb-6 leading-relaxed">{selectedItem.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-serif text-cafe-black">{selectedItem.price}</span>
                <button className="bg-cafe-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-cafe-tan transition-colors">
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StoryView = () => (
  <div className="min-h-screen bg-cafe-white">
    <div className="relative py-24 md:py-32 px-6 bg-cafe-mist">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-7xl text-cafe-black mb-8">Our Story</h1>
        <div className="w-24 h-1 bg-cafe-tan mx-auto"></div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      <Reveal>
        <div className="prose prose-lg mx-auto text-cafe-brown/80 font-light">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-cafe-black first-letter:mr-3 first-letter:float-left">
            It started with a simple observation: Riverside needed a place that felt different.
            Not a quick stop for caffeine, but a destination. A place where the music wasn't an afterthought,
            where the chairs were actually comfortable, and where the coffee was treated with the reverence it deserves.
          </p>
          <p className="mt-6">
            The Notebook Café was born from a love of two things: <strong className="text-cafe-black font-medium">specialty coffee</strong> and <strong className="text-cafe-black font-medium">creative solitude</strong>.
            We wanted to build a space for the writers, the designers, the students, and the dreamers.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <Reveal delay={100}>
          <div className="bg-white p-8 border-t-4 border-cafe-tan shadow-sm h-full">
            <h3 className="font-serif text-2xl mb-4 text-cafe-black">The Coffee</h3>
            <p className="text-sm leading-relaxed text-cafe-brown/70">
              We partner with sustainable, direct-trade roasters who care about the farmers as much as the bean.
              Our espresso is dialed in every morning, ensuring the perfect extraction ratio.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="bg-white p-8 border-t-4 border-cafe-black shadow-sm h-full">
            <h3 className="font-serif text-2xl mb-4 text-cafe-black">The Music</h3>
            <p className="text-sm leading-relaxed text-cafe-brown/70">
              You won't hear Top 40 hits here. We curate daily playlists of deep house, neo-soul, and lo-fi beats
              that provide the perfect backdrop for focus and flow.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="bg-cafe-black text-white p-10 md:p-16 text-center relative overflow-hidden rounded-sm">
          <div className="relative z-10">
            <h3 className="font-serif text-3xl mb-6">"Riverside is growing. We're here to fuel the creativity of this city."</h3>
            <p className="font-sans text-cafe-beige uppercase tracking-widest text-xs">— The Founders</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>
      </Reveal>
    </div>
  </div>
);

const EventsView = () => (
  <div className="min-h-screen bg-cafe-white pb-20">
    <div className="py-24 px-6 text-center bg-cafe-black text-white relative overflow-hidden">
      <div className="relative z-10">
        <span className="text-cafe-tan uppercase tracking-[0.2em] text-xs font-bold">Community</span>
        <h1 className="font-serif text-5xl md:text-7xl mt-4 mb-6">Upcoming Events</h1>
        <p className="text-cafe-beige font-light max-w-xl mx-auto">
          Join us for music, art, and community gatherings.
        </p>
      </div>
      {/* Background abstract shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cafe-tan/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>

    <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 space-y-6">
      {EVENTS.map((event, index) => (
        <Reveal key={event.id} delay={index * 150}>
          <div className="bg-white p-8 shadow-sm border border-cafe-beige/20 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:border-cafe-tan/50 transition-colors">
            {/* Date Badge */}
            <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-cafe-mist rounded-sm text-cafe-black group-hover:bg-cafe-black group-hover:text-cafe-tan transition-colors">
              <span className="text-xs uppercase font-bold tracking-widest">{event.date.split(' ')[0]}</span>
              <span className="font-serif text-2xl">{event.date.split(' ')[1]}</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h3 className="font-serif text-2xl text-cafe-black">{event.title}</h3>
                <span className="hidden md:inline text-cafe-beige">•</span>
                <span className="text-sm font-medium text-cafe-tan uppercase tracking-wider">{event.time}</span>
              </div>
              <p className="text-cafe-brown/70 font-light mb-4">{event.description}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-cafe-black/60">
                {event.type === 'music' && <Music size={14} />}
                {event.type === 'community' && <Coffee size={14} />}
                <span>{event.type}</span>
              </div>
            </div>

            <div className="shrink-0">
              <button className="px-6 py-3 border border-cafe-beige text-cafe-brown text-xs uppercase tracking-widest hover:bg-cafe-black hover:text-white hover:border-cafe-black transition-colors rounded-sm">
                RSVP
              </button>
            </div>
          </div>
        </Reveal>
      ))}

      <div className="text-center pt-12">
        <p className="text-cafe-brown/60 text-sm italic">More events announced weekly. Follow our Instagram for updates.</p>
      </div>
    </div>
  </div>
);

const ContactView = () => (
  <div className="min-h-screen bg-cafe-white">
    {/* Header */}
    <div className="py-24 px-6 bg-cafe-mist text-center">
      <h1 className="font-serif text-5xl md:text-7xl text-cafe-black mb-6">Visit Us</h1>
      <p className="text-cafe-brown/80 font-light max-w-xl mx-auto text-lg">
        Stop by for a cup, stay for the vibe.
      </p>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4 text-cafe-tan">
                <MapPin size={24} />
                <h3 className="uppercase tracking-widest font-bold text-sm">Location</h3>
              </div>
              <address className="not-italic text-cafe-black font-serif text-3xl leading-snug">
                3512 9th St,<br />
                Riverside, CA 92501
              </address>
              <a href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-cafe-tan border-b border-cafe-tan pb-1 text-sm uppercase tracking-wider hover:text-cafe-black hover:border-cafe-black transition-colors">
                Get Directions
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 text-cafe-tan">
                <Phone size={24} />
                <h3 className="uppercase tracking-widest font-bold text-sm">Phone</h3>
              </div>
              <p className="text-cafe-black font-serif text-2xl">
                (951) 823-0004
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white p-10 border border-cafe-beige/20 shadow-sm rounded-sm">
            <div className="flex items-center gap-3 mb-8 text-cafe-tan">
              <Clock size={24} />
              <h3 className="uppercase tracking-widest font-bold text-sm">Business Hours</h3>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-cafe-mist pb-4">
                <span className="font-medium text-cafe-brown">Mon - Thu</span>
                <span className="font-serif text-xl text-cafe-black">06:30am – 04:00pm</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-cafe-mist pb-4">
                <span className="font-medium text-cafe-brown">Fri - Sat</span>
                <span className="font-serif text-xl text-cafe-black">06:30am – 06:00pm</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-cafe-brown">Sun</span>
                <span className="font-serif text-xl text-cafe-black">06:30am – 04:00pm</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="mt-20 w-full h-[400px] bg-cafe-mist rounded-sm overflow-hidden relative group">
          <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" alt="Cafe Location" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <a href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501" target="_blank" rel="noopener noreferrer" className="bg-white text-cafe-black px-6 py-3 uppercase tracking-widest text-xs font-bold rounded-sm shadow-lg hover:bg-cafe-tan hover:text-white transition-colors">View on Map</a>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
);

// --- Main App ---

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView setPage={setCurrentPage} />;
      case 'menu': return <MenuView />;
      case 'story': return <StoryView />;
      case 'events': return <EventsView />;
      case 'contact': return <ContactView />;
      default: return <HomeView setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-cafe-white text-cafe-brown selection:bg-cafe-tan selection:text-white font-sans">
      <Navigation activePage={currentPage} setPage={setCurrentPage} />

      {/* Page Transition Wrapper */}
      <div className="animate-fade-in">
        {renderPage()}
      </div>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

import React, { useState } from 'react';
import { MenuItem } from '../types';

const items: MenuItem[] = [
  { id: 1, name: "Velvet Latte", description: "Our signature espresso with steamed oat milk and agave.", price: "$5.50", category: "Coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Cold Brew Tonic", description: "24-hour steeped cold brew topped with tonic and orange peel.", price: "$6.00", category: "Coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Almond Croissant", description: "Flaky pastry filled with rich almond cream.", price: "$4.50", category: "Bakery", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Matcha Mist", description: "Ceremonial grade matcha with coconut milk.", price: "$6.25", category: "Specialty", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3145?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Avocado Toast", description: "Sourdough, smashed avocado, chili flakes, radish.", price: "$11.00", category: "Specialty", image: "https://images.unsplash.com/photo-1588137372308-15f75323a399?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Espresso Roman", description: "Double shot espresso served with a slice of lemon.", price: "$3.50", category: "Coffee", image: "https://images.unsplash.com/photo-1610889556284-889815ae1c76?q=80&w=1000&auto=format&fit=crop" },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Coffee', 'Bakery', 'Specialty'];
  const filteredItems = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-coffee-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-coffee-600 uppercase mb-3">Our Offerings</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-coffee-900">Crafted for Taste</h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-widest uppercase pb-1 border-b-2 transition-all duration-300 ${
                activeCategory === cat 
                  ? 'border-coffee-800 text-coffee-900 font-semibold' 
                  : 'border-transparent text-coffee-400 hover:text-coffee-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white p-4 pb-6 rounded-sm shadow-sm hover:shadow-lg transition-all duration-500">
              <div className="relative h-64 overflow-hidden mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-coffee-900">
                  {item.price}
                </div>
              </div>
              <div className="text-center px-4">
                <h4 className="text-xl font-serif text-coffee-900 mb-2">{item.name}</h4>
                <p className="text-coffee-600 font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="px-8 py-3 border border-coffee-800 text-coffee-800 uppercase text-xs font-bold tracking-widest hover:bg-coffee-800 hover:text-white transition-all duration-300">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};
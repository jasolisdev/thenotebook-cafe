import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { AiBarista } from '../components/AiBarista';
import { MENU_ITEMS } from '../constants';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'coffee', 'tea', 'bakery', 'seasonal'];
  
  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="animate-fade-in bg-cream min-h-screen">
      <PageHero 
        title="The Menu" 
        subtitle="Curated flavors for every season." 
        image="https://picsum.photos/1920/1080?random=3"
        height="small"
      />

      <div className="max-w-6xl mx-auto px-4 py-24">
        
        {/* AI Barista Section */}
        <div className="mb-24">
          <AiBarista />
        </div>

        {/* Sticky Filters Header */}
        <div className="sticky top-24 z-30 bg-cream/95 backdrop-blur-sm py-6 mb-12 border-b border-terra-100">
           <div className="flex overflow-x-auto scrollbar-hide gap-2 md:justify-center pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-serif text-lg transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-terra-800 text-white shadow-lg transform scale-105' 
                    : 'bg-transparent text-terra-800 hover:bg-terra-100'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="group flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {item.image && (
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-terra-100 relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-sans font-bold text-sm text-terra-800 z-20 shadow-sm">
                    {item.price}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-3xl text-terra-900 group-hover:text-terra-600 transition-colors">{item.name}</h3>
                </div>
                <p className="font-sans text-gray-600 leading-relaxed opacity-90 text-lg font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
            <div className="text-center py-20 text-terra-400 font-serif text-2xl italic">
                Our bakers are working on new recipes for this section.
            </div>
        )}

      </div>
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data';
import { Reveal } from '../components/ui/Reveal';
import { PlusIcon } from '../components/ui/Icons';
import { ProductModal } from '../components/ProductModal';
import { MenuItem } from '../types';
import { Button } from '../components/ui/Button';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'drinks' | 'meals' | 'desserts'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = ['all', 'drinks', 'meals', 'desserts'];

  const filteredItems = useMemo(() => {
    return activeCategory === 'all' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(i => i.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-20 min-h-screen bg-latte-50">
      
      {/* Header */}
      <div className="py-16 md:py-24 text-center px-6 bg-latte-100 rounded-b-[3rem] mb-12">
        <Reveal>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-latte-900 mb-6">Our Menu</h1>
          <p className="max-w-xl mx-auto text-latte-800 font-sans">
            Carefully crafted with love and the finest ingredients.
          </p>
        </Reveal>
      </div>

      {/* Navigation Pills */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`
                px-8 py-3 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all shadow-sm
                ${activeCategory === cat 
                  ? 'bg-latte-900 text-white shadow-md transform -translate-y-1' 
                  : 'bg-white text-latte-900 hover:bg-latte-100'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05}>
              <div 
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-[2rem] p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border border-latte-100"
              >
                <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-latte-900">
                    <PlusIcon className="w-5 h-5" />
                  </div>
                  {item.tags && item.tags.length > 0 && (
                     <div className="absolute top-4 left-4 bg-latte-400 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                       {item.tags[0]}
                     </div>
                  )}
                </div>

                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-bold text-xl text-latte-900">{item.name}</h3>
                    <span className="font-display font-bold text-lg text-latte-900 bg-latte-100 px-3 py-1 rounded-full">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-latte-800 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <Button variant="outline" fullWidth size="sm" className="rounded-xl border-2">
                    Add to Order
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProductModal 
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
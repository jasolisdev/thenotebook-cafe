import React, { useState, useEffect } from 'react';
import { MenuItem, ModifierGroup } from '../types';
import { Button } from './ui/Button';
import { XMarkIcon, MinusIcon, PlusIcon } from './ui/Icons';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setSelectedModifiers({});
      setNotes('');
      // Initialize defaults
      const initialMods: Record<string, string[]> = {};
      item?.modifierGroups?.forEach(group => {
         if (group.required && group.type === 'radio' && group.options.length > 0) {
             initialMods[group.id] = [group.options[0].id];
         }
      });
      setSelectedModifiers(initialMods);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (!item) return;
    let price = item.price;
    
    (Object.entries(selectedModifiers) as [string, string[]][]).forEach(([groupId, optionIds]) => {
      const group = item.modifierGroups?.find(g => g.id === groupId);
      if (group) {
        optionIds.forEach(optId => {
          const option = group.options.find(o => o.id === optId);
          if (option && option.price) {
            price += option.price;
          }
        });
      }
    });

    setCurrentPrice(price * quantity);
  }, [selectedModifiers, quantity, item]);

  if (!isOpen || !item) return null;

  const handleModifierChange = (group: ModifierGroup, optionId: string, checked: boolean) => {
    setSelectedModifiers(prev => {
      const current = prev[group.id] || [];
      
      if (group.type === 'radio' || group.type === 'select') {
        return { ...prev, [group.id]: [optionId] };
      }
      
      if (group.type === 'checkbox') {
        if (checked) {
          if (group.maxSelections && current.length >= group.maxSelections) return prev;
          return { ...prev, [group.id]: [...current, optionId] };
        } else {
          return { ...prev, [group.id]: current.filter(id => id !== optionId) };
        }
      }
      
      return prev;
    });
  };

  const handleAddToCart = () => {
    addItem(item, quantity, selectedModifiers, notes, currentPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6 pointer-events-none">
      <div 
        className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto" 
        onClick={onClose} 
      />
      
      <div className="bg-cream-50 w-full md:max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-[2rem] md:rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up md:animate-fade-in-up pointer-events-auto">
        
        {/* Header Image */}
        <div className="relative h-64 shrink-0 group">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
          >
            <XMarkIcon />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="font-serif text-3xl md:text-4xl leading-none mb-2">{item.name}</h2>
            <p className="text-white/80 line-clamp-2 text-sm md:text-base font-light">{item.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-cream-50">
          
          <div className="flex items-center justify-between border-b border-coffee-200/50 pb-6">
             <span className="font-serif text-3xl text-coffee-900">${item.price.toFixed(2)}</span>
             <div className="flex gap-2">
               {item.tags?.map(tag => (
                 <span key={tag} className="px-3 py-1 bg-coffee-100/50 text-coffee-800 text-[10px] uppercase font-bold tracking-wider rounded-full border border-coffee-200">
                   {tag}
                 </span>
               ))}
             </div>
          </div>

          {/* Modifiers */}
          {item.modifierGroups?.map(group => (
            <div key={group.id} className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-xl text-coffee-900">{group.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-coffee-400 font-bold bg-coffee-50 px-2 py-1 rounded">
                  {group.required ? 'Required' : 'Optional'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {group.options.map(option => {
                   const isSelected = selectedModifiers[group.id]?.includes(option.id);
                   return (
                     <label 
                       key={option.id}
                       className={`
                         flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200
                         ${isSelected 
                           ? 'border-coffee-900 bg-coffee-50 shadow-sm ring-1 ring-coffee-900' 
                           : 'border-coffee-200 hover:border-coffee-400 bg-white'
                         }
                       `}
                     >
                       <div className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-coffee-900 bg-coffee-900' : 'border-coffee-300'}`}>
                            {isSelected && <div className="w-2 h-2 bg-cream-50 rounded-full" />}
                         </div>
                         <input 
                           type={group.type === 'checkbox' ? 'checkbox' : 'radio'}
                           name={group.id}
                           checked={isSelected}
                           onChange={(e) => handleModifierChange(group, option.id, e.target.checked)}
                           className="hidden"
                         />
                         <span className={`text-sm font-medium ${isSelected ? 'text-coffee-900' : 'text-coffee-600'}`}>{option.name}</span>
                       </div>
                       {option.price && option.price > 0 && (
                         <span className="text-xs text-coffee-500 font-medium">+${option.price.toFixed(2)}</span>
                       )}
                     </label>
                   );
                })}
              </div>
            </div>
          ))}

          {/* Notes */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-coffee-900">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests? (e.g. Extra hot, allergies)"
              className="w-full border border-coffee-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-coffee-300 focus:border-transparent outline-none bg-white transition-shadow shadow-sm placeholder:text-coffee-300"
              rows={3}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-coffee-200 bg-white flex gap-4 items-center shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
           <div className="flex items-center space-x-3 bg-coffee-50 rounded-full px-2 py-2 border border-coffee-100">
             <button 
               onClick={() => setQuantity(Math.max(1, quantity - 1))}
               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-coffee-600 transition-colors"
             >
               <MinusIcon className="w-4 h-4" />
             </button>
             <span className="font-serif text-xl w-6 text-center text-coffee-900">{quantity}</span>
             <button 
               onClick={() => setQuantity(quantity + 1)}
               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-coffee-600 transition-colors"
             >
               <PlusIcon className="w-4 h-4" />
             </button>
           </div>
           
           <Button 
             variant="primary" 
             className="flex-1 py-4 text-xs md:text-sm"
             onClick={handleAddToCart}
           >
             Add to Order • ${currentPrice.toFixed(2)}
           </Button>
        </div>

      </div>
    </div>
  );
};
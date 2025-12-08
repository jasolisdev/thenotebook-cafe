import React from 'react';
import { useCart } from '../context/CartContext';
import { XMarkIcon, MinusIcon, PlusIcon } from './ui/Icons';
import { Button } from './ui/Button';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, subtotal, removeItem, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-50 transition-opacity duration-500" 
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-cream-50 z-50 shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] animate-slide-in border-l border-coffee-100">
        
        <div className="p-6 border-b border-coffee-100 flex items-center justify-between bg-cream-50/80 backdrop-blur">
          <h2 className="font-serif text-2xl text-coffee-900">Your Order</h2>
          <button 
            onClick={closeCart} 
            className="w-10 h-10 rounded-full hover:bg-coffee-50 flex items-center justify-center text-coffee-500 hover:text-coffee-900 transition-all"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-coffee-400">
              <div className="w-20 h-20 bg-coffee-100 rounded-full flex items-center justify-center text-3xl text-coffee-600 opacity-50">☕</div>
              <p className="font-serif text-xl text-coffee-800">Your cart is empty.</p>
              <Button variant="outline" size="sm" onClick={closeCart}>Browse Menu</Button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div key={cartItem.cartId} className="flex gap-5 group py-4 border-b border-coffee-50 last:border-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-coffee-50 shadow-sm">
                  <img src={cartItem.item.image} alt={cartItem.item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif text-lg font-medium text-coffee-900 leading-tight">{cartItem.item.name}</h3>
                      <p className="font-sans text-sm font-bold text-coffee-900">${cartItem.totalPrice.toFixed(2)}</p>
                    </div>
                    
                    {/* Modifiers */}
                    <div className="text-[11px] text-coffee-500 leading-relaxed uppercase tracking-wide">
                      {(Object.entries(cartItem.modifiers) as [string, string[]][]).map(([groupId, optionIds]) => {
                        if (optionIds.length === 0) return null;
                        const group = cartItem.item.modifierGroups?.find(g => g.id === groupId);
                        const optionNames = optionIds.map(oid => group?.options.find(o => o.id === oid)?.name).join(', ');
                        return <div key={groupId}><span className="text-coffee-400 font-bold">{group?.name}:</span> {optionNames}</div>;
                      })}
                      {cartItem.notes && <p className="italic text-coffee-400 mt-1">"{cartItem.notes}"</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center space-x-2 bg-white rounded-full px-2 py-1 border border-coffee-100 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-coffee-50 text-coffee-500 transition-colors"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-coffee-900">{cartItem.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                         className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-coffee-50 text-coffee-500 transition-colors"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(cartItem.cartId)}
                      className="text-[10px] uppercase tracking-widest text-coffee-400 hover:text-red-500 transition-colors font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-coffee-100 bg-white space-y-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-coffee-500 text-sm font-medium uppercase tracking-widest">Subtotal</span>
              <span className="font-serif text-3xl text-coffee-900">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-coffee-400 text-center uppercase tracking-wider mb-2">
              Taxes and shipping calculated at checkout
            </p>
            <Button fullWidth variant="primary" onClick={() => alert("Checkout flow would start here.")}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
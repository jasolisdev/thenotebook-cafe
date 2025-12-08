
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { CookieIcon } from './ui/Icons';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        // Small delay for entrance animation
        setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 transition-all duration-700 animate-[float_6s_ease-in-out_infinite]">
      <div className="bg-white/90 backdrop-blur-md border border-latte-100 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-latte-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-5">
             <div className="w-12 h-12 bg-latte-100 rounded-full flex items-center justify-center text-latte-900 shrink-0 shadow-sm border border-latte-200">
               <CookieIcon className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-display font-bold text-lg text-latte-900 mb-1">Cookies?</h3>
               <p className="text-sm text-latte-800 leading-relaxed">
                 We use them to ensure you get the best experience (and because they are delicious).
               </p>
             </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary" size="sm" fullWidth onClick={handleAccept} className="rounded-xl shadow-lg">
              Accept
            </Button>
            <Button variant="outline" size="sm" fullWidth onClick={handleDecline} className="rounded-xl border-latte-200">
              No thanks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

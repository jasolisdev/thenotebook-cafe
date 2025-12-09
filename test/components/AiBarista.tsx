import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Coffee } from 'lucide-react';
import { getBaristaRecommendation } from '../services/geminiService';

export const AiBarista: React.FC = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setRecommendation('');
    
    // Simulate a bit of "brewing" time for effect if API is too fast
    const result = await getBaristaRecommendation(mood);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <section id="barista" className="py-24 bg-coffee-800 text-coffee-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coffee-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-900/50 rounded-full border border-coffee-700 mb-6">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-bold tracking-widest uppercase text-amber-100">AI Concierge</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">Can't decide what to sip?</h2>
        <p className="text-coffee-200 text-lg font-light mb-10 max-w-xl mx-auto">
          Tell our AI Barista how you're feeling, what the weather is like, or your favorite flavors, and we'll brew up a personalized suggestion.
        </p>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2 md:p-3 rounded-2xl max-w-lg mx-auto shadow-2xl">
           <form onSubmit={handleAsk} className="flex gap-2">
             <input 
              type="text" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. It's raining and I need a hug..." 
              className="flex-1 bg-transparent text-white placeholder-coffee-300/50 px-4 py-3 outline-none focus:ring-0 text-base"
             />
             <button 
              type="submit" 
              disabled={loading}
              className="bg-amber-700 hover:bg-amber-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-5 h-5" />}
             </button>
           </form>
        </div>

        {recommendation && (
          <div className="mt-10 animate-fade-in-up">
            <div className="inline-block bg-coffee-50 text-coffee-900 p-8 rounded-lg shadow-xl relative max-w-lg">
               {/* Speech bubble tail */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-coffee-50 rotate-45"></div>
               
               <div className="flex flex-col items-center gap-4">
                 <div className="p-3 bg-coffee-200 rounded-full">
                    <Coffee className="w-8 h-8 text-coffee-800" />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl font-bold mb-2">Velvet recommends:</h4>
                   <p className="text-lg font-light italic text-coffee-700">"{recommendation}"</p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
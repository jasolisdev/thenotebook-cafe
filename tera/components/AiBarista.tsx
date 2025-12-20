import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { getBaristaRecommendation } from '../services/geminiService';
import { Button } from './Button';

export const AiBarista: React.FC = () => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setRecommendation('');
    
    const result = await getBaristaRecommendation(input);
    
    setRecommendation(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-terra-50 border border-terra-200 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-terra-200 p-2 rounded-full">
          <Sparkles className="text-terra-700 w-5 h-5" />
        </div>
        <h3 className="font-serif text-2xl text-terra-800">The Virtual Barista</h3>
      </div>
      
      <p className="font-sans text-terra-600 mb-6">
        Can't decide? Tell us how you're feeling or what flavors you enjoy, and our AI will pick the perfect brew for you.
      </p>

      <form onSubmit={handleAsk} className="relative mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. I want something sweet and iced, but not too strong..."
          className="w-full bg-white border border-terra-300 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-terra-400 focus:border-transparent transition-all"
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-terra-500 hover:text-terra-700 disabled:opacity-30"
        >
          <Send size={20} />
        </button>
      </form>

      {isLoading && (
        <div className="flex items-center gap-2 text-terra-500 animate-pulse font-serif italic">
          <Sparkles size={16} /> Brewing a thought...
        </div>
      )}

      {recommendation && (
        <div className="bg-white p-4 rounded-xl border-l-4 border-sage-500 shadow-sm animate-fade-in">
          <p className="font-serif text-lg text-terra-900 leading-relaxed">
            "{recommendation}"
          </p>
        </div>
      )}
    </div>
  );
};
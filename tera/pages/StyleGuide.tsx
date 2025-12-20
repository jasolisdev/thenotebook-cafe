import React from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/Button';

export const StyleGuide: React.FC = () => {
  const colors = [
    { name: 'Terra 500', hex: '#8C6F54', class: 'bg-terra-500' },
    { name: 'Terra 100', hex: '#EFECE5', class: 'bg-terra-100' },
    { name: 'Sage 500', hex: '#8FA290', class: 'bg-sage-500' },
    { name: 'Cream', hex: '#FDFBF7', class: 'bg-cream border border-gray-200' },
    { name: 'Charcoal', hex: '#2C2C2C', class: 'bg-charcoal' },
  ];

  return (
    <div className="animate-fade-in bg-cream min-h-screen pb-20">
      <div className="bg-terra-900 text-terra-100 py-20 text-center">
        <h1 className="font-serif text-5xl mb-4">Brand Style Guide</h1>
        <p className="font-sans opacity-70">Visual Identity System v1.0</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        
        {/* Colors */}
        <section>
          <h2 className="font-serif text-3xl text-terra-900 mb-8 border-b border-terra-200 pb-2">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {colors.map((c) => (
              <div key={c.name} className="space-y-3">
                <div className={`h-24 w-full rounded-xl shadow-sm ${c.class}`}></div>
                <div>
                  <p className="font-bold text-terra-800">{c.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-serif text-3xl text-terra-900 mb-8 border-b border-terra-200 pb-2">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Headings (Cormorant Garamond)</span>
              <h1 className="font-serif text-5xl text-terra-900 mb-4">Heading 1</h1>
              <h2 className="font-serif text-4xl text-terra-900 mb-4">Heading 2</h2>
              <h3 className="font-serif text-3xl text-terra-900 mb-4">Heading 3</h3>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Body (Lato)</span>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                This is a paragraph example. The quick brown fox jumps over the lazy dog. 
                We use Lato for high readability in body text, keeping the interface clean and modern.
              </p>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Small text looks like this. Perfect for captions or metadata.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="font-serif text-3xl text-terra-900 mb-8 border-b border-terra-200 pb-2">Components</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

      </div>
    </div>
  );
};
import React from 'react';

export const metadata = {
  title: 'Style Guide',
  description: 'Design system and style guide for The Notebook Café',
};

// Helper to copy text to clipboard (simplified for this view)
const ColorSwatch = ({ name, variable, bgClass }: { name: string, variable: string, bgClass: string }) => (
  <div className="flex flex-col gap-2">
    <div className={`h-24 w-full rounded-lg shadow-sm flex items-center justify-center ${bgClass} border border-cafe-tan/20`}>
       {/* Optional: Add hex code display logic here if needed, but for now visual is key */}
    </div>
    <div className="text-xs">
      <p className="font-bold text-cafe-brown">{name}</p>
      <p className="font-mono text-[10px] text-cafe-tan-dark opacity-75">{variable}</p>
      <p className="font-mono text-[10px] text-cafe-tan-dark opacity-50">{bgClass}</p>
    </div>
  </div>
);

const FontSample = ({ name, fontClass, usage }: { name: string, fontClass: string, usage: string }) => (
  <div className="p-6 border border-cafe-tan/20 rounded-lg bg-cafe-white/50">
    <div className="flex justify-between items-baseline mb-4 border-b border-cafe-tan/10 pb-2">
      <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider">{name}</h3>
      <span className="text-xs text-cafe-tan font-mono">{usage}</span>
    </div>
    <div className={`${fontClass} text-cafe-black space-y-4`}>
      <p className="text-4xl">The quick brown fox jumps over the lazy dog.</p>
      <p className="text-xl">The quick brown fox jumps over the lazy dog.</p>
      <p className="text-base opacity-80">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>
);

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-cafe-mist py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-display text-cafe-black">Style Guide</h1>
          <p className="text-xl font-sans text-cafe-brown max-w-2xl">
            A reference for The Notebook Café&apos;s design system, including color palettes, typography, and core UI elements.
          </p>
        </div>

        {/* Colors Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-display text-cafe-black border-b border-cafe-tan/30 pb-2">Color Palette</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-sans font-bold text-cafe-tan-dark mb-4">Core Café Palette</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorSwatch name="Café Black" variable="--color-cafe-black" bgClass="bg-cafe-black" />
                <ColorSwatch name="Café Brown" variable="--color-cafe-brown" bgClass="bg-cafe-brown" />
                <ColorSwatch name="Café Tan" variable="--color-cafe-tan" bgClass="bg-cafe-tan" />
                <ColorSwatch name="Café Tan Dark" variable="--color-cafe-tan-dark" bgClass="bg-cafe-tan-dark" />
                <ColorSwatch name="Café Beige" variable="--color-cafe-beige" bgClass="bg-cafe-beige" />
                <ColorSwatch name="Café Luxe Oat" variable="--color-cafe-luxe-oat" bgClass="bg-cafe-luxe-oat" />
                <ColorSwatch name="Café Cream" variable="--color-cafe-cream" bgClass="bg-cafe-cream" />
                <ColorSwatch name="Café Mist" variable="--color-cafe-mist" bgClass="bg-cafe-mist" />
                <ColorSwatch name="Café White" variable="--color-cafe-white" bgClass="bg-cafe-white" />
                <ColorSwatch name="Café Olive" variable="--color-cafe-olive" bgClass="bg-cafe-olive" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-sans font-bold text-cafe-tan-dark mb-4">Coffee Palette (Nav/Footer)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ColorSwatch name="Coffee 50" variable="--color-coffee-50" bgClass="bg-coffee-50" />
                <ColorSwatch name="Coffee 100" variable="--color-coffee-100" bgClass="bg-coffee-100" />
                <ColorSwatch name="Coffee 900" variable="--color-coffee-900" bgClass="bg-coffee-900" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-sans font-bold text-cafe-tan-dark mb-4">Extended Palette</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ColorSwatch name="Espresso Brown" variable="--color-espresso-brown" bgClass="bg-espresso-brown" />
                <ColorSwatch name="Warm Brown" variable="--color-warm-brown" bgClass="bg-warm-brown" />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-display text-cafe-black border-b border-cafe-tan/30 pb-2">Typography</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FontSample 
              name="Playfair Display (Display)" 
              fontClass="font-display" 
              usage="Headings, Hero Titles, Featured Text" 
            />
            
            <FontSample 
              name="Inter (Sans)" 
              fontClass="font-sans" 
              usage="Body Copy, UI Navigation, Buttons" 
            />

            <FontSample 
              name="DM Serif Display" 
              fontClass="font-dm-serif" 
              usage="Original Brand Headings" 
            />
            
            <div className="p-6 border border-dashed border-cafe-tan/30 rounded-lg bg-cafe-white/30">
              <div className="flex justify-between items-baseline mb-4">
                 <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider">Torus (Available but Unused?)</h3>
                 <span className="text-xs text-cafe-tan font-mono">variable: --font-torus</span>
              </div>
              <div style={{ fontFamily: 'var(--font-torus)' }} className="text-cafe-black space-y-4">
                 <p className="text-4xl">The quick brown fox jumps over the lazy dog.</p>
                 <p className="text-base opacity-80">
                   This font is defined in <code>app/fonts.ts</code> but may not be globally assigned to <code>font-sans</code> or <code>font-display</code> in CSS variables yet.
                 </p>
              </div>
            </div>

            <div className="p-6 border border-dashed border-cafe-tan/30 rounded-lg bg-cafe-white/30">
              <div className="flex justify-between items-baseline mb-4">
                 <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider">OpenDyslexic (Accessibility)</h3>
                 <span className="text-xs text-cafe-tan font-mono">Custom Font Face</span>
              </div>
              <div style={{ fontFamily: 'OpenDyslexic' }} className="text-cafe-black space-y-4">
                 <p className="text-2xl">The quick brown fox jumps over the lazy dog.</p>
                 <p className="text-base opacity-80">
                   Used when accessibility settings are toggled.
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-cafe-white p-8 rounded-xl shadow-sm border border-cafe-tan/10">
            <h3 className="text-lg font-sans font-bold text-cafe-tan-dark mb-6">Heading Hierarchy</h3>
            <div className="space-y-6 text-cafe-black">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                <span className="w-24 text-xs font-mono text-cafe-tan">H1 / Hero</span>
                <h1 className="text-5xl md:text-7xl font-display">Coffee & Community</h1>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                <span className="w-24 text-xs font-mono text-cafe-tan">H2 / Section</span>
                <h2 className="text-3xl md:text-4xl font-display">Our Signature Pours</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                 <span className="w-24 text-xs font-mono text-cafe-tan">H3 / Card</span>
                 <h3 className="text-2xl font-display">Lavender Haze Latte</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                 <span className="w-24 text-xs font-mono text-cafe-tan">Body</span>
                 <p className="font-sans text-base max-w-xl leading-relaxed">
                   We believe in the power of a good cup of coffee to bring people together. 
                   Our beans are ethically sourced and roasted with care to bring out the unique notes of each region.
                 </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                 <span className="w-24 text-xs font-mono text-cafe-tan">Caption</span>
                 <p className="font-sans text-xs uppercase tracking-widest text-cafe-tan-dark font-bold">
                   Est. 2024 • Riverside, CA
                 </p>
              </div>
            </div>
          </div>

          {/* Font Comparisons for "How It Began" */}
          <div className="bg-cafe-mist p-8 rounded-xl shadow-sm border border-cafe-tan/10">
            <h3 className="text-lg font-sans font-bold text-cafe-tan-dark mb-6">Font Comparisons for &quot;How It Began&quot;</h3>
            <div className="space-y-8">
              
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs font-mono text-cafe-tan mb-2">DM Serif Display (font-dm-serif + italic accent)</p>
                <h2 className="font-dm-serif text-5xl sm:text-6xl text-cafe-black leading-none">
                  How It <span className="italic">Began</span>
                </h2>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs font-mono text-cafe-tan mb-2">Playfair Display (font-display)</p>
                <h2 className="font-display text-5xl sm:text-6xl text-cafe-black leading-none">
                  How It <span className="italic">Began</span>
                </h2>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs font-mono text-cafe-tan mb-2">Inter (font-sans)</p>
                <h2 className="font-sans text-5xl sm:text-6xl text-cafe-black leading-none">
                  How It <span className="italic">Began</span>
                </h2>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs font-mono text-cafe-tan mb-2">Torus (var(--font-torus))</p>
                <h2 style={{ fontFamily: 'var(--font-torus)' }} className="text-5xl sm:text-6xl text-cafe-black leading-none">
                  How It <span className="italic">Began</span>
                </h2>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs font-mono text-cafe-tan mb-2">OpenDyslexic</p>
                <h2 style={{ fontFamily: 'OpenDyslexic' }} className="text-5xl sm:text-6xl text-cafe-black leading-none">
                  How It <span className="italic">Began</span>
                </h2>
              </div>

            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

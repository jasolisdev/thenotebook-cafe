"use client";

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/Button';

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState('colors');

  const sections = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Form Elements' },
    { id: 'spacing', label: 'Spacing & Layout' },
    { id: 'animations', label: 'Animations' },
    { id: 'issues', label: 'Inconsistencies' },
  ];

  return (
    <div className="min-h-screen bg-cafe-mist">
      {/* Hero Header */}
      <header className="bg-cafe-black text-cafe-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cafe-tan mb-4">The Notebook Café</p>
          <h1 className="text-4xl md:text-6xl font-display mb-4">Design System</h1>
          <p className="text-cafe-beige max-w-xl text-lg">
            A comprehensive guide to our visual language, components, and design tokens.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-cafe-white/90 backdrop-blur-md border-b border-cafe-tan/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all rounded-md ${
                  activeSection === section.id
                    ? 'bg-cafe-black text-cafe-white'
                    : 'text-cafe-brown hover:bg-cafe-tan/10'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-24">

        {/* ============================================================
            COLORS SECTION
        ============================================================ */}
        <section id="colors" className="scroll-mt-20">
          <SectionHeader
            title="Color Palette"
            description="Our café-inspired color system creates warmth and sophistication."
          />

          {/* Core Palette */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Core Café Palette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <ColorSwatch name="Café Black" hex="#2c2420" variable="--color-cafe-black" bgClass="bg-cafe-black" textLight />
              <ColorSwatch name="Café Brown" hex="#4a3b32" variable="--color-cafe-brown" bgClass="bg-cafe-brown" textLight />
              <ColorSwatch name="Café Olive" hex="#4a4f41" variable="--color-cafe-olive" bgClass="bg-cafe-olive" textLight />
              <ColorSwatch name="Café Tan Dark" hex="#8e7965" variable="--color-cafe-tan-dark" bgClass="bg-cafe-tan-dark" textLight />
              <ColorSwatch name="Café Tan" hex="#a48d78" variable="--color-cafe-tan" bgClass="bg-cafe-tan" />
              <ColorSwatch name="Café Beige" hex="#cbb9a4" variable="--color-cafe-beige" bgClass="bg-cafe-beige" />
              <ColorSwatch name="Café Luxe Oat" hex="#cbbfaf" variable="--color-cafe-luxe-oat" bgClass="bg-cafe-luxe-oat" />
              <ColorSwatch name="Café Cream" hex="#ede7d8" variable="--color-cafe-cream" bgClass="bg-cafe-cream" />
              <ColorSwatch name="Café Mist" hex="#f4f1ea" variable="--color-cafe-mist" bgClass="bg-cafe-mist" />
              <ColorSwatch name="Café White" hex="#fdfbf7" variable="--color-cafe-white" bgClass="bg-cafe-white" />
            </div>
          </div>

          {/* Premium Palette */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Premium Palette (Nav/Footer)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ColorSwatch name="Coffee 50" hex="#f3efe9" variable="--color-coffee-50" bgClass="bg-coffee-50" />
              <ColorSwatch name="Coffee 100" hex="#e6dcca" variable="--color-coffee-100" bgClass="bg-coffee-100" />
              <ColorSwatch name="Coffee 900" hex="#2c241f" variable="--color-coffee-900" bgClass="bg-coffee-900" textLight />
            </div>
          </div>

          {/* Extended Palette */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Extended Palette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ColorSwatch name="Espresso Brown" hex="#2a1f16" variable="--color-espresso-brown" bgClass="bg-espresso-brown" textLight />
              <ColorSwatch name="Warm Brown" hex="#5a4a38" variable="--color-warm-brown" bgClass="bg-warm-brown" textLight />
            </div>
          </div>

          {/* Semantic Tokens */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Semantic Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TokenCard
                name="Background Solid"
                token="--bg-solid"
                value="var(--color-cafe-mist)"
                preview={<div className="w-full h-12 rounded bg-[var(--bg-solid)] border border-cafe-tan/20" />}
              />
              <TokenCard
                name="Background Dark"
                token="--bg-dark"
                value="var(--color-cafe-black)"
                preview={<div className="w-full h-12 rounded bg-[var(--bg-dark)]" />}
              />
              <TokenCard
                name="Text Dark"
                token="--text-dark"
                value="var(--color-cafe-brown)"
                preview={<div className="w-full h-12 rounded bg-cafe-mist flex items-center justify-center text-[var(--text-dark)] font-bold">Aa</div>}
              />
              <TokenCard
                name="Text Light"
                token="--text-light"
                value="var(--color-cafe-mist)"
                preview={<div className="w-full h-12 rounded bg-cafe-black flex items-center justify-center text-[var(--text-light)] font-bold">Aa</div>}
              />
            </div>
          </div>

          {/* Opacity System */}
          <div>
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Opacity System</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <OpacitySwatch name="Subtle" value="0.08" token="--opacity-subtle" />
              <OpacitySwatch name="Light" value="0.12" token="--opacity-light" />
              <OpacitySwatch name="Medium" value="0.25" token="--opacity-medium" />
              <OpacitySwatch name="Strong" value="0.50" token="--opacity-strong" />
            </div>
          </div>
        </section>

        {/* ============================================================
            TYPOGRAPHY SECTION
        ============================================================ */}
        <section id="typography" className="scroll-mt-20">
          <SectionHeader
            title="Typography"
            description="Our type system balances editorial elegance with modern readability."
          />

          {/* Font Families */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Font Families</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FontCard
                name="Playfair Display"
                variable="--font-display"
                usage="Headings, Hero Titles, Featured Text"
                fontClass="font-display"
                description="Elegant serif for editorial presence"
              />
              <FontCard
                name="Torus"
                variable="--font-sans"
                usage="Body Copy, UI Navigation, Buttons"
                fontClass="font-sans"
                description="Primary sans-serif for readability"
              />
              <FontCard
                name="Inter"
                variable="--font-inter"
                usage="Fallback Sans, Menu UI"
                fontStyle={{ fontFamily: 'var(--font-inter)' }}
                description="Modern sans-serif system fallback"
              />
              <FontCard
                name="OpenDyslexic"
                variable="Custom @font-face"
                usage="Accessibility Mode"
                fontStyle={{ fontFamily: 'OpenDyslexic' }}
                description="Accessibility font for dyslexia support"
                isAccessibility
              />
            </div>
          </div>

          {/* Type Scale */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Type Scale</h3>
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10 space-y-8">
              <TypeScaleRow label="Hero / H1" size="clamp(2.8rem, 6.5vw, 5.2rem)" className="text-5xl md:text-7xl font-display">
                Coffee & Community
              </TypeScaleRow>
              <TypeScaleRow label="H2 / Section" size="2.25rem - 3rem" className="text-3xl md:text-4xl font-display">
                Our Signature Pours
              </TypeScaleRow>
              <TypeScaleRow label="H3 / Card" size="1.5rem" className="text-2xl font-display">
                Lavender Haze Latte
              </TypeScaleRow>
              <TypeScaleRow label="H4 / Subtitle" size="1.25rem" className="text-xl font-sans font-semibold">
                Crafted with Care
              </TypeScaleRow>
              <TypeScaleRow label="Body" size="1rem / 16px" className="text-base font-sans leading-relaxed max-w-xl">
                We believe in the power of a good cup of coffee to bring people together. Our beans are ethically sourced and roasted with care.
              </TypeScaleRow>
              <TypeScaleRow label="Caption" size="0.75rem" className="text-xs uppercase tracking-widest text-cafe-tan-dark font-bold">
                Est. 2024 • Riverside, CA
              </TypeScaleRow>
            </div>
          </div>

          {/* Font Weights */}
          <div>
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Font Weights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <WeightCard weight={400} name="Regular" />
              <WeightCard weight={500} name="Medium" />
              <WeightCard weight={600} name="Semibold" />
              <WeightCard weight={700} name="Bold" />
            </div>
          </div>
        </section>

        {/* ============================================================
            BUTTONS SECTION
        ============================================================ */}
        <section id="buttons" className="scroll-mt-20">
          <SectionHeader
            title="Buttons"
            description="Interactive elements that guide users through their journey."
          />

          {/* React Button Component */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Button Component Variants</h3>
            <p className="text-sm text-cafe-brown mb-6">From <code className="bg-cafe-cream px-2 py-1 rounded text-xs">components/ui/Button.tsx</code></p>

            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10 space-y-8">
              <ButtonShowcase
                name="Primary"
                description="Main call-to-action, solid dark background"
                code='<Button variant="primary">Order Now</Button>'
              >
                <Button variant="primary">Order Now</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </ButtonShowcase>

              <ButtonShowcase
                name="Secondary"
                description="Secondary actions, tan background"
                code='<Button variant="secondary">Learn More</Button>'
              >
                <Button variant="secondary">Learn More</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </ButtonShowcase>

              <ButtonShowcase
                name="Outline"
                description="Bordered button, transparent background"
                code='<Button variant="outline">View Menu</Button>'
              >
                <Button variant="outline">View Menu</Button>
                <Button variant="outline" disabled>Disabled</Button>
              </ButtonShowcase>

              <ButtonShowcase
                name="Ghost"
                description="Minimal button, no border or background"
                code='<Button variant="ghost">Cancel</Button>'
              >
                <Button variant="ghost">Cancel</Button>
                <Button variant="ghost" disabled>Disabled</Button>
              </ButtonShowcase>

              <ButtonShowcase
                name="CTA (Call-to-Action)"
                description="Hero buttons with arrow animation"
                code='<Button variant="cta" withArrow>Explore Menu</Button>'
              >
                <Button variant="cta" withArrow>Explore Menu</Button>
                <Button variant="cta">Without Arrow</Button>
              </ButtonShowcase>
            </div>
          </div>

          {/* CSS Button Classes */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">CSS Button Classes</h3>
            <p className="text-sm text-cafe-brown mb-6">From <code className="bg-cafe-cream px-2 py-1 rounded text-xs">styles/components/buttons.css</code></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Primary */}
              <div className="bg-cafe-black rounded-xl p-8">
                <p className="text-xs text-cafe-tan uppercase tracking-wider mb-4">.hero-button-primary</p>
                <button className="hero-button-primary px-8 py-3 text-xs uppercase tracking-widest transition-colors">
                  View Menu
                </button>
              </div>

              {/* Hero Secondary */}
              <div className="bg-cafe-black rounded-xl p-8">
                <p className="text-xs text-cafe-tan uppercase tracking-wider mb-4">.hero-button-secondary</p>
                <button className="hero-button-secondary px-8 py-3 text-xs uppercase tracking-widest transition-colors">
                  Our Story
                </button>
              </div>

              {/* Pill Button */}
              <div className="bg-cafe-black rounded-xl p-8">
                <p className="text-xs text-cafe-tan uppercase tracking-wider mb-4">.btn-pill</p>
                <button className="btn-pill">Signature Pour</button>
              </div>

              {/* Badge Gold */}
              <div className="bg-cafe-black rounded-xl p-8">
                <p className="text-xs text-cafe-tan uppercase tracking-wider mb-4">.badge-gold</p>
                <span className="badge-gold">New</span>
              </div>

              {/* Form Primary */}
              <div className="bg-cafe-mist rounded-xl p-8 md:col-span-2">
                <p className="text-xs text-cafe-tan-dark uppercase tracking-wider mb-4">.btn-primary (Form Submit)</p>
                <button className="btn-primary max-w-xs">Submit Application</button>
              </div>
            </div>
          </div>

          {/* Button Specs */}
          <div>
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Button Specifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cafe-tan/20">
                    <th className="text-left py-3 px-4 text-cafe-tan-dark uppercase tracking-wider text-xs">Variant</th>
                    <th className="text-left py-3 px-4 text-cafe-tan-dark uppercase tracking-wider text-xs">Padding</th>
                    <th className="text-left py-3 px-4 text-cafe-tan-dark uppercase tracking-wider text-xs">Font</th>
                    <th className="text-left py-3 px-4 text-cafe-tan-dark uppercase tracking-wider text-xs">Radius</th>
                  </tr>
                </thead>
                <tbody className="text-cafe-brown">
                  <tr className="border-b border-cafe-tan/10">
                    <td className="py-3 px-4 font-medium">Primary/Secondary/Outline/Ghost</td>
                    <td className="py-3 px-4 font-mono text-xs">px-6 py-3 (24px 12px)</td>
                    <td className="py-3 px-4 font-mono text-xs">0.75rem uppercase</td>
                    <td className="py-3 px-4 font-mono text-xs">rounded-lg (8px)</td>
                  </tr>
                  <tr className="border-b border-cafe-tan/10">
                    <td className="py-3 px-4 font-medium">CTA</td>
                    <td className="py-3 px-4 font-mono text-xs">px-8 py-3 (32px 12px)</td>
                    <td className="py-3 px-4 font-mono text-xs">0.75rem tracking-[0.25em]</td>
                    <td className="py-3 px-4 font-mono text-xs">rounded-sm (2px)</td>
                  </tr>
                  <tr className="border-b border-cafe-tan/10">
                    <td className="py-3 px-4 font-medium">Pill</td>
                    <td className="py-3 px-4 font-mono text-xs">0.7rem 1.2rem</td>
                    <td className="py-3 px-4 font-mono text-xs">15px weight-500</td>
                    <td className="py-3 px-4 font-mono text-xs">9999px (full)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Form Primary</td>
                    <td className="py-3 px-4 font-mono text-xs">16px 36px</td>
                    <td className="py-3 px-4 font-mono text-xs">0.8rem uppercase</td>
                    <td className="py-3 px-4 font-mono text-xs">0 (none)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================
            FORM ELEMENTS SECTION
        ============================================================ */}
        <section id="forms" className="scroll-mt-20">
          <SectionHeader
            title="Form Elements"
            description="Editorial-minimal form components for user input."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Fields */}
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Input Fields</h3>
              <p className="text-xs text-cafe-brown mb-4 font-mono">.input-field</p>

              <div className="space-y-4">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  className="input-field"
                  placeholder="Phone Number"
                />
              </div>

              <div className="mt-6 p-4 bg-cafe-mist rounded-lg">
                <p className="text-xs text-cafe-tan-dark">
                  <strong>Style:</strong> Bottom border only, transparent background<br />
                  <strong>Focus:</strong> Border changes to olive<br />
                  <strong>Padding:</strong> 12px 0
                </p>
              </div>
            </div>

            {/* Textarea */}
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Textarea</h3>
              <p className="text-xs text-cafe-brown mb-4 font-mono">textarea.input-field</p>

              <textarea
                className="input-field"
                placeholder="Tell us about yourself..."
                rows={4}
              />

              <div className="mt-6 p-4 bg-cafe-mist rounded-lg">
                <p className="text-xs text-cafe-tan-dark">
                  <strong>Style:</strong> Full border (unlike inputs)<br />
                  <strong>Min Height:</strong> 80px<br />
                  <strong>Resize:</strong> Vertical only
                </p>
              </div>
            </div>

            {/* Labels */}
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Form Labels</h3>
              <p className="text-xs text-cafe-brown mb-4 font-mono">.form-group-label</p>

              <label className="form-group-label" style={{ marginTop: 0 }}>Personal Information</label>
              <input type="text" className="input-field" placeholder="First Name" />

              <label className="form-group-label">Contact Details</label>
              <input type="email" className="input-field" placeholder="Email" />

              <div className="mt-6 p-4 bg-cafe-mist rounded-lg">
                <p className="text-xs text-cafe-tan-dark">
                  <strong>Color:</strong> var(--color-cafe-olive)<br />
                  <strong>Size:</strong> 0.8rem uppercase<br />
                  <strong>Spacing:</strong> letter-spacing: 1.5px
                </p>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Checkboxes</h3>
              <p className="text-xs text-cafe-brown mb-4 font-mono">.checkbox-label + .checkbox-input</p>

              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" defaultChecked />
                  <span>Morning Shift</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span>Afternoon Shift</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span>Evening Shift</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" defaultChecked />
                  <span>Weekends</span>
                </label>
              </div>

              <div className="mt-6 p-4 bg-cafe-mist rounded-lg">
                <p className="text-xs text-cafe-tan-dark">
                  <strong>Animation:</strong> Scale transform on check<br />
                  <strong>Fill Color:</strong> var(--color-cafe-olive)<br />
                  <strong>Size:</strong> 18px × 18px
                </p>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10 lg:col-span-2">
              <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">File Upload</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-cafe-brown mb-4 font-mono">.file-upload-zone</p>
                  <div className="file-upload-zone">
                    <svg className="w-8 h-8 text-cafe-tan mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-cafe-brown">Drop your resume here</p>
                    <p className="text-xs text-cafe-tan">PDF, DOC up to 5MB</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-cafe-brown mb-4 font-mono">.file-upload-compact</p>
                  <div className="file-upload-compact">
                    <div className="upload-icon-box mr-3">
                      <svg className="w-4 h-4 text-cafe-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-cafe-brown font-medium">Upload Resume</p>
                      <p className="text-xs text-cafe-tan">PDF or DOC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SPACING & LAYOUT SECTION
        ============================================================ */}
        <section id="spacing" className="scroll-mt-20">
          <SectionHeader
            title="Spacing & Layout"
            description="Consistent spacing creates visual rhythm and hierarchy."
          />

          {/* Layout Tokens */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Layout Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TokenCard
                name="Site Header Height"
                token="--site-header-height"
                value="80px"
                preview={
                  <div className="w-full h-[80px] bg-cafe-black rounded flex items-center justify-center">
                    <span className="text-cafe-white text-xs uppercase tracking-wider">Header (80px)</span>
                  </div>
                }
              />
              <TokenCard
                name="Announcement Banner"
                token="height"
                value="32px mobile / 36px desktop"
                preview={
                  <div className="w-full h-[36px] bg-cafe-tan rounded flex items-center justify-center">
                    <span className="text-cafe-white text-xs">Banner</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Spacing Scale */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Spacing Scale (Tailwind)</h3>
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <div className="space-y-4">
                {[
                  { name: 'px', value: '1px' },
                  { name: '1', value: '4px (0.25rem)' },
                  { name: '2', value: '8px (0.5rem)' },
                  { name: '3', value: '12px (0.75rem)' },
                  { name: '4', value: '16px (1rem)' },
                  { name: '6', value: '24px (1.5rem)' },
                  { name: '8', value: '32px (2rem)' },
                  { name: '12', value: '48px (3rem)' },
                  { name: '16', value: '64px (4rem)' },
                  { name: '24', value: '96px (6rem)' },
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <span className="w-12 text-xs font-mono text-cafe-tan-dark">{space.name}</span>
                    <div
                      className="h-4 bg-cafe-tan rounded"
                      style={{ width: space.value.split(' ')[0] === '1px' ? '1px' : `calc(${space.value.split(' ')[0]} * 2)` }}
                    />
                    <span className="text-xs text-cafe-brown">{space.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Container Widths */}
          <div>
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Container Widths</h3>
            <div className="space-y-4">
              {[
                { name: 'max-w-xl', value: '576px', usage: 'Form containers, narrow content' },
                { name: 'max-w-2xl', value: '672px', usage: 'Article content' },
                { name: 'max-w-4xl', value: '896px', usage: 'Medium sections' },
                { name: 'max-w-6xl', value: '1152px', usage: 'Wide sections' },
                { name: 'max-w-7xl', value: '1280px', usage: 'Page container (primary)' },
              ].map((container) => (
                <div key={container.name} className="bg-cafe-white rounded-lg p-4 border border-cafe-tan/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-cafe-brown">{container.name}</span>
                    <span className="text-xs text-cafe-tan">{container.value}</span>
                  </div>
                  <div className="w-full bg-cafe-mist rounded h-2 overflow-hidden">
                    <div
                      className="h-full bg-cafe-tan"
                      style={{ width: `${(parseInt(container.value) / 1280) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-cafe-tan-dark mt-2">{container.usage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breakpoints */}
          <div className="mt-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Responsive Breakpoints</h3>
            <p className="text-sm text-cafe-brown mb-6">Using Tailwind CSS default breakpoints (mobile-first approach)</p>
            <div className="space-y-3">
              {[
                { prefix: 'Default', min: '0px', desc: 'Mobile phones (portrait)', color: 'bg-cafe-olive' },
                { prefix: 'sm:', min: '640px', desc: 'Mobile phones (landscape), small tablets', color: 'bg-cafe-tan-dark' },
                { prefix: 'md:', min: '768px', desc: 'Tablets (portrait)', color: 'bg-cafe-tan' },
                { prefix: 'lg:', min: '1024px', desc: 'Tablets (landscape), small laptops', color: 'bg-cafe-beige' },
                { prefix: 'xl:', min: '1280px', desc: 'Desktops, large laptops', color: 'bg-cafe-cream' },
                { prefix: '2xl:', min: '1536px', desc: 'Large desktops', color: 'bg-cafe-mist' },
              ].map((bp, i) => (
                <div key={bp.prefix} className="flex items-center gap-4">
                  <div className={`w-16 h-8 rounded ${bp.color} flex items-center justify-center`}>
                    <span className={`text-xs font-mono font-bold ${i < 3 ? 'text-cafe-white' : 'text-cafe-brown'}`}>{bp.prefix}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-cafe-brown">{bp.min}</span>
                      <span className="text-xs text-cafe-tan">and up</span>
                    </div>
                    <p className="text-xs text-cafe-tan-dark">{bp.desc}</p>
                  </div>
                  <div
                    className="hidden md:block h-2 bg-cafe-tan/20 rounded"
                    style={{ width: `${Math.min((parseInt(bp.min) / 1536) * 100, 100)}%`, minWidth: '20px' }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-cafe-cream/50 rounded-lg">
              <p className="text-xs text-cafe-brown">
                <strong>Usage:</strong> Classes like <code className="bg-cafe-white px-1 rounded">md:text-lg</code> apply styles at that breakpoint and above.
                Mobile styles are written first, then enhanced for larger screens.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            ANIMATIONS SECTION
        ============================================================ */}
        <section id="animations" className="scroll-mt-20">
          <SectionHeader
            title="Animations"
            description="Subtle motion enhances the user experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimationCard
              name="Fade In Up"
              className="animate-fade-up"
              keyframes="fadeInUp"
              duration="1s"
              easing="cubic-bezier(0.19, 1, 0.22, 1)"
            />
            <AnimationCard
              name="Mask Up"
              className="animate-mask-up"
              keyframes="mask-up"
              duration="1.4s"
              easing="cubic-bezier(0.19, 1, 0.22, 1)"
            />
            <AnimationCard
              name="Fade In"
              className="animate-fade-in"
              keyframes="fadeIn"
              duration="0.3s"
              easing="cubic-bezier(0.19, 1, 0.22, 1)"
            />
            <AnimationCard
              name="Pulse Glow"
              className="badge-gold"
              keyframes="pulseGlow"
              duration="3s infinite"
              easing="ease-in-out"
              isInfinite
            />
          </div>

          {/* Transition Specs */}
          <div className="mt-12">
            <h3 className="text-sm font-bold text-cafe-tan-dark uppercase tracking-wider mb-6">Standard Transitions</h3>
            <div className="bg-cafe-white rounded-xl p-8 border border-cafe-tan/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 hover:bg-cafe-tan/5 transition-colors duration-200">
                  <p className="text-2xl font-display text-cafe-brown mb-2">200ms</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Quick (buttons, hovers)</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 hover:bg-cafe-tan/5 transition-colors duration-300">
                  <p className="text-2xl font-display text-cafe-brown mb-2">300ms</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Standard (most UI)</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 hover:bg-cafe-tan/5 transition-colors duration-500">
                  <p className="text-2xl font-display text-cafe-brown mb-2">500ms+</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Slow (page transitions)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            INCONSISTENCIES SECTION
        ============================================================ */}
        <section id="issues" className="scroll-mt-20">
          <SectionHeader
            title="Inconsistencies & Recommendations"
            description="Identified issues in the current design system implementation."
          />

          {/* Architecture Note */}
          <div className="bg-cafe-cream/50 rounded-lg p-6 border border-cafe-tan/20 mb-6">
            <h3 className="text-sm font-bold text-cafe-olive uppercase tracking-wider mb-2">CSS Architecture Note</h3>
            <p className="text-sm text-cafe-brown">
              As of December 2025, CSS has been <strong>consolidated into globals.css</strong> for performance (7 HTTP requests → 1).
              Page-specific styles remain in <code className="bg-cafe-white px-1 rounded text-xs">app/styles/pages/</code>.
              See <code className="bg-cafe-white px-1 rounded text-xs">docs/css.md</code> for details.
            </p>
          </div>

          <div className="space-y-6">
            <IssueCard
              severity="high"
              title="Hardcoded Color Values"
              location="Multiple files"
              description="Some components use hardcoded rgba values like rgba(164, 141, 120, 0.15) instead of the pre-defined --tan-light token."
              recommendation="Replace all hardcoded rgba colors with semantic tokens: --tan-subtle, --tan-light, --tan-medium, --tan-strong."
            />

            <IssueCard
              severity="high"
              title="Button Padding Inconsistency"
              location="Button.tsx, buttons.css, application-form.css"
              description={
                <ul className="list-disc list-inside space-y-1">
                  <li>React Button: px-6 py-3 (24px × 12px)</li>
                  <li>CTA Button: px-8 py-3 (32px × 12px)</li>
                  <li>Form .btn-primary: 16px 36px</li>
                  <li>Pill buttons: 0.7rem 1.2rem</li>
                </ul>
              }
              recommendation="Standardize button sizes: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4). Apply consistently."
            />

            <IssueCard
              severity="medium"
              title="Form Label Color Inconsistency"
              location="application-form.css"
              description="Form labels use --color-cafe-olive while most other text elements use --color-cafe-tan or --color-cafe-brown. Input focus also uses olive."
              recommendation="Decide on a consistent accent color (olive vs tan) for form interactions. Document the choice."
            />

            <IssueCard
              severity="medium"
              title="Border Radius Inconsistency"
              location="Multiple components"
              description={
                <ul className="list-disc list-inside space-y-1">
                  <li>Primary buttons: rounded-lg (8px)</li>
                  <li>CTA buttons: rounded-sm (2px)</li>
                  <li>Form buttons: 0 (none)</li>
                  <li>Pill buttons: 9999px (full)</li>
                  <li>Cards: rounded-xl (12px)</li>
                </ul>
              }
              recommendation="Define a border-radius scale: none (0), sm (2px), md (6px), lg (8px), xl (12px), full (9999px). Apply consistently by component type."
            />

            <IssueCard
              severity="medium"
              title="Checkbox Fill Uses Olive, Not Tan"
              location="application-form.css"
              description="Checkbox checked state uses --color-cafe-olive (box-shadow fill), while most interactive elements use cafe-tan family colors."
              recommendation="Consider using --color-cafe-tan-dark for consistency with other interactive elements, or document olive as the 'active state' color."
            />

          </div>

          {/* Summary Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Critical" value="0" color="bg-green-500" />
            <StatCard label="High" value="2" color="bg-orange-500" />
            <StatCard label="Medium" value="3" color="bg-yellow-500" />
            <StatCard label="Low/Info" value="0" color="bg-green-500" />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-cafe-black text-cafe-beige py-12 px-4 sm:px-8 mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-2">The Notebook Café Design System</p>
          <p className="text-cafe-tan text-sm">Last updated: December 2024</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-display text-cafe-black mb-3">{title}</h2>
      <p className="text-cafe-brown max-w-2xl">{description}</p>
      <div className="w-16 h-0.5 bg-cafe-tan mt-4" />
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  variable,
  bgClass,
  textLight = false
}: {
  name: string;
  hex: string;
  variable: string;
  bgClass: string;
  textLight?: boolean;
}) {
  return (
    <div className="group">
      <div className={`h-24 rounded-lg ${bgClass} flex flex-col items-center justify-center transition-transform hover:scale-105 shadow-sm`}>
        <span className={`text-xs font-mono ${textLight ? 'text-cafe-cream' : 'text-cafe-brown'}`}>{hex}</span>
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold text-cafe-brown">{name}</p>
        <p className="text-[10px] font-mono text-cafe-tan-dark opacity-75">{variable}</p>
      </div>
    </div>
  );
}

function TokenCard({
  name,
  token,
  value,
  preview
}: {
  name: string;
  token: string;
  value: string;
  preview: React.ReactNode;
}) {
  return (
    <div className="bg-cafe-white rounded-lg p-6 border border-cafe-tan/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-semibold text-cafe-brown">{name}</p>
          <p className="text-xs font-mono text-cafe-tan">{token}</p>
        </div>
        <p className="text-xs font-mono text-cafe-tan-dark bg-cafe-mist px-2 py-1 rounded">{value}</p>
      </div>
      {preview}
    </div>
  );
}

function OpacitySwatch({ name, value, token }: { name: string; value: string; token: string }) {
  return (
    <div className="bg-cafe-white rounded-lg p-4 border border-cafe-tan/10">
      <div className="h-16 rounded bg-cafe-black mb-3 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded bg-cafe-tan"
          style={{ opacity: parseFloat(value) }}
        />
      </div>
      <p className="text-sm font-semibold text-cafe-brown">{name}</p>
      <p className="text-xs font-mono text-cafe-tan">{token}: {value}</p>
    </div>
  );
}

function FontCard({
  name,
  variable,
  usage,
  fontClass,
  fontStyle,
  description,
  isAccessibility = false
}: {
  name: string;
  variable: string;
  usage: string;
  fontClass?: string;
  fontStyle?: React.CSSProperties;
  description: string;
  isAccessibility?: boolean;
}) {
  return (
    <div className={`rounded-xl p-6 border ${isAccessibility ? 'border-dashed border-cafe-tan/30 bg-cafe-mist' : 'border-cafe-tan/10 bg-cafe-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-cafe-brown">{name}</h4>
          <p className="text-xs font-mono text-cafe-tan">{variable}</p>
        </div>
        {isAccessibility && (
          <span className="text-[10px] uppercase tracking-wider bg-cafe-olive text-cafe-white px-2 py-1 rounded">A11y</span>
        )}
      </div>
      <div className={fontClass} style={fontStyle}>
        <p className="text-3xl text-cafe-black mb-2">The quick brown fox</p>
        <p className="text-base text-cafe-brown opacity-80">{description}</p>
      </div>
      <p className="text-xs text-cafe-tan mt-4 pt-4 border-t border-cafe-tan/10">{usage}</p>
    </div>
  );
}

function TypeScaleRow({ label, size, className, children }: { label: string; size: string; className: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-6 border-b border-cafe-tan/10 last:border-0 last:pb-0">
      <div className="md:w-32 flex-shrink-0">
        <span className="text-xs font-mono text-cafe-tan">{label}</span>
        <p className="text-[10px] font-mono text-cafe-tan-dark">{size}</p>
      </div>
      <div className={`${className} text-cafe-black`}>
        {children}
      </div>
    </div>
  );
}

function WeightCard({ weight, name }: { weight: number; name: string }) {
  return (
    <div className="bg-cafe-white rounded-lg p-6 border border-cafe-tan/10 text-center">
      <p className="text-4xl text-cafe-black mb-2" style={{ fontWeight: weight }}>Aa</p>
      <p className="text-sm font-semibold text-cafe-brown">{name}</p>
      <p className="text-xs font-mono text-cafe-tan">{weight}</p>
    </div>
  );
}

function ButtonShowcase({
  name,
  description,
  code,
  children
}: {
  name: string;
  description: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-8 border-b border-cafe-tan/10 last:border-0 last:pb-0">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <h4 className="text-lg font-semibold text-cafe-brown">{name}</h4>
          <p className="text-sm text-cafe-tan">{description}</p>
        </div>
        <code className="text-[10px] bg-cafe-mist text-cafe-tan-dark px-3 py-2 rounded font-mono whitespace-nowrap">
          {code}
        </code>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {children}
      </div>
    </div>
  );
}

function AnimationCard({
  name,
  className,
  keyframes,
  duration,
  easing,
  isInfinite = false
}: {
  name: string;
  className: string;
  keyframes: string;
  duration: string;
  easing: string;
  isInfinite?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const triggerAnimation = () => {
    if (!isInfinite) {
      setIsPlaying(true);
      setKey(k => k + 1);
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  return (
    <div className="bg-cafe-white rounded-xl p-6 border border-cafe-tan/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-cafe-brown">{name}</h4>
          <p className="text-xs font-mono text-cafe-tan">{keyframes}</p>
        </div>
        {!isInfinite && (
          <button
            onClick={triggerAnimation}
            className="text-xs bg-cafe-mist text-cafe-brown px-3 py-1 rounded hover:bg-cafe-tan/20 transition-colors"
          >
            Play
          </button>
        )}
      </div>

      <div className="h-24 bg-cafe-mist rounded-lg flex items-center justify-center overflow-hidden">
        <div
          key={key}
          className={`w-16 h-16 bg-cafe-tan rounded-lg flex items-center justify-center ${isPlaying || isInfinite ? className : ''}`}
        >
          <span className="text-cafe-white text-xs">Aa</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-cafe-mist rounded px-2 py-1">
          <span className="text-cafe-tan">Duration:</span> <span className="text-cafe-brown font-mono">{duration}</span>
        </div>
        <div className="bg-cafe-mist rounded px-2 py-1">
          <span className="text-cafe-tan">Easing:</span> <span className="text-cafe-brown font-mono text-[10px]">{easing}</span>
        </div>
      </div>
    </div>
  );
}

function IssueCard({
  severity,
  title,
  location,
  description,
  recommendation
}: {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  location: string;
  description: React.ReactNode;
  recommendation: string;
}) {
  const severityColors = {
    critical: 'border-l-red-500 bg-red-50',
    high: 'border-l-orange-500 bg-orange-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-blue-500 bg-blue-50',
    info: 'border-l-blue-400 bg-blue-50',
  };

  const severityLabels = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
    info: 'bg-blue-400',
  };

  return (
    <div className={`rounded-lg border-l-4 p-6 ${severityColors[severity]}`}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-wider text-white px-2 py-0.5 rounded ${severityLabels[severity]}`}>
            {severity}
          </span>
          <h4 className="text-lg font-semibold text-cafe-brown">{title}</h4>
        </div>
        <code className="text-[10px] bg-white/50 text-cafe-tan-dark px-2 py-1 rounded font-mono">
          {location}
        </code>
      </div>

      <div className="text-sm text-cafe-brown mb-4">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>

      <div className="bg-white/50 rounded p-4">
        <p className="text-xs uppercase tracking-wider text-cafe-olive font-semibold mb-1">Recommendation</p>
        <p className="text-sm text-cafe-brown">{recommendation}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-cafe-white rounded-lg p-4 border border-cafe-tan/10 text-center">
      <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`} />
      <p className="text-2xl font-display text-cafe-brown">{value}</p>
      <p className="text-xs uppercase tracking-wider text-cafe-tan">{label}</p>
    </div>
  );
}

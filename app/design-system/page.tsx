/**
 * @file Design System Dashboard
 * @description Comprehensive style guide and design system documentation for The Notebook Cafe
 * Covers color palette, typography, components, CSS architecture, and coding standards
 */

"use client";

import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// DATA CONSTANTS
// ============================================================

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'animations', label: 'Animations' },
  { id: 'components', label: 'Components' },
  { id: 'issues', label: 'Issues' },
];

const QUALITY_SCORES = {
  overall: 9,
  design: 8,
  codeQuality: 9,
  architecture: 9,
  testing: 8,
  security: 10,
  performance: 9,
  accessibility: 8,
};

const CORE_COLORS = [
  { name: 'cafe-black', hex: '#2c2420', usage: 'Headings, primary text, primary buttons', variable: '--color-cafe-black' },
  { name: 'cafe-brown', hex: '#4a3b32', usage: 'Body text, secondary elements', variable: '--color-cafe-brown' },
  { name: 'cafe-tan', hex: '#a48d78', usage: 'Primary accent, CTAs, highlights', variable: '--color-cafe-tan' },
  { name: 'cafe-tan-dark', hex: '#8e7965', usage: 'Button hover states', variable: '--color-cafe-tan-dark' },
  { name: 'cafe-beige', hex: '#cbb9a4', usage: 'Borders, muted elements', variable: '--color-cafe-beige' },
  { name: 'cafe-luxe-oat', hex: '#cbbfaf', usage: 'Navigation accents', variable: '--color-cafe-luxe-oat' },
  { name: 'cafe-cream', hex: '#ede7d8', usage: 'Section backgrounds', variable: '--color-cafe-cream' },
  { name: 'cafe-mist', hex: '#f4f1ea', usage: 'Light backgrounds, navbar', variable: '--color-cafe-mist' },
  { name: 'cafe-white', hex: '#fdfbf7', usage: 'Main background', variable: '--color-cafe-white' },
];

const EXTENDED_COLORS = [
  { name: 'coffee-50', hex: '#f3efe9', usage: 'Off-white text', variable: '--color-coffee-50' },
  { name: 'coffee-900', hex: '#2c241f', usage: 'Navbar text (scrolled)', variable: '--color-coffee-900' },
  { name: 'espresso-brown', hex: '#2a1f16', usage: 'Deep shadows', variable: '--color-espresso-brown' },
  { name: 'cafe-olive', hex: '#4a4f41', usage: 'Accent color', variable: '--color-cafe-olive' },
];

const FONTS = [
  {
    name: 'Playfair Display',
    variable: '--font-display',
    usage: 'Headings, hero text, editorial content',
    weights: '400-700',
    format: '.woff2 (104KB)',
    sample: 'Where Every Cup Tells A Story'
  },
  {
    name: 'Inter',
    variable: '--font-inter',
    usage: 'Body text, UI elements, descriptions',
    weights: '400, 500',
    format: '.woff2',
    sample: 'Premium specialty coffee meets creative sanctuary'
  },
  {
    name: 'Torus',
    variable: '--font-torus',
    usage: 'Alternative body font',
    weights: '400, 700',
    format: '.otf',
    sample: 'Riverside, CA — Est. 2024'
  },
];

const COMPONENTS = {
  layout: ['SiteHeader', 'SiteFooter', 'SiteShell'],
  ui: ['Button', 'Reveal', 'RevealText', 'FadeInSection', 'ConsentBanner', 'HeroButtons', 'NewsletterSubscribe', 'PasswordGate'],
  features: ['HeroSection', 'MenuSection', 'ProductModal', 'CartDrawer', 'NewsletterSection', 'ContactForm', 'CareersApplyForm', 'AccessibilityWidget'],
  providers: ['CartProvider'],
  seo: ['LocalBusinessJsonLd', 'FAQJsonLd', 'MenuJsonLd'],
};

const BUTTON_VARIANTS = [
  { name: 'Primary', classes: 'bg-cafe-black text-cafe-cream hover:bg-cafe-brown', usage: 'Main CTAs, form submissions' },
  { name: 'Secondary', classes: 'bg-cafe-tan text-white hover:bg-cafe-tan-dark', usage: 'Secondary actions' },
  { name: 'Outline', classes: 'border-2 border-cafe-black text-cafe-black hover:bg-cafe-black hover:text-cafe-cream', usage: 'Tertiary actions' },
  { name: 'Ghost', classes: 'text-cafe-black hover:bg-cafe-black/5', usage: 'Minimal actions' },
];

const CODING_RULES = [
  { category: 'Imports', rule: 'Use absolute imports (@/app/...)', status: 'enforced' },
  { category: 'Components', rule: 'PascalCase naming (CartProvider.tsx)', status: 'enforced' },
  { category: 'CSS Classes', rule: 'kebab-case naming (consent-banner)', status: 'enforced' },
  { category: 'Server/Client', rule: "Server Components default, 'use client' when needed", status: 'enforced' },
  { category: 'Security', rule: 'CSRF + Rate Limiting + Sanitization on all API routes', status: 'enforced' },
  { category: 'TypeScript', rule: 'Strict mode, avoid any', status: 'enforced' },
  { category: 'Documentation', rule: 'JSDoc headers on all major files', status: 'enforced' },
  { category: 'Mobile', rule: 'Mobile-first responsive design', status: 'enforced' },
];

const RECOMMENDATIONS = [
  { priority: 'high', issue: 'Duplicate validation functions', action: 'Extract to shared app/lib/server/validation.ts' },
  { priority: 'high', issue: 'Button inconsistency', action: 'Standardize all buttons to use Button component' },
  { priority: 'medium', issue: 'Legacy CSS files', action: 'Delete 6 consolidated files from app/styles/' },
  { priority: 'medium', issue: 'Missing CartProvider tests', action: 'Add unit tests for cart state management' },
  { priority: 'low', issue: 'Cart ID generation', action: 'Replace Math.random() with crypto.randomUUID()' },
  { priority: 'low', issue: 'Rate limiting scope', action: 'Document serverless limitations or use Redis' },
];

// ============================================================
// HELPER COMPONENTS
// ============================================================

const RING_RADIUS = 45;

const getScoreColor = (score: number): string => {
  if (score >= 9) return 'var(--color-cafe-black)';
  if (score >= 7) return 'var(--color-cafe-tan)';
  return 'var(--color-cafe-tan-dark)';
};

const ScoreRing = ({ score, label, size = 'lg' }: { score: number; label: string; size?: 'sm' | 'lg' }) => {
  const circumference = 2 * Math.PI * RING_RADIUS;
  const strokeDashoffset = circumference - (score / 10) * circumference;
  const dimensions = size === 'lg' ? 'w-32 h-32' : 'w-20 h-20';
  const textSize = size === 'lg' ? 'text-3xl' : 'text-lg';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${dimensions}`}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${label} score: ${score} out of 10`}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(164, 141, 120, 0.15)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSize} font-display font-bold text-cafe-black`}>{score}</span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-[0.15em] text-cafe-tan-dark font-semibold">{label}</span>
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="mb-12">
    <span className="text-xs uppercase tracking-[0.3em] text-cafe-tan font-bold">{eyebrow}</span>
    <h2 className="text-4xl md:text-5xl font-display text-cafe-black mt-2 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-cafe-brown max-w-2xl">{subtitle}</p>}
    <div className="w-16 h-0.5 bg-cafe-tan mt-6" />
  </div>
);

const ColorSwatch = ({ name, hex, usage, variable }: { name: string; hex: string; usage: string; variable: string }) => {
  const isLight = ['cafe-cream', 'cafe-mist', 'cafe-white', 'cafe-beige', 'coffee-50'].includes(name);
  return (
    <div className="group">
      <div
        className="aspect-square rounded-xl mb-4 shadow-lg shadow-cafe-black/5 flex items-end p-4 transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'text-cafe-black' : 'text-white'}`}>
          {hex}
        </span>
      </div>
      <h4 className="font-semibold text-cafe-black text-sm">{name}</h4>
      <p className="text-xs text-cafe-tan-dark mt-1">{usage}</p>
      <code className="text-[10px] font-mono text-cafe-beige block mt-2">{variable}</code>
    </div>
  );
};

const FontPreview = ({ font }: { font: typeof FONTS[0] }) => (
  <div className="p-8 border border-cafe-tan/20 rounded-2xl bg-cafe-white/50 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-6 pb-4 border-b border-cafe-tan/10">
      <div>
        <h3 className="text-xl font-bold text-cafe-black">{font.name}</h3>
        <code className="text-xs font-mono text-cafe-tan-dark">{font.variable}</code>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-cafe-tan bg-cafe-mist px-3 py-1 rounded-full">
        {font.format}
      </span>
    </div>
    <div
      className="text-4xl text-cafe-black mb-4 leading-tight"
      style={{ fontFamily: font.name === 'Playfair Display' ? 'var(--font-display)' : font.name === 'Inter' ? 'var(--font-inter)' : 'var(--font-torus)' }}
    >
      {font.sample}
    </div>
    <div className="flex gap-4 text-xs text-cafe-brown mt-4">
      <span><strong>Weights:</strong> {font.weights}</span>
      <span><strong>Usage:</strong> {font.usage}</span>
    </div>
  </div>
);

const ComponentCard = ({ name, category }: { name: string; category: string }) => (
  <div className="px-4 py-3 bg-cafe-white border border-cafe-tan/10 rounded-lg hover:border-cafe-tan/30 hover:shadow-sm transition-all group">
    <code className="text-sm font-mono text-cafe-black group-hover:text-cafe-tan transition-colors">{name}</code>
    <span className="text-[10px] text-cafe-beige block mt-1">{category}/</span>
  </div>
);

const RuleRow = ({ rule }: { rule: typeof CODING_RULES[0] }) => (
  <div className="flex items-center justify-between py-4 border-b border-cafe-tan/10 last:border-0">
    <div className="flex items-center gap-4">
      <span className="w-24 text-xs uppercase tracking-widest text-cafe-tan font-semibold">{rule.category}</span>
      <span className="text-cafe-brown">{rule.rule}</span>
    </div>
    <span className={`text-xs px-3 py-1 rounded-full ${
      rule.status === 'enforced' ? 'bg-cafe-black text-cafe-cream' : 'bg-cafe-mist text-cafe-brown'
    }`}>
      {rule.status}
    </span>
  </div>
);

const RecommendationCard = ({ item }: { item: typeof RECOMMENDATIONS[0] }) => (
  <div className={`p-6 rounded-xl border-l-4 ${
    item.priority === 'high' ? 'border-l-cafe-black bg-cafe-mist' :
    item.priority === 'medium' ? 'border-l-cafe-tan bg-cafe-white' :
    'border-l-cafe-beige bg-cafe-white/50'
  }`}>
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-[10px] uppercase tracking-widest font-bold ${
        item.priority === 'high' ? 'text-cafe-black' : 'text-cafe-tan'
      }`}>
        {item.priority} priority
      </span>
    </div>
    <h4 className="font-semibold text-cafe-black mb-1">{item.issue}</h4>
    <p className="text-sm text-cafe-brown">{item.action}</p>
  </div>
);

const TypeScaleRow = ({ label, size, className, children, as: Element = "div" }: { label: string; size: string; className: string; children: React.ReactNode; as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-6 border-b border-cafe-tan/10 last:border-0 last:pb-0">
    <div className="md:w-32 flex-shrink-0">
      <span className="text-xs font-mono text-cafe-tan">{label}</span>
      <p className="text-[10px] font-mono text-cafe-tan-dark">{size}</p>
    </div>
    <Element className={`${className} text-cafe-black`}>
      {children}
    </Element>
  </div>
);

const WeightCard = ({ weight, name, fontClass = "font-sans" }: { weight: number; name: string; fontClass?: string }) => (
  <div className="bg-cafe-white rounded-lg p-6 border border-cafe-tan/10 text-center">
    <p className={`text-4xl text-cafe-black mb-2 ${fontClass}`} style={{ fontWeight: weight }}>Aa</p>
    <p className="text-sm font-semibold text-cafe-brown">{name}</p>
    <p className="text-xs font-mono text-cafe-tan">{weight}</p>
  </div>
);

const AnimationCard = ({
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
}) => {
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
};

const IssueCard = ({
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
}) => {
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
};

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="bg-cafe-white rounded-lg p-4 border border-cafe-tan/10 text-center">
    <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`} />
    <p className="text-2xl font-display text-cafe-brown">{value}</p>
    <p className="text-xs uppercase tracking-wider text-cafe-tan">{label}</p>
  </div>
);

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 300; // Approximate header height
      setIsHeaderVisible(window.scrollY < headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cafe-mist">
      {/* Hero Header */}
      <header className="relative py-24 md:py-32 px-6 bg-cafe-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cafe-tan rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cafe-cream rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <span className="text-xs uppercase tracking-[0.4em] text-cafe-tan font-bold">The Notebook Cafe</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-cafe-cream mt-4 leading-[0.95]">
            Design<br />
            <span className="text-cafe-tan italic">System</span>
          </h1>
          <p className="text-xl text-cafe-beige mt-8 max-w-xl">
            Comprehensive style guide, component library, and coding standards for building consistent, beautiful experiences.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 text-xs text-cafe-luxe-oat">
            <span>Next.js 16</span>
            <span className="opacity-30">|</span>
            <span>Tailwind v4</span>
            <span className="opacity-30">|</span>
            <span>TypeScript</span>
            <span className="opacity-30">|</span>
            <span>35 Components</span>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <nav
        ref={navRef}
        className="relative md:sticky top-0 z-40 bg-cafe-white/90 backdrop-blur-md border-b border-cafe-tan/20 shadow-sm transition-all duration-300"
        style={{
          position: isHeaderVisible ? 'relative' : 'sticky',
          top: isHeaderVisible ? 'auto' : '0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {SECTIONS.map((section) => (
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

      {/* Quality Scores */}
      <section id="overview" className="py-16 px-6 bg-cafe-white border-b border-cafe-tan/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-cafe-tan font-bold">Codebase Health</span>
            <h2 className="text-3xl font-display text-cafe-black mt-2">Quality Scores</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <ScoreRing score={QUALITY_SCORES.overall} label="Overall" size="lg" />
            <ScoreRing score={QUALITY_SCORES.design} label="Design" size="sm" />
            <ScoreRing score={QUALITY_SCORES.codeQuality} label="Code" size="sm" />
            <ScoreRing score={QUALITY_SCORES.security} label="Security" size="sm" />
            <ScoreRing score={QUALITY_SCORES.performance} label="Performance" size="sm" />
            <ScoreRing score={QUALITY_SCORES.testing} label="Testing" size="sm" />
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section id="colors" className="py-24 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Visual Identity"
            title="Color Palette"
            subtitle="A warm, sophisticated palette inspired by specialty coffee culture. Creams, tans, and rich browns create an intimate, premium aesthetic."
          />

          <h3 className="text-lg font-semibold text-cafe-black mb-6 mt-12">Core Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {CORE_COLORS.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>

          <h3 className="text-lg font-semibold text-cafe-black mb-6 mt-16">Extended Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {EXTENDED_COLORS.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>

          <div className="mt-16 p-8 bg-cafe-cream/50 rounded-2xl border border-cafe-tan/10">
            <h4 className="font-semibold text-cafe-black mb-4">Color Usage Guidelines</h4>
            <ul className="text-sm text-cafe-brown space-y-2">
              <li><strong>Prefer CSS variables</strong> over static imports for theme support</li>
              <li><strong>Alternating backgrounds</strong> create visual rhythm: mist → white → cream → white</li>
              <li><strong>cafe-tan</strong> is the primary accent — use sparingly for CTAs and highlights</li>
              <li><strong>RGB helpers</strong> available for rgba() transparency (e.g., --cafe-tan-rgb)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section id="typography" className="py-24 px-6 bg-cafe-white scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Typography"
            title="Font System"
            subtitle="Elegant serif headings paired with clean sans-serif body text. The contrast creates editorial sophistication."
          />

          <div className="grid gap-8">
            {FONTS.map((font) => (
              <FontPreview key={font.name} font={font} />
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-cafe-mist rounded-2xl">
              <h4 className="text-lg font-semibold text-cafe-black mb-6">Heading Hierarchy</h4>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-cafe-tan">H1 / Hero</span>
                  <h1 className="text-5xl font-display text-cafe-black mt-1">Coffee & Community</h1>
                </div>
                <div>
                  <span className="text-xs font-mono text-cafe-tan">H2 / Section</span>
                  <h2 className="text-3xl font-display text-cafe-black mt-1">Our Signature Pours</h2>
                </div>
                <div>
                  <span className="text-xs font-mono text-cafe-tan">H3 / Card</span>
                  <h3 className="text-2xl font-display text-cafe-black mt-1">Lavender Haze Latte</h3>
                </div>
              </div>
            </div>

            <div className="p-8 bg-cafe-mist rounded-2xl">
              <h4 className="text-lg font-semibold text-cafe-black mb-6">Text Patterns</h4>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-cafe-tan">Eyebrow Label (font-inter)</span>
                  <p className="text-xs uppercase tracking-[0.3em] text-cafe-tan-dark font-bold font-inter mt-1">Our Story</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-cafe-tan">Body Text</span>
                  <p className="text-base text-cafe-brown mt-1 leading-relaxed">
                    We believe in the power of a good cup of coffee to bring people together.
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-cafe-tan">Italic Accent</span>
                  <h2 className="text-2xl font-display text-cafe-black mt-1">
                    Low lights, <span className="italic text-cafe-tan">better coffee</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Type Scale</h3>
            <div className="bg-cafe-mist rounded-xl p-8 border border-cafe-tan/10 space-y-8">
              <TypeScaleRow as="h1" label="Hero / H1" size="clamp(2.8rem, 6.5vw, 5.2rem)" className="text-5xl md:text-7xl font-display">
                Coffee & Community
              </TypeScaleRow>
              <TypeScaleRow as="h2" label="H2 / Section" size="2.25rem - 3rem" className="text-3xl md:text-4xl font-display">
                Our Signature Pours
              </TypeScaleRow>
              <TypeScaleRow as="h3" label="H3 / Card" size="1.5rem" className="text-2xl font-display">
                Lavender Haze Latte
              </TypeScaleRow>
              <TypeScaleRow as="h4" label="H4 / Subtitle" size="1.25rem" className="text-xl font-sans font-semibold">
                Crafted with Care
              </TypeScaleRow>
              <TypeScaleRow as="p" label="Body" size="1rem / 16px" className="text-base font-sans leading-relaxed max-w-xl">
                We believe in the power of a good cup of coffee to bring people together. Our beans are ethically sourced and roasted with care.
              </TypeScaleRow>
              <TypeScaleRow as="span" label="Caption" size="0.75rem" className="text-xs uppercase tracking-widest text-cafe-tan-dark font-bold">
                Est. 2024 • Riverside, CA
              </TypeScaleRow>
            </div>
          </div>

          {/* Font Weights - Playfair Display */}
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Font Weights — Playfair Display</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <WeightCard weight={400} name="Regular" fontClass="font-display" />
              <WeightCard weight={500} name="Medium" fontClass="font-display" />
              <WeightCard weight={600} name="Semibold" fontClass="font-display" />
              <WeightCard weight={700} name="Bold" fontClass="font-display" />
            </div>
          </div>

          {/* Font Weights - Torus/Sans */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Font Weights — Torus (Sans)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <WeightCard weight={400} name="Regular" fontClass="font-sans" />
              <WeightCard weight={500} name="Medium" fontClass="font-sans" />
              <WeightCard weight={600} name="Semibold" fontClass="font-sans" />
              <WeightCard weight={700} name="Bold" fontClass="font-sans" />
            </div>
          </div>

          {/* Font Weights - Inter */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Font Weights — Inter</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <WeightCard weight={400} name="Regular" fontClass="font-inter" />
              <WeightCard weight={500} name="Medium" fontClass="font-inter" />
              <WeightCard weight={600} name="Semibold" fontClass="font-inter" />
              <WeightCard weight={700} name="Bold" fontClass="font-inter" />
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section id="buttons" className="py-24 px-6 bg-cafe-cream scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Interactive"
            title="Button Variants"
            subtitle="Consistent button styling with proper hover states, focus rings, and accessibility support."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUTTON_VARIANTS.map((variant) => (
              <div key={variant.name} className="p-6 bg-cafe-white rounded-xl">
                <h4 className="text-sm font-semibold text-cafe-black mb-4">{variant.name}</h4>
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${variant.classes}`}
                  aria-label={`Example ${variant.name} button style`}
                >
                  View Menu
                </button>
                <p className="text-xs text-cafe-brown mt-4">{variant.usage}</p>
                <code className="text-[10px] font-mono text-cafe-beige block mt-2 break-all">{variant.classes}</code>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-cafe-white rounded-xl border-l-4 border-l-cafe-tan">
            <h4 className="font-semibold text-cafe-black mb-2">Recommendation</h4>
            <p className="text-sm text-cafe-brown">
              Some pages use custom button classes instead of the Button component.
              Standardize all buttons to use the Button component variants for consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Button Exploration - 4 Directions */}
      <section className="py-24 px-6 bg-cafe-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Exploration"
            title="Button Directions"
            subtitle="Four distinct approaches to button styling. Each captures a different aspect of The Notebook Cafe's personality."
          />

          {/* Direction 1: Warm & Inviting */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-cafe-tan/20 flex items-center justify-center text-cafe-tan font-bold text-sm">1</span>
              <div>
                <h3 className="text-xl font-semibold text-cafe-black">Warm & Inviting</h3>
                <p className="text-sm text-cafe-brown">Soft edges, earthy tones, cozy handwritten note feeling</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary - Warm */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Primary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-full bg-[#8b7355] text-cafe-cream font-medium transition-all duration-300 hover:bg-[#7a6349] hover:shadow-lg hover:shadow-[#8b7355]/20 hover:-translate-y-0.5"
                >
                  View Menu
                </button>
              </div>
              {/* Secondary - Warm */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Secondary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-full bg-cafe-cream text-cafe-brown font-medium transition-all duration-300 hover:bg-cafe-beige hover:-translate-y-0.5"
                >
                  Our Story
                </button>
              </div>
              {/* Outline - Warm */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Outline</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-full border-2 border-cafe-beige text-cafe-brown font-medium transition-all duration-300 hover:border-[#8b7355] hover:text-[#8b7355]"
                >
                  Contact
                </button>
              </div>
              {/* Ghost - Warm */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Ghost</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-full text-cafe-brown font-medium transition-all duration-300 hover:bg-cafe-cream/50"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Direction 2: Editorial & Refined */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-cafe-black/10 flex items-center justify-center text-cafe-black font-bold text-sm">2</span>
              <div>
                <h3 className="text-xl font-semibold text-cafe-black">Editorial & Refined</h3>
                <p className="text-sm text-cafe-brown">Elegant, magazine-quality, sophisticated restraint</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary - Editorial */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Primary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-cafe-black text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-cafe-brown"
                >
                  View Menu
                </button>
              </div>
              {/* Secondary - Editorial */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Secondary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-cafe-tan text-cafe-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-cafe-tan-dark"
                >
                  Our Story
                </button>
              </div>
              {/* Outline - Editorial */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Outline</span>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm border border-cafe-black text-cafe-black text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-cafe-black hover:text-cafe-cream"
                >
                  Contact
                </button>
              </div>
              {/* Ghost - Editorial */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Ghost</span>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm text-cafe-black text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:text-cafe-tan border-b-2 border-transparent hover:border-cafe-tan"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Direction 3: Playful & Creative */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-[#c4a77d]/20 flex items-center justify-center text-[#c4a77d] font-bold text-sm">3</span>
              <div>
                <h3 className="text-xl font-semibold text-cafe-black">Playful & Creative</h3>
                <p className="text-sm text-cafe-brown">Expressive, artsy, unexpected personality</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary - Playful */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Primary</span>
                <button
                  type="button"
                  className="group w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8b7355] to-[#a48d78] text-cafe-cream font-medium transition-all duration-300 hover:shadow-xl hover:shadow-[#8b7355]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="inline-flex items-center gap-2">
                    View Menu
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </button>
              </div>
              {/* Secondary - Playful */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Secondary</span>
                <button
                  type="button"
                  className="group w-full px-6 py-3.5 rounded-xl bg-cafe-cream text-cafe-brown font-medium transition-all duration-300 hover:bg-cafe-beige hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                >
                  Our Story
                </button>
              </div>
              {/* Outline - Playful */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Outline</span>
                <button
                  type="button"
                  className="group w-full px-6 py-3.5 rounded-xl border-2 border-dashed border-cafe-tan text-cafe-brown font-medium transition-all duration-300 hover:border-solid hover:bg-cafe-tan/10"
                >
                  Contact
                </button>
              </div>
              {/* Ghost - Playful */}
              <div className="p-6 bg-cafe-mist rounded-2xl">
                <span className="text-xs text-cafe-tan-dark mb-3 block">Ghost</span>
                <button
                  type="button"
                  className="group w-full px-6 py-3.5 rounded-xl text-cafe-brown font-medium transition-all duration-300 hover:text-[#8b7355]"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b7355] transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Direction 4: Moody & Atmospheric */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-cafe-black/80 flex items-center justify-center text-cafe-cream font-bold text-sm">4</span>
              <div>
                <h3 className="text-xl font-semibold text-cafe-black">Moody & Atmospheric</h3>
                <p className="text-sm text-cafe-brown">Low-light lounge energy, intimate, smooth transitions</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary - Moody */}
              <div className="p-6 bg-[#2c2420] rounded-2xl">
                <span className="text-xs text-cafe-beige mb-3 block">Primary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-lg bg-cafe-tan text-cafe-black font-medium transition-all duration-500 hover:bg-cafe-cream hover:shadow-lg hover:shadow-cafe-tan/30"
                >
                  View Menu
                </button>
              </div>
              {/* Secondary - Moody */}
              <div className="p-6 bg-[#2c2420] rounded-2xl">
                <span className="text-xs text-cafe-beige mb-3 block">Secondary</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-lg bg-cafe-brown/50 text-cafe-cream font-medium transition-all duration-500 hover:bg-cafe-brown hover:shadow-lg hover:shadow-cafe-brown/20"
                >
                  Our Story
                </button>
              </div>
              {/* Outline - Moody */}
              <div className="p-6 bg-[#2c2420] rounded-2xl">
                <span className="text-xs text-cafe-beige mb-3 block">Outline</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-lg border border-cafe-beige/40 text-cafe-beige font-medium transition-all duration-500 hover:border-cafe-tan hover:text-cafe-tan hover:shadow-lg hover:shadow-cafe-tan/10"
                >
                  Contact
                </button>
              </div>
              {/* Ghost - Moody */}
              <div className="p-6 bg-[#2c2420] rounded-2xl">
                <span className="text-xs text-cafe-beige mb-3 block">Ghost</span>
                <button
                  type="button"
                  className="w-full px-6 py-3.5 rounded-lg text-cafe-beige/70 font-medium transition-all duration-500 hover:text-cafe-cream hover:bg-white/5"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Comparison note */}
          <div className="mt-12 p-6 bg-cafe-mist rounded-xl border border-cafe-tan/20">
            <h4 className="font-semibold text-cafe-black mb-2">Which direction speaks to you?</h4>
            <p className="text-sm text-cafe-brown">
              Consider how each style feels when you imagine clicking &quot;Order Now&quot; at 10pm with lo-fi playing.
              The right buttons should feel like an extension of the cafe&apos;s atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* Color Exploration - Editorial Style */}
      <section className="py-24 px-6 bg-cafe-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Color Exploration"
            title="Editorial Palette Options"
            subtitle="Testing warmer browns for primary buttons and different accents for secondary. All in the Editorial & Refined style."
          />

          {/* Primary Brown Options */}
          <div className="mb-20">
            <h3 className="text-2xl font-display text-cafe-black mb-2">Primary Button Colors</h3>
            <p className="text-sm text-cafe-brown mb-8">Warmer alternatives to pure black. Hover to see the darker state.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Coffee Brown */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#5c4a3a]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Coffee Brown</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#5c4a3a → #4a3c2f</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#5c4a3a] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#4a3c2f] hover:shadow-lg hover:shadow-[#5c4a3a]/25"
                >
                  View Menu
                </button>
                <p className="text-xs text-cafe-brown mt-3">Rich, roasted, like fresh espresso</p>
              </div>

              {/* Walnut */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#6b5344]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Walnut</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#6b5344 → #574436</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#6b5344] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#574436] hover:shadow-lg hover:shadow-[#6b5344]/25"
                >
                  View Menu
                </button>
                <p className="text-xs text-cafe-brown mt-3">Warmer, woody, inviting</p>
              </div>

              {/* Mocha */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#7a6352]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Mocha</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#7a6352 → #655143</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#7a6352] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#655143] hover:shadow-lg hover:shadow-[#7a6352]/25"
                >
                  View Menu
                </button>
                <p className="text-xs text-cafe-brown mt-3">Lighter, milk chocolate territory</p>
              </div>

              {/* Chestnut */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#8b7355]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Chestnut</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#8b7355 → #7a6349</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#8b7355] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#7a6349] hover:shadow-lg hover:shadow-[#8b7355]/25"
                >
                  View Menu
                </button>
                <p className="text-xs text-cafe-brown mt-3">Warm brown from Direction 1</p>
              </div>
            </div>
          </div>

          {/* Secondary Accent Options */}
          <div className="mb-20">
            <h3 className="text-2xl font-display text-cafe-black mb-2">Secondary Button Colors</h3>
            <p className="text-sm text-cafe-brown mb-8">Accent alternatives to tan. Each brings a different personality.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Terracotta */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#c4846c]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Terracotta</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#c4846c → #b3735b</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#c4846c] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#b3735b] hover:shadow-lg hover:shadow-[#c4846c]/25"
                >
                  Our Story
                </button>
                <p className="text-xs text-cafe-brown mt-3">Earthy, warm, artisanal feel</p>
              </div>

              {/* Dusty Rose */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#c9a396]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Dusty Rose</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#c9a396 → #b89285</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#c9a396] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#b89285] hover:shadow-lg hover:shadow-[#c9a396]/25"
                >
                  Our Story
                </button>
                <p className="text-xs text-cafe-brown mt-3">Soft, sophisticated, unexpected</p>
              </div>

              {/* Sage */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#8a9a7a]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Sage</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#8a9a7a → #798969</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#8a9a7a] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#798969] hover:shadow-lg hover:shadow-[#8a9a7a]/25"
                >
                  Our Story
                </button>
                <p className="text-xs text-cafe-brown mt-3">Natural, grounding, coffee-plant vibes</p>
              </div>

              {/* Copper */}
              <div className="p-6 bg-cafe-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#bf8a5a]" />
                  <div>
                    <h4 className="text-sm font-semibold text-cafe-black">Copper</h4>
                    <code className="text-[10px] text-cafe-tan-dark">#bf8a5a → #a87a4d</code>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-sm bg-[#bf8a5a] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#a87a4d] hover:shadow-lg hover:shadow-[#bf8a5a]/25"
                >
                  Our Story
                </button>
                <p className="text-xs text-cafe-brown mt-3">Warm metallic energy, premium feel</p>
              </div>
            </div>
          </div>

          {/* Combined Examples */}
          <div>
            <h3 className="text-2xl font-display text-cafe-black mb-2">Recommended Combinations</h3>
            <p className="text-sm text-cafe-brown mb-8">Primary + Secondary pairings that work well together.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Combo 1: Walnut + Terracotta */}
              <div className="p-8 bg-cafe-white rounded-2xl border border-cafe-tan/10">
                <h4 className="text-lg font-semibold text-cafe-black mb-1">Walnut + Terracotta</h4>
                <p className="text-xs text-cafe-tan-dark mb-6">Earthy and warm — artisanal coffee house</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#6b5344] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#574436] hover:shadow-lg">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#c4846c] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#b3735b] hover:shadow-lg">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-[#6b5344] text-[#6b5344] text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#6b5344] hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>

              {/* Combo 2: Coffee + Copper */}
              <div className="p-8 bg-cafe-white rounded-2xl border border-cafe-tan/10">
                <h4 className="text-lg font-semibold text-cafe-black mb-1">Coffee + Copper</h4>
                <p className="text-xs text-cafe-tan-dark mb-6">Rich and premium — specialty roaster energy</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#5c4a3a] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#4a3c2f] hover:shadow-lg">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#bf8a5a] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#a87a4d] hover:shadow-lg">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-[#5c4a3a] text-[#5c4a3a] text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#5c4a3a] hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>

              {/* Combo 3: Mocha + Dusty Rose */}
              <div className="p-8 bg-cafe-white rounded-2xl border border-cafe-tan/10">
                <h4 className="text-lg font-semibold text-cafe-black mb-1">Mocha + Dusty Rose</h4>
                <p className="text-xs text-cafe-tan-dark mb-6">Soft and sophisticated — modern cafe aesthetic</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#7a6352] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#655143] hover:shadow-lg">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#c9a396] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#b89285] hover:shadow-lg">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-[#7a6352] text-[#7a6352] text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#7a6352] hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>

              {/* Combo 4: Chestnut + Sage */}
              <div className="p-8 bg-cafe-white rounded-2xl border border-cafe-tan/10">
                <h4 className="text-lg font-semibold text-cafe-black mb-1">Chestnut + Sage</h4>
                <p className="text-xs text-cafe-tan-dark mb-6">Natural and grounded — botanical coffee vibes</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#8b7355] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#7a6349] hover:shadow-lg">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#8a9a7a] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#798969] hover:shadow-lg">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-[#8b7355] text-[#8b7355] text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#8b7355] hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dark background test */}
          <div className="mt-16">
            <h3 className="text-2xl font-display text-cafe-black mb-2">On Dark Backgrounds</h3>
            <p className="text-sm text-cafe-brown mb-8">How the combinations look in moody/dark contexts (footer, hero overlays).</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dark: Walnut + Terracotta */}
              <div className="p-8 bg-[#2c2420] rounded-2xl">
                <h4 className="text-lg font-semibold text-cafe-cream mb-1">Walnut + Terracotta</h4>
                <p className="text-xs text-cafe-beige mb-6">On dark background</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#6b5344] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#7a6352] hover:shadow-lg hover:shadow-[#6b5344]/30">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#c4846c] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#d4947c] hover:shadow-lg hover:shadow-[#c4846c]/30">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-cafe-beige/50 text-cafe-beige text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:border-cafe-cream hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>

              {/* Dark: Coffee + Copper */}
              <div className="p-8 bg-[#2c2420] rounded-2xl">
                <h4 className="text-lg font-semibold text-cafe-cream mb-1">Coffee + Copper</h4>
                <p className="text-xs text-cafe-beige mb-6">On dark background</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#5c4a3a] text-cafe-cream text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#6b5344] hover:shadow-lg hover:shadow-[#5c4a3a]/30">
                    View Menu
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm bg-[#bf8a5a] text-white text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#cf9a6a] hover:shadow-lg hover:shadow-[#bf8a5a]/30">
                    Our Story
                  </button>
                  <button type="button" className="px-6 py-3 rounded-sm border border-cafe-beige/50 text-cafe-beige text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:border-cafe-cream hover:text-cafe-cream">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Spacing & Layout */}
      <section id="spacing" className="py-24 px-6 bg-cafe-mist scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Layout"
            title="Spacing & Layout"
            subtitle="Consistent spacing creates visual rhythm and hierarchy."
          />

          {/* Container Widths */}
          <div className="mb-16">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Container Widths</h3>
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

          {/* Responsive Breakpoints */}
          <div>
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Responsive Breakpoints</h3>
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
                <div key={bp.prefix} className="flex items-center gap-4 bg-cafe-white rounded-lg p-4 border border-cafe-tan/10">
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
        </div>
      </section>

      {/* Animations */}
      <section id="animations" className="py-24 px-6 bg-cafe-white scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Motion"
            title="Animations"
            subtitle="Subtle motion enhances the user experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

          {/* Standard Transitions */}
          <div>
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Standard Transitions</h3>
            <div className="bg-cafe-mist rounded-xl p-8 border border-cafe-tan/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 bg-cafe-white hover:bg-cafe-tan/5 transition-colors duration-200">
                  <p className="text-2xl font-display text-cafe-brown mb-2">200ms</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Quick (buttons, hovers)</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 bg-cafe-white hover:bg-cafe-tan/5 transition-colors duration-300">
                  <p className="text-2xl font-display text-cafe-brown mb-2">300ms</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Standard (most UI)</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-cafe-tan/10 bg-cafe-white hover:bg-cafe-tan/5 transition-colors duration-500">
                  <p className="text-2xl font-display text-cafe-brown mb-2">500ms+</p>
                  <p className="text-xs text-cafe-tan uppercase tracking-wider">Slow (page transitions)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="py-24 px-6 bg-cafe-cream scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Component Library"
            title="35 Components"
            subtitle="Organized into layout, UI, features, providers, and SEO categories following a clear separation of concerns."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(COMPONENTS).map(([category, components]) => (
              <div key={category} className="p-6 bg-cafe-mist rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-cafe-black capitalize">{category}</h3>
                  <span className="text-xs bg-cafe-tan text-white px-2 py-0.5 rounded-full">
                    {components.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {components.map((name) => (
                    <ComponentCard key={name} name={name} category={category} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-cafe-mist/50 rounded-2xl border border-cafe-tan/10">
            <h4 className="font-semibold text-cafe-black mb-4">Component Organization</h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-cafe-brown">
              <div>
                <strong className="text-cafe-black">Location:</strong> app/components/
                <ul className="mt-2 space-y-1 ml-4">
                  <li>layout/ — Global layout (header, footer, shell)</li>
                  <li>ui/ — Reusable UI elements</li>
                  <li>features/ — Page-specific features</li>
                  <li>providers/ — Context providers</li>
                  <li>seo/ — Structured data components</li>
                </ul>
              </div>
              <div>
                <strong className="text-cafe-black">Patterns:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>Server Components by default</li>
                  <li>&quot;use client&quot; for interactivity</li>
                  <li>JSDoc documentation on all files</li>
                  <li>Barrel exports for clean imports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Architecture */}
      <section className="py-24 px-6 bg-cafe-mist">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Styling"
            title="CSS Architecture"
            subtitle="Tailwind v4 with custom CSS variables. Consolidated globals.css for performance (2334 lines)."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-cafe-white rounded-xl">
              <h4 className="font-semibold text-cafe-black mb-4">Approach</h4>
              <ul className="text-sm text-cafe-brown space-y-2">
                <li>Tailwind utilities first</li>
                <li>Custom CSS for complex patterns</li>
                <li>@theme directive for tokens</li>
                <li>Mobile-first responsive</li>
              </ul>
            </div>
            <div className="p-6 bg-cafe-white rounded-xl">
              <h4 className="font-semibold text-cafe-black mb-4">File Structure</h4>
              <ul className="text-sm text-cafe-brown space-y-2">
                <li><code className="text-cafe-tan">globals.css</code> — All global styles</li>
                <li><code className="text-cafe-tan">styles/pages/</code> — Page-specific</li>
                <li>Layout imports only globals.css</li>
                <li>Pages import their CSS</li>
              </ul>
            </div>
            <div className="p-6 bg-cafe-white rounded-xl">
              <h4 className="font-semibold text-cafe-black mb-4">Naming</h4>
              <ul className="text-sm text-cafe-brown space-y-2">
                <li>kebab-case classes</li>
                <li>BEM-like for components</li>
                <li>cafe-* color utilities</li>
                <li>animate-* for animations</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-cafe-white rounded-xl">
              <h4 className="font-semibold text-cafe-black mb-4">Breakpoints</h4>
              <div className="space-y-3 text-sm">
                {[
                  { bp: '320px', label: 'Base mobile' },
                  { bp: '640px (sm)', label: 'Tablet portrait' },
                  { bp: '768px (md)', label: 'Tablet landscape' },
                  { bp: '1024px (lg)', label: 'Desktop' },
                  { bp: '1280px (xl)', label: 'Large desktop' },
                ].map((item) => (
                  <div key={item.bp} className="flex justify-between">
                    <code className="text-cafe-tan">{item.bp}</code>
                    <span className="text-cafe-brown">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-cafe-white rounded-xl">
              <h4 className="font-semibold text-cafe-black mb-4">Animation System</h4>
              <div className="flex flex-wrap gap-2">
                {['fadeInUp', 'slideUp', 'pulse', 'hero-zoom', 'scrollReveal', 'slideUpReveal', 'float'].map((anim) => (
                  <span key={anim} className="text-xs bg-cafe-mist text-cafe-brown px-3 py-1 rounded-full font-mono">
                    {anim}
                  </span>
                ))}
              </div>
              <p className="text-xs text-cafe-tan-dark mt-4">
                Reduced motion support: @media (prefers-reduced-motion: reduce)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Rules */}
      <section className="py-24 px-6 bg-cafe-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Standards"
            title="Coding Rules"
            subtitle="Enforced coding standards and patterns documented in CLAUDE.md and throughout the codebase."
          />

          <div className="bg-cafe-mist rounded-2xl p-8">
            {CODING_RULES.map((rule, i) => (
              <RuleRow key={i} rule={rule} />
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-cafe-mist rounded-2xl">
              <h4 className="font-semibold text-cafe-black mb-4">API Security Layers</h4>
              <ol className="text-sm text-cafe-brown space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cafe-tan text-white flex items-center justify-center text-xs shrink-0">1</span>
                  <div>
                    <strong className="text-cafe-black">CSRF Validation</strong>
                    <p className="text-cafe-tan-dark">Origin/Referer header checks</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cafe-tan text-white flex items-center justify-center text-xs shrink-0">2</span>
                  <div>
                    <strong className="text-cafe-black">Rate Limiting</strong>
                    <p className="text-cafe-tan-dark">IP-based, endpoint-specific limits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cafe-tan text-white flex items-center justify-center text-xs shrink-0">3</span>
                  <div>
                    <strong className="text-cafe-black">Input Sanitization</strong>
                    <p className="text-cafe-tan-dark">HTML/XSS prevention, email validation</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="p-8 bg-cafe-mist rounded-2xl">
              <h4 className="font-semibold text-cafe-black mb-4">Import Patterns</h4>
              <div className="space-y-4 text-sm font-mono">
                <div>
                  <span className="text-cafe-tan">{`// Types`}</span>
                  <code className="block text-cafe-black">{`import { CartItem } from '@/app/types'`}</code>
                </div>
                <div>
                  <span className="text-cafe-tan">{`// Server utils`}</span>
                  <code className="block text-cafe-black">{`import { logger } from '@/app/lib'`}</code>
                </div>
                <div>
                  <span className="text-cafe-tan">{`// Constants`}</span>
                  <code className="block text-cafe-black">{`import { COLORS } from '@/app/lib/constants'`}</code>
                </div>
                <div>
                  <span className="text-cafe-tan">{`// Components`}</span>
                  <code className="block text-cafe-black">{`import Button from '@/app/components/ui/Button'`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues & Recommendations */}
      <section id="issues" className="py-24 px-6 bg-cafe-cream scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Code Quality"
            title="Issues & Recommendations"
            subtitle="Identified inconsistencies and recommended fixes based on codebase analysis."
          />

          {/* Issue Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <StatCard label="Critical" value="0" color="bg-red-500" />
            <StatCard label="High" value="2" color="bg-orange-500" />
            <StatCard label="Medium" value="2" color="bg-yellow-500" />
            <StatCard label="Low" value="2" color="bg-blue-500" />
            <StatCard label="Info" value="1" color="bg-blue-400" />
          </div>

          {/* Issue Cards */}
          <div className="space-y-6">
            <IssueCard
              severity="high"
              title="Duplicate Validation Functions"
              location="Multiple API routes"
              description={
                <p>Email validation logic is duplicated in <code className="bg-white/50 px-1 rounded">/api/subscribe</code>, <code className="bg-white/50 px-1 rounded">/api/contact</code>, and <code className="bg-white/50 px-1 rounded">/api/apply</code>.</p>
              }
              recommendation="Create a shared validation utility at app/lib/server/validation.ts with functions like validateEmail(), validatePhone(), etc."
            />

            <IssueCard
              severity="high"
              title="Button Inconsistency"
              location="Multiple components"
              description="Some pages use custom button classes while others use the Button component, leading to visual inconsistencies."
              recommendation="Standardize all buttons to use the Button component variants. Audit all files for raw <button> elements with custom styling."
            />

            <IssueCard
              severity="medium"
              title="Legacy CSS Files"
              location="app/styles/"
              description="6 CSS files have been consolidated into globals.css but the original files still exist, causing potential confusion."
              recommendation="Delete the consolidated CSS files: announcement.css, buttons.css, consent-banner.css, footer.css, animations.css, sections.css"
            />

            <IssueCard
              severity="medium"
              title="Missing CartProvider Tests"
              location="app/components/providers/"
              description="CartProvider is critical infrastructure but has no unit tests for cart state management."
              recommendation="Add unit tests for addItem, removeItem, updateQuantity, and localStorage persistence."
            />

            <IssueCard
              severity="low"
              title="Cart ID Generation"
              location="CartProvider.tsx"
              description="Using Math.random() for cart item IDs could theoretically produce duplicates."
              recommendation="Replace Math.random() with crypto.randomUUID() for guaranteed unique IDs."
            />

            <IssueCard
              severity="low"
              title="Rate Limiting Scope"
              location="app/lib/server/rateLimit.ts"
              description="In-memory rate limiting resets on serverless cold starts."
              recommendation="Document the limitation or implement Redis-based rate limiting for production."
            />

            <IssueCard
              severity="info"
              title="Consider Component Library Extraction"
              location="app/components/ui/"
              description="The UI components (Button, Reveal, etc.) could be extracted to a shared package for use in other projects."
              recommendation="If planning to build more sites, consider extracting to a @thenotebook/ui package."
            />
          </div>

          {/* Original Recommendations Grid */}
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-cafe-black mb-6">Quick Wins</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECOMMENDATIONS.map((item, i) => (
                <RecommendationCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-cafe-black text-center">
        <p className="text-sm text-cafe-beige">
          Design System Dashboard for <span className="text-cafe-tan">The Notebook Cafe</span>
        </p>
        <p className="text-xs text-cafe-luxe-oat/50 mt-2">
          Generated from comprehensive codebase analysis
        </p>
      </footer>
    </div>
  );
}

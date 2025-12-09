
"use client";

import React, { useState, useEffect } from 'react';
import { 
  AccessibilityHumanIcon, XMarkIcon, TypeIcon, 
  ContrastIcon, EyeIcon, ResetIcon, ChevronLeftIcon,
  MousePointerIcon, LinkIcon, RulerIcon, PauseIcon, BrainIcon
} from '@/app/components/ui/AccessibilityIcons';

interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'xl';
  grayscale: boolean;
  highContrast: boolean;
  readableFont: boolean;
  hideImages: boolean;
  cursorSize: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  bionicReading: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 'normal',
  grayscale: false,
  highContrast: false,
  readableFont: false,
  hideImages: false,
  cursorSize: false,
  highlightLinks: false,
  dyslexiaFont: false,
  readingGuide: false,
  stopAnimations: false,
  bionicReading: false,
};

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'settings' | 'statement'>('settings');
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Apply settings to document
  useEffect(() => {
    const html = document.documentElement;

    // Text Size
    html.classList.remove('acc-text-md', 'acc-text-lg', 'acc-text-xl');
    if (settings.textSize === 'large') html.classList.add('acc-text-lg');
    if (settings.textSize === 'xl') html.classList.add('acc-text-xl');

    // Toggles
    if (settings.grayscale) html.classList.add('acc-grayscale'); else html.classList.remove('acc-grayscale');
    if (settings.highContrast) html.classList.add('acc-contrast'); else html.classList.remove('acc-contrast');
    if (settings.readableFont) html.classList.add('acc-readable-font'); else html.classList.remove('acc-readable-font');
    if (settings.hideImages) html.classList.add('acc-hide-images'); else html.classList.remove('acc-hide-images');
    if (settings.cursorSize) html.classList.add('acc-cursor-lg'); else html.classList.remove('acc-cursor-lg');
    if (settings.highlightLinks) html.classList.add('acc-highlight-links'); else html.classList.remove('acc-highlight-links');
    if (settings.dyslexiaFont) html.classList.add('acc-dyslexia-font'); else html.classList.remove('acc-dyslexia-font');
    if (settings.readingGuide) html.classList.add('acc-reading-guide'); else html.classList.remove('acc-reading-guide');
    if (settings.stopAnimations) html.classList.add('acc-stop-animations'); else html.classList.remove('acc-stop-animations');

  }, [settings]);

  // Bionic Reading Logic
  useEffect(() => {
    if (settings.bionicReading) {
      const pTags = document.querySelectorAll('main p');
      pTags.forEach(el => {
        const p = el as HTMLElement;
        if (!p.getAttribute('data-bionic-original')) {
          p.setAttribute('data-bionic-original', p.innerHTML);
          const words = p.innerText.split(' ');
          const newHtml = words.map(word => {
            const mid = Math.ceil(word.length / 2);
            return `<b class="bionic-bold">${word.slice(0, mid)}</b>${word.slice(mid)}`;
          }).join(' ');
          p.innerHTML = newHtml;
        }
      });
    } else {
      const pTags = document.querySelectorAll('main p[data-bionic-original]');
      pTags.forEach(p => {
        const original = p.getAttribute('data-bionic-original');
        if (original) {
           p.innerHTML = original;
           p.removeAttribute('data-bionic-original');
        }
      });
    }
  }, [settings.bionicReading]);

  // Reading Guide Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const guide = document.getElementById('reading-guide-line');
      if (guide && settings.readingGuide) {
        guide.style.top = `${e.clientY}px`;
      }
    };
    
    if (settings.readingGuide) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings.readingGuide]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] as boolean }));
  };

  const setTextSize = (size: 'normal' | 'large' | 'xl') => {
    setSettings(prev => ({ ...prev, textSize: size }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setView('settings');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-[110] w-14 h-14 bg-cafe-black text-cafe-cream rounded-full shadow-2xl flex items-center justify-center hover:scale-105 hover:bg-cafe-brown transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-cafe-tan/50 border border-cafe-tan/40"
        aria-label="Accessibility Options"
      >
        <AccessibilityHumanIcon className="w-8 h-8" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-cafe-black/40 z-[100]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-full md:w-96 bg-cafe-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-cafe-tan/20`}>
        
        {/* Header */}
        <div className="p-6 border-b border-cafe-tan/20 bg-cafe-cream flex items-center justify-between shrink-0">
          <h2 className="font-display font-bold text-xl text-cafe-black">
            {view === 'settings' ? 'Accessibility Tools' : 'Accessibility Statement'}
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-cafe-mist flex items-center justify-center text-cafe-brown transition-colors focus:outline-none focus:ring-2 focus:ring-cafe-tan/40"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-cafe-white">
          {view === 'settings' ? (
            <div className="space-y-4">
              <p className="text-sm text-cafe-brown font-sans mb-4">
                Customize your viewing experience with our accessibility tools.
              </p>

              {/* Text Size Control */}
              <div className="bg-cafe-cream p-4 rounded-xl border border-cafe-tan/20">
                 <div className="flex items-center gap-2 mb-3 text-cafe-black font-bold">
                    <TypeIcon className="w-5 h-5" />
                    <span>Text Size</span>
                 </div>
                 <div className="flex gap-2">
                    <button 
                       onClick={() => setTextSize('normal')}
                       className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${settings.textSize === 'normal' ? 'bg-cafe-black text-cafe-cream border-cafe-black' : 'bg-cafe-mist text-cafe-black border-cafe-tan/25 hover:bg-cafe-cream hover:border-cafe-tan/40'}`}
                    >
                      Aa
                    </button>
                    <button 
                       onClick={() => setTextSize('large')}
                       className={`flex-1 py-2 rounded-lg text-base font-bold border transition-colors ${settings.textSize === 'large' ? 'bg-cafe-black text-cafe-cream border-cafe-black' : 'bg-cafe-mist text-cafe-black border-cafe-tan/25 hover:bg-cafe-cream hover:border-cafe-tan/40'}`}
                    >
                      Aa
                    </button>
                    <button 
                       onClick={() => setTextSize('xl')}
                       className={`flex-1 py-2 rounded-lg text-lg font-bold border transition-colors ${settings.textSize === 'xl' ? 'bg-cafe-black text-cafe-cream border-cafe-black' : 'bg-cafe-mist text-cafe-black border-cafe-tan/25 hover:bg-cafe-cream hover:border-cafe-tan/40'}`}
                    >
                      Aa
                    </button>
                 </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <ToggleButton 
                  label="Bionic Reading" 
                  icon={<BrainIcon className="w-6 h-6" />}
                  active={settings.bionicReading} 
                  onClick={() => toggleSetting('bionicReading')} 
                />

                <ToggleButton 
                  label="Reading Guide" 
                  icon={<RulerIcon className="w-6 h-6" />}
                  active={settings.readingGuide} 
                  onClick={() => toggleSetting('readingGuide')} 
                />

                <ToggleButton 
                  label="High Contrast" 
                  icon={<ContrastIcon className="w-6 h-6" />}
                  active={settings.highContrast} 
                  onClick={() => toggleSetting('highContrast')} 
                />

                <ToggleButton 
                  label="Grayscale" 
                  icon={<EyeIcon className="w-6 h-6" />}
                  active={settings.grayscale} 
                  onClick={() => toggleSetting('grayscale')} 
                />

                <ToggleButton 
                  label="Dyslexia Font" 
                  icon={<span className="font-serif font-bold text-xl px-1">D</span>}
                  active={settings.dyslexiaFont} 
                  onClick={() => toggleSetting('dyslexiaFont')} 
                />
                
                <ToggleButton 
                  label="Highlight Links" 
                  icon={<LinkIcon className="w-6 h-6" />}
                  active={settings.highlightLinks} 
                  onClick={() => toggleSetting('highlightLinks')} 
                />

                <ToggleButton 
                  label="Large Cursor" 
                  icon={<MousePointerIcon className="w-6 h-6" />}
                  active={settings.cursorSize} 
                  onClick={() => toggleSetting('cursorSize')} 
                />

                 <ToggleButton 
                  label="Hide Images" 
                  icon={<EyeIcon className="w-6 h-6" />}
                  active={settings.hideImages} 
                  onClick={() => toggleSetting('hideImages')} 
                />

                <ToggleButton 
                  label="Stop Animations" 
                  icon={<PauseIcon className="w-6 h-6" />}
                  active={settings.stopAnimations} 
                  onClick={() => toggleSetting('stopAnimations')} 
                />
              </div>

              <div className="mt-8 pt-6 border-t border-cafe-tan/20">
                <button 
                  onClick={() => setView('statement')}
                  className="w-full py-3 px-4 bg-cafe-mist hover:bg-cafe-cream text-cafe-black rounded-xl font-bold transition-colors text-sm border border-cafe-tan/30"
                >
                  Read Accessibility Statement
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-cafe-brown animate-slide-in-left">
              <button 
                onClick={() => setView('settings')}
                className="flex items-center gap-2 text-cafe-black font-bold mb-6 hover:text-cafe-tan transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Back to Settings
              </button>
              
              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">Our Commitment to Accessibility</h3>
              <p className="mb-4">We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards to help users with various disabilities access our website effectively.</p>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">New Features</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Bionic Reading:</strong> Emphasizes the start of words to guide the eye.</li>
                <li><strong>Reading Guide:</strong> A horizontal line to help focus on specific text.</li>
                <li><strong>Dyslexia Friendly Font:</strong> Improved legibility for users with dyslexia.</li>
                <li><strong>Text Sizing:</strong> Granular control over font size.</li>
                <li><strong>Animation Control:</strong> Option to stop all moving elements.</li>
              </ul>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">Compliance Status</h3>
              <p className="mb-4">Our website strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>

              <h3 className="font-display font-bold text-lg text-cafe-black mb-2">Contact Us</h3>
              <p className="mb-8">If you experience any difficulty in accessing any part of this website, please contact us for assistance.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === 'settings' && (
          <div className="p-6 border-t border-cafe-tan/20 bg-cafe-cream shrink-0">
            <button 
              onClick={resetSettings}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-cafe-black text-cafe-black hover:bg-cafe-black hover:text-cafe-cream rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-cafe-tan/40"
            >
              <ResetIcon className="w-5 h-5" />
              Reset Settings
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Helper Component for consistency
const ToggleButton = ({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${active ? 'bg-cafe-black text-cafe-cream border-cafe-black shadow-md' : 'bg-cafe-white text-cafe-black border-cafe-tan/25 hover:border-cafe-tan/50 hover:bg-cafe-mist'}`}
  >
    {icon}
    <span className="font-bold flex-1 text-left">{label}</span>
    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? 'bg-cafe-tan/90' : 'bg-cafe-tan/25'}`}>
      <div className={`w-4 h-4 bg-cafe-cream rounded-full transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  </button>
);

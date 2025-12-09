"use client";

import { useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import NewsletterForm from './NewsLetterForm';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

/**
 * Full-screen newsletter signup modal with "Artisanal Warmth" aesthetic
 *
 * @component
 * @example
 * ```tsx
 * <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 * ```
 */
export default function NewsletterModal({ isOpen, onClose, source = "modal" }: NewsletterModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.dataset.modalOpen = 'true';
      body.style.overflow = 'hidden';
    } else {
      body.dataset.modalOpen = 'false';
      if (body.dataset.cartOpen !== 'true' && body.dataset.navOpen !== 'true') {
        body.style.overflow = '';
      }
    }

    return () => {
      body.dataset.modalOpen = 'false';
      if (body.dataset.cartOpen !== 'true' && body.dataset.navOpen !== 'true') {
        body.style.overflow = '';
      }
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-6"
      style={{ backgroundColor: 'rgba(44, 36, 32, 0.75)', top: 'var(--header-height, 0px)' }}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full h-full md:h-auto md:max-w-2xl md:max-h-[85vh] overflow-y-auto md:rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(250, 249, 246, 0.98) 0%, rgba(244, 241, 234, 0.98) 100%)',
          border: '2px solid rgba(var(--cafe-tan-rgb), 0.3)',
          boxShadow: '0 24px 64px rgba(44, 36, 32, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate corner decorations - hidden on mobile */}
        <div
          className="hidden md:block absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 rounded-tl-3xl pointer-events-none"
          style={{ borderColor: 'var(--cafe-tan)' }}
        ></div>
        <div
          className="hidden md:block absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 rounded-br-3xl pointer-events-none"
          style={{ borderColor: 'var(--cafe-tan)' }}
        ></div>

        {/* Industrial grid background accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.4) 8px, rgba(var(--cafe-tan-rgb), 0.4) 9px),
              repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.4) 8px, rgba(var(--cafe-tan-rgb), 0.4) 9px)`
          }}
        ></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          style={{
            backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
            border: '2px solid rgba(var(--cafe-tan-rgb), 0.4)'
          }}
          aria-label="Close modal"
        >
          <X
            size={24}
            className="transition-transform duration-300 group-hover:rotate-90"
            style={{ color: 'var(--cafe-tan)', strokeWidth: 2.5 }}
          />
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 py-20 md:py-12">
          {/* Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div
              className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--cafe-tan-rgb), 0.2) 0%, rgba(var(--cafe-tan-rgb), 0.35) 100%)',
                border: '3px solid rgba(var(--cafe-tan-rgb), 0.4)'
              }}
            >
              <Mail size={32} className="md:hidden" style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.8} />
              <Mail size={40} className="hidden md:block" style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.8} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8 md:mb-10">
            <h2
              className="font-serif text-3xl md:text-5xl mb-3 md:mb-4"
              style={{ color: 'var(--cafe-black)' }}
            >
              Join Our <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Community</span>
            </h2>

            <div className="w-16 md:w-20 h-[2px] mx-auto mb-4 md:mb-6" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

            <p
              className="text-sm md:text-lg font-light leading-relaxed max-w-xl mx-auto px-2"
              style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}
            >
              Be the first to know about our grand opening, exclusive pre-launch events, and behind-the-scenes updates from The Notebook Café.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto mb-8 md:mb-0">
            <NewsletterForm source={source} />
          </div>

          {/* Features List */}
          <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t" style={{ borderColor: 'rgba(var(--cafe-tan-rgb), 0.2)' }}>
            <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
              <div>
                <Sparkles className="mx-auto mb-2 md:mb-3" size={20} style={{ color: 'var(--cafe-tan)' }} />
                <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--cafe-brown)' }}>
                  Exclusive Updates
                </p>
              </div>
              <div>
                <Mail className="mx-auto mb-2 md:mb-3" size={20} style={{ color: 'var(--cafe-tan)' }} />
                <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--cafe-brown)' }}>
                  Opening News
                </p>
              </div>
              <div>
                <Sparkles className="mx-auto mb-2 md:mb-3" size={20} style={{ color: 'var(--cafe-tan)' }} />
                <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--cafe-brown)' }}>
                  Special Events
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-center mt-6 md:mt-8 opacity-60" style={{ color: 'var(--cafe-brown)' }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

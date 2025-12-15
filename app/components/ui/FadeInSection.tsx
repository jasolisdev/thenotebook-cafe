"use client";

import React, { CSSProperties, ReactNode } from 'react';
import { useOnScreen } from '@/app/hooks/useOnScreen';

/**
 * FadeInSection Component
 *
 * Soft fade-up animation for body content, images, and buttons.
 * Uses IntersectionObserver to trigger when element enters viewport.
 * Fades from opacity: 0 and translateY: 30px to final position.
 *
 * Perfect for: Paragraphs, buttons, images, cards, secondary content
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <FadeInSection>
 *   <p>Come for the coffee, stay for the vibe.</p>
 * </FadeInSection>
 *
 * // With delay (staggering after headlines)
 * <FadeInSection delay="400ms">
 *   <button>View Menu</button>
 * </FadeInSection>
 *
 * // With custom className
 * <FadeInSection delay="300ms" className="hero-description">
 *   <p>Handcrafted excellence in every cup.</p>
 * </FadeInSection>
 * ```
 *
 * @param {ReactNode} children - The content to fade in
 * @param {string} delay - Transition delay (e.g., "0s", "400ms")
 * @param {string} className - Additional CSS classes
 * @param {CSSProperties} style - Additional inline styles
 * @param {IntersectionObserverInit} observerOptions - Custom observer options
 * @returns {JSX.Element} Fade-in section component
 */
interface FadeInSectionProps {
  children: ReactNode;
  delay?: string;
  className?: string;
  style?: CSSProperties;
  observerOptions?: IntersectionObserverInit;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = "0s",
  className = "",
  style = {},
  observerOptions,
  ...props
}) => {
  const [ref, isVisible] = useOnScreen(observerOptions);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: delay, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeInSection;

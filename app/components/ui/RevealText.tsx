"use client";

import React, { CSSProperties, ReactNode } from 'react';

/**
 * RevealText Component
 *
 * High-end masked slide-up reveal animation for headlines and eyebrows.
 * Text slides up from 110% below baseline with expo ease-out curve.
 *
 * Perfect for: H1, H2, H3, eyebrows, hero titles
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <RevealText>
 *   <h1>Where Every Cup Tells a Story</h1>
 * </RevealText>
 *
 * // With delay (staggering)
 * <RevealText delay="200ms">
 *   <h2>Handcrafted Excellence</h2>
 * </RevealText>
 *
 * // With custom styles
 * <RevealText delay="0ms" style={{ marginBottom: '2rem' }}>
 *   <span className="eyebrow">Est. Riverside 2026</span>
 * </RevealText>
 * ```
 *
 * @param {ReactNode} children - The text/element to reveal
 * @param {string} delay - Animation delay (e.g., "0ms", "200ms", "400ms")
 * @param {CSSProperties} style - Additional inline styles for the mask container
 * @returns {JSX.Element} Masked reveal text component
 */
interface RevealTextProps {
  children: ReactNode;
  delay?: string;
  style?: CSSProperties;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = "0ms",
  style = {}
}) => {
  return (
    <span className="reveal-mask" style={style}>
      <span className="reveal-text-anim" style={{ animationDelay: delay }}>
        {children}
      </span>
    </span>
  );
};

export default RevealText;

"use client";

import React, { useState, useEffect, useRef } from 'react';

interface RevealProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  /** When true, animation replays every time the element re-enters the viewport. */
  replay?: boolean;
}

/**
 * Reveal Component
 *
 * Animates children when they scroll into view using Intersection Observer.
 *
 * @component
 * @example
 * ```tsx
 * import Reveal from '@/app/components/ui/Reveal';
 *
 * <Reveal delay={200}>
 *   <div>This content will fade and slide up when visible</div>
 * </Reveal>
 * ```
 *
 * @param {RevealProps} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in milliseconds (default: 0)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Animated wrapper component
 */
export default function Reveal({ children, delay = 0, className = '', replay = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (replay) {
          setIsVisible(entry.isIntersecting);
        } else if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [replay]);

  const style = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

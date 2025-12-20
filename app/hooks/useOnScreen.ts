"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * useOnScreen Hook
 *
 * IntersectionObserver hook to detect when an element enters the viewport.
 * Used for triggering fade-in animations on scroll.
 *
 * @param {IntersectionObserverInit} options - Observer configuration options
 * @returns {[React.RefObject<HTMLDivElement>, boolean]} - Ref and visibility state
 *
 * @example
 * ```tsx
 * const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
 * return <div ref={ref} className={isVisible ? 'visible' : ''}>Content</div>
 * ```
 */
export function useOnScreen(options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once visible, stay visible (no re-trigger)
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px', // Trigger 50px before entering viewport
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}

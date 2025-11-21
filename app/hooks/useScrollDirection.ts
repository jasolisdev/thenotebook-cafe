import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

interface UseScrollDirectionOptions {
  /**
   * Minimum scroll distance in pixels before direction change is detected.
   * Helps avoid jitter from small scroll movements.
   * @default 10
   */
  threshold?: number;

  /**
   * Initial scroll direction.
   * @default 'none'
   */
  initialDirection?: ScrollDirection;
}

/**
 * Custom hook that tracks scroll direction.
 * Returns 'up' when scrolling up, 'down' when scrolling down, or 'none' at the top.
 *
 * @param options Configuration options for scroll detection
 * @returns Current scroll direction
 *
 * @example
 * ```tsx
 * const scrollDirection = useScrollDirection({ threshold: 10 });
 * const isHidden = scrollDirection === 'down';
 * ```
 */
export function useScrollDirection(
  options: UseScrollDirectionOptions = {}
): ScrollDirection {
  const { threshold = 10, initialDirection = 'none' } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection);

  // Use refs to avoid re-running effect when these values change
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      console.log('[useScrollDirection] Scroll Y:', currentScrollY, 'Last:', lastScrollY.current);

      // At the very top of the page
      if (currentScrollY < 10) {
        console.log('[useScrollDirection] At top, setting direction: none');
        setScrollDirection('none');
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      // Only update if we've scrolled past the threshold
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDelta < threshold) {
        console.log('[useScrollDirection] Below threshold:', scrollDelta, '<', threshold);
        ticking.current = false;
        return;
      }

      // Determine direction
      const newDirection: ScrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';

      console.log('[useScrollDirection] Direction changed:', newDirection, '(delta:', scrollDelta, ')');
      setScrollDirection(newDirection);

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    console.log('[useScrollDirection] Hook mounted, adding scroll listener');

    // Add scroll listener with passive option for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      console.log('[useScrollDirection] Hook unmounting, removing scroll listener');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]); // Only re-run if threshold changes

  return scrollDirection;
}

import { useState, useEffect } from 'react';

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
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // At the very top of the page
      if (currentScrollY < 10) {
        setScrollDirection('none');
        setLastScrollY(currentScrollY);
        ticking = false;
        return;
      }

      // Only update if we've scrolled past the threshold
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      // Determine direction
      const newDirection: ScrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }

      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    // Add scroll listener with passive option for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection, lastScrollY, threshold]);

  return scrollDirection;
}

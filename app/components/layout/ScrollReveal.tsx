"use client";

import { useEffect } from "react";

/**
 * ScrollReveal Component
 *
 * Manages scroll-triggered animations throughout the application using the Intersection Observer API.
 * This component should be included once per page to enable scroll reveal animations.
 *
 * @component
 * @example
 * ```tsx
 * import ScrollReveal from '@/app/components/layout/ScrollReveal';
 *
 * export default function Page() {
 *   return (
 *     <main>
 *       <ScrollReveal />
 *       <div className="scroll-reveal">
 *         This content will fade in when scrolled into view
 *       </div>
 *     </main>
 *   );
 * }
 * ```
 *
 * @description
 * Features:
 * - Automatically detects elements with `.scroll-reveal` class
 * - Adds `.is-visible` class when elements enter viewport
 * - Handles above-the-fold content differently (instant fade vs scroll animation)
 * - Watches for dynamically added elements using MutationObserver
 * - Triggers animation 50px before element enters viewport for smoother UX
 *
 * Animation behavior (defined in globals.css):
 * - Above-fold: Quick 0.3s fade (class: `above-fold`)
 * - Below-fold: 0.5s scale + fade animation
 *
 * @returns {null} Renders nothing (utility component)
 */
export default function ScrollReveal(): null {
  useEffect(() => {
    /**
     * Checks if an element is currently visible in the viewport
     *
     * @param {Element} el - The element to check
     * @returns {boolean} True if element is in viewport
     */
    const isInViewport = (el: Element): boolean => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    /**
     * Configuration for Intersection Observer
     * - rootMargin: Trigger 50px before element enters viewport
     * - threshold: Trigger as soon as 1% of element is visible
     */
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-50px 0px",
      threshold: 0.01,
    };

    /**
     * Intersection Observer callback
     * Adds 'is-visible' class to elements as they enter the viewport
     */
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("is-visible")) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    /**
     * Finds and observes all elements with the '.scroll-reveal' class
     *
     * Elements above the fold receive instant animation,
     * while below-fold elements are observed for scroll-triggered animation
     */
    const observeElements = (): void => {
      const elements = document.querySelectorAll(".scroll-reveal");

      elements.forEach((el) => {
        // Skip if already visible
        if (!el.classList.contains("is-visible")) {
          if (isInViewport(el)) {
            // Above-the-fold: immediate animation
            el.classList.add("is-visible", "above-fold");
          } else {
            // Below-fold: observe for scroll animation
            intersectionObserver.observe(el);
          }
        }
      });
    };

    // Initialize on next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      observeElements();
    });

    /**
     * MutationObserver to watch for dynamically added elements
     * Ensures scroll reveal works with content loaded after initial render
     */
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup observers on unmount
    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

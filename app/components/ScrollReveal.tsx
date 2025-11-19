"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Check if element is in viewport on page load (above the fold)
    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      root: null,
      rootMargin: "-50px 0px", // Trigger 50px before element enters viewport
      threshold: 0.01, // Trigger as soon as element is barely visible
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("is-visible")) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    // Function to observe all scroll-reveal elements
    const observeElements = () => {
      const elements = document.querySelectorAll(".scroll-reveal");

      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          // Check if element is already visible (above the fold)
          if (isInViewport(el)) {
            // Add special class for immediate fade-in
            el.classList.add("is-visible", "above-fold");
          } else {
            // Observe for scroll-triggered animation
            intersectionObserver.observe(el);
          }
        }
      });
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      observeElements();
    });

    // Watch for dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

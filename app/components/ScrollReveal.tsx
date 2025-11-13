"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    // Function to observe all scroll-reveal elements
    const observeElements = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          intersectionObserver.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

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

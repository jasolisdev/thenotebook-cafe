"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * PageTransition Component
 *
 * Provides smooth page transitions using the View Transitions API
 * with fallback for browsers that don't support it.
 *
 * @component
 * @example
 * ```tsx
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only run transition if pathname actually changed
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Smooth scroll to top on page change
      window.scrollTo({ top: 0, behavior: "instant" });

      // Check if browser supports View Transitions API
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          // The DOM update happens here automatically
        });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}

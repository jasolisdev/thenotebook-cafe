"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * PageTransition Component
 *
 * Provides smooth fade transitions between pages.
 * Works with Next.js App Router to create seamless navigation.
 *
 * Animation:
 * - Exit: Fade out (0.2s)
 * - Enter: Fade in (0.3s)
 * - Uses expo easing for premium feel
 *
 * @component
 * @example
 * ```tsx
 * // Wrap page content
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 *
 * @param {ReactNode} children - Page content to animate
 * @returns {JSX.Element} Animated page wrapper
 */
interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.19, 1, 0.22, 1], // Expo ease-out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

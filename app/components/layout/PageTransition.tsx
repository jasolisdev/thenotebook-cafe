"use client";

import { ReactNode } from 'react';

/**
 * PageTransition Component
 *
 * Provides smooth fade-in animation when pages mount.
 * Uses CSS animations for lightweight page transitions.
 *
 * Animation:
 * - Enter: Fade in (0.3s) with expo easing
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
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

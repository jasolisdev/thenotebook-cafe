"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load NewsletterModal - only loaded when user clicks trigger
const NewsletterModal = dynamic(() => import('./NewsletterModal'), {
  ssr: false,
  loading: () => null,
});

interface CommunityModalTriggerProps {
  children: React.ReactNode;
  source?: string;
}

/**
 * Client-side wrapper to trigger the newsletter modal
 *
 * @component
 * @example
 * ```tsx
 * <CommunityModalTrigger source="story-page">
 *   <button>Join our community</button>
 * </CommunityModalTrigger>
 * ```
 */
export default function CommunityModalTrigger({ children, source = "story-community" }: CommunityModalTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {children}
      </div>
      {isModalOpen && (
        <NewsletterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          source={source}
        />
      )}
    </>
  );
}

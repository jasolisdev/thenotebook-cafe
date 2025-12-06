"use client";

import { useState } from 'react';
import NewsletterModal from './NewsletterModal';

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
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={source}
      />
    </>
  );
}

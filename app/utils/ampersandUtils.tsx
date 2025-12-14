/**
 * Utility functions for styling ampersands in text
 */

import React from 'react';

/**
 * Replaces ampersands (&) with a styled version using specified font
 * @param text - The text containing ampersands
 * @param fontClass - The font CSS variable class to apply (e.g., 'font-playfair' or 'font-inter')
 * @returns React elements with styled ampersands
 */
export function styleAmpersands(text: string, fontClass: string): React.ReactNode {
  if (!text.includes('&')) {
    return text;
  }

  const parts = text.split('&');
  const elements: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    elements.push(<React.Fragment key={`text-${index}`}>{part}</React.Fragment>);

    // Add styled ampersand between parts (except after the last part)
    if (index < parts.length - 1) {
      elements.push(
        <span key={`amp-${index}`} className={fontClass}>
          &
        </span>
      );
    }
  });

  return <>{elements}</>;
}

/**
 * Component that renders text with Playfair Display ampersands
 * Use for category headers
 */
export function TextWithSerifAmpersand({ children }: { children: string }) {
  return <>{styleAmpersands(children, 'font-playfair')}</>;
}

/**
 * Component that renders text with Inter ampersands
 * Use for descriptions
 */
export function TextWithSansAmpersand({ children }: { children: string }) {
  return <>{styleAmpersands(children, 'font-inter')}</>;
}

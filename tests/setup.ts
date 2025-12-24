/**
 * Vitest Test Setup
 *
 * Global test configuration and mocks for the entire test suite.
 * This file runs before all test files.
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

type NextImageProps = React.ComponentPropsWithoutRef<'img'> & {
  src?: string | { src: string };
  alt?: string;
  fill?: boolean;
  priority?: boolean;
};

// Cleanup after each test automatically
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ priority, fill, ...props }: NextImageProps) => {
    void priority;
    void fill;
    return React.createElement('img', props);
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: vi.fn(({ href, onClick, children, ...rest }) =>
    React.createElement(
      'a',
      { href: typeof href === 'string' ? href : '#', onClick, ...rest },
      children
    )
  ),
}));

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: vi.fn(({ children, ...props }) => React.createElement('div', props, children)),
    button: vi.fn(({ children, ...props }) => React.createElement('button', props, children)),
    span: vi.fn(({ children, ...props }) => React.createElement('span', props, children)),
    section: vi.fn(({ children, ...props }) => React.createElement('section', props, children)),
  },
  AnimatePresence: vi.fn(({ children }) => children),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test';
process.env.SANITY_WRITE_TOKEN = 'test-write-token';
process.env.RESEND_API_KEY = 'test-resend-key';
process.env.CONTACT_EMAIL_RECIPIENT = 'test@thenotebookcafe.com';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver (used by SiteHeader)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as unknown as typeof ResizeObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

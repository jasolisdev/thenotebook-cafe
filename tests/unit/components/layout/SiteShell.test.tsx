import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@/tests/utils/test-utils';

const usePathnameMock = vi.hoisted(() => vi.fn(() => '/'));

vi.mock('next/navigation', () => ({
  usePathname: usePathnameMock,
}));

vi.mock('next/dynamic', () => ({
  default: () => () => null,
}));

vi.mock('@/app/components/layout/SiteHeader', () => ({
  default: () => <div data-testid="site-header" />,
}));

vi.mock('@/app/components/layout/SiteFooter', () => ({
  default: () => <div data-testid="site-footer" />,
}));

vi.mock('@/app/components/layout/ImagePreloader', () => ({
  default: () => <div data-testid="image-preloader" />,
}));

vi.mock('@/app/components/ui/AnnouncementBanner', () => ({
  default: () => <div data-testid="announcement-banner" />,
}));

import SiteShell from '@/app/components/layout/SiteShell';

describe('SiteShell', () => {
  test('renders header, footer, and announcement when enabled', () => {
    usePathnameMock.mockReturnValue('/');

    render(
      <SiteShell showAnnouncement instagramUrl="https://ig" spotifyUrl="https://sp">
        <div>Shell content</div>
      </SiteShell>
    );

    expect(screen.getByTestId('image-preloader')).toBeInTheDocument();
    expect(screen.getByTestId('announcement-banner')).toBeInTheDocument();
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
    expect(screen.getByText('Shell content')).toBeInTheDocument();
  });

  test('renders studio shell when pathname is studio', async () => {
    usePathnameMock.mockReturnValue('/studio');

    render(
      <SiteShell showAnnouncement instagramUrl="https://ig" spotifyUrl="https://sp">
        <div>Studio content</div>
      </SiteShell>
    );

    expect(screen.getByText('Studio content').parentElement).toHaveClass('studio-root');
    expect(screen.queryByTestId('site-header')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(document.body.classList.contains('studio-mode')).toBe(true);
    });
  });
});

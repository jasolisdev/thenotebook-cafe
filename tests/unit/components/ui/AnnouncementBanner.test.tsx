import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AnnouncementBanner from '@/app/components/ui/AnnouncementBanner';

describe('AnnouncementBanner Component', () => {
  // Mock sessionStorage
  const sessionStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      }
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

  beforeEach(() => {
    sessionStorageMock.clear();
    vi.clearAllMocks();
  });

  it('renders correctly with default text', () => {
    render(<AnnouncementBanner />);
    // Mounted state should be true after render in JSDOM
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/opening soon 2025/i)).toBeInTheDocument();
  });

  it('renders custom text', () => {
    render(<AnnouncementBanner text="Custom Announcement" />);
    expect(screen.getByText('Custom Announcement')).toBeInTheDocument();
  });

  it('handles dismissal correctly', () => {
    render(<AnnouncementBanner />);
    const closeButton = screen.getByLabelText(/close announcement/i);
    
    fireEvent.click(closeButton);
    
    // Should be removed from DOM
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    
    // Should save to sessionStorage
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith('announcement-banner-dismissed', 'true');
  });

  it('does not render if previously dismissed in session', () => {
    sessionStorageMock.setItem('announcement-banner-dismissed', 'true');
    render(<AnnouncementBanner />);
    
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });

  it('sets CSS variable on dismissal', () => {
    const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');
    render(<AnnouncementBanner />);
    
    fireEvent.click(screen.getByLabelText(/close announcement/i));
    
    expect(setPropertySpy).toHaveBeenCalledWith('--announcement-banner-height', '0px');
  });
});

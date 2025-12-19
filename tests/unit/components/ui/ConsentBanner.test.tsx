import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsentBanner from '@/app/components/ui/ConsentBanner';

describe('ConsentBanner Component', () => {
  // Mock localStorage
  const localStorageMock = (() => {
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

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorageMock.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('does not render if consent is already saved', () => {
    localStorageMock.setItem('tnc-consent', JSON.stringify({ choice: 'accepted', analytics: true }));
    render(<ConsentBanner />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
  });

  it('renders after delay if no consent is saved', () => {
    render(<ConsentBanner />);
    
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
    
    // Advance time to trigger both timeouts (1500ms + 10ms)
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument();
  });

  it('saves "accepted" to localStorage when Accept is clicked', () => {
    render(<ConsentBanner />);
    
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'tnc-consent',
      JSON.stringify({ choice: 'accepted', analytics: true })
    );
  });

  it('saves "declined" to localStorage when Decline is clicked', () => {
    render(<ConsentBanner />);
    
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    const declineButton = screen.getByRole('button', { name: /decline/i });
    fireEvent.click(declineButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'tnc-consent',
      JSON.stringify({ choice: 'declined', analytics: false })
    );
  });

  it('dispatches custom event on choice', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    render(<ConsentBanner />);
    
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    const event = dispatchSpy.mock.calls.find(call => 
      call[0] instanceof CustomEvent && call[0].type === 'tnc-consent-change'
    );
    expect(event).toBeDefined();
    expect((event![0] as CustomEvent).detail).toEqual({ choice: 'accepted', analytics: true });
  });

  it('opens banner when "tnc-open-consent" event is fired', () => {
    localStorageMock.setItem('tnc-consent', 'true');
    render(<ConsentBanner />);
    
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    
    // Trigger event and advance timers for internal state update
    act(() => {
      const event = new Event('tnc-open-consent');
      window.dispatchEvent(event);
      vi.advanceTimersByTime(100); 
    });
    
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument();
  });
});

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useOnScreen } from '@/app/hooks/useOnScreen';

describe('useOnScreen Hook', () => {
  let observerCallback: (entries: IntersectionObserverEntry[]) => void;
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock IntersectionObserver as a class
    global.IntersectionObserver = vi.fn().mockImplementation(function(this: IntersectionObserver, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      this.observe = mockObserve;
      this.disconnect = mockDisconnect;
      this.unobserve = vi.fn();
      this.takeRecords = vi.fn(() => []);
    }) as unknown as typeof IntersectionObserver;
  });

  it('initially returns isVisible as false', () => {
    const { result } = renderHook(() => useOnScreen());
    expect(result.current[1]).toBe(false);
  });

  it('sets isVisible to true when element intersects', async () => {
    const { result, rerender } = renderHook((opts) => useOnScreen(opts), {
      initialProps: { threshold: 0.1 }
    });
    
    (result.current[0] as { current: Element | null }).current = document.createElement('div');
    rerender({ threshold: 0.2 });
    
    expect(global.IntersectionObserver).toHaveBeenCalled();
    
    act(() => {
      observerCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });
    
    expect(result.current[1]).toBe(true);
  });

  it('stays visible after first intersection (one-way trigger)', () => {
    const { result, rerender } = renderHook((opts) => useOnScreen(opts), {
      initialProps: { threshold: 0.1 }
    });
    (result.current[0] as { current: Element | null }).current = document.createElement('div');
    rerender({ threshold: 0.2 });
    
    act(() => {
      observerCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });
    expect(result.current[1]).toBe(true);
    
    act(() => {
      observerCallback([{ isIntersecting: false } as IntersectionObserverEntry]);
    });
    expect(result.current[1]).toBe(true);
  });

  it('disconnects observer on unmount', () => {
    const { result, rerender, unmount } = renderHook((opts) => useOnScreen(opts), {
      initialProps: { threshold: 0.1 }
    });
    (result.current[0] as { current: Element | null }).current = document.createElement('div');
    rerender({ threshold: 0.2 });
    
    expect(global.IntersectionObserver).toHaveBeenCalled();
    
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});

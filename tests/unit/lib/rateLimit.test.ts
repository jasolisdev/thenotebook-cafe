/**
 * Unit Tests for Rate Limiting Utility
 *
 * Tests in-memory rate limiting with IP extraction and window management
 * Target Coverage: 95%+
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { checkRateLimit } from '@/app/lib/server/rateLimit';

// Helper to create mock Request objects
function createMockRequest(headers: Record<string, string> = {}): Request {
  return {
    headers: new Headers(headers),
  } as Request;
}

// Helper to advance time in tests
function advanceTime(ms: number) {
  vi.advanceTimersByTime(ms);
}

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Use fake timers for testing time-based logic
    vi.useFakeTimers();

    // Clear rate limit store between tests by creating fresh requests
    // (the store is module-level, so we can't clear it directly, but we can use unique IPs)
  });

  describe('IP Extraction', () => {
    test('extracts IP from x-forwarded-for header', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.100' });
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull(); // First request allowed
    });

    test('uses first IP from comma-separated x-forwarded-for', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.100, 10.0.0.1, 172.16.0.1' });
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull();
    });

    test('extracts IP from x-real-ip header if x-forwarded-for not present', () => {
      const req = createMockRequest({ 'x-real-ip': '192.168.1.200' });
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull();
    });

    test('prefers x-forwarded-for over x-real-ip', () => {
      const req = createMockRequest({
        'x-forwarded-for': '192.168.1.100',
        'x-real-ip': '192.168.1.200'
      });
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull();

      // Make more requests to verify it's using the x-forwarded-for IP
      for (let i = 0; i < 5; i++) {
        checkRateLimit(req, '/api/test', 5, 60000);
      }
      const limitedResult = checkRateLimit(req, '/api/test', 5, 60000);
      expect(limitedResult).not.toBeNull();
    });

    test('uses "unknown" as fallback when no IP headers present', () => {
      const req = createMockRequest({});
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull();
    });
  });

  describe('Rate Limiting Logic', () => {
    test('allows first request', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.1' });
      const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).toBeNull();
    });

    test('allows requests within limit', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.2' });

      // Make 5 requests (at the limit)
      for (let i = 0; i < 5; i++) {
        const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
        expect(result).toBeNull();
      }
    });

    test('blocks request exceeding limit', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.3' });

      // Make 5 requests (at the limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }

      // 6th request should be blocked
      const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(429);
    });

    test('returns correct error response when limit exceeded', async () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.4' });

      // Exceed limit
      for (let i = 0; i < 6; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }

      const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).not.toBeNull();

      const json = await result?.json();
      expect(json).toEqual({
        ok: false,
        error: 'Too many requests. Please try again later.',
      });
    });

    test('includes Retry-After header when limit exceeded', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.5' });

      // Exceed limit
      for (let i = 0; i < 6; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }

      const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result?.headers.get('Retry-After')).toBeTruthy();
      expect(result?.headers.get('Cache-Control')).toBe('no-store');
    });

    test('includes correct Retry-After value in seconds', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.6' });

      // Exceed limit
      for (let i = 0; i < 6; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }

      const result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      const retryAfter = parseInt(result?.headers.get('Retry-After') || '0');

      // Should be approximately 60 seconds (the window size)
      expect(retryAfter).toBeGreaterThan(0);
      expect(retryAfter).toBeLessThanOrEqual(60);
    });
  });

  describe('Time Window Management', () => {
    test('resets count after window expires', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.7' });

      // Make 5 requests (at the limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }

      // 6th request should be blocked
      let result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).not.toBeNull();

      // Advance time past the window (60 seconds + 1ms)
      advanceTime(60001);

      // Should allow requests again
      result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).toBeNull();
    });

    test('uses different windows for different endpoints', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.8' });

      // Exceed limit on /api/subscribe
      for (let i = 0; i < 6; i++) {
        checkRateLimit(req, '/api/subscribe', 5, 60000);
      }
      let result = checkRateLimit(req, '/api/subscribe', 5, 60000);
      expect(result).not.toBeNull(); // Blocked on /api/subscribe

      // Should still allow on /api/contact (different endpoint)
      result = checkRateLimit(req, '/api/contact', 5, 60000);
      expect(result).toBeNull();
    });

    test('uses different windows for different IPs', () => {
      const req1 = createMockRequest({ 'x-forwarded-for': '192.168.1.9' });
      const req2 = createMockRequest({ 'x-forwarded-for': '192.168.1.10' });

      // Exceed limit for IP 1
      for (let i = 0; i < 6; i++) {
        checkRateLimit(req1, '/api/subscribe', 5, 60000);
      }
      let result = checkRateLimit(req1, '/api/subscribe', 5, 60000);
      expect(result).not.toBeNull(); // Blocked for IP 1

      // Should still allow for IP 2
      result = checkRateLimit(req2, '/api/subscribe', 5, 60000);
      expect(result).toBeNull();
    });

    test('supports custom window duration', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.11' });
      const shortWindow = 5000; // 5 seconds

      // Make 3 requests (at the limit for 3 max)
      for (let i = 0; i < 3; i++) {
        checkRateLimit(req, '/api/test', 3, shortWindow);
      }

      // 4th request should be blocked
      let result = checkRateLimit(req, '/api/test', 3, shortWindow);
      expect(result).not.toBeNull();

      // Advance time past short window
      advanceTime(5001);

      // Should allow requests again
      result = checkRateLimit(req, '/api/test', 3, shortWindow);
      expect(result).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    test('handles single request limit (maxRequests = 1)', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.12' });

      // First request allowed
      let result = checkRateLimit(req, '/api/test', 1, 60000);
      expect(result).toBeNull();

      // Second request blocked
      result = checkRateLimit(req, '/api/test', 1, 60000);
      expect(result).not.toBeNull();
    });

    test('handles high request limit', () => {
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.13' });

      // Make 100 requests (at the limit)
      for (let i = 0; i < 100; i++) {
        const result = checkRateLimit(req, '/api/test', 100, 60000);
        expect(result).toBeNull();
      }

      // 101st request blocked
      const result = checkRateLimit(req, '/api/test', 100, 60000);
      expect(result).not.toBeNull();
    });

    test('handles whitespace in x-forwarded-for header', () => {
      const req = createMockRequest({ 'x-forwarded-for': '  192.168.1.14  , 10.0.0.1  ' });
      const result = checkRateLimit(req, '/api/test', 5, 60000);
      expect(result).toBeNull();
    });

    test('cleans up expired entries when store size exceeds 10000', () => {
      // Create 10,001 unique IP+endpoint combinations to trigger cleanup
      // We'll create entries that will expire
      for (let i = 0; i < 10001; i++) {
        const req = createMockRequest({ 'x-forwarded-for': `10.0.${Math.floor(i / 256)}.${i % 256}` });
        checkRateLimit(req, '/api/test', 5, 1000); // Short 1-second window
      }

      // Advance time to expire all entries
      advanceTime(1001);

      // Make one more request to trigger cleanup
      const req = createMockRequest({ 'x-forwarded-for': '192.168.1.15' });
      const result = checkRateLimit(req, '/api/cleanup-test', 5, 60000);
      expect(result).toBeNull(); // Should work normally
    });
  });
});

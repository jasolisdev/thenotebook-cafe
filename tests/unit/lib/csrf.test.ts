/**
 * Unit Tests for CSRF Protection Utility
 *
 * Tests origin validation to prevent Cross-Site Request Forgery attacks
 * Target Coverage: 95%+
 */

import { describe, test, expect } from 'vitest';
import { validateOrigin } from '@/app/lib/csrf';

// Helper to create mock Request objects
function createMockRequest(headers: Record<string, string> = {}): Request {
  return {
    headers: new Headers(headers),
  } as Request;
}

describe('validateOrigin', () => {
  describe('Valid Origins', () => {
    test('allows localhost:3000', () => {
      const req = createMockRequest({ origin: 'http://localhost:3000' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('allows production domain', () => {
      const req = createMockRequest({ origin: 'https://thenotebookcafe.com' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('allows www production domain', () => {
      const req = createMockRequest({ origin: 'https://www.thenotebookcafe.com' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('allows Vercel preview deployments', () => {
      const req = createMockRequest({ origin: 'https://thenotebook-cafe-git-main-username.vercel.app' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('allows any Vercel preview URL pattern', () => {
      const req = createMockRequest({ origin: 'https://my-branch-abc123.vercel.app' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });
  });

  describe('Invalid Origins', () => {
    test('rejects unauthorized domain', () => {
      const req = createMockRequest({ origin: 'https://evil.com' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('rejects http version of production domain', () => {
      const req = createMockRequest({ origin: 'http://thenotebookcafe.com' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('rejects non-https Vercel preview', () => {
      const req = createMockRequest({ origin: 'http://test.vercel.app' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('rejects subdomain that ends with .vercel.app but has wrong protocol', () => {
      const req = createMockRequest({ origin: 'ftp://evil.vercel.app' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
    });

    test('returns error with "Invalid origin" message', async () => {
      const req = createMockRequest({ origin: 'https://evil.com' });
      const result = validateOrigin(req);
      const json = await result?.json();
      expect(json).toEqual({
        ok: false,
        error: 'Invalid origin',
      });
    });

    test('includes Cache-Control: no-store header', () => {
      const req = createMockRequest({ origin: 'https://evil.com' });
      const result = validateOrigin(req);
      expect(result?.headers.get('Cache-Control')).toBe('no-store');
    });
  });

  describe('Referer Fallback', () => {
    test('uses referer when origin not present and referer is valid', () => {
      const req = createMockRequest({ referer: 'https://thenotebookcafe.com/page' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('extracts origin from referer URL', () => {
      const req = createMockRequest({ referer: 'http://localhost:3000/menu?param=value#hash' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });

    test('rejects invalid referer origin', () => {
      const req = createMockRequest({ referer: 'https://evil.com/page' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('returns error with "Invalid referer" message for bad origin', async () => {
      const req = createMockRequest({ referer: 'https://evil.com/page' });
      const result = validateOrigin(req);
      const json = await result?.json();
      expect(json).toEqual({
        ok: false,
        error: 'Invalid referer',
      });
    });

    test('rejects malformed referer URL', () => {
      const req = createMockRequest({ referer: 'not-a-url' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('returns error with "Invalid referer" message for malformed URL', async () => {
      const req = createMockRequest({ referer: 'not-a-url' });
      const result = validateOrigin(req);
      const json = await result?.json();
      expect(json).toEqual({
        ok: false,
        error: 'Invalid referer',
      });
    });

    test('allows Vercel preview in referer', () => {
      const req = createMockRequest({ referer: 'https://preview-abc123.vercel.app/contact' });
      const result = validateOrigin(req);
      expect(result).toBeNull();
    });
  });

  describe('Missing Headers', () => {
    test('rejects request with no origin or referer', () => {
      const req = createMockRequest({});
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('returns error with "Missing origin header" message', async () => {
      const req = createMockRequest({});
      const result = validateOrigin(req);
      const json = await result?.json();
      expect(json).toEqual({
        ok: false,
        error: 'Missing origin header',
      });
    });
  });

  describe('Edge Cases', () => {
    test('prefers origin over referer when both present', () => {
      const req = createMockRequest({
        origin: 'https://thenotebookcafe.com',
        referer: 'https://evil.com/page',
      });
      const result = validateOrigin(req);
      expect(result).toBeNull(); // Should use valid origin, ignore invalid referer
    });

    test('rejects when origin is invalid even if referer is valid', () => {
      const req = createMockRequest({
        origin: 'https://evil.com',
        referer: 'https://thenotebookcafe.com/page',
      });
      const result = validateOrigin(req);
      expect(result).not.toBeNull(); // Should reject based on invalid origin
    });

    test('handles empty string origin', () => {
      const req = createMockRequest({ origin: '' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('handles empty string referer', () => {
      const req = createMockRequest({ referer: '' });
      const result = validateOrigin(req);
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });
  });
});

/**
 * Unit tests for /api/auth/verify route
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/auth/verify/route';
import { checkRateLimit } from '@/app/lib/rateLimit';

const cookieSet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: async () => ({
    set: cookieSet,
  }),
}));

vi.mock('@/app/lib/rateLimit', () => ({
  checkRateLimit: vi.fn(),
}));

const mockedCheckRateLimit = vi.mocked(checkRateLimit);

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  vi.clearAllMocks();
  mockedCheckRateLimit.mockReturnValue(null);
  process.env.SITE_PASSWORD = 'secret';
  process.env.NODE_ENV = 'test';
});

describe('POST /api/auth/verify', () => {
  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ success: false }, { status: 429 })
    );

    const response = await POST(makeRequest({ password: 'secret' }));

    expect(response.status).toBe(429);
  });

  test('returns 500 when password is not configured', async () => {
    delete process.env.SITE_PASSWORD;

    const response = await POST(makeRequest({ password: 'secret' }));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ success: false, message: 'Password not configured' });
  });

  test('sets auth cookie on correct password', async () => {
    const response = await POST(makeRequest({ password: 'secret' }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ success: true });
    expect(cookieSet).toHaveBeenCalledWith(
      'site-auth',
      'authenticated',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
    );
  });

  test('rejects incorrect password', async () => {
    const response = await POST(makeRequest({ password: 'wrong' }));
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload).toEqual({ success: false, message: 'Incorrect password' });
  });

  test('returns 500 on malformed JSON', async () => {
    const req = new Request('http://localhost/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad-json',
    });

    const response = await POST(req);
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ success: false, message: 'Server error' });
  });
});

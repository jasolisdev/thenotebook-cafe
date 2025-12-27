/**
 * Unit tests for /api/subscribe route
 * Focus: security, validation, business logic, error handling.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextResponse } from 'next/server';
import { validateOrigin, checkRateLimit, logger } from '@/app/lib';

vi.mock('@/app/lib', async (importActual) => {
  const actual = await importActual<typeof import('@/app/lib')>();
  return {
    ...actual,
    validateOrigin: vi.fn(),
    checkRateLimit: vi.fn(),
    logger: {
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

const mockedValidateOrigin = vi.mocked(validateOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedLoggerError = vi.mocked(logger.error);

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000' },
    body: JSON.stringify(body),
  });

const loadPost = async () => (await import('@/app/api/subscribe/route')).POST;

const originalAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
const originalFetch = globalThis.fetch;
const originalCrypto = globalThis.crypto;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mockedValidateOrigin.mockReturnValue(null);
  mockedCheckRateLimit.mockReturnValue(null);
  process.env.GOOGLE_APPS_SCRIPT_URL = 'https://script.test';
  globalThis.fetch = vi.fn();
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      subtle: {
        digest: vi.fn().mockResolvedValue(new Uint8Array(32).buffer),
      },
    },
    configurable: true,
  });
});

afterEach(() => {
  process.env.GOOGLE_APPS_SCRIPT_URL = originalAppsScriptUrl;
  globalThis.fetch = originalFetch;
  Object.defineProperty(globalThis, 'crypto', {
    value: originalCrypto,
    configurable: true,
  });
});

describe('POST /api/subscribe', () => {
  test('blocks requests with invalid origin', async () => {
    mockedValidateOrigin.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 403 })
    );

    const POST = await loadPost();
    const response = await POST(makeRequest({ email: 'test@example.com' }));

    expect(response.status).toBe(403);
    expect(mockedCheckRateLimit).not.toHaveBeenCalled();
  });

  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const POST = await loadPost();
    const response = await POST(makeRequest({ email: 'test@example.com' }));

    expect(response.status).toBe(429);
  });

  test('rejects invalid email input', async () => {
    const POST = await loadPost();
    const response = await POST(makeRequest({ email: 'not-an-email' }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });

  test('rejects emails longer than 254 characters', async () => {
    const longEmail = `${'a'.repeat(250)}@ex.com`;
    const POST = await loadPost();
    const response = await POST(makeRequest({ email: longEmail }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });

  test('returns 500 when Google Apps Script URL is missing', async () => {
    delete process.env.GOOGLE_APPS_SCRIPT_URL;
    vi.resetModules();
    const POST = await loadPost();

    const response = await POST(makeRequest({ email: 'test@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({
      ok: false,
      error: 'Newsletter service not configured',
    });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      'GOOGLE_APPS_SCRIPT_URL not configured'
    );
  });

  test('subscribes successfully via Apps Script', async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        duplicate: false,
        resubscribed: false,
      }),
    } as Response);

    const POST = await loadPost();
    const response = await POST(
      makeRequest({
        email: 'TEST+TAG@Example.com',
        source: '  footer  ',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      duplicate: false,
      resubscribed: false,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://script.test',
      expect.objectContaining({ method: 'POST' })
    );

    const body = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string);
    expect(body).toEqual(
      expect.objectContaining({
        email: 'test+tag@example.com',
        source: 'footer',
        ipHash: '0000000000000000',
      })
    );
  });

  test('returns 500 when Apps Script reports failure', async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: 'Bad request',
      }),
    } as Response);

    const POST = await loadPost();
    const response = await POST(makeRequest({ email: 'test@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ ok: false, error: 'Bad request' });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      'Google Sheets subscription failed',
      expect.objectContaining({ email: 'test@example.com', error: 'Bad request' })
    );
  });

  test('returns 500 on unexpected errors', async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockRejectedValue(new Error('boom'));

    const POST = await loadPost();
    const response = await POST(makeRequest({ email: 'test@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ ok: false, error: 'Server error' });
    expect(mockedLoggerError).toHaveBeenCalled();
  });

  test('handles malformed JSON payloads', async () => {
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000' },
      body: '{invalid-json',
    });

    const POST = await loadPost();
    const response = await POST(req);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });
});

/**
 * Unit tests for /api/subscribe route
 * Focus: security, validation, business logic, error handling.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/subscribe/route';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/writeClient';
import { validateOrigin } from '@/app/lib/csrf';
import { checkRateLimit } from '@/app/lib/rateLimit';
import { logger } from '@/app/lib/logger';

vi.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

vi.mock('@/sanity/lib/writeClient', () => ({
  writeClient: {
    create: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock('@/app/lib/csrf', () => ({
  validateOrigin: vi.fn(),
}));

vi.mock('@/app/lib/rateLimit', () => ({
  checkRateLimit: vi.fn(),
}));

vi.mock('@/app/lib/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockedValidateOrigin = vi.mocked(validateOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedClientFetch = vi.mocked(client.fetch);
const mockedWriteCreate = vi.mocked(writeClient.create);
const mockedWritePatch = vi.mocked(writeClient.patch);
const mockedLoggerError = vi.mocked(logger.error);

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000' },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  vi.clearAllMocks();
  mockedValidateOrigin.mockReturnValue(null);
  mockedCheckRateLimit.mockReturnValue(null);
  mockedClientFetch.mockResolvedValue(null);
});

describe('POST /api/subscribe', () => {
  test('blocks requests with invalid origin', async () => {
    mockedValidateOrigin.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 403 })
    );

    const response = await POST(makeRequest({ email: 'test@example.com' }));

    expect(response.status).toBe(403);
    expect(mockedCheckRateLimit).not.toHaveBeenCalled();
  });

  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const response = await POST(makeRequest({ email: 'test@example.com' }));

    expect(response.status).toBe(429);
  });

  test('rejects invalid email input', async () => {
    const response = await POST(makeRequest({ email: 'not-an-email' }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });

  test('rejects emails longer than 254 characters', async () => {
    const longEmail = `${'a'.repeat(250)}@ex.com`;
    const response = await POST(makeRequest({ email: longEmail }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });

  test('returns duplicate response when subscriber exists', async () => {
    mockedClientFetch.mockResolvedValue({
      _id: 'subscriber-1',
      status: 'subscribed',
      unsubscribeToken: 'token-xyz',
    });

    const response = await POST(makeRequest({ email: 'test@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, duplicate: true });
    expect(mockedWritePatch).not.toHaveBeenCalled();
  });

  test('adds unsubscribe token for existing subscriber without one', async () => {
    const commit = vi.fn().mockResolvedValue({});
    const set = vi.fn().mockReturnValue({ commit });

    mockedClientFetch.mockResolvedValue({
      _id: 'subscriber-2',
      status: 'subscribed',
      unsubscribeToken: null,
    });
    mockedWritePatch.mockReturnValue({ set, commit } as ReturnType<typeof mockedWritePatch>);

    const response = await POST(makeRequest({ email: 'test@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, duplicate: true });
    expect(mockedWritePatch).toHaveBeenCalledWith('subscriber-2');
    expect(set).toHaveBeenCalledWith({
      unsubscribeToken: expect.any(String),
    });
    expect(commit).toHaveBeenCalledWith({
      autoGenerateArrayKeys: true,
      returnDocuments: false,
    });
  });

  test('creates a new subscriber with sanitized values', async () => {
    mockedWriteCreate.mockResolvedValue({ _id: 'new-sub' });

    const response = await POST(
      makeRequest({
        email: 'TEST+TAG@Example.com',
        source: '  Footer <b>CTA</b>  ',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, id: 'new-sub' });
    expect(mockedWriteCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: 'subscriber',
        email: 'test+tag@example.com',
        source: 'Footer CTA',
        status: 'subscribed',
        unsubscribeToken: expect.any(String),
      })
    );
  });

  test('defaults source when input is missing or invalid', async () => {
    mockedWriteCreate.mockResolvedValue({ _id: 'new-sub' });

    const response = await POST(makeRequest({ email: 'test@example.com' }));
    await response.json();

    expect(mockedWriteCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        source: 'homepage',
      })
    );
  });

  test('truncates overly long source values', async () => {
    mockedWriteCreate.mockResolvedValue({ _id: 'new-sub' });
    const longSource = 'a'.repeat(200);

    const response = await POST(
      makeRequest({ email: 'test@example.com', source: longSource })
    );
    await response.json();

    expect(mockedWriteCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        source: 'a'.repeat(64),
      })
    );
  });

  test('returns 500 on unexpected errors', async () => {
    mockedClientFetch.mockRejectedValue(new Error('boom'));

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

    const response = await POST(req);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email' });
  });
});

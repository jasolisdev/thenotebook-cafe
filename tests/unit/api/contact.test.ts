/**
 * Unit tests for /api/contact route
 * Focus: security, validation, email handling, and error paths.
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/contact/route';
import { writeClient } from '@/sanity/lib/writeClient';
import { validateOrigin } from '@/app/lib/csrf';
import { checkRateLimit } from '@/app/lib/rateLimit';
import { logger } from '@/app/lib/logger';
const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock('@/sanity/lib/writeClient', () => ({
  writeClient: {
    create: vi.fn(),
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
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('resend', () => ({
  Resend: class ResendMock {
    emails = { send: mockSend };
    constructor() {}
  },
}));

const mockedValidateOrigin = vi.mocked(validateOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedWriteCreate = vi.mocked(writeClient.create);
const mockedLoggerInfo = vi.mocked(logger.info);
const mockedLoggerWarn = vi.mocked(logger.warn);
const mockedLoggerError = vi.mocked(logger.error);

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000' },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  vi.clearAllMocks();
  mockedValidateOrigin.mockReturnValue(null);
  mockedCheckRateLimit.mockReturnValue(null);
  mockedWriteCreate.mockResolvedValue({ _id: 'contact-1' } as any);
  process.env.RESEND_API_KEY = 'test-resend-key';
  mockSend.mockResolvedValue({ data: { id: 'email-1' } });
});

describe('POST /api/contact', () => {
  test('blocks requests with invalid origin', async () => {
    mockedValidateOrigin.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 403 })
    );

    const response = await POST(
      makeRequest({
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Hi',
      })
    );

    expect(response.status).toBe(403);
    expect(mockedCheckRateLimit).not.toHaveBeenCalled();
  });

  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const response = await POST(
      makeRequest({
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Hi',
      })
    );

    expect(response.status).toBe(429);
  });

  test('rejects missing required fields', async () => {
    const response = await POST(
      makeRequest({ name: 'Ada', email: '', subject: '', message: '' })
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Missing required fields' });
  });

  test('rejects invalid email formats', async () => {
    const response = await POST(
      makeRequest({
        name: 'Ada',
        email: 'not-an-email',
        subject: 'Hello',
        message: 'Hi',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Missing required fields' });
  });

  test('sends contact email when Resend is configured', async () => {
    const response = await POST(
      makeRequest({
        name: 'Ada Lovelace',
        email: 'ADA@EXAMPLE.COM',
        subject: '  Hello  ',
        message: 'Line 1\nLine 2',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, id: 'contact-1' });
    expect(mockSend).toHaveBeenCalled();
    expect(mockedLoggerInfo).toHaveBeenCalledWith(
      'Contact email sent successfully',
      expect.objectContaining({ emailId: 'email-1' })
    );
  });

  test('logs warning when Resend is not configured', async () => {
    delete process.env.RESEND_API_KEY;

    const response = await POST(
      makeRequest({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Hi',
      })
    );
    await response.json();

    expect(mockedLoggerWarn).toHaveBeenCalledWith(
      'Resend client not initialized - email not sent'
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  test('continues when email sending fails', async () => {
    mockSend.mockRejectedValue(new Error('email failed'));

    const response = await POST(
      makeRequest({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Hi',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, id: 'contact-1' });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      'Failed to send contact email',
      expect.any(Error)
    );
    expect(mockedWriteCreate).toHaveBeenCalled();
  });

  test('creates sanitized contact document', async () => {
    await POST(
      makeRequest({
        name: '  Ada <b>Lovelace</b> ',
        email: ' ADA@EXAMPLE.COM ',
        subject: 'Hello <script>alert(1)</script>',
        message: 'Line 1\n<script>bad</script>',
      })
    );

    expect(mockedWriteCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: 'contactMessage',
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Hello alert(1)',
        message: 'Line 1\nbad',
        status: 'new',
        source: 'contact-page',
      })
    );
  });

  test('returns 500 on unexpected errors', async () => {
    mockedWriteCreate.mockRejectedValue(new Error('boom'));

    const response = await POST(
      makeRequest({
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Hi',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ ok: false, error: 'Server error' });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      'Contact form submission error',
      expect.any(Error)
    );
  });

  test('handles malformed JSON payloads', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000' },
      body: '{invalid-json',
    });

    const response = await POST(req);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Missing required fields' });
  });
});

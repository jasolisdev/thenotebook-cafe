/**
 * Unit tests for /api/unsubscribe route
 */

import { beforeEach, describe, expect, test, vi, afterEach } from 'vitest';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/app/lib';

vi.mock('@/app/lib', async (importActual) => {
  const actual = await importActual<typeof import('@/app/lib')>();
  return {
    ...actual,
    checkRateLimit: vi.fn(),
  };
});

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const originalUnsubscribeUrl = process.env.NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL;

beforeEach(() => {
  vi.clearAllMocks();
  mockedCheckRateLimit.mockReturnValue(null);
});

afterEach(() => {
  process.env.NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL = originalUnsubscribeUrl;
});

const loadGet = async () => (await import('@/app/api/unsubscribe/route')).GET;

describe('GET /api/unsubscribe', () => {
  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const GET = await loadGet();
    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=abc')
    );

    expect(response.status).toBe(429);
  });

  test('redirects to configured unsubscribe form', async () => {
    process.env.NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL = 'https://forms.test/unsubscribe';
    vi.resetModules();
    const GET = await loadGet();

    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=abc')
    );

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://forms.test/unsubscribe');
  });

  test('renders fallback instructions when no form URL is configured', async () => {
    delete process.env.NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL;
    vi.resetModules();
    const GET = await loadGet();

    const response = await GET(new Request('http://localhost/api/unsubscribe'));
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain('To unsubscribe from our newsletter');
    expect(body).toContain('thenotebookcafellc@gmail.com');
  });
});

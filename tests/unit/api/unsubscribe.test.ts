/**
 * Unit tests for /api/unsubscribe route
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { GET } from '@/app/api/unsubscribe/route';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/writeClient';
import { checkRateLimit } from '@/app/lib/server/rateLimit';

vi.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

vi.mock('@/sanity/lib/writeClient', () => ({
  writeClient: {
    patch: vi.fn(),
  },
}));

vi.mock('@/app/lib/server/rateLimit', () => ({
  checkRateLimit: vi.fn(),
}));

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedClientFetch = vi.mocked(client.fetch);
const mockedWritePatch = vi.mocked(writeClient.patch);

beforeEach(() => {
  vi.clearAllMocks();
  mockedCheckRateLimit.mockReturnValue(null);
  mockedClientFetch.mockResolvedValue(null);
});

describe('GET /api/unsubscribe', () => {
  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=abc')
    );

    expect(response.status).toBe(429);
  });

  test('returns 400 when token is missing', async () => {
    const response = await GET(new Request('http://localhost/api/unsubscribe'));
    const body = await response.text();

    expect(response.status).toBe(400);
    expect(body).toContain('Unsubscribe token missing.');
  });

  test('returns 404 when subscriber is not found', async () => {
    mockedClientFetch.mockResolvedValue(null);

    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=missing')
    );
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(body).toContain("We couldn&#39;t find that subscription.");
  });

  test('returns already unsubscribed response', async () => {
    mockedClientFetch.mockResolvedValue({
      _id: 'sub-1',
      email: 'test@example.com',
      status: 'unsubscribed',
    });

    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=token')
    );
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("You&#39;re already unsubscribed for test@example.com.");
  });

  test('updates subscriber status when token is valid', async () => {
    const commit = vi.fn().mockResolvedValue({});
    const set = vi.fn().mockReturnValue({ commit });

    mockedClientFetch.mockResolvedValue({
      _id: 'sub-2',
      email: 'test@example.com',
      status: 'subscribed',
    });
    mockedWritePatch.mockReturnValue({ set, commit } as ReturnType<typeof mockedWritePatch>);

    const response = await GET(
      new Request('http://localhost/api/unsubscribe?token=token')
    );
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("You&#39;re unsubscribed. Thank you.");
    expect(mockedWritePatch).toHaveBeenCalledWith('sub-2');
    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'unsubscribed',
        unsubscribedAt: expect.any(String),
      })
    );
    expect(commit).toHaveBeenCalledWith({
      autoGenerateArrayKeys: true,
      returnDocuments: false,
    });
  });
});

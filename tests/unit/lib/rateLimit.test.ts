/**
 * Unit tests for rate limiting utility
 */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { checkRateLimit } from "@/app/lib/server/rateLimit";

function createMockRequest(headers: Record<string, string> = {}): Request {
  return {
    headers: new Headers(headers),
  } as Request;
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("allows first request", async () => {
    const req = createMockRequest({ "x-forwarded-for": "192.168.1.1" });
    const result = await checkRateLimit(req, "/api/test", 5, 60000);
    expect(result).toBeNull();
  });

  test("extracts the first IP from x-forwarded-for", async () => {
    const req = createMockRequest({
      "x-forwarded-for": "192.168.1.10, 10.0.0.1, 172.16.0.1",
      "x-real-ip": "192.168.1.11",
    });

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit(req, "/api/test", 5, 60000);
      expect(result).toBeNull();
    }

    const limitedResult = await checkRateLimit(req, "/api/test", 5, 60000);
    expect(limitedResult?.status).toBe(429);
  });

  test("returns 429 and headers when limit is exceeded", async () => {
    const req = createMockRequest({ "x-forwarded-for": "192.168.1.2" });

    for (let i = 0; i < 5; i++) {
      await checkRateLimit(req, "/api/subscribe", 5, 60000);
    }

    const result = await checkRateLimit(req, "/api/subscribe", 5, 60000);
    expect(result?.status).toBe(429);
    expect(result?.headers.get("Cache-Control")).toBe("no-store");
    expect(result?.headers.get("Retry-After")).toBeTruthy();
    expect(result?.headers.get("X-RateLimit-Limit")).toBe("5");
    expect(result?.headers.get("X-RateLimit-Remaining")).toBe("0");
  });

  test("includes expected error payload when blocked", async () => {
    const req = createMockRequest({ "x-forwarded-for": "192.168.1.3" });

    for (let i = 0; i < 2; i++) {
      await checkRateLimit(req, "/api/test", 2, 60000);
    }

    const result = await checkRateLimit(req, "/api/test", 2, 60000);
    const json = await result?.json();

    expect(json).toEqual({
      ok: false,
      error: "Too many requests. Please try again later.",
    });
  });

  test("resets count after the time window expires", async () => {
    const req = createMockRequest({ "x-forwarded-for": "192.168.1.4" });

    await checkRateLimit(req, "/api/test", 1, 5000);
    const blocked = await checkRateLimit(req, "/api/test", 1, 5000);
    expect(blocked?.status).toBe(429);

    vi.advanceTimersByTime(5001);

    const afterWindow = await checkRateLimit(req, "/api/test", 1, 5000);
    expect(afterWindow).toBeNull();
  });

  test("tracks limits independently per endpoint", async () => {
    const req = createMockRequest({ "x-forwarded-for": "192.168.1.5" });

    await checkRateLimit(req, "/api/subscribe", 1, 60000);
    const blockedSubscribe = await checkRateLimit(req, "/api/subscribe", 1, 60000);
    expect(blockedSubscribe?.status).toBe(429);

    const contactResult = await checkRateLimit(req, "/api/contact", 1, 60000);
    expect(contactResult).toBeNull();
  });

  test("tracks limits independently per IP", async () => {
    const reqA = createMockRequest({ "x-forwarded-for": "192.168.1.6" });
    const reqB = createMockRequest({ "x-forwarded-for": "192.168.1.7" });

    await checkRateLimit(reqA, "/api/test", 1, 60000);
    const blockedA = await checkRateLimit(reqA, "/api/test", 1, 60000);
    expect(blockedA?.status).toBe(429);

    const allowedB = await checkRateLimit(reqB, "/api/test", 1, 60000);
    expect(allowedB).toBeNull();
  });

  test("falls back to unknown IP when headers are missing", async () => {
    const req = createMockRequest();
    const result = await checkRateLimit(req, "/api/test", 2, 60000);
    expect(result).toBeNull();
  });
});

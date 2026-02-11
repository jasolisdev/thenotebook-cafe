/**
 * Unit tests for legacy /api/apply compatibility route
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { POST } from "@/app/api/apply/route";
import { handleCareersApplyPost } from "@/app/api/careers/apply/route";

vi.mock("@/app/api/careers/apply/route", () => ({
  handleCareersApplyPost: vi.fn(),
}));

const mockedHandleCareersApplyPost = vi.mocked(handleCareersApplyPost);

describe("POST /api/apply", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("forwards request to the shared careers handler", async () => {
    const req = new Request("http://localhost/api/apply", { method: "POST" });
    const delegatedResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    mockedHandleCareersApplyPost.mockResolvedValue(delegatedResponse);

    const response = await POST(req);

    expect(mockedHandleCareersApplyPost).toHaveBeenCalledWith(req, {
      rateLimitEndpoint: "/api/apply",
    });
    expect(response).toBe(delegatedResponse);
  });
});

/**
 * Unit tests for /api/careers/apply route
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { NextResponse } from "next/server";
import { POST } from "@/app/api/careers/apply/route";
import { checkRateLimit, logger, validateOrigin, validateUploadedFile } from "@/app/lib";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("@/app/lib", async (importActual) => {
  const actual = await importActual<typeof import("@/app/lib")>();
  return {
    ...actual,
    validateOrigin: vi.fn(),
    checkRateLimit: vi.fn(),
    validateUploadedFile: vi.fn(),
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock("resend", () => ({
  Resend: class ResendMock {
    emails = { send: mockSend };
    constructor() {}
  },
}));

const mockedValidateOrigin = vi.mocked(validateOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedValidateUploadedFile = vi.mocked(validateUploadedFile);
const mockedLoggerError = vi.mocked(logger.error);

function createFile(contents: number[], name: string, type: string): File {
  if (typeof File.prototype.arrayBuffer !== "function") {
    class TestFile extends File {
      async arrayBuffer() {
        return new Uint8Array(contents).buffer;
      }
    }

    return new TestFile([new Uint8Array(contents)], name, { type });
  }

  return new File([new Uint8Array(contents)], name, { type });
}

function buildFormData(): FormData {
  const data = new FormData();
  data.set("firstName", "Ada");
  data.set("lastName", "Lovelace");
  data.set("email", "ada@example.com");
  data.set("role", "Barista");
  data.set("message", "I love coffee.");
  data.set("phone", "(555) 123-4567");
  data.set("resume", createFile([0x25, 0x50, 0x44, 0x46], "resume.pdf", "application/pdf"));
  return data;
}

const makeRequest = (formData: FormData) =>
  ({
    formData: async () => formData,
    headers: new Headers({ origin: "http://localhost:3000" }),
  }) as Request;

describe("POST /api/careers/apply", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedValidateOrigin.mockReturnValue(null);
    mockedCheckRateLimit.mockReturnValue(null);
    mockedValidateUploadedFile.mockResolvedValue({ valid: true });
    mockSend.mockResolvedValue({ data: { id: "email-1" } });
    process.env.RESEND_API_KEY = "test-resend-key";
    process.env.CONTACT_EMAIL_RECIPIENT = "careers@thenotebookcafe.com";
    delete process.env.CAREERS_EMAIL_RECIPIENT;
  });

  test("blocks requests with invalid origin", async () => {
    mockedValidateOrigin.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 403 })
    );

    const response = await POST(makeRequest(buildFormData()));
    expect(response.status).toBe(403);
  });

  test("rejects missing required fields", async () => {
    const data = buildFormData();
    data.delete("firstName");
    data.delete("lastName");

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: "Missing required fields" });
  });

  test("rejects invalid resume files", async () => {
    mockedValidateUploadedFile.mockResolvedValueOnce({
      valid: false,
      error: "Invalid resume file",
    });

    const response = await POST(makeRequest(buildFormData()));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: "Invalid resume file" });
  });

  test("returns 503 when email service is not configured", async () => {
    delete process.env.RESEND_API_KEY;

    const response = await POST(makeRequest(buildFormData()));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload).toEqual({ ok: false, error: "Email service not configured" });
  });

  test("returns 502 when email sending fails", async () => {
    mockSend.mockRejectedValue(new Error("email failed"));

    const response = await POST(makeRequest(buildFormData()));
    const payload = await response.json();

    expect(response.status).toBe(502);
    expect(payload).toEqual({
      ok: false,
      error: "Failed to send application. Please try again.",
    });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      "Failed to send careers email",
      expect.any(Error)
    );
  });

  test("accepts legacy supplementalApplication field", async () => {
    const data = buildFormData();
    data.set(
      "supplementalApplication",
      createFile([0x25, 0x50, 0x44, 0x46], "supplemental.pdf", "application/pdf")
    );

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true });
    expect(mockedValidateUploadedFile).toHaveBeenCalledTimes(2);
    const sendArgs = mockSend.mock.calls[0]?.[0];
    expect(sendArgs.attachments).toHaveLength(2);
  });
});

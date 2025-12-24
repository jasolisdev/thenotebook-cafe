/**
 * Unit tests for /api/apply route
 * Focus: security, validation, file handling, and error paths.
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/apply/route';
import { writeClient } from '@/sanity/lib/writeClient';
import { validateOrigin } from '@/app/lib/server/csrf';
import { checkRateLimit } from '@/app/lib/server/rateLimit';
import { validateUploadedFile } from '@/app/lib/server/fileValidation';
import { logger } from '@/app/lib/server/logger';

vi.mock('@/sanity/lib/writeClient', () => ({
  writeClient: {
    create: vi.fn(),
    assets: {
      upload: vi.fn(),
    },
  },
}));

vi.mock('@/app/lib/server/csrf', () => ({
  validateOrigin: vi.fn(),
}));

vi.mock('@/app/lib/server/rateLimit', () => ({
  checkRateLimit: vi.fn(),
}));

vi.mock('@/app/lib/server/fileValidation', () => ({
  validateUploadedFile: vi.fn(),
}));

vi.mock('@/app/lib/server/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockedValidateOrigin = vi.mocked(validateOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedWriteCreate = vi.mocked(writeClient.create);
const mockedUpload = vi.mocked(writeClient.assets.upload);
const mockedValidateFile = vi.mocked(validateUploadedFile);
const mockedLoggerError = vi.mocked(logger.error);

const buildFormData = () => {
  const data = new FormData();
  data.set('firstName', 'Ada');
  data.set('lastName', 'Lovelace');
  data.set('email', 'ada@example.com');
  data.set('phone', '(555) 123-4567');
  data.set('birthdate', '1990-01-01');
  data.set('positions', JSON.stringify(['Barista']));
  data.set('employmentType', 'Full Time');
  data.set('daysAvailable', JSON.stringify(['Monday']));
  data.set('startDate', '2024-01-01');
  data.set('hoursPerWeek', '20');
  data.set('commitmentLength', '6 months');
  data.set('message', 'Hello');
  return data;
};

const createFile = (contents: number[], name: string, type: string) => {
  if (typeof File.prototype.arrayBuffer !== 'function') {
    class TestFile extends File {
      async arrayBuffer() {
        return new ArrayBuffer(3);
      }
    }
    return new TestFile([new Uint8Array(contents)], name, { type });
  }
  return new File([new Uint8Array(contents)], name, { type });
};

const makeRequest = (formData: FormData) =>
  ({
    formData: async () => formData,
    headers: new Headers({ origin: 'http://localhost:3000' }),
  }) as Request;

beforeEach(() => {
  vi.clearAllMocks();
  mockedValidateOrigin.mockReturnValue(null);
  mockedCheckRateLimit.mockReturnValue(null);
  mockedWriteCreate.mockResolvedValue({ _id: 'application-1' } as { _id: string });
  mockedUpload.mockResolvedValue({ _id: 'file-1' } as { _id: string });
  mockedValidateFile.mockResolvedValue({ valid: true });
});

describe('POST /api/apply', () => {
  test('blocks requests with invalid origin', async () => {
    mockedValidateOrigin.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 403 })
    );

    const response = await POST(makeRequest(buildFormData()));

    expect(response.status).toBe(403);
    expect(mockedCheckRateLimit).not.toHaveBeenCalled();
  });

  test('enforces rate limiting', async () => {
    mockedCheckRateLimit.mockReturnValue(
      NextResponse.json({ ok: false }, { status: 429 })
    );

    const response = await POST(makeRequest(buildFormData()));

    expect(response.status).toBe(429);
  });

  test('rejects missing required fields', async () => {
    const data = buildFormData();
    data.delete('firstName');

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Missing required fields' });
  });

  test('rejects invalid email addresses', async () => {
    const data = buildFormData();
    data.set('email', 'not-an-email');

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid email address' });
  });

  test('rejects invalid positions data', async () => {
    const data = buildFormData();
    data.set('positions', 'not-json');

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid positions data' });
  });

  test('rejects invalid days available data', async () => {
    const data = buildFormData();
    data.set('daysAvailable', 'not-json');

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid days available data' });
  });

  test('rejects invalid resume file', async () => {
    mockedValidateFile.mockResolvedValue({ valid: false, error: 'Invalid resume file' });

    const data = buildFormData();
    const file = createFile([1, 2, 3], 'resume.pdf', 'application/pdf');
    data.set('resume', file);

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ ok: false, error: 'Invalid resume file' });
  });

  test('uploads resume and supplemental files when provided', async () => {
    const data = buildFormData();
    const resume = createFile([1, 2, 3], 'resume.pdf', 'application/pdf');
    const supplemental = createFile([4, 5, 6], 'supp.pdf', 'application/pdf');

    data.set('resume', resume);
    data.set('supplementalApplication', supplemental);

    const response = await POST(makeRequest(data));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ ok: true, id: 'application-1' });
    expect(mockedUpload).toHaveBeenCalledTimes(2);
    expect(mockedWriteCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: 'jobApplication',
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        resume: {
          _type: 'file',
          asset: { _type: 'reference', _ref: 'file-1' },
        },
        supplementalApplication: {
          _type: 'file',
          asset: { _type: 'reference', _ref: 'file-1' },
        },
      })
    );
  });

  test('returns 500 on unexpected errors', async () => {
    mockedWriteCreate.mockRejectedValue(new Error('boom'));

    const response = await POST(makeRequest(buildFormData()));
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload).toEqual({ ok: false, error: 'Server error. Please try again.' });
    expect(mockedLoggerError).toHaveBeenCalledWith(
      'Application submission error',
      expect.any(Error)
    );
  });
});

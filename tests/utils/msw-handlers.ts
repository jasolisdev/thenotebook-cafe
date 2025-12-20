/**
 * Mock Service Worker (MSW) Handlers
 *
 * API request mocking for testing.
 * These handlers intercept network requests and return mock responses.
 *
 * @see https://mswjs.io/docs/
 */

import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock newsletter subscription endpoint
  http.post('/api/subscribe', () => {
    return HttpResponse.json(
      {
        ok: true,
        duplicate: false,
        id: 'mock-subscriber-id',
      },
      { status: 200 }
    );
  }),

  // Mock contact form endpoint
  http.post('/api/contact', () => {
    return HttpResponse.json(
      {
        ok: true,
        id: 'mock-contact-id',
      },
      { status: 200 }
    );
  }),

  // Mock newsletter unsubscribe endpoint
  http.post('/api/unsubscribe', () => {
    return HttpResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  }),

  // Mock job application endpoint
  http.post('/api/apply', () => {
    return HttpResponse.json(
      {
        ok: true,
        id: 'mock-application-id',
      },
      { status: 200 }
    );
  }),

  // Mock password verification endpoint
  http.post('/api/auth/verify', () => {
    return HttpResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  }),

  // Mock Sanity CDN fetch requests
  http.get('https://*.apicdn.sanity.io/*', () => {
    return HttpResponse.json({
      result: [],
    });
  }),

  // Mock Sanity API mutations
  http.post('https://*.api.sanity.io/*', () => {
    return HttpResponse.json({
      _id: 'mock-doc-id',
      _type: 'mock',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
    });
  }),

  // Mock Resend email API
  http.post('https://api.resend.com/emails', () => {
    return HttpResponse.json({
      id: 'mock-email-id',
    });
  }),
];

/**
 * Error handlers for testing error states
 */
export const errorHandlers = [
  // Network error
  http.post('/api/subscribe', () => {
    return HttpResponse.json(
      {
        ok: false,
        error: 'Network error',
      },
      { status: 500 }
    );
  }),

  // Rate limit error
  http.post('/api/contact', () => {
    return HttpResponse.json(
      {
        ok: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }),

  // CSRF error
  http.post('/api/subscribe', () => {
    return HttpResponse.json(
      {
        ok: false,
        error: 'Invalid origin',
      },
      { status: 403 }
    );
  }),
];

/**
 * @fileoverview API request and response type definitions
 * @module types/api
 *
 * @description
 * Type definitions for API routes and their responses.
 * Used in API routes and client-side API calls.
 */

/**
 * Generic API response wrapper
 * @template T - The type of the data payload
 */
export interface ApiResponse<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}

/**
 * Newsletter subscription API response
 */
export interface SubscribeResponse {
  ok: boolean;
  duplicate: boolean;
  id?: string;
}

/**
 * Contact form submission API response
 */
export interface ContactResponse {
  ok: boolean;
  id?: string;
}

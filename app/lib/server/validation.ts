/**
 * @fileoverview Shared validation utilities for API routes
 * @module lib/server/validation
 *
 * @description
 * Centralized validation and sanitization functions to ensure consistency
 * across all API endpoints. Provides XSS prevention, input normalization,
 * and format validation.
 *
 * @example
 * import { normalizeEmail, normalizeText, sanitizeHtml } from '@/app/lib/server/validation';
 *
 * const email = normalizeEmail(input); // returns null if invalid
 * const name = normalizeText(input, 100); // returns null if invalid
 */

/**
 * Email validation regex pattern
 * Matches: local@domain.tld format
 * Rejects: spaces, missing parts
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Characters that could indicate XSS or injection attempts
 */
const DANGEROUS_CHARS_PATTERN = /[<>"'`]/;

/**
 * Whitespace pattern for collapsing multiple spaces
 */
const MULTI_WHITESPACE_PATTERN = /\s+/g;

/**
 * Normalizes and validates text input
 *
 * @param input - Raw input value (unknown type)
 * @param maxLength - Maximum allowed length after trimming
 * @param options - Additional options
 * @returns Normalized string or null if invalid
 *
 * @example
 * normalizeText("  Hello World  ", 100) // "Hello World"
 * normalizeText(null, 100) // null
 * normalizeText("<script>", 100, { allowHtml: false }) // null
 */
export function normalizeText(
  input: unknown,
  maxLength: number,
  options: {
    /** Allow HTML characters (default: false) */
    allowHtml?: boolean;
    /** Collapse multiple whitespace to single space (default: true) */
    collapseWhitespace?: boolean;
    /** Convert to lowercase (default: false) */
    lowercase?: boolean;
  } = {}
): string | null {
  const {
    allowHtml = false,
    collapseWhitespace = true,
    lowercase = false,
  } = options;

  // Type check
  if (typeof input !== "string") return null;

  // Trim and optionally collapse whitespace
  let text = input.trim();
  if (collapseWhitespace) {
    text = text.replace(MULTI_WHITESPACE_PATTERN, " ");
  }

  // Empty check
  if (!text) return null;

  // Length check
  if (text.length > maxLength) return null;

  // XSS prevention (unless explicitly allowed)
  if (!allowHtml && DANGEROUS_CHARS_PATTERN.test(text)) return null;

  // Optional lowercase conversion
  if (lowercase) {
    text = text.toLowerCase();
  }

  return text;
}

/**
 * Normalizes and validates email addresses
 *
 * @param input - Raw input value (unknown type)
 * @returns Normalized lowercase email or null if invalid
 *
 * @example
 * normalizeEmail("User@Example.COM") // "user@example.com"
 * normalizeEmail("invalid-email") // null
 * normalizeEmail("<script>@hack.com") // null
 */
export function normalizeEmail(input: unknown): string | null {
  // Type check
  if (typeof input !== "string") return null;

  // Trim and lowercase
  const email = input.trim().toLowerCase();

  // Empty check
  if (!email) return null;

  // RFC 5321 max length for email
  if (email.length > 254) return null;

  // XSS prevention - reject dangerous characters
  if (DANGEROUS_CHARS_PATTERN.test(email)) return null;

  // Whitespace in email is invalid
  if (/\s/.test(email)) return null;

  // Format validation
  if (!EMAIL_REGEX.test(email)) return null;

  return email;
}

/**
 * Normalizes and validates phone numbers
 *
 * @param input - Raw input value (unknown type)
 * @returns Normalized phone string or null if invalid
 *
 * @example
 * normalizePhone("(951) 555-1234") // "(951) 555-1234"
 * normalizePhone("abc123") // null (not enough digits)
 */
export function normalizePhone(input: unknown): string | null {
  if (typeof input !== "string") return null;

  const phone = input.trim();
  if (!phone) return null;

  // Max reasonable phone length
  if (phone.length > 20) return null;

  // XSS prevention
  if (DANGEROUS_CHARS_PATTERN.test(phone)) return null;

  // Must contain at least 10 digits (US phone)
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 10 || digitsOnly.length > 15) return null;

  return phone;
}

/**
 * Normalizes and validates URL input
 *
 * @param input - Raw input value (unknown type)
 * @param options - Validation options
 * @returns Normalized URL string or null if invalid
 *
 * @example
 * normalizeUrl("https://example.com") // "https://example.com"
 * normalizeUrl("javascript:alert(1)") // null
 */
export function normalizeUrl(
  input: unknown,
  options: {
    /** Require HTTPS (default: true) */
    requireHttps?: boolean;
    /** Maximum URL length (default: 2048) */
    maxLength?: number;
  } = {}
): string | null {
  const { requireHttps = true, maxLength = 2048 } = options;

  if (typeof input !== "string") return null;

  const url = input.trim();
  if (!url) return null;
  if (url.length > maxLength) return null;

  // Must start with http(s)
  if (requireHttps && !url.startsWith("https://")) return null;
  if (!requireHttps && !url.startsWith("http://") && !url.startsWith("https://")) return null;

  // Block javascript: and data: protocols
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("javascript:") || lowerUrl.includes("data:")) return null;

  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

/**
 * Sanitizes HTML content by escaping dangerous characters
 * Use this only when you need to preserve some text that might contain
 * angle brackets but should not execute as HTML.
 *
 * @param input - Raw input string
 * @returns Escaped string safe for HTML output
 *
 * @example
 * sanitizeHtml("<script>alert('xss')</script>")
 * // "&lt;script&gt;alert('xss')&lt;/script&gt;"
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates that a value is a non-empty string
 *
 * @param input - Value to check
 * @param fieldName - Name of field for error message
 * @returns Object with valid boolean and optional error
 */
export function validateRequired(
  input: unknown,
  fieldName: string
): { valid: true; value: string } | { valid: false; error: string } {
  if (typeof input !== "string" || !input.trim()) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true, value: input.trim() };
}

/**
 * Validates file upload constraints
 *
 * @param file - File object to validate
 * @param options - Validation options
 * @returns Object with valid boolean and optional error
 */
export function validateFile(
  file: File | null | undefined,
  options: {
    /** Required field (default: true) */
    required?: boolean;
    /** Maximum file size in bytes (default: 5MB) */
    maxSize?: number;
    /** Allowed MIME types */
    allowedTypes?: string[];
  } = {}
): { valid: true } | { valid: false; error: string } {
  const {
    required = true,
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  } = options;

  if (!file) {
    if (required) {
      return { valid: false, error: "File is required" };
    }
    return { valid: true };
  }

  if (file.size > maxSize) {
    const maxMB = Math.round(maxSize / (1024 * 1024));
    return { valid: false, error: `File size must be less than ${maxMB}MB` };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { valid: false, error: "Invalid file type" };
  }

  return { valid: true };
}

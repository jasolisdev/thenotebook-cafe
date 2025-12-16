/**
 * Input Sanitization Utility
 *
 * Sanitizes user input to prevent injection attacks before storing in Sanity.
 * Removes dangerous characters and patterns that could be exploited.
 *
 * @example
 * import { sanitizeText, sanitizeEmail } from '@/app/lib/sanitize';
 *
 * const clean = sanitizeText(userInput);
 * const email = sanitizeEmail(emailInput);
 */

/**
 * Remove potentially dangerous HTML/script tags and special characters
 */
export function sanitizeText(input: string): string {
  if (!input) return "";

  return (
    input
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Remove script injection patterns
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      // Remove null bytes
      .replace(/\0/g, "")
      // Normalize whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Sanitize email addresses
 * More strict than sanitizeText - only allows valid email characters
 */
export function sanitizeEmail(input: string): string {
  if (!input) return "";

  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._+-]/g, "");
}

/**
 * Sanitize phone numbers - remove all non-numeric characters except +, -, ()
 */
export function sanitizePhone(input: string): string {
  if (!input) return "";

  return input.replace(/[^\d+\-() ]/g, "").trim();
}

/**
 * Sanitize URLs - ensure they start with http(s)
 */
export function sanitizeUrl(input: string): string | null {
  if (!input) return null;

  const cleaned = input.trim();

  // Check if URL starts with http or https
  if (!/^https?:\/\//i.test(cleaned)) {
    return null;
  }

  try {
    const url = new URL(cleaned);
    // Only allow http and https protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Sanitize JSON strings - prevent injection via JSON
 */
export function sanitizeJsonString(input: string): string {
  if (!input) return "";

  // Remove control characters and potentially dangerous sequences
  return input
    .replace(/[\x00-\x1F\x7F]/g, "") // Control characters
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/"/g, '\\"') // Escape quotes
    .trim();
}

/**
 * Sanitize object for Sanity mutations
 * Recursively sanitizes all string values in an object
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  options: {
    emailFields?: string[];
    phoneFields?: string[];
    urlFields?: string[];
  } = {}
): T {
  const {
    emailFields = ["email"],
    phoneFields = ["phone"],
    urlFields = ["url", "website"],
  } = options;

  const sanitized = { ...obj };

  for (const [key, value] of Object.entries(sanitized)) {
    // Skip null/undefined
    if (value == null) continue;

    // Sanitize based on field type
    if (typeof value === "string") {
      if (emailFields.includes(key)) {
        sanitized[key] = sanitizeEmail(value) as T[Extract<keyof T, string>];
      } else if (phoneFields.includes(key)) {
        sanitized[key] = sanitizePhone(value) as T[Extract<keyof T, string>];
      } else if (urlFields.includes(key)) {
        sanitized[key] = (sanitizeUrl(value) || "") as T[Extract<
          keyof T,
          string
        >];
      } else {
        sanitized[key] = sanitizeText(value) as T[Extract<keyof T, string>];
      }
    }
    // Recursively sanitize nested objects
    else if (typeof value === "object" && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(
        value as Record<string, unknown>,
        options
      ) as T[Extract<keyof T, string>];
    }
    // Sanitize arrays of strings
    else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeText(item) : item
      ) as T[Extract<keyof T, string>];
    }
  }

  return sanitized;
}

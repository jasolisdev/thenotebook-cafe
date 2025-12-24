/**
 * @fileoverview Server utilities and data barrel export
 * @module lib
 *
 * @description
 * Central export point for server-only utilities and data.
 * Import from '@/app/lib' instead of individual files.
 *
 * @example
 * ```typescript
 * import { validateCsrf, logger, sanitizeInput } from '@/app/lib';
 * ```
 */

// Server utilities
export { validateOrigin } from './server/csrf';
export { checkRateLimit } from './server/rateLimit';
export {
  sanitizeText,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUrl,
  sanitizeJsonString,
  sanitizeObject,
} from './server/sanitize';
export { logger } from './server/logger';
export { captureError, recordMetric } from './server/monitoring';
export {
  validateDocx,
  validateFileType,
  validateUploadedFile,
} from './server/fileValidation';

// Data
export { baristaFaqData } from './data/baristaFaqData';
export { getVirtualBaristaResponse } from './data/virtualBaristaResponder';

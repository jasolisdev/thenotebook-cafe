/**
 * @fileoverview Client utilities barrel export
 * @module utils
 *
 * @description
 * Central export point for client-safe utility functions.
 * These utilities can be used in both client and server components.
 *
 * @example
 * ```typescript
 * import { replaceAmpersands } from '@/app/utils';
 * ```
 */

// Typography utilities
export { styleAmpersands, TextWithSerifAmpersand, TextWithSansAmpersand } from './ampersandUtils';

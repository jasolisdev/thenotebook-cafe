/**
 * @fileoverview Shared utility type definitions
 * @module types/common
 *
 * @description
 * Common utility types used across the application.
 * Includes generic helpers and shared type patterns.
 */

/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties K of T required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Extract promise resolve type
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

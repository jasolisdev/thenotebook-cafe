/**
 * @fileoverview Feature flags for The Notebook Café
 * @module lib/constants/features
 *
 * @description
 * Centralized feature toggles for controlling feature visibility
 * and functionality across the application.
 *
 * @example
 * import { FEATURES } from '@/app/lib/constants/features';
 * if (FEATURES.SHOW_MENU_PRICES) {
 *   // render prices
 * }
 */

export const FEATURES = {
  /**
   * Controls whether menu item prices are displayed throughout the site.
   * Set to `false` to hide prices while finalizing pricing.
   * Set to `true` to show prices when ready.
   *
   * @default false
   */
  SHOW_MENU_PRICES: false,
} as const;

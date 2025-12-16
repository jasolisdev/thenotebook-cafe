/**
 * Shared color constants for React components
 * These mirror the CSS variables from globals.css
 *
 * Usage: import { COLORS, RGBA_COLORS } from '@/app/lib/colors';
 *
 * @example
 * // In TypeScript/JSX:
 * const buttonColor = COLORS.black;
 * style={{ backgroundColor: COLORS.tan }}
 *
 * // Prefer CSS variables in inline styles for theme support:
 * style={{ backgroundColor: 'var(--cafe-black)' }}
 */

export const COLORS = {
  // Core palette
  black: '#2C2420',
  brown: '#4A3B32',
  tan: '#A48D78',
  beige: '#CBB9A4',
  cream: '#EDE7D8',
  mist: '#F4F1EA',
  white: '#FAF9F6',

  // Extended palette
  espressoBrown: '#2a1f16',
  warmBrown: '#5a4a38',
  goldPrimary: '#c99a58',
} as const;

export const RGBA_COLORS = {
  // Tan family with opacity
  tanSubtle: 'rgba(164, 141, 120, 0.08)',
  tanLight: 'rgba(164, 141, 120, 0.12)',
  tanMedium: 'rgba(164, 141, 120, 0.25)',
  tanStrong: 'rgba(164, 141, 120, 0.5)',
  tan: 'rgba(164, 141, 120, 1)',

  // Gold family with opacity
  goldSubtle: 'rgba(201, 154, 88, 0.08)',
  goldLight: 'rgba(201, 154, 88, 0.12)',
  goldMedium: 'rgba(201, 154, 88, 0.25)',
  goldStrong: 'rgba(201, 154, 88, 0.5)',
  gold: 'rgba(201, 154, 88, 1)',

  // Overlays
  darkOverlay: 'rgba(0, 0, 0, 0.25)',
  whiteOverlay: 'rgba(255, 255, 255, 0.12)',
  blackOverlaySubtle: 'rgba(0, 0, 0, 0.08)',
  whiteOverlaySubtle: 'rgba(255, 255, 255, 0.08)',
} as const;

// Type-safe color access
export type ColorName = keyof typeof COLORS;
export type RGBAColorName = keyof typeof RGBA_COLORS;

/**
 * Get a color by name with type safety
 */
export function getColor(name: ColorName): string {
  return COLORS[name];
}

/**
 * Get an RGBA color by name with type safety
 */
export function getRGBAColor(name: RGBAColorName): string {
  return RGBA_COLORS[name];
}

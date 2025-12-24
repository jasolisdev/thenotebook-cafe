// app/fonts.ts
import localFont from "next/font/local";

/**
 * Inter — local webfont from /public/fonts
 * Used for body text and UI elements
 * Using font-display: optional for faster FCP (avoids layout shift)
 */
export const inter = localFont({
  variable: "--font-inter",
  display: "optional",
  preload: true,
  src: [
    {
      path: "../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

/**
 * Playfair Display — local webfont from /public/fonts
 * Used for display headings and editorial content
 * Using font-display: optional for faster FCP (avoids layout shift)
 * Converted to .woff2 for 64% smaller file size (294KB → 104KB)
 */
export const playfairDisplay = localFont({
  variable: "--font-playfair",
  display: "optional",
  preload: true,
  src: [
    {
      path: "../public/fonts/PlayfairDisplay-Variable.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
});

/**
 * Torus — local webfont from /public/fonts
 * Alternative sans-serif option for body text
 * Using font-display: optional for faster FCP (avoids layout shift)
 */
export const torus = localFont({
  variable: "--font-torus",
  display: "optional",
  preload: false, // Not primary font
  src: [
    {
      path: "../public/fonts/Torus-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Torus-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

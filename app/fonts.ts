// app/fonts.ts
import localFont from "next/font/local";

/**
 * Inter — local webfont from /public/fonts
 * Used for body text and UI elements
 */
export const inter = localFont({
  variable: "--font-inter",
  display: "swap",
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
 */
export const playfairDisplay = localFont({
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../public/fonts/PlayfairDisplay-Variable.ttf",
      weight: "400 700",
      style: "normal",
    },
  ],
});

/**
 * Torus — local webfont from /public/fonts
 * Alternative sans-serif option for body text
 */
export const torus = localFont({
  variable: "--font-torus",
  display: "swap",
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

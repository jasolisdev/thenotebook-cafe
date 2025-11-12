// app/fonts.ts
import localFont from "next/font/local";

/**
 * Torus — local webfont from /public/fonts
 * Add additional weights here if you have them (e.g., Medium, SemiBold, Italic).
 */
export const torus = localFont({
  variable: "--font-torus",
  display: "swap",
  preload: true,
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

import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* use Torus globally */
        sans: ["var(--font-torus)", "Torus", "system-ui", "sans-serif"],
        mono: ["var(--font-torus)", "Torus", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;

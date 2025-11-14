// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/hero.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

// Page styles
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/menu.css";

import { ThemeProvider } from "next-themes";
import { torus } from "./fonts";
import { cookies } from "next/headers";
import PasswordGate from "./components/PasswordGate";

export const metadata: Metadata = {
  title: "The Notebook Café",
  description: "Coffee. Culture. House Music.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if site is password protected
  const sitePassword = process.env.SITE_PASSWORD;
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("site-auth")?.value === "authenticated";

  // Show password gate if password is set and user is not authenticated
  const showPasswordGate = sitePassword && !isAuthenticated;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${torus.variable}`}
    >
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {showPasswordGate ? <PasswordGate /> : children}
        </ThemeProvider>
      </body>
    </html>
  );
}

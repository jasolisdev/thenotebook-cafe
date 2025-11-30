// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/hero.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";
import "./styles/components/announcement.css";
import "./styles/components/what-to-expect.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

// Page styles
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/menu.css";
import "./styles/pages/events.css";
import "./styles/pages/contact.css";

import { ThemeProvider } from "next-themes";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { cookies } from "next/headers";
import PasswordGate from "./components/ui/PasswordGate";
import SiteHeader from "./components/layout/SiteHeader";
import Script from "next/script";
import { client } from "@/sanity/lib/client";
import VirtualBarista from "./components/ui/VirtualBarista";

// Google Fonts
const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Notebook Café",
  description: "Coffee. Culture. House Music.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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

  // Fetch settings for header (only if not showing password gate)
  const settings = !showPasswordGate ? await client.fetch(`
    *[_type=="settings"][0]{
      social
    }
  `) : null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${outfit.variable}`}
    >
      <body className="antialiased font-sans">
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67a7bd102e5819b79ce969d0"
          strategy="beforeInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {showPasswordGate ? (
            <PasswordGate />
          ) : (
            <>
              <SiteHeader
                instagramUrl={settings?.social?.instagram}
                spotifyUrl={settings?.social?.spotify}
              />
              {children}
              <VirtualBarista />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

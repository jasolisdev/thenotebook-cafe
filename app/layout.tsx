// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/hero.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";
import "./styles/components/announcement.css";
import "./styles/components/consent-banner.css";
import "./styles/components/what-to-expect.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

import { ThemeProvider } from "next-themes";
import { DM_Serif_Display, Outfit, Caveat, Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import PasswordGate from "./components/ui/PasswordGate";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import ImagePreloader from "./components/layout/ImagePreloader";
import AnnouncementBanner from "./components/ui/AnnouncementBanner";
import { client } from "@/sanity/lib/client";
import { CartProvider } from "./components/providers/CartProvider";
import { CartDrawer } from "./components/features/CartDrawer";
import { AccessibilityWidget } from "./components/features/Accessibility/AccessibilityWidget";
import ConsentBanner from "./components/ui/ConsentBanner";
import AnalyticsLoader from "./components/ui/AnalyticsLoader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
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
  const showAnnouncement = false; // temporarily hide banner

  // Fetch settings for header (only if not showing password gate)
  const settings = !showPasswordGate ? await client.fetch(`
    *[_type=="settings"][0]{
      social
    }
  `, {}, { next: { revalidate: 3600 } }) : null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${outfit.variable} ${caveat.variable} ${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <CartProvider>
            {showPasswordGate ? (
              <PasswordGate />
            ) : (
              <>
                {/* Preload critical hero images for smooth page transitions */}
                <ImagePreloader />
                {showAnnouncement && <AnnouncementBanner />}
                <SiteHeader
                  instagramUrl={settings?.social?.instagram}
                  spotifyUrl={settings?.social?.spotify}
                />
                <div className="page-content">
                  {children}
                </div>
                <SiteFooter />
                <ConsentBanner />
                <AnalyticsLoader />
                {/* VirtualBarista temporarily hidden for hero debugging */}
                {/* <VirtualBarista /> */}
                <AccessibilityWidget />
                <CartDrawer />
                <Analytics />
                <SpeedInsights />
              </>
            )}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

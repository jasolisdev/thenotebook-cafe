// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";
import "./styles/components/announcement.css";
import "./styles/components/consent-banner.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

import { ThemeProvider } from "next-themes";
import { DM_Serif_Display, Outfit, Caveat, Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import PasswordGate from "./components/ui/PasswordGate";
import SiteShell from "./components/layout/SiteShell";
import { client } from "@/sanity/lib/client";
import { CartProvider } from "./components/providers/CartProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SEO } from "@/lib/seo";

// Google Fonts
const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
  preload: false,
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SEO.siteName}`,
  },
  description: SEO.defaultDescription,
  keywords: [
    'coffee shop',
    'Riverside CA',
    'specialty coffee',
    'house music',
    'coffee culture',
    'local cafe',
    'espresso',
    'pour over',
    'community hub',
  ],
  authors: [{ name: SEO.siteName }],
  creator: SEO.siteName,
  publisher: SEO.siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SEO.siteUrl,
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} - Coffee culture meets community in Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.twitterImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SEO.siteUrl,
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
          <ErrorBoundary>
            <CartProvider>
              {showPasswordGate ? (
                <PasswordGate />
              ) : (
                <SiteShell
                  instagramUrl={settings?.social?.instagram}
                  spotifyUrl={settings?.social?.spotify}
                  showAnnouncement={showAnnouncement}
                >
                  {children}
                </SiteShell>
              )}
            </CartProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

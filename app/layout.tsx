/**
 * @fileoverview Root layout with global providers
 * @module layouts/root
 *
 * @description
 * Root layout component that wraps the entire application.
 * Provides global state management, metadata, font loading,
 * analytics, and SiteShell wrapper.
 *
 * Provides:
 * - CartProvider for shopping cart state management
 * - ThemeProvider for dark/light mode support
 * - Font optimization (Playfair Display, Torus, Inter)
 * - Global CSS imports (navigation, buttons, footer, etc.)
 * - Vercel Analytics and Speed Insights (conditionally loaded)
 * - Open Graph and Twitter metadata
 * - SiteShell with header/footer
 * - PasswordGate for site-wide password protection (if enabled)
 * - ErrorBoundary for graceful error handling
 *
 * @example
 * Every page is wrapped with:
 * <ThemeProvider>
 *   <CartProvider>
 *     <PasswordGate>
 *       <SiteShell>
 *         {children}
 *       </SiteShell>
 *     </PasswordGate>
 *   </CartProvider>
 * </ThemeProvider>
 *
 * @see {@link app/components/providers/CartProvider.tsx} for cart state
 * @see {@link app/components/layout/SiteShell.tsx} for shell wrapper
 * @see {@link app/components/ui/PasswordGate.tsx} for password protection
 */
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css"; // All styles now consolidated here for better performance

import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import { inter, playfairDisplay, torus } from "./fonts";
import PasswordGate from "./components/ui/PasswordGate";
import SiteShell from "./components/layout/SiteShell";
import { client, hasSanityConfig } from "@/sanity/lib/client";
import { CartProvider } from "./components/providers/CartProvider";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { SEO } from "@/app/lib/constants/seo";


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
  const settings =
    !showPasswordGate && hasSanityConfig
      ? await client.fetch(
          `
    *[_type=="settings"][0]{
      social
    }
  `,
          {},
          { next: { revalidate: 3600 } }
        )
      : null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfairDisplay.variable} ${torus.variable}`}
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

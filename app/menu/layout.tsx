/**
 * @fileoverview Menu layout component
 * @module layouts/menu
 *
 * @description
 * Layout wrapper for the menu page. Provides menu-specific
 * metadata and passes children through unchanged.
 *
 * Provides:
 * - Menu page metadata (title, description, Open Graph)
 * - Canonical URL for SEO
 * - Twitter card metadata
 *
 * @example
 * Applied to: /menu page
 * Wraps: Menu page children
 *
 * @see {@link app/menu/page.tsx} for menu page component
 */
import type { Metadata } from "next";
import { SEO } from "@/app/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.pages.menu.title,
  description: SEO.pages.menu.description,
  alternates: {
    canonical: `${SEO.siteUrl}/menu`,
  },
  openGraph: {
    title: SEO.pages.menu.title,
    description: SEO.pages.menu.description,
    url: `${SEO.siteUrl}/menu`,
    images: [
      {
        url: SEO.pages.menu.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} Menu — Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.pages.menu.title,
    description: SEO.pages.menu.description,
    images: [SEO.pages.menu.ogImage],
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

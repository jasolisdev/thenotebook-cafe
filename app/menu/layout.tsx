import type { Metadata } from "next";
import { SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO.pages.menu.title,
  description: SEO.pages.menu.description,
  alternates: {
    canonical: '/menu',
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

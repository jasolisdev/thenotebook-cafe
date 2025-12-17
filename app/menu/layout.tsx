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
    url: '/menu',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

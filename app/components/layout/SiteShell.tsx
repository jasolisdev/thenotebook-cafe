/**
 * @fileoverview Page wrapper component with header and footer
 * @module components/layout/SiteShell
 *
 * @description
 * Main layout wrapper that includes SiteHeader, SiteFooter, and global
 * client-side components (analytics, consent banner, accessibility widget).
 * Manages scroll behavior and dynamic component loading.
 *
 * @example
 * ```tsx
 * <SiteShell>
 *   <YourPageContent />
 * </SiteShell>
 * ```
 */
"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ImagePreloader from "./ImagePreloader";
import AnnouncementBanner from "@/app/components/ui/AnnouncementBanner";

const ConsentBanner = dynamic(() => import("@/app/components/ui/ConsentBanner"), { ssr: false });
const AnalyticsLoader = dynamic(() => import("@/app/components/ui/AnalyticsLoader"), { ssr: false });
const AccessibilityWidget = dynamic(
  () =>
    import("@/app/components/features/Accessibility/AccessibilityWidget").then(
      (m) => m.AccessibilityWidget
    ),
  { ssr: false }
);
const CartDrawer = dynamic(
  () => import("@/app/components/features/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false }
);

type SiteShellProps = {
  children: React.ReactNode;
  instagramUrl?: string;
  spotifyUrl?: string;
  showAnnouncement: boolean;
};

export default function SiteShell({
  children,
  instagramUrl,
  spotifyUrl,
  showAnnouncement,
}: SiteShellProps) {
  const pathname = usePathname();

  const isStudio = useMemo(() => {
    if (!pathname) return false;
    return pathname === "/studio" || pathname.startsWith("/studio/");
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("studio-mode", isStudio);
    return () => {
      document.body.classList.remove("studio-mode");
    };
  }, [isStudio]);

  if (isStudio) {
    return <div className="studio-root">{children}</div>;
  }

  return (
    <>
      <ImagePreloader />
      {showAnnouncement && <AnnouncementBanner />}
      <SiteHeader instagramUrl={instagramUrl} spotifyUrl={spotifyUrl} />
      <div className="page-content">{children}</div>
      <SiteFooter />
      <ConsentBanner />
      <AnalyticsLoader />
      <AccessibilityWidget />
      <CartDrawer />
    </>
  );
}

"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ImagePreloader from "./ImagePreloader";
import AnnouncementBanner from "../ui/AnnouncementBanner";
import ConsentBanner from "../ui/ConsentBanner";
import AnalyticsLoader from "../ui/AnalyticsLoader";
import { AccessibilityWidget } from "../features/Accessibility/AccessibilityWidget";
import { CartDrawer } from "../features/CartDrawer";

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


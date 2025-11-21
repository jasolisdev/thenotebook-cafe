import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";

type Props = {
  children: React.ReactNode;
  instagramUrl?: string;
  spotifyUrl?: string;
  footer?: {
    businessName?: string;
    address?: string;
    hours?: { weekday?: string; weekend?: string };
    instagramUrl?: string;
  };
  announcementText?: string;
};

export default function NotebookPage({
  children,
  instagramUrl,
  spotifyUrl,
  footer,
  announcementText,
}: Props) {
  return (
    <main className="site-layout">
      <SiteHeader
        instagramUrl={instagramUrl}
        spotifyUrl={spotifyUrl}
        announcementText={announcementText}
      />

      <section className="mx-auto max-w-[1100px] px-5 pt-[96px] pb-10">
        <div className="mx-auto max-w-[760px] text-center">{children}</div>
        {footer && <SiteFooter />}
      </section>
    </main>
  );
}

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AnnouncementBanner from "./AnnouncementBanner";

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
    <main className="page-dark">
      {announcementText ? <AnnouncementBanner text={announcementText} /> : null}
      <SiteHeader instagramUrl={instagramUrl} spotifyUrl={spotifyUrl} />

      <section className="mx-auto max-w-[1100px] px-5 pt-[96px] pb-10">
        <div className="mx-auto max-w-[760px] text-center">{children}</div>
        {footer && <SiteFooter />}
      </section>
    </main>
  );
}

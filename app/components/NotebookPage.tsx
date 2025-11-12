import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AnnouncementBanner from "./AnnouncementBanner";

type Props = {
  children: React.ReactNode;
  instagramUrl?: string;
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
  footer,
  announcementText,
}: Props) {
  return (
    <main className="page-dark">
      {announcementText ? <AnnouncementBanner text={announcementText} /> : null}
      <div className="nav-glass-wrap">
        <div className="nav-glass">
          <SiteHeader instagramUrl={instagramUrl} />
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] px-5 pt-[96px] pb-10">
        <div className="mx-auto max-w-[760px] text-center">{children}</div>
        {footer && (
          <SiteFooter
            businessName={footer.businessName}
            address={footer.address}
            hours={footer.hours}
            instagramUrl={footer.instagramUrl}
          />
        )}
      </section>
    </main>
  );
}

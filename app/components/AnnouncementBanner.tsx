type BannerProps = { text?: string };

export default function AnnouncementBanner({ text }: BannerProps) {
  if (!text) return null;
  return (
    <div
      className="w-full text-center text-[13px] py-2 px-3"
      style={{
        background: "var(--panel)",
        borderBottom: "1px solid var(--panel-border)",
        color: "var(--ink-cream)",
      }}
      role="status"
      aria-live="polite"
    >
      <span>{text}</span>
    </div>
  );
}

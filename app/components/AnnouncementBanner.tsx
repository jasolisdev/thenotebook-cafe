"use client";

type Props = {
  text?: string;
};

export default function AnnouncementBanner({ text }: Props) {
  if (!text) return null;

  return (
    <div
      className="w-full text-center text-xs font-semibold tracking-[0.2em] uppercase"
      style={{ backgroundColor: "rgba(164, 141, 120, 0.15)", color: "#2C2420", padding: "8px 12px" }}
    >
      {text}
    </div>
  );
}

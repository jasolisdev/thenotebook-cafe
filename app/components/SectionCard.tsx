type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="card px-6 py-6 text-left">
      {title ? (
        <div
          className="uppercase tracking-widest text-[11px] mb-2"
          style={{ color: "var(--accent-color-1)" }}
        >
          {title}
        </div>
      ) : null}
      <div className="text-[15px] leading-7 ink">{children}</div>
    </div>
  );
}

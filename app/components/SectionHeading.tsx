type SectionHeadingProps = {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
};

export default function SectionHeading({
  children,
  accent = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`uppercase tracking-widest text-[11px] mb-3 ${
        accent ? "" : "ink-muted"
      } ${className}`}
      style={accent ? { color: "var(--accent-color-1)" } : undefined}
    >
      {children}
    </div>
  );
}

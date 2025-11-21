type BulletListProps = {
  items: string[];
  align?: "left" | "center";
};

export default function BulletList({ items, align = "left" }: BulletListProps) {
  return (
    <ul
      className={`mx-auto max-w-[52ch] space-y-3 text-[16px] leading-7 ink ${
        align === "left" ? "text-left" : "text-center"
      }`}
    >
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[10px] h-2 w-2 rounded-full accent-dot" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

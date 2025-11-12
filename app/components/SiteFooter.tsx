type FooterProps = {
  businessName?: string;
  address?: string;
  hours?: { weekday?: string; weekend?: string };
  instagramUrl?: string;
};

export default function SiteFooter({
  businessName = "The Notebook Café LLC",
  address,
  hours,
  instagramUrl,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center text-[13px] leading-6 mt-12 footer-dim">
      {address && <div className="mb-1">{address}</div>}
      {hours?.weekday || hours?.weekend ? (
        <div className="mb-1">
          {hours?.weekday && <span>Mon–Fri: {hours.weekday}</span>}
          {hours?.weekend && (
            <>
              {" "}
              • <span>Sat–Sun: {hours.weekend}</span>
            </>
          )}
        </div>
      ) : null}
      {instagramUrl && (
        <div className="mb-1">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="ink-cream-dim underline underline-offset-4"
          >
            Instagram
          </a>
        </div>
      )}
      <div>
        © {year} {businessName} — Riverside, CA
      </div>
    </footer>
  );
}

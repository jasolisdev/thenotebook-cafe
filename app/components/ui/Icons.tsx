export const CoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="feature-icon" {...props}>
    <path
      d="M4 10h12a4 4 0 1 1 0 8H8a4 4 0 0 1-4-4v-4Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M16 10s.8-3-2-3-2.2-2 .2-2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

export const EqIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="feature-icon" {...props}>
    <path
      d="M5 20v-6M10 20v-10M15 20v-4M20 20v-14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const NoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="feature-icon" {...props}>
    <path d="M6 4h9l3 3v13H6V4Z" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M9 9h6M9 13h6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

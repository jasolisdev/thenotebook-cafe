'use client';

type Props = {
  text?: string;
};

export default function AnnouncementBanner({ text = 'THE NOTEBOOK CAFE • RIVERSIDE, CA • Grand Opening 2026' }: Props) {
  return (
    <div className="announcement-banner">
      <div className="announcement-content">
        {/* Left Coffee Cup */}
        <div className="announcement-icon">
          <svg className="announcement-coffee-cup" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="announcement-steam announcement-steam-1"></div>
          <div className="announcement-steam announcement-steam-2"></div>
          <div className="announcement-steam announcement-steam-3"></div>
        </div>

        {/* Scrolling Text Container */}
        <div className="announcement-text-wrapper">
          <div className="announcement-text-scroll">
            <p className="announcement-text">{text}</p>
            <p className="announcement-text">{text}</p>
            <p className="announcement-text">{text}</p>
          </div>
        </div>

        {/* Right Coffee Cup */}
        <div className="announcement-icon">
          <svg className="announcement-coffee-cup" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="announcement-steam announcement-steam-1"></div>
          <div className="announcement-steam announcement-steam-2"></div>
          <div className="announcement-steam announcement-steam-3"></div>
        </div>
      </div>
    </div>
  );
}

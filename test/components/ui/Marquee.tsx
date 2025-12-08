import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    "BREWING INSPIRATION",
    "OPEN DAILY 7AM-7PM",
    "FRESH PASTRIES",
    "FREE WIFI",
    "CURATED PLAYLISTS",
    "LOCALLY ROASTED"
  ];

  return (
    <div className="bg-latte-900 py-4 overflow-hidden whitespace-nowrap border-y border-latte-800 relative z-20">
      <div className="inline-flex animate-marquee">
        {/* First set */}
        {items.map((item, i) => (
          <div key={`a-${i}`} className="flex items-center mx-6 md:mx-10">
            <span className="w-2 h-2 bg-latte-400 rounded-full mr-6 md:mr-10"></span>
            <span className="font-display font-bold text-latte-50 text-xs md:text-sm tracking-[0.2em] uppercase">
              {item}
            </span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, i) => (
          <div key={`b-${i}`} className="flex items-center mx-6 md:mx-10">
            <span className="w-2 h-2 bg-latte-400 rounded-full mr-6 md:mr-10"></span>
            <span className="font-display font-bold text-latte-50 text-xs md:text-sm tracking-[0.2em] uppercase">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
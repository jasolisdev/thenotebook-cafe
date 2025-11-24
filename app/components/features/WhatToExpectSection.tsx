/**
 * WhatToExpectSection Component
 *
 * Displays a timeline-style section showcasing what visitors can expect at The Notebook Café.
 * Features animated icons and a two-column responsive layout.
 *
 * @component
 * @example
 * ```tsx
 * <WhatToExpectSection />
 * ```
 */
export default function WhatToExpectSection() {
  const timelineItems = [
    {
      id: 1,
      title: "Specialty espresso, roasted right",
      description:
        "Dialed-in shots, carefully sourced beans, and signature drinks that rotate with the seasons.",
      icon: "coffee",
    },
    {
      id: 2,
      title: "House music energy, daytime into night",
      description:
        "Warm daytime playlists, deeper house and lo-fi grooves as the sun goes down.",
      icon: "music",
    },
    {
      id: 3,
      title: "Stay, study, create",
      description:
        "Outlets at every table, fast Wi-Fi, and cozy corners for journaling, deep work, or meeting up with your crew.",
      icon: "notebook",
    },
  ];

  return (
    <section
      id="what-to-expect"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f8f1e7 0%, #f1e0c9 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Section Label */}
            <p
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "rgba(90, 74, 56, 0.8)" }}
            >
              What to Expect
            </p>

            {/* Main Headline */}
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "#2a1f16" }}
            >
              More than a coffee run.
            </h2>

            {/* Body Paragraph */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: "#2a1f16" }}
            >
              The Notebook Café is your third place: a little bit espresso bar,
              a little bit listening room, and a lot of space to get lost in
              your ideas.
            </p>
          </div>

          {/* Right Column - Timeline Card */}
          <div className="relative">
            <div
              className="rounded-3xl p-6 sm:p-8 relative shadow-lg border"
              style={{
                background: "#fdf6ec",
                borderColor: "#ecd7bf",
              }}
            >
              {/* Vertical Timeline Line */}
              <div
                className="absolute left-10 sm:left-12 top-20 bottom-20 w-0.5"
                style={{ background: "#ecd7bf" }}
                aria-hidden="true"
              />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={item.id} className="flex gap-4 sm:gap-5 relative">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center"
                        style={{
                          background: "#fdf6ec",
                          borderColor: "rgba(90, 74, 56, 0.3)",
                        }}
                      >
                        {/* Coffee Cup Icon with Steam */}
                        {item.icon === "coffee" && (
                          <div className="expect-icon-coffee">
                            <svg
                              className="coffee-cup-expect"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="expect-steam expect-steam-1"></div>
                            <div className="expect-steam expect-steam-2"></div>
                            <div className="expect-steam expect-steam-3"></div>
                          </div>
                        )}

                        {/* Music Notes Icon */}
                        {item.icon === "music" && (
                          <div className="expect-icon-music">
                            <svg
                              className="music-note-expect music-note-expect-1"
                              width="20"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                            <svg
                              className="music-note-expect music-note-expect-2"
                              width="16"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                          </div>
                        )}

                        {/* Notebook Icon */}
                        {item.icon === "notebook" && (
                          <svg
                            className="expect-icon-notebook"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              x="4"
                              y="3"
                              width="13"
                              height="18"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="4"
                              y1="7"
                              x2="17"
                              y2="7"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="7"
                              y1="11"
                              x2="14"
                              y2="11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <line
                              x1="7"
                              y1="14"
                              x2="12"
                              y2="14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              className="notebook-pen-expect"
                              d="M15 15L20 10L21 11L16 16L15 15Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 pt-1">
                      <h3
                        className="text-base sm:text-lg font-semibold mb-2 leading-snug"
                        style={{ color: "#2a1f16" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: "rgba(42, 31, 22, 0.8)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// app/components/NotebookFrame.tsx
"use client";

import type { PropsWithChildren } from "react";

/**
 * Mobile-only notebook “device” with spiral + ruled paper.
 * No images — all gradients. Wrap your mobile content with this.
 */
export default function NotebookFrame({ children }: PropsWithChildren) {
  return (
    <div className="sm:hidden w-full flex justify-center px-4 pb-10">
      <div
        className="
          relative w-full max-w-[420px] min-h-[70vh]
          rounded-[28px] border border-black/25
          shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.08)]
          overflow-hidden
          bg-[var(--paper-bg)]
        "
        style={
          {
            // CSS custom props for easier tuning
            // @ts-ignore - CSS variables
            "--paper-bg": "#f6f2e9",
          } as React.CSSProperties
        }
      >
        {/* Page: ruled lines + red margin + subtle paper grain */}
        <div
          className="
            absolute inset-[14px] rounded-[22px] overflow-hidden
            shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.06)]
          "
          style={{
            backgroundImage: [
              // base paper
              "linear-gradient(#f6f2e9,#f6f2e9)",
              // blue rules
              "repeating-linear-gradient(to bottom, transparent 0 22px, rgba(70,115,180,0.25) 22px 23px)",
              // red margin
              "linear-gradient(to right, rgba(208,70,72,0.35) 54px, transparent 54px)",
              // super subtle paper noise
              "radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,0.03), rgba(0,0,0,0))",
            ].join(","),
            backgroundSize: "100% 100%, 100% 23px, 100% 100%, 100% 100%",
            backgroundBlendMode: "normal, multiply, normal, normal",
          }}
        >
          {/* Right-edge “page curl” shadow */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[46px]"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.24), rgba(0,0,0,0.06), rgba(0,0,0,0))",
              WebkitMask:
                "radial-gradient(120px 100% at 100% 50%, black 55%, transparent 56%)",
              mask: "radial-gradient(120px 100% at 100% 50%, black 55%, transparent 56%)",
            }}
          />

          {/* Top spiral band with punch holes */}
          <div
            className="absolute left-0 right-0 top-0 h-[46px]"
            style={{
              background: "linear-gradient(#ece7dc,#e3ddcf)", // band base
              boxShadow:
                "inset 0 -1px 0 rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          />
          {/* Spiral rings (little metal loops) */}
          <div
            className="absolute left-[24px] right-[24px] top-[8px] h-[26px] grid grid-cols-[repeat(auto-fit,minmax(18px,0))] gap-[14px]"
            aria-hidden
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-full w-[18px] rounded-[10px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9), rgba(230,230,230,0.7) 35%, rgba(180,180,180,0.7) 60%, rgba(80,80,80,0.8))",
                  boxShadow:
                    "inset 0 0 2px rgba(0,0,0,0.4), 0 1px 1px rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>

          {/* Content area */}
          <div className="relative z-10 px-6 pt-16 pb-8">{children}</div>
        </div>

        {/* Device bezel shading */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
      </div>
    </div>
  );
}

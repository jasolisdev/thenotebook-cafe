"use client";

type SpiralBindingProps = {
  /** Height of the binding area (includes coils + holes), px */
  height?: number;
  /** Horizontal spacing between coils/holes, px (visual “pitch”) */
  spacing?: number;
  /** Approx coil size, px */
  coilRadius?: number;
  /** Paper corner radius to match your sheet */
  cornerRadius?: number;
};

export default function SpiralBinding({
  height = 84,
  spacing = 64,
  coilRadius = 12,
  cornerRadius = 14,
}: SpiralBindingProps) {
  // We use patternUnits="userSpaceOnUse" so spacing is in CSS px and doesn't blur when scaled.
  const h = height;
  const r = coilRadius;
  const holeY = h - 18; // vertical position of punched holes
  const coilY = 26; // vertical position of coil “bulge”
  const barH = 22; // metal bar height

  return (
    <div className="spiral-wrap" style={{ height: h }}>
      <svg
        className="spiral-svg"
        viewBox={`0 0 100 ${h}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Metal bar at the very top */}
          <linearGradient id="metalBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222" />
            <stop offset="100%" stopColor="#141414" />
          </linearGradient>

          {/* Soft shadow under each coil */}
          <filter id="ringShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.5"
              floodColor="rgba(0,0,0,0.45)"
            />
          </filter>

          {/* The repeating unit: one coil + one hole */}
          <pattern
            id="coilPattern"
            patternUnits="userSpaceOnUse"
            width={spacing}
            height={h}
          >
            {/* COIL */}
            <g filter="url(#ringShadow)">
              {/* outer dark coil */}
              <ellipse
                cx={spacing / 2}
                cy={coilY}
                rx={r}
                ry={r * 1.25}
                fill="#2f2f2f"
              />
              {/* inner highlight/metal tone */}
              <ellipse
                cx={spacing / 2}
                cy={coilY}
                rx={r * 0.65}
                ry={r * 0.95}
                fill="#3b3b3b"
              />
              {/* stem to suggest coil descending into hole */}
              <rect
                x={spacing / 2 - 2.4}
                y={coilY + r * 0.9}
                width={4.8}
                height={holeY - (coilY + r * 0.9) - 4}
                rx={2.4}
                fill="#242424"
              />
            </g>

            {/* PUNCHED HOLE */}
            <g>
              {/* bevel highlight edge */}
              <circle
                cx={spacing / 2}
                cy={holeY - 1}
                r={9}
                fill="rgba(255,255,255,0.18)"
              />
              {/* dark hole */}
              <circle
                cx={spacing / 2}
                cy={holeY}
                r={8}
                fill="rgba(0,0,0,0.78)"
              />
            </g>
          </pattern>

          {/* Mask to keep binding inside rounded paper corners */}
          <mask id="paperTopMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height={h}
              fill="white"
              rx={cornerRadius}
              ry={cornerRadius}
            />
          </mask>
        </defs>

        {/* Metal bar */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={barH}
          fill="url(#metalBar)"
          mask="url(#paperTopMask)"
        />

        {/* Repeating coils + holes */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={h}
          fill="url(#coilPattern)"
          mask="url(#paperTopMask)"
        />

        {/* Gentle glow where paper meets bar */}
        <rect
          x="0"
          y={barH - 2}
          width="100%"
          height="18"
          fill="url(#paperGlow)"
          opacity="0.5"
          mask="url(#paperTopMask)"
        />
        <defs>
          <linearGradient id="paperGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

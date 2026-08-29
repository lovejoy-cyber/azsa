/**
 * The flag of Zimbabwe, drawn accurately to the official design: seven
 * equal horizontal stripes (green/gold/red/black/red/gold/green), a
 * black-edged white triangle on the hoist side, and a red five-pointed
 * star. The bird atop the star is a simplified silhouette, not a trace of
 * the official Zimbabwe Bird artwork -- national flags and their
 * on-flag emblems are public domain / free of copyright (Zimbabwean law
 * and Wikimedia both list the flag as PD), so this is a real, accurate
 * rendering rather than a stock photo standing in for one.
 */
export function ZimbabweFlag({ className = "" }: { className?: string }) {
  const green = "#006400";
  const gold = "#FFD200";
  const red = "#EF3340";
  const black = "#000000";

  return (
    <svg
      viewBox="0 0 900 450"
      className={className}
      role="img"
      aria-label="Flag of Zimbabwe"
      preserveAspectRatio="xMidYMid meet"
    >
      {[green, gold, red, black, red, gold, green].map((color, i) => (
        <rect key={i} x={0} y={i * (450 / 7)} width={900} height={450 / 7 + 1} fill={color} />
      ))}
      <polygon points="0,0 390,225 0,450" fill="black" />
      <polygon points="0,14 366,225 0,436" fill="white" />
      <polygon
        points="150.0,170.0 162.3,208.0 202.3,208.0 170.0,231.5 182.3,269.5 150.0,246.0 117.7,269.5 130.0,231.5 97.7,208.0 137.7,208.0"
        fill={red}
      />
      {/* Simplified bird silhouette, not a trace of the official artwork */}
      <path
        d="M150 170 q-14 -16 -30 -14 q10 10 14 20 q-16 -4 -26 6 q14 4 20 12 q10 -14 22 -18 q10 6 14 16 q6 -12 -14 -22 Z"
        fill={gold}
      />
    </svg>
  );
}

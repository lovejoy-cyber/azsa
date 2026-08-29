/**
 * The flag of Algeria, drawn to the official design: two equal vertical
 * bands (green at the hoist, white at the fly), with a red crescent and
 * five-pointed star centered on the dividing line. Same rationale as the
 * Zimbabwe flag component -- a real, accurate rendering, not a stock photo.
 */
export function AlgeriaFlag({ className = "" }: { className?: string }) {
  const green = "#006233";
  const red = "#D21034";

  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      role="img"
      aria-label="Flag of Algeria"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={450} height={600} fill={green} />
      <rect x={450} y={0} width={450} height={600} fill="white" />
      {/* Crescent: large red circle with a slightly smaller white circle
          offset to the right, leaving a crescent shape open toward the fly */}
      <circle cx={450} cy={300} r={130} fill={red} />
      <circle cx={485} cy={300} r={108} fill="white" />
      {/* Five-pointed star inside the crescent's opening */}
      <polygon
        points="450.0,245.0 462.3,283.0 502.3,283.0 470.0,306.5 482.3,344.5 450.0,321.0 417.7,344.5 430.0,306.5 397.7,283.0 437.7,283.0"
        fill={red}
      />
    </svg>
  );
}

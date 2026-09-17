/**
 * The Zimbabwe Bird -- the soapstone carving from Great Zimbabwe that
 * appears on the national flag. Drawn as an original stylised silhouette
 * rather than a trace of the state coat of arms, so it can be used freely
 * as a decorative motif across the site.
 */
export function ZimbabweBird({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="zb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-500)" />
          <stop offset="55%" stopColor="var(--color-gold-600)" />
          <stop offset="100%" stopColor="var(--color-gold-700)" />
        </linearGradient>
      </defs>
      <g fill="url(#zb-grad)">
        {/* head + beak */}
        <path d="M96 26c-9 0-16 6-16 14 0 4 2 8 5 10l-14 5c-2 1-2 3 0 4l16 3c1 6 5 10 10 11l3 1V64c-4-2-7-6-7-11 0-6 5-11 11-11 5 0 9 3 11 7l7-3c-3-11-12-19-26-19Z" />
        {/* neck + body */}
        <path d="M104 74c-14 4-24 16-24 32 0 14 6 24 6 38 0 12-4 20-4 30 0 14 10 24 24 24s24-10 24-24c0-10-4-18-4-30 0-14 6-24 6-38 0-16-10-28-24-32Z" />
        {/* wing detail */}
        <path
          d="M118 108c8 6 12 16 12 28 0 12-4 22-10 30"
          stroke="var(--color-ink-950)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
          fill="none"
        />
        {/* plinth -- the carved column the bird sits on */}
        <path d="M74 200h52l6 34H68l6-34Z" />
        <rect x="62" y="240" width="76" height="16" rx="3" />
        <rect x="58" y="262" width="84" height="18" rx="3" />
        {/* chevron band, echoing the Great Zimbabwe walls */}
        <g fill="var(--color-ink-950)" opacity="0.45">
          <path d="M64 266l10 9-10 9v-18Z" />
          <path d="M86 266l10 9-10 9v-18Z" />
          <path d="M108 266l10 9-10 9v-18Z" />
          <path d="M130 266l8 7-8 7v-14Z" />
        </g>
        <rect x="54" y="286" width="92" height="14" rx="3" />
      </g>
    </svg>
  );
}

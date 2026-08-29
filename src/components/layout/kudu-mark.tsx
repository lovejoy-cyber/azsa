/**
 * AZSA mark -- an original, abstract interpretation of curling kudu horns
 * (not a trace of the national coat of arms or any specific emblem). Two
 * thin curling strokes meeting at a base point. Kept deliberately minimal
 * so it reads as a mark, not clip art, down to ~24px in the nav.
 */
export function KuduMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M20 33 C16 24 14.5 14 17 7 C18.2 3.8 16.8 1.5 14.5 1.2 C12.8 3 12.8 6.5 14 9.5"
        stroke="var(--color-gold-500)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M20 33 C24 24 25.5 14 23 7 C21.8 3.8 23.2 1.5 25.5 1.2 C27.2 3 27.2 6.5 26 9.5"
        stroke="var(--color-gold-500)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="34.5" r="1.8" fill="var(--color-gold-500)" />
    </svg>
  );
}

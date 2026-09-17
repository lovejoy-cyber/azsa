"use client";

import { useState } from "react";

/**
 * Word-by-word rise-in headline with per-word hover response.
 *
 * CSS-animation-based on purpose: the server-rendered HTML must never
 * ship with the text translated out of view, otherwise a slow or failed
 * hydration leaves a blank hero. Words from `accentFrom` onward carry the
 * animated gradient so the line reads as two-tone rather than flat.
 */
export function StaggerHeadline({
  text,
  className = "",
  delay = 0,
  accentFrom,
}: {
  text: string;
  className?: string;
  delay?: number;
  accentFrom?: number;
}) {
  const words = text.split(" ");
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <span className={className}>
      {words.map((word, i) => {
        const accented = accentFrom !== undefined && i >= accentFrom;
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <span
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`word-rise inline-block cursor-default transition-[transform,filter] duration-300 ${
                accented ? "gradient-text" : ""
              } ${hovered === i ? "scale-[1.06]" : ""}`}
              style={{
                animationDelay: `${delay + i * 0.06}s`,
                filter: hovered === i ? "drop-shadow(0 0 18px rgba(232,189,63,0.55))" : undefined,
                color: hovered === i && !accented ? "var(--color-gold-500)" : undefined,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </span>
  );
}

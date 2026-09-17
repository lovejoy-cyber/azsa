"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Each word's font-weight (and a touch of scale) responds continuously to
 * how close the cursor is, using Fraunces' real variable-weight axis
 * (100-900) via font-variation-settings. This is word-level, not true
 * per-character glyph morphing -- that needs custom WebGL text rendering,
 * which is a much larger, specialized build than a proximity effect on a
 * heading warrants.
 */
export function MagneticWords({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame: number;

    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        wordRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          const influence = Math.max(0, 1 - dist / 260);
          const weight = Math.round(420 + influence * 480);
          const scale = 1 + influence * 0.06;
          el.style.fontVariationSettings = `'wght' ${weight}`;
          el.style.transform = `scale(${scale})`;
        });
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
          className="inline-block transition-transform duration-150 ease-out"
          style={{
            fontFamily: reduced ? undefined : "'Fraunces Variable', var(--font-display)",
            display: "inline-block",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

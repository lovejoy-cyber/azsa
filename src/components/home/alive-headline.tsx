"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A headline that stays in motion.
 *
 * Each word rises in on load, then continuously breathes on its own
 * offset cycle, and reacts to the cursor: words near the pointer lift,
 * brighten to gold, and gain weight via Fraunces' variable axis. CSS
 * drives the entry so the text is never hidden if JS fails to hydrate --
 * that was the cause of an earlier blank-hero bug.
 */
export function AliveHeadline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        refs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy);
          const infl = Math.max(0, 1 - d / 280);
          el.style.setProperty("--infl", infl.toFixed(3));
          el.style.setProperty("--lift", `${-infl * 10}px`);
          el.style.setProperty("--wght", `${Math.round(600 + infl * 300)}`);
        });
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`alive-word inline-block ${ready ? "is-live" : ""}`}
            style={{
              animationDelay: `${i * 0.07}s`,
              ["--breathe-delay" as string]: `${i * 0.35}s`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

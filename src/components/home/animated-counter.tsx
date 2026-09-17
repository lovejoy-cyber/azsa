"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` when scrolled into view.
 *
 * Critical: the real number is what renders on the server and on first
 * paint. An earlier version started at 0 and relied on JS to reach the
 * target, which meant any hydration failure left every statistic reading
 * "0" permanently -- indistinguishable from a broken template. Now the
 * animation only ever runs as an enhancement: JS resets to 0 and counts
 * up *after* proving it can, so the worst case is a correct static
 * number rather than a wrong one.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const from = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutExpo -- fast out of the gate, settles precisely
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(Math.round(from + (value - from) * eased));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { run(); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    // Failsafe: if the observer never fires, the number is already correct.
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wraps any card/element with a cursor-following glow and an elastic
 * "pop" on hover (spring physics, not a linear CSS scale) -- contained to
 * a scale that keeps the card legible and doesn't overlap its neighbours
 * in a grid, since actual layout breakage reads as a bug, not luxury.
 */
export function GlowSurface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      whileHover={{ scale: 1.045, y: -6 }}
      transition={{ type: "spring", stiffness: 340, damping: 18 }}
      className={cn("sheen relative", className)}
      style={{ transformOrigin: "center" }}
    >
      {children}
    </motion.div>
  );
}

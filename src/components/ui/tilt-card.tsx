"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Genuine 3D tilt: the card rotates in perspective toward the cursor,
 * with a specular highlight that tracks the pointer. This is CSS 3D
 * (rotateX/rotateY on a perspective parent), not WebGL -- it's what most
 * "3D feel" premium sites actually use, it's GPU-composited, and it costs
 * nothing on mobile where it's disabled.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 9,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    el.style.setProperty("--rx", `${(0.5 - py) * intensity}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * intensity}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="tilt-scene h-full">
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn("tilt-card h-full", className)}
      >
        {children}
      </div>
    </div>
  );
}

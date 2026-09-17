"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MouseReactiveGlow({
  color = "var(--color-gold-500)",
  size = 500,
  opacity = 0.18,
}: {
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
    const rect = el.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute rounded-full blur-[100px]"
      style={{
        width: size,
        height: size,
        left: springX,
        top: springY,
        x: -size / 2,
        y: -size / 2,
        opacity,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

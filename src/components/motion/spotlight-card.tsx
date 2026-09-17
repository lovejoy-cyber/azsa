"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  enableTilt?: boolean;
  intensity?: number;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(255, 215, 0, 0.15)",
  className = "",
  enableTilt = true,
  intensity = 15,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Tilt Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePos({ x: mouseX, y: mouseY });

    if (enableTilt) {
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    setIsHovered(true);
    if (props.onMouseEnter) props.onMouseEnter(e);
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    setIsHovered(false);
    if (enableTilt) {
      x.set(0);
      y.set(0);
    }
    if (props.onMouseLeave) props.onMouseLeave(e);
  }

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        ref={ref}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          ...props.style,
        }}
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300",
          "hover:border-gold-500/30 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {/* Dynamic Cursor-Following Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />

        {/* Specular Glare Reflection on Hover */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Card Content with 3D Depth Elevation */}
        <div className="relative z-10 h-full" style={{ transform: enableTilt ? "translateZ(30px)" : "none" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

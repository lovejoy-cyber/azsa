"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { KineticText } from "@/components/motion/kinetic-text";
import { cn } from "@/lib/utils";

interface SubpageHeroProps {
  badgeText: string;
  title: string;
  description?: string;
  className?: string;
  tone?: "gold" | "emerald" | "ruby";
  stats?: { label: string; value: string }[];
}

export function SubpageHero({
  badgeText,
  title,
  description,
  className = "",
  tone = "gold",
  stats,
}: SubpageHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Ambient floating particles
    const particleColors =
      tone === "gold"
        ? ["rgba(255, 215, 0, 0.6)", "rgba(245, 158, 11, 0.4)", "rgba(255, 255, 255, 0.5)"]
        : tone === "emerald"
        ? ["rgba(5, 150, 105, 0.6)", "rgba(16, 185, 129, 0.4)", "rgba(255, 255, 255, 0.5)"]
        : ["rgba(239, 68, 68, 0.6)", "rgba(225, 29, 72, 0.4)", "rgba(255, 255, 255, 0.5)"];

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [tone]);

  const toneGradients = {
    gold: "from-amber-500/20 via-yellow-500/10 to-transparent",
    emerald: "from-emerald-500/20 via-teal-500/10 to-transparent",
    ruby: "from-rose-500/20 via-red-500/10 to-transparent",
  };

  const badgeColors = {
    gold: "border-gold-500/40 bg-gold-500/10 text-gold-400 shadow-[0_0_20px_rgba(255,215,0,0.2)]",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(5,150,105,0.2)]",
    ruby: "border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.2)]",
  };

  const pingColors = {
    gold: "bg-gold-500",
    emerald: "bg-emerald-500",
    ruby: "bg-rose-500",
  };

  return (
    <section className={cn("relative isolate overflow-hidden bg-ink-950 text-white pt-24 pb-20 border-b border-white/5 film-grain", className)}>
      {/* Background Interactive Star/Particle Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60" />

      {/* Atmospheric Aurora Mesh Glowing Blob */}
      <div
        className={cn(
          "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-40 bg-gradient-to-b",
          toneGradients[tone]
        )}
      />

      {/* Top Coordinate HUD Watermark */}
      <div className="pointer-events-none absolute top-6 right-8 hidden md:flex items-center gap-3 text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase">
        <span>DZ • 36.7538° N • 3.0588° E</span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span>SOVEREIGN ARCHIVE</span>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Glowing Radar Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md border"
          >
            <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px]", badgeColors[tone])}>
              <span className="relative flex h-2 w-2">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pingColors[tone])} />
                <span className={cn("relative inline-flex rounded-full h-2 w-2", pingColors[tone])} />
              </span>
              <span>{badgeText}</span>
            </div>
          </motion.div>

          {/* Kinetic Headline Reveal */}
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            <KineticText text={title} type="word" />
          </h1>

          {/* Subtitle Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="mt-6 text-lg sm:text-xl font-light leading-relaxed text-white/70 max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {/* Optional Stats Grid */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t border-white/10 pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-2xl font-bold tracking-tight text-gold-400 sm:text-3xl text-glow-gold">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>

      {/* Bottom Ambient Glow Border Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  );
}

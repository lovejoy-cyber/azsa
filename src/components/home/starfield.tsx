"use client";

import { useEffect, useRef } from "react";

/**
 * The living starfield.
 *
 * Mounted ONCE at the app layout level as a fixed, z-0 background and
 * never unmounted -- the welcome overlay renders on top of it, so when
 * the overlay clears, this exact canvas is still running underneath as
 * the page background. (An earlier version lived inside the intro
 * component, which meant the stars died the moment the intro finished.)
 *
 * Performance: only the bright tier pays for `shadowBlur`, and the loop
 * suspends entirely when the tab is hidden -- this runs for the whole
 * life of the page, so it has to be cheap.
 */
export function Starfield({ density = 420 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = {
      x: number; y: number; r: number; a: number;
      b: number; d: number; bright: boolean; spark: boolean;
    };
    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    function setup() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: density }, () => {
        const r = Math.random() * 2.0 + 0.25;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          a: Math.random() * 0.6 + 0.4,
          b: (Math.random() * 0.014 + 0.003) * (Math.random() < 0.5 ? -1 : 1),
          d: Math.random() * 0.5 + 0.18,
          bright: r > 1.35,
          spark: r > 1.8,
        };
      });
    }

    function frame() {
      if (!canvas || !ctx || !running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Dim tier -- no shadow, cheap
      ctx.shadowBlur = 0;
      for (const s of stars) {
        if (s.bright) continue;
        s.a += s.b;
        if (s.a > 1 || s.a < 0.28) s.b *= -1;
        if (!reduced) {
          s.y -= s.d;
          if (s.y < -2) s.y = h + 2;
        }
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright tier -- bloom, plus a four-point sparkle on the largest
      ctx.shadowColor = "rgba(255,255,255,0.95)";
      for (const s of stars) {
        if (!s.bright) continue;
        s.a += s.b;
        if (s.a > 1 || s.a < 0.4) s.b *= -1;
        if (!reduced) {
          s.y -= s.d;
          if (s.y < -2) s.y = h + 2;
        }
        ctx.shadowBlur = s.r * 6;
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.spark) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255,255,255,${s.a * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 3, s.y);
          ctx.lineTo(s.x + s.r * 3, s.y);
          ctx.moveTo(s.x, s.y - s.r * 3);
          ctx.lineTo(s.x, s.y + s.r * 3);
          ctx.stroke();
          ctx.shadowColor = "rgba(255,255,255,0.95)";
        }
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    }

    setup();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", setup);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

/**
 * The fixed atmospheric layer that sits with the starfield: soft white
 * hazes and a vignette. Kept alongside so the "living background" is a
 * single thing to mount.
 */
export function LivingBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Starfield />
      <div
        className="ambient-glow absolute -left-[14%] -top-[12%] h-[60vh] w-[60vw] rounded-full blur-[130px]"
        style={{ background: "rgba(255,255,255,0.10)", mixBlendMode: "screen" }}
      />
      <div
        className="ambient-glow absolute -bottom-[10%] -right-[14%] h-[54vh] w-[52vw] rounded-full blur-[130px]"
        style={{ background: "rgba(255,255,255,0.07)", mixBlendMode: "screen", animationDelay: "-7s" }}
      />
      <div
        className="ambient-glow absolute left-[32%] top-[34%] h-[46vh] w-[44vw] rounded-full blur-[130px]"
        style={{ background: "rgba(255,255,255,0.06)", mixBlendMode: "screen", animationDelay: "-12s" }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_240px_50px_rgba(0,0,0,0.92)]" />
    </div>
  );
}

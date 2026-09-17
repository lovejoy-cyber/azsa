"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ZimbabweBird } from "@/components/home/zimbabwe-bird";

/**
 * "Kinetic Sovereignty" opening.
 *
 * Faithful port of the supplied GSAP composition:
 *   1. "WELCOME TO" reveals character-by-character with elastic stagger
 *      (from: "random"), AZSA fades up behind a light sweep
 *   2. A shockwave disperses the colliding-bubble field and swaps the
 *      canvas to a starfield
 *   3. The AZSA monolith flies in from z:1500 with rotationX/Y
 *   4. It never settles -- letters keep breathing on an infinite yoyo,
 *      and react to the cursor with mass and depth
 *
 * Deviations from the original, and why:
 *   - Heritage art is rendered from local SVG rather than hotlinked from
 *     Wikimedia: external URLs fail silently offline and on deploy, and
 *     the coat of arms is a restricted state emblem. The Zimbabwe Bird
 *     and AZSA's own crest carry the same meaning and always load.
 *   - Letter sizing is clamped to the viewport so the monolith cannot
 *     overflow on narrow screens.
 */
export function KineticIntro({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLCanvasElement>(null);
  const transRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = mainRef.current;
    const tCanvas = transRef.current;
    if (!root || !canvas || !tCanvas) return;

    const ctx = canvas.getContext("2d");
    const tctx = tCanvas.getContext("2d");
    if (!ctx || !tctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let activeScene: "bubbles" | "stars" = "bubbles";
    let raf = 0;

    const PALETTE = ["#006400", "#FFD700", "#CE1126", "#FFFFFF"];

    type B = {
      id: number; r: number; x: number; y: number;
      vx: number; vy: number; z: number; color: string; mass: number;
    };
    type S = { x: number; y: number; s: number; v: number };
    let bubbles: B[] = [];
    let stars: S[] = [];

    function makeBubble(id: number): B {
      const r = Math.random() * 20 + 15;
      return {
        id, r,
        x: Math.random() * (width - r * 2) + r,
        y: Math.random() * (height - r * 2) + r,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        z: 1,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        mass: r,
      };
    }

    function sizeCanvases() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width; canvas!.height = height;
      tCanvas!.width = width; tCanvas!.height = height;
    }

    function init() {
      sizeCanvases();
      bubbles = Array.from({ length: 30 }, (_, i) => makeBubble(i));
      stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() * 2 + 0.5,
        v: Math.random() * 0.4 + 0.1,
      }));
    }

    function updateBubble(b: B) {
      b.x += b.vx; b.y += b.vy;
      if (b.x + b.r * b.z > width || b.x - b.r * b.z < 0) b.vx *= -1;
      if (b.y + b.r * b.z > height || b.y - b.r * b.z < 0) b.vy *= -1;
      for (const o of bubbles) {
        if (b.id === o.id) continue;
        const dx = o.x - b.x, dy = o.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < (b.r + o.r) * b.z) {
          const a = Math.atan2(dy, dx), s = Math.sin(a), c = Math.cos(a);
          const v1 = { x: b.vx * c + b.vy * s, y: b.vy * c - b.vx * s };
          const v2 = { x: o.vx * c + o.vy * s, y: o.vy * c - o.vx * s };
          const v1F = ((b.mass - o.mass) * v1.x + 2 * o.mass * v2.x) / (b.mass + o.mass);
          const v2F = ((o.mass - b.mass) * v2.x + 2 * b.mass * v1.x) / (b.mass + o.mass);
          b.vx = v1F * c - v1.y * s; b.vy = v1.y * c + v1F * s;
          o.vx = v2F * c - o.vy * s; o.vy = o.vy * c + v2F * s;
        }
      }
    }

    function drawBubble(b: B) {
      ctx!.save();
      ctx!.translate(b.x, b.y);
      ctx!.scale(b.z, b.z);
      const g = ctx!.createRadialGradient(-b.r * 0.3, -b.r * 0.3, 0, 0, 0, b.r);
      g.addColorStop(0, "#fff");
      g.addColorStop(0.3, b.color);
      g.addColorStop(1, "#000");
      ctx!.fillStyle = g;
      ctx!.globalAlpha = 0.7 / b.z;
      ctx!.beginPath(); ctx!.arc(0, 0, b.r, 0, Math.PI * 2); ctx!.fill();
      ctx!.restore();
    }

    function render() {
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = "black";
      ctx!.fillRect(0, 0, width, height);
      if (activeScene === "bubbles") {
        for (const b of bubbles) { updateBubble(b); drawBubble(b); }
      } else {
        ctx!.fillStyle = "white";
        for (const s of stars) {
          s.x -= s.v;
          if (s.x < 0) s.x = width;
          ctx!.beginPath(); ctx!.arc(s.x, s.y, s.s, 0, Math.PI * 2); ctx!.fill();
        }
      }
      raf = requestAnimationFrame(render);
    }

    init();
    render();
    window.addEventListener("resize", init);

    // ---- shockwave dispersal -------------------------------------
    function runPulse() {
      const shock = { r: 0 };
      gsap.to(shock, {
        r: Math.max(width, height) * 1.5,
        duration: 2.2,
        ease: "expo.out",
        onUpdate: () => {
          tctx!.clearRect(0, 0, width, height);
          const g = tctx!.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, shock.r);
          g.addColorStop(0, `rgba(255,255,255,${1 - shock.r / (width * 2)})`);
          g.addColorStop(0.5, "rgba(255,255,255,0.1)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          tctx!.fillStyle = g;
          tctx!.beginPath(); tctx!.arc(width / 2, height / 2, shock.r, 0, Math.PI * 2); tctx!.fill();
          if (activeScene === "bubbles") {
            for (const b of bubbles) {
              const dx = b.x - width / 2, dy = b.y - height / 2;
              if (Math.hypot(dx, dy) < shock.r) {
                b.z += 0.15; b.vx += dx * 0.04; b.vy += dy * 0.04;
              }
            }
          }
        },
      });
      window.setTimeout(() => {
        activeScene = "stars";
        const s1 = root!.querySelector<HTMLElement>("#scene-1");
        const s2 = root!.querySelector<HTMLElement>("#scene-2");
        if (s1) s1.style.display = "none";
        if (s2) s2.style.visibility = "visible";
        tctx!.clearRect(0, 0, width, height);
      }, 800);
    }

    const gctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".inner-char", {
        y: "0%", rotation: 0, scale: 1,
        stagger: { each: 0.05, from: "random" },
        duration: reduced ? 0.4 : 1.5,
        ease: reduced ? "power2.out" : "elastic.out(1, 0.5)",
      })
        .to("#welcome-kinetic", { opacity: 1, duration: 0.1 }, 0)
        .to("#azsa-init-kinetic", {
          opacity: 1, y: -10, duration: reduced ? 0.5 : 2,
          onStart: () => gsap.to("#sweep-p1", { left: "200%", duration: 2, ease: "power2.inOut" }),
        }, "-=1")
        .add(() => runPulse(), reduced ? "+=0.3" : "+=1.5")
        .from(".monolith-char", {
          scale: 1.5, z: 1500, rotationX: 180, rotationY: 45,
          opacity: 0, stagger: 0.1, duration: reduced ? 0.6 : 3, ease: "expo.out",
        }, "-=0.5")
        .to(".heritage-asset", { opacity: 0.1, duration: 3, stagger: 0.3 }, "-=2.5")
        .to("#final-reveal", { opacity: 1, y: -20, duration: 2 }, "-=1.5")
        .add(() => {
          if (reduced) return;
          gsap.to(".monolith-char", {
            y: "random(-20, 20)", scale: "random(0.98, 1.02)", rotationZ: "random(-5, 5)",
            duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
            stagger: { each: 0.3, from: "center" },
          });
          gsap.to(".heritage-asset", {
            y: "+=30", x: "+=20", rotation: "random(-2, 2)",
            duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        })
        .add(() => { onDone?.(); }, "+=1.6");
    }, root);

    function onMove(e: PointerEvent) {
      if (reduced) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(".monolith-char", {
        x: x * 160, y: y * 160, z: Math.abs(x * 300),
        rotateY: x * 80, rotateX: -y * 80,
        stagger: 0.02, duration: 1.2, ease: "power3.out",
      });
      gsap.to("#zim-bird", { x: x * 80, y: y * 80, duration: 3 });
      gsap.to("#zim-crest", { x: x * 60, y: y * 60, duration: 3.5 });
    }
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
      window.removeEventListener("pointermove", onMove);
      gctx.revert();
    };
  }, [onDone]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      <canvas ref={mainRef} className="pointer-events-none absolute inset-0 z-[1]" />
      <canvas
        ref={transRef}
        className="pointer-events-none absolute inset-0 z-[2000] mix-blend-screen"
      />

      <div className="cine-bar pointer-events-none fixed left-0 top-0 z-[100] h-[5vh] w-full border-b border-white/5 bg-black" />

      <div className="pointer-events-none relative z-10 flex h-screen w-full flex-col items-center justify-center px-4">
        {/* PHASE 1 */}
        <div id="scene-1" className="flex w-full flex-col items-center">
          <div
            id="welcome-kinetic"
            className="mb-8 flex flex-wrap justify-center text-[10px] font-thin uppercase tracking-[0.7em] opacity-0 sm:text-2xl sm:tracking-[1.1em] md:text-3xl"
          >
            {"WELCOME TO".split("").map((c, i) => (
              <span key={i} className="char-reveal">
                <span className="inner-char">{c === " " ? "\u00A0" : c}</span>
              </span>
            ))}
          </div>
          <div id="azsa-init-kinetic" className="relative overflow-hidden opacity-0">
            <h1 className="chrome-text text-5xl font-black tracking-tighter sm:text-7xl md:text-9xl">
              AZSA
            </h1>
            <div className="light-sweep" id="sweep-p1" />
          </div>
        </div>

        {/* PHASE 2 */}
        <div
          id="scene-2"
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ visibility: "hidden" }}
        >
          <div className="heritage-asset pointer-events-none absolute right-[4%] z-[5] h-[34vh] opacity-0 sm:h-[46vh]" id="zim-bird">
            <ZimbabweBird className="h-full w-auto opacity-70 grayscale" />
          </div>
          <div className="heritage-asset pointer-events-none absolute left-[4%] z-[5] h-[26vh] opacity-0 sm:h-[34vh]" id="zim-crest">
            <Image
              src="/images/azsa-logo.png"
              alt=""
              width={340}
              height={340}
              className="h-full w-auto object-contain opacity-80 grayscale"
            />
          </div>

          <div id="monolith-grid" className="flex w-full justify-center">
            {"AZSA".split("").map((c, i) => (
              <div key={i} className="monolith-letter">
                <span className="chrome-text monolith-char">{c}</span>
              </div>
            ))}
          </div>

          <div id="final-reveal" className="mt-14 flex flex-col items-center opacity-0 sm:mt-20">
            <div className="mb-8 h-[2px] w-56 rounded-full bg-gradient-to-r from-[#006400] via-[#FFD700] to-[#CE1126] shadow-[0_0_20px_rgba(255,215,0,0.3)] sm:w-64" />
            <p className="ml-[1.1em] text-center text-[8px] uppercase tracking-[1.1em] text-white/40 sm:text-[9px] sm:tracking-[1.8em]">
              Sovereign Chapter Algeria
            </p>
          </div>
        </div>
      </div>

      <div className="cine-bar pointer-events-none fixed bottom-0 left-0 z-[100] flex h-[5vh] w-full items-center justify-between border-t border-white/5 bg-black px-6 sm:px-10">
        <span className="text-[7px] uppercase tracking-[0.6em] text-white/10 sm:text-[8px] sm:tracking-[1em]">
          Zimbabwe Identity &times; Excellence
        </span>
      </div>
    </div>
  );
}

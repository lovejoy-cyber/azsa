"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Compass } from "lucide-react";
import gsap from "gsap";

// --- PROJECT IMPORTS ---
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { HeritageSection } from "@/components/home/heritage-section";
import { StudentLife } from "@/components/home/student-life";
import { CityMarquee } from "@/components/home/city-marquee";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState<"intro" | "monolith">("intro");

  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const transCanvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<any>({ mode: "bubbles", bubbles: [], stars: [], active: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mainCanvasRef.current) return;

    const canvas = mainCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const tCanvas = transCanvasRef.current;
    const tctx = tCanvas?.getContext("2d");
    if (!ctx || !tctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = tCanvas!.width = w;
    canvas.height = tCanvas!.height = h;

    const colors = ["#006400", "#FFD700", "#CE1126", "#FFFFFF"];

    class Bubble {
      x = Math.random() * w;
      y = Math.random() * h;
      r = Math.random() * 20 + 15;
      vx = (Math.random() - 0.5) * 3;
      vy = (Math.random() - 0.5) * 3;
      c = colors[Math.floor(Math.random() * colors.length)];
      z = 1;
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > w || this.x < 0) this.vx *= -1;
        if (this.y > h || this.y < 0) this.vy *= -1;
      }
      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.scale(this.z, this.z);
        let g = ctx!.createRadialGradient(-this.r * 0.3, -this.r * 0.3, 0, 0, 0, this.r);
        g.addColorStop(0, "#fff");
        g.addColorStop(0.4, this.c);
        g.addColorStop(1, "#000");
        ctx!.fillStyle = g;
        ctx!.globalAlpha = 0.6;
        ctx!.beginPath();
        ctx!.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    engine.current.bubbles = Array.from({ length: 28 }, () => new Bubble());
    engine.current.stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 1.5,
      v: Math.random() * 0.7,
    }));

    let animId: number;
    const render = () => {
      if (!engine.current.active) return;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      if (engine.current.mode === "bubbles") {
        engine.current.bubbles.forEach((b: any) => {
          b.update();
          b.draw();
        });
      } else {
        engine.current.stars.forEach((s: any) => {
          s.x -= s.v;
          if (s.x < 0) s.x = w;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      animId = requestAnimationFrame(render);
    };
    render();

    const tl = gsap.timeline();
    tl.to(".welcome-char", { y: 0, stagger: 0.05, duration: 1, ease: "power4.out", delay: 0.5 })
      .to("#intro-ui", { opacity: 1 }, 0)
      .add(() => {
        const shock = { r: 0 };
        gsap.to(shock, {
          r: Math.max(w, h) * 1.3,
          duration: 2.2,
          ease: "expo.out",
          onUpdate: () => {
            tctx.clearRect(0, 0, w, h);
            let g = tctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, shock.r);
            g.addColorStop(0, "rgba(255,255,255,0.8)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            tctx.fillStyle = g;
            tctx.beginPath();
            tctx.arc(w / 2, h / 2, shock.r, 0, Math.PI * 2);
            tctx.fill();
          },
          onComplete: () => {
            engine.current.mode = "stars";
            setScene("monolith");
            tctx.clearRect(0, 0, w, h);
          },
        });
      }, "+=2.2");

    const onMove = (e: MouseEvent) => {
      gsap.to(".monolith-char", {
        x: (e.clientX / w - 0.5) * 90,
        y: (e.clientY / h - 0.5) * 90,
        rotateY: (e.clientX / w - 0.5) * 45,
        rotateX: -(e.clientY / h - 0.5) * 45,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(animId);
      engine.current.active = false;
      window.removeEventListener("mousemove", onMove);
    };
  }, [mounted]);

  if (!mounted) return <div className="bg-black h-screen w-full" />;

  return (
    <main className="relative bg-black text-white min-h-screen overflow-x-hidden film-grain">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .chrome-text { 
            background: linear-gradient(180deg, #FFF 0%, #777 100%); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            font-family: 'Syncopate', sans-serif; 
            filter: drop-shadow(0 0 30px rgba(255,255,255,0.2));
        }

        @keyframes shine { 
            0% { background-position: -200% 0; } 
            100% { background-position: 200% 0; } 
        }

        .monolith-alive { 
            background: linear-gradient(90deg, #fff, #FFD700, #fff); 
            background-size: 200% auto; 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            animation: shine 5s linear infinite; 
        }
      `,
        }}
      />

      <canvas ref={mainCanvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
      <canvas ref={transCanvasRef} className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen" />

      {/* --- SCENE 1: CINEMATIC STARTUP INTRO --- */}
      {scene === "intro" && (
        <div id="intro-ui" className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-center px-6">
          <div className="flex text-xl md:text-5xl font-extralight tracking-[1.5em] mb-12 text-white">
            {"WELCOME TO".split("").map((c, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="welcome-char inline-block translate-y-full">{c === " " ? "\u00A0" : c}</span>
              </span>
            ))}
          </div>
          <h1 className="text-7xl md:text-[12rem] font-black chrome-text tracking-tighter">AZSA</h1>
        </div>
      )}

      {/* --- SCENE 2: REVEALED SOVEREIGN SITE --- */}
      <div className={cn("relative z-10 transition-opacity duration-1000", scene === "monolith" ? "opacity-100" : "opacity-0 pointer-events-none")}>
        {/* MONOLITH HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pb-24 pt-16">
          <div className="flex mb-4">
            {"AZSA".split("").map((c, i) => (
              <div key={i} style={{ perspective: "2000px" }}>
                <span
                  className="monolith-char inline-block text-[18vw] font-black monolith-alive mx-2 sm:mx-3"
                  style={{ fontFamily: "Syncopate, sans-serif" }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center pointer-events-auto max-w-xl px-4">
            <div className="h-[2px] w-64 bg-gradient-to-r from-emerald-500 via-gold-400 to-rose-600 rounded-full mb-6 shadow-[0_0_25px_rgba(255,215,0,0.6)]" />
            <p className="text-[11px] tracking-[1.6em] text-white/60 uppercase mb-8 font-mono">
              Sovereign Chapter Algeria 🇿🇼
            </p>

            {/* --- KINETIC ACTION BUTTONS --- */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/news">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-5 text-xs font-mono uppercase tracking-widest font-bold">
                  Official Dispatches
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="secondary" size="lg" className="rounded-full px-10 py-5 text-xs font-mono uppercase tracking-widest font-black shadow-[0_0_35px_rgba(255,215,0,0.5)]">
                  Community Feed <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* INTEGRATED PROJECT CONTENT */}
        <div className="bg-black/90 backdrop-blur-3xl border-t border-white/10 pb-40">
          {/* Dual Video Looping Heritage Section */}
          <HeritageSection />

          {/* Student Life Photo Gallery with 3D Zoom Physics */}
          <StudentLife />

          {/* City Marquee */}
          <CityMarquee />

          {/* Interactive Navigation Matrix (3D Spotlight Physics) */}
          <Container className="py-24">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <Link href="/about" className="block h-full group">
                  <SpotlightCard spotlightColor="rgba(255, 215, 0, 0.18)" className="p-10 border-white/10 hover:border-gold-500/40">
                    <div className="h-12 w-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                      The Heritage & Mission
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed mb-8">
                      The history, ideology, and academic foundation of Zimbabwean excellence across all 48 wilayas of Algeria.
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 group-hover:text-gold-300">
                      Explore Mission <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </SpotlightCard>
                </Link>

                <Link href="/contact" className="block h-full group">
                  <SpotlightCard spotlightColor="rgba(5, 150, 105, 0.18)" className="p-10 border-white/10 hover:border-emerald-500/40">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(5,150,105,0.2)]">
                      <Compass className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      Contact & Embassy Liaison
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed mb-8">
                      Official diplomatic support, embassy consular contacts in Algiers, student registry verification, and regional coordinators.
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300">
                      Get in Touch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </SpotlightCard>
                </Link>
              </div>
            </Reveal>
          </Container>

          {/* CINEMATIC MONOLITH CTA SECTION */}
          <section className="relative overflow-hidden border-t border-white/10 py-32 bg-gradient-to-b from-ink-950 via-black to-ink-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_60%)]" />
            <Container className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 mb-6 shadow-[0_0_25px_rgba(255,215,0,0.2)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Zimbabwean Student Alliance</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-8 max-w-3xl text-glow-white">
                The Community Is Already Here.
              </h2>
              <p className="text-white/60 max-w-xl text-base sm:text-lg mb-10 leading-relaxed">
                Connect with cohorts in your wilaya, discover accommodation vacancies, access embassy circulars, and elevate your academic journey.
              </p>
              <Link href="/signup" className="pointer-events-auto">
                <Button variant="secondary" size="xl" className="shadow-[0_0_40px_rgba(255,215,0,0.6)]">
                  Join Sovereign Registry
                </Button>
              </Link>
            </Container>
          </section>
        </div>
      </div>

      {/* CINEMATIC HUD */}
      <div className="fixed top-0 left-0 w-full h-[5vh] bg-black border-b border-white/5 z-[400] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[5vh] bg-black border-t border-white/5 z-[400] flex items-center justify-between px-10 pointer-events-none">
        <span className="text-[8px] font-mono tracking-[1em] text-white/30 uppercase">Unity • Freedom • Work</span>
        <span className="text-[8px] font-mono tracking-[1em] text-white/30 uppercase">DZ • ZW SOVEREIGNTY</span>
      </div>
    </main>
  );
}
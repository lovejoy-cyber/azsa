"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/home/reveal";
import { Sparkles, ArrowUpRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoTile {
  src: string;
  kicker: string;
  title: string;
  body: string;
  span: string;
  h: string;
}

const TILES: PhotoTile[] = [
  {
    src: "/images/traditional-dance.jpg",
    kicker: "Culture & Heritage",
    title: "Carnival & Traditional Dance",
    body: "Independence celebrations, street processions, traditional choreography, and the cultural heartbeat of Zimbabwe in Algeria.",
    span: "lg:col-span-7",
    h: "h-[340px] sm:h-[420px]",
  },
  {
    src: "/images/azsa-parade.jpg",
    kicker: "Solidarity",
    title: "Flying the Flag",
    body: "AZSA national colours, scarves, and unity at student assemblies and international academic conventions across Algeria.",
    span: "lg:col-span-5",
    h: "h-[340px] sm:h-[420px]",
  },
  {
    src: "/images/student-baking.jpg",
    kicker: "Student Enterprise",
    title: "Side Hustles & Trade",
    body: "Bakers, barbers, photographers, and coders funding their degrees and serving the diaspora with real skill.",
    span: "lg:col-span-4",
    h: "h-[300px] sm:h-[380px]",
  },
  {
    src: "/images/graduate-btech.jpg",
    kicker: "Academic Milestone",
    title: "The Finish Line",
    body: "Every convocation season, another cohort of Zimbabwean engineers, computer scientists, and doctors walks across the stage.",
    span: "lg:col-span-4",
    h: "h-[300px] sm:h-[380px]",
  },
  {
    src: "/images/football-team.jpg",
    kicker: "Sport & Brotherhood",
    title: "Weekend League",
    body: "Inter-city football matches, tournament derbies, and athletic brotherhood across Algiers, Oran, and Constantine.",
    span: "lg:col-span-4",
    h: "h-[300px] sm:h-[380px]",
  },
  {
    src: "/images/cultural-celebration.jpg",
    kicker: "Independence Gala",
    title: "Cultural Pride",
    body: "Traditional dress, national cuisine, and diaspora gatherings celebrating our heritage abroad.",
    span: "lg:col-span-6",
    h: "h-[320px] sm:h-[400px]",
  },
  {
    src: "/images/embassy-graduation.jpg",
    kicker: "Consular Recognition",
    title: "Embassy Honors in Algiers",
    body: "Zimbabwean Embassy officials commending graduating scholars at the central mission in Algiers.",
    span: "lg:col-span-6",
    h: "h-[320px] sm:h-[400px]",
  },
];

export function StudentLife() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* Ambient background bloom */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/4 h-[550px] w-[550px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, #FFD700, transparent 70%)" }}
        />
        <div
          className="absolute -right-40 bottom-1/4 h-[550px] w-[550px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, #059669, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 mb-4 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
            <Camera className="h-3.5 w-3.5" />
            <span>Living Community Chronicles</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
            Student Life, Actually Lived
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
            Culture, sport, academic milestones, and entrepreneurial journeys — captured by the scholars who lived them.
          </p>
        </div>

        {/* Gallery Grid with 3D Smooth Zoom Physics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {TILES.map((t, i) => (
            <div key={t.src} className={cn("group relative", t.span)}>
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-3xl border border-white/15 bg-ink-950/80 shadow-2xl backdrop-blur-xl transition-all duration-700",
                  "hover:border-gold-500/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,215,0,0.2)] hover:-translate-y-2",
                  t.h
                )}
              >
                {/* Image with Smooth Zoom-Out Hover Physics */}
                <Image
                  src={t.src}
                  alt={t.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] cubic-bezier(0.16,1,0.3,1) group-hover:scale-110"
                />

                {/* Specular Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                {/* Floating Glassmorphic Caption Frame */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-gold-300 backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      {t.kicker}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-gold-500 group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white transition-colors group-hover:text-gold-300">
                    {t.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/70 opacity-90 transition-all duration-300 group-hover:text-white group-hover:opacity-100 line-clamp-2 sm:line-clamp-3">
                    {t.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

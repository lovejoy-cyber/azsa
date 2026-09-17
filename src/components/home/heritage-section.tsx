"use client";

import React, { useRef, useState } from "react";
import { ZimbabweFlag } from "@/components/home/zimbabwe-flag";
import { AlgeriaFlag } from "@/components/home/algeria-flag";
import { Reveal } from "@/components/home/reveal";
import { ZimbabweBird } from "@/components/home/zimbabwe-bird";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeritageSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 mb-3 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Dual Heritage & Sovereignty</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Zimbabwe • Algeria
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">
            From the heart of Southern Africa to the Mediterranean shores of North Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoPanel
            video="/video/zimbabwe.mp4"
            label="Homeland Heritage"
            title="Zimbabwe"
            blurb="Where we are from — our identity, resilience, and sovereign roots."
            flag={<ZimbabweFlag className="w-full" />}
            glowTone="gold"
          />
          <VideoPanel
            video="/video/algeria.mp4"
            label="Host Nation"
            title="Algeria"
            blurb="Where we study, build, and excel across 48 historic wilayas."
            flag={<AlgeriaFlag className="w-full" />}
            glowTone="emerald"
          />
        </div>
      </div>
    </section>
  );
}

function VideoPanel({
  video,
  label,
  title,
  blurb,
  flag,
  glowTone = "gold",
}: {
  video: string;
  label: string;
  title: string;
  blurb: string;
  flag: React.ReactNode;
  glowTone: "gold" | "emerald";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    if (!videoRef.current) return;
    const nextMuted = !muted;
    videoRef.current.muted = nextMuted;
    setMuted(nextMuted);
  }

  const borderClass =
    glowTone === "gold"
      ? "border-gold-500/30 hover:border-gold-500/60 shadow-[0_0_30px_rgba(255,215,0,0.15)]"
      : "border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_30px_rgba(5,150,105,0.15)]";

  const glowBackground =
    glowTone === "gold"
      ? "from-gold-500/20 via-transparent to-transparent"
      : "from-emerald-500/20 via-transparent to-transparent";

  return (
    <div
      className={cn(
        "group relative min-h-[440px] sm:min-h-[520px] overflow-hidden rounded-3xl border bg-ink-950/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5",
        borderClass
      )}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Atmospheric Scrim Gradients */}
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-t via-black/40 to-transparent", glowBackground)} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Top Audio Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 border border-white/15 backdrop-blur-md transition-all hover:scale-110 hover:bg-gold-500 hover:text-black shadow-lg"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
        <div className="w-24 sm:w-28 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-105">
          {flag}
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
          {label}
        </p>

        <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
          {title}
        </h3>

        <p className="mt-3 max-w-sm text-sm sm:text-base leading-relaxed text-white/70">
          {blurb}
        </p>
      </div>
    </div>
  );
}

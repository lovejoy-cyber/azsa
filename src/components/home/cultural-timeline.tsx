"use client";

import { Reveal } from "@/components/home/reveal";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MILESTONES = [
  {
    year: "2021",
    title: "Initial Student Mutual-Aid",
    body: "Pioneering Zimbabwean scholars began sharing essential survival knowledge -- visa renewal paperwork, hospital access, and academic syllabi.",
    href: "/community",
    linkText: "View Community Feed",
  },
  {
    year: "2023",
    title: "Central Hub Established in Algiers",
    body: "Scholars across Algiers, Constantine, Annaba, and Oran establish coordinated regional networks with the main administrative campus anchored in Algiers.",
    href: "/cities",
    linkText: "Explore Cities Directory",
  },
  {
    year: "2025",
    title: "Embassy Consular Partnership",
    body: "The Zimbabwean Embassy Student Affairs Office in Algiers officially recognizes and interfaces with the student representation board.",
    href: "/contact",
    linkText: "Contact Embassy Desk",
  },
  {
    year: "2026",
    title: "AZSA Digital Sovereignty",
    body: "One unified digital ecosystem: official dispatches, verified events calendar, student discourse feed, and direct consular support.",
    href: "/signup",
    linkText: "Join Student Registry",
  },
];

export function CulturalTimeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/60 via-emerald-500/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        aria-hidden
      />
      <div className="flex flex-col gap-10">
        {MILESTONES.map((m, i) => (
          <Reveal
            key={m.year}
            className={`relative flex flex-col gap-4 pl-12 sm:flex-row sm:items-center sm:pl-0 ${
              i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
            }`}
          >
            {/* Timeline node */}
            <div className="absolute left-4 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold-400 bg-black shadow-[0_0_15px_rgba(255,215,0,0.5)] sm:left-1/2" />
            <div className="sm:w-1/2" />
            <Link
              href={m.href}
              className={`group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:w-1/2 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.06] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.15)] ${
                i % 2 === 1 ? "sm:mr-8" : "sm:ml-8"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-gold-400">
                  <Sparkles className="h-3 w-3" />
                  {m.year}
                </span>
                <ArrowUpRight className="h-4 w-4 text-gold-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{m.body}</p>
              <span className="mt-4 inline-block font-mono text-xs font-semibold text-gold-400/80 group-hover:text-gold-300 transition-colors">
                {m.linkText} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

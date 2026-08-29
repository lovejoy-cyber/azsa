"use client";

import { motion } from "motion/react";

const MILESTONES = [
  {
    year: "2021",
    title: "A WhatsApp group, before anything else",
    body: "A handful of students in Oran started sharing what they'd figured out the hard way -- visa paperwork, which clinics took new patients, where to actually find bedding.",
  },
  {
    year: "2023",
    title: "The community outgrows one city",
    body: "Students in Algiers, Constantine, and Annaba start their own threads. The same questions keep coming up in every one of them.",
  },
  {
    year: "2025",
    title: "The embassy asks a good question",
    body: "\"Why isn't there one place for this?\" There wasn't a good answer. AZSA starts as a plan on paper.",
  },
  {
    year: "2026",
    title: "AZSA goes live",
    body: "One platform: news, events, a real community feed, and a direct line to the embassy's student affairs office -- built by and for the students using it.",
  },
];

export function CulturalTimeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        aria-hidden
      />
      <div className="flex flex-col gap-10">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col gap-4 pl-12 sm:flex-row sm:items-center sm:pl-0 ${
              i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
            }`}
          >
            <div className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold-500 bg-ink-950 sm:left-1/2" />
            <div className="sm:w-1/2" />
            <div className={`sm:w-1/2 ${i % 2 === 1 ? "sm:pr-10" : "sm:pl-10"}`}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-600">{m.year}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{m.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Users, GraduationCap, MapPinned } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientDivider } from "@/components/layout/gradient-divider";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { AnimatedGreeting } from "@/components/home/animated-greeting";
import { StaggerHeadline } from "@/components/home/stagger-headline";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero({
  stats,
}: {
  stats: { students: number; universities: number; cities: number };
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Ambient glow -- two soft blurred blobs, slowly drifting. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="ambient-glow absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-gold-500), transparent 70%)" }}
        />
        <div
          className="ambient-glow absolute -bottom-56 -left-24 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-emerald-500), transparent 70%)", animationDelay: "-7s" }}
        />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-10 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <p className="font-display text-2xl italic text-gold-500 sm:text-3xl">
            <AnimatedGreeting />
          </p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.05}
            className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-platinum"
          >
            AZSA · Zimbabwean Students in Algeria
          </motion.p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            <StaggerHeadline text="Far from home, still within reach of each other." delay={0.15} />
          </h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
            className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/65"
          >
            AZSA is where Zimbabwean students across Algeria find each other, trade what
            they've learned the hard way, and hear from the embassy the moment it matters --
            in Oran, Algiers, Constantine, Annaba, and beyond.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.85}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Join AZSA <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:border-white/60 hover:text-white"
              >
                Browse the community
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.9}
          className="lg:col-span-5"
        >
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard icon={<Users className="h-4 w-4" />} value={stats.students} label="Students on AZSA" />
            <StatCard
              icon={<GraduationCap className="h-4 w-4" />}
              value={stats.universities}
              label="Universities"
            />
            <StatCard icon={<MapPinned className="h-4 w-4" />} value={stats.cities} label="Cities" />
          </dl>
          <p className="mt-3 text-right font-mono text-[11px] text-white/40">Live counts from the AZSA network</p>
        </motion.div>
      </Container>
      <GradientDivider tone="gold" />
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="glow-on-hover rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 hover:border-gold-500/40 hover:bg-white/[0.07]">
      <div className="flex items-center gap-1.5 text-gold-500">{icon}</div>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums">
        <AnimatedCounter value={value} />
      </p>
      <p className="mt-0.5 text-xs text-white/60">{label}</p>
    </div>
  );
}

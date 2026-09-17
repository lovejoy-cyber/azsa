"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Users, GraduationCap, MapPinned } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientDivider } from "@/components/layout/gradient-divider";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { MouseReactiveGlow } from "@/components/home/mouse-reactive-glow";
import { Magnetic } from "@/components/motion/magnetic";
import { TiltCard } from "@/components/ui/tilt-card";
import { ZimbabweBird } from "@/components/home/zimbabwe-bird";

/**
 * Hero. The cinematic branding from the pre-loader "docks" here: the same
 * flag-gradient wordmark, still breathing in 3D, now anchored left with a
 * tilting photograph alongside it. Nothing in this section is static.
 */
export function Hero({
  stats,
}: {
  stats: { students: number; universities: number; cities: number };
}) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background photograph */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/presidents-handshake.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="ken-burns object-cover object-[center_30%] opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55" />
      </div>

      {/* Flag-coloured light field */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <MouseReactiveGlow color="var(--zw-gold)" size={560} opacity={0.16} />
        <div
          className="ambient-glow absolute -left-24 top-0 h-[520px] w-[520px] rounded-full opacity-[0.30] blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--zw-green), transparent 70%)" }}
        />
        <div
          className="ambient-glow absolute -right-20 bottom-0 h-[480px] w-[480px] rounded-full opacity-[0.22] blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--zw-red), transparent 70%)", animationDelay: "-7s" }}
        />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* ---- Docked living branding ---- */}
        <div className="stage-3d lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="dock-breathe flag-halo inline-block"
          >
            <p className="metal-edge flag-text font-display text-[13vw] font-black leading-[0.84] tracking-tight sm:text-[7.5vw] lg:text-[5.6vw]">
              AZSA
            </p>
            <p className="metal-edge flag-text font-display text-[8vw] font-black leading-[0.9] tracking-tight sm:text-[4.6vw] lg:text-[3.4vw]">
              ALGERIA
            </p>
          </motion.div>

          <div className="mt-5 overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-lg italic text-[color:var(--zw-gold)] sm:text-2xl"
            >
              Far from home, still within reach of each other
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75"
          >
            AZSA is where Zimbabwean students across Algeria find each other, trade what
            they&rsquo;ve learned the hard way, and hear from the embassy the moment it matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic strength={0.4}>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="btn-sheen border-0 font-semibold text-black transition-all duration-500 hover:scale-105"
                  style={{
                    background: "linear-gradient(100deg, var(--zw-gold), #ffe98a, var(--zw-gold))",
                    boxShadow: "0 0 34px -6px rgba(253,209,22,0.75)",
                  }}
                >
                  Join AZSA <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Magnetic>
            <Magnetic strength={0.4}>
              <Link href="/community">
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-sheen border-white/35 text-white transition-all duration-500 hover:scale-105 hover:border-[color:var(--zw-green)] hover:text-[color:var(--zw-gold)]"
                >
                  Browse the community
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-3"
          >
            <StatCard icon={<Users className="h-4 w-4" />} value={stats.students} suffix="+" label="Students" tone="green" />
            <StatCard icon={<GraduationCap className="h-4 w-4" />} value={stats.universities} label="Universities" tone="gold" />
            <StatCard icon={<MapPinned className="h-4 w-4" />} value={stats.cities} label="Cities" tone="red" />
          </motion.dl>
        </div>

        {/* ---- Tilting photograph ---- */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: 16 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <TiltCard intensity={16} className="rounded-[var(--radius-lg)]">
            <FramedPhoto />
          </TiltCard>
        </motion.div>
      </Container>

      <GradientDivider tone="gold" />
    </section>
  );
}

/** Photograph in a flag-coloured frame whose border cycles through the palette. */
function FramedPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="group/ph relative overflow-hidden rounded-[var(--radius-lg)] p-[2px]"
      style={{
        background:
          "linear-gradient(130deg, var(--zw-green), var(--zw-gold), var(--zw-red), var(--zw-green))",
        backgroundSize: "260% 260%",
        animation: "flag-sweep 7s ease-in-out infinite",
      }}
    >
      <div className="relative h-[340px] overflow-hidden rounded-[calc(var(--radius-lg)-2px)] bg-black sm:h-[420px]">
        <Image
          src="/images/graduation-group.jpg"
          alt="Zimbabwean graduates with embassy officials in Algeria"
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-[center_35%] transition-transform duration-[1200ms] ease-out group-hover/ph:scale-[1.09]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

        <div className="pointer-events-none absolute right-4 top-4 h-16 w-auto opacity-45 transition-opacity duration-500 group-hover/ph:opacity-80">
          <ZimbabweBird className="h-full w-auto" />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--zw-gold)]">
            Graduation &middot; Algiers
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-white">
            Another cohort, home qualified
          </p>
        </figcaption>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  suffix,
  tone,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  tone: "green" | "gold" | "red";
}) {
  const color = {
    green: "var(--zw-green)",
    gold: "var(--zw-gold)",
    red: "var(--zw-red)",
  }[tone];

  return (
    <TiltCard intensity={13}>
      <div
        className="h-full rounded-[var(--radius-md)] border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-md transition-all duration-500"
        style={{ ["--tone" as string]: color }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 0 0 1px ${color}, 0 22px 50px -18px ${color}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <div style={{ color }}>{icon}</div>
        <p className="mt-1.5 font-display text-2xl font-bold sm:text-3xl" style={{ color }}>
          <AnimatedCounter value={value} suffix={suffix} />
        </p>
        <p className="mt-0.5 text-[11px] text-white/70">{label}</p>
      </div>
    </TiltCard>
  );
}

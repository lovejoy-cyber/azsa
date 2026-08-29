"use client";

import { motion } from "motion/react";
import { ZimbabweFlag } from "@/components/home/zimbabwe-flag";
import { AlgeriaFlag } from "@/components/home/algeria-flag";

export function HeritageSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <HalfPanel align="right">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[280px] sm:max-w-[360px]"
          >
            <ZimbabweFlag className="w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />
          </motion.div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-platinum">Home</p>
          <h3 className="mt-1 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Zimbabwe
          </h3>
        </HalfPanel>

        <HalfPanel align="left">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[280px] sm:max-w-[360px]"
          >
            <AlgeriaFlag className="w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />
          </motion.div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-platinum">Host</p>
          <h3 className="mt-1 font-display text-3xl font-semibold text-offwhite sm:text-4xl">
            Algeria
          </h3>
        </HalfPanel>
      </div>

      {/* Centre seam -- a vertical gold hairline joining the two halves */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent md:block" />

      <div className="relative border-t border-white/10 py-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl italic font-semibold text-gold-500 sm:text-4xl"
        >
          Unity &middot; Freedom &middot; Work
        </motion.p>
        <p className="mx-auto mt-3 max-w-md text-sm text-platinum">
          Zimbabwe's national motto -- and the three things this platform is actually for.
        </p>
      </div>
    </section>
  );
}

function HalfPanel({ children, align }: { children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div
      className={`flex flex-col items-center px-8 py-16 text-center sm:py-20 ${
        align === "right" ? "md:items-end md:pr-16 md:text-right" : "md:items-start md:pl-16 md:text-left"
      }`}
    >
      {children}
    </div>
  );
}

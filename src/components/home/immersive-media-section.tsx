"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * A full-bleed cinematic section built to hold a background video.
 *
 * No video is wired in yet -- there is no durable, licensed video URL to
 * point at without you supplying one (stock sites don't offer permanent
 * hotlink URLs, and hotlinking their preview clips would break or violate
 * terms). Drop a licensed .mp4 into /public/video/ and set `src` below;
 * everything else -- the gradient scrim, the poster fallback, the
 * text-legibility treatment -- is already built and will "just work".
 */
export function ImmersiveMediaSection({
  src,
  poster,
  eyebrow,
  title,
  body,
}: {
  src?: string;
  poster?: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-ink-950">
      {src && !videoFailed ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onError={() => setVideoFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <PlaceholderScene />
      )}

      {/* Legibility scrim -- kept regardless of whether a real video is present */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <div className="relative flex h-full items-end">
        <div className="max-w-2xl px-5 pb-16 sm:px-8 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-gold-500"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-3 font-display text-3xl font-semibold text-offwhite sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-3 text-[15px] leading-relaxed text-platinum"
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/** Animated placeholder scene -- drifting gradient shapes, standing in for real footage. */
function PlaceholderScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="ambient-glow absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full opacity-[0.14] blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--color-gold-500), transparent 70%)" }}
      />
      <div
        className="ambient-glow absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--color-emerald-500), transparent 70%)", animationDelay: "-6s" }}
      />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, var(--color-offwhite) 0, var(--color-offwhite) 1px, transparent 1px, transparent 32px)",
      }} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Starfield } from "@/components/home/starfield";
import { ZimbabweBird } from "@/components/home/zimbabwe-bird";

type Stage = "welcome" | "reveal" | "living";

/**
 * Studio-title pre-loader in three beats:
 *
 *   welcome  0.0-3.2s  tracked-out subtitle over a drifting starfield
 *   reveal   3.2-6.4s  "AZSA" blooms in from blur at scale, metallic
 *   living   6.4s+     settles, breathes, flag rule and tagline land
 *
 * Skippable throughout -- students open this to check a deadline, and a
 * seven-second gate they cannot pass becomes the thing they remember.
 */
export function WelcomeIntro() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("welcome");
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(calm);
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setStage("reveal"), calm ? 1200 : 3200);
    const t2 = setTimeout(() => setStage("living"), calm ? 2000 : 6400);
    const t3 = setTimeout(() => setVisible(false), calm ? 4000 : 9200);

    const dismiss = () => setVisible(false);
    window.addEventListener("keydown", dismiss);

    // Replay hook: `azsaReplayIntro()` in the console, or dispatch
    // `azsa:replay-intro`. Lets the sequence be reviewed without a reload.
    const replay = () => {
      setStage("welcome");
      setVisible(true);
    };
    window.addEventListener("azsa:replay-intro", replay);
    (window as unknown as { azsaReplayIntro?: () => void }).azsaReplayIntro = replay;

    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("azsa:replay-intro", replay);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="studio"
          className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-black"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <Starfield />

          {/* Flag-colour nebulae */}
          <div
            className="nebula ambient-glow -left-[16%] -top-[16%] h-[66vh] w-[58vw] opacity-[0.15]"
            style={{ background: "var(--zw-green)" }}
            aria-hidden
          />
          <div
            className="nebula ambient-glow -bottom-[18%] -right-[18%] h-[62vh] w-[58vw] opacity-[0.09]"
            style={{ background: "var(--zw-red)", animationDelay: "-6s" }}
            aria-hidden
          />
          <div
            className="nebula ambient-glow left-[30%] top-[30%] h-[52vh] w-[48vw] opacity-[0.11]"
            style={{ background: "var(--zw-gold)", animationDelay: "-11s" }}
            aria-hidden
          />

          {/* Bird, deep in the frame */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[66vh] w-auto -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: stage === "welcome" ? 0.05 : 0.11, scale: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <ZimbabweBird className="h-full w-auto" />
          </motion.div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              {stage === "welcome" && (
                <motion.div
                  key="welcome"
                  exit={{ opacity: 0, scale: 1.25, filter: "blur(22px)" }}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <motion.h2
                    initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(8px)" }}
                    animate={{ opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-[94vw] whitespace-nowrap text-[11px] font-normal uppercase text-white sm:text-xl"
                    style={{
                      fontFamily: "var(--font-studio)",
                      textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 0 50px rgba(0,0,0,0.8)",
                    }}
                  >
                    Association of Zimbabwean Students
                  </motion.h2>
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto mt-7 h-px w-64 bg-gradient-to-r from-transparent via-[color:var(--zw-gold)] to-transparent"
                  />
                </motion.div>
              )}

              {(stage === "reveal" || stage === "living") && (
                <motion.div
                  key="azsa"
                  initial={{ opacity: 0, scale: 0.55, filter: "blur(34px)" }}
                  animate={{
                    opacity: 1,
                    scale: stage === "living" ? 1 : 1.14,
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 2.6, ease: [0.2, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={stage === "living" ? { y: [0, -16, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="metal-bloom"
                  >
                    <span
                      className="metallic-shine block"
                      data-text="AZSA"
                    >
                      <span
                        className="metallic block text-[22vw] font-bold leading-none sm:text-[15vw]"
                        style={{ fontFamily: "var(--font-studio)" }}
                      >
                        AZSA
                      </span>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="mt-6 flex flex-col items-center"
                  >
                    <p
                      className="text-[10px] font-light uppercase tracking-[0.7em] text-[color:var(--zw-gold)] sm:text-base sm:tracking-[1em]"
                      style={{ fontFamily: "var(--font-studio)" }}
                    >
                      Algeria&nbsp;chapter
                    </p>

                    <div className="mt-9 flex h-1.5 w-64 overflow-hidden rounded-full border border-white/15 shadow-2xl sm:w-80">
                      <div className="flex-1" style={{ background: "var(--zw-green)" }} />
                      <div className="flex-1" style={{ background: "var(--zw-gold)" }} />
                      <div className="flex-1" style={{ background: "var(--zw-red)" }} />
                      <div className="flex-1 bg-black" />
                    </div>

                    <p className="mt-8 text-[11px] font-light italic tracking-[0.22em] text-white/45 sm:text-sm">
                      &ldquo;Far from home, still within reach of each other&rdquo;
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip */}
          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 px-6 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 transition-all duration-300 hover:scale-105 hover:border-[color:var(--zw-gold)] hover:text-[color:var(--zw-gold)]"
          >
            Skip
          </motion.button>

          {/* Letterboxing + vignette */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-black to-transparent" />
          <div className="vignette pointer-events-none absolute inset-0 z-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

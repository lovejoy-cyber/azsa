"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const GREETINGS = ["Welcome.", "Murakaza.", "Bienvenue.", "Mauya."];

export function AnimatedGreeting({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = GREETINGS[index];

    if (phase === "typing") {
      if (typed.length < current.length) {
        const t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), 1400);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 200);
      return () => clearTimeout(t);
    }

    // erasing
    if (typed.length > 0) {
      const t = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    setIndex((i) => (i + 1) % GREETINGS.length);
    setPhase("typing");
  }, [typed, phase, index]);

  return (
    <span className={className}>
      {typed}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block w-[2px] bg-current align-middle"
        style={{ height: "0.85em" }}
      />
    </span>
  );
}

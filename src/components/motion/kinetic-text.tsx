"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "word" | "character";
}

export function KineticText({
  text,
  className = "",
  delay = 0,
  type = "word",
}: KineticTextProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === "word" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: 40,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 24,
      },
    },
  };

  const tokens = type === "word" ? text.split(" ") : text.split("");

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("inline-flex flex-wrap items-baseline gap-x-[0.25em]", className)}
      style={{ perspective: 1000 }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block transform-gpu"
        >
          {token === " " ? "\u00A0" : token}
        </motion.span>
      ))}
    </motion.span>
  );
}

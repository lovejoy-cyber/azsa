"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "beam" | "emerald";
type Size = "sm" | "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-950 text-gold-400 border border-gold-500/40 shadow-[0_0_20px_-3px_rgba(255,215,0,0.25)] hover:border-gold-500 hover:text-gold-300 hover:shadow-[0_0_30px_0px_rgba(255,215,0,0.5)] active:bg-ink-800 disabled:opacity-40 disabled:shadow-none",
  secondary:
    "relative overflow-hidden bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold hover:from-gold-300 hover:to-gold-400 hover:shadow-[0_0_35px_rgba(255,215,0,0.6)] active:scale-[0.98] disabled:bg-gold-500/40 disabled:shadow-none",
  beam:
    "relative overflow-hidden bg-ink-950 text-white border border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:border-gold-500/60 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
  emerald:
    "relative overflow-hidden bg-gradient-to-b from-emerald-600 to-emerald-700 text-white font-semibold hover:from-emerald-500 hover:to-emerald-600 hover:shadow-[0_0_35px_rgba(5,150,105,0.6)] active:scale-[0.98]",
  outline:
    "border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-md",
  ghost: "text-white/80 hover:text-white hover:bg-white/10 bg-transparent",
  danger: "bg-gradient-to-b from-rose-600 to-red-700 text-white hover:from-rose-500 hover:to-red-600 hover:shadow-[0_0_30px_rgba(225,29,72,0.5)]",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3.5 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-7 py-3.5 gap-2.5 rounded-2xl font-semibold",
  xl: "text-base px-9 py-4 gap-3 rounded-full font-bold tracking-wider uppercase text-xs",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  shimmer?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      shimmer = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        whileHover={{ scale: 1.025, y: -1.5 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        ref={ref as any}
        disabled={disabled || loading}
        className={cn(
          "group inline-flex items-center justify-center font-medium transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {/* Animated Light Sweep / Shimmer */}
        {shimmer && (variant === "primary" || variant === "secondary" || variant === "beam" || variant === "emerald") && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        )}

        {loading && (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";

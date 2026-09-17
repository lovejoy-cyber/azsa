import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "ink" | "gold" | "brick" | "neutral" | "info" | "emerald" | "ruby" | "gold-glow" | "emerald-glow";

const tones: Record<Tone, string> = {
  ink: "bg-white/10 text-white border border-white/15 backdrop-blur-md",
  gold: "bg-gold-500/15 text-gold-400 border border-gold-500/30 backdrop-blur-md",
  "gold-glow": "bg-gold-500/20 text-gold-300 border border-gold-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] backdrop-blur-md",
  emerald: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 backdrop-blur-md",
  "emerald-glow": "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(5,150,105,0.3)] backdrop-blur-md",
  ruby: "bg-rose-500/15 text-rose-400 border border-rose-500/30 backdrop-blur-md",
  brick: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
  neutral: "bg-white/5 text-white/70 border border-white/10 backdrop-blur-sm",
  info: "bg-sky-500/15 text-sky-400 border border-sky-500/30 backdrop-blur-sm",
};

export function Badge({
  tone = "neutral",
  className,
  dot = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

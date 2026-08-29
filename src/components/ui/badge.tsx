import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "jade" | "gold" | "brick" | "neutral" | "info";

const tones: Record<Tone, string> = {
  jade: "bg-jade-100 text-jade-800",
  gold: "bg-gold-100 text-gold-700",
  brick: "bg-brick-100 text-brick-600",
  neutral: "bg-surface-sunken text-ink-soft",
  info: "bg-[color-mix(in_srgb,var(--color-info)_14%,white)] text-info",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-xs)] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

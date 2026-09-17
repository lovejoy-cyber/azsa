"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/reveal";

/**
 * A photograph that behaves like film rather than a static rectangle:
 * a slow Ken Burns drift, and a wipe-in on first sight.
 *
 * Both effects are CSS-driven and the image is visible by default -- an
 * earlier version used motion's initial={{clipPath:"inset(0 0 100% 0)"}},
 * which hid the photo completely if the animation never ran.
 */
export function LivingPhoto({
  src,
  alt,
  className = "",
  priority = false,
  kenBurns = true,
  overlay = true,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  kenBurns?: boolean;
  overlay?: boolean;
  sizes?: string;
}) {
  return (
    <Reveal variant="wipe" className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", kenBurns && "ken-burns")}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
      )}
    </Reveal>
  );
}

/**
 * A photo card that pops, brightens, and reveals its caption on hover.
 * Hover states are pure CSS, so they work regardless of hydration.
 */
export function PhotoCard({
  src,
  alt,
  caption,
  meta,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  meta?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] bg-ink-900",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:scale-[1.03]",
        "shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)]",
        "hover:shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_28px_70px_-18px_rgba(212,175,55,0.45)]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-[center_28%] transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        {meta && (
          <p className="translate-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-500 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {meta}
          </p>
        )}
        <p className="mt-1 font-display text-lg font-semibold text-offwhite drop-shadow-lg">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

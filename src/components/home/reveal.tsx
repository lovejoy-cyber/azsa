"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal that CANNOT hide content permanently.
 *
 * The element is visible by default in CSS. Only after this component
 * mounts (proving JS runs) does it add `.js-reveal-ready` to <html>,
 * which opts the page into the hidden-then-animate behaviour. If JS never
 * runs, or the IntersectionObserver fails, everything simply stays
 * visible -- no blank sections.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  variant = "rise",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "rise" | "wipe";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js-reveal-ready");
    const el = ref.current;
    if (!el) return;

    // Safety net: if the observer somehow never fires, force-show.
    const failsafe = setTimeout(() => el.classList.add("is-visible"), 2500);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", variant === "wipe" && "reveal-wipe", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

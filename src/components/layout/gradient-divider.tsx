import { cn } from "@/lib/utils";

/**
 * A clean gradient hairline used as a section boundary. An earlier version
 * of this used a "coursed stone" block pattern referencing Great Zimbabwe's
 * dry-stone architecture -- a nice idea on paper, but it rendered as a
 * messy, glitchy-looking strip in practice. Replaced with something simple,
 * which is what actually reads as premium.
 */
export function GradientDivider({
  tone = "gold",
  className,
}: {
  tone?: "gold" | "border";
  className?: string;
}) {
  const color = tone === "gold" ? "var(--color-gold-500)" : "var(--color-border-strong)";

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("gradient-hairline w-full", className)}
      style={{ ["--hairline-color" as string]: color }}
    />
  );
}

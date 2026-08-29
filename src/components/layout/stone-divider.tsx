import { cn } from "@/lib/utils";

/**
 * AZSA's signature motif: a row of stacked, unevenly-sized rectangular
 * blocks, abstracted from Great Zimbabwe's coursed dry-stone walling --
 * the architecture the country takes its name from ("houses of stone").
 *
 * Used deliberately and sparingly as a section boundary, in place of a
 * plain hairline rule -- never as decorative wallpaper.
 */
export function StoneDivider({
  tone = "border",
  className,
}: {
  tone?: "border" | "gold" | "surface";
  className?: string;
}) {
  const color =
    tone === "gold"
      ? "var(--color-gold-500)"
      : tone === "surface"
        ? "var(--color-surface)"
        : "var(--color-border-strong)";

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("stone-coursing w-full", className)}
      style={{ ["--stone-color" as string]: color }}
    />
  );
}

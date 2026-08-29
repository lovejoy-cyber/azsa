/**
 * A restrained accent stripe in Zimbabwe's national colours -- green, gold,
 * red, black -- used once or twice as a divider, not as wallpaper. This is a
 * colour echo, not a literal flag reproduction (no triangle/star/bird
 * detailing), so it reads as a deliberate design accent rather than clip art.
 */
export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-[3px] w-full ${className}`} role="presentation" aria-hidden="true">
      <span className="flex-1" style={{ background: "#0f6e4c" }} />
      <span className="flex-1" style={{ background: "#d19f16" }} />
      <span className="flex-1" style={{ background: "#b3282e" }} />
      <span className="flex-1" style={{ background: "#111111" }} />
      <span className="flex-1" style={{ background: "#b3282e" }} />
      <span className="flex-1" style={{ background: "#d19f16" }} />
      <span className="flex-1" style={{ background: "#0f6e4c" }} />
    </div>
  );
}

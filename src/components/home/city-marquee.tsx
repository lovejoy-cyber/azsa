export function CityMarquee() {
  const items = [
    "ORAN", "ALGIERS", "CONSTANTINE", "ANNABA", "BLIDA", "TLEMCEN",
    "SÉTIF", "BATNA", "BÉJAÏA", "TIZI OUZOU", "SIDI BEL ABBÈS",
    "MOSTAGANEM", "BISKRA", "OUARGLA", "TIARET", "BOUMERDÈS",
  ];
  const line = items.join("  \u00B7  ") + "  \u00B7  ";

  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink-950 py-6" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <span
            key={rep}
            className="whitespace-nowrap pr-8 font-display text-4xl font-semibold text-white/15 sm:text-5xl"
          >
            {line.repeat(2)}
          </span>
        ))}
      </div>
    </div>
  );
}

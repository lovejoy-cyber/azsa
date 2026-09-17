import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { eventImage } from "@/lib/event-images";

export function EventCard({
  title,
  slug,
  startAt,
  location,
  cityName,
  category,
}: {
  title: string;
  slug: string;
  startAt: Date | string;
  location?: string | null;
  cityName?: string | null;
  category: string;
}) {
  const date = new Date(startAt);
  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

  return (
    <Link
      href={`/events/${slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-2 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/40 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,215,0,0.15)]"
    >
      {/* Visual Header Frame */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl">
        <Image
          src={eventImage(category)}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        {/* Holographic Date Chip */}
        <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-ink-950/85 font-mono backdrop-blur-md ring-1 ring-gold-500/40 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
          <span className="text-xl font-black leading-none text-gold-400 text-glow-gold">{day}</span>
          <span className="mt-1 text-[11px] font-bold tracking-wider text-white/80">{month}</span>
        </div>

        {/* Category Badge */}
        <Badge tone="gold-glow" dot className="absolute right-4 top-4">
          {category}
        </Badge>

        {/* Interactive Kinetic Arrow */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Card Meta Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-gold-400">
          {title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-white/60">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 border border-white/5">
            <CalendarDays className="h-3.5 w-3.5 text-gold-400" />
            {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {(location || cityName) && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 border border-white/5">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              {location || cityName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

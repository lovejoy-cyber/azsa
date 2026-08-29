import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      className="group flex gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-gold-500/50"
    >
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-[var(--radius-sm)] bg-gold-50 font-mono">
        <span className="text-lg font-bold leading-none text-ink-800">{day}</span>
        <span className="mt-0.5 text-[10px] font-semibold tracking-wide text-gold-600">{month}</span>
      </div>
      <div className="min-w-0">
        <Badge tone="gold" className="mb-1.5">{category}</Badge>
        <h3 className="truncate font-display text-base font-semibold text-ink group-hover:text-gold-700">
          {title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {(location || cityName) && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location || cityName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

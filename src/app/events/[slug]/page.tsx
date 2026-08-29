import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { RegisterButton } from "@/components/events/register-button";
import { getEventBySlug } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const start = new Date(event.startAt);

  return (
    <div className="py-12">
      <Container className="max-w-2xl">
        <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 hover:text-ink-800">
          <ArrowLeft className="h-3.5 w-3.5" /> All events
        </Link>

        <Badge tone="gold" className="mt-6">{event.category}</Badge>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {event.title}
        </h1>

        <div className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold-600" />
            {formatDate(start, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} ·{" "}
            {start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {(event.location || event.cityName) && (
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-600" />
              {event.location}
              {event.location && event.cityName ? `, ${event.cityName}` : event.cityName}
            </span>
          )}
          {event.organizerName && (
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-gold-600" />
              Organised by {event.organizerName}
            </span>
          )}
        </div>

        <p className="mt-6 whitespace-pre-line text-[17px] leading-relaxed text-ink">
          {event.description}
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <RegisterButton
            eventSlug={event.slug}
            capacity={event.capacity}
            initialRegistrationCount={event.registrationCount}
          />
        </div>
      </Container>
    </div>
  );
}

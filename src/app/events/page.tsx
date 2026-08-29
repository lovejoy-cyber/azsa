import { Container } from "@/components/ui/container";
import { EventCard } from "@/components/events/event-card";
import { getUpcomingEvents } from "@/lib/db/queries";

export const metadata = { title: "Events" };

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Events</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Upcoming AZSA events
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        {events.length > 0 ? (
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <EventCard
                key={e.id}
                title={e.title}
                slug={e.slug}
                startAt={e.startAt}
                location={e.location}
                cityName={e.cityName}
                category={e.category}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No upcoming events right now.</p>
        )}
      </Container>
    </div>
  );
}

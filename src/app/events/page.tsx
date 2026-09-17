import { Container } from "@/components/ui/container";
import { EventCard } from "@/components/events/event-card";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { getUpcomingEvents } from "@/lib/db/queries";
import { Calendar, Sparkles } from "lucide-react";

export const metadata = { title: "Upcoming Events — AZSA" };

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="National Gatherings & Forums 🇿🇼"
        title="Official AZSA Events Calendar"
        description="Academic symposia, cultural galas, embassy briefings, and inter-city student tournaments across all Algerian Wilayas."
        tone="gold"
        stats={[
          { label: "Scheduled Events", value: `${events.length || "0"}` },
          { label: "Participating Cities", value: "8+" },
          { label: "Community Registration", value: "Open" },
        ]}
      />

      <Container className="py-20 max-w-6xl">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Upcoming Events Scheduled</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Check back shortly or register with your city chapter representative to get notified when new gatherings are announced.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

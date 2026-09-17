import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { getStories } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";
import { BookOpen, User, Calendar, Quote } from "lucide-react";

export const metadata = { title: "Student Stories & Living History — AZSA" };

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Voices & Oral History 🎙️"
        title="Student Journeys & Narratives"
        description="Authentic firsthand experiences, arrival memories, challenges, and triumphs of Zimbabwean students living and studying across Algeria."
        tone="gold"
        stats={[
          { label: "Documented Stories", value: `${stories.length || "0"}` },
          { label: "Storytellers", value: "Students & Alumni" },
          { label: "Heritage Preservation", value: "Active" },
        ]}
      />

      <Container className="py-20 max-w-4xl">
        {stories.length > 0 ? (
          <div className="flex flex-col gap-8">
            {stories.map((s) => (
              <SpotlightCard
                key={s.id}
                spotlightColor="rgba(255, 215, 0, 0.15)"
                className="border-white/10 p-8"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-white">By {s.authorName}</p>
                      {s.publishedAt && (
                        <p className="font-mono text-xs text-white/40">{formatDate(s.publishedAt)}</p>
                      )}
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-gold-500/20" />
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-4">{s.title}</h2>
                <p className="text-base leading-relaxed text-white/75 whitespace-pre-line">{s.content}</p>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Stories Published Yet</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Student chronicles and arrival memories will appear here once published.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

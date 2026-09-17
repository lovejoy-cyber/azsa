import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Pin, BellRing, Sparkles } from "lucide-react";
import { getAnnouncements } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Official Announcements — AZSA & Embassy" };

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Official Diplomatic & Board Bulletins 📢"
        title="Official AZSA Announcements"
        description="Urgent student notices, embassy consular bulletins, visa renewal deadlines, and academic directives."
        tone="ruby"
        stats={[
          { label: "Active Notices", value: `${announcements.length || "0"}` },
          { label: "Direct Broadcast", value: "Verified" },
          { label: "Priority Level", value: "High" },
        ]}
      />

      <Container className="py-20 max-w-4xl">
        {announcements.length > 0 ? (
          <div className="flex flex-col gap-6">
            {announcements.map((a) => (
              <SpotlightCard
                key={a.id}
                spotlightColor="rgba(225, 29, 72, 0.16)"
                className="border-white/10 p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-rose-400">
                        <Pin className="h-3.5 w-3.5 fill-current" /> Pinned
                      </span>
                    )}
                    <Badge tone={a.pinned ? "ruby" : "neutral"} dot={a.pinned ?? false}>
                      {a.audience}
                    </Badge>
                  </div>
                  <time className="font-mono text-xs text-white/50">{formatDate(a.publishedAt)}</time>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">{a.title}</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/75">{a.content}</p>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <BellRing className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Active Bulletins</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Urgent announcements and circulars will be broadcast here.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { getOpportunities } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";
import { Briefcase, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata = { title: "Opportunities, Grants & Scholarships — AZSA" };

const TYPE_TONE = {
  scholarship: "gold-glow",
  internship: "emerald-glow",
  job: "info",
  volunteer: "neutral",
  grant: "gold-glow",
} as const;

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Scholarships, Grants & Careers 💼"
        title="Career & Funding Opportunities"
        description="Curated listings of post-graduate fellowships, international internships, engineering placements, and research grants."
        tone="emerald"
        stats={[
          { label: "Active Openings", value: `${opportunities.length || "8+"}` },
          { label: "Partner Programs", value: "Verified" },
          { label: "Eligibility", value: "All Cohorts" },
        ]}
      />

      <Container className="py-20 max-w-5xl">
        {opportunities.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {opportunities.map((o) => (
              <SpotlightCard
                key={o.id}
                spotlightColor="rgba(5, 150, 105, 0.18)"
                className="flex flex-col justify-between border-white/10 hover:border-emerald-500/40 p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge tone={(TYPE_TONE as any)[o.type] ?? "neutral"} dot>
                      {o.type}
                    </Badge>
                    {o.deadline && (
                      <div className="flex items-center gap-1.5 font-mono text-xs text-rose-400">
                        <Calendar className="h-3 w-3" />
                        <span>Deadline: {formatDate(o.deadline)}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {o.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">{o.description}</p>
                </div>

                {o.link && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <a
                      href={o.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors"
                    >
                      <span>Apply / View Terms</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Open Opportunities Right Now</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              New grants, internships, and scholarships will appear here as soon as they open for applications.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

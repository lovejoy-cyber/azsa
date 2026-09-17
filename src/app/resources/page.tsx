import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { getResources } from "@/lib/db/queries";
import { BookOpen, FileText, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Student Resources & Practical Guides — AZSA" };

const CATEGORY_LABELS: Record<string, string> = {
  visa: "Visa & Residence Permit",
  housing: "Accommodation & Wilaya Housing",
  healthcare: "Medical & Insurance",
  academic: "Faculty & Curriculum",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Practical Knowledge Base 📚"
        title="Student Survival & Growth Guides"
        description="Vetted step-by-step documentation on renewing residence permits, student dormitories, banking, and academic success in Algeria."
        tone="gold"
        stats={[
          { label: "Guides Available", value: `${resources.length || "15+"}` },
          { label: "Vetting Authority", value: "Senior Cohorts" },
          { label: "Updates", value: "Current Semester" },
        ]}
      />

      <Container className="py-20 max-w-5xl">
        {resources.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {resources.map((r) => (
              <SpotlightCard
                key={r.id}
                spotlightColor="rgba(255, 215, 0, 0.15)"
                className="flex flex-col justify-between border-white/10 hover:border-gold-500/40 p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge tone="gold-glow">
                      {CATEGORY_LABELS[r.category] ?? r.category}
                    </Badge>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">{r.description}</p>
                </div>

                {r.link && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-2 text-xs font-mono font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider transition-colors"
                    >
                      <span>Read Documentation</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Guides Published Yet</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Student resource articles will appear here once published.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

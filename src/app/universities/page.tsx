import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { getUniversities } from "@/lib/db/queries";
import { GraduationCap, Globe, MapPin, Users, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Universities Directory — AZSA" };

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Academic Institutions 🎓"
        title="Algerian Universities Directory"
        description="Comprehensive index of faculties, polytechnics, medical institutes, and architectural schools hosting Zimbabwean scholars."
        tone="gold"
        stats={[
          { label: "Partner Universities", value: `${universities.length || "12"}` },
          { label: "Faculty Disciplines", value: "30+" },
          { label: "Academic Support", value: "Verified" },
        ]}
      />

      <Container className="py-20 max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2">
          {universities.map((u) => (
            <SpotlightCard
              key={u.id}
              spotlightColor="rgba(255, 215, 0, 0.16)"
              className="border-white/10 hover:border-gold-500/40"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {u.shortName || u.name}
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-white/50">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      <span>{u.cityName}</span>
                    </div>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 font-mono text-xs font-bold text-gold-400">
                  {u.studentCount} Scholar{u.studentCount === 1 ? "" : "s"}
                </span>
              </div>

              {u.shortName && <p className="text-xs font-mono text-white/40 mb-2">{u.name}</p>}
              <p className="text-sm leading-relaxed text-white/65 line-clamp-3 mb-6">{u.description}</p>

              {u.website && (
                <div className="mt-auto border-t border-white/10 pt-4">
                  <a
                    href={u.website}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 text-xs font-mono font-bold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Official University Portal</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </div>
  );
}

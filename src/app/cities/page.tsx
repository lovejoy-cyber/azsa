import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { getCities } from "@/lib/db/queries";
import { MapPin, Building2, Users } from "lucide-react";

export const metadata = { title: "Cities & Regional Chapters — AZSA" };

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Regional Chapters & Wilayas 🇩🇿"
        title="Find Your City Chapter"
        description="Discover Zimbabwean student populations, accommodation networks, university campuses, and local coordinators across Algeria."
        tone="emerald"
        stats={[
          { label: "Active Wilayas", value: `${cities.length || "4"}` },
          { label: "Provincial Coverage", value: "National" },
          { label: "Regional Support", value: "24/7" },
        ]}
      />

      <Container className="py-20 max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <SpotlightCard
              key={c.id}
              spotlightColor="rgba(5, 150, 105, 0.18)"
              className="border-white/10 hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {c.wilaya}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">{c.name}</h3>
              <p className="text-sm leading-relaxed text-white/65 line-clamp-3 mb-6">{c.description}</p>

              <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/10 pt-4 font-mono text-xs text-white/60">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
                  <Users className="h-3.5 w-3.5 text-gold-400" />
                  <span>{c.studentPopulationEstimate ?? "—"} Students</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
                  <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{c.universityCount} Campus{c.universityCount === 1 ? "" : "es"}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </div>
  );
}

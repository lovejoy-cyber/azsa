import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { CulturalTimeline } from "@/components/home/cultural-timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, Compass, Users, Sparkles, MessageCircle, Landmark, ArrowUpRight, GraduationCap } from "lucide-react";

export const metadata = { title: "About AZSA — Zimbabwe Student Sovereignty" };

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Heritage & Governance 🇿🇼"
        title="Built by the students it serves"
        description="AZSA — Association of Zimbabwean Students in Algeria — is anchored with its central administrative hub in Algiers, uniting scholars across all 48 wilayas of Algeria in academic excellence and cultural solidarity."
        tone="gold"
        stats={[
          { label: "Central Hub", value: "Algiers" },
          { label: "Wilayas Unified", value: "48+" },
          { label: "Active Network", value: "500+" },
        ]}
      />

      {/* Core Mission Cards (Interactive Linked Spotlight Cards) */}
      <Container className="py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400">Pillars of Solidarity</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why AZSA Exists
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed text-sm sm:text-base">
            Bridging generations of Zimbabwean engineers, medical scholars, architects, and researchers across Algiers, Constantine, Annaba, and Oran.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/community" className="group block h-full">
            <SpotlightCard spotlightColor="rgba(255, 215, 0, 0.18)" className="border-gold-500/20 p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  Community Discourse
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  Instant connection to peers, senior cohorts, city mentors, and study groups so you never walk alone.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-gold-400 uppercase tracking-wider">
                <span>Enter Community</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </SpotlightCard>
          </Link>

          <Link href="/contact" className="group block h-full">
            <SpotlightCard spotlightColor="rgba(5, 150, 105, 0.18)" className="border-emerald-500/20 p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(5,150,105,0.2)]">
                  <Landmark className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Embassy Diplomatic Liaison
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  Direct consular communication channel with the Embassy of Zimbabwe Student Affairs Office in Algiers.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <span>Contact Embassy Desk</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </SpotlightCard>
          </Link>

          <Link href="/resources" className="group block h-full">
            <SpotlightCard spotlightColor="rgba(225, 29, 72, 0.18)" className="border-rose-500/20 p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                  Living Knowledge & Visas
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  Curated survival guides on residence permits, healthcare, academic registration, and housing in Algeria.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                <span>Browse Student Guides</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </SpotlightCard>
          </Link>
        </div>
      </Container>

      {/* WHATSAPP COMMUNITY REQUEST SECTION */}
      <section className="relative overflow-hidden py-16 border-y border-white/10 bg-gradient-to-r from-emerald-950/40 via-ink-950 to-emerald-950/40">
        <Container className="max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Official Student Network</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Join the Official WhatsApp Cohort
            </h3>
            <p className="mt-2 text-sm text-white/65 max-w-xl">
              To protect student privacy and prevent spam, students join the official WhatsApp groups by submitting a verification request on the platform.
            </p>
          </div>
          <Link href="/contact?channel=whatsapp">
            <Button variant="emerald" size="lg" className="rounded-full px-8 py-5 text-xs font-mono uppercase tracking-widest font-bold shrink-0">
              Send Request to Join <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </Container>
      </section>

      {/* Holographic National Motto Monolith */}
      <section className="relative overflow-hidden py-24 border-b border-white/10 bg-gradient-to-b from-ink-950 via-black to-ink-950 film-grain">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12)_0%,transparent_65%)]" />

        <Container className="relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-gold-400 mb-8 shadow-[0_0_25px_rgba(255,215,0,0.2)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>National Ideology</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 text-glow-gold">
            Unity • Freedom • Work
          </h2>

          <p className="mx-auto max-w-2xl leading-relaxed text-base sm:text-lg text-white/70">
            The national motto inscribed upon Zimbabwe&apos;s coat of arms translates directly into our student mandate.
            <strong className="text-gold-400 font-semibold"> Unity</strong> binds our community across thousands of miles.
            <strong className="text-white font-semibold"> Freedom</strong> represents the ambition to study across global borders.
            <strong className="text-emerald-400 font-semibold"> Work</strong> is our collective dedication to academic excellence.
          </p>
        </Container>
      </section>

      {/* Historical Story & Cultural Timeline (Interactive Linked Nodes) */}
      <Container className="py-24 max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400">Chronological Evolution</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How AZSA Came Together
          </h2>
          <p className="mt-3 text-sm text-white/50">
            From initial mutual-aid groups to an accredited national alliance anchored in Algiers.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <CulturalTimeline />
        </div>
      </Container>
    </div>
  );
}

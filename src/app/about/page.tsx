import { Container } from "@/components/ui/container";
import { GradientDivider } from "@/components/layout/gradient-divider";
import { CulturalTimeline } from "@/components/home/cultural-timeline";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <div className="bg-ink-950 py-16 text-white">
        <Container className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">About AZSA 🇿🇼</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Built by the students it serves
          </h1>
          <p className="mt-4 text-white/70">
            AZSA -- Zimbabwean Students in Algeria -- exists so that no one arriving in a new
            city has to start from zero. It's a place to find people from home, get a
            straight answer about a visa question, and hear from the embassy directly.
          </p>
        </Container>
        <GradientDivider tone="gold" className="mt-10" />
      </div>

      <Container className="max-w-2xl py-14">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Why AZSA exists</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Zimbabwean students have been coming to Algeria for engineering, medicine, and
            architecture programmes for years, spread across Oran, Algiers, Constantine, and
            Annaba. Until now, most of what one cohort learned about housing, healthcare, or
            renewing a residence permit stayed within that cohort. AZSA exists to carry that
            knowledge forward -- and to give the embassy's student affairs office a direct,
            reliable channel to reach every student at once.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">What you'll find here</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">
            <li>A community feed for questions, study groups, and everyday life</li>
            <li>Events organised by students and by the embassy</li>
            <li>News and official announcements in one place</li>
            <li>A growing library of practical resources: visas, housing, healthcare</li>
            <li>Opportunities worth applying for -- scholarships, internships, grants</li>
          </ul>
        </section>
      </Container>

      <div className="bg-ink-900 py-14 text-white">
        <Container className="max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-platinum">
            Zimbabwe's national motto
          </p>
          <p className="mt-3 font-display text-4xl italic font-semibold text-gold-500 sm:text-5xl">
            Unity &middot; Freedom &middot; Work
          </p>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">
            The motto on Zimbabwe's coat of arms reads plainly on the wall of any government
            building back home -- but it maps onto student life here just as directly. Unity
            is the community this platform exists to hold together. Freedom is the choice
            every student made to study somewhere unfamiliar. Work is what they're actually
            here to do.
          </p>
        </Container>
      </div>

      <Container className="max-w-2xl py-16">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-600">Our story</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            How AZSA came together
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-faint">
            An illustrative founding story for this build -- swap in AZSA's real timeline
            when you have it.
          </p>
        </div>
        <div className="mt-12">
          <CulturalTimeline />
        </div>
      </Container>

      <Container className="max-w-2xl pb-16">
        <section className="rounded-[var(--radius-md)] border border-dashed border-border-strong p-6">
          <h2 className="font-display text-lg font-semibold text-ink">A note on this build</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            This version of AZSA runs on real, working infrastructure -- a Postgres database,
            authenticated accounts, and server-enforced permissions -- populated with clearly
            synthetic demo data for illustration. See the project README for what's real,
            what's a documented next step, and how to deploy it.
          </p>
        </section>
      </Container>
    </div>
  );
}

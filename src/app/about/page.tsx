import { Container } from "@/components/ui/container";
import { StoneDivider } from "@/components/layout/stone-divider";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <div className="bg-jade-950 py-16 text-white">
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
        <StoneDivider tone="gold" className="mt-10" />
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

        <section className="mt-10 rounded-[var(--radius-md)] border border-border bg-jade-50 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-jade-600">
            Zimbabwe's national motto
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-jade-900">
            Unity · Freedom · Work
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            The motto on Zimbabwe's coat of arms reads plainly on the wall of any government
            building back home — but it maps onto student life here just as directly. Unity
            is the community this platform exists to hold together. Freedom is the choice
            every student made to study somewhere unfamiliar. Work is what they're actually
            here to do. AZSA borrows the motto because it fits, not just because it's ours.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">A note on this build</h2>
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

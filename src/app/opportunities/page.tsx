import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getOpportunities } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Opportunities" };

const TYPE_TONE = {
  scholarship: "gold",
  internship: "jade",
  job: "info",
  volunteer: "neutral",
  grant: "gold",
} as const;

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Opportunities</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Scholarships, internships, and grants worth your time
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        {opportunities.length > 0 ? (
          <div className="flex flex-col gap-4">
            {opportunities.map((o) => (
              <div key={o.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone={(TYPE_TONE as Record<string, "jade" | "gold" | "brick" | "neutral" | "info">)[o.type] ?? "neutral"}>
                    {o.type}
                  </Badge>
                  {o.deadline && (
                    <span className="font-mono text-xs text-brick-600">Deadline {formatDate(o.deadline)}</span>
                  )}
                </div>
                <h3 className="mt-2.5 font-display text-lg font-semibold text-ink">{o.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{o.description}</p>
                {o.link && (
                  <a href={o.link} className="mt-2 inline-block text-sm font-semibold text-jade-700 hover:text-jade-800">
                    Learn more
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No opportunities posted right now.</p>
        )}
      </Container>
    </div>
  );
}

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getResources } from "@/lib/db/queries";

export const metadata = { title: "Student resources" };

const CATEGORY_LABELS: Record<string, string> = {
  visa: "Visa & residence",
  housing: "Housing",
  healthcare: "Healthcare",
  academic: "Academic",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Resources</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Practical guides, written by students who've done it
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        {resources.length > 0 ? (
          <div className="flex flex-col gap-4">
            {resources.map((r) => (
              <div key={r.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                <Badge tone="jade">{CATEGORY_LABELS[r.category] ?? r.category}</Badge>
                <h3 className="mt-2.5 font-display text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{r.description}</p>
                {r.link && (
                  <a href={r.link} className="mt-2 inline-block text-sm font-semibold text-jade-700 hover:text-jade-800">
                    Read more
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No resources published yet.</p>
        )}
      </Container>
    </div>
  );
}

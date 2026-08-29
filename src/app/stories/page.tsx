import { Container } from "@/components/ui/container";
import { getStories } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Stories" };

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div>
      <div className="bg-ink-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Stories</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Told by the students who lived them
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        {stories.length > 0 ? (
          <div className="flex flex-col gap-6">
            {stories.map((s) => (
              <article key={s.id} className="border-b border-border pb-6 last:border-0">
                <p className="font-mono text-xs text-ink-faint">
                  By {s.authorName} · {s.publishedAt ? formatDate(s.publishedAt) : ""}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-semibold text-ink">{s.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{s.content}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-dashed border-border-strong p-10 text-center text-ink-faint">
            No stories published yet — this space is waiting for the first one.
          </div>
        )}
      </Container>
    </div>
  );
}

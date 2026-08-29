import { Container } from "@/components/ui/container";
import { ArticleCard } from "@/components/news/article-card";
import { getPublishedNews } from "@/lib/db/queries";

export const metadata = { title: "News" };

export default async function NewsPage() {
  const articles = await getPublishedNews();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">News</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            What's happening across the AZSA network
          </h1>
        </Container>
      </div>

      <Container className="py-12">
        {articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                title={a.title}
                slug={a.slug}
                excerpt={a.excerpt}
                category={a.category}
                publishedAt={a.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No articles published yet.</p>
        )}
      </Container>
    </div>
  );
}

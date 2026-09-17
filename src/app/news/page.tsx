import { Container } from "@/components/ui/container";
import { ArticleCard } from "@/components/news/article-card";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { getPublishedNews } from "@/lib/db/queries";
import { Newspaper } from "lucide-react";

export const metadata = { title: "Official News & Dispatches — AZSA" };

export default async function NewsPage() {
  const articles = await getPublishedNews();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Sovereign Press & Dispatches 🇿🇼"
        title="Official AZSA Network News"
        description="Authoritative briefings, academic developments, embassy statements, and student accomplishments across Algeria."
        tone="gold"
        stats={[
          { label: "Published Dispatches", value: `${articles.length || "0"}` },
          { label: "Direct Embassy Feed", value: "Verified" },
          { label: "Coverage", value: "National" },
        ]}
      />

      <Container className="py-20 max-w-6xl">
        {articles.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Newspaper className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Dispatches Published Yet</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Official updates from the editorial committee will be published here.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

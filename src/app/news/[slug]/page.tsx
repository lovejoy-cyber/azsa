import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getNewsBySlug } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <article className="py-12">
      <Container className="max-w-2xl">
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-jade-700 hover:text-jade-800">
          <ArrowLeft className="h-3.5 w-3.5" /> All news
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <Badge tone="jade">{article.category}</Badge>
          {article.publishedAt && (
            <time className="font-mono text-xs text-ink-faint">{formatDate(article.publishedAt)}</time>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>

        <div className="mt-8 whitespace-pre-line text-[17px] leading-relaxed text-ink">
          {article.content}
        </div>
      </Container>
    </article>
  );
}

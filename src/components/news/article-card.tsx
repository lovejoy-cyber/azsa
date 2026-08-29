import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
}: {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: Date | string | null;
}) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group block rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-gold-600/40"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge tone="ink">{category}</Badge>
        {publishedAt && (
          <time className="font-mono text-xs text-ink-faint" dateTime={new Date(publishedAt).toISOString()}>
            {formatDate(publishedAt)}
          </time>
        )}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink group-hover:text-gold-700">
        {title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{excerpt}</p>
    </Link>
  );
}

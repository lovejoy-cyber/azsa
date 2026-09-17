import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowUpRight, Newspaper } from "lucide-react";

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
    <SpotlightCard
      spotlightColor="rgba(255, 215, 0, 0.15)"
      className="group flex flex-col justify-between border-white/10 hover:border-gold-500/40"
    >
      <Link href={`/news/${slug}`} className="block h-full">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Badge tone="gold-glow" dot>
            {category}
          </Badge>
          {publishedAt && (
            <div className="flex items-center gap-1.5 font-mono text-xs text-white/50">
              <Clock className="h-3 w-3 text-gold-400" />
              <time dateTime={new Date(publishedAt).toISOString()}>{formatDate(publishedAt)}</time>
            </div>
          )}
        </div>

        <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-gold-400">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">{excerpt}</p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
            Read Full Dispatch
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gold-400 border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}

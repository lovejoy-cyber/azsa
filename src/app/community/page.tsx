import { Container } from "@/components/ui/container";
import { Composer } from "@/components/community/composer";
import { PostCard } from "@/components/community/post-card";
import { getCommunityFeed } from "@/lib/db/queries";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = { title: "Community" };

const TOPICS = ["general", "academic", "housing", "social", "visa", "jobs"];

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const posts = await getCommunityFeed(topic);

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Community</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Ask, share, and find your people
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/community"
            className={cn(
              "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium",
              !topic ? "bg-jade-600 text-white" : "bg-surface-sunken text-ink-soft hover:text-ink"
            )}
          >
            All
          </Link>
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/community?topic=${t}`}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium capitalize",
                topic === t ? "bg-jade-600 text-white" : "bg-surface-sunken text-ink-soft hover:text-ink"
              )}
            >
              {t}
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <Composer />
        </div>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                id={p.id}
                content={p.content}
                topic={p.topic}
                authorName={p.authorName}
                authorField={p.authorField}
                likeCount={p.likeCount}
                commentCount={p.commentCount}
                createdAt={p.createdAt}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No posts in this topic yet — be the first.</p>
        )}
      </Container>
    </div>
  );
}

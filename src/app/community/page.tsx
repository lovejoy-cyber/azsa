import { Container } from "@/components/ui/container";
import { Composer } from "@/components/community/composer";
import { PostCard } from "@/components/community/post-card";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { getCommunityFeed } from "@/lib/db/queries";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = { title: "Community Feed & Discourse — AZSA" };

const TOPICS = ["general", "academic", "housing", "social", "visa", "jobs"];

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const posts = await getCommunityFeed(topic);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Sovereign Student Voice 🇿🇼"
        title="Community Exchange & Feed"
        description="Ask questions, share accommodation listings, organize study groups, and connect with fellow Zimbabwean scholars across Algeria."
        tone="gold"
        stats={[
          { label: "Community Threads", value: `${posts.length || "0"}` },
          { label: "Wilayas Active", value: "12+" },
          { label: "Moderation Status", value: "Active" },
        ]}
      />

      <Container className="max-w-3xl py-16">
        {/* Glowing Topic Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
          <Link
            href="/community"
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300",
              !topic
                ? "bg-gold-500 text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            All Threads
          </Link>
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/community?topic=${t}`}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300",
                topic === t
                  ? "bg-gold-500 text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {t}
            </Link>
          ))}
        </div>

        {/* Post Composer Frame */}
        <div className="mb-10 rounded-2xl border border-white/15 bg-white/[0.03] p-1.5 backdrop-blur-2xl shadow-2xl">
          <Composer />
        </div>

        {/* Posts Stream */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-6">
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <MessageSquarePlus className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">No Threads In This Topic</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Be the first to post a question, announcement, or resource in this channel.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

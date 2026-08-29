import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { eq } from "drizzle-orm";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/community/post-card";
import { CommentThread } from "@/components/community/comment-thread";
import { db, schema } from "@/lib/db";
import { getCommentsForPost } from "@/lib/db/queries";

async function getPost(id: string) {
  const [post] = await db
    .select({
      id: schema.posts.id,
      content: schema.posts.content,
      topic: schema.posts.topic,
      likeCount: schema.posts.likeCount,
      commentCount: schema.posts.commentCount,
      createdAt: schema.posts.createdAt,
      authorName: schema.profiles.displayName,
      authorField: schema.profiles.fieldOfStudy,
    })
    .from(schema.posts)
    .innerJoin(schema.profiles, eq(schema.posts.authorId, schema.profiles.userId))
    .where(eq(schema.posts.id, id))
    .limit(1);
  return post ?? null;
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getCommentsForPost(id)]);
  if (!post) notFound();

  return (
    <Container className="max-w-2xl py-12">
      <Link href="/community" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 hover:text-ink-800">
        <ArrowLeft className="h-3.5 w-3.5" /> Community feed
      </Link>

      <div className="mt-6">
        <PostCard
          id={post.id}
          content={post.content}
          topic={post.topic}
          authorName={post.authorName}
          authorField={post.authorField}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          createdAt={post.createdAt}
          linkToDetail={false}
        />
      </div>

      <CommentThread postId={post.id} initialComments={comments} />
    </Container>
  );
}

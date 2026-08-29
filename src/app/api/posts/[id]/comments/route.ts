import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { can } from "@/lib/rbac";
import { commentSchema } from "@/lib/validations";
import { getCommentsForPost } from "@/lib/db/queries";
import { notify } from "@/lib/notifications";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params;
  const comments = await getCommentsForPost(postId);
  return NextResponse.json({ comments });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to comment." }, { status: 401 });
  }
  if (!can(session.user.role, "comment:create")) {
    return NextResponse.json({ error: "Your account can't comment." }, { status: 403 });
  }

  const { id: postId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid comment." }, { status: 400 });
  }

  const [post] = await db
    .select({ authorId: schema.posts.authorId, content: schema.posts.content })
    .from(schema.posts)
    .where(eq(schema.posts.id, postId))
    .limit(1);

  let parentAuthorId: string | null = null;
  if (parsed.data.parentCommentId) {
    const [parent] = await db
      .select({ authorId: schema.comments.authorId })
      .from(schema.comments)
      .where(eq(schema.comments.id, parsed.data.parentCommentId))
      .limit(1);
    parentAuthorId = parent?.authorId ?? null;
  }

  const [comment] = await db.transaction(async (tx) => {
    const inserted = await tx
      .insert(schema.comments)
      .values({
        postId,
        authorId: session.user.id,
        content: parsed.data.content,
        parentCommentId: parsed.data.parentCommentId,
      })
      .returning();

    await tx
      .update(schema.posts)
      .set({ commentCount: sql`${schema.posts.commentCount} + 1` })
      .where(eq(schema.posts.id, postId));

    return inserted;
  });

  // Notify the post author (unless they're the one commenting)...
  if (post && post.authorId !== session.user.id) {
    await notify(post.authorId, "comment", {
      postId,
      commentId: comment.id,
      excerpt: post.content.slice(0, 80),
      byUserId: session.user.id,
    });
  }
  // ...and separately, the parent comment's author on a reply.
  if (parentAuthorId && parentAuthorId !== session.user.id && parentAuthorId !== post?.authorId) {
    await notify(parentAuthorId, "reply", {
      postId,
      commentId: comment.id,
      byUserId: session.user.id,
    });
  }

  return NextResponse.json({ ok: true, comment });
}

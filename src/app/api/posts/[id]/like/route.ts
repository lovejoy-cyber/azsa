import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { notify } from "@/lib/notifications";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to like posts." }, { status: 401 });
  }
  const { id: postId } = await params;

  const [existing] = await db
    .select()
    .from(schema.likes)
    .where(and(eq(schema.likes.postId, postId), eq(schema.likes.userId, session.user.id)))
    .limit(1);

  if (existing) {
    return NextResponse.json({ ok: true, alreadyLiked: true });
  }

  const [post] = await db
    .select({ authorId: schema.posts.authorId, content: schema.posts.content })
    .from(schema.posts)
    .where(eq(schema.posts.id, postId))
    .limit(1);

  await db.transaction(async (tx) => {
    await tx.insert(schema.likes).values({ postId, userId: session.user.id });
    await tx
      .update(schema.posts)
      .set({ likeCount: sql`${schema.posts.likeCount} + 1` })
      .where(eq(schema.posts.id, postId));
  });

  if (post && post.authorId !== session.user.id) {
    await notify(post.authorId, "like", {
      postId,
      excerpt: post.content.slice(0, 80),
      byUserId: session.user.id,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to manage likes." }, { status: 401 });
  }
  const { id: postId } = await params;

  await db.transaction(async (tx) => {
    const result = await tx
      .delete(schema.likes)
      .where(and(eq(schema.likes.postId, postId), eq(schema.likes.userId, session.user.id)))
      .returning();

    if (result.length > 0) {
      await tx
        .update(schema.posts)
        .set({ likeCount: sql`greatest(${schema.posts.likeCount} - 1, 0)` })
        .where(eq(schema.posts.id, postId));
    }
  });

  return NextResponse.json({ ok: true });
}

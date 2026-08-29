import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { can } from "@/lib/rbac";
import { postSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to post." }, { status: 401 });
  }
  if (!can(session.user.role, "post:create")) {
    return NextResponse.json({ error: "Your account can't create posts." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid post." }, { status: 400 });
  }

  const [post] = await db
    .insert(schema.posts)
    .values({
      authorId: session.user.id,
      content: parsed.data.content,
      topic: parsed.data.topic,
      images: parsed.data.images,
    })
    .returning();

  return NextResponse.json({ ok: true, post });
}

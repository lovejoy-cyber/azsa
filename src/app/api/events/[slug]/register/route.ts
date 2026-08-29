import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";

async function getEventBySlug(slug: string) {
  const [event] = await db.select().from(schema.events).where(eq(schema.events.slug, slug)).limit(1);
  return event ?? null;
}

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to register for events." }, { status: 401 });
  }

  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  if (event.status !== "published") {
    return NextResponse.json({ error: "This event isn't open for registration." }, { status: 400 });
  }

  const [existing] = await db
    .select()
    .from(schema.eventRegistrations)
    .where(
      and(
        eq(schema.eventRegistrations.eventId, event.id),
        eq(schema.eventRegistrations.userId, session.user.id)
      )
    )
    .limit(1);

  if (existing && existing.status === "registered") {
    return NextResponse.json({ error: "You're already registered." }, { status: 409 });
  }

  if (event.capacity != null) {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.eventRegistrations)
      .where(
        and(eq(schema.eventRegistrations.eventId, event.id), eq(schema.eventRegistrations.status, "registered"))
      );
    if (count >= event.capacity) {
      return NextResponse.json({ error: "This event is at capacity." }, { status: 400 });
    }
  }

  if (existing) {
    await db
      .update(schema.eventRegistrations)
      .set({ status: "registered" })
      .where(eq(schema.eventRegistrations.id, existing.id));
  } else {
    await db.insert(schema.eventRegistrations).values({
      eventId: event.id,
      userId: session.user.id,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to manage your registration." }, { status: 401 });
  }

  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  await db
    .update(schema.eventRegistrations)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(schema.eventRegistrations.eventId, event.id),
        eq(schema.eventRegistrations.userId, session.user.id)
      )
    );

  return NextResponse.json({ ok: true });
}

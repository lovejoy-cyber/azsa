import { NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ notifications: [], unreadCount: 0 });
  }

  const [notifications, [{ unreadCount }]] = await Promise.all([
    db
      .select()
      .from(schema.notifications)
      .where(eq(schema.notifications.userId, session.user.id))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(15),
    db
      .select({ unreadCount: sql<number>`count(*)::int` })
      .from(schema.notifications)
      .where(and(eq(schema.notifications.userId, session.user.id), eq(schema.notifications.isRead, false))),
  ]);

  return NextResponse.json({ notifications, unreadCount });
}

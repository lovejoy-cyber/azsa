import { db, schema } from "@/lib/db";
import { desc, eq, inArray } from "drizzle-orm";

type NotificationType =
  | "like"
  | "comment"
  | "reply"
  | "follow_topic_post"
  | "event_reminder"
  | "announcement"
  | "report_update"
  | "system";

/**
 * Insert a notification for a single user. Never throws into the caller's
 * request path -- a failed notification shouldn't fail the like/comment/etc
 * it's attached to, so errors are swallowed here and logged.
 */
export async function notify(
  userId: string,
  type: NotificationType,
  payload: Record<string, unknown>
) {
  try {
    await db.insert(schema.notifications).values({ userId, type, payload });
  } catch (err) {
    console.error("notify() failed", { userId, type, err });
  }
}

/** Broadcast a notification to every user matching an announcement audience. */
export async function notifyAudience(
  audience: "all" | "students" | "embassy",
  type: NotificationType,
  payload: Record<string, unknown>
) {
  const roles =
    audience === "students"
      ? (["student"] as const)
      : audience === "embassy"
        ? (["embassy_admin", "super_admin"] as const)
        : undefined; // "all" -> no role filter

  try {
    const recipients = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(roles ? inArray(schema.users.role, [...roles]) : undefined);

    if (recipients.length === 0) return;

    await db.insert(schema.notifications).values(
      recipients.map((r) => ({ userId: r.id, type, payload }))
    );
  } catch (err) {
    console.error("notifyAudience() failed", { audience, type, err });
  }
}

export async function getRecentNotifications(userId: string, limit = 15) {
  return db
    .select()
    .from(schema.notifications)
    .where(eq(schema.notifications.userId, userId))
    .orderBy(desc(schema.notifications.createdAt))
    .limit(limit);
}

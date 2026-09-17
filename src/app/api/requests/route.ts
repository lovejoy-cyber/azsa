import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, notifications } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";

/**
 * A student submits something they want listed -- a side hustle, a service,
 * a story, an event idea. It lands as a notification for every admin and
 * embassy account, so it enters the same queue staff already watch rather
 * than a separate inbox nobody checks.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You need to be signed in." }, { status: 401 });
  }

  let body: { kind?: string; title?: string; detail?: string; contact?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind = (body.kind ?? "").trim();
  const title = (body.title ?? "").trim();
  const detail = (body.detail ?? "").trim();
  const contact = (body.contact ?? "").trim();

  if (!title || title.length < 3) {
    return NextResponse.json({ error: "Give it a short title." }, { status: 400 });
  }
  if (!detail || detail.length < 10) {
    return NextResponse.json({ error: "Add a little more detail." }, { status: 400 });
  }
  if (title.length > 120 || detail.length > 2000 || contact.length > 200) {
    return NextResponse.json({ error: "That's longer than we can accept." }, { status: 400 });
  }

  const staff = await db
    .select({ id: users.id })
    .from(users)
    .where(inArray(users.role, ["super_admin", "embassy_admin", "moderator"]));

  if (staff.length > 0) {
    await db.insert(notifications).values(
      staff.map((s) => ({
        userId: s.id,
        type: "announcement" as const,
        payload: {
          heading: `New ${kind || "listing"} request`,
          excerpt: `${title} — from ${session.user.displayName ?? "a student"}`,
          detail,
          contact,
          submittedBy: session.user.id,
        },
      }))
    );
  }

  return NextResponse.json({ ok: true });
}

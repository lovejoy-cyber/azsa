import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { reportSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Log in to report content." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid report." }, { status: 400 });
  }

  await db.insert(schema.reports).values({
    targetType: parsed.data.targetType,
    targetId: parsed.data.targetId,
    reporterId: session.user.id,
    reason: parsed.data.reason,
  });

  return NextResponse.json({ ok: true });
}

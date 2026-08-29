import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { signupSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, password, fullName, displayName } = parsed.data;

  const [existing] = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(schema.users)
    .values({
      email,
      passwordHash,
      role: "student",
      status: "active",
      emailVerifiedAt: new Date(),
    })
    .returning();

  await db.insert(schema.profiles).values({
    userId: user.id,
    fullName,
    displayName,
  });

  await db.insert(schema.auditLogs).values({
    actorId: user.id,
    action: "user.signup",
    targetType: "user",
    targetId: user.id,
  });

  return NextResponse.json({ ok: true });
}

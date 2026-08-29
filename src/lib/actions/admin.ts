"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { assertCan, type Role } from "@/lib/rbac";
import { newsArticleSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "user:manage");
  return session;
}

export async function updateUserRole(userId: string, role: Role) {
  const session = await requireSuperAdmin();
  assertCan(session.user.role, "role:manage");

  await db.update(schema.users).set({ role }).where(eq(schema.users.id, userId));
  await db.insert(schema.auditLogs).values({
    actorId: session.user.id,
    action: "user.role_changed",
    targetType: "user",
    targetId: userId,
    metadata: { newRole: role },
  });

  revalidatePath("/admin/users");
}

export async function setUserStatus(userId: string, status: "active" | "suspended") {
  const session = await requireSuperAdmin();

  await db.update(schema.users).set({ status }).where(eq(schema.users.id, userId));
  await db.insert(schema.auditLogs).values({
    actorId: session.user.id,
    action: status === "suspended" ? "user.suspended" : "user.reactivated",
    targetType: "user",
    targetId: userId,
  });

  revalidatePath("/admin/users");
}

export async function resolveReport(reportId: string, status: "actioned" | "dismissed") {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "report:review");

  await db
    .update(schema.reports)
    .set({ status, reviewedById: session.user.id, resolvedAt: new Date() })
    .where(eq(schema.reports.id, reportId));

  await db.insert(schema.auditLogs).values({
    actorId: session.user.id,
    action: `report.${status}`,
    targetType: "report",
    targetId: reportId,
  });

  revalidatePath("/admin/moderation");
}

export async function createNewsArticle(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "news:create");

  const parsed = newsArticleSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category") || "news",
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid article.");
  }

  assertCan(session.user.role, "news:publish");

  await db.insert(schema.newsArticles).values({
    title: parsed.data.title,
    slug: slugify(parsed.data.title) + "-" + Date.now().toString(36),
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    featured: parsed.data.featured,
    authorId: session.user.id,
    status: "published",
    publishedAt: new Date(),
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

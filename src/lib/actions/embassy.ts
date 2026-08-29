"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { assertCan } from "@/lib/rbac";
import { announcementSchema } from "@/lib/validations";
import { notifyAudience } from "@/lib/notifications";

export async function createAnnouncement(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "announcement:create");

  const parsed = announcementSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    audience: formData.get("audience") || "all",
    pinned: formData.get("pinned") === "on",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid announcement.");
  }

  const [announcement] = await db
    .insert(schema.announcements)
    .values({
      title: parsed.data.title,
      content: parsed.data.content,
      audience: parsed.data.audience,
      pinned: parsed.data.pinned,
      publishedById: session.user.id,
    })
    .returning();

  await db.insert(schema.auditLogs).values({
    actorId: session.user.id,
    action: "announcement.created",
    targetType: "announcement",
  });

  await notifyAudience(parsed.data.audience, "announcement", {
    announcementId: announcement.id,
    title: announcement.title,
  });

  revalidatePath("/embassy/announcements");
  revalidatePath("/announcements");
  revalidatePath("/dashboard");
}

export async function createResource(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "resource:manage");

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();

  if (!title || !category || description.length < 10) {
    throw new Error("Fill in a title, category, and a description of at least 10 characters.");
  }

  await db.insert(schema.resources).values({
    title,
    category,
    description,
    link: link || null,
    createdById: session.user.id,
  });

  revalidatePath("/embassy/resources");
  revalidatePath("/resources");
}

export async function createOpportunity(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  assertCan(session.user.role, "opportunity:manage");

  const title = String(formData.get("title") ?? "").trim();
  const type = String(formData.get("type") ?? "") as
    | "scholarship"
    | "internship"
    | "job"
    | "volunteer"
    | "grant";
  const description = String(formData.get("description") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const deadlineRaw = String(formData.get("deadline") ?? "").trim();

  if (!title || description.length < 10) {
    throw new Error("Fill in a title and a description of at least 10 characters.");
  }

  await db.insert(schema.opportunities).values({
    title,
    type,
    description,
    link: link || null,
    deadline: deadlineRaw ? new Date(deadlineRaw) : null,
    postedById: session.user.id,
  });

  revalidatePath("/embassy/opportunities");
  revalidatePath("/opportunities");
}

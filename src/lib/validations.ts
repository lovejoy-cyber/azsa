import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password needs at least 8 characters")
    .max(72, "Password is too long"),
  fullName: z.string().trim().min(2, "Enter your full name").max(160),
  displayName: z.string().trim().min(2, "Enter a display name").max(80),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1, "Password is required"),
});

export const postSchema = z.object({
  content: z.string().trim().min(1, "Say something before posting").max(4000),
  topic: z.string().trim().min(1).max(60).default("general"),
  images: z.array(z.string().url()).max(6).default([]),
});

export const commentSchema = z.object({
  content: z.string().trim().min(1, "Comment cannot be empty").max(2000),
  parentCommentId: z.string().uuid().optional(),
});

export const reportSchema = z.object({
  targetType: z.enum(["post", "comment", "user"]),
  targetId: z.string().uuid(),
  reason: z.string().trim().min(3).max(400),
});

export const eventRegistrationSchema = z.object({
  eventId: z.string().uuid(),
});

export const eventSchema = z.object({
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().min(10),
  category: z.string().trim().min(1).max(60).default("community"),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  startAt: z.coerce.date(),
  endAt: z.coerce.date().optional(),
  location: z.string().trim().max(200).optional(),
  organizerName: z.string().trim().max(160).optional(),
  capacity: z.coerce.number().int().positive().optional(),
});

export const newsArticleSchema = z.object({
  title: z.string().trim().min(3).max(220),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().trim().min(20),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().trim().min(1).max(60).default("news"),
  featured: z.boolean().default(false),
});

export const announcementSchema = z.object({
  title: z.string().trim().min(3).max(200),
  content: z.string().trim().min(5),
  audience: z.enum(["all", "students", "embassy"]).default("all"),
  pinned: z.boolean().default(false),
});

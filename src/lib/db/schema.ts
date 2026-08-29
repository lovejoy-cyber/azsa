import {
  pgTable,
  pgEnum,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  uuid,
  jsonb,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

/* -------------------------------------------------------------------------- */
/*  ENUMS                                                                      */
/* -------------------------------------------------------------------------- */

export const roleEnum = pgEnum("role", [
  "student",
  "moderator",
  "embassy_admin",
  "super_admin",
]);

export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "suspended",
  "pending_verification",
]);

export const contentStatusEnum = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
  "removed",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "published",
  "cancelled",
]);

export const registrationStatusEnum = pgEnum("registration_status", [
  "registered",
  "waitlisted",
  "cancelled",
  "attended",
]);

export const reportTargetEnum = pgEnum("report_target", [
  "post",
  "comment",
  "user",
]);

export const reportStatusEnum = pgEnum("report_status", [
  "open",
  "reviewed",
  "actioned",
  "dismissed",
]);

export const opportunityTypeEnum = pgEnum("opportunity_type", [
  "scholarship",
  "internship",
  "job",
  "volunteer",
  "grant",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "like",
  "comment",
  "reply",
  "follow_topic_post",
  "event_reminder",
  "announcement",
  "report_update",
  "system",
]);

/* -------------------------------------------------------------------------- */
/*  IDENTITY                                                                   */
/* -------------------------------------------------------------------------- */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("student"),
  status: accountStatusEnum("status").notNull().default("pending_verification"),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  displayName: varchar("display_name", { length: 80 }).notNull(),
  avatarUrl: text("avatar_url"),
  coverUrl: text("cover_url"),
  bio: text("bio"),
  homeProvinceZw: varchar("home_province_zw", { length: 120 }),
  cityId: uuid("city_id").references(() => cities.id, { onDelete: "set null" }),
  universityId: uuid("university_id").references(() => universities.id, { onDelete: "set null" }),
  fieldOfStudy: varchar("field_of_study", { length: 160 }),
  yearOfStudy: integer("year_of_study"),
  arrivalYear: integer("arrival_year"),
  whatsapp: varchar("whatsapp", { length: 40 }),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  DIRECTORY: UNIVERSITIES & CITIES                                           */
/* -------------------------------------------------------------------------- */

export const cities = pgTable("cities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  wilaya: varchar("wilaya", { length: 120 }),
  description: text("description"),
  imageUrl: text("image_url"),
  studentPopulationEstimate: integer("student_population_estimate"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const universities = pgTable("universities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  shortName: varchar("short_name", { length: 40 }),
  cityId: uuid("city_id").references(() => cities.id, { onDelete: "set null" }),
  website: text("website"),
  description: text("description"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  COMMUNITY: POSTS, COMMENTS, LIKES, TOPIC FOLLOWS                          */
/* -------------------------------------------------------------------------- */

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    images: jsonb("images").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    topic: varchar("topic", { length: 60 }).notNull().default("general"),
    status: contentStatusEnum("status").notNull().default("published"),
    likeCount: integer("like_count").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("posts_topic_idx").on(t.topic), index("posts_author_idx").on(t.authorId)]
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    parentCommentId: uuid("parent_comment_id"),
    content: text("content").notNull(),
    status: contentStatusEnum("status").notNull().default("published"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("comments_post_idx").on(t.postId)]
);

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("likes_post_user_uq").on(t.postId, t.userId)]
);

export const topicFollows = pgTable(
  "topic_follows",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    topic: varchar("topic", { length: 60 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("topic_follows_uq").on(t.userId, t.topic)]
);

/* -------------------------------------------------------------------------- */
/*  EVENTS                                                                     */
/* -------------------------------------------------------------------------- */

export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull().unique(),
    description: text("description").notNull(),
    category: varchar("category", { length: 60 }).notNull().default("community"),
    coverImageUrl: text("cover_image_url"),
    startAt: timestamp("start_at", { withTimezone: true }).notNull(),
    endAt: timestamp("end_at", { withTimezone: true }),
    location: varchar("location", { length: 200 }),
    cityId: uuid("city_id").references(() => cities.id, { onDelete: "set null" }),
    organizerName: varchar("organizer_name", { length: 160 }),
    capacity: integer("capacity"),
    status: eventStatusEnum("status").notNull().default("draft"),
    createdById: uuid("created_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("events_start_idx").on(t.startAt)]
);

export const eventRegistrations = pgTable(
  "event_registrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: registrationStatusEnum("status").notNull().default("registered"),
    registeredAt: timestamp("registered_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("event_reg_uq").on(t.eventId, t.userId)]
);

/* -------------------------------------------------------------------------- */
/*  EDITORIAL: NEWS & STORIES                                                  */
/* -------------------------------------------------------------------------- */

export const newsArticles = pgTable(
  "news_articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    coverImageUrl: text("cover_image_url"),
    category: varchar("category", { length: 60 }).notNull().default("news"),
    authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: contentStatusEnum("status").notNull().default("draft"),
    featured: boolean("featured").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("news_status_idx").on(t.status)]
);

export const stories = pgTable(
  "stories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull().unique(),
    content: text("content").notNull(),
    coverImageUrl: text("cover_image_url"),
    authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: contentStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  }
);

/* -------------------------------------------------------------------------- */
/*  RESOURCES, ANNOUNCEMENTS, OPPORTUNITIES                                    */
/* -------------------------------------------------------------------------- */

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  description: text("description").notNull(),
  link: text("link"),
  createdById: uuid("created_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const announcements = pgTable(
  "announcements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    content: text("content").notNull(),
    audience: varchar("audience", { length: 40 }).notNull().default("all"),
    pinned: boolean("pinned").notNull().default(false),
    publishedById: uuid("published_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("announcements_pinned_idx").on(t.pinned)]
);

export const opportunities = pgTable("opportunities", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  type: opportunityTypeEnum("type").notNull(),
  description: text("description").notNull(),
  deadline: timestamp("deadline", { withTimezone: true }),
  link: text("link"),
  postedById: uuid("posted_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  TRUST & SAFETY: REPORTS, AUDIT LOGS, NOTIFICATIONS, MEDIA                  */
/* -------------------------------------------------------------------------- */

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  targetType: reportTargetEnum("target_type").notNull(),
  targetId: uuid("target_id").notNull(),
  reporterId: uuid("reporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  reason: varchar("reason", { length: 400 }).notNull(),
  status: reportStatusEnum("status").notNull().default("open"),
  reviewedById: uuid("reviewed_by_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
});

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 120 }).notNull(),
    targetType: varchar("target_type", { length: 60 }),
    targetId: uuid("target_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("audit_logs_actor_idx").on(t.actorId)]
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: notificationTypeEnum("type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default(sql`'{}'::jsonb`),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("notifications_user_idx").on(t.userId, t.isRead)]
);

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  uploaderId: uuid("uploader_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  type: varchar("type", { length: 40 }).notNull(),
  altText: varchar("alt_text", { length: 300 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  RELATIONS                                                                  */
/* -------------------------------------------------------------------------- */

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  posts: many(posts),
  comments: many(comments),
  eventRegistrations: many(eventRegistrations),
  notifications: many(notifications),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  city: one(cities, { fields: [profiles.cityId], references: [cities.id] }),
  university: one(universities, { fields: [profiles.universityId], references: [universities.id] }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  city: one(cities, { fields: [events.cityId], references: [cities.id] }),
  createdBy: one(users, { fields: [events.createdById], references: [users.id] }),
  registrations: many(eventRegistrations),
}));

export const eventRegistrationsRelations = relations(eventRegistrations, ({ one }) => ({
  event: one(events, { fields: [eventRegistrations.eventId], references: [events.id] }),
  user: one(users, { fields: [eventRegistrations.userId], references: [users.id] }),
}));

export const universitiesRelations = relations(universities, ({ one, many }) => ({
  city: one(cities, { fields: [universities.cityId], references: [cities.id] }),
  profiles: many(profiles),
}));

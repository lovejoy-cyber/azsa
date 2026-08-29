import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export async function getHomePageData() {
  const [featuredNews, upcomingEvents, recentPosts, counts] = await Promise.all([
    db
      .select({
        id: schema.newsArticles.id,
        title: schema.newsArticles.title,
        slug: schema.newsArticles.slug,
        excerpt: schema.newsArticles.excerpt,
        category: schema.newsArticles.category,
        publishedAt: schema.newsArticles.publishedAt,
      })
      .from(schema.newsArticles)
      .where(eq(schema.newsArticles.status, "published"))
      .orderBy(desc(schema.newsArticles.publishedAt))
      .limit(3),

    db
      .select({
        id: schema.events.id,
        title: schema.events.title,
        slug: schema.events.slug,
        startAt: schema.events.startAt,
        location: schema.events.location,
        category: schema.events.category,
        cityName: schema.cities.name,
      })
      .from(schema.events)
      .leftJoin(schema.cities, eq(schema.events.cityId, schema.cities.id))
      .where(and(eq(schema.events.status, "published"), gte(schema.events.startAt, new Date())))
      .orderBy(schema.events.startAt)
      .limit(3),

    db
      .select({
        id: schema.posts.id,
        content: schema.posts.content,
        topic: schema.posts.topic,
        likeCount: schema.posts.likeCount,
        commentCount: schema.posts.commentCount,
        createdAt: schema.posts.createdAt,
        authorName: schema.profiles.displayName,
        authorId: schema.posts.authorId,
      })
      .from(schema.posts)
      .innerJoin(schema.profiles, eq(schema.posts.authorId, schema.profiles.userId))
      .where(eq(schema.posts.status, "published"))
      .orderBy(desc(schema.posts.createdAt))
      .limit(3),

    db
      .select({
        students: sql<number>`count(distinct ${schema.profiles.id}) filter (where ${schema.profiles.id} is not null)::int`,
        universities: sql<number>`(select count(*) from ${schema.universities})::int`,
        cities: sql<number>`(select count(*) from ${schema.cities})::int`,
      })
      .from(schema.profiles),
  ]);

  return {
    featuredNews,
    upcomingEvents,
    recentPosts,
    stats: counts[0] ?? { students: 0, universities: 0, cities: 0 },
  };
}

export async function getPublishedNews() {
  return db
    .select()
    .from(schema.newsArticles)
    .where(eq(schema.newsArticles.status, "published"))
    .orderBy(desc(schema.newsArticles.publishedAt));
}

export async function getNewsBySlug(slug: string) {
  const [article] = await db
    .select()
    .from(schema.newsArticles)
    .where(and(eq(schema.newsArticles.slug, slug), eq(schema.newsArticles.status, "published")))
    .limit(1);
  return article ?? null;
}

export async function getUpcomingEvents() {
  return db
    .select({
      id: schema.events.id,
      title: schema.events.title,
      slug: schema.events.slug,
      description: schema.events.description,
      startAt: schema.events.startAt,
      endAt: schema.events.endAt,
      location: schema.events.location,
      category: schema.events.category,
      capacity: schema.events.capacity,
      cityName: schema.cities.name,
      registrationCount: sql<number>`(
        select count(*)::int from ${schema.eventRegistrations}
        where ${schema.eventRegistrations.eventId} = ${schema.events.id}
        and ${schema.eventRegistrations.status} = 'registered'
      )`,
    })
    .from(schema.events)
    .leftJoin(schema.cities, eq(schema.events.cityId, schema.cities.id))
    .where(and(eq(schema.events.status, "published"), gte(schema.events.startAt, new Date())))
    .orderBy(schema.events.startAt);
}

export async function getEventBySlug(slug: string) {
  const [event] = await db
    .select({
      id: schema.events.id,
      title: schema.events.title,
      slug: schema.events.slug,
      description: schema.events.description,
      startAt: schema.events.startAt,
      endAt: schema.events.endAt,
      location: schema.events.location,
      category: schema.events.category,
      capacity: schema.events.capacity,
      organizerName: schema.events.organizerName,
      cityName: schema.cities.name,
    })
    .from(schema.events)
    .leftJoin(schema.cities, eq(schema.events.cityId, schema.cities.id))
    .where(eq(schema.events.slug, slug))
    .limit(1);

  if (!event) return null;

  const [{ count: registrationCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.eventRegistrations)
    .where(
      and(
        eq(schema.eventRegistrations.eventId, event.id),
        eq(schema.eventRegistrations.status, "registered")
      )
    );

  return { ...event, registrationCount };
}

export async function getCommunityFeed(topic?: string) {
  return db
    .select({
      id: schema.posts.id,
      content: schema.posts.content,
      topic: schema.posts.topic,
      likeCount: schema.posts.likeCount,
      commentCount: schema.posts.commentCount,
      createdAt: schema.posts.createdAt,
      authorId: schema.posts.authorId,
      authorName: schema.profiles.displayName,
      authorField: schema.profiles.fieldOfStudy,
    })
    .from(schema.posts)
    .innerJoin(schema.profiles, eq(schema.posts.authorId, schema.profiles.userId))
    .where(
      topic
        ? and(eq(schema.posts.status, "published"), eq(schema.posts.topic, topic))
        : eq(schema.posts.status, "published")
    )
    .orderBy(desc(schema.posts.createdAt));
}

export async function getCommentsForPost(postId: string) {
  return db
    .select({
      id: schema.comments.id,
      content: schema.comments.content,
      createdAt: schema.comments.createdAt,
      authorId: schema.comments.authorId,
      authorName: schema.profiles.displayName,
    })
    .from(schema.comments)
    .innerJoin(schema.profiles, eq(schema.comments.authorId, schema.profiles.userId))
    .where(and(eq(schema.comments.postId, postId), eq(schema.comments.status, "published")))
    .orderBy(schema.comments.createdAt);
}

export async function getUniversities() {
  return db
    .select({
      id: schema.universities.id,
      name: schema.universities.name,
      shortName: schema.universities.shortName,
      description: schema.universities.description,
      website: schema.universities.website,
      cityName: schema.cities.name,
      studentCount: sql<number>`(
        select count(*)::int from ${schema.profiles}
        where ${schema.profiles.universityId} = ${schema.universities.id}
      )`,
    })
    .from(schema.universities)
    .leftJoin(schema.cities, eq(schema.universities.cityId, schema.cities.id))
    .orderBy(schema.universities.name);
}

export async function getCities() {
  return db
    .select({
      id: schema.cities.id,
      name: schema.cities.name,
      wilaya: schema.cities.wilaya,
      description: schema.cities.description,
      studentPopulationEstimate: schema.cities.studentPopulationEstimate,
      universityCount: sql<number>`(
        select count(*)::int from ${schema.universities}
        where ${schema.universities.cityId} = ${schema.cities.id}
      )`,
    })
    .from(schema.cities)
    .orderBy(desc(schema.cities.studentPopulationEstimate));
}

export async function getResources() {
  return db.select().from(schema.resources).where(eq(schema.resources.status, "published"));
}

export async function getAnnouncements() {
  return db
    .select()
    .from(schema.announcements)
    .orderBy(desc(schema.announcements.pinned), desc(schema.announcements.publishedAt));
}

export async function getOpportunities() {
  return db
    .select()
    .from(schema.opportunities)
    .where(eq(schema.opportunities.status, "published"))
    .orderBy(schema.opportunities.deadline);
}

export async function getStories() {
  return db
    .select({
      id: schema.stories.id,
      title: schema.stories.title,
      slug: schema.stories.slug,
      content: schema.stories.content,
      publishedAt: schema.stories.publishedAt,
      authorName: schema.profiles.displayName,
    })
    .from(schema.stories)
    .innerJoin(schema.profiles, eq(schema.stories.authorId, schema.profiles.userId))
    .where(eq(schema.stories.status, "published"))
    .orderBy(desc(schema.stories.publishedAt));
}

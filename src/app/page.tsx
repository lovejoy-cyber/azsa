import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientDivider } from "@/components/layout/gradient-divider";
import { ArticleCard } from "@/components/news/article-card";
import { EventCard } from "@/components/events/event-card";
import { PostCard } from "@/components/community/post-card";
import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/home/reveal";
import { ImmersiveMediaSection } from "@/components/home/immersive-media-section";
import { getHomePageData } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const { featuredNews, upcomingEvents, recentPosts, stats } = await getHomePageData();

  return (
    <div>
      <Hero stats={stats} />
      <GradientDivider tone="border" />

      <Container className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <Reveal>
            <SectionHeading eyebrow="What's happening" title="Latest news" href="/news" linkLabel="All news" />
          </Reveal>
          {featuredNews.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredNews.map((n, i) => (
                <Reveal key={n.id} delay={i * 0.06}>
                  <ArticleCard
                    title={n.title}
                    slug={n.slug}
                    excerpt={n.excerpt}
                    category={n.category}
                    publishedAt={n.publishedAt}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyRow label="No news published yet -- check back soon." />
          )}
        </section>

        <section className="lg:col-span-2">
          <Reveal>
            <SectionHeading eyebrow="Don't miss out" title="Upcoming events" href="/events" linkLabel="All events" />
          </Reveal>
          {upcomingEvents.length > 0 ? (
            <div className="mt-6 flex flex-col gap-3">
              {upcomingEvents.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.06}>
                  <EventCard
                    title={e.title}
                    slug={e.slug}
                    startAt={e.startAt}
                    location={e.location}
                    cityName={e.cityName}
                    category={e.category}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyRow label="No upcoming events scheduled." />
          )}
        </section>
      </Container>

      <div className="bg-surface-sunken/60">
        <Container className="py-16">
          <Reveal>
            <SectionHeading
              eyebrow="From the community"
              title="Recent conversations"
              href="/community"
              linkLabel="Open community feed"
            />
          </Reveal>
          {recentPosts.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recentPosts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <PostCard
                    id={p.id}
                    content={p.content}
                    topic={p.topic}
                    authorName={p.authorName}
                    likeCount={p.likeCount}
                    commentCount={p.commentCount}
                    createdAt={p.createdAt}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyRow label="No posts yet -- be the first to say hello." />
          )}
        </Container>
      </div>

      <ImmersiveMediaSection
        eyebrow="Life across Algeria"
        title="Four cities. One community."
        body="Oran's coastline, Algiers' embassy district, Constantine's bridges, Annaba's steelworks -- wherever you land, someone from home already has."
      />

      <DirectoryTeaser />
      <ClosingCta />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-600">{eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-gold-700 hover:text-ink sm:inline-flex"
      >
        {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div className="mt-6 rounded-[var(--radius-md)] border border-dashed border-border-strong p-8 text-center text-sm text-ink-faint">
      {label}
    </div>
  );
}

function DirectoryTeaser() {
  const items = [
    {
      href: "/universities",
      title: "Universities",
      desc: "Where our students are enrolled, faculty by faculty.",
      big: true,
    },
    {
      href: "/cities",
      title: "Cities",
      desc: "Find your city's community before you even land.",
      big: false,
    },
    {
      href: "/resources",
      title: "Student resources",
      desc: "Visas, housing, and healthcare -- written by students who've done it.",
      big: false,
    },
    {
      href: "/opportunities",
      title: "Opportunities",
      desc: "Scholarships, internships, and grants worth applying for.",
      big: true,
    },
  ];
  return (
    <Container className="py-20">
      <Reveal>
        <SectionHeading eyebrow="Find your footing" title="Built for the practical stuff" href="/resources" linkLabel="See resources" />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {items.map((it, i) => (
          <Reveal
            key={it.href}
            delay={i * 0.07}
            className={cn(
              "lg:col-span-6",
              it.big && "lg:col-span-7",
              !it.big && "lg:col-span-5",
              i % 2 === 1 && "sm:mt-8 lg:mt-12"
            )}
          >
            <Link
              href={it.href}
              className="glow-on-hover sheen group block h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7"
            >
              <h3 className="font-display text-xl font-semibold text-ink group-hover:text-gold-700">
                {it.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-ink-soft">{it.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

function ClosingCta() {
  return (
    <div className="bg-ink-900 text-white">
      <Container className="flex flex-col items-start gap-5 py-16 sm:flex-row sm:items-center sm:justify-between">
        <Reveal>
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Your community is already here.
            </h2>
            <p className="mt-2 max-w-md text-white/70">
              Create your profile, follow the topics that matter to you, and get embassy
              announcements the moment they're posted.
            </p>
          </div>
        </Reveal>
        <Link href="/signup" className="shrink-0">
          <Button variant="secondary" size="lg">
            Create your profile <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Users, GraduationCap, MapPinned } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StoneDivider } from "@/components/layout/stone-divider";
import { ArticleCard } from "@/components/news/article-card";
import { EventCard } from "@/components/events/event-card";
import { PostCard } from "@/components/community/post-card";
import { getHomePageData } from "@/lib/db/queries";

export default async function HomePage() {
  const { featuredNews, upcomingEvents, recentPosts, stats } = await getHomePageData();

  return (
    <div>
      <Hero stats={stats} />
      <StoneDivider tone="border" />

      <Container className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionHeading eyebrow="What's happening" title="Latest news" href="/news" linkLabel="All news" />
          {featuredNews.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredNews.map((n) => (
                <ArticleCard
                  key={n.id}
                  title={n.title}
                  slug={n.slug}
                  excerpt={n.excerpt}
                  category={n.category}
                  publishedAt={n.publishedAt}
                />
              ))}
            </div>
          ) : (
            <EmptyRow label="No news published yet -- check back soon." />
          )}
        </section>

        <section className="lg:col-span-2">
          <SectionHeading eyebrow="Don't miss out" title="Upcoming events" href="/events" linkLabel="All events" />
          {upcomingEvents.length > 0 ? (
            <div className="mt-6 flex flex-col gap-3">
              {upcomingEvents.map((e) => (
                <EventCard
                  key={e.id}
                  title={e.title}
                  slug={e.slug}
                  startAt={e.startAt}
                  location={e.location}
                  cityName={e.cityName}
                  category={e.category}
                />
              ))}
            </div>
          ) : (
            <EmptyRow label="No upcoming events scheduled." />
          )}
        </section>
      </Container>

      <div className="bg-surface-sunken/60">
        <Container className="py-16">
          <SectionHeading
            eyebrow="From the community"
            title="Recent conversations"
            href="/community"
            linkLabel="Open community feed"
          />
          {recentPosts.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recentPosts.map((p) => (
                <PostCard
                  key={p.id}
                  id={p.id}
                  content={p.content}
                  topic={p.topic}
                  authorName={p.authorName}
                  likeCount={p.likeCount}
                  commentCount={p.commentCount}
                  createdAt={p.createdAt}
                />
              ))}
            </div>
          ) : (
            <EmptyRow label="No posts yet -- be the first to say hello." />
          )}
        </Container>
      </div>

      <DirectoryTeaser />
      <ClosingCta />
    </div>
  );
}

function Hero({ stats }: { stats: { students: number; universities: number; cities: number } }) {
  return (
    <section className="relative overflow-hidden bg-jade-950 text-white">
      <BlockWatermark />
      <Container className="relative grid grid-cols-1 items-center gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-500">
            AZSA · Zimbabwean Students in Algeria
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Far from home,
            <br />
            still within reach of each other.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/70">
            AZSA is where Zimbabwean students across Algeria find each other, trade what
            they've learned the hard way, and hear from the embassy the moment it matters --
            in Oran, Algiers, Constantine, Annaba, and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Join AZSA <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:border-white/60 hover:text-white"
              >
                Browse the community
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard icon={<Users className="h-4 w-4" />} value={stats.students} label="Students on AZSA" />
            <StatCard
              icon={<GraduationCap className="h-4 w-4" />}
              value={stats.universities}
              label="Universities"
            />
            <StatCard icon={<MapPinned className="h-4 w-4" />} value={stats.cities} label="Cities" />
          </dl>
          <p className="mt-3 text-right font-mono text-[11px] text-white/40">Live counts from the AZSA network</p>
        </div>
      </Container>
      <StoneDivider tone="gold" />
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-gold-500">{icon}</div>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-white/60">{label}</p>
    </div>
  );
}

function BlockWatermark() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-[420px] opacity-[0.07]"
      viewBox="0 0 200 200"
      fill="none"
    >
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => (
            <rect
              key={col}
              x={col * 62 + (row % 2 === 0 ? 0 : 20)}
              y={row * 34}
              width={row % 3 === 0 ? 46 : 38}
              height={26}
              fill="white"
            />
          ))}
        </g>
      ))}
    </svg>
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
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-jade-600">{eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-jade-700 hover:text-jade-800 sm:inline-flex"
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
    },
    {
      href: "/cities",
      title: "Cities",
      desc: "Find your city's community before you even land.",
    },
    {
      href: "/resources",
      title: "Student resources",
      desc: "Visas, housing, and healthcare -- written by students who've done it.",
    },
    {
      href: "/opportunities",
      title: "Opportunities",
      desc: "Scholarships, internships, and grants worth applying for.",
    },
  ];
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Find your footing" title="Built for the practical stuff" href="/resources" linkLabel="See resources" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-jade-600/40"
          >
            <h3 className="font-display text-base font-semibold text-ink group-hover:text-jade-700">
              {it.title}
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">{it.desc}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}

function ClosingCta() {
  return (
    <div className="bg-jade-900 text-white">
      <Container className="flex flex-col items-start gap-5 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Your community is already here.
          </h2>
          <p className="mt-2 max-w-md text-white/70">
            Create your profile, follow the topics that matter to you, and get embassy
            announcements the moment they're posted.
          </p>
        </div>
        <Link href="/signup" className="shrink-0">
          <Button variant="secondary" size="lg">
            Create your profile <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    </div>
  );
}

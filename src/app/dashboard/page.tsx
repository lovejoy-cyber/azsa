import Link from "next/link";
import { eq } from "drizzle-orm";
import { CalendarDays, MessageSquare, Bell, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const [profile] = await db
    .select()
    .from(schema.profiles)
    .where(eq(schema.profiles.userId, session.user.id))
    .limit(1);

  const myRegistrations = await db
    .select({
      eventTitle: schema.events.title,
      eventSlug: schema.events.slug,
      startAt: schema.events.startAt,
    })
    .from(schema.eventRegistrations)
    .innerJoin(schema.events, eq(schema.eventRegistrations.eventId, schema.events.id))
    .where(eq(schema.eventRegistrations.userId, session.user.id));

  return (
    <div className="bg-surface-sunken/40 py-10">
      <Container>
        <div className="flex items-center gap-4">
          <Avatar name={profile?.displayName ?? session.user.email} size={56} />
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">
              Welcome back, {profile?.displayName?.split(" ")[0] ?? "there"}
            </h1>
            <p className="text-sm text-ink-soft">
              {profile?.fieldOfStudy ? `${profile.fieldOfStudy} · ` : ""}
              {session.user.role.replace("_", " ")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-gold-700">
                <CalendarDays className="h-4 w-4" />
                <p className="text-sm font-semibold">Your events</p>
              </div>
              {myRegistrations.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-2">
                  {myRegistrations.map((r) => (
                    <li key={r.eventSlug} className="text-sm">
                      <Link href={`/events/${r.eventSlug}`} className="font-medium text-ink hover:text-gold-700">
                        {r.eventTitle}
                      </Link>
                      <p className="text-xs text-ink-faint">{formatDate(r.startAt)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-faint">
                  No events yet.{" "}
                  <Link href="/events" className="font-medium text-gold-700 hover:text-ink-800">
                    Browse events
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-gold-700">
                <MessageSquare className="h-4 w-4" />
                <p className="text-sm font-semibold">Community</p>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                Ask a question, share something useful, or just say hello.
              </p>
              <Link
                href="/community"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-ink-800"
              >
                Open feed <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-gold-700">
                <Bell className="h-4 w-4" />
                <p className="text-sm font-semibold">Announcements</p>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                Official notices from the embassy's student affairs office.
              </p>
              <Link
                href="/announcements"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-ink-800"
              >
                View announcements <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

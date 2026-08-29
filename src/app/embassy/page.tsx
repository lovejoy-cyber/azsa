import { sql } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { Card, CardContent } from "@/components/ui/card";
import { db, schema } from "@/lib/db";
import { EMBASSY_NAV } from "./nav";

export const metadata = { title: "Embassy panel" };

export default async function EmbassyOverviewPage() {
  const [[{ count: studentCount }], [{ count: announcementCount }], [{ count: opportunityCount }]] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(schema.profiles),
      db.select({ count: sql<number>`count(*)::int` }).from(schema.announcements),
      db.select({ count: sql<number>`count(*)::int` }).from(schema.opportunities),
    ]);

  const stats = [
    { label: "Registered students", value: studentCount },
    { label: "Announcements published", value: announcementCount },
    { label: "Open opportunities", value: opportunityCount },
  ];

  return (
    <PanelShell eyebrow="Embassy desk" title="Student affairs overview" navItems={EMBASSY_NAV} activeHref="/embassy">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent>
              <p className="font-display text-3xl font-semibold text-ink">{s.value}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink-faint">
        Use the sections on the left to publish announcements, keep student resources current,
        post opportunities, and view the student directory. These tools are scoped to your
        embassy-admin role and enforced on the server.
      </p>
    </PanelShell>
  );
}

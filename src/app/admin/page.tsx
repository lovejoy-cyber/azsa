import { sql } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { Card, CardContent } from "@/components/ui/card";
import { db, schema } from "@/lib/db";
import { ADMIN_NAV } from "./nav";

export const metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  const [[{ count: userCount }], [{ count: postCount }], [{ count: eventCount }], [{ count: openReports }]] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(schema.users),
      db.select({ count: sql<number>`count(*)::int` }).from(schema.posts),
      db.select({ count: sql<number>`count(*)::int` }).from(schema.events),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(schema.reports)
        .where(sql`${schema.reports.status} = 'open'`),
    ]);

  const stats = [
    { label: "Total users", value: userCount },
    { label: "Community posts", value: postCount },
    { label: "Events", value: eventCount },
    { label: "Open reports", value: openReports },
  ];

  return (
    <PanelShell eyebrow="Super admin" title="Platform overview" navItems={ADMIN_NAV} activeHref="/admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        Use the sections on the left to manage users and roles, review reported content, and
        publish news. Every action here is checked against your role on the server, not just
        hidden in the UI.
      </p>
    </PanelShell>
  );
}

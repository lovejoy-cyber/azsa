import { eq, desc } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { db, schema } from "@/lib/db";
import { ADMIN_NAV } from "../nav";
import { ResolveButtons } from "./resolve-buttons";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Moderation" };

export default async function ModerationPage() {
  const reports = await db
    .select({
      id: schema.reports.id,
      targetType: schema.reports.targetType,
      targetId: schema.reports.targetId,
      reason: schema.reports.reason,
      createdAt: schema.reports.createdAt,
      reporterName: schema.profiles.displayName,
    })
    .from(schema.reports)
    .innerJoin(schema.profiles, eq(schema.reports.reporterId, schema.profiles.userId))
    .where(eq(schema.reports.status, "open"))
    .orderBy(desc(schema.reports.createdAt));

  return (
    <PanelShell eyebrow="Super admin" title="Moderation queue" navItems={ADMIN_NAV} activeHref="/admin/moderation">
      {reports.length > 0 ? (
        <div className="flex flex-col gap-3">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {r.targetType} reported by {r.reporterName}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">{r.reason}</p>
                <p className="mt-1 font-mono text-xs text-ink-faint">{formatDate(r.createdAt)}</p>
              </div>
              <ResolveButtons reportId={r.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--radius-md)] border border-dashed border-border-strong p-10 text-center text-ink-faint">
          No open reports. The queue is clear.
        </div>
      )}
    </PanelShell>
  );
}

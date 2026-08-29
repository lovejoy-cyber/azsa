import { desc } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db, schema } from "@/lib/db";
import { EMBASSY_NAV } from "../nav";
import { createAnnouncement } from "@/lib/actions/embassy";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Announcements" };

export default async function EmbassyAnnouncementsPage() {
  const announcements = await db
    .select()
    .from(schema.announcements)
    .orderBy(desc(schema.announcements.publishedAt));

  return (
    <PanelShell eyebrow="Embassy desk" title="Announcements" navItems={EMBASSY_NAV} activeHref="/embassy/announcements">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form action={createAnnouncement} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="font-display text-base font-semibold text-ink">New announcement</p>
          <label className="block">
            <span className="text-sm font-medium text-ink">Title</span>
            <input name="title" required className="input" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Audience</span>
            <select name="audience" className="input" defaultValue="all">
              <option value="all">Everyone</option>
              <option value="students">Students only</option>
              <option value="embassy">Embassy staff</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Content</span>
            <textarea name="content" required rows={5} className="textarea" />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="pinned" className="h-4 w-4 rounded border-border" />
            Pin to top
          </label>
          <Button type="submit" className="mt-1">Publish announcement</Button>
        </form>

        <div className="flex flex-col gap-3">
          {announcements.map((a) => (
            <div key={a.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <div className="flex items-center gap-2">
                {a.pinned && <Badge tone="brick">Pinned</Badge>}
                <Badge tone="neutral">{a.audience}</Badge>
              </div>
              <p className="mt-2 font-semibold text-ink">{a.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{a.content}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">{formatDate(a.publishedAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

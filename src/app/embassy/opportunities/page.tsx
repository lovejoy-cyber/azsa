import { PanelShell } from "@/components/admin/panel-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db, schema } from "@/lib/db";
import { EMBASSY_NAV } from "../nav";
import { createOpportunity } from "@/lib/actions/embassy";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Manage opportunities" };

export default async function EmbassyOpportunitiesPage() {
  const opportunities = await db.select().from(schema.opportunities);

  return (
    <PanelShell eyebrow="Embassy desk" title="Opportunities" navItems={EMBASSY_NAV} activeHref="/embassy/opportunities">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form action={createOpportunity} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="font-display text-base font-semibold text-ink">Post an opportunity</p>
          <label className="block">
            <span className="text-sm font-medium text-ink">Title</span>
            <input name="title" required className="input" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Type</span>
            <select name="type" className="input" defaultValue="scholarship">
              <option value="scholarship">Scholarship</option>
              <option value="internship">Internship</option>
              <option value="job">Job</option>
              <option value="volunteer">Volunteer</option>
              <option value="grant">Grant</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Description</span>
            <textarea name="description" required rows={4} className="textarea" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Deadline (optional)</span>
            <input name="deadline" type="date" className="input" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Link (optional)</span>
            <input name="link" type="url" className="input" placeholder="https://" />
          </label>
          <Button type="submit" className="mt-1">Publish opportunity</Button>
        </form>

        <div className="flex flex-col gap-3">
          {opportunities.map((o) => (
            <div key={o.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <Badge tone="gold">{o.type}</Badge>
              <p className="mt-2 font-semibold text-ink">{o.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{o.description}</p>
              {o.deadline && (
                <p className="mt-1 font-mono text-xs text-brick-600">Deadline {formatDate(o.deadline)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

import { PanelShell } from "@/components/admin/panel-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db, schema } from "@/lib/db";
import { EMBASSY_NAV } from "../nav";
import { createResource } from "@/lib/actions/embassy";

export const metadata = { title: "Manage resources" };

export default async function EmbassyResourcesPage() {
  const resources = await db.select().from(schema.resources);

  return (
    <PanelShell eyebrow="Embassy desk" title="Student resources" navItems={EMBASSY_NAV} activeHref="/embassy/resources">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form action={createResource} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="font-display text-base font-semibold text-ink">Add a resource</p>
          <label className="block">
            <span className="text-sm font-medium text-ink">Title</span>
            <input name="title" required className="input" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Category</span>
            <select name="category" className="input" defaultValue="visa">
              <option value="visa">Visa & residence</option>
              <option value="housing">Housing</option>
              <option value="healthcare">Healthcare</option>
              <option value="academic">Academic</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Description</span>
            <textarea name="description" required rows={4} className="textarea" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Link (optional)</span>
            <input name="link" type="url" className="input" placeholder="https://" />
          </label>
          <Button type="submit" className="mt-1">Publish resource</Button>
        </form>

        <div className="flex flex-col gap-3">
          {resources.map((r) => (
            <div key={r.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <Badge tone="jade">{r.category}</Badge>
              <p className="mt-2 font-semibold text-ink">{r.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

import { desc } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db, schema } from "@/lib/db";
import { ADMIN_NAV } from "../nav";
import { createNewsArticle } from "@/lib/actions/admin";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Manage news" };

export default async function AdminNewsPage() {
  const articles = await db.select().from(schema.newsArticles).orderBy(desc(schema.newsArticles.createdAt));

  return (
    <PanelShell eyebrow="Super admin" title="News" navItems={ADMIN_NAV} activeHref="/admin/news">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form action={createNewsArticle} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5">
          <p className="font-display text-base font-semibold text-ink">Publish an article</p>
          <label className="block">
            <span className="text-sm font-medium text-ink">Title</span>
            <input name="title" required className="input" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Category</span>
            <select name="category" className="input" defaultValue="news">
              <option value="news">News</option>
              <option value="embassy">Embassy</option>
              <option value="academic">Academic</option>
              <option value="community">Community</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Excerpt</span>
            <textarea name="excerpt" required rows={2} className="textarea" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Content</span>
            <textarea name="content" required rows={6} className="textarea" />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
            Feature on homepage
          </label>
          <Button type="submit" className="mt-1">Publish</Button>
        </form>

        <div className="flex flex-col gap-3">
          {articles.map((a) => (
            <div key={a.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <div className="flex items-center gap-2">
                <Badge tone={a.status === "published" ? "ink" : "neutral"}>{a.status}</Badge>
                {a.featured && <Badge tone="gold">Featured</Badge>}
              </div>
              <p className="mt-2 font-semibold text-ink">{a.title}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                {a.publishedAt ? formatDate(a.publishedAt) : "Not published"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

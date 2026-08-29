import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Pin } from "lucide-react";
import { getAnnouncements } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Announcements</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Official notices from the embassy
          </h1>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        {announcements.length > 0 ? (
          <div className="flex flex-col gap-4">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {a.pinned && <Pin className="h-3.5 w-3.5 text-brick-600" />}
                    <Badge tone={a.pinned ? "brick" : "neutral"}>{a.audience}</Badge>
                  </div>
                  <time className="font-mono text-xs text-ink-faint">{formatDate(a.publishedAt)}</time>
                </div>
                <h3 className="mt-2.5 font-display text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 whitespace-pre-line text-sm text-ink-soft">{a.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-faint">No announcements yet.</p>
        )}
      </Container>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bell, Heart, MessageCircle, CornerUpLeft, Megaphone } from "lucide-react";

type Notification = {
  id: string;
  type: "like" | "comment" | "reply" | "follow_topic_post" | "event_reminder" | "announcement" | "report_update" | "system";
  payload: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
};

const ICONS = {
  like: Heart,
  comment: MessageCircle,
  reply: CornerUpLeft,
  announcement: Megaphone,
} as const;

function describe(n: Notification): { text: string; href: string } {
  switch (n.type) {
    case "like":
      return { text: "Someone liked your post", href: `/community/${n.payload.postId}` };
    case "comment":
      return { text: "New comment on your post", href: `/community/${n.payload.postId}` };
    case "reply":
      return { text: "Someone replied to your comment", href: `/community/${n.payload.postId}` };
    case "announcement":
      return { text: `Announcement: ${n.payload.title ?? ""}`, href: "/announcements" };
    default:
      return { text: "New notification", href: "#" };
  }
}

export function NotificationBell() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!cancelled) setUnreadCount(data.unreadCount ?? 0);
      } catch {
        // silent -- notifications are a nicety, not critical path
      }
    }
    poll();
    const interval = setInterval(poll, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [status]);

  async function handleOpen() {
    const next = !open;
    setOpen(next);
    if (next && !loaded) {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications ?? []);
      setLoaded(true);
    }
    if (next && unreadCount > 0) {
      setUnreadCount(0);
      fetch("/api/notifications/read-all", { method: "POST" }).catch(() => {});
    }
  }

  if (status !== "authenticated") return null;

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Notifications"
        className="relative rounded-[var(--radius-sm)] p-2 text-white/85 hover:bg-white/10 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brick-500 px-1 font-mono text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-80 rounded-[var(--radius-md)] border border-white/10 bg-jade-900 p-1.5 shadow-[var(--shadow-card)]">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/50">
            Notifications
          </p>
          {notifications.length > 0 ? (
            <div className="flex max-h-80 flex-col overflow-y-auto">
              {notifications.map((n) => {
                const { text, href } = describe(n);
                const Icon = ICONS[n.type as keyof typeof ICONS] ?? Bell;
                return (
                  <Link
                    key={n.id}
                    href={href}
                    className="flex items-start gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-white/90 hover:bg-white/10"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <span>{text}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="px-3 py-4 text-sm text-white/50">You're all caught up.</p>
          )}
        </div>
      )}
    </div>
  );
}

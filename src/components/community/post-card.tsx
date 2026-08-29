"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, MessageCircle, Flag } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return "just now";
}

export function PostCard({
  id,
  content,
  topic,
  authorName,
  authorField,
  likeCount,
  commentCount,
  createdAt,
  linkToDetail = true,
}: {
  id: string;
  content: string;
  topic: string;
  authorName: string;
  authorField?: string | null;
  likeCount: number;
  commentCount: number;
  createdAt: Date | string;
  linkToDetail?: boolean;
}) {
  const { status } = useSession();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likeCount);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  async function toggleLike() {
    if (status !== "authenticated") {
      setError("Log in to like posts.");
      return;
    }
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/posts/${id}/like`, {
          method: nextLiked ? "POST" : "DELETE",
        });
        if (!res.ok) throw new Error();
      } catch {
        // revert on failure
        setLiked(!nextLiked);
        setCount((c) => c + (nextLiked ? -1 : 1));
        setError("Couldn't update your like — try again.");
      }
    });
  }

  async function submitReport() {
    if (status !== "authenticated") {
      setReportError("Log in to report a post.");
      return;
    }
    if (reportReason.trim().length < 3) {
      setReportError("Say a little more about why you're reporting this.");
      return;
    }
    setReportError(null);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType: "post", targetId: id, reason: reportReason }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReportError(data.error ?? "Couldn't submit your report.");
        return;
      }
      setReportSent(true);
      setReportReason("");
    } catch {
      setReportError("Network error — please try again.");
    }
  }

  const Body = (
    <>
      <div className="flex items-start gap-3">
        <Avatar name={authorName} size={38} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-ink">{authorName}</p>
            {authorField && <span className="truncate text-xs text-ink-faint">· {authorField}</span>}
          </div>
          <p className="text-xs text-ink-faint">{timeAgo(createdAt)}</p>
        </div>
        <Badge tone="neutral">{topic}</Badge>
      </div>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink">{content}</p>
    </>
  );

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
      {linkToDetail ? (
        <Link href={`/community/${id}`} className="block">
          {Body}
        </Link>
      ) : (
        Body
      )}

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
        <button
          onClick={toggleLike}
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-sm font-medium transition-colors",
            liked ? "text-brick-600" : "text-ink-soft hover:text-brick-600"
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          {count}
        </button>
        <Link
          href={`/community/${id}`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-sm font-medium text-ink-soft hover:text-jade-700"
        >
          <MessageCircle className="h-4 w-4" />
          {commentCount}
        </Link>
        <button
          onClick={() => setReportOpen((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium text-ink-faint hover:text-ink-soft"
          title="Report this post"
        >
          <Flag className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-error">{error}</p>}

      {reportOpen && (
        <div className="mt-3 rounded-[var(--radius-sm)] border border-border bg-surface-sunken p-3">
          {reportSent ? (
            <p className="text-xs text-jade-700">
              Thanks — a moderator will review this. You won't see this post reported again.
            </p>
          ) : (
            <>
              <label className="block text-xs font-medium text-ink-soft">
                Why are you reporting this post?
              </label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={2}
                maxLength={400}
                className="mt-1.5 block w-full resize-none rounded-[var(--radius-xs)] border border-border bg-surface px-2.5 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-jade-600 focus:outline-none"
                placeholder="Spam, harassment, misinformation…"
              />
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={submitReport}
                  className="rounded-[var(--radius-xs)] bg-brick-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-brick-500"
                >
                  Submit report
                </button>
                <button
                  onClick={() => setReportOpen(false)}
                  className="text-xs font-medium text-ink-faint hover:text-ink-soft"
                >
                  Cancel
                </button>
              </div>
              {reportError && <p className="mt-1.5 text-xs text-error">{reportError}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

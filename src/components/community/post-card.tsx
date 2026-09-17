"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, MessageCircle, Flag, Share2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
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

  async function toggleLike(e: React.MouseEvent) {
    e.stopPropagation();
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={authorName} size={42} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-bold text-white transition-colors group-hover:text-gold-400">
                {authorName}
              </p>
              {authorField && <span className="truncate text-xs font-mono text-white/50">· {authorField}</span>}
            </div>
            <p className="text-[11px] font-mono text-white/40">{timeAgo(createdAt)}</p>
          </div>
        </div>
        <Badge tone="gold-glow">{topic}</Badge>
      </div>
      <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-white/80">{content}</p>
    </>
  );

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl shadow-xl hover:border-gold-500/30 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.1)] transition-all duration-300"
    >
      {linkToDetail ? (
        <Link href={`/community/${id}`} className="block">
          {Body}
        </Link>
      ) : (
        Body
      )}

      {/* Action Toolbar */}
      <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs font-mono">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={toggleLike}
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all",
            liked
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_12px_rgba(225,29,72,0.3)]"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-rose-400 border border-white/5"
          )}
        >
          <Heart className={cn("h-4 w-4 transition-transform", liked && "fill-current scale-110")} />
          <span>{count}</span>
        </motion.button>

        <Link
          href={`/community/${id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 font-medium text-white/70 hover:bg-white/10 hover:text-gold-400 border border-white/5 transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{commentCount}</span>
        </Link>

        <button
          onClick={() => setReportOpen((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
          title="Report this post"
        >
          <Flag className="h-3.5 w-3.5" />
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}

      {reportOpen && (
        <div className="mt-4 rounded-xl border border-white/10 bg-ink-950/90 p-4 backdrop-blur-md">
          {reportSent ? (
            <p className="text-xs text-gold-400">
              Report received. A moderator will review this promptly.
            </p>
          ) : (
            <>
              <label className="block text-xs font-medium text-white/70 mb-2">
                Why are you reporting this post?
              </label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={2}
                maxLength={400}
                className="w-full resize-none rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold-500 focus:outline-none"
                placeholder="Spam, harassment, misinformation…"
              />
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={submitReport}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
                >
                  Submit report
                </button>
                <button
                  onClick={() => setReportOpen(false)}
                  className="text-xs font-medium text-white/50 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
              {reportError && <p className="mt-2 text-xs text-rose-400">{reportError}</p>}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

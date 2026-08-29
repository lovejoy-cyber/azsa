"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Comment = {
  id: string;
  content: string;
  createdAt: string | Date;
  authorId: string;
  authorName: string;
};

export function CommentThread({ postId, initialComments }: { postId: string; initialComments: Comment[] }) {
  const { status } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't post your comment.");
        return;
      }
      setComments((c) => [
        ...c,
        {
          id: data.comment.id,
          content: data.comment.content,
          createdAt: data.comment.createdAt,
          authorId: data.comment.authorId,
          authorName: "You",
        },
      ]);
      setContent("");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <h2 className="font-display text-lg font-semibold text-ink">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </h2>

      <div className="mt-4 flex flex-col gap-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar name={c.authorName} size={32} />
            <div className="rounded-[var(--radius-sm)] bg-surface-sunken px-3.5 py-2.5">
              <p className="text-sm font-semibold text-ink">{c.authorName}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

      {status === "authenticated" ? (
        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment…"
            className="input mt-0 flex-1"
          />
          <Button type="submit" loading={loading} disabled={!content.trim()}>
            Reply
          </Button>
        </form>
      ) : (
        <p className="mt-5 text-sm text-ink-soft">
          <Link href="/login" className="font-semibold text-jade-700 hover:text-jade-800">
            Log in
          </Link>{" "}
          to join the conversation.
        </p>
      )}
      {error && <p className="mt-2 text-xs text-error">{error}</p>}
    </div>
  );
}

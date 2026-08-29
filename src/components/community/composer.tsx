"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TOPICS = ["general", "academic", "housing", "social", "visa", "jobs"];

export function Composer({ onPosted }: { onPosted?: () => void }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status !== "authenticated") {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface p-5 text-sm text-ink-soft">
        <Link href="/login?callbackUrl=/community" className="font-semibold text-gold-700 hover:text-ink-800">
          Log in
        </Link>{" "}
        to post in the community.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, topic, images: [] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't publish your post.");
        setLoading(false);
        return;
      }
      setContent("");
      router.refresh();
      onPosted?.();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`What's on your mind, ${session?.user?.displayName?.split(" ")[0] ?? "there"}?`}
        rows={3}
        maxLength={4000}
        className="textarea"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 text-sm text-ink-soft"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <Button type="submit" loading={loading} disabled={!content.trim()}>
          Post
        </Button>
      </div>
      {error && <p className="mt-2 text-xs text-error">{error}</p>}
    </form>
  );
}

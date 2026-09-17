"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";

const KINDS = ["Side hustle", "Service", "Story", "Event idea"] as const;

/**
 * Lets a student put something forward to be listed on AZSA. Submits into
 * the staff notification queue via /api/requests.
 */
export function ListingRequestForm() {
  const [kind, setKind] = useState<string>(KINDS[0]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit() {
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, title, detail, contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("done");
      setTitle("");
      setDetail("");
      setContact("");
    } catch {
      setError("Couldn't reach the server. Try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-md)] border border-emerald-500/30 bg-emerald-500/8 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
        <p className="mt-3 font-display text-lg font-semibold text-ink">Sent to the team</p>
        <p className="mt-1 text-sm text-ink-soft">
          An admin will review it and get back to you.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-700 hover:text-ink"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
      <div className="flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
              kind === k
                ? "bg-gold-500 text-ink-950 shadow-[0_0_20px_-4px_rgba(212,175,55,0.7)]"
                : "bg-surface-sunken text-ink-soft hover:text-ink"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={kind === "Side hustle" ? "e.g. Custom cakes for events" : "Short title"}
        className="mt-4 w-full rounded-[var(--radius-sm)] border border-border bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold-500"
      />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        rows={4}
        placeholder="Tell the team what it is, who it's for, and anything they should know."
        className="mt-3 w-full resize-y rounded-[var(--radius-sm)] border border-border bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold-500"
      />
      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="How should we reach you? (WhatsApp, email...)"
        className="mt-3 w-full rounded-[var(--radius-sm)] border border-border bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold-500"
      />

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <Button
        variant="secondary"
        className="mt-4 w-full"
        onClick={submit}
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending..." : "Send to the AZSA team"}
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}

"use client";

import { Sparkles } from "lucide-react";

/**
 * Replays the cinematic opening on demand. The splash clears itself after
 * a few seconds, which makes it easy to miss (or to believe it isn't
 * there at all) -- this makes it reviewable without reloading the page.
 */
export function ReplayIntro() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("azsa:replay-intro"))}
      aria-label="Replay the opening sequence"
      title="Replay the opening sequence"
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--zw-gold)]/40 bg-black/75 text-[color:var(--zw-gold)] backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-[color:var(--zw-gold)] hover:shadow-[0_0_0_1px_rgba(253,209,22,0.5),0_0_34px_-4px_rgba(253,209,22,0.8)]"
    >
      <Sparkles className="h-5 w-5" />
    </button>
  );
}

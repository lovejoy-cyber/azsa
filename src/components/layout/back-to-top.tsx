"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Explicit "back to the top" control. Previously the only way back was
 * clicking the logo, which isn't discoverable -- this appears once the
 * user has scrolled past the first screen.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-ink-950/80 text-gold-500 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-gold-500 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_0_34px_-4px_rgba(212,175,55,0.65)] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

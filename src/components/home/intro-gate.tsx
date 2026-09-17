"use client";

import { useEffect, useState } from "react";
import { KineticIntro } from "@/components/home/kinetic-intro";

/**
 * Mounts the opening sequence over the site and clears it when the
 * timeline reports done. Scroll is locked while it plays, and a click
 * anywhere skips -- students open this platform repeatedly, so the
 * sequence must never become a gate they can't get past.
 */
export function IntroGate() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  function dismiss() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => setShow(false), 900);
  }

  if (!mounted || !show) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[9999] transition-all duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] ${
        leaving ? "pointer-events-none scale-[1.1] opacity-0 blur-md" : ""
      }`}
    >
      <KineticIntro onDone={dismiss} />
    </div>
  );
}

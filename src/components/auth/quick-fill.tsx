"use client";

/**
 * One-tap credential fill for the test accounts. Typing the password by
 * hand is an easy place to lose the trailing "!" -- these buttons remove
 * that failure mode entirely.
 */
const ACCOUNTS = [
  { role: "Super admin", email: "admin@azsa.dz", tone: "gold" },
  { role: "Embassy", email: "embassy@azsa.dz", tone: "emerald" },
  { role: "Moderator", email: "farai.ndlovu@azsa.dz", tone: "plum" },
  { role: "Student", email: "tanaka.moyo@azsa.dz", tone: "azure" },
] as const;

const PASSWORD = process.env.NEXT_PUBLIC_SEED_PASSWORD ?? "";

const TONES: Record<string, string> = {
  gold: "border-gold-500/40 text-gold-700 hover:bg-gold-500/12 hover:border-gold-500",
  emerald: "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/12 hover:border-emerald-500",
  plum: "border-plum-500/40 text-plum-600 hover:bg-plum-500/12 hover:border-plum-500",
  azure: "border-azure-500/40 text-azure-600 hover:bg-azure-500/12 hover:border-azure-500",
};

export function QuickFill() {
  // Never render credential helpers in production. Set
  // NEXT_PUBLIC_SHOW_TEST_LOGINS=true in a local/staging .env to enable.
  if (process.env.NEXT_PUBLIC_SHOW_TEST_LOGINS !== "true") return null;

  function fill(email: string) {
    const e = document.querySelector<HTMLInputElement>('input[type="email"]');
    const p = document.querySelector<HTMLInputElement>('input[type="password"]');
    if (!e || !p) return;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(e, email);
    e.dispatchEvent(new Event("input", { bubbles: true }));
    setter?.call(p, PASSWORD);
    p.dispatchEvent(new Event("input", { bubbles: true }));
  }

  return (
    <div className="mt-6 rounded-[var(--radius-md)] border border-border bg-surface-sunken/60 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        Test sign-in &mdash; tap to fill
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {ACCOUNTS.map((a) => (
          <button
            key={a.email}
            type="button"
            onClick={() => fill(a.email)}
            className={`rounded-[var(--radius-sm)] border px-3 py-2 text-left text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 ${TONES[a.tone]}`}
          >
            {a.role}
          </button>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-faint">
        Local development only &mdash; not shown in production.
      </p>
    </div>
  );
}

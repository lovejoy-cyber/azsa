import Link from "next/link";
import { Container } from "@/components/ui/container";

export function PanelShell({
  eyebrow,
  title,
  navItems,
  activeHref,
  children,
}: {
  eyebrow: string;
  title: string;
  navItems: { href: string; label: string }[];
  activeHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-sunken/40 py-10">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-600">{eyebrow}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const active = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "shrink-0 rounded-[var(--radius-sm)] bg-gold-500 px-3 py-2 text-sm font-semibold text-ink-950"
                      : "shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface-sunken"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}

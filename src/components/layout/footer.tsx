import Link from "next/link";
import { Container } from "@/components/ui/container";
import { StoneDivider } from "@/components/layout/stone-divider";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Community",
    links: [
      { href: "/community", label: "Community feed" },
      { href: "/events", label: "Events" },
      { href: "/stories", label: "Student stories" },
    ],
  },
  {
    title: "Information",
    links: [
      { href: "/news", label: "News" },
      { href: "/announcements", label: "Announcements" },
      { href: "/opportunities", label: "Opportunities" },
    ],
  },
  {
    title: "Directory",
    links: [
      { href: "/universities", label: "Universities" },
      { href: "/cities", label: "Cities" },
      { href: "/resources", label: "Student resources" },
    ],
  },
  {
    title: "AZSA",
    links: [
      { href: "/about", label: "About AZSA" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-jade-950 text-white">
      <StoneDivider tone="gold" />
      <Container className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-4">
          <p className="flex items-center gap-2 font-display text-2xl font-semibold">
            AZSA <span aria-hidden className="text-xl">🇿🇼</span>
          </p>
          <p className="mt-2 max-w-md text-sm text-white/65">
            Zimbabwean Students in Algeria — a community platform for news, events,
            resources and mutual support, built by and for the students it serves.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-gold-500">
            Unity · Freedom · Work
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              {col.title}
            </p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} AZSA. Built by the community, for the community.</p>
        <p>Demo content used throughout for illustration.</p>
      </Container>
    </footer>
  );
}

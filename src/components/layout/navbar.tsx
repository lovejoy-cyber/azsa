"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, LayoutDashboard, ShieldCheck, Building2, LogOut } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/layout/notification-bell";
import { KuduMark } from "@/components/layout/kudu-mark";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
];

const moreLinks = [
  { href: "/resources", label: "Student resources" },
  { href: "/universities", label: "Universities" },
  { href: "/cities", label: "Cities" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/announcements", label: "Announcements" },
  { href: "/stories", label: "Stories" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-5">
      <div className="glass-panel mx-auto max-w-6xl rounded-[var(--radius-xl)] text-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <KuduMark />
          <span className="font-display text-lg font-semibold tracking-tight">AZSA</span>
          <span aria-hidden className="text-base leading-none">🇿🇼</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryLinks.map((l) => (
            <NavLink key={l.href} href={l.href} active={pathname.startsWith(l.href)}>
              {l.label}
            </NavLink>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 120)}
              className="flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={moreOpen}
            >
              More <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-[var(--radius-md)] border border-white/10 bg-ink-900 p-1.5 shadow-[var(--shadow-card)]">
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink href="/about" active={pathname === "/about"}>
            About
          </NavLink>
          <NavLink href="/contact" active={pathname === "/contact"}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {status === "authenticated" && session?.user ? (
            <>
              <NotificationBell />
              <UserMenu
                name={session.user.displayName || session.user.email}
                role={session.user.role}
              />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary" size="sm">
                  Join AZSA
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-gold-500/10 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...primaryLinks, ...moreLinks, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[15px] font-medium text-white/90 hover:bg-white/10"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
              {status === "authenticated" && session?.user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-white/25 text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-white hover:bg-white/10"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-white/25 text-white">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Join AZSA
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

function UserMenu({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-2 rounded-[var(--radius-sm)] py-1 pl-1 pr-2.5 hover:bg-white/10"
      >
        <Avatar name={name} size={30} />
        <ChevronDown className="h-3.5 w-3.5 text-white/70" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-[var(--radius-md)] border border-white/10 bg-ink-900 p-1.5 shadow-[var(--shadow-card)]">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/90 hover:bg-white/10">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          {role === "embassy_admin" && (
            <Link href="/embassy" className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/90 hover:bg-white/10">
              <Building2 className="h-4 w-4" /> Embassy panel
            </Link>
          )}
          {role === "super_admin" && (
            <Link href="/admin" className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/90 hover:bg-white/10">
              <ShieldCheck className="h-4 w-4" /> Admin panel
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}



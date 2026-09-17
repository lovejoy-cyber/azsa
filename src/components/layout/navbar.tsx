"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, LayoutDashboard, ShieldCheck, Building2, LogOut } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/layout/notification-bell";
import Image from "next/image";
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
  { href: "/enterprise", label: "Student enterprise" },
  { href: "/announcements", label: "Announcements" },
  { href: "/stories", label: "Stories" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-4 z-50 px-3 sm:px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-ink-950/80 p-1.5 text-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl"
      >
        <Container className="flex h-14 items-center justify-between px-3 sm:px-4">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-500 to-emerald-500 opacity-40 blur-sm transition-opacity group-hover:opacity-100" />
              <Image
                src="/images/azsa-logo.png"
                alt="AZSA — Association of Zimbabwean Students in Algeria"
                width={36}
                height={36}
                className="relative h-9 w-9 rounded-full object-contain ring-1 ring-white/20"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-gold-400">
                AZSA
              </span>
              <span aria-hidden className="text-sm">🇿🇼</span>
            </div>
          </Link>

          {/* Desktop Primary Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryLinks.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname.startsWith(l.href)}>
                {l.label}
              </NavLink>
            ))}

            <div className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                aria-expanded={moreOpen}
              >
                More <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", moreOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/15 bg-ink-950/95 p-2 shadow-2xl backdrop-blur-2xl"
                  >
                    {moreLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block rounded-xl px-3.5 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-gold-400"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>
              Contact
            </NavLink>
          </nav>

          {/* User / Auth Actions */}
          <div className="hidden items-center gap-3 lg:flex">
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
                  <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider font-semibold">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    Join AZSA
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1 text-white lg:hidden hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
            >
              <Container className="flex flex-col gap-1.5 py-4">
                {[...primaryLinks, ...moreLinks, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(
                  (l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-gold-400"
                    >
                      {l.label}
                    </Link>
                  )
                )}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {status === "authenticated" && session?.user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-center">
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center text-rose-400 hover:bg-rose-500/10"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-center">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setOpen(false)}>
                        <Button variant="secondary" size="sm" className="w-full justify-center">
                          Join AZSA
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
        active ? "text-gold-300 font-semibold" : "text-white/80 hover:text-white"
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl bg-white/10 border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

function UserMenu({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1 pl-1 pr-3 transition-colors hover:bg-white/10"
      >
        <Avatar name={name} size={28} />
        <span className="text-xs font-medium text-white/90 max-w-[100px] truncate">{name}</span>
        <ChevronDown className="h-3 w-3 text-white/70" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/15 bg-ink-950/95 p-1.5 shadow-2xl backdrop-blur-2xl"
          >
            <Link href="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-gold-400">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            {role === "embassy_admin" && (
              <Link href="/embassy" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-gold-400">
                <Building2 className="h-4 w-4" /> Embassy panel
              </Link>
            )}
            {role === "super_admin" && (
              <Link href="/admin" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-gold-400">
                <ShieldCheck className="h-4 w-4" /> Admin panel
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-400 transition-colors hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

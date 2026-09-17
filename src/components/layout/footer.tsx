import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.68.94 3.35.63 4.14.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.32 1.36 20.65.94 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32M12 16a4 4 0 110-8 4 4 0 010 8m7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zim_students_in_algeria?igsi=cDYxY2pxcGhyeTdk",
    Icon: InstagramIcon,
    isExternal: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582424462700",
    Icon: FacebookIcon,
    isExternal: true,
  },
  {
    label: "Request WhatsApp Group Access",
    href: "/contact?channel=whatsapp",
    Icon: MessageCircle,
    isExternal: false,
  },
  {
    label: "Email Embassy Desk",
    href: "mailto:zimalgiers@zimfa.gov.zw",
    Icon: Mail,
    isExternal: true,
  },
];

const columns = [
  {
    title: "Community",
    links: [
      { href: "/community", label: "Community Feed" },
      { href: "/events", label: "Events & Gatherings" },
      { href: "/stories", label: "Student Stories" },
    ],
  },
  {
    title: "Information",
    links: [
      { href: "/news", label: "Official News" },
      { href: "/announcements", label: "Announcements" },
      { href: "/opportunities", label: "Opportunities" },
    ],
  },
  {
    title: "Directory",
    links: [
      { href: "/universities", label: "Universities" },
      { href: "/cities", label: "Cities Guide" },
      { href: "/resources", label: "Student Resources" },
    ],
  },
  {
    title: "AZSA",
    links: [
      { href: "/about", label: "About Sovereignty" },
      { href: "/contact", label: "Contact & Embassy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-black text-white border-t border-white/10 film-grain">
      {/* Background Aurora Mesh */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[150px] opacity-25 bg-gradient-to-t from-gold-500/30 via-emerald-500/20 to-transparent" />

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gold-500/40 blur-sm group-hover:bg-gold-400" />
                <Image
                  src="/images/azsa-logo.png"
                  alt="AZSA"
                  width={48}
                  height={48}
                  className="relative h-12 w-12 rounded-full object-contain ring-1 ring-white/20"
                />
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-gold-400 transition-colors">
                AZSA
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Association of Zimbabwean Students in Algeria. Empowering academic excellence,
              cultural sovereignty, and student welfare with the central campus hub in Algiers.
            </p>

            {/* Zimbabwe National Motto Emblem */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase shadow-[0_0_15px_rgba(255,215,0,0.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span>Unity • Freedom • Work</span>
            </div>

            {/* Official Social Links & Request Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIALS.map((s) => (
                <Magnetic key={s.label} strength={0.3}>
                  <a
                    href={s.href}
                    target={s.isExternal ? "_blank" : undefined}
                    rel={s.isExternal ? "noreferrer" : undefined}
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/20 hover:text-gold-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-1"
                  >
                    <s.Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-400/90">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          {link.label}
                        </span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-gold-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} AZSA • Sovereign Chapter Algeria. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Official Student Affairs
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <Link href="/about" className="hover:text-white/70 transition-colors">
              Sovereignty & Governance
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

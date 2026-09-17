import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Mail, MessageSquareText, MapPin, Phone, Clock, Landmark, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact & Embassy Student Desk — AZSA" };

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Diplomatic Channel & Liaison 🇿🇼"
        title="Get in Touch & Official Support"
        description="Official contact channels for the Embassy of the Republic of Zimbabwe in Algiers and the AZSA Student Governance Board."
        tone="gold"
        stats={[
          { label: "Embassy Desk", value: "Algiers" },
          { label: "Office Days", value: "Sun – Thu" },
          { label: "Urgent Enquiries", value: "24h Priority" },
        ]}
      />

      <Container className="max-w-5xl py-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Official Embassy Card */}
          <div className="sm:col-span-2">
            <SpotlightCard
              spotlightColor="rgba(255, 215, 0, 0.18)"
              className="border-gold-500/30 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/30 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Embassy of the Republic of Zimbabwe
                  </h2>
                  <p className="font-mono text-xs text-gold-400/90 uppercase tracking-wider">
                    Student Affairs & Consular Division • Algiers
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gold-400 border border-white/10">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Chancery Address
                    </dt>
                    <dd className="mt-1 text-sm text-white/80 leading-relaxed">
                      88 Lotissement Sokna 2, Chéraga, Algiers, Algeria
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-400 border border-white/10">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Direct Telephone Lines
                    </dt>
                    <dd className="mt-1 text-sm text-white/80 font-mono">
                      <a href="tel:+21320397661" className="hover:text-gold-400 transition-colors">
                        +213 20 39 76 61
                      </a>
                      <br />
                      <a href="tel:+21320397666" className="hover:text-gold-400 transition-colors">
                        +213 20 39 76 66
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gold-400 border border-white/10">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Official Diplomatic Email
                    </dt>
                    <dd className="mt-1 text-sm font-mono text-white/80">
                      <a href="mailto:zimalgiers@zimfa.gov.zw" className="hover:text-gold-400 transition-colors">
                        zimalgiers@zimfa.gov.zw
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-rose-400 border border-white/10">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Consular Hours
                    </dt>
                    <dd className="mt-1 text-sm text-white/80">
                      Sunday – Thursday: 09:00 – 15:00
                      <br />
                      <span className="font-mono text-xs text-white/40">Closed Friday &amp; Saturday</span>
                    </dd>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Community Support & Feedback */}
          <SpotlightCard spotlightColor="rgba(5, 150, 105, 0.16)" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Student Community Forum</h3>
            <p className="text-sm text-white/65 leading-relaxed mb-6">
              Have questions regarding accommodation, wilaya transfers, or university modules? Post them in the public forum.
            </p>
            <Link href="/community">
              <Button variant="outline" size="sm" className="w-full text-xs font-mono uppercase tracking-wider">
                Open Community Feed <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </SpotlightCard>

          {/* Student Affairs Verification */}
          <SpotlightCard spotlightColor="rgba(255, 215, 0, 0.16)" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">AZSA Registry Support</h3>
            <p className="text-sm text-white/65 leading-relaxed mb-6">
              Need assistance updating your student profile, registering for national events, or accessing protected resources?
            </p>
            <Link href="/signup">
              <Button variant="secondary" size="sm" className="w-full text-xs font-mono uppercase tracking-wider">
                Join Sovereign Registry
              </Button>
            </Link>
          </SpotlightCard>
        </div>
      </Container>
    </div>
  );
}

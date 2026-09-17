import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SubpageHero } from "@/components/motion/subpage-hero";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ListingRequestForm } from "@/components/community/listing-request-form";
import { Sparkles, ShoppingBag, Camera, Cake, Scissors } from "lucide-react";

export const metadata = { title: "Student Enterprise & Hustles — AZSA" };

const TRADES = [
  {
    src: "/images/student-baking.jpg",
    kicker: "Culinary & Confectionery",
    title: "Cakes & Custom Catering",
    body: "Birthdays, graduations, Independence Day — Zimbabwean students baking custom treats across Oran and Algiers.",
    Icon: Cake,
  },
  {
    src: "/images/independence-merch.jpg",
    kicker: "Apparel & Identity",
    title: "National Day Merchandise",
    body: "Screen-printed tees, custom hoodies, and national kits crafted and distributed within the community.",
    Icon: ShoppingBag,
  },
  {
    src: "/images/graduate-convocation.jpg",
    kicker: "Visual Media & Portraits",
    title: "Convocation Photography",
    body: "Student creators capturing major convocation milestones, portraits, and campus moments with studio grade glass.",
    Icon: Camera,
  },
];

export default function EnterprisePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic Hero */}
      <SubpageHero
        badgeText="Student Commerce & Creativity 🚀"
        title="Student Enterprise & Side Hustles"
        description="Empowering student creators, bakers, photographers, developers, and barbers building independent ventures while studying abroad."
        tone="gold"
        stats={[
          { label: "Listed Ventures", value: "25+" },
          { label: "Active Wilayas", value: "8+" },
          { label: "Community Backed", value: "100%" },
        ]}
      />

      <Container className="py-20 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400">Featured Student Businesses</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built by AZSA Scholars
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TRADES.map((t) => (
            <SpotlightCard
              key={t.title}
              spotlightColor="rgba(255, 215, 0, 0.18)"
              className="p-2 border-white/10 flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-2xl mb-4">
                <Image
                  src={t.src}
                  alt={t.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-ink-950/80 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400 border border-gold-500/30 backdrop-blur-md">
                  {t.kicker}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{t.body}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Container>

      {/* Listing Submission Section */}
      <section className="border-t border-white/10 bg-gradient-to-b from-ink-950 to-black py-20">
        <Container className="max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 mb-4 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Community Directory</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Run a Venture? Get Listed.
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Submit your trade, photography portfolio, or baking business for inclusion in the official student directory.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <ListingRequestForm />
          </div>
        </Container>
      </section>
    </div>
  );
}

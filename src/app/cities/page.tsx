import { Container } from "@/components/ui/container";
import { getCities } from "@/lib/db/queries";

export const metadata = { title: "Cities" };

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <div>
      <div className="bg-ink-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Directory</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Find your city's community
          </h1>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <div key={c.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <h3 className="font-display text-lg font-semibold text-ink">{c.name}</h3>
              <p className="text-xs text-ink-faint">{c.wilaya}</p>
              <p className="mt-2 text-sm text-ink-soft">{c.description}</p>
              <div className="mt-3 flex gap-4 border-t border-border pt-3 font-mono text-xs text-ink-faint">
                <span>{c.studentPopulationEstimate ?? "—"} students</span>
                <span>{c.universityCount} universit{c.universityCount === 1 ? "y" : "ies"}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

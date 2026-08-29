import { Container } from "@/components/ui/container";
import { getUniversities } from "@/lib/db/queries";

export const metadata = { title: "Universities" };

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <div>
      <div className="bg-jade-950 py-14 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Directory</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Universities in the AZSA network
          </h1>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {universities.map((u) => (
            <div key={u.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{u.shortName || u.name}</h3>
                <span className="shrink-0 rounded-[var(--radius-xs)] bg-jade-100 px-2 py-0.5 font-mono text-xs text-jade-800">
                  {u.studentCount} student{u.studentCount === 1 ? "" : "s"}
                </span>
              </div>
              {u.shortName && <p className="mt-0.5 text-sm text-ink-faint">{u.name}</p>}
              <p className="mt-2 text-sm text-ink-soft">{u.description}</p>
              <p className="mt-2 text-xs font-medium text-ink-faint">{u.cityName}</p>
              {u.website && (
                <a href={u.website} className="mt-2 inline-block text-sm font-semibold text-jade-700 hover:text-jade-800">
                  Visit website
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

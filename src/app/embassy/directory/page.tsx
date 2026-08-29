import { eq } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { Avatar } from "@/components/ui/avatar";
import { db, schema } from "@/lib/db";
import { EMBASSY_NAV } from "../nav";

export const metadata = { title: "Student directory" };

export default async function EmbassyDirectoryPage() {
  const students = await db
    .select({
      id: schema.profiles.id,
      displayName: schema.profiles.displayName,
      fullName: schema.profiles.fullName,
      fieldOfStudy: schema.profiles.fieldOfStudy,
      yearOfStudy: schema.profiles.yearOfStudy,
      arrivalYear: schema.profiles.arrivalYear,
      universityName: schema.universities.shortName,
      cityName: schema.cities.name,
      email: schema.users.email,
    })
    .from(schema.profiles)
    .innerJoin(schema.users, eq(schema.profiles.userId, schema.users.id))
    .leftJoin(schema.universities, eq(schema.profiles.universityId, schema.universities.id))
    .leftJoin(schema.cities, eq(schema.profiles.cityId, schema.cities.id))
    .where(eq(schema.users.role, "student"));

  return (
    <PanelShell eyebrow="Embassy desk" title="Student directory" navItems={EMBASSY_NAV} activeHref="/embassy/directory">
      <p className="mb-4 text-xs text-ink-faint">
        Visible to embassy and super-admin roles only. Students who marked their profile
        private are still listed here for administrative purposes, consistent with the
        embassy's student-affairs mandate.
      </p>
      <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-surface">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Field</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Since</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={s.fullName} size={28} />
                    <div>
                      <p className="font-medium text-ink">{s.fullName}</p>
                      <p className="text-xs text-ink-faint">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{s.universityName ?? "—"}</td>
                <td className="px-4 py-3 text-ink-soft">
                  {s.fieldOfStudy ?? "—"}
                  {s.yearOfStudy ? `, yr ${s.yearOfStudy}` : ""}
                </td>
                <td className="px-4 py-3 text-ink-soft">{s.cityName ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-faint">{s.arrivalYear ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}

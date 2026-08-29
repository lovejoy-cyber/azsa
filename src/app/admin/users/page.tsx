import { desc } from "drizzle-orm";
import { PanelShell } from "@/components/admin/panel-shell";
import { db, schema } from "@/lib/db";
import { ADMIN_NAV } from "../nav";
import { RoleSelect, StatusToggle } from "./actions-client";
import { Avatar } from "@/components/ui/avatar";
import { eq } from "drizzle-orm";

export const metadata = { title: "Users & roles" };

export default async function AdminUsersPage() {
  const users = await db
    .select({
      id: schema.users.id,
      email: schema.users.email,
      role: schema.users.role,
      status: schema.users.status,
      createdAt: schema.users.createdAt,
      displayName: schema.profiles.displayName,
    })
    .from(schema.users)
    .leftJoin(schema.profiles, eq(schema.users.id, schema.profiles.userId))
    .orderBy(desc(schema.users.createdAt));

  return (
    <PanelShell eyebrow="Super admin" title="Users & roles" navItems={ADMIN_NAV} activeHref="/admin/users">
      <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-surface">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.displayName || u.email} size={28} />
                    <div>
                      <p className="font-medium text-ink">{u.displayName || "—"}</p>
                      <p className="text-xs text-ink-faint">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <RoleSelect userId={u.id} currentRole={u.role} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      u.status === "active"
                        ? "text-xs font-medium text-jade-700"
                        : "text-xs font-medium text-brick-600"
                    }
                  >
                    {u.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <StatusToggle userId={u.id} status={u.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}

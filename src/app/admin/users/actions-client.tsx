"use client";

import { useTransition } from "react";
import { updateUserRole, setUserStatus } from "@/lib/actions/admin";
import type { Role } from "@/lib/rbac";

const ROLES: Role[] = ["student", "moderator", "embassy_admin", "super_admin"];

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: Role }) {
  const [isPending, startTransition] = useTransition();
  return (
    <select
      defaultValue={currentRole}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateUserRole(userId, e.target.value as Role))}
      className="rounded-[var(--radius-sm)] border border-border bg-surface px-2 py-1 text-xs text-ink-soft"
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {r.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}

export function StatusToggle({ userId, status }: { userId: string; status: "active" | "suspended" | "pending_verification" }) {
  const [isPending, startTransition] = useTransition();
  const suspended = status === "suspended";
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => setUserStatus(userId, suspended ? "active" : "suspended"))}
      className={
        suspended
          ? "rounded-[var(--radius-sm)] bg-jade-100 px-2.5 py-1 text-xs font-semibold text-jade-800"
          : "rounded-[var(--radius-sm)] bg-brick-100 px-2.5 py-1 text-xs font-semibold text-brick-600"
      }
    >
      {suspended ? "Reactivate" : "Suspend"}
    </button>
  );
}

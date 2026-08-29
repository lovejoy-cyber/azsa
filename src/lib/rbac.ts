/**
 * AZSA role-based access control.
 *
 * This is the single source of truth for what each role can do. It is
 * imported by API route handlers and server components — never trust a
 * role check performed only in client-side UI. Hiding a button is a UX
 * nicety; every mutation must re-check permission here on the server.
 */

export type Role = "student" | "moderator" | "embassy_admin" | "super_admin";

export type Permission =
  | "post:create"
  | "post:delete:own"
  | "post:delete:any"
  | "comment:create"
  | "comment:moderate"
  | "event:create"
  | "event:manage"
  | "news:create"
  | "news:publish"
  | "story:create"
  | "story:publish"
  | "announcement:create"
  | "resource:manage"
  | "opportunity:manage"
  | "report:review"
  | "user:manage"
  | "role:manage"
  | "university:manage"
  | "city:manage"
  | "analytics:view"
  | "audit:view"
  | "embassy:student_directory:view";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  student: ["post:create", "post:delete:own", "comment:create"],
  moderator: [
    "post:create",
    "post:delete:own",
    "post:delete:any",
    "comment:create",
    "comment:moderate",
    "report:review",
  ],
  embassy_admin: [
    "post:create",
    "comment:create",
    "announcement:create",
    "resource:manage",
    "opportunity:manage",
    "embassy:student_directory:view",
    "analytics:view",
  ],
  super_admin: [
    "post:create",
    "post:delete:own",
    "post:delete:any",
    "comment:create",
    "comment:moderate",
    "event:create",
    "event:manage",
    "news:create",
    "news:publish",
    "story:create",
    "story:publish",
    "announcement:create",
    "resource:manage",
    "opportunity:manage",
    "report:review",
    "user:manage",
    "role:manage",
    "university:manage",
    "city:manage",
    "analytics:view",
    "audit:view",
    "embassy:student_directory:view",
  ],
};

export function can(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function assertCan(role: Role, permission: Permission): void {
  if (!can(role, permission)) {
    throw new ForbiddenError(`Role "${role}" lacks permission "${permission}"`);
  }
}

export class ForbiddenError extends Error {
  status = 403 as const;
}

/** Convenience: is this role any tier of admin (embassy or super)? */
export function isAdminRole(role: Role): boolean {
  return role === "embassy_admin" || role === "super_admin";
}

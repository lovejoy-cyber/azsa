import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/lib/rbac";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      displayName?: string;
      avatarUrl?: string | null;
    };
  }
  interface User {
    role: Role;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

/**
 * Callbacks and session shape only -- no providers here. Providers that need
 * bcrypt or a Postgres connection are Node-only and must not be imported by
 * the Edge middleware bundle, so they live in `auth.ts` instead. This file is
 * safe to import from `middleware.ts`.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

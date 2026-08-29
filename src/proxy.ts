import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

// Next.js 16 runs proxy.ts on the Node.js runtime by default, so the
// bcrypt/Postgres split below is no longer strictly required to avoid an
// Edge bundle crash -- but it's kept as good separation of concerns: this
// file only ever needs session shape + role, never the full provider config.
const { auth } = NextAuth(authConfig);

const ADMIN_ONLY_PREFIX = "/admin";
const EMBASSY_PREFIX = "/embassy";
const AUTHENTICATED_PREFIXES = ["/dashboard", ADMIN_ONLY_PREFIX, EMBASSY_PREFIX];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const requiresAuth = AUTHENTICATED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!requiresAuth) return NextResponse.next();

  if (!session?.user) {
    const signInUrl = new URL("/login", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const role = session.user.role;

  if (pathname.startsWith(ADMIN_ONLY_PREFIX) && role !== "super_admin") {
    return NextResponse.redirect(new URL("/dashboard?denied=admin", req.nextUrl.origin));
  }

  if (
    pathname.startsWith(EMBASSY_PREFIX) &&
    role !== "embassy_admin" &&
    role !== "super_admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard?denied=embassy", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/embassy/:path*"],
};

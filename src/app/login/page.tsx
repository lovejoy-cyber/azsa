"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StoneDivider } from "@/components/layout/stone-divider";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("That email and password don't match an AZSA account.");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Container className="max-w-md py-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-[var(--radius-sm)] bg-brick-100 px-3 py-2 text-sm text-brick-600">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading} className="mt-2 w-full" size="lg">
          Log in
        </Button>
      </form>

      <div className="mt-6 rounded-[var(--radius-md)] border border-dashed border-border-strong p-4 text-xs text-ink-faint">
        <p className="font-semibold text-ink-soft">Demo accounts</p>
        <p className="mt-1">student: tanaka.moyo@azsa.dz</p>
        <p>embassy: embassy@azsa.dz</p>
        <p>super admin: admin@azsa.dz</p>
        <p className="mt-1">password for all: Password123!</p>
      </div>

      <p className="mt-6 text-center text-sm text-ink-soft">
        New to AZSA?{" "}
        <Link href="/signup" className="font-semibold text-jade-700 hover:text-jade-800">
          Create an account
        </Link>
      </p>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <div>
      <div className="bg-jade-950 py-12 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Welcome back</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Log in to AZSA</h1>
        </Container>
        <StoneDivider tone="gold" className="mt-8" />
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

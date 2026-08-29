"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StoneDivider } from "@/components/layout/stone-divider";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", displayName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-jade-950 py-12 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-500">Join AZSA</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Create your profile</h1>
        </Container>
        <StoneDivider tone="gold" className="mt-8" />
      </div>

      <Container className="max-w-md py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Full name">
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="input"
              placeholder="Tanaka Moyo"
            />
          </Field>
          <Field label="Display name" hint="What other students will see">
            <input
              required
              value={form.displayName}
              onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              className="input"
              placeholder="Tanaka M."
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password" hint="At least 8 characters">
            <input
              required
              type="password"
              minLength={8}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="input"
            />
          </Field>

          {error && (
            <p role="alert" className="rounded-[var(--radius-sm)] bg-brick-100 px-3 py-2 text-sm text-brick-600">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} className="mt-2 w-full" size="lg">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already on AZSA?{" "}
          <Link href="/login" className="font-semibold text-jade-700 hover:text-jade-800">
            Log in
          </Link>
        </p>
      </Container>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

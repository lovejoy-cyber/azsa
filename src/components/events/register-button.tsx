"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RegisterButton({
  eventSlug,
  capacity,
  initialRegistrationCount,
}: {
  eventSlug: string;
  capacity: number | null;
  initialRegistrationCount: number;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const [count, setCount] = useState(initialRegistrationCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFull = capacity != null && count >= capacity && !registered;

  async function handleClick() {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=/events/${eventSlug}`);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${eventSlug}/register`, {
        method: registered ? "DELETE" : "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't update your registration.");
        setLoading(false);
        return;
      }

      setRegistered(!registered);
      setCount((c) => c + (registered ? -1 : 1));
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        loading={loading}
        disabled={isFull}
        variant={registered ? "outline" : "secondary"}
        size="lg"
        className="w-full sm:w-auto"
      >
        {isFull ? "Event full" : registered ? "Cancel registration" : "Register to attend"}
      </Button>
      <p className="mt-2 text-xs text-ink-faint">
        {count} registered{capacity ? ` · capacity ${capacity}` : ""}
      </p>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { resolveReport } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

export function ResolveButtons({ reportId }: { reportId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="danger"
        disabled={isPending}
        onClick={() => startTransition(() => resolveReport(reportId, "actioned"))}
      >
        Take action
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isPending}
        onClick={() => startTransition(() => resolveReport(reportId, "dismissed"))}
      >
        Dismiss
      </Button>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  glass = true,
  hoverable = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { glass?: boolean; hoverable?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        glass
          ? "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]"
          : "border-border bg-surface shadow-[var(--shadow-card)]",
        hoverable && "hover:border-gold-500/30 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.1)] hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-2", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 p-6 pt-0 border-t border-white/5 mt-4", className)} {...props} />;
}

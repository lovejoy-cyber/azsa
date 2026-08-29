import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-950 text-gold-500 border border-gold-500/30 hover:bg-ink-900 hover:border-gold-500/60 hover:shadow-[var(--shadow-glow-gold)] active:bg-ink-800 disabled:opacity-40 disabled:shadow-none",
  secondary:
    "bg-gold-500 text-ink-950 hover:bg-gold-600 hover:shadow-[var(--shadow-glow-gold)] active:bg-gold-700 disabled:bg-gold-500/40 disabled:shadow-none",
  outline:
    "border border-border-strong text-ink hover:border-gold-600 hover:text-gold-700 bg-transparent",
  ghost: "text-ink hover:bg-surface-sunken bg-transparent",
  danger: "bg-brick-600 text-white hover:bg-brick-500",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2.5",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-sm)] font-medium transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 active:translate-y-0",
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span
            aria-hidden
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

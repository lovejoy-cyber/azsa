/**
 * The national colour band across the top of every page. Deliberately
 * substantial (10px, with a specular sheen) rather than a hairline -- a
 * 3px strip read as an accident rather than an intentional statement of
 * identity.
 */
export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flag-stripe-bold w-full ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Labour Chowk wordmark. The mark is an original "chowk" (crossroads) glyph —
 * a meeting point — paired with the wordmark. No third-party branding.
 */
export function Logo({
  className,
  variant = "dark",
  compact = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const wordColor = variant === "light" ? "text-ivory-100" : "text-ink";
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="Labour Chowk home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* crossroads / chowk mark */}
          <path d="M12 2v20M2 12h20" stroke="#e8792b" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" fill="#faf7f2" />
        </svg>
      </span>
      {!compact && (
        <span className={cn("font-display text-[19px] font-extrabold leading-none tracking-tight", wordColor)}>
          Labour<span className="text-amber-500">Chowk</span>
        </span>
      )}
    </Link>
  );
}

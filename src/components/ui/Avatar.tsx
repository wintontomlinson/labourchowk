import { cn } from "@/lib/utils";

/**
 * Deterministic monogram avatar. Real marketplaces show a clean initial-based
 * avatar until the person uploads a verified photo — it's professional, always
 * loads, and avoids the "random stock face" look. The colour is derived from
 * the name so each worker gets a stable, distinct tone.
 */

const PALETTE = [
  { bg: "bg-amber-100", fg: "text-amber-800" },
  { bg: "bg-verified-100", fg: "text-verified-700" },
  { bg: "bg-ink/10", fg: "text-ink-800" },
  { bg: "bg-[#e6ddf2]", fg: "text-[#5b4a86]" },
  { bg: "bg-[#dce7f0]", fg: "text-[#345676]" },
  { bg: "bg-[#f0dcdc]", fg: "text-[#8a4740]" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function pick(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export function Avatar({
  name,
  size = 48,
  className,
  rounded = "rounded-xl",
}: {
  name: string;
  size?: number;
  className?: string;
  rounded?: string;
}) {
  const { bg, fg } = pick(name);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-display font-bold select-none",
        bg,
        fg,
        rounded,
        className
      )}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.38) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

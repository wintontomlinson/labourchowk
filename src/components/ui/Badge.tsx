import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/lib/types";

export function VerifiedBadge({
  status = "verified",
  size = "sm",
}: {
  status?: VerificationStatus;
  size?: "sm" | "md";
}) {
  if (status === "verified") {
    return (
      <span
        className={cn(
          "chip bg-verified-50 text-verified-700",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
        )}
        title="Verification status confirmed on this profile"
      >
        <Icon name="verified-badge" size={size === "sm" ? 13 : 15} className="text-verified-500" />
        Verified
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="chip bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
        <Icon name="clock" size={13} />
        Verification pending
      </span>
    );
  }
  return (
    <span className="chip bg-ink/5 px-2 py-0.5 text-xs text-ink-600">Unverified</span>
  );
}

export function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span className={cn("chip px-2.5 py-1 text-xs font-semibold", className)}>{label}</span>
  );
}

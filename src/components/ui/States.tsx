import Link from "next/link";
import { Icon, type IconName } from "./Icon";

/** Reusable empty state — never a blank white screen. */
export function EmptyState({
  icon = "search",
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon?: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-ink/15 bg-ivory-50 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink-500 shadow-sm">
        <Icon name={icon} size={26} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-600">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary btn-md mt-5">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

/** Error state block with retry affordance. */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't complete that request. Please check your connection and try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-danger-100 bg-danger-50/60 px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-danger-500">
        <Icon name="close" size={22} strokeWidth={2.2} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-600">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline btn-md mt-5">
          Try again
        </button>
      )}
    </div>
  );
}

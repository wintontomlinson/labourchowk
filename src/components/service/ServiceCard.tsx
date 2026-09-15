import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ServiceCategory } from "@/lib/types";
import type { IconName } from "@/components/ui/Icon";

export function ServiceCard({ service }: { service: ServiceCategory }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start gap-3.5 rounded-card border border-ink/[0.07] bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-card-hover"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ivory-100 text-ink transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
        <Icon name={service.icon as IconName} size={24} />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-[15px] font-bold text-ink">{service.name}</h3>
        <p className="mt-0.5 text-[13px] leading-snug text-ink-600">{service.tagline}</p>
      </div>
    </Link>
  );
}

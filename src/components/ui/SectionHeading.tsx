import Link from "next/link";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  link,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      )}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="mb-2 inline-block text-[13px] font-semibold uppercase tracking-wider text-amber-600">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-[26px] font-bold leading-tight text-ink sm:text-[32px]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{subtitle}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-ink hover:text-amber-600"
        >
          {link.label}
          <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

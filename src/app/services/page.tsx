import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/data/services";
import { formatINR, priceModelWord } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Browse all services on Labour Chowk — electricians, plumbers, carpenters, painters, masons, AC technicians, cleaning, drivers and more. Verified workers with clear pricing.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="border-b border-ink/[0.06] bg-ivory-200/50">
        <div className="container-lc py-12 sm:py-16">
          <h1 className="max-w-2xl font-display text-[32px] font-extrabold leading-tight text-ink sm:text-[40px]">
            Every service you need, one trusted place
          </h1>
          <p className="mt-3 max-w-xl text-[16px] text-ink-700">
            Choose a category to see verified workers near you, with real reviews and clear
            pricing before you book.
          </p>
        </div>
      </section>

      <section className="container-lc py-12">
        <SectionHeading title="All services" subtitle={`${SERVICES.length} categories available across Delhi-NCR`} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 30}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-card border border-ink/[0.07] bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ivory-100 text-ink transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                    <Icon name={s.icon as IconName} size={24} />
                  </span>
                  <Icon name="arrow-right" size={18} className="text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600" />
                </div>
                <h3 className="mt-4 font-display text-[17px] font-bold text-ink">{s.name}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-600">{s.tagline}</p>
                {s.priceFrom > 0 && (
                  <p className="mt-3 text-sm font-medium text-ink-700">
                    From <span className="font-bold text-ink">{formatINR(s.priceFrom)}</span>{" "}
                    <span className="text-ink-500">{priceModelWord(s.priceModel)}</span>
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

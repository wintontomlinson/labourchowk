import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon, type IconName } from "@/components/ui/Icon";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { EmptyState } from "@/components/ui/States";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES, getService } from "@/data/services";
import { CITIES } from "@/data/cities";
import { workersForService } from "@/lib/queries";
import { formatINR, priceModelWord } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} Near You — Book Verified ${service.name}s`,
    description: `${service.description} Compare verified ${service.name.toLowerCase()}s near you on Labour Chowk with real reviews and clear pricing from ${formatINR(service.priceFrom)} ${priceModelWord(service.priceModel)}.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const workers = workersForService(service.slug);
  const related = SERVICES.filter((s) => s.slug !== service.slug && s.slug !== "other").slice(0, 5);

  // JSON-LD for the service (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} services`,
    description: service.description,
    areaServed: CITIES.map((c) => c.name),
    provider: { "@type": "Organization", name: "Labour Chowk" },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-ink/[0.06] bg-ivory-200/50">
        <div className="container-lc py-10 sm:py-14">
          <div className="mb-4 flex items-center gap-1.5 text-sm text-ink-500">
            <Link href="/services" className="hover:text-ink">Services</Link>
            <Icon name="chevron-right" size={14} />
            <span className="text-ink">{service.name}</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-card">
              <Icon name={service.icon as IconName} size={28} />
            </span>
            <div>
              <h1 className="font-display text-[30px] font-extrabold leading-tight text-ink sm:text-[38px]">
                {service.name} near you
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-700">
                {service.description}
              </p>
              {service.priceFrom > 0 && (
                <p className="mt-3 text-sm text-ink-700">
                  Starting from{" "}
                  <span className="font-bold text-ink">{formatINR(service.priceFrom)}</span>{" "}
                  {priceModelWord(service.priceModel)}
                </p>
              )}
              <Link href={`/find-workers?service=${service.slug}`} className="btn-primary btn-md mt-5">
                Find a {service.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workers */}
      <section className="container-lc py-10">
        <SectionHeading
          title={`Top ${service.name.toLowerCase()}s`}
          subtitle={`${workers.length} verified and available professionals`}
          link={{ href: `/find-workers?service=${service.slug}`, label: "View all" }}
        />
        {workers.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon="user"
              title={`No ${service.name.toLowerCase()}s listed yet`}
              description="We're onboarding workers in this category. Check back soon or explore other services."
              actionLabel="Browse services"
              actionHref="/services"
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workers.map((w) => (
              <WorkerCard key={w.id} worker={w} />
            ))}
          </div>
        )}
      </section>

      {/* City links (SEO) */}
      <section className="container-lc pb-10">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          {service.name} by city
        </h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/find-workers?service=${service.slug}&city=${c.slug}`}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-amber-300 hover:text-amber-700"
            >
              {service.name} in {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Related services */}
      <section className="bg-ivory-200/50 py-10">
        <div className="container-lc">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Related services</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-ink/[0.07] bg-white px-3.5 py-3 text-sm font-medium text-ink-800 shadow-card transition-colors hover:border-amber-200"
              >
                <Icon name={s.icon as IconName} size={20} className="text-ink-600" />
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

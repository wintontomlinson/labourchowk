import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon } from "@/components/ui/Icon";
import { RatingInline, Stars } from "@/components/ui/Rating";
import { VerifiedBadge } from "@/components/ui/Badge";
import { WorkerContactButton } from "@/components/worker/WorkerContactButton";
import { WORKERS } from "@/data/workers";
import { getWorkerById, getReviewsForWorker, ratingDistributionFor } from "@/lib/db";
import { AVAILABILITY_META, cn, formatDate, priceLabel, priceModelWord } from "@/lib/utils";

export function generateStaticParams() {
  return WORKERS.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker) return { title: "Worker not found" };
  return {
    title: `${worker.name} — ${worker.profession}`,
    description: `${worker.name}, ${worker.profession} with ${worker.experienceYears}+ years experience in ${worker.area}. Rated ${worker.rating}/5 from ${worker.reviewCount} reviews. ${priceLabel(worker.price, worker.priceModel)}.`,
  };
}

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker) notFound();

  const reviews = await getReviewsForWorker(worker.id);
  const dist = await ratingDistributionFor(worker.id);
  const avail = AVAILABILITY_META[worker.availability];
  const total = worker.reviewCount || 1;

  return (
    <SiteShell>
      {/* Breadcrumb */}
      <div className="border-b border-ink/[0.06] bg-ivory-50">
        <div className="container-lc flex items-center gap-1.5 py-3 text-sm text-ink-500">
          <Link href="/" className="hover:text-ink">Home</Link>
          <Icon name="chevron-right" size={14} />
          <Link href="/find-workers" className="hover:text-ink">Find Workers</Link>
          <Icon name="chevron-right" size={14} />
          <span className="text-ink">{worker.name}</span>
        </div>
      </div>

      <div className="container-lc grid gap-8 py-8 lg:grid-cols-[1fr_340px]">
        {/* MAIN */}
        <div className="min-w-0 space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <Avatar name={worker.name} size={96} rounded="rounded-2xl" className="h-20 w-20 text-3xl sm:h-24 sm:w-24" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-[24px] font-extrabold text-ink sm:text-[30px]">
                  {worker.name}
                </h1>
                <VerifiedBadge status={worker.verification} size="md" />
              </div>
              <p className="mt-0.5 text-[16px] text-ink-700">{worker.profession}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
                <RatingInline value={worker.rating} count={worker.reviewCount} size={15} />
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="pin" size={15} className="text-ink-500" />
                  {worker.area} · {worker.distanceKm} km away
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="shield" size={15} className="text-ink-500" />
                  {worker.experienceYears}+ years
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-sm font-medium">
                <span className={cn("h-2 w-2 rounded-full", avail.dot)} />
                <span className={avail.text}>{avail.label}</span>
                <span className="text-ink-400">·</span>
                <span className="text-ink-500">{worker.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Jobs done", value: worker.jobsDone },
              { label: "Experience", value: `${worker.experienceYears} yrs` },
              { label: "On Labour Chowk", value: `Since ${worker.joinedYear}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-ink/[0.07] bg-white p-4 text-center shadow-card">
                <p className="font-display text-xl font-extrabold text-ink">{s.value}</p>
                <p className="text-xs text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* About */}
          <Section title="About">
            <p className="text-[15px] leading-relaxed text-ink-700">{worker.about}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {worker.languages.map((l) => (
                <span key={l} className="chip bg-ivory-100 text-ink-700">
                  <Icon name="chat" size={13} /> {l}
                </span>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill) => (
                <span key={skill} className="chip border border-ink/10 bg-white px-3 py-1.5 text-ink-800">
                  <Icon name="check" size={14} className="text-verified-500" strokeWidth={2.4} />
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Work photos */}
          <Section title="Work Photos">
            {worker.workPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {worker.workPhotos.map((photo, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-ivory-200">
                    <Image
                      src={photo}
                      alt={`${worker.name} work sample ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, 200px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-500">This worker hasn&apos;t added any work photos yet.</p>
            )}
          </Section>

          {/* Reviews */}
          <Section title={`Reviews (${worker.reviewCount})`}>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="sm:w-52 sm:shrink-0">
                <div className="flex items-end gap-2">
                  <span className="font-display text-4xl font-extrabold text-ink">
                    {worker.rating.toFixed(1)}
                  </span>
                  <Stars value={worker.rating} size={16} className="mb-1.5" />
                </div>
                <p className="mt-1 text-sm text-ink-500">Based on {worker.reviewCount} reviews</p>
                <div className="mt-4 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = dist[star] ?? 0;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-ink-600">{star}</span>
                        <Icon name="star" size={11} className="text-amber-500" />
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
                          <span className="block h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
                        </span>
                        <span className="w-6 text-right text-ink-500">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-sm text-ink-500">No reviews yet.</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="border-b border-ink/[0.06] pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-200 font-semibold text-ink-700">
                            {r.customerName.charAt(0)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-ink">{r.customerName}</p>
                            <p className="text-xs text-ink-500">{r.customerCity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Stars value={r.rating} size={13} />
                          <p className="mt-0.5 text-xs text-ink-400">{formatDate(r.date)}</p>
                        </div>
                      </div>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-700">{r.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Section>

          {/* Availability */}
          <Section title="Availability">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const off = worker.availability === "offline" || (worker.availability === "busy" && i > 4);
                return (
                  <div
                    key={day}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-center",
                      off ? "border-ink/[0.06] bg-ivory-50 text-ink-400" : "border-verified-100 bg-verified-50/60 text-verified-700"
                    )}
                  >
                    <p className="text-sm font-semibold">{day}</p>
                    <p className="mt-0.5 text-xs">{off ? "Off" : "9 AM – 7 PM"}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Service area */}
          <Section title="Service Area">
            <div className="overflow-hidden rounded-xl border border-ink/[0.07]">
              <div className="relative flex h-44 items-center justify-center bg-[radial-gradient(circle_at_30%_40%,#f2ede4,transparent),radial-gradient(circle_at_70%_70%,#fbe6d3,transparent)]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#0000000a_1px,transparent_1px),linear-gradient(90deg,#0000000a_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="relative flex flex-col items-center gap-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-card-hover">
                    <Icon name="pin" size={22} />
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">
                    {worker.area}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                {worker.serviceAreas.map((area) => (
                  <span key={area} className="chip bg-ivory-100 text-ink-700">{area}</span>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* STICKY BOOKING RAIL */}
        <aside className="lg:relative">
          <div className="lg:sticky lg:top-20">
            <div className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
              <p className="text-sm text-ink-500">{priceModelWord(worker.priceModel)}</p>
              <p className="font-display text-3xl font-extrabold text-ink">
                {priceLabel(worker.price, worker.priceModel)}
              </p>
              <p className="mt-1 text-xs text-ink-500">Final cost confirmed before booking.</p>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-verified-50/70 px-3 py-2.5 text-sm text-verified-700">
                <Icon name="verified-badge" size={18} className="text-verified-500" />
                Verification status shown on this profile
              </div>

              <div className="mt-4 space-y-2.5">
                <Link href={`/book/${worker.id}`} className="btn-primary btn-lg w-full">
                  Hire Now
                </Link>
                <WorkerContactButton name={worker.name} />
              </div>
              <p className="mt-3 text-center text-xs text-ink-500">
                Usually replies · {worker.responseTime.replace("Usually replies in ", "")}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-[60px] z-30 border-t border-ink/[0.08] bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-display text-lg font-extrabold text-ink">
              {priceLabel(worker.price, worker.priceModel)}
            </p>
            <p className="text-xs text-ink-500">{priceModelWord(worker.priceModel)}</p>
          </div>
          <Link href={`/book/${worker.id}`} className="btn-primary btn-md flex-1">
            Hire Now
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3.5 font-display text-xl font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

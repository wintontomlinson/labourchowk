import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { HeroSearch } from "@/components/home/HeroSearch";
import { ServiceCard } from "@/components/service/ServiceCard";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { TESTIMONIALS } from "@/data/misc";
import { getNearbyWorkers } from "@/lib/db";

const TRUST_POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "verified-badge",
    title: "Verified Workers",
    body: "Profiles can be verified before they start accepting jobs, and status is shown clearly.",
  },
  {
    icon: "pin",
    title: "Local Professionals",
    body: "Find workers who actually operate in your area, sorted by distance from you.",
  },
  {
    icon: "wallet",
    title: "Clear Pricing",
    body: "See the expected cost on every profile before you confirm — no surprises later.",
  },
  {
    icon: "calendar",
    title: "Easy Booking",
    body: "Book a worker in a few simple steps and track everything from your dashboard.",
  },
];

const STEPS = [
  { n: "01", title: "Tell us what you need", body: "Choose a service and describe the work in your own words." },
  { n: "02", title: "Choose your worker", body: "Compare nearby workers on skills, ratings, experience and price." },
  { n: "03", title: "Get the work done", body: "Confirm the booking and coordinate directly with your worker." },
];

const WORKER_BENEFITS = [
  "Get local job requests",
  "Build your professional profile",
  "Manage your availability",
  "Track your earnings",
  "Receive customer reviews",
  "Grow your reputation",
];

const SAFETY_ITEMS = [
  "Worker verification",
  "Transparent profiles",
  "Customer reviews",
  "Booking records",
  "Support system",
  "Report a problem",
];

export default async function HomePage() {
  const workers = await getNearbyWorkers(6);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory-200/70 to-ivory-100" />
        <div className="container-lc grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <span className="chip mb-5 border border-amber-200 bg-amber-50 text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Trusted by thousands across Delhi-NCR
            </span>
            <h1 className="font-display text-[30px] font-extrabold leading-[1.08] tracking-tight text-ink text-balance min-[400px]:text-[34px] sm:text-[44px] lg:text-[52px]">
              Har Kaam Ke Liye,
              <br />
              <span className="text-amber-600">Sahi Insaan.</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-700 sm:text-[17px]">
              Electrician se plumber tak, painter se construction worker tak — apne
              aas-paas trusted professionals dhoondhiye. Find trusted workers near you,
              get the job done right.
            </p>
            <div className="mt-7">
              <HeroSearch />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-600">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="verified-badge" size={17} className="text-verified-500" />
                Verified profiles
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={16} className="text-amber-500" />
                Real customer ratings
              </span>
              <Link href="/worker/onboarding" className="font-semibold text-ink hover:text-amber-600">
                I&apos;m a Worker →
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Premium collage of real trades — a main portrait + two stacked shots */}
            <div className="grid grid-cols-5 grid-rows-6 gap-3" style={{ height: 540 }}>
              <div className="relative col-span-3 row-span-6 overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Technician servicing equipment on site"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 27vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent px-4 pb-4 pt-14">
                  <div className="grid grid-cols-3 gap-2 text-ivory-100">
                    {[
                      { v: "12,000+", l: "Workers" },
                      { v: "15", l: "Services" },
                      { v: "4.6★", l: "Avg rating" },
                    ].map((s) => (
                      <div key={s.l}>
                        <p className="font-display text-lg font-extrabold leading-none">{s.v}</p>
                        <p className="mt-0.5 text-[11px] text-ivory-300/80">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                  alt="Carpenter measuring timber"
                  fill
                  sizes="(max-width: 1024px) 0px, 18vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80"
                  alt="Painter at work on a wall"
                  fill
                  sizes="(max-width: 1024px) 0px, 18vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-verified-500 align-middle" />
                  Available near you
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="container-lc py-12 sm:py-16">
        <SectionHeading
          title="What do you need help with?"
          subtitle="Pick a service to see verified workers near you, with clear pricing and real reviews."
          link={{ href: "/services", label: "All services" }}
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICES.filter((s) => s.slug !== "other").map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEARBY WORKERS */}
      <section className="bg-ivory-200/50 py-12 sm:py-16">
        <div className="container-lc">
          <SectionHeading
            title="Workers near you"
            subtitle="A few available professionals around Delhi-NCR right now."
            link={{ href: "/find-workers", label: "See all workers" }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workers.map((w, i) => (
              <Reveal key={w.id} delay={i * 50}>
                <WorkerCard worker={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="container-lc py-14 sm:py-20">
        <SectionHeading title="Why people choose Labour Chowk" align="center" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Icon name={p.icon} size={26} />
              </div>
              <h3 className="font-display text-[17px] font-bold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink py-16 text-ivory-100 sm:py-20">
        <div className="container-lc">
          <SectionHeading title="How it works" align="center" />
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 md:block" />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100} className="relative text-center md:text-left">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 font-display text-xl font-extrabold text-white md:mx-0">
                  {s.n}
                </div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ivory-300/85">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WORKERS */}
      <section className="container-lc py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-ivory-200 shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80"
                alt="Skilled Indian worker"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <span className="mb-2 inline-block text-[13px] font-semibold uppercase tracking-wider text-amber-600">
              For Workers
            </span>
            <h2 className="font-display text-[28px] font-bold leading-tight text-ink sm:text-[34px]">
              Your skill deserves more work.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-700">
              Create your Labour Chowk profile and connect with customers looking for your
              skills. It&apos;s free to join and easy to manage.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {WORKER_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px] text-ink-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verified-50 text-verified-600">
                    <Icon name="check" size={14} strokeWidth={2.4} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/worker/onboarding" className="btn-dark btn-md">
                Join as a Worker
              </Link>
              <Link href="/worker" className="btn-outline btn-md">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY & TRUST */}
      <section className="bg-ivory-200/50 py-14 sm:py-16">
        <div className="container-lc">
          <SectionHeading
            title="Built around trust."
            subtitle="Verification status is clearly shown on worker profiles, and every booking is recorded."
            align="center"
          />
          <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            {SAFETY_ITEMS.map((item, i) => (
              <Reveal key={item} delay={i * 40}>
                <div className="flex items-center gap-2.5 rounded-xl border border-ink/[0.07] bg-white px-4 py-3.5 shadow-card">
                  <Icon name="check" size={18} className="text-verified-500" strokeWidth={2.2} />
                  <span className="text-sm font-medium text-ink-800">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-lc py-14 sm:py-20">
        <SectionHeading title="What our customers say" align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <figure className="flex h-full flex-col rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
                <Icon name="star" size={20} className="text-amber-500" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-800">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t border-ink/[0.07] pt-3">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-500">
                    {t.city} · {t.service}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOCATION DISCOVERY */}
      <section className="bg-ink py-14 text-ivory-100 sm:py-16">
        <div className="container-lc">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-[26px] font-bold sm:text-[30px]">
                Find workers in your area
              </h2>
              <p className="mt-2 text-ivory-300/85">
                We&apos;re active across Delhi-NCR and growing every week.
              </p>
            </div>
            <Link href="/find-workers" className="btn-primary btn-md">
              <Icon name="pin" size={18} />
              Use my location
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/find-workers?city=${c.slug}`}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-amber-400/40 hover:bg-white/[0.08]"
              >
                <p className="font-display text-lg font-bold">{c.name}</p>
                <p className="text-sm text-ivory-300/70">
                  {c.workerCount.toLocaleString("en-IN")} workers
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Labour Chowk works — tell us what you need, choose your worker, and get the job done. Simple, transparent and built around trust.",
};

const CUSTOMER_STEPS: { n: string; icon: IconName; title: string; body: string }[] = [
  {
    n: "01",
    icon: "search",
    title: "Tell us what you need",
    body: "Choose a service and describe the work in your own words. Add a few photos if it helps.",
  },
  {
    n: "02",
    icon: "user",
    title: "Choose your worker",
    body: "Compare nearby workers on skills, ratings, experience and price. Everything is shown upfront.",
  },
  {
    n: "03",
    icon: "check",
    title: "Get the work done",
    body: "Confirm your booking, coordinate directly with the worker, and rate them once the job is done.",
  },
];

const WORKER_STEPS: { n: string; icon: IconName; title: string; body: string }[] = [
  { n: "01", icon: "user", title: "Create your profile", body: "Add your skills, experience, service area and pricing." },
  { n: "02", icon: "bell", title: "Receive job requests", body: "Get local requests that match your skills and availability." },
  { n: "03", icon: "wallet", title: "Work and earn", body: "Accept jobs, complete them and track your earnings over time." },
];

const FAQS = [
  {
    q: "Is it free to use Labour Chowk?",
    a: "Browsing workers and sending booking requests is free for customers. Workers can create a profile and receive job requests at no upfront cost.",
  },
  {
    q: "How is pricing decided?",
    a: "Each worker sets their own rate, which is shown clearly on their profile. The final cost is agreed with the worker before the work begins.",
  },
  {
    q: "What does the Verified badge mean?",
    a: "It means the worker has completed our profile verification. Verification status is always shown clearly on each profile so you can decide with confidence.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. You can cancel a pending or confirmed booking from your dashboard. Please check our cancellation policy for details.",
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <section className="border-b border-ink/[0.06] bg-ivory-200/50">
        <div className="container-lc py-14 text-center sm:py-20">
          <h1 className="mx-auto max-w-2xl font-display text-[32px] font-extrabold leading-tight text-ink sm:text-[44px]">
            Getting the right worker is simple
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] text-ink-700">
            Whether you need a job done or you&apos;re a worker looking for more work, Labour Chowk
            keeps things clear and straightforward.
          </p>
        </div>
      </section>

      {/* For customers */}
      <section className="container-lc py-14">
        <SectionHeading eyebrow="For Customers" title="Book a worker in three steps" align="center" />
        <div className="relative mt-12 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-ink/[0.08] md:block" />
          {CUSTOMER_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-card-hover">
                <Icon name={s.icon} size={28} />
              </div>
              <p className="mt-4 font-display text-sm font-bold text-amber-600">{s.n}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-ink-600">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/find-workers" className="btn-primary btn-lg">Find a Worker</Link>
        </div>
      </section>

      {/* For workers */}
      <section className="bg-ink py-14 text-ivory-100 sm:py-16">
        <div className="container-lc">
          <SectionHeading eyebrow="For Workers" title="Start getting more work" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WORKER_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="rounded-card border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                    <Icon name={s.icon} size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ivory-300/85">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/worker/onboarding" className="btn-primary btn-lg">Join as a Worker</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-lc py-14">
        <SectionHeading title="Common questions" align="center" />
        <div className="mx-auto mt-8 max-w-2xl divide-y divide-ink/[0.08]">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Icon name="chevron-down" size={20} className="shrink-0 text-ink-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

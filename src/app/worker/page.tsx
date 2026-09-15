import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "For Workers — Grow Your Work",
  description:
    "Join Labour Chowk as a worker. Get local job requests, build your profile, set your own pricing and availability, and grow your reputation.",
};

const BENEFITS: { icon: IconName; title: string; body: string }[] = [
  { icon: "bell", title: "Local job requests", body: "Receive requests from customers near you that match your skills." },
  { icon: "user", title: "Professional profile", body: "Showcase your skills, experience, photos and reviews in one place." },
  { icon: "clock", title: "Your availability", body: "Set the days and hours you want to work — you stay in control." },
  { icon: "wallet", title: "Track earnings", body: "See your daily, weekly and monthly earnings at a glance." },
  { icon: "star", title: "Customer reviews", body: "Build trust with genuine ratings from customers you serve." },
  { icon: "trend", title: "Grow reputation", body: "The better your work, the higher you rank in search results." },
];

const STATS = [
  { value: "12,000+", label: "Workers already listed" },
  { value: "₹18,400", label: "Avg. monthly earnings" },
  { value: "Free", label: "To create a profile" },
];

export default function ForWorkersPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ivory-100">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="relative container-lc grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="chip mb-5 border border-white/15 bg-white/5 text-ivory-200">
              For Workers
            </span>
            <h1 className="font-display text-[30px] font-extrabold leading-[1.08] text-balance min-[400px]:text-[34px] sm:text-[44px] lg:text-[48px]">
              Your skill deserves more work.
            </h1>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ivory-300/90">
              Create your Labour Chowk profile and connect with customers looking for your
              skills. Free to join, easy to manage, and built for real workers.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/worker/onboarding" className="btn-primary btn-lg">
                Join as a Worker
              </Link>
              <Link href="/login?role=worker" className="btn-outline btn-lg border-white/20 bg-white/5 text-ivory-100 hover:bg-white/10">
                Worker Login
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-extrabold text-amber-400">{s.value}</p>
                  <p className="mt-0.5 text-xs text-ivory-300/75">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-lc py-16">
        <SectionHeading title="Everything you need to grow" align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 50}>
              <div className="flex h-full flex-col rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Icon name={b.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-lc pb-16">
        <div className="rounded-3xl bg-amber-500 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-[28px] font-extrabold text-white sm:text-[34px]">
            Ready to get more work?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-white/90">
            Set up your profile in a few minutes and start receiving job requests.
          </p>
          <Link href="/worker/onboarding" className="btn-dark btn-lg mt-6">
            Join as a Worker
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

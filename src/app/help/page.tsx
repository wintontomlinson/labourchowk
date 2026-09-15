import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Find answers to common questions about using Labour Chowk.",
};

const TOPICS: { icon: IconName; title: string; body: string }[] = [
  { icon: "search", title: "Finding workers", body: "Search, filter and compare workers near you." },
  { icon: "calendar", title: "Bookings", body: "How to book, reschedule, or cancel a job." },
  { icon: "wallet", title: "Payments", body: "Pricing, receipts and refunds explained." },
  { icon: "user", title: "For workers", body: "Creating a profile, requests and payouts." },
  { icon: "shield", title: "Safety & trust", body: "How verification and reviews work." },
  { icon: "star", title: "Reviews", body: "Rating workers and managing your reviews." },
];

export default function HelpCentre() {
  return (
    <SiteShell>
      <PageHeader title="How can we help?" subtitle="Browse topics or contact our support team." />
      <div className="container-lc py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div key={t.title} className="flex items-start gap-3.5 rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Icon name={t.icon} size={22} />
              </span>
              <div>
                <h3 className="font-display font-bold text-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-card bg-ink p-8 text-center text-ivory-100">
          <h3 className="font-display text-xl font-bold">Still need help?</h3>
          <p className="text-ivory-300/85">Our support team is here every day, 9 AM to 9 PM.</p>
          <Link href="/contact" className="btn-primary btn-md mt-1">Contact Support</Link>
        </div>
      </div>
    </SiteShell>
  );
}

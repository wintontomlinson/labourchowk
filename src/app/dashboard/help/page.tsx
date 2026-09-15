import Link from "next/link";
import { DashCard } from "@/components/dashboard/widgets";
import { Icon, type IconName } from "@/components/ui/Icon";

const TOPICS: { icon: IconName; title: string; body: string }[] = [
  { icon: "calendar", title: "Managing bookings", body: "How to reschedule, cancel or track a booking." },
  { icon: "wallet", title: "Payments & refunds", body: "Understand pricing, receipts and refund timelines." },
  { icon: "shield", title: "Safety & trust", body: "How verification and reviews keep you safe." },
  { icon: "star", title: "Reviews", body: "How to rate workers and edit your reviews." },
];

export default function Help() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Help centre</h2>
        <p className="text-ink-600">Find answers or reach our support team.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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

      <DashCard title="Still need help?">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-600">
            Our support team is available every day from 9 AM to 9 PM.
          </p>
          <div className="flex gap-2.5">
            <Link href="/contact" className="btn-outline btn-sm">
              <Icon name="chat" size={16} /> Chat with us
            </Link>
            <a href="tel:18000000000" className="btn-primary btn-sm">
              <Icon name="phone" size={16} /> Call support
            </a>
          </div>
        </div>
      </DashCard>
    </div>
  );
}

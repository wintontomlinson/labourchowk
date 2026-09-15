import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Safety",
  description: "How Labour Chowk is built around trust and safety for customers and workers.",
};

const ITEMS: { icon: IconName; title: string; body: string }[] = [
  { icon: "verified-badge", title: "Worker verification", body: "Verification status is shown clearly on every profile so you know who you're hiring." },
  { icon: "user", title: "Transparent profiles", body: "Skills, experience, pricing and location are all visible before you book." },
  { icon: "star", title: "Customer reviews", body: "Genuine ratings come from real, completed bookings." },
  { icon: "calendar", title: "Booking records", body: "Every booking has a unique ID and a clear history." },
  { icon: "chat", title: "Support system", body: "Reach our team anytime you need help with a booking." },
  { icon: "bell", title: "Report a problem", body: "Flag an issue and our team will review it promptly." },
];

export default function SafetyPage() {
  return (
    <SiteShell>
      <PageHeader
        title="Built around trust."
        subtitle="Verification status is clearly shown on worker profiles, and every booking is recorded."
      />
      <div className="container-lc py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t) => (
            <div key={t.title} className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-verified-50 text-verified-600">
                <Icon name={t.icon} size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{t.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-xl bg-ivory-200/60 p-4 text-sm text-ink-600">
          Note: Labour Chowk shows the verification status a worker has completed. We do not claim
          background or police verification unless it is explicitly stated on a worker&apos;s profile.
        </p>
      </div>
    </SiteShell>
  );
}

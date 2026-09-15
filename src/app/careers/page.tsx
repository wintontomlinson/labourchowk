import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Labour Chowk team and help bring India's local workforce online.",
};

const ROLES = [
  { title: "Frontend Engineer", team: "Engineering", location: "Delhi / Remote" },
  { title: "Field Operations Lead", team: "Operations", location: "Gurugram" },
  { title: "Product Designer", team: "Design", location: "Remote" },
];

export default function CareersPage() {
  return (
    <SiteShell>
      <PageHeader title="Build with us" subtitle="We're a small team working on a big, practical problem. Come help." />
      <div className="container-lc py-10">
        {ROLES.length === 0 ? (
          <EmptyState icon="user" title="No open roles" description="We're not hiring right now, but check back soon." />
        ) : (
          <div className="space-y-3">
            {ROLES.map((r) => (
              <div key={r.title} className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-ink/[0.07] bg-white p-5 shadow-card">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{r.title}</h3>
                  <p className="text-sm text-ink-600">{r.team} · {r.location}</p>
                </div>
                <button className="btn-outline btn-sm">View role</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

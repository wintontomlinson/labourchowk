import { DashCard, StatCard } from "@/components/dashboard/widgets";
import { BOOKINGS_TREND } from "@/data/misc";
import { SERVICES } from "@/data/services";
import { WORKERS } from "@/data/workers";
import { CITIES } from "@/data/cities";

export default function AdminAnalytics() {
  const max = Math.max(...BOOKINGS_TREND.map((d) => d.bookings));

  // Service popularity by worker count (proxy for demand distribution)
  const byService = SERVICES.map((s) => ({
    name: s.name,
    count: WORKERS.filter((w) => w.serviceSlug === s.slug).length,
  }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const svcMax = Math.max(...byService.map((s) => s.count));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Analytics</h2>
        <p className="text-ink-600">Trends across the platform.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="trend" label="Growth (MoM)" value="+8.4%" tone="green" />
        <StatCard icon="calendar" label="Avg. bookings/day" value="398" />
        <StatCard icon="star" label="Avg. rating" value="4.6" tone="amber" />
        <StatCard icon="user" label="Repeat customers" value="41%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashCard title="Bookings — last 7 days">
          <div className="flex h-48 items-end justify-between gap-3">
            {BOOKINGS_TREND.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-md bg-amber-500/85" style={{ height: `${(d.bookings / max) * 100}%` }} />
                </div>
                <span className="text-xs text-ink-500">{d.day}</span>
              </div>
            ))}
          </div>
        </DashCard>

        <DashCard title="Top services by supply">
          <div className="space-y-3">
            {byService.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-ink-700">{s.name}</span>
                  <span className="font-medium text-ink">{s.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/[0.08]">
                  <div className="h-full rounded-full bg-ink/80" style={{ width: `${(s.count / svcMax) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashCard>
      </div>

      <DashCard title="Workers by city">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CITIES.map((c) => (
            <div key={c.slug} className="rounded-xl bg-ivory-50 p-3 text-center">
              <p className="font-display text-lg font-extrabold text-ink">{c.workerCount.toLocaleString("en-IN")}</p>
              <p className="text-xs text-ink-500">{c.name}</p>
            </div>
          ))}
        </div>
      </DashCard>
    </div>
  );
}

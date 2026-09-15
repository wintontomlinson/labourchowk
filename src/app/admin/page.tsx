import Link from "next/link";
import { StatCard, DashCard } from "@/components/dashboard/widgets";
import { StatusBadge } from "@/components/ui/Badge";
import { PLATFORM_METRICS, BOOKINGS_TREND } from "@/data/misc";
import { getBookings, getWorkers, getPlatformMetrics } from "@/lib/db";
import { STATUS_META, formatDate, formatINR } from "@/lib/utils";

export default async function AdminDashboard() {
  const BOOKINGS = await getBookings();
  const WORKERS = await getWorkers();
  const live = await getPlatformMetrics();
  // Big platform baselines (users/revenue) stay sensible; operational counts are live.
  const m = {
    totalUsers: PLATFORM_METRICS.totalUsers + live.totalWorkers,
    activeWorkers: live.activeWorkers,
    bookingsToday: live.bookingsToday,
    completedBookings: live.completedBookings,
    pendingVerification: live.pendingVerification,
    revenueThisMonth: PLATFORM_METRICS.revenueThisMonth,
  };
  const max = Math.max(...BOOKINGS_TREND.map((d) => d.bookings));
  const pendingWorkers = WORKERS.filter((w) => w.verification === "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Platform overview</h2>
          <p className="text-ink-600">Key metrics across Labour Chowk.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/verification" className="btn-outline btn-sm">
            Verification queue
            {pendingWorkers.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white">
                {pendingWorkers.length}
              </span>
            )}
          </Link>
          <Link href="/admin/bookings" className="btn-dark btn-sm">Manage bookings</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon="user" label="Total users" value={m.totalUsers.toLocaleString("en-IN")} />
        <StatCard icon="verified-badge" label="Active workers" value={m.activeWorkers.toLocaleString("en-IN")} tone="green" />
        <StatCard icon="calendar" label="Bookings today" value={m.bookingsToday} tone="amber" />
        <StatCard icon="check" label="Completed" value={m.completedBookings.toLocaleString("en-IN")} />
        <StatCard icon="clock" label="Pending verify" value={m.pendingVerification} />
        <StatCard icon="wallet" label="Revenue (mo)" value={formatINR(m.revenueThisMonth)} tone="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Bookings trend */}
        <DashCard title="Bookings — last 7 days">
          <div className="flex h-52 items-end justify-between gap-3">
            {BOOKINGS_TREND.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-ink-600">{d.bookings}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-ink/80"
                    style={{ height: `${(d.bookings / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-ink-500">{d.day}</span>
              </div>
            ))}
          </div>
        </DashCard>

        {/* Pending verification */}
        <DashCard title="Awaiting verification" action={{ href: "/admin/verification", label: "Review" }}>
          {pendingWorkers.length === 0 ? (
            <p className="text-sm text-ink-500">Nothing pending.</p>
          ) : (
            <div className="space-y-3">
              {pendingWorkers.map((w) => (
                <div key={w.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink/[0.07] p-3">
                  <div>
                    <p className="font-semibold text-ink">{w.name}</p>
                    <p className="text-sm text-ink-500">{w.profession} · {w.area}</p>
                  </div>
                  <StatusBadge label="Pending" className="bg-amber-100 text-amber-800" />
                </div>
              ))}
            </div>
          )}
        </DashCard>
      </div>

      {/* Recent bookings */}
      <DashCard title="Recent bookings" action={{ href: "/admin/bookings", label: "All bookings" }}>
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink/[0.08] text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">ID</th>
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">Customer</th>
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">Worker</th>
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">Service</th>
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">Date</th>
                <th className="whitespace-nowrap pb-2.5 pr-4 font-semibold">Status</th>
                <th className="whitespace-nowrap pb-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => {
                const s = STATUS_META[b.status];
                return (
                  <tr key={b.id} className="border-b border-ink/[0.05] last:border-0">
                    <td className="whitespace-nowrap py-3 pr-4 font-medium text-ink">{b.id}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-ink-700">{b.customerName}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-ink-700">{b.workerName}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-ink-600">{b.service}</td>
                    <td className="whitespace-nowrap py-3 pr-4 text-ink-600">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4"><StatusBadge label={s.label} className={s.className} /></td>
                    <td className="whitespace-nowrap py-3 text-right font-semibold text-ink">{formatINR(b.estimatedPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashCard>
    </div>
  );
}

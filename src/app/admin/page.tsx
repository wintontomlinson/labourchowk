import { StatCard, DashCard } from "@/components/dashboard/widgets";
import { StatusBadge } from "@/components/ui/Badge";
import { PLATFORM_METRICS, BOOKINGS_TREND } from "@/data/misc";
import { BOOKINGS } from "@/data/bookings";
import { WORKERS } from "@/data/workers";
import { STATUS_META, formatDate, formatINR } from "@/lib/utils";

export default function AdminDashboard() {
  const m = PLATFORM_METRICS;
  const max = Math.max(...BOOKINGS_TREND.map((d) => d.bookings));
  const pendingWorkers = WORKERS.filter((w) => w.verification === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Platform overview</h2>
        <p className="text-ink-600">Key metrics across Labour Chowk.</p>
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.08] text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="pb-2.5 pr-4 font-semibold">ID</th>
                <th className="pb-2.5 pr-4 font-semibold">Customer</th>
                <th className="pb-2.5 pr-4 font-semibold">Worker</th>
                <th className="pb-2.5 pr-4 font-semibold">Service</th>
                <th className="pb-2.5 pr-4 font-semibold">Date</th>
                <th className="pb-2.5 pr-4 font-semibold">Status</th>
                <th className="pb-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => {
                const s = STATUS_META[b.status];
                return (
                  <tr key={b.id} className="border-b border-ink/[0.05] last:border-0">
                    <td className="py-3 pr-4 font-medium text-ink">{b.id}</td>
                    <td className="py-3 pr-4 text-ink-700">{b.customerName}</td>
                    <td className="py-3 pr-4 text-ink-700">{b.workerName}</td>
                    <td className="py-3 pr-4 text-ink-600">{b.service}</td>
                    <td className="py-3 pr-4 text-ink-600">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4"><StatusBadge label={s.label} className={s.className} /></td>
                    <td className="py-3 text-right font-semibold text-ink">{formatINR(b.estimatedPrice)}</td>
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

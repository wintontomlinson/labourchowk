import { DashCard, StatCard } from "@/components/dashboard/widgets";
import { StatusBadge } from "@/components/ui/Badge";
import { getBookings } from "@/lib/db";
import { STATUS_META, formatDate, formatINR } from "@/lib/utils";

const WEEKLY = [
  { day: "Mon", amount: 700 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 1050 },
  { day: "Thu", amount: 350 },
  { day: "Fri", amount: 700 },
  { day: "Sat", amount: 1400 },
  { day: "Sun", amount: 0 },
];

export default async function WorkerEarnings() {
  const BOOKINGS = await getBookings();
  const max = Math.max(...WEEKLY.map((w) => w.amount), 1);
  const completed = BOOKINGS.filter((b) => b.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Earnings</h2>
        <p className="text-ink-600">Track how much you&apos;ve earned over time.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon="wallet" label="Today" value={formatINR(700)} tone="amber" />
        <StatCard icon="wallet" label="This week" value={formatINR(4200)} hint="+12%" />
        <StatCard icon="wallet" label="This month" value={formatINR(18400)} tone="green" hint="+8%" />
      </div>

      <DashCard title="This week">
        <div className="flex h-44 items-end justify-between gap-2">
          {WEEKLY.map((w) => (
            <div key={w.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-amber-500/85 transition-all"
                  style={{ height: `${(w.amount / max) * 100}%` }}
                  title={formatINR(w.amount)}
                />
              </div>
              <span className="text-xs text-ink-500">{w.day}</span>
            </div>
          ))}
        </div>
      </DashCard>

      <DashCard title="Recent payouts">
        <div className="space-y-3">
          {completed.map((b) => {
            const s = STATUS_META[b.status];
            return (
              <div key={b.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink/[0.07] p-3.5">
                <div>
                  <p className="font-semibold text-ink">{b.service}</p>
                  <p className="text-sm text-ink-500">{b.id} · {formatDate(b.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge label={s.label} className={s.className} />
                  <span className="font-display font-bold text-ink">{formatINR(b.estimatedPrice)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DashCard>
    </div>
  );
}

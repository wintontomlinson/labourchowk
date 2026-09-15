import { DashCard, StatCard } from "@/components/dashboard/widgets";
import { StatusBadge } from "@/components/ui/Badge";
import { BOOKINGS } from "@/data/bookings";
import { STATUS_META, formatDate, formatINR } from "@/lib/utils";

export default function Payments() {
  const paid = BOOKINGS.filter((b) => b.status === "completed");
  const total = paid.reduce((sum, b) => sum + b.estimatedPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Payments</h2>
        <p className="text-ink-600">Your payment history and receipts.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon="wallet" label="Total spent" value={formatINR(total)} />
        <StatCard icon="check" label="Paid bookings" value={paid.length} tone="green" />
        <StatCard icon="clock" label="Pending dues" value={formatINR(0)} />
      </div>

      <DashCard title="Transaction history">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.08] text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="pb-2.5 pr-4 font-semibold">Booking</th>
                <th className="pb-2.5 pr-4 font-semibold">Worker</th>
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
                    <td className="py-3 pr-4 text-ink-700">{b.workerName}</td>
                    <td className="py-3 pr-4 text-ink-600">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge label={s.label} className={s.className} />
                    </td>
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

import { AdminTable } from "@/components/admin/AdminTable";
import { StatCard } from "@/components/dashboard/widgets";
import { StatusBadge } from "@/components/ui/Badge";
import { getBookings } from "@/lib/db";
import { PLATFORM_METRICS } from "@/data/misc";
import { STATUS_META, formatDate, formatINR } from "@/lib/utils";

export default async function AdminPayments() {
  const BOOKINGS = await getBookings();
  const gross = BOOKINGS.reduce((s, b) => s + b.estimatedPrice, 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Payments</h2>
        <p className="text-ink-600">Platform revenue and transactions.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="wallet" label="Revenue (month)" value={formatINR(PLATFORM_METRICS.revenueThisMonth)} tone="green" />
        <StatCard icon="trend" label="Gross bookings" value={formatINR(gross)} />
        <StatCard icon="check" label="Payouts done" value={formatINR(Math.round(gross * 0.9))} />
        <StatCard icon="clock" label="Pending payouts" value={formatINR(Math.round(gross * 0.1))} tone="amber" />
      </div>

      <AdminTable columns={["Booking", "Worker", "Date", "Status", "Amount"]}>
        {BOOKINGS.map((b) => {
          const s = STATUS_META[b.status];
          return (
            <tr key={b.id} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
              <td className="px-4 py-3 font-medium text-ink">{b.id}</td>
              <td className="px-4 py-3 text-ink-700">{b.workerName}</td>
              <td className="px-4 py-3 text-ink-600">{formatDate(b.date)}</td>
              <td className="px-4 py-3"><StatusBadge label={s.label} className={s.className} /></td>
              <td className="px-4 py-3 text-right font-semibold text-ink">{formatINR(b.estimatedPrice)}</td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}

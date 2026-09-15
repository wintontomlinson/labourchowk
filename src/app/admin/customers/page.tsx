import { AdminTable } from "@/components/admin/AdminTable";
import { BOOKINGS } from "@/data/bookings";
import { formatINR } from "@/lib/utils";

// Derive a small customer list from bookings for the demo.
const CUSTOMERS = [
  { name: "Amit Verma", city: "Delhi", phone: "+91 90000 00001", joined: "Jan 2026" },
  { name: "Neha Sharma", city: "Delhi", phone: "+91 90000 00002", joined: "Feb 2026" },
  { name: "Priya Singh", city: "Gurugram", phone: "+91 90000 00003", joined: "Mar 2026" },
  { name: "Deepika Rao", city: "Noida", phone: "+91 90000 00004", joined: "Apr 2026" },
  { name: "Rohit Malhotra", city: "Delhi", phone: "+91 90000 00005", joined: "May 2026" },
  { name: "Karan Mehta", city: "Gurugram", phone: "+91 90000 00006", joined: "Jun 2026" },
];

export default function AdminCustomers() {
  const bookingsByName = (name: string) => BOOKINGS.filter((b) => b.customerName === name).length;
  const spendByName = (name: string) =>
    BOOKINGS.filter((b) => b.customerName === name && b.status === "completed").reduce((s, b) => s + b.estimatedPrice, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Customers</h2>
        <p className="text-ink-600">{CUSTOMERS.length} registered customers (sample).</p>
      </div>

      <AdminTable columns={["Customer", "City", "Phone", "Joined", "Bookings", "Total spent"]}>
        {CUSTOMERS.map((c) => (
          <tr key={c.name} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
            <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
            <td className="px-4 py-3 text-ink-600">{c.city}</td>
            <td className="px-4 py-3 text-ink-600">{c.phone}</td>
            <td className="px-4 py-3 text-ink-600">{c.joined}</td>
            <td className="px-4 py-3 text-ink-700">{bookingsByName(c.name)}</td>
            <td className="px-4 py-3 text-right font-semibold text-ink">{formatINR(spendByName(c.name))}</td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}

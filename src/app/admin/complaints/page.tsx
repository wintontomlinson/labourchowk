import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/States";

const COMPLAINTS = [
  { id: "CMP-2026-0012", by: "Neha Sharma", against: "Sanjay Verma", type: "Late arrival", status: "open", date: "12 Sep 2026" },
  { id: "CMP-2026-0011", by: "Karan Mehta", against: "Arjun Nair", type: "Quality of work", status: "in_review", date: "10 Sep 2026" },
  { id: "CMP-2026-0009", by: "Rohit Malhotra", against: "Ramesh Jat", type: "Pricing dispute", status: "resolved", date: "05 Sep 2026" },
];

const META: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-danger-50 text-danger-600" },
  in_review: { label: "In Review", className: "bg-amber-100 text-amber-800" },
  resolved: { label: "Resolved", className: "bg-verified-100 text-verified-700" },
};

export default function AdminComplaints() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Complaints</h2>
        <p className="text-ink-600">Handle disputes and reported problems.</p>
      </div>

      {COMPLAINTS.length === 0 ? (
        <EmptyState icon="bell" title="No complaints" description="There are no open complaints right now." />
      ) : (
        <AdminTable columns={["ID", "Raised by", "Against", "Type", "Date", "Status"]}>
          {COMPLAINTS.map((c) => {
            const m = META[c.status];
            return (
              <tr key={c.id} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
                <td className="px-4 py-3 font-medium text-ink">{c.id}</td>
                <td className="px-4 py-3 text-ink-700">{c.by}</td>
                <td className="px-4 py-3 text-ink-700">{c.against}</td>
                <td className="px-4 py-3 text-ink-600">{c.type}</td>
                <td className="px-4 py-3 text-ink-600">{c.date}</td>
                <td className="px-4 py-3 text-right"><StatusBadge label={m.label} className={m.className} /></td>
              </tr>
            );
          })}
        </AdminTable>
      )}
    </div>
  );
}

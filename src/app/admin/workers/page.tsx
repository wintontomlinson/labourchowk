import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { VerifiedBadge } from "@/components/ui/Badge";
import { RatingInline } from "@/components/ui/Rating";
import { getWorkers } from "@/lib/db";
import { CITIES } from "@/data/cities";
import { priceLabel } from "@/lib/utils";

export default async function AdminWorkers() {
  const WORKERS = await getWorkers();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Workers</h2>
          <p className="text-ink-600">{WORKERS.length} workers on the platform.</p>
        </div>
      </div>

      <AdminTable columns={["Worker", "Service", "City", "Rating", "Status", "Rate"]}>
        {WORKERS.map((w) => {
          const city = CITIES.find((c) => c.slug === w.city)?.name ?? w.city;
          return (
            <tr key={w.id} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
              <td className="px-4 py-3">
                <Link href={`/worker/${w.id}`} className="font-medium text-ink hover:text-amber-600">
                  {w.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink-700">{w.profession}</td>
              <td className="px-4 py-3 text-ink-600">{city}</td>
              <td className="px-4 py-3"><RatingInline value={w.rating} count={w.reviewCount} size={12} /></td>
              <td className="px-4 py-3"><VerifiedBadge status={w.verification} /></td>
              <td className="px-4 py-3 text-right font-semibold text-ink">
                {priceLabel(w.price, w.priceModel)}
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}

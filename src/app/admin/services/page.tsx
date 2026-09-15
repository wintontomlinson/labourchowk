import { AdminTable } from "@/components/admin/AdminTable";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionButton";
import { SERVICES } from "@/data/services";
import { getWorkers } from "@/lib/db";
import { formatINR, priceModelWord } from "@/lib/utils";

export default async function AdminServices() {
  const WORKERS = await getWorkers();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Services</h2>
          <p className="text-ink-600">{SERVICES.length} service categories.</p>
        </div>
        <ActionButton className="btn-primary btn-sm" toastMessage="New service form coming soon" toastKind="info" loadingLabel="Opening…"><Icon name="plus" size={16} /> Add service</ActionButton>
      </div>

      <AdminTable columns={["Service", "Tagline", "Workers", "From", "Popular"]}>
        {SERVICES.map((s) => {
          const count = WORKERS.filter((w) => w.serviceSlug === s.slug).length;
          return (
            <tr key={s.slug} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
              <td className="px-4 py-3">
                <span className="flex items-center gap-2.5 font-medium text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ivory-100 text-ink-700">
                    <Icon name={s.icon as IconName} size={17} />
                  </span>
                  {s.name}
                </span>
              </td>
              <td className="px-4 py-3 text-ink-600">{s.tagline}</td>
              <td className="px-4 py-3 text-ink-700">{count}</td>
              <td className="px-4 py-3 text-ink-600">
                {s.priceFrom > 0 ? `${formatINR(s.priceFrom)} ${priceModelWord(s.priceModel)}` : "—"}
              </td>
              <td className="px-4 py-3 text-right">
                {s.popular ? (
                  <span className="chip bg-amber-50 text-amber-700">Popular</span>
                ) : (
                  <span className="text-ink-400">—</span>
                )}
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}

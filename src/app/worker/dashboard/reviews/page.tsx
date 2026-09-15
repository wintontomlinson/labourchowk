import { DashCard } from "@/components/dashboard/widgets";
import { Stars } from "@/components/ui/Rating";
import { Icon } from "@/components/ui/Icon";
import { getWorkerById, getReviewsForWorker, ratingDistributionFor } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function WorkerReviews() {
  const worker = (await getWorkerById("w-rakesh-kumar"))!;
  const reviews = await getReviewsForWorker(worker.id);
  const dist = await ratingDistributionFor(worker.id);
  const total = worker.reviewCount || 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Reviews</h2>
        <p className="text-ink-600">What customers say about your work.</p>
      </div>

      <DashCard title="Rating summary">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="text-center sm:w-40">
            <p className="font-display text-5xl font-extrabold text-ink">{worker.rating.toFixed(1)}</p>
            <Stars value={worker.rating} size={16} className="mt-1 justify-center" />
            <p className="mt-1 text-sm text-ink-500">{worker.reviewCount} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = dist[star] ?? 0;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-ink-600">{star}</span>
                  <Icon name="star" size={11} className="text-amber-500" />
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
                    <span className="block h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-6 text-right text-ink-500">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </DashCard>

      <DashCard title="All reviews">
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-ink/[0.06] pb-4 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-200 font-semibold text-ink-700">
                    {r.customerName.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.customerName}</p>
                    <p className="text-xs text-ink-500">{r.customerCity} · {formatDate(r.date)}</p>
                  </div>
                </div>
                <Stars value={r.rating} size={13} />
              </div>
              <p className="mt-2 text-[15px] text-ink-700">{r.text}</p>
            </div>
          ))}
        </div>
      </DashCard>
    </div>
  );
}

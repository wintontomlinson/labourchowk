import Link from "next/link";
import { DashCard } from "@/components/dashboard/widgets";
import { Stars } from "@/components/ui/Rating";
import { EmptyState } from "@/components/ui/States";
import { Icon } from "@/components/ui/Icon";
import { REVIEWS } from "@/data/reviews";
import { getBookings } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function CustomerReviews() {
  const BOOKINGS = await getBookings();
  // Reviews written by this demo customer (Amit Verma)
  const myReviews = REVIEWS.filter((r) => r.customerName === "Amit Verma");
  const awaiting = BOOKINGS.filter((b) => b.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Reviews</h2>
        <p className="text-ink-600">Rate workers you&apos;ve hired and see your past reviews.</p>
      </div>

      <DashCard title="Awaiting your review">
        {awaiting.length === 0 ? (
          <p className="text-sm text-ink-500">Nothing to review right now.</p>
        ) : (
          <div className="space-y-3">
            {awaiting.map((b) => (
              <div
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/[0.07] p-3.5"
              >
                <div>
                  <p className="font-semibold text-ink">{b.workerName}</p>
                  <p className="text-sm text-ink-500">{b.service} · {formatDate(b.date)}</p>
                </div>
                <Link href={`/worker/${b.workerId}`} className="btn-primary btn-sm">
                  <Icon name="star" size={15} />
                  Write a review
                </Link>
              </div>
            ))}
          </div>
        )}
      </DashCard>

      <DashCard title="Your reviews">
        {myReviews.length === 0 ? (
          <EmptyState
            icon="star"
            title="No reviews yet"
            description="Once you complete a booking, you can rate the worker here."
            actionLabel="Find a Worker"
            actionHref="/find-workers"
          />
        ) : (
          <div className="space-y-4">
            {myReviews.map((r) => (
              <div key={r.id} className="border-b border-ink/[0.06] pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <Link href={`/worker/${r.workerId}`} className="font-semibold text-ink hover:text-amber-600">
                    {r.service} worker
                  </Link>
                  <Stars value={r.rating} size={14} />
                </div>
                <p className="mt-1.5 text-[15px] text-ink-700">{r.text}</p>
                <p className="mt-1 text-xs text-ink-400">{formatDate(r.date)}</p>
              </div>
            ))}
          </div>
        )}
      </DashCard>
    </div>
  );
}

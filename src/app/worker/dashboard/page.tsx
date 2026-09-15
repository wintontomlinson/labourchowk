import Link from "next/link";
import { StatCard, DashCard } from "@/components/dashboard/widgets";
import { JobRequestCard } from "@/components/worker/JobRequestCard";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Rating";
import { JOB_REQUESTS, getBookings, getWorkerById } from "@/lib/db";
import { formatINR } from "@/lib/utils";

export default async function WorkerOverview() {
  const worker = (await getWorkerById("w-rakesh-kumar"))!;
  const BOOKINGS = await getBookings();
  const todaysJobs = BOOKINGS.filter((b) => ["confirmed", "in_progress"].includes(b.status));
  const profileCompletion = 85;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Namaste, Rakesh 👋</h2>
          <p className="text-ink-600">You have {JOB_REQUESTS.length} new job requests waiting.</p>
        </div>
        <Link href="/worker/dashboard/requests" className="btn-primary btn-md">
          <Icon name="bell" size={18} />
          View requests
        </Link>
      </div>

      {/* Earnings + rating stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="wallet" label="Today" value={formatINR(700)} tone="amber" />
        <StatCard icon="wallet" label="This week" value={formatINR(4200)} hint="+12%" />
        <StatCard icon="wallet" label="This month" value={formatINR(18400)} tone="green" hint="+8%" />
        <StatCard icon="star" label="Rating" value={worker.rating.toFixed(1)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* New requests */}
        <DashCard title="New job requests" action={{ href: "/worker/dashboard/requests", label: "See all" }}>
          <div className="space-y-3">
            {JOB_REQUESTS.slice(0, 2).map((r) => (
              <JobRequestCard key={r.id} request={r} />
            ))}
          </div>
        </DashCard>

        <div className="space-y-6">
          {/* Profile completion */}
          <DashCard title="Profile completion">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e7e0d3" strokeWidth="3.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="#e8792b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${(profileCompletion / 100) * 97.4} 97.4`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-extrabold text-ink">
                  {profileCompletion}%
                </span>
              </div>
              <div>
                <p className="text-sm text-ink-600">Complete your profile to appear higher in search and get more jobs.</p>
                <Link href="/worker/dashboard/profile" className="mt-2 inline-block text-sm font-semibold text-amber-600 hover:text-amber-700">
                  Complete Profile →
                </Link>
              </div>
            </div>
          </DashCard>

          {/* Today's jobs timeline */}
          <DashCard title="Today's jobs">
            {todaysJobs.length === 0 ? (
              <p className="text-sm text-ink-500">No jobs scheduled for today.</p>
            ) : (
              <ol className="relative ml-2 space-y-4 border-l border-ink/[0.1] pl-5">
                {todaysJobs.map((b) => (
                  <li key={b.id} className="relative">
                    <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 ring-4 ring-amber-100" />
                    <p className="text-sm font-semibold text-ink">{b.timeSlot.split("–")[0].trim()}</p>
                    <p className="text-sm text-ink-700">{b.service} · {b.customerName}</p>
                    <p className="text-xs text-ink-500">{b.address}, {b.city}</p>
                  </li>
                ))}
              </ol>
            )}
          </DashCard>
        </div>
      </div>

      {/* Rating summary */}
      <DashCard title="Your rating" action={{ href: "/worker/dashboard/reviews", label: "View reviews" }}>
        <div className="flex items-center gap-4">
          <span className="font-display text-4xl font-extrabold text-ink">{worker.rating.toFixed(1)}</span>
          <div>
            <Stars value={worker.rating} size={18} />
            <p className="mt-1 text-sm text-ink-500">Based on {worker.reviewCount} reviews · {worker.jobsDone} jobs done</p>
          </div>
        </div>
      </DashCard>
    </div>
  );
}

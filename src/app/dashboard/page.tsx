import Link from "next/link";
import { StatCard, DashCard, BookingRow } from "@/components/dashboard/widgets";
import { Icon } from "@/components/ui/Icon";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { getBookings, getNearbyWorkers } from "@/lib/db";

export default async function CustomerOverview() {
  const BOOKINGS = await getBookings();
  const upcoming = BOOKINGS.filter((b) => ["confirmed", "in_progress", "pending"].includes(b.status));
  const completed = BOOKINGS.filter((b) => b.status === "completed");
  const saved = await getNearbyWorkers(3);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Namaste, Amit 👋</h2>
          <p className="text-ink-600">Here&apos;s what&apos;s happening with your bookings.</p>
        </div>
        <Link href="/find-workers" className="btn-primary btn-md">
          <Icon name="plus" size={18} />
          Book a Worker
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="calendar" label="Upcoming booking" value={upcoming.length} tone="amber" />
        <StatCard icon="clock" label="Active request" value={BOOKINGS.filter((b) => b.status === "in_progress").length} />
        <StatCard icon="check" label="Completed jobs" value={completed.length} tone="green" />
        <StatCard icon="heart" label="Saved workers" value={saved.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Upcoming bookings */}
        <DashCard title="Upcoming bookings" action={{ href: "/dashboard/bookings", label: "View all" }}>
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-ink-500">No upcoming bookings.</p>
            ) : (
              upcoming.slice(0, 3).map((b) => <BookingRow key={b.id} booking={b} />)
            )}
          </div>
        </DashCard>

        {/* Active request card */}
        <DashCard title="Active request">
          {BOOKINGS.filter((b) => b.status === "in_progress").slice(0, 1).map((b) => (
            <div key={b.id} className="rounded-xl bg-ivory-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                In Progress
              </div>
              <p className="mt-2 font-display text-lg font-bold text-ink">{b.service}</p>
              <p className="text-sm text-ink-600">with {b.workerName}</p>
              <p className="mt-1 text-sm text-ink-500">{b.timeSlot} · {b.city}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/dashboard/messages" className="btn-outline btn-sm">Message</Link>
                <Link href="/dashboard/bookings" className="btn-dark btn-sm">Track</Link>
              </div>
            </div>
          ))}
        </DashCard>
      </div>

      {/* Saved workers */}
      <DashCard title="Recommended for you" action={{ href: "/find-workers", label: "Explore" }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </div>
      </DashCard>
    </div>
  );
}

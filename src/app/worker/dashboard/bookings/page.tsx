import { BookingRow } from "@/components/dashboard/widgets";
import { BOOKINGS } from "@/data/bookings";

export default function WorkerBookings() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">My bookings</h2>
        <p className="text-ink-600">All the jobs you&apos;ve accepted, in one place.</p>
      </div>
      <div className="space-y-3">
        {BOOKINGS.map((b) => (
          <BookingRow key={b.id} booking={b} view="worker" />
        ))}
      </div>
    </div>
  );
}

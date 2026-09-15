import { DashCard } from "@/components/dashboard/widgets";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkerCalendar() {
  // Demo: mark a few days as booked / off for September 2026
  const today = 15;
  const booked = new Set([16, 17, 18, 22]);
  const off = new Set([21, 28]);
  const firstDayOffset = 1; // Sep 1 2026 is a Tuesday -> offset by 1

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Calendar</h2>
        <p className="text-ink-600">Your schedule for September 2026.</p>
      </div>

      <DashCard title="September 2026">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {DAYS.map((d) => (
            <div key={d} className="pb-2 text-xs font-semibold uppercase text-ink-500">{d}</div>
          ))}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today;
            const isBooked = booked.has(day);
            const isOff = off.has(day);
            return (
              <div
                key={day}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded-lg text-sm",
                  isToday && "ring-2 ring-amber-500",
                  isBooked ? "bg-amber-50 font-semibold text-amber-700" : isOff ? "bg-ink/[0.04] text-ink-400" : "text-ink-700 hover:bg-ivory-100"
                )}
              >
                {day}
                {isBooked && <span className="mt-0.5 h-1 w-1 rounded-full bg-amber-500" />}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-600">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-50 ring-1 ring-amber-200" /> Booked</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-ink/[0.06]" /> Day off</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded ring-2 ring-amber-500" /> Today</span>
        </div>
      </DashCard>
    </div>
  );
}

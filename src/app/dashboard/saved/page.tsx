import { WorkerCard } from "@/components/worker/WorkerCard";
import { nearbyWorkers } from "@/lib/queries";

export default function SavedWorkers() {
  const saved = nearbyWorkers(6);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Saved workers</h2>
        <p className="text-ink-600">Workers you&apos;ve shortlisted for future jobs.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((w) => (
          <WorkerCard key={w.id} worker={w} />
        ))}
      </div>
    </div>
  );
}

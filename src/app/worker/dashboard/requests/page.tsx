import { JobRequestCard } from "@/components/worker/JobRequestCard";
import { EmptyState } from "@/components/ui/States";
import { JOB_REQUESTS } from "@/lib/db";

export default function WorkerRequests() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Job requests</h2>
        <p className="text-ink-600">Accept or decline new requests from customers near you.</p>
      </div>
      {JOB_REQUESTS.length === 0 ? (
        <EmptyState
          icon="bell"
          title="No new requests"
          description="When customers request your services, they'll show up here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {JOB_REQUESTS.map((r) => (
            <JobRequestCard key={r.id} request={r} />
          ))}
        </div>
      )}
    </div>
  );
}

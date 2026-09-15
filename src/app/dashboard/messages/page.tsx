import { EmptyState } from "@/components/ui/States";

export default function Messages() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Messages</h2>
        <p className="text-ink-600">Chat with workers about your bookings.</p>
      </div>
      <EmptyState
        icon="chat"
        title="No messages yet"
        description="When you book a worker, your conversation will appear here so you can coordinate the job."
        actionLabel="Find a Worker"
        actionHref="/find-workers"
      />
    </div>
  );
}

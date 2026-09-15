import { DashCard } from "@/components/dashboard/widgets";
import { cn } from "@/lib/utils";

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        on ? "bg-amber-500" : "bg-ink/15"
      )}
    >
      <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white transition-transform", on ? "translate-x-5" : "translate-x-0.5")} />
    </span>
  );
}

export default function WorkerSettings() {
  const rows: { label: string; desc: string; on: boolean }[] = [
    { label: "Available for new jobs", desc: "Turn off to stop receiving new requests.", on: true },
    { label: "New request notifications", desc: "Get notified about matching jobs near you.", on: true },
    { label: "SMS alerts", desc: "Receive booking updates by SMS.", on: false },
    { label: "Show phone on profile", desc: "Let customers call you directly.", on: true },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Settings</h2>
        <p className="text-ink-600">Manage your account and preferences.</p>
      </div>

      <DashCard title="Preferences">
        <div className="divide-y divide-ink/[0.06]">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="font-medium text-ink">{r.label}</p>
                <p className="text-sm text-ink-500">{r.desc}</p>
              </div>
              <Toggle on={r.on} />
            </div>
          ))}
        </div>
      </DashCard>

      <DashCard title="Account">
        <div className="space-y-3">
          <button className="btn-outline btn-md w-full justify-start">Change password</button>
          <button className="btn-outline btn-md w-full justify-start">Payout details</button>
          <button className="btn-md w-full justify-start bg-danger-50 text-danger-600 hover:bg-danger-100">
            Deactivate account
          </button>
        </div>
      </DashCard>
    </div>
  );
}

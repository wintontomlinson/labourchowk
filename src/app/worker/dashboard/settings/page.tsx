"use client";

import { useState } from "react";
import { DashCard } from "@/components/dashboard/widgets";
import { ActionButton } from "@/components/ui/ActionButton";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-amber-500" : "bg-ink/15"
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          on ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const INITIAL = [
  { key: "available", label: "Available for new jobs", desc: "Turn off to stop receiving new requests.", on: true },
  { key: "notify", label: "New request notifications", desc: "Get notified about matching jobs near you.", on: true },
  { key: "sms", label: "SMS alerts", desc: "Receive booking updates by SMS.", on: false },
  { key: "phone", label: "Show phone on profile", desc: "Let customers call you directly.", on: true },
];

export default function WorkerSettings() {
  const { toast } = useToast();
  const [rows, setRows] = useState(INITIAL);

  const toggle = (key: string) => {
    setRows((prev) => {
      const next = prev.map((r) => (r.key === key ? { ...r, on: !r.on } : r));
      const changed = next.find((r) => r.key === key)!;
      toast(`${changed.label}: ${changed.on ? "On" : "Off"}`, "info");
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Settings</h2>
        <p className="text-ink-600">Manage your account and preferences.</p>
      </div>

      <DashCard title="Preferences">
        <div className="divide-y divide-ink/[0.06]">
          {rows.map((r) => (
            <div key={r.key} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="font-medium text-ink">{r.label}</p>
                <p className="text-sm text-ink-500">{r.desc}</p>
              </div>
              <Toggle on={r.on} onChange={() => toggle(r.key)} />
            </div>
          ))}
        </div>
      </DashCard>

      <DashCard title="Account">
        <div className="space-y-3">
          <ActionButton className="btn-outline btn-md w-full justify-start" toastMessage="Password reset link sent" toastKind="info" loadingLabel="Please wait…">
            Change password
          </ActionButton>
          <ActionButton className="btn-outline btn-md w-full justify-start" toastMessage="Payout details saved" loadingLabel="Opening…">
            Payout details
          </ActionButton>
          <ActionButton
            className="btn-md w-full justify-start bg-danger-50 text-danger-600 hover:bg-danger-100"
            toastMessage="Account deactivation requires confirmation from support"
            toastKind="info"
            loadingLabel="Please wait…"
          >
            Deactivate account
          </ActionButton>
        </div>
      </DashCard>
    </div>
  );
}

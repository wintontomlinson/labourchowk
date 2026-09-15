import { DashCard } from "@/components/dashboard/widgets";
import { ActionButton } from "@/components/ui/ActionButton";

export default function AdminSettings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Settings</h2>
        <p className="text-ink-600">Platform configuration.</p>
      </div>

      <DashCard title="General">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Platform name</label>
            <input defaultValue="Labour Chowk" className="input" />
          </div>
          <div>
            <label className="label">Support email</label>
            <input defaultValue="support@labourchowk.example" className="input" />
          </div>
          <div>
            <label className="label">Commission (%)</label>
            <input defaultValue="10" className="input" />
          </div>
          <div>
            <label className="label">Default city</label>
            <input defaultValue="Delhi" className="input" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <ActionButton className="btn-primary btn-md" toastMessage="Settings saved">Save settings</ActionButton>
        </div>
      </DashCard>

      <DashCard title="Verification policy">
        <p className="text-sm text-ink-600">
          Workers must complete identity, photo and address verification before the Verified badge
          is shown. Verification status is always displayed publicly on worker profiles.
        </p>
      </DashCard>
    </div>
  );
}

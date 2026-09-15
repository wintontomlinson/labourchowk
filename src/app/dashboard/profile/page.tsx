import { DashCard } from "@/components/dashboard/widgets";
import { Icon } from "@/components/ui/Icon";

export default function CustomerProfile() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Profile</h2>
        <p className="text-ink-600">Manage your personal details.</p>
      </div>

      <DashCard title="Personal details">
        <div className="mb-5 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ivory-200 font-display text-2xl font-extrabold text-ink">
            A
          </span>
          <button className="btn-outline btn-sm">
            <Icon name="camera" size={16} />
            Change photo
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full name</label>
            <input defaultValue="Amit Verma" className="input" />
          </div>
          <div>
            <label className="label">Mobile number</label>
            <input defaultValue="+91 90000 00000" className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input defaultValue="amit.verma@example.com" className="input" />
          </div>
          <div>
            <label className="label">City</label>
            <input defaultValue="Delhi" className="input" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Default address</label>
            <input defaultValue="B-42, Laxmi Nagar, Delhi" className="input" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button className="btn-primary btn-md">Save changes</button>
        </div>
      </DashCard>
    </div>
  );
}

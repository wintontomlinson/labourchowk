import { DashCard } from "@/components/dashboard/widgets";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { ActionButton } from "@/components/ui/ActionButton";

export default function CustomerProfile() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Profile</h2>
        <p className="text-ink-600">Manage your personal details.</p>
      </div>

      <DashCard title="Personal details">
        <div className="mb-5 flex items-center gap-4">
          <Avatar name="Amit Verma" size={64} rounded="rounded-2xl" />
          <ActionButton className="btn-outline btn-sm" toastMessage="Photo upload is coming soon" toastKind="info" loadingLabel="Opening…">
            <Icon name="camera" size={16} />
            Change photo
          </ActionButton>
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
          <ActionButton className="btn-primary btn-md" toastMessage="Profile updated">Save changes</ActionButton>
        </div>
      </DashCard>
    </div>
  );
}

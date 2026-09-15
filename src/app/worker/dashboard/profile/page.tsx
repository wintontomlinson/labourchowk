import Link from "next/link";
import { DashCard } from "@/components/dashboard/widgets";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { getWorker } from "@/data/workers";
import { priceLabel } from "@/lib/utils";

export default function WorkerProfileEdit() {
  const worker = getWorker("w-rakesh-kumar")!;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">My profile</h2>
          <p className="text-ink-600">This is what customers see.</p>
        </div>
        <Link href={`/worker/${worker.id}`} className="btn-outline btn-sm">
          <Icon name="user" size={16} /> Preview
        </Link>
      </div>

      <DashCard title="Basic details">
        <div className="mb-5 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ivory-200 font-display text-2xl font-extrabold text-ink">
            R
          </span>
          <div className="flex items-center gap-2">
            <button className="btn-outline btn-sm"><Icon name="camera" size={16} /> Change photo</button>
            <VerifiedBadge status={worker.verification} size="md" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={worker.name} />
          <Field label="Profession" value={worker.profession} />
          <Field label="Experience" value={`${worker.experienceYears} years`} />
          <Field label="Rate" value={priceLabel(worker.price, worker.priceModel)} />
          <div className="sm:col-span-2">
            <label className="label">About</label>
            <textarea defaultValue={worker.about} rows={4} className="input h-auto py-3 leading-relaxed" />
          </div>
        </div>
      </DashCard>

      <DashCard title="Skills">
        <div className="flex flex-wrap gap-2">
          {worker.skills.map((s) => (
            <span key={s} className="chip border border-ink/10 bg-white px-3 py-1.5 text-ink-800">
              {s}
              <Icon name="close" size={13} className="text-ink-400" />
            </span>
          ))}
          <button className="chip border border-dashed border-ink/25 px-3 py-1.5 text-ink-600">
            <Icon name="plus" size={13} /> Add skill
          </button>
        </div>
      </DashCard>

      <div className="flex justify-end">
        <button className="btn-primary btn-md">Save changes</button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input defaultValue={value} className="input" />
    </div>
  );
}

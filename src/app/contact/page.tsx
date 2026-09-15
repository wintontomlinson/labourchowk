import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ActionButton } from "@/components/ui/ActionButton";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Labour Chowk team for support, partnerships or feedback.",
};

const CHANNELS: { icon: IconName; title: string; value: string }[] = [
  { icon: "phone", title: "Phone support", value: "1800 000 0000 (9 AM – 9 PM)" },
  { icon: "chat", title: "Email", value: "support@labourchowk.example" },
  { icon: "pin", title: "Office", value: "Connaught Place, New Delhi" },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader title="We'd love to hear from you" subtitle="Questions, feedback or partnership ideas — reach out." />
      <div className="container-lc grid gap-8 py-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {CHANNELS.map((c) => (
            <div key={c.title} className="flex items-start gap-3.5 rounded-card border border-ink/[0.07] bg-white p-4 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Icon name={c.icon} size={22} />
              </span>
              <div>
                <p className="font-semibold text-ink">{c.title}</p>
                <p className="text-sm text-ink-600">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="rounded-card border border-ink/[0.07] bg-white p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" placeholder="Your mobile number" />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Message</label>
            <textarea rows={5} className="input h-auto py-3" placeholder="How can we help?" />
          </div>
          <ActionButton className="btn-primary btn-md mt-4" toastMessage="Thanks! We'll get back to you soon." loadingLabel="Sending…">Send message</ActionButton>
        </form>
      </div>
    </SiteShell>
  );
}

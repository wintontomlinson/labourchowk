export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b border-ink/[0.06] bg-ivory-200/50">
      <div className="container-lc py-12 sm:py-16">
        <h1 className="max-w-2xl font-display text-[30px] font-extrabold leading-tight text-ink sm:text-[38px]">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-xl text-[16px] text-ink-700">{subtitle}</p>}
      </div>
    </section>
  );
}

/** Simple prose wrapper for legal/policy text. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-lc max-w-3xl py-10">
      <div className="space-y-4 text-[15px] leading-relaxed text-ink-700 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

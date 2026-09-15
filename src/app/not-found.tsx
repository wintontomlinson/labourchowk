import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="container-lc flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ivory-200 text-ink-500">
          <Icon name="search" size={30} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-2 max-w-md text-ink-600">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-dark btn-md">Back to Home</Link>
          <Link href="/find-workers" className="btn-outline btn-md">Find Workers</Link>
        </div>
      </div>
    </SiteShell>
  );
}

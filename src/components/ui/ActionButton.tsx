"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { cn } from "@/lib/utils";

/**
 * A demo action button that gives real feedback (loading → toast) instead of
 * silently doing nothing. Used for forms/actions that aren't yet wired to a
 * backend mutation (save profile, settings, etc.), so the UI never feels dead.
 */
export function ActionButton({
  children,
  className,
  toastMessage,
  toastKind = "success",
  loadingLabel = "Saving…",
}: {
  children: React.ReactNode;
  className?: string;
  toastMessage: string;
  toastKind?: "success" | "info" | "error";
  loadingLabel?: string;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast(toastMessage, toastKind);
        }, 700);
      }}
      className={cn(className, loading && "opacity-70")}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          {loadingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

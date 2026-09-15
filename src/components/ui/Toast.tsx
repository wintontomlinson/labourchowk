"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

const ToastContext = createContext<{
  toast: (message: string, kind?: ToastKind) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-sm shadow-card-hover animate-slide-up",
              t.kind === "success" && "bg-ink text-ivory-100",
              t.kind === "error" && "bg-danger-500 text-white",
              t.kind === "info" && "bg-white text-ink border border-ink/10"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                t.kind === "success" && "bg-verified-500 text-white",
                t.kind === "error" && "bg-white/20 text-white",
                t.kind === "info" && "bg-amber-100 text-amber-700"
              )}
            >
              <Icon name={t.kind === "error" ? "close" : "check"} size={14} strokeWidth={2.4} />
            </span>
            <span className="flex-1 leading-snug">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

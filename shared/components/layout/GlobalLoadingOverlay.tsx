"use client";

import { useLoadingStore } from "@/shared/stores/useLoadingStore";
import { Spinner } from "@/shared/components/ui/Spinner";

export function GlobalLoadingOverlay() {
  const { isLoading } = useLoadingStore();

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300
        ${isLoading ? "opacity-100 bg-black/50 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <Spinner className="w-8 h-8 text-white" />
    </div>
  );
}

"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/shared/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 border-b p-4 flex items-center gap-4">
        <h1 className="text-lg font-semibold">dopamine-dash</h1>
      </header>

      <div className="flex flex-1 relative">
        {/* 사이드바 */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* 사이드바 토글 버튼 */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={cn(
            "z-50 p-2 rounded-md shadow-md transition-all duration-300",
            "bg-white text-muted-foreground hover:bg-muted",
            isSidebarOpen ? "absolute left-60 top-4 translate-x-1" : "absolute left-0 top-4 translate-x-1"
          )}
          aria-label="사이드바 토글"
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* 콘텐츠 */}
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </div>

      <footer className="bg-gray-100 border-t p-4 text-center text-sm text-muted-foreground">
        © 2025 dopamine-dash. All rights reserved.
      </footer>
    </div>
  );
}

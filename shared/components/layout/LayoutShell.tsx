import * as React from "react"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 border-b p-4">
        <h1 className="text-lg font-semibold">dopamine-dash</h1>
      </header>

      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-100 border-t p-4 text-center text-sm text-muted-foreground">
        © 2025 dopamine-dash. All rights reserved.
      </footer>
    </div>
  );
}
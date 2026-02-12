"use client"

import { AppHeader } from "@/shared/components/layout/app-header"
import { useSidebar } from "@/shared/contexts/sidebar-context"
import { cn } from "@/lib/utils"

export function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen transition-[padding-left] duration-300 ease-in-out",
        collapsed ? "pl-14" : "pl-56"
      )}
    >
      <AppHeader />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}

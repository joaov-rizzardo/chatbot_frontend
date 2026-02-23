"use client"

import type { ElementType } from "react"
import { cn } from "@/lib/utils"

export type TabId = "todos" | "recentes" | "novos" | "nunca-contatados"

interface TabBarProps {
  tabs: { id: TabId; label: string; icon: ElementType }[]
  counts: Record<TabId, number>
  activeTab: TabId
  onTabChange: (id: TabId) => void
}

export function TabBar({ tabs, counts, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-px scrollbar-hide">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id
        const count = counts[id]
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
            aria-selected={isActive}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {label}
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full px-1.5 py-px text-[11px] font-semibold tabular-nums min-w-[20px]",
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

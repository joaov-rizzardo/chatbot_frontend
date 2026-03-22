"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { FILTER_TABS, type FilterTab } from "../hooks/use-conversations-panel"

interface ConversationsPanelSearchProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  conversations: Conversation[]
  activeFilter: FilterTab
  onFilterChange: (f: FilterTab) => void
}

export function ConversationsPanelSearch({
  searchQuery,
  onSearchChange,
  conversations,
  activeFilter,
  onFilterChange,
}: ConversationsPanelSearchProps) {
  return (
    <div className="px-3 pt-3 pb-2 bg-card border-b border-border">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar conversa..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full pl-8 pr-3 py-2 text-xs rounded-lg",
              "bg-background border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30",
              "transition-colors"
            )}
          />
        </div>
        <button
          type="button"
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            "bg-background border border-border",
            "text-muted-foreground hover:text-primary hover:border-primary/50",
            "transition-colors"
          )}
          aria-label="Filtros avançados"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-1 mt-2">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === "all"
              ? conversations.length
              : conversations.filter((c) => c.status === tab.key).length
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onFilterChange(tab.key)}
              className={cn(
                "flex-1 text-[10px] font-medium py-1.5 rounded-md transition-all duration-150",
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "ml-1 text-[9px]",
                    activeFilter === tab.key ? "opacity-75" : "opacity-50"
                  )}
                >
                  ({count})
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

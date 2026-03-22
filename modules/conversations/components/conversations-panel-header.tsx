"use client"

import { Plus, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConversationsPanelHeaderProps {
  collapsed: boolean
  totalUnread: number
  onCollapse: () => void
}

export function ConversationsPanelHeader({
  collapsed,
  totalUnread,
  onCollapse,
}: ConversationsPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
      {!collapsed && (
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-foreground tracking-wide uppercase">
            Conversas
          </h2>
          {totalUnread > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {totalUnread}
            </span>
          )}
        </div>
      )}
      <div className={cn("flex items-center gap-1", collapsed && "mx-auto")}>
        {!collapsed && (
          <button
            type="button"
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Nova conversa"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onCollapse}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          aria-label={collapsed ? "Expandir" : "Recolher"}
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>
    </div>
  )
}

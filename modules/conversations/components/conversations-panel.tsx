"use client"

import { useState, useEffect, useRef } from "react"
import { Search, SlidersHorizontal, Plus, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation, ConversationStatus } from "../types/conversation"
import { ConversationItem } from "./conversation-item"

type FilterTab = "all" | ConversationStatus

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "open", label: "Abertas" },
  { key: "pending", label: "Pendentes" },
  { key: "resolved", label: "Resolvidas" },
]

interface ConversationsPanelProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onLoadMore?: () => void
  hasNextPage?: boolean
  isLoadingMore?: boolean
}

export function ConversationsPanel({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
}: ConversationsPanelProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")
  const [collapsed, setCollapsed] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onLoadMore || !hasNextPage) return
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      { threshold: 0.1 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onLoadMore, hasNextPage])

  const filtered = conversations.filter((c) => {
    const matchesStatus = activeFilter === "all" || c.status === activeFilter
    const matchesSearch =
      !searchQuery ||
      c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.phone.includes(searchQuery) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0)

  return (
    <div
      className={cn(
        "flex flex-col shrink-0 bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-14" : "w-80"
      )}
    >
      {/* Panel Header */}
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
            onClick={() => setCollapsed((v) => !v)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label={collapsed ? "Expandir" : "Recolher"}
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Search */}
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

            {/* Filter Tabs */}
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
                    onClick={() => setActiveFilter(tab.key)}
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

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <Search className="w-6 h-6 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">Nenhuma conversa encontrada</p>
              </div>
            ) : (
              <>
                {filtered.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isSelected={conv.id === selectedId}
                    onClick={() => onSelect(conv.id)}
                  />
                ))}
                {hasNextPage && (
                  <div ref={sentinelRef} className="py-3 flex justify-center">
                    {isLoadingMore && (
                      <span className="text-[10px] text-muted-foreground">Carregando...</span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Collapsed state: just avatars */}
      {collapsed && (
        <div className="flex-1 overflow-y-auto py-2 flex flex-col items-center gap-2">
          {conversations
            .filter((c) => c.unreadCount > 0)
            .slice(0, 6)
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCollapsed(false)
                  onSelect(c.id)
                }}
                className="relative w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-primary transition-all"
              >
                {c.contact.avatarUrl ? (
                  <img src={c.contact.avatarUrl} alt={c.contact.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {c.contact.name[0]}
                  </div>
                )}
                {c.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center">
                    {c.unreadCount}
                  </span>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

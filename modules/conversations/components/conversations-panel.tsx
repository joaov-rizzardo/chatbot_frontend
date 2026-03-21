"use client"

import { Search, SlidersHorizontal, Plus, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { ConversationItem } from "./conversation-item"
import { ContactAvatar } from "@/shared/components/ui/contact-avatar"
import { useConversationsPanel, FILTER_TABS } from "../hooks/use-conversations-panel"

interface ConversationsPanelProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onLoadMore?: () => void
  hasNextPage?: boolean
  isLoadingMore?: boolean
  onLoadPrevious?: () => void
  hasPreviousPage?: boolean
  isLoadingPrevious?: boolean
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
  onLoadPrevious,
  hasPreviousPage,
  isLoadingPrevious,
}: ConversationsPanelProps) {
  const {
    activeFilter,
    setActiveFilter,
    collapsed,
    setCollapsed,
    scrollContainerRef,
    topSentinelRef,
    bottomSentinelRef,
    filtered,
    totalUnread,
  } = useConversationsPanel({
    conversations,
    searchQuery,
    onLoadMore,
    hasNextPage,
    isLoadingMore,
    onLoadPrevious,
    hasPreviousPage,
    isLoadingPrevious,
  })

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

      {/* Expanded state */}
      {!collapsed && (
        <>
          {/* Search & Filters */}
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
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            {hasPreviousPage && (
              <div ref={topSentinelRef} className="py-2 flex justify-center">
                {isLoadingPrevious && (
                  <span className="text-[10px] text-muted-foreground">Carregando...</span>
                )}
              </div>
            )}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <Search className="w-6 h-6 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">Nenhuma conversa encontrada</p>
              </div>
            ) : (
              <>
                {filtered.map((conv) => (
                  <div key={conv.id} data-conv-id={conv.id}>
                    <ConversationItem
                      conversation={conv}
                      isSelected={conv.id === selectedId}
                      onClick={() => onSelect(conv.id)}
                    />
                  </div>
                ))}
                {hasNextPage && (
                  <div ref={bottomSentinelRef} className="py-3 flex justify-center">
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

      {/* Collapsed state: avatar rail */}
      {collapsed && (
        <div
          ref={scrollContainerRef}
          className="flex-1 flex flex-col items-center gap-1 py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {hasPreviousPage && (
            <div ref={topSentinelRef} className="w-full py-1 flex justify-center">
              {isLoadingPrevious && (
                <span className="text-[10px] text-muted-foreground">...</span>
              )}
            </div>
          )}
          {conversations.map((c) => (
            <button
              key={c.id}
              data-conv-id={c.id}
              type="button"
              title={c.contact.name}
              onClick={() => {
                setCollapsed(false)
                onSelect(c.id)
              }}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150 shrink-0",
                c.id === selectedId
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
              )}
            >
              <ContactAvatar name={c.contact.name} avatarUrl={c.contact.avatarUrl} className="w-9 h-9 text-[11px]" />
              {c.unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center px-0.5 shadow-sm ring-1 ring-background">
                  {c.unreadCount > 9 ? "9+" : c.unreadCount}
                </span>
              )}
            </button>
          ))}
          {hasNextPage && (
            <div ref={bottomSentinelRef} className="w-full py-1 flex justify-center">
              {isLoadingMore && (
                <span className="text-[10px] text-muted-foreground">...</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

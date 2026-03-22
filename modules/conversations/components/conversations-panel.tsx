"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { useConversationsPanel } from "../hooks/use-conversations-panel"
import { ConversationsPanelHeader } from "./conversations-panel-header"
import { ConversationsPanelSearch } from "./conversations-panel-search"
import { ConversationsPanelList } from "./conversations-panel-list"
import { ConversationsPanelCollapsed } from "./conversations-panel-collapsed"

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
      <ConversationsPanelHeader
        collapsed={collapsed}
        totalUnread={totalUnread}
        onCollapse={() => setCollapsed((v) => !v)}
      />

      {!collapsed && (
        <>
          <ConversationsPanelSearch
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            conversations={conversations}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <ConversationsPanelList
            filtered={filtered}
            selectedId={selectedId}
            onSelect={onSelect}
            scrollContainerRef={scrollContainerRef}
            topSentinelRef={topSentinelRef}
            bottomSentinelRef={bottomSentinelRef}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            isLoadingMore={isLoadingMore}
            isLoadingPrevious={isLoadingPrevious}
          />
        </>
      )}

      {collapsed && (
        <ConversationsPanelCollapsed
          conversations={conversations}
          selectedId={selectedId}
          onSelect={onSelect}
          onExpand={() => setCollapsed(false)}
          scrollContainerRef={scrollContainerRef}
          topSentinelRef={topSentinelRef}
          bottomSentinelRef={bottomSentinelRef}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          isLoadingMore={isLoadingMore}
          isLoadingPrevious={isLoadingPrevious}
        />
      )}
    </div>
  )
}

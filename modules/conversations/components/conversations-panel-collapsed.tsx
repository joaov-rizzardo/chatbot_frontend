"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { ContactAvatar } from "@/shared/components/ui/contact-avatar"

interface ConversationsPanelCollapsedProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  onExpand: () => void
  scrollContainerRef: React.RefObject<HTMLDivElement>
  topSentinelRef: (node: HTMLDivElement | null) => void
  bottomSentinelRef: (node: HTMLDivElement | null) => void
  hasPreviousPage?: boolean
  hasNextPage?: boolean
  isLoadingMore?: boolean
  isLoadingPrevious?: boolean
}

export function ConversationsPanelCollapsed({
  conversations,
  selectedId,
  onSelect,
  onExpand,
  scrollContainerRef,
  topSentinelRef,
  bottomSentinelRef,
  hasPreviousPage,
  hasNextPage,
  isLoadingMore,
  isLoadingPrevious,
}: ConversationsPanelCollapsedProps) {
  return (
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
            onExpand()
            onSelect(c.id)
          }}
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150 shrink-0",
            c.id === selectedId
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
              : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
          )}
        >
          <ContactAvatar
            name={c.contact.name}
            avatarUrl={c.contact.avatarUrl}
            className="w-9 h-9 text-[11px]"
          />
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
  )
}

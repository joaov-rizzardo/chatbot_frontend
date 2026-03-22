"use client"

import { Search } from "lucide-react"
import type { Conversation } from "../types/conversation"
import { ConversationItem } from "./conversation-item"

interface ConversationsPanelListProps {
  filtered: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
  scrollContainerRef: React.RefObject<HTMLDivElement>
  topSentinelRef: (node: HTMLDivElement | null) => void
  bottomSentinelRef: (node: HTMLDivElement | null) => void
  hasPreviousPage?: boolean
  hasNextPage?: boolean
  isLoadingMore?: boolean
  isLoadingPrevious?: boolean
}

export function ConversationsPanelList({
  filtered,
  selectedId,
  onSelect,
  scrollContainerRef,
  topSentinelRef,
  bottomSentinelRef,
  hasPreviousPage,
  hasNextPage,
  isLoadingMore,
  isLoadingPrevious,
}: ConversationsPanelListProps) {
  return (
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
  )
}

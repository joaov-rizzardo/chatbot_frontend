"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { ConversationsPanel } from "./conversations-panel"
import { ConversationHeader } from "./conversation-header"
import { MessageList } from "./message-list"
import { MessageComposer } from "./message-composer"
import { ConversationEmptyState } from "./conversation-empty-state"
import { ConversationsPanelSkeleton } from "./conversations-panel-skeleton"
import { ConversationHeaderSkeleton } from "./conversation-header-skeleton"
import { MessageListSkeleton } from "./message-list-skeleton"
import { useQueryClient } from "@tanstack/react-query"
import { useConversationsQuery, conversationsQueryKey } from "../queries/use-conversations-query"
import { mockMessagesByConv } from "../data/mock-messages"

export function ConversationsLayout() {
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: conversationsQueryKey })
    }
  }, [queryClient])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading,
    isError,
  } = useConversationsQuery()

  const conversations = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  )

  const selectedConversationRef = useRef<typeof conversations[number] | null>(null)
  const found = conversations.find((c) => c.id === selectedId) ?? null
  if (found) selectedConversationRef.current = found
  if (!selectedId) selectedConversationRef.current = null
  const selectedConversation = selectedConversationRef.current
  const messages = selectedId ? (mockMessagesByConv[selectedId] ?? []) : []

  return (
    // -m-6 counteracts the p-6 padding from AppLayoutContent's <main>
    // height: calc(100vh - 3.5rem) = full viewport minus header (h-14)
    <div
      className="-m-6 flex overflow-hidden bg-background"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      {isLoading ? (
        <ConversationsPanelSkeleton />
      ) : (
        <ConversationsPanel
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoadingMore={isFetchingNextPage}
          onLoadPrevious={fetchPreviousPage}
          hasPreviousPage={hasPreviousPage}
          isLoadingPrevious={isFetchingPreviousPage}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[oklch(0.95_0.02_150)]">
        {isLoading ? (
          <>
            <ConversationHeaderSkeleton />
            <MessageListSkeleton />
          </>
        ) : isError ? (
          <ConversationEmptyState />
        ) : selectedConversation ? (
          <>
            <ConversationHeader conversation={selectedConversation} />
            <MessageList messages={messages} />
            <MessageComposer />
          </>
        ) : (
          <ConversationEmptyState />
        )}
      </div>
    </div>
  )
}

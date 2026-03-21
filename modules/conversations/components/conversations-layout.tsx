"use client"

import { useState, useMemo } from "react"
import { ConversationsPanel } from "./conversations-panel"
import { ConversationHeader } from "./conversation-header"
import { MessageList } from "./message-list"
import { MessageComposer } from "./message-composer"
import { ConversationEmptyState } from "./conversation-empty-state"
import { ConversationsPanelSkeleton } from "./conversations-panel-skeleton"
import { ConversationHeaderSkeleton } from "./conversation-header-skeleton"
import { MessageListSkeleton } from "./message-list-skeleton"
import { useConversationsQuery } from "../queries/use-conversations-query"
import { mockMessagesByConv } from "../data/mock-messages"

export function ConversationsLayout() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useConversationsQuery()

  const conversations = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  )

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null
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

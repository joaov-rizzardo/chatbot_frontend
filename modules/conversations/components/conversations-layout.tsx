"use client"

import { ConversationsPanel } from "./conversations-panel"
import { ConversationHeader } from "./conversation-header"
import { MessageList } from "./message-list"
import { MessageComposer } from "./message-composer"
import { ConversationEmptyState } from "./conversation-empty-state"
import { ConversationsPanelSkeleton } from "./conversations-panel-skeleton"
import { ConversationHeaderSkeleton } from "./conversation-header-skeleton"
import { MessageListSkeleton } from "./message-list-skeleton"
import { useConversationsLayout } from "../hooks/use-conversations-layout"

export function ConversationsLayout() {
  const {
    conversations,
    selectedConversation,
    messages,
    selectedId,
    setSelectedId,
    searchQuery,
    setSearchQuery,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading,
    isError,
    isLoadingMessages,
    fetchOlderMessages,
    hasOlderMessages,
    isFetchingOlderMessages,
    fetchNewerMessages,
    hasNewerMessages,
    isFetchingNewerMessages,
  } = useConversationsLayout()

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
            {isLoadingMessages ? (
              <MessageListSkeleton />
            ) : (
              <MessageList
                key={selectedId}
                messages={messages}
                onLoadOlder={fetchOlderMessages}
                hasOlderMessages={hasOlderMessages ?? false}
                isLoadingOlder={isFetchingOlderMessages}
                onLoadNewer={fetchNewerMessages}
                hasNewerMessages={hasNewerMessages ?? false}
                isLoadingNewer={isFetchingNewerMessages}
              />
            )}
            <MessageComposer />
          </>
        ) : (
          <ConversationEmptyState />
        )}
      </div>
    </div>
  )
}

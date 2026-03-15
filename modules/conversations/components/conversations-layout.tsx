"use client"

import { useState } from "react"
import { ConversationsPanel } from "./conversations-panel"
import { ConversationHeader } from "./conversation-header"
import { MessageList } from "./message-list"
import { MessageComposer } from "./message-composer"
import { ConversationEmptyState } from "./conversation-empty-state"
import { mockConversations } from "../data/mock-conversations"
import { mockMessagesByConv } from "../data/mock-messages"

export function ConversationsLayout() {
  const [selectedId, setSelectedId] = useState<string | null>("1")
  const [searchQuery, setSearchQuery] = useState("")

  const selectedConversation = mockConversations.find((c) => c.id === selectedId) ?? null
  const messages = selectedId ? (mockMessagesByConv[selectedId] ?? []) : []

  return (
    // -m-6 counteracts the p-6 padding from AppLayoutContent's <main>
    // height: calc(100vh - 3.5rem) = full viewport minus header (h-14)
    <div
      className="-m-6 flex overflow-hidden"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      <ConversationsPanel
        conversations={mockConversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Chat Area */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: "oklch(0.10 0.02 150)" }}
      >
        {selectedConversation ? (
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

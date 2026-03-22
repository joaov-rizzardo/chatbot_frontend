"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useConversationsQuery, conversationsQueryKey } from "../queries/use-conversations-query"
import { useMessagesQuery } from "../queries/use-messages-query"

export function useConversationsLayout() {
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: conversationsQueryKey })
      queryClient.removeQueries({ queryKey: ["messages"] })
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

  // Keeps the last known selected conversation visible even when it temporarily
  // disappears from the list (e.g. during pagination refetches).
  const selectedConversationRef = useRef<typeof conversations[number] | null>(null)
  const found = conversations.find((c) => c.id === selectedId) ?? null
  if (found) selectedConversationRef.current = found
  if (!selectedId) selectedConversationRef.current = null
  const selectedConversation = selectedConversationRef.current

  const contactName = selectedConversation?.contact.name ?? ""

  const {
    data: messagesData,
    fetchNextPage: fetchOlderMessages,
    hasNextPage: hasOlderMessages,
    isFetchingNextPage: isFetchingOlderMessages,
    isLoading: isLoadingMessages,
  } = useMessagesQuery(selectedId, contactName)

  // Pages are sorted newest-first (DESC). Flatten all pages and reverse to get
  // chronological order (oldest → newest) for rendering in the chat view.
  const messages = useMemo(
    () => messagesData?.pages.flatMap((p) => p.data).reverse() ?? [],
    [messagesData],
  )

  return {
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
  }
}

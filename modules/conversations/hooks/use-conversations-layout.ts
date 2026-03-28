"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useConversationsQuery, conversationsQueryKey } from "../queries/use-conversations-query"
import { useMessagesQuery } from "../queries/use-messages-query"
import { useNewMessageSse } from "./use-new-message-sse"

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

  useNewMessageSse()

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
    fetchPreviousPage: fetchNewerMessages,
    hasPreviousPage: hasNewerMessages,
    isFetchingPreviousPage: isFetchingNewerMessages,
    isLoading: isLoadingMessages,
  } = useMessagesQuery(selectedId, contactName)

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
    fetchNewerMessages,
    hasNewerMessages,
    isFetchingNewerMessages,
  }
}

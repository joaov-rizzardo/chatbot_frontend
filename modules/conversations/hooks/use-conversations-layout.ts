"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useConversationsQuery, conversationsQueryKey } from "../queries/use-conversations-query"
import { mockMessagesByConv } from "../data/mock-messages"

export function useConversationsLayout() {
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

  // Keeps the last known selected conversation visible even when it temporarily
  // disappears from the list (e.g. during pagination refetches).
  const selectedConversationRef = useRef<typeof conversations[number] | null>(null)
  const found = conversations.find((c) => c.id === selectedId) ?? null
  if (found) selectedConversationRef.current = found
  if (!selectedId) selectedConversationRef.current = null
  const selectedConversation = selectedConversationRef.current

  const messages = selectedId ? (mockMessagesByConv[selectedId] ?? []) : []

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
  }
}

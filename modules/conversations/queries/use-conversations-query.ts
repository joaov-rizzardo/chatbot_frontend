"use client"

import { useInfiniteQuery, type InfiniteData, type QueryClient } from "@tanstack/react-query"
import { listConversations } from "../services/conversation-client"
import type { Conversation, ConversationsPage } from "../types/conversation"

export const conversationsQueryKey = ["conversations"] as const

const LIMIT = 20

export function useConversationsQuery() {
  return useInfiniteQuery({
    queryKey: conversationsQueryKey,
    queryFn: ({ pageParam }) =>
      listConversations({ cursor: pageParam, limit: LIMIT }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // Data is considered fresh for 1 minute while the user is actively on the
    // page with SSE connected. After that, refetch triggers (mount/focus/reconnect)
    // will catch up on any missed events from an absence.
    staleTime: 60_000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
    // Keep only 2 pages in memory so refetch on focus doesn't fire N requests
    // for a user who scrolled through many pages.
    maxPages: 2,
  })
}

// ---------------------------------------------------------------------------
// SSE cache updater — call this from the SSE event handler when a conversation
// is created or receives a new message. It prepends/promotes the conversation
// to the top of the first page without invalidating the entire query.
// ---------------------------------------------------------------------------
export function applyConversationUpdate(
  queryClient: QueryClient,
  updated: Conversation,
) {
  queryClient.setQueryData<InfiniteData<ConversationsPage>>(
    conversationsQueryKey,
    (old) => {
      if (!old) return old

      const firstPage = old.pages[0]
      // Remove the conversation from wherever it currently sits
      const withoutUpdated = firstPage.data.filter((c) => c.id !== updated.id)

      return {
        ...old,
        pages: [
          { ...firstPage, data: [updated, ...withoutUpdated] },
          ...old.pages.slice(1),
        ],
      }
    },
  )
}

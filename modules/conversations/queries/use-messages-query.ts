"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchMessages } from "../services/message-client"

const LIMIT = 50

export const messagesQueryKey = (conversationId: string) =>
  ["messages", conversationId] as const

export function useMessagesQuery(conversationId: string | null, contactName: string) {
  return useInfiniteQuery({
    queryKey: conversationId ? messagesQueryKey(conversationId) : ["messages", "__none__"],
    queryFn: ({ pageParam }) =>
      fetchMessages(conversationId!, contactName, pageParam ?? undefined, LIMIT),
    enabled: !!conversationId,
    initialPageParam: undefined as string | undefined,
    // Each page fetched via fetchNextPage gives the *older* messages.
    // nextCursor from the backend points to the oldest item on the current page,
    // which becomes the cursor for the next (older) batch.
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // No forward paging — new messages will arrive via real-time updates.
    getPreviousPageParam: () => undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Keep at most 5 pages in memory (~250 messages) to bound memory usage.
    maxPages: 5,
  })
}

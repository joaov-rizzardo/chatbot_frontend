"use client"

import { useRef } from "react"
import { useInfiniteQuery, type InfiniteData, type QueryClient } from "@tanstack/react-query"
import { listConversations } from "../services/conversation-client"
import type { Conversation, ConversationsPage } from "../types/conversation"

export const conversationsQueryKey = ["conversations"] as const

const LIMIT = 20

// Sentinel used as the page param for page 1. We can't use `undefined` because
// React Query treats `undefined` returned from getPreviousPageParam as "no
// previous page". Using a sentinel string lets us signal "fetch page 1 (no
// cursor)" while still returning a truthy value that means hasPreviousPage=true.
const FIRST_PAGE_PARAM = "__first__"

export function useConversationsQuery() {
  // Tracks the ordered chain of page params as pages are fetched, so we can
  // derive the previous page's param when the user scrolls back to the top.
  // Example after 3 pages: ["__first__", "c1", "c2", "c3"]
  const cursorChain = useRef<string[]>([FIRST_PAGE_PARAM])

  return useInfiniteQuery({
    queryKey: conversationsQueryKey,
    queryFn: ({ pageParam }) =>
      listConversations({
        cursor: pageParam === FIRST_PAGE_PARAM ? undefined : pageParam,
        limit: LIMIT,
      }),
    initialPageParam: FIRST_PAGE_PARAM,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.nextCursor && !cursorChain.current.includes(lastPage.nextCursor)) {
        const idx = cursorChain.current.indexOf(lastPageParam)
        if (idx >= 0) {
          cursorChain.current.splice(idx + 1, 0, lastPage.nextCursor)
        } else {
          cursorChain.current.push(lastPage.nextCursor)
        }
      }
      return lastPage.nextCursor ?? undefined
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      const idx = cursorChain.current.indexOf(firstPageParam)
      return idx > 0 ? cursorChain.current[idx - 1] : undefined
    },
    // Data is considered fresh for 1 minute while the user is actively on the
    // page with SSE connected. After that, refetch triggers (mount/focus/reconnect)
    // will catch up on any missed events from an absence.
    staleTime: 60_000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
    // Keep only 2 pages in memory. When the user scrolls past the window,
    // evicted pages are re-fetched via fetchPreviousPage / fetchNextPage.
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

"use client"

import { useRef } from "react"
import { useInfiniteQuery, type InfiniteData, type QueryClient } from "@tanstack/react-query"
import { listConversations } from "../services/conversation-client"
import type { Conversation, ConversationsPage } from "../types/conversation"

export const conversationsQueryKey = ["conversations"] as const

const LIMIT = 20


const FIRST_PAGE_PARAM = "__first__"

export function useConversationsQuery() {
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
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    maxPages: 2,
  })
}


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

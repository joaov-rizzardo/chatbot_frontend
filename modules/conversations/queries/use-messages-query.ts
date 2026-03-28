"use client"

import { useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchMessages } from "../services/message-client"

const LIMIT = 10

const FIRST_PAGE_PARAM = "__first__"

export const messagesQueryKey = (conversationId: string) =>
  ["messages", conversationId] as const

export function useMessagesQuery(conversationId: string | null, contactName: string) {
  const cursorChain = useRef<string[]>([FIRST_PAGE_PARAM])

  const prevIdRef = useRef(conversationId)
  if (prevIdRef.current !== conversationId) {
    cursorChain.current = [FIRST_PAGE_PARAM]
    prevIdRef.current = conversationId
  }

  return useInfiniteQuery({
    queryKey: conversationId ? messagesQueryKey(conversationId) : ["messages", "__none__"],
    queryFn: ({ pageParam }) =>
      fetchMessages(
        conversationId!,
        contactName,
        pageParam === FIRST_PAGE_PARAM ? undefined : pageParam,
        LIMIT,
      ),
    enabled: !!conversationId,
    initialPageParam: FIRST_PAGE_PARAM,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      console.log(lastPage)
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
    refetchOnReconnect: false,
    maxPages: 2,
  })
}

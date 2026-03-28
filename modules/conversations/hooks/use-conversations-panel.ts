"use client"

import { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react"
import type { Conversation, ConversationStatus } from "../types/conversation"

export type FilterTab = "all" | ConversationStatus

export const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "open", label: "Abertas" },
  { key: "pending", label: "Pendentes" },
  { key: "resolved", label: "Resolvidas" },
]

interface UseConversationsPanelOptions {
  conversations: Conversation[]
  searchQuery: string
  onLoadMore?: () => void
  hasNextPage?: boolean
  isLoadingMore?: boolean
  onLoadPrevious?: () => void
  hasPreviousPage?: boolean
  isLoadingPrevious?: boolean
}

export function useConversationsPanel({
  conversations,
  searchQuery,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
  onLoadPrevious,
  hasPreviousPage,
  isLoadingPrevious,
}: UseConversationsPanelOptions) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")
  const [collapsed, setCollapsed] = useState(false)

  // Keep stable refs so observers always call the latest callbacks
  // without needing them as dependencies (avoids observer reconnect storms).
  const onLoadMoreRef = useRef(onLoadMore)
  const onLoadPreviousRef = useRef(onLoadPrevious)
  const isLoadingMoreRef = useRef(isLoadingMore)
  const isLoadingPreviousRef = useRef(isLoadingPrevious)
  const hasNextPageRef = useRef(hasNextPage)
  const hasPreviousPageRef = useRef(hasPreviousPage)
  onLoadMoreRef.current = onLoadMore
  onLoadPreviousRef.current = onLoadPrevious
  isLoadingMoreRef.current = isLoadingMore
  isLoadingPreviousRef.current = isLoadingPrevious
  hasNextPageRef.current = hasNextPage
  hasPreviousPageRef.current = hasPreviousPage

  // Cooldown: after any page load completes, block both sentinels for a short
  // window. When maxPages drops a page from the opposite end, that sentinel may
  // become momentarily visible, which would kick off a fetch loop.
  const cooldownRef = useRef(false)
  const prevLoadingRef = useRef(false)

  useEffect(() => {
    const wasLoading = prevLoadingRef.current
    const isLoading = !!(isLoadingMore || isLoadingPrevious)
    prevLoadingRef.current = isLoading

    if (wasLoading && !isLoading) {
      cooldownRef.current = true
      const timer = setTimeout(() => {
        cooldownRef.current = false
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLoadingMore, isLoadingPrevious])

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pivotRef = useRef<{ id: string; prevOffsetTop: number; prevScrollTop: number } | null>(null)

  const filtered = conversations.filter((c) => {
    const matchesStatus = activeFilter === "all" || c.status === activeFilter
    const matchesSearch =
      !searchQuery ||
      c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.phone.includes(searchQuery) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0)

  // Snapshot: fires when isLoadingPrevious becomes true, before conversations change.
  // filtered is intentionally omitted from deps — we only want to capture the
  // pivot element at the moment loading starts, not on every filter change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!isLoadingPrevious || pivotRef.current !== null) return
    const container = scrollContainerRef.current
    if (!container) return
    const firstId = filtered[0]?.id
    if (!firstId) return
    const el = container.querySelector(`[data-conv-id="${firstId}"]`)
    pivotRef.current = {
      id: firstId,
      prevOffsetTop: el ? (el as HTMLElement).offsetTop : 0,
      prevScrollTop: container.scrollTop,
    }
  }, [isLoadingPrevious])

  // Restore: fires after conversations update (page prepended), before paint.
  useLayoutEffect(() => {
    if (!pivotRef.current) return
    const container = scrollContainerRef.current
    if (!container) return
    const el = container.querySelector(`[data-conv-id="${pivotRef.current.id}"]`)
    if (el) {
      const delta = (el as HTMLElement).offsetTop - pivotRef.current.prevOffsetTop
      container.scrollTop = pivotRef.current.prevScrollTop + delta
    }
    pivotRef.current = null
  }, [conversations])

  const bottomObserverRef = useRef<IntersectionObserver | null>(null)
  const topObserverRef = useRef<IntersectionObserver | null>(null)

  const bottomSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      bottomObserverRef.current?.disconnect()
      bottomObserverRef.current = null
      if (!node) return
      bottomObserverRef.current = new IntersectionObserver(
        (entries) => {
          const container = scrollContainerRef.current
          const isScrollable = container ? container.scrollHeight > container.clientHeight : true
          if (
            entries[0].isIntersecting &&
            !isLoadingMoreRef.current &&
            !cooldownRef.current &&
            isScrollable &&
            hasNextPageRef.current
          ) {
            onLoadMoreRef.current?.()
          }
        },
        { threshold: 0.1 },
      )
      bottomObserverRef.current.observe(node)
    },
    [],
  )

  const topSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      topObserverRef.current?.disconnect()
      topObserverRef.current = null
      if (!node) return
      topObserverRef.current = new IntersectionObserver(
        (entries) => {
          const container = scrollContainerRef.current
          const isScrollable = container ? container.scrollHeight > container.clientHeight : true
          if (
            entries[0].isIntersecting &&
            !isLoadingPreviousRef.current &&
            !cooldownRef.current &&
            isScrollable &&
            hasPreviousPageRef.current
          ) {
            onLoadPreviousRef.current?.()
          }
        },
        { threshold: 0.1 },
      )
      topObserverRef.current.observe(node)
    },
    [],
  )

  return {
    activeFilter,
    setActiveFilter,
    collapsed,
    setCollapsed,
    scrollContainerRef,
    topSentinelRef,
    bottomSentinelRef,
    filtered,
    totalUnread,
  }
}

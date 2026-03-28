"use client"

import { useLayoutEffect, useRef, useCallback } from "react"

interface PivotState {
  el: HTMLElement
  prevOffsetTop: number
  prevScrollTop: number
}

interface UseMessageListOptions {
  messagesLength: number
  hasOlderMessages: boolean
  isLoadingOlder: boolean
  onLoadOlder: () => void
  hasNewerMessages: boolean
  isLoadingNewer: boolean
  onLoadNewer: () => void
}

export function useMessageList({
  messagesLength,
  hasOlderMessages,
  isLoadingOlder,
  onLoadOlder,
  hasNewerMessages,
  isLoadingNewer,
  onLoadNewer,
}: UseMessageListOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const isInitialLoadRef = useRef(true)
  const pivotRef = useRef<PivotState | null>(null)

  // Keep stable refs so observers always call the latest callbacks
  // without needing them as dependencies (avoids observer reconnect storms).
  const onLoadOlderRef = useRef(onLoadOlder)
  const onLoadNewerRef = useRef(onLoadNewer)
  const isLoadingOlderRef = useRef(isLoadingOlder)
  const isLoadingNewerRef = useRef(isLoadingNewer)
  onLoadOlderRef.current = onLoadOlder
  onLoadNewerRef.current = onLoadNewer
  isLoadingOlderRef.current = isLoadingOlder
  isLoadingNewerRef.current = isLoadingNewer

  // Scroll to bottom on initial load (before paint to avoid flicker).
  useLayoutEffect(() => {
    if (messagesLength > 0 && isInitialLoadRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" })
      isInitialLoadRef.current = false
    }
  }, [messagesLength])

  // Restore scroll after older messages load, anchored to the first visible
  // message so new content added above doesn't cause a visual jump.
  // Using offsetTop delta instead of scrollHeight delta because maxPages drops
  // a page from the bottom simultaneously, making the net scrollHeight change ~0.
  // Triggered by isLoadingOlder (not messagesLength) so that SSE messages
  // arriving mid-fetch do not consume the pivot prematurely.
  useLayoutEffect(() => {
    if (isLoadingOlder || pivotRef.current === null) return
    const container = containerRef.current
    if (!container) return
    const { el, prevOffsetTop, prevScrollTop } = pivotRef.current
    pivotRef.current = null
    const delta = el.offsetTop - prevOffsetTop
    container.scrollTop = prevScrollTop + delta
  }, [isLoadingOlder])

  const topObserverRef = useRef<IntersectionObserver | null>(null)
  const bottomObserverRef = useRef<IntersectionObserver | null>(null)

  const topSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      topObserverRef.current?.disconnect()
      topObserverRef.current = null
      if (!node || !hasOlderMessages) return
      topObserverRef.current = new IntersectionObserver(
        (entries) => {
          const container = containerRef.current
          if (entries[0].isIntersecting && !isLoadingOlderRef.current) {
            // Snapshot the first message's position before the load starts
            // (and before the loading spinner appears), so the pivot offset
            // reflects the clean pre-load DOM state.
            const firstMsg = container?.querySelector("[data-msg-id]") as HTMLElement | null
            if (container && firstMsg) {
              pivotRef.current = {
                el: firstMsg,
                prevOffsetTop: firstMsg.offsetTop,
                prevScrollTop: container.scrollTop,
              }
            }
            onLoadOlderRef.current()
          }
        },
        { root: containerRef.current, threshold: 0.1 },
      )
      topObserverRef.current.observe(node)
    },
    [hasOlderMessages],
  )

  const bottomSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      bottomObserverRef.current?.disconnect()
      bottomObserverRef.current = null
      if (!node || !hasNewerMessages) return
      bottomObserverRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoadingNewerRef.current) {
            onLoadNewerRef.current()
          }
        },
        { root: containerRef.current, threshold: 0.1 },
      )
      bottomObserverRef.current.observe(node)
    },
    [hasNewerMessages],
  )

  return { containerRef, bottomRef, topSentinelRef, bottomSentinelRef }
}

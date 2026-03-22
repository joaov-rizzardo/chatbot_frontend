"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseMessageListOptions {
  messagesLength: number
  hasOlderMessages: boolean
  isLoadingOlder: boolean
  onLoadOlder: () => void
}

export function useMessageList({
  messagesLength,
  hasOlderMessages,
  isLoadingOlder,
  onLoadOlder,
}: UseMessageListOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const topSentinelRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef<number>(0)
  const isInitialLoadRef = useRef(true)

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messagesLength > 0 && isInitialLoadRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" })
      isInitialLoadRef.current = false
    }
  }, [messagesLength])

  // After loading older messages, restore scroll position so the view doesn't jump
  useEffect(() => {
    if (!isLoadingOlder && prevScrollHeightRef.current > 0 && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight
      containerRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current
      prevScrollHeightRef.current = 0
    }
  }, [isLoadingOlder, messagesLength])

  const handleTopSentinel = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasOlderMessages && !isLoadingOlder) {
        if (containerRef.current) {
          prevScrollHeightRef.current = containerRef.current.scrollHeight
        }
        onLoadOlder()
      }
    },
    [hasOlderMessages, isLoadingOlder, onLoadOlder],
  )

  useEffect(() => {
    const sentinel = topSentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(handleTopSentinel, {
      root: containerRef.current,
      threshold: 0.1,
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [handleTopSentinel])

  return { containerRef, bottomRef, topSentinelRef }
}

"use client"

import { useEffect, useRef, useCallback } from "react"
import type { Message } from "../types/message"
import { MessageBubble } from "./message-bubble"
import { MessageDateSeparator } from "./message-date-separator"
import { Loader2 } from "lucide-react"

function getDateLabel(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diff = (today.getTime() - msgDay.getTime()) / 86400000
  if (diff === 0) return "Hoje"
  if (diff === 1) return "Ontem"
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

interface MessageListProps {
  messages: Message[]
  onLoadOlder: () => void
  hasOlderMessages: boolean
  isLoadingOlder: boolean
}

export function MessageList({ messages, onLoadOlder, hasOlderMessages, isLoadingOlder }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const topSentinelRef = useRef<HTMLDivElement>(null)
  // Track the scroll height before loading older messages so we can restore position.
  const prevScrollHeightRef = useRef<number>(0)
  const isInitialLoadRef = useRef(true)

  // Scroll to bottom on initial load.
  useEffect(() => {
    if (messages.length > 0 && isInitialLoadRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" })
      isInitialLoadRef.current = false
    }
  }, [messages.length])

  // After loading older messages, restore the scroll position so the view
  // doesn't jump to the top.
  useEffect(() => {
    if (!isLoadingOlder && prevScrollHeightRef.current > 0 && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight
      containerRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current
      prevScrollHeightRef.current = 0
    }
  }, [isLoadingOlder, messages.length])

  // IntersectionObserver: trigger loading older messages when the top sentinel
  // enters the viewport.
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

  // Group messages by date
  const grouped: { date: string; messages: Message[] }[] = []
  for (const msg of messages) {
    const label = getDateLabel(msg.sentAt)
    const last = grouped[grouped.length - 1]
    if (!last || last.date !== label) {
      grouped.push({ date: label, messages: [msg] })
    } else {
      last.messages.push(msg)
    }
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5 bg-[oklch(0.95_0.02_150)]">
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top sentinel — triggers loading older messages on scroll up */}
      <div ref={topSentinelRef} className="h-1" />

      {/* Older messages loader */}
      {isLoadingOlder && (
        <div className="flex justify-center py-2">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-xs text-muted-foreground">Nenhuma mensagem ainda.</p>
        </div>
      )}

      {grouped.map(({ date, messages: dayMsgs }) => (
        <div key={date}>
          <MessageDateSeparator label={date} />
          <div className="space-y-1.5">
            {dayMsgs.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  )
}

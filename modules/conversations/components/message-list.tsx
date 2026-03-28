"use client"

import type { Message } from "../types/message"
import { MessageBubble } from "./message-bubble"
import { MessageDateSeparator } from "./message-date-separator"
import { Loader2 } from "lucide-react"
import { useMessageList } from "../hooks/use-message-list"

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
  onLoadNewer: () => void
  hasNewerMessages: boolean
  isLoadingNewer: boolean
}

export function MessageList({ messages, onLoadOlder, hasOlderMessages, isLoadingOlder, onLoadNewer, hasNewerMessages, isLoadingNewer }: MessageListProps) {
  const { containerRef, bottomRef, topSentinelRef, bottomSentinelRef } = useMessageList({
    messagesLength: messages.length,
    hasOlderMessages,
    isLoadingOlder,
    onLoadOlder,
    hasNewerMessages,
    isLoadingNewer,
    onLoadNewer,
  })

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
              <div key={msg.id} data-msg-id={msg.id}>
                <MessageBubble message={msg} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom sentinel — triggers loading newer messages on scroll down */}
      <div ref={bottomSentinelRef} className="h-1" />

      {isLoadingNewer && (
        <div className="flex justify-center py-2">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

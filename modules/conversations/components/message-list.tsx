"use client"

import { useEffect, useRef } from "react"
import type { Message } from "../types/message"
import { MessageBubble } from "./message-bubble"
import { MessageDateSeparator } from "./message-date-separator"

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
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5 bg-[oklch(0.95_0.02_150)]">
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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

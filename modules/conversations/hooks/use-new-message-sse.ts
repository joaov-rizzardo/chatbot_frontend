"use client"

import { useEffect } from "react"
import { useQueryClient, type InfiniteData } from "@tanstack/react-query"
import { messagesQueryKey } from "../queries/use-messages-query"
import { applyConversationUpdate } from "../queries/use-conversations-query"
import type { Message } from "../types/message"
import type { Conversation } from "../types/conversation"
import type { MessagesPage } from "../services/message-client"

const TYPE_MAP: Record<string, Message["type"]> = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
}

const DIR_MAP: Record<string, Message["direction"]> = {
  INBOUND: "incoming",
  OUTBOUND: "outgoing",
}

const STATUS_MAP: Record<string, Conversation["status"]> = {
  OPEN: "open",
  PENDING: "pending",
  CLOSED: "resolved",
}

interface NewMessagePayload {
  conversation: {
    id: string
    status: string
    contact: {
      id: string
      name: string
      lastName: string | null
      phoneNumber: string
    }
  }
  message: {
    id: string
    content: string
    type: string
    direction: string
    externalId: string
    sentAt: string
    caption: string | null
  }
}

const BACKOFF_BASE_MS = 1_000
const BACKOFF_MAX_MS = 30_000

export function useNewMessageSse() {
  const queryClient = useQueryClient()

  useEffect(() => {
    let es: EventSource | null = null
    let timer: ReturnType<typeof setTimeout> | null = null
    let attempts = 0
    let unmounted = false

    function connect() {
      if (unmounted) return

      es = new EventSource("/api/message/subscribe")

      es.addEventListener("message.new", (event: MessageEvent) => {
        attempts = 0

        const { conversation: conv, message: msg } = JSON.parse(event.data) as NewMessagePayload

        const direction = DIR_MAP[msg.direction] ?? "incoming"
        const type = TYPE_MAP[msg.type] ?? "text"
        const contactName = [conv.contact.name, conv.contact.lastName].filter(Boolean).join(" ")

        queryClient.setQueryData<InfiniteData<MessagesPage>>(
          messagesQueryKey(conv.id),
          (old) => {
            if (!old) return old
            const [firstPage, ...rest] = old.pages
            const newMessage: Message = {
              id: msg.id,
              type,
              direction,
              content: msg.content || undefined,
              caption: msg.caption ?? undefined,
              sentAt: msg.sentAt,
              senderName: direction === "outgoing" ? "Você" : contactName,
              status: "sent",
            }
            return { ...old, pages: [{ ...firstPage, data: [newMessage, ...firstPage.data] }, ...rest] }
          },
        )

        applyConversationUpdate(queryClient, {
          id: conv.id,
          contact: {
            id: conv.contact.id,
            name: contactName,
            phone: conv.contact.phoneNumber,
          },
          status: STATUS_MAP[conv.status] ?? "open",
          lastMessage: msg.content || (msg.caption ?? ""),
          lastMessageAt: msg.sentAt,
          lastMessageType: type,
          unreadCount: 0,
        })
      })

      es.onerror = () => {
        es?.close()
        es = null
        if (unmounted) return
        const delay = Math.min(BACKOFF_BASE_MS * 2 ** attempts, BACKOFF_MAX_MS)
        attempts++
        timer = setTimeout(connect, delay)
      }
    }

    connect()

    return () => {
      unmounted = true
      if (timer !== null) clearTimeout(timer)
      es?.close()
    }
  }, [queryClient])
}

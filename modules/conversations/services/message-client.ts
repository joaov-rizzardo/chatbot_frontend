"use client"

import { clientFetch } from "@/lib/client-fetch"
import type { Message, MessageDirection, MessageType } from "../types/message"

const TYPE_MAP: Record<string, MessageType> = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
}

const DIR_MAP: Record<string, MessageDirection> = {
  INBOUND: "incoming",
  OUTBOUND: "outgoing",
}

interface RawMessageMedia {
  url: string
  mimeType: string
  fileSize?: number | null
  fileName?: string | null
  duration?: number | null
}

interface RawMessage {
  id: string
  type: string
  direction: string
  content: string
  caption?: string | null
  sentAt: string
  media?: RawMessageMedia | null
  thumbnail?: { url: string } | null
  replyTo?: {
    id: string
    type: string
    direction: string
    content: string
    thumbnail?: { url: string } | null
  } | null
}

export interface RawMessagesPage {
  data: RawMessage[]
  nextCursor: string | null
}

export interface MessagesPage {
  data: Message[]
  nextCursor: string | null
}

function mapMessage(raw: RawMessage, contactName: string): Message {
  const direction = DIR_MAP[raw.direction] ?? "incoming"
  return {
    id: raw.id,
    type: TYPE_MAP[raw.type] ?? "text",
    direction,
    content: raw.content || undefined,
    caption: raw.caption ?? undefined,
    mediaUrl: raw.media?.url,
    thumbnailUrl: raw.thumbnail?.url ?? undefined,
    duration: raw.media?.duration ?? undefined,
    fileName: raw.media?.fileName ?? undefined,
    fileSize: raw.media?.fileSize != null ? String(raw.media.fileSize) : undefined,
    replyTo: raw.replyTo
      ? {
          messageId: raw.replyTo.id,
          content: raw.replyTo.content,
          senderName: DIR_MAP[raw.replyTo.direction] === "outgoing" ? "Você" : contactName,
          type: TYPE_MAP[raw.replyTo.type] ?? "text",
          thumbnailUrl: raw.replyTo.thumbnail?.url,
        }
      : undefined,
    sentAt: raw.sentAt,
    senderName: direction === "outgoing" ? "Você" : contactName,
    status: "sent",
  }
}

export async function fetchMessages(
  conversationId: string,
  contactName: string,
  cursor?: string,
  limit?: number,
): Promise<MessagesPage> {
  const qs = new URLSearchParams()
  if (cursor) qs.set("cursor", cursor)
  if (limit) qs.set("limit", String(limit))
  const query = qs.toString()

  const response = await clientFetch(
    `/api/conversation/${conversationId}/messages${query ? `?${query}` : ""}`,
  )
  if (!response.ok) throw new Error("Falha ao carregar mensagens.")

  const raw: RawMessagesPage = await response.json()
  return {
    data: raw.data.map((m) => mapMessage(m, contactName)),
    nextCursor: raw.nextCursor,
  }
}

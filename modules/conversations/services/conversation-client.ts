"use client"

import { clientFetch } from "@/lib/client-fetch"
import type {
  Conversation,
  ConversationChannel,
  ConversationStatus,
  ConversationsPage,
  RawBackendConversation,
  RawBackendConversationsPage,
} from "../types/conversation"

const MESSAGE_TYPE_MAP = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  DOCUMENT: "document",
} as const

const STATUS_MAP: Record<string, ConversationStatus> = {
  OPEN: "open",
  PENDING: "pending",
  CLOSED: "resolved",
}

function deriveChannel(instancePhoneNumber: string): ConversationChannel {
  // All instances are WhatsApp for now; extend when other channels are added
  void instancePhoneNumber
  return "whatsapp"
}

function mapConversation(raw: RawBackendConversation): Conversation {
  const contactName = [raw.contact.name, raw.contact.lastName].filter(Boolean).join(" ")

  return {
    id: raw.id,
    contact: {
      id: raw.contact.id,
      name: contactName,
      phone: raw.contact.phoneNumber,
      onlineStatus: "offline",
    },
    lastMessage: raw.lastMessage?.content ?? "",
    lastMessageAt: raw.lastMessageAt ?? raw.createdAt,
    lastMessageType: raw.lastMessage ? MESSAGE_TYPE_MAP[raw.lastMessage.type] : "text",
    unreadCount: 0,
    status: STATUS_MAP[raw.status] ?? "open",
    channel: deriveChannel(raw.instancePhoneNumber),
  }
}

export async function listConversations(params?: {
  cursor?: string
  limit?: number
}): Promise<ConversationsPage> {
  const qs = new URLSearchParams()
  if (params?.cursor) qs.set("cursor", params.cursor)
  if (params?.limit) qs.set("limit", String(params.limit))

  const query = qs.toString()
  const response = await clientFetch(`/api/conversation${query ? `?${query}` : ""}`)
  if (!response.ok) throw new Error("Falha ao carregar conversas.")

  const raw: RawBackendConversationsPage = await response.json()
  return {
    data: raw.data.map(mapConversation),
    nextCursor: raw.nextCursor,
  }
}

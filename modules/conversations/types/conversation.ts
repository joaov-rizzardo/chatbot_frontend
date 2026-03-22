export type ConversationStatus = 'open' | 'pending' | 'resolved'
export type ContactOnlineStatus = 'online' | 'offline' | 'away' | 'busy'

export interface ConversationContact {
  id: string
  name: string
  phone: string
  avatarUrl?: string
  onlineStatus: ContactOnlineStatus
}

export interface Conversation {
  id: string
  contact: ConversationContact
  lastMessage: string
  lastMessageAt: string
  lastMessageType: 'text' | 'image' | 'video' | 'audio' | 'document'
  unreadCount: number
  status: ConversationStatus
  assignedAgentName?: string
  tags?: string[]
}

export interface ConversationsPage {
  data: Conversation[]
  nextCursor: string | null
}

// Raw shapes returned by the backend API

type BackendMessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT'
type BackendConversationStatus = 'OPEN' | 'PENDING' | 'CLOSED'

export interface RawBackendMessage {
  id: string
  conversationId: string
  content: string
  type: BackendMessageType
  direction: 'INBOUND' | 'OUTBOUND'
  sentAt: string
}

export interface RawBackendContact {
  id: string
  workspaceId: string
  phoneNumber: string
  name: string
  lastName: string | null
  email: string | null
}

export interface RawBackendConversation {
  id: string
  workspaceId: string
  contactId: string
  instancePhoneNumber: string
  status: BackendConversationStatus
  lastMessageAt: string | null
  createdAt: string
  updatedAt: string
  lastMessage: RawBackendMessage | null
  contact: RawBackendContact
}

export interface RawBackendConversationsPage {
  data: RawBackendConversation[]
  nextCursor: string | null
}

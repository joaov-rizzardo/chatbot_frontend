export type ConversationStatus = 'open' | 'pending' | 'resolved'
export type ContactOnlineStatus = 'online' | 'offline' | 'away' | 'busy'
export type ConversationChannel = 'whatsapp' | 'instagram' | 'telegram'

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
  channel: ConversationChannel
  assignedAgentName?: string
  tags?: string[]
}

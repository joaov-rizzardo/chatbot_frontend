export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document'
export type MessageDirection = 'incoming' | 'outgoing'
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed'

export interface ReplyReference {
  messageId: string
  content: string
  senderName: string
  type: MessageType
  thumbnailUrl?: string
}

export interface Message {
  id: string
  type: MessageType
  direction: MessageDirection
  content?: string
  caption?: string
  mediaUrl?: string
  thumbnailUrl?: string
  duration?: number
  fileName?: string
  fileSize?: string
  replyTo?: ReplyReference
  sentAt: string
  senderName: string
  senderAvatarUrl?: string
  status: MessageStatus
}

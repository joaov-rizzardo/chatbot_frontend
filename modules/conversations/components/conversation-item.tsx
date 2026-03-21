"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { Image, Video, Mic, FileText } from "lucide-react"
import { ContactAvatar } from "@/shared/components/ui/contact-avatar"

const STATUS_COLORS: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-zinc-400",
  away: "bg-amber-400",
  busy: "bg-red-400",
}

const CHANNEL_BADGE: Record<string, string> = {
  whatsapp: "W",
  instagram: "I",
  telegram: "T",
}

const CHANNEL_COLOR: Record<string, string> = {
  whatsapp: "bg-green-600",
  instagram: "bg-pink-600",
  telegram: "bg-sky-600",
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  image: <Image className="w-3 h-3 inline mr-0.5" />,
  video: <Video className="w-3 h-3 inline mr-0.5" />,
  audio: <Mic className="w-3 h-3 inline mr-0.5" />,
  document: <FileText className="w-3 h-3 inline mr-0.5" />,
  text: null,
}

function formatRelativeTime(isoString: string): string {
  const now = Date.now()
  const diff = now - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return "agora"
  if (mins < 60) return `${mins}m`
  if (hours < 24) return `${hours}h`
  return `${days}d`
}

interface ConversationItemProps {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const { contact, lastMessage, lastMessageAt, lastMessageType, unreadCount, channel } = conversation

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 px-4 py-3.5 transition-all duration-150 text-left group relative border-l-2",
        isSelected
          ? "bg-primary/10 border-l-primary"
          : "border-l-transparent hover:bg-muted hover:border-l-primary/30"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0 mt-0.5">
        <ContactAvatar name={contact.name} avatarUrl={contact.avatarUrl} />
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
            STATUS_COLORS[contact.onlineStatus]
          )}
        />
        <span
          className={cn(
            "absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white",
            CHANNEL_COLOR[channel]
          )}
        >
          {CHANNEL_BADGE[channel]}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span
            className={cn(
              "text-sm font-semibold truncate",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {contact.name}
          </span>
          <span className="text-[10px] shrink-0 text-muted-foreground tabular-nums">
            {formatRelativeTime(lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs text-muted-foreground truncate flex items-center">
            {TYPE_ICON[lastMessageType]}
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

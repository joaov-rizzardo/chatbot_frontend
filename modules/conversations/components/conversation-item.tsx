"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"
import { MessageCircle, Image, Video, Mic, FileText } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  online: "bg-green-400",
  offline: "bg-zinc-500",
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

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
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
        "w-full flex items-start gap-3 px-4 py-3.5 transition-all duration-150 text-left group relative",
        isSelected
          ? "bg-[oklch(0.22_0.07_148)] border-l-2 border-[oklch(0.55_0.18_145)]"
          : "border-l-2 border-transparent hover:bg-[oklch(0.16_0.04_150)] hover:border-l-[oklch(0.35_0.10_148)]"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0 mt-0.5">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[oklch(0.25_0.06_148)] flex items-center justify-center">
          {contact.avatarUrl ? (
            <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-semibold text-[oklch(0.75_0.12_148)]">
              {getInitials(contact.name)}
            </span>
          )}
        </div>
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[oklch(0.13_0.04_150)]",
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
              isSelected ? "text-[oklch(0.95_0.02_150)]" : "text-[oklch(0.88_0.02_150)]"
            )}
          >
            {contact.name}
          </span>
          <span className="text-[10px] shrink-0 text-[oklch(0.50_0.03_150)] tabular-nums">
            {formatRelativeTime(lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs text-[oklch(0.52_0.03_150)] truncate flex items-center">
            {TYPE_ICON[lastMessageType]}
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-[oklch(0.55_0.18_145)] text-white text-[10px] font-bold flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

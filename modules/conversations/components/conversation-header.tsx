"use client"

import { Search, Archive, MoreVertical, Phone, Tag, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Conversation } from "../types/conversation"

const STATUS_LABEL: Record<string, string> = {
  online: "Online",
  offline: "Offline",
  away: "Ausente",
  busy: "Ocupado",
}

const STATUS_DOT: Record<string, string> = {
  online: "bg-green-400",
  offline: "bg-zinc-500",
  away: "bg-amber-400",
  busy: "bg-red-400",
}

const CONV_STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  open: { label: "Aberta", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
  pending: { label: "Pendente", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  resolved: { label: "Resolvida", cls: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
}

interface ConversationHeaderProps {
  conversation: Conversation
}

export function ConversationHeader({ conversation }: ConversationHeaderProps) {
  const { contact, status, assignedAgentName, tags } = conversation
  const statusBadge = CONV_STATUS_BADGE[status]

  return (
    <header className="flex items-center gap-3 px-5 py-3 bg-[oklch(0.12_0.03_150)] border-b border-[oklch(0.20_0.04_150)] shrink-0">
      {/* Avatar */}
      <div className="relative shrink-0">
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
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[oklch(0.12_0.03_150)]",
            STATUS_DOT[contact.onlineStatus]
          )}
        />
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-sm font-bold text-[oklch(0.92_0.02_150)] truncate">{contact.name}</h1>
          <span
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
              statusBadge.cls
            )}
          >
            {statusBadge.label}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-[oklch(0.55_0.03_150)]">
            <span
              className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[contact.onlineStatus])}
            />
            {STATUS_LABEL[contact.onlineStatus]}
          </span>
          <span className="text-[11px] text-[oklch(0.50_0.03_150)] font-mono">{contact.phone}</span>
          {assignedAgentName && (
            <span className="flex items-center gap-1 text-[11px] text-[oklch(0.55_0.08_148)]">
              <User className="w-3 h-3" />
              {assignedAgentName}
            </span>
          )}
          {tags && tags.length > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-[oklch(0.50_0.10_180)]">
              <Tag className="w-3 h-3" />
              {tags.slice(0, 2).join(", ")}
              {tags.length > 2 && ` +${tags.length - 2}`}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {[
          { icon: <Phone className="w-4 h-4" />, label: "Ligar" },
          { icon: <Search className="w-4 h-4" />, label: "Buscar mensagem" },
          { icon: <Archive className="w-4 h-4" />, label: "Arquivar" },
          { icon: <MoreVertical className="w-4 h-4" />, label: "Mais opções" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "text-[oklch(0.45_0.03_150)] hover:text-[oklch(0.80_0.10_148)] hover:bg-[oklch(0.20_0.05_150)]",
              "transition-colors duration-150"
            )}
          >
            {icon}
          </button>
        ))}
      </div>
    </header>
  )
}

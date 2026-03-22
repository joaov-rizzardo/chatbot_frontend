"use client"

import { Search, Archive, MoreVertical, Phone, Tag, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import type { Conversation } from "../types/conversation"

const CONV_STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  open: { label: "Aberta", cls: "bg-green-100 text-green-700 border-green-200" },
  pending: { label: "Pendente", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  resolved: { label: "Resolvida", cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
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
    <header className="flex items-center gap-3 px-5 py-3 bg-card border-b border-border shrink-0 shadow-sm">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
          {contact.avatarUrl ? (
            <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-semibold text-primary">
              {getInitials(contact.name)}
            </span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-sm font-bold text-foreground truncate">{contact.name}</h1>
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
          <span className="text-[11px] text-muted-foreground font-mono">{formatPhoneNumber(contact.phone)}</span>
          {assignedAgentName && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <User className="w-3 h-3" />
              {assignedAgentName}
            </span>
          )}
          {tags && tags.length > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
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
          { icon: <Search className="w-4 h-4" />, label: "Buscar mensagem" },
          { icon: <MoreVertical className="w-4 h-4" />, label: "Mais opções" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
          >
            {icon}
          </button>
        ))}
      </div>
    </header>
  )
}

"use client"

import { MessageCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import type { Contact } from "../types/contact"

interface ContactListItemProps {
  contact: Contact
  onMessage?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function ContactAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold select-none">
      {initials}
    </div>
  )
}

function formatLastActivity(iso?: string): string {
  if (!iso) return "—"
  const date = new Date(iso)
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

export function ContactListItem({
  contact,
  onMessage,
  onEdit,
  onDelete,
}: ContactListItemProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/40">
        <ContactAvatar name={contact.name} />

        {/* Name + phone */}
        <div className="min-w-0 w-40 shrink-0">
          <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
          <p className="text-xs text-muted-foreground truncate">{contact.phone}</p>
        </div>

        {/* Email */}
        <div className="hidden md:block min-w-0 flex-1">
          <p className="text-sm text-muted-foreground truncate">
            {contact.email ?? <span className="text-muted-foreground/50 italic">—</span>}
          </p>
        </div>

        {/* Tags */}
        <div className="hidden lg:flex items-center gap-1.5 flex-1 flex-wrap">
          {contact.tags.length === 0 ? (
            <span className="text-xs text-muted-foreground/50 italic">Sem tags</span>
          ) : (
            contact.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs capitalize">
                {tag}
              </Badge>
            ))
          )}
        </div>

        {/* Last activity */}
        <div className="hidden xl:block w-20 shrink-0 text-right">
          <p className="text-xs text-muted-foreground">{formatLastActivity(contact.lastActivityAt)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onMessage?.(contact.id)}
                aria-label="Enviar mensagem"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              Enviar mensagem
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit?.(contact.id)}
                aria-label="Editar contato"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              Editar
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete?.(contact.id)}
                aria-label="Excluir contato"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6} className="bg-destructive">
              Excluir
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

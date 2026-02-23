"use client"

import { MessageCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { TagChip } from "@/shared/components/ui/tag-chip"
import type { Contact } from "../types/contact"
import { ContactAvatar } from "./contact-avatar"

interface ContactListItemProps {
  contact: Contact
  onMessage?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function formatLastActivity(iso?: string): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

export function ContactListItem({ contact, onMessage, onEdit, onDelete }: ContactListItemProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="group relative flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 transition-all duration-200 hover:border-border hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] hover:bg-muted/20 dark:hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.25)]">
        {/* Left accent stripe — scales in from center on hover */}
        <span className="absolute left-0 inset-y-[12%] w-[3px] rounded-r-full bg-primary origin-center scale-y-0 transition-transform duration-200 ease-out group-hover:scale-y-100" />

        <ContactAvatar name={contact.name} />

        {/* Name + phone */}
        <div className="min-w-0 w-44 shrink-0">
          <p className="text-sm font-semibold text-foreground truncate leading-snug">
            {contact.name}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5 font-medium tracking-tight">
            {contact.phone}
          </p>
        </div>

        {/* Email */}
        <div className="hidden md:block min-w-0 flex-1">
          {contact.email ? (
            <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
          ) : (
            <span className="text-xs text-muted-foreground/35 italic">—</span>
          )}
        </div>

        {/* Tags */}
        <div className="hidden lg:flex items-center gap-1.5 flex-1 flex-wrap">
          {contact.tags.length === 0 ? (
            <span className="text-xs text-muted-foreground/35 italic">Sem tags</span>
          ) : (
            contact.tags.map((tag) => (
              <TagChip key={tag.id} name={tag.name} color={tag.color} />
            ))
          )}
        </div>

        {/* Last activity */}
        <div className="hidden xl:block w-24 shrink-0 text-right">
          <p className="text-xs text-muted-foreground tabular-nums">
            {formatLastActivity(contact.lastActivityAt)}
          </p>
        </div>

        {/* Created at */}
        <div className="hidden xl:block w-24 shrink-0 text-right">
          <p className="text-xs text-muted-foreground tabular-nums">
            {formatLastActivity(contact.createdAt)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete?.(contact.id)}
                aria-label="Excluir contato"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={6}
              className="bg-destructive text-destructive-foreground"
            >
              Excluir
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

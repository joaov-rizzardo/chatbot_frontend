"use client"

import type { CSSProperties } from "react"
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

interface ContactListItemProps {
  contact: Contact
  onMessage?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

// Gradient palette — one unique gradient per letter
const AVATAR_GRADIENTS: Record<string, [string, string]> = {
  A: ["#F472B6", "#EC4899"],
  B: ["#FB923C", "#F97316"],
  C: ["#FBBF24", "#F59E0B"],
  D: ["#A3E635", "#84CC16"],
  E: ["#34D399", "#10B981"],
  F: ["#2DD4BF", "#14B8A6"],
  G: ["#38BDF8", "#0EA5E9"],
  H: ["#60A5FA", "#3B82F6"],
  I: ["#818CF8", "#6366F1"],
  J: ["#A78BFA", "#8B5CF6"],
  K: ["#C084FC", "#A855F7"],
  L: ["#E879F9", "#D946EF"],
  M: ["#F472B6", "#DB2777"],
  N: ["#FB7185", "#F43F5E"],
  O: ["#FDBA74", "#FB923C"],
  P: ["#FDE047", "#FACC15"],
  Q: ["#86EFAC", "#4ADE80"],
  R: ["#6EE7B7", "#34D399"],
  S: ["#67E8F9", "#22D3EE"],
  T: ["#93C5FD", "#60A5FA"],
  U: ["#A5B4FC", "#818CF8"],
  V: ["#C4B5FD", "#A78BFA"],
  W: ["#D8B4FE", "#C084FC"],
  X: ["#F0ABFC", "#E879F9"],
  Y: ["#FDA4AF", "#FB7185"],
  Z: ["#FCA5A5", "#F87171"],
}

function getAvatarStyle(name: string): CSSProperties {
  const letter = name[0]?.toUpperCase() ?? "A"
  const [from, to] = AVATAR_GRADIENTS[letter] ?? ["#94A3B8", "#64748B"]
  return { background: `linear-gradient(135deg, ${from}, ${to})` }
}

function formatLastActivity(iso?: string): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

function ContactAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white select-none shadow-sm ring-2 ring-white/20 dark:ring-black/20"
      style={getAvatarStyle(name)}
    >
      {initials}
    </div>
  )
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

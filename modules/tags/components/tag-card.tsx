"use client"

import { Tag as TagIcon, Calendar, Users, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Tag, TAG_COLOR_MAP } from "../types/tag"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

interface TagCardProps {
  tag: Tag
  onEdit?: (tag: Tag) => void
  onDelete?: (tag: Tag) => void
}

export function TagCard({ tag, onEdit, onDelete }: TagCardProps) {
  const color = TAG_COLOR_MAP[tag.color]

  const createdDate = new Date(tag.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Colored header */}
      <div className={cn("relative flex items-center justify-center px-4 py-7 overflow-hidden", color.cardBg)}>
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-4 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-2 -bottom-4 h-16 w-16 rounded-full bg-black/10" />
        <div className="pointer-events-none absolute right-8 bottom-1 h-8 w-8 rounded-full bg-white/10" />

        {/* Tag pill */}
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm ring-1 ring-white/30">
          <TagIcon className="h-3.5 w-3.5" />
          {tag.name}
        </span>

        {/* Actions menu — appears on hover */}
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/80 hover:bg-white/20 hover:text-white"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Ações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => onEdit?.(tag)}>
                <Pencil className="mr-2 h-3.5 w-3.5" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(tag)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {tag.description ? (
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {tag.description}
          </p>
        ) : (
          <p className="text-xs italic text-muted-foreground/50">Sem descrição</p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Users className="h-3 w-3" />
            {tag.usageCount.toLocaleString("pt-BR")} contato{tag.usageCount !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Calendar className="h-3 w-3" />
            {createdDate}
          </span>
        </div>
      </div>
    </div>
  )
}

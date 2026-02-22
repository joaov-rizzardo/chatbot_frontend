"use client"

import { Tag, Search } from "lucide-react"

interface TagsEmptyStateProps {
  search: string
}

export default function TagsEmptyState({ search }: TagsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/60 bg-muted/20 py-24 text-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/80 ring-1 ring-border/60">
          <Tag className="h-7 w-7 text-muted-foreground/50" />
        </div>
        {search && (
          <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-border/60">
            <Search className="h-3 w-3 text-muted-foreground/60" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground">
          {search ? "Nenhuma etiqueta encontrada" : "Nenhuma etiqueta criada"}
        </p>
        <p className="mx-auto max-w-[220px] text-xs leading-relaxed text-muted-foreground">
          {search
            ? "Tente buscar com outros termos ou limpe a busca."
            : "Crie etiquetas para organizar e segmentar seus contatos."}
        </p>
      </div>
    </div>
  )
}

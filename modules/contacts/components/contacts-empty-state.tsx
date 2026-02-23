"use client"

import { Search, Users, UserPlus } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

interface ContactsEmptyStateProps {
  search: string
  tabLabel: string
}

export function ContactsEmptyState({ search, tabLabel }: ContactsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/60 bg-muted/20 py-20 text-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/80 ring-1 ring-border/60">
          <Users className="h-7 w-7 text-muted-foreground/50" />
        </div>
        {search && (
          <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-border/60">
            <Search className="h-3 w-3 text-muted-foreground/60" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground">
          {search ? "Nenhum contato encontrado" : `Nenhum contato em "${tabLabel}"`}
        </p>
        <p className="text-xs text-muted-foreground max-w-[220px] mx-auto leading-relaxed">
          {search
            ? "Tente buscar com outros termos ou limpe a busca."
            : "Nenhum contato corresponde a este filtro no momento."}
        </p>
      </div>
      {!search && (
        <Button size="sm" className="gap-2 mt-1">
          <UserPlus className="h-3.5 w-3.5" />
          Novo contato
        </Button>
      )}
    </div>
  )
}

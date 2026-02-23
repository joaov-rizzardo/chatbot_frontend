"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal, X, Mail, MailX, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Separator } from "@/shared/components/ui/separator"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { TagChip } from "@/shared/components/ui/tag-chip"
import { cn } from "@/lib/utils"
import { useTagsQuery } from "@/modules/tags/queries/use-tags-query"
import { type ContactFilters, DEFAULT_FILTERS } from "../types/contact"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function countActiveFilters(f: ContactFilters): number {
  let count = 0
  if (f.tags.length > 0) count++
  if (f.hasEmail !== null) count++
  if (f.hasTags !== null) count++
  if (f.activityRange !== "any") count++
  if (f.createdRange !== "any") count++
  return count
}

// ---------------------------------------------------------------------------
// Option lists
// ---------------------------------------------------------------------------

const ACTIVITY_OPTIONS: { value: ContactFilters["activityRange"]; label: string }[] = [
  { value: "any", label: "Qualquer período" },
  { value: "24h", label: "Últimas 24 horas" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "90d", label: "Últimos 90 dias" },
  { value: "never", label: "Nunca" },
]

const CREATED_OPTIONS: { value: ContactFilters["createdRange"]; label: string }[] = [
  { value: "any", label: "Qualquer período" },
  { value: "24h", label: "Últimas 24 horas" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "90d", label: "Últimos 90 dias" },
  { value: "180d", label: "Últimos 6 meses" },
]

// ---------------------------------------------------------------------------
// Shared class tokens
// ---------------------------------------------------------------------------

const SECTION_LABEL = "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"

const PILL_BASE =
  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer select-none"

const PILL_IDLE =
  "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"

const PILL_ACTIVE =
  "bg-primary text-primary-foreground border-primary shadow-sm"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ContactsFilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: ContactFilters
  onApply: (filters: ContactFilters) => void
  onReset: () => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactsFilterDialog({
  open,
  onOpenChange,
  filters,
  onApply,
  onReset,
}: ContactsFilterDialogProps) {
  const [local, setLocal] = useState<ContactFilters>(filters)

  const { data: tags = [], isLoading: tagsLoading } = useTagsQuery()

  // Sync local draft whenever the dialog opens
  useEffect(() => {
    if (open) setLocal(filters)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const activeCount = countActiveFilters(local)

  function toggleTag(id: string) {
    setLocal((prev) => ({
      ...prev,
      tags: prev.tags.includes(id)
        ? prev.tags.filter((t) => t !== id)
        : [...prev.tags, id],
    }))
  }

  function handleLocalReset() {
    setLocal(DEFAULT_FILTERS)
    onReset()
  }

  function handleApply() {
    onApply(local)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 p-0 overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold leading-none">
                Filtrar contatos
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1.5 leading-snug">
                Refine a lista usando as opções abaixo.
              </DialogDescription>
            </div>
          </div>

          {activeCount > 0 && (
            <Badge
              variant="secondary"
              className="shrink-0 bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold px-2 py-0.5 mt-0.5 rounded-full"
            >
              {activeCount} {activeCount === 1 ? "filtro ativo" : "filtros ativos"}
            </Badge>
          )}
        </div>

        <Separator />

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto max-h-[58vh] divide-y divide-border/60">

          {/* Tags */}
          <section className="px-6 py-5 flex flex-col gap-3">
            <p className={SECTION_LABEL}>Filtrar por tags</p>
            <div className="flex flex-wrap gap-2">
              {tagsLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                  ))}
                </>
              ) : tags.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Nenhuma etiqueta cadastrada.
                </p>
              ) : (
                tags.map((tag) => (
                  <TagChip
                    key={tag.id}
                    name={tag.name}
                    color={tag.color}
                    selected={local.tags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))
              )}
            </div>
          </section>

          {/* E-mail */}
          <section className="px-6 py-5 flex flex-col gap-3">
            <p className={SECTION_LABEL}>Possui e-mail?</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasEmail: null }))}
                className={cn(PILL_BASE, local.hasEmail === null ? PILL_ACTIVE : PILL_IDLE)}
              >
                Qualquer
              </button>
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasEmail: true }))}
                className={cn(PILL_BASE, local.hasEmail === true ? PILL_ACTIVE : PILL_IDLE)}
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                Tem e-mail
              </button>
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasEmail: false }))}
                className={cn(PILL_BASE, local.hasEmail === false ? PILL_ACTIVE : PILL_IDLE)}
              >
                <MailX className="h-3.5 w-3.5 shrink-0" />
                Sem e-mail
              </button>
            </div>
          </section>

          {/* Tags presente */}
          <section className="px-6 py-5 flex flex-col gap-3">
            <p className={SECTION_LABEL}>Possui tags?</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasTags: null }))}
                className={cn(PILL_BASE, local.hasTags === null ? PILL_ACTIVE : PILL_IDLE)}
              >
                Qualquer
              </button>
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasTags: true }))}
                className={cn(PILL_BASE, local.hasTags === true ? PILL_ACTIVE : PILL_IDLE)}
              >
                <Tag className="h-3.5 w-3.5 shrink-0" />
                Tem tags
              </button>
              <button
                type="button"
                onClick={() => setLocal((p) => ({ ...p, hasTags: false }))}
                className={cn(PILL_BASE, local.hasTags === false ? PILL_ACTIVE : PILL_IDLE)}
              >
                Sem tags
              </button>
            </div>
          </section>

          {/* Última atividade */}
          <section className="px-6 py-5 flex flex-col gap-3">
            <p className={SECTION_LABEL}>Última atividade</p>
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLocal((p) => ({ ...p, activityRange: value }))}
                  className={cn(
                    PILL_BASE,
                    local.activityRange === value ? PILL_ACTIVE : PILL_IDLE,
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* Data de cadastro */}
          <section className="px-6 py-5 flex flex-col gap-3">
            <p className={SECTION_LABEL}>Data de cadastro</p>
            <div className="flex flex-wrap gap-2">
              {CREATED_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLocal((p) => ({ ...p, createdRange: value }))}
                  className={cn(
                    PILL_BASE,
                    local.createdRange === value ? PILL_ACTIVE : PILL_IDLE,
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

        </div>

        <Separator />

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={handleLocalReset}
            disabled={activeCount === 0}
          >
            <X className="h-3.5 w-3.5" />
            Limpar filtros
          </Button>

          <Button
            type="button"
            size="sm"
            className="gap-2 min-w-[128px]"
            onClick={handleApply}
          >
            {activeCount > 0
              ? `Aplicar ${activeCount} ${activeCount === 1 ? "filtro" : "filtros"}`
              : "Aplicar filtros"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

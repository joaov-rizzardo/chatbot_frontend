"use client"

import { useState, useMemo } from "react"
import { Search, Tag, Plus, ArrowUpDown, Users, TrendingUp } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { TagCard } from "./tag-card"
import { TagCardSkeleton } from "./tag-card-skeleton"
import { CreateTagDialog } from "./create-tag-dialog"
import { DeleteTagDialog } from "./delete-tag-dialog"
import { EditTagDialog } from "./edit-tag-dialog"
import { EditTagConfirmationDialog } from "./edit-tag-confirmation-dialog"
import StatChip from "./stat-chip"
import TagsEmptyState from "./tags-empty-state"
import { sortTags, type SortKey, SORT_LABELS } from "../utils/sort-tags"
import { useTagsQuery } from "../queries/use-tags-query"
import { useCreateTagDialog } from "../hooks/use-create-tag-dialog"
import { useDeleteTagDialog } from "../hooks/use-delete-tag-dialog"
import { useEditTagDialog } from "../hooks/use-edit-tag-dialog"
import type { Tag as TagType } from "../types/tag"

export function TagsList() {
  const { data: tags = [], isLoading } = useTagsQuery()

  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("usage-desc")

  const createTagDialog = useCreateTagDialog()
  const deleteTagDialog = useDeleteTagDialog()
  const editTagDialog = useEditTagDialog()

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const result = q
      ? tags.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q),
        )
      : tags
    return sortTags(result, sortKey)
  }, [tags, search, sortKey])

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Etiquetas</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Organize seus contatos com etiquetas coloridas.
            </p>
          </div>
          <Button
            size="sm"
            className="h-9 gap-2 shrink-0"
            onClick={createTagDialog.openDialog}
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nova etiqueta</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>

        {/* Stats bar */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <StatChip
              icon={Tag}
              label="etiquetas"
              value={tags.length}
              className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
            <StatChip
              icon={Users}
              label="usos totais"
              value={tags.reduce((sum, t) => sum + t.usageCount, 0)}
              className="bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
            />
            {(() => {
              const mostUsed = tags.reduce((best, t) => t.usageCount > best.usageCount ? t : best, tags[0])
              return (
                <StatChip
                  icon={TrendingUp}
                  value={mostUsed.name}
                  label="mais usada"
                  className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                />
              )
            })()}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar etiquetas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 shrink-0 gap-2">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{SORT_LABELS[sortKey]}</span>
                <span className="sm:hidden">Ordenar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuRadioGroup
                value={sortKey}
                onValueChange={(v) => setSortKey(v as SortKey)}
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <DropdownMenuRadioItem key={key} value={key}>
                    {SORT_LABELS[key]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results count */}
        {search && (
          <p className="text-xs text-muted-foreground -mt-2">
            {filtered.length === 0
              ? "Nenhuma etiqueta encontrada"
              : `${filtered.length} etiqueta${filtered.length !== 1 ? "s" : ""} encontrada${filtered.length !== 1 ? "s" : ""}`}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <TagCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <TagsEmptyState search={search} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                onEdit={editTagDialog.openDialog}
                onDelete={deleteTagDialog.openDialog}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTagDialog
        open={createTagDialog.open}
        form={createTagDialog.form}
        canSubmit={createTagDialog.canSubmit}
        isPending={createTagDialog.isPending}
        onSubmit={createTagDialog.onSubmit}
        onClose={createTagDialog.handleClose}
      />

      <DeleteTagDialog
        open={deleteTagDialog.open}
        tag={deleteTagDialog.tagToDelete}
        isPending={deleteTagDialog.isPending}
        onConfirm={deleteTagDialog.handleConfirm}
        onClose={deleteTagDialog.handleClose}
      />

      <EditTagDialog
        open={editTagDialog.open}
        form={editTagDialog.form}
        canSubmit={editTagDialog.canSubmit}
        isPending={editTagDialog.isPending}
        onSubmit={editTagDialog.onSubmit}
        onClose={editTagDialog.handleClose}
      />

      <EditTagConfirmationDialog
        open={editTagDialog.confirmOpen}
        tag={editTagDialog.tagToEdit}
        isPending={editTagDialog.isPending}
        onConfirm={editTagDialog.handleConfirm}
        onClose={editTagDialog.handleCancelConfirm}
      />
    </>
  )
}

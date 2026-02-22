"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Tag,
  Users,
  TrendingUp,
  Plus,
  ArrowUpDown,
} from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { TagCard } from "./tag-card"
import { CreateTagDialog } from "./create-tag-dialog"
import StatChip from "./stat-chip"
import TagsEmptyState from "./tags-empty-state"
import { sortTags, type SortKey, SORT_LABELS } from "../utils/sort-tags"
import { MOCK_TAGS, TAG_COLOR_MAP, type Tag as TagType, type TagColor } from "../types/tag"

export function TagsList() {
  const [tags, setTags] = useState<TagType[]>(MOCK_TAGS)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("usage-desc")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const stats = useMemo(
    () => ({
      total: tags.length,
      totalUsages: tags.reduce((sum, t) => sum + t.usageCount, 0),
      mostUsed: tags.reduce(
        (best, t) => (t.usageCount > best.usageCount ? t : best),
        tags[0],
      ),
    }),
    [tags],
  )

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

  function handleCreate(data: { name: string; color: TagColor; description?: string }) {
    setIsCreating(true)
    setTimeout(() => {
      const newTag: TagType = {
        id: String(Date.now()),
        name: data.name,
        color: data.color,
        description: data.description,
        usageCount: 0,
        createdAt: new Date().toISOString(),
      }
      setTags((prev) => [newTag, ...prev])
      setIsCreating(false)
      setIsCreateOpen(false)
    }, 800)
  }

  function handleDelete(tag: TagType) {
    setTags((prev) => prev.filter((t) => t.id !== tag.id))
  }

  function handleEdit(tag: TagType) {
    console.log("edit", tag)
  }

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
            onClick={() => setIsCreateOpen(true)}
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
              value={stats.total}
              className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
            <StatChip
              icon={Users}
              label="usos totais"
              value={stats.totalUsages.toLocaleString("pt-BR")}
              className="bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
            />
            {stats.mostUsed && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                <span className="text-sm font-semibold">
                  {stats.mostUsed.name}
                </span>
                <span className="hidden text-xs font-medium opacity-70 sm:inline">
                  mais usada
                </span>
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full px-2 text-[11px] font-bold",
                    TAG_COLOR_MAP[stats.mostUsed.color].badgeBg,
                    TAG_COLOR_MAP[stats.mostUsed.color].badgeText,
                  )}
                >
                  {stats.mostUsed.usageCount}
                </span>
              </div>
            )}
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
        {filtered.length === 0 ? (
          <TagsEmptyState search={search} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTagDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        isLoading={isCreating}
      />
    </>
  )
}

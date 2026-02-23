"use client"

import { useState, useMemo } from "react"
import type { ElementType } from "react"
import {
  Search,
  SlidersHorizontal,
  UserPlus,
  Upload,
  ChevronLeft,
  ChevronRight,
  Users,
  Tag,
  Zap,
  Clock,
  MessageCircleOff,
  Sparkles,
} from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/lib/utils"
import { ContactListItem } from "./contact-list-item"
import { ContactsFilterDialog } from "./contacts-filter-dialog"
import { StatChip } from "./stat-chip"
import { TabBar, type TabId } from "./tab-bar"
import { ContactsEmptyState } from "./contacts-empty-state"
import { useContactsFilterDialog } from "../hooks/use-contacts-filter-dialog"
import { MOCK_CONTACTS, type Contact } from "../types/contact"

const PAGE_SIZE = 5

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

interface TabConfig {
  id: TabId
  label: string
  icon: ElementType
  filter: (c: Contact, weekAgo: Date, monthsAgo: Date) => boolean
}

const TABS: TabConfig[] = [
  {
    id: "todos",
    label: "Todos",
    icon: Users,
    filter: () => true,
  },
  {
    id: "recentes",
    label: "Recentes",
    icon: Clock,
    // Had any activity in the last 7 days
    filter: (c, weekAgo) =>
      !!c.lastActivityAt && new Date(c.lastActivityAt) >= weekAgo,
  },
  {
    id: "novos",
    label: "Novos",
    icon: Sparkles,
    // Added in the last 60 days
    filter: (c, _weekAgo, monthsAgo) =>
      new Date(c.createdAt) >= monthsAgo,
  },
  {
    id: "nunca-contatados",
    label: "Nunca contatados",
    icon: MessageCircleOff,
    // No activity record at all — never received a message
    filter: (c) => !c.lastActivityAt,
  },
]

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ContactsList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState<TabId>("todos")

  const filterDialog = useContactsFilterDialog()

  // Stable date boundaries — recomputed only once on mount
  const weekAgo = useMemo(() => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), [])
  const monthsAgo = useMemo(() => new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), [])

  // Global stats (always from full dataset)
  const stats = useMemo(
    () => ({
      total: MOCK_CONTACTS.length,
      withTags: MOCK_CONTACTS.filter((c) => c.tags.length > 0).length,
      activeThisWeek: MOCK_CONTACTS.filter(
        (c) => c.lastActivityAt && new Date(c.lastActivityAt) >= weekAgo
      ).length,
    }),
    [weekAgo]
  )

  // Tab counts (always from full dataset, independent of search)
  const tabCounts = useMemo(
    () =>
      Object.fromEntries(
        TABS.map((t) => [t.id, MOCK_CONTACTS.filter((c) => t.filter(c, weekAgo, monthsAgo)).length])
      ) as Record<TabId, number>,
    [weekAgo, monthsAgo]
  )

  // Active tab filter → then search filter
  const filtered = useMemo(() => {
    const activeTabConfig = TABS.find((t) => t.id === activeTab)!
    const tabFiltered = MOCK_CONTACTS.filter((c) => activeTabConfig.filter(c, weekAgo, monthsAgo))
    const q = search.trim().toLowerCase()
    if (!q) return tabFiltered
    return tabFiltered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false) ||
        c.tags.some((t) => t.name.toLowerCase().includes(q))
    )
  }, [activeTab, search, weekAgo, monthsAgo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleTabChange(id: TabId) {
    setActiveTab(id)
    setSearch("")
    setPage(1)
  }

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length)
  const activeTabLabel = TABS.find((t) => t.id === activeTab)!.label

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Contatos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie os contatos da sua área de trabalho.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Importar</span>
          </Button>
          <Button size="sm" className="gap-2 h-9">
            <UserPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Novo contato</span>
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <StatChip
          icon={Users}
          label="contatos"
          value={stats.total}
          className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        />
        <StatChip
          icon={Tag}
          label="com tags"
          value={stats.withTags}
          className="bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
        />
        <StatChip
          icon={Zap}
          label="ativos esta semana"
          value={stats.activeThisWeek}
          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
      </div>

      {/* Tabs */}
      <TabBar
        tabs={TABS}
        counts={tabCounts}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "relative gap-2 h-9 shrink-0 transition-colors",
            filterDialog.appliedCount > 0 && "border-primary/50 text-primary hover:border-primary hover:text-primary",
          )}
          onClick={() => filterDialog.setOpen(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtros
          {filterDialog.appliedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground leading-none">
              {filterDialog.appliedCount}
            </span>
          )}
        </Button>
      </div>

      {/* Column headers */}
      {paginated.length > 0 && (
        <div className="flex items-center gap-3 px-4 -mb-2">
          <div className="w-10 shrink-0" />
          <div className="w-44 shrink-0">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Contato
            </p>
          </div>
          <div className="hidden md:block flex-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              E-mail
            </p>
          </div>
          <div className="hidden lg:block flex-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Tags
            </p>
          </div>
          <div className="hidden xl:block w-24 shrink-0 text-right">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Atividade
            </p>
          </div>
          <div className="hidden xl:block w-24 shrink-0 text-right">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Criado em
            </p>
          </div>
          <div className="w-24 shrink-0" />
        </div>
      )}

      {/* Contact list */}
      <div className="flex flex-col gap-1.5">
        {paginated.length === 0 ? (
          <ContactsEmptyState search={search} tabLabel={activeTabLabel} />
        ) : (
          paginated.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              onMessage={(id) => console.log("message", id)}
              onEdit={(id) => console.log("edit", id)}
              onDelete={(id) => console.log("delete", id)}
            />
          ))
        )}
      </div>

      {/* Filter dialog */}
      <ContactsFilterDialog
        open={filterDialog.open}
        onOpenChange={filterDialog.setOpen}
        filters={filterDialog.filters}
        onApply={filterDialog.handleApply}
        onReset={filterDialog.handleReset}
      />

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            {rangeStart}–{rangeEnd} de {filtered.length} contato{filtered.length !== 1 ? "s" : ""}
            {filtered.length < tabCounts[activeTab] && (
              <span className="text-muted-foreground/50">
                {" "}
                (filtrado de {tabCounts[activeTab]})
              </span>
            )}
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={safePage === p ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-8 w-8 text-xs font-medium",
                  safePage === p && "pointer-events-none"
                )}
                onClick={() => setPage(p)}
                aria-label={`Página ${p}`}
                aria-current={safePage === p ? "page" : undefined}
              >
                {p}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

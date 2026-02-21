"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, UserPlus, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/lib/utils"
import { ContactListItem } from "./contact-list-item"
import { MOCK_CONTACTS } from "../types/contact"

const PAGE_SIZE = 5

export function ContactsList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return MOCK_CONTACTS
    return MOCK_CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length)

  return (
    <div className="flex flex-col gap-4">
      {/* Page header */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">Contatos</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-3.5 w-3.5" />
              Importar
            </Button>
            <Button size="sm" className="gap-2">
              <UserPlus className="h-3.5 w-3.5" />
              Novo contato
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Gerencie os contatos da sua área de trabalho.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button variant="outline" size="sm" className="gap-2 shrink-0">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtros
        </Button>
      </div>

      {/* Column headers */}
      {paginated.length > 0 && (
        <div className="flex items-center gap-3 px-4">
          <div className="w-9 shrink-0" />
          <div className="w-40 shrink-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contato</p>
          </div>
          <div className="hidden md:block flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">E-mail</p>
          </div>
          <div className="hidden lg:block flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tags</p>
          </div>
          <div className="hidden xl:block w-20 shrink-0 text-right">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Atividade</p>
          </div>
          <div className="w-[88px] shrink-0" />
        </div>
      )}

      {/* Contact list */}
      <div className="flex flex-col gap-2">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">Nenhum contato encontrado.</p>
            {search && (
              <p className="text-xs text-muted-foreground">Tente buscar com outros termos.</p>
            )}
          </div>
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

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground">
            Exibindo {rangeStart}–{rangeEnd} de {filtered.length} contato{filtered.length !== 1 ? "s" : ""}
            {filtered.length < MOCK_CONTACTS.length && ` (filtrado de ${MOCK_CONTACTS.length})`}
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
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={safePage === p ? "default" : "outline"}
                size="icon"
                className={cn("h-8 w-8 text-xs", safePage === p && "pointer-events-none")}
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
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

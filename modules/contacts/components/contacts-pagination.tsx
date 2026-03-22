"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/lib/utils"

interface ContactsPaginationProps {
  page: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  totalFiltered: number
  totalInTab: number
  onPageChange: (page: number) => void
}

function getPageRange(current: number, total: number): (number | "ellipsis-left" | "ellipsis-right")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const siblings = 1
  const leftSibling = Math.max(2, current - siblings)
  const rightSibling = Math.min(total - 1, current + siblings)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  const pages: (number | "ellipsis-left" | "ellipsis-right")[] = [1]

  if (showLeftEllipsis) {
    pages.push("ellipsis-left")
  }

  for (let p = leftSibling; p <= rightSibling; p++) {
    pages.push(p)
  }

  if (showRightEllipsis) {
    pages.push("ellipsis-right")
  }

  pages.push(total)

  return pages
}

export function ContactsPagination({
  page,
  totalPages,
  rangeStart,
  rangeEnd,
  totalFiltered,
  totalInTab,
  onPageChange,
}: ContactsPaginationProps) {
  const pageRange = getPageRange(page, totalPages)

  return (
    <div className="flex items-center justify-between pt-2 border-t border-border/50">
      <p className="text-xs text-muted-foreground">
        {rangeStart}–{rangeEnd} de {totalFiltered} contato{totalFiltered !== 1 ? "s" : ""}
        {totalFiltered < totalInTab && (
          <span className="text-muted-foreground/50">
            {" "}
            (filtrado de {totalInTab})
          </span>
        )}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        {pageRange.map((item, index) => {
          if (item === "ellipsis-left" || item === "ellipsis-right") {
            return (
              <span
                key={item}
                className="h-8 w-8 flex items-center justify-center text-muted-foreground/50"
                aria-hidden
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </span>
            )
          }

          return (
            <Button
              key={item}
              variant={page === item ? "default" : "ghost"}
              size="icon"
              className={cn(
                "h-8 w-8 text-xs font-medium",
                page === item && "pointer-events-none"
              )}
              onClick={() => onPageChange(item)}
              aria-label={`Página ${item}`}
              aria-current={page === item ? "page" : undefined}
            >
              {item}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

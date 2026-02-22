"use client"

import { Pencil, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import type { Tag } from "../types/tag"

interface EditTagConfirmationDialogProps {
  open: boolean
  tag: Tag | null
  isPending: boolean
  onConfirm: () => void
  onClose: () => void
}

export function EditTagConfirmationDialog({
  open,
  tag,
  isPending,
  onConfirm,
  onClose,
}: EditTagConfirmationDialogProps) {
  const count = tag?.usageCount ?? 0

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-95 gap-0 [&>button:last-child]:z-20">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-4">
          <div className="space-y-0.5">
            <DialogTitle className="text-sm font-semibold leading-snug text-foreground">
              Confirmar alterações
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Esta etiqueta está sendo usada por contatos.
            </DialogDescription>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-amber-200/70 bg-amber-50/80 px-3.5 py-3 dark:border-amber-800/40 dark:bg-amber-950/30">
            <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
              <span className="font-semibold">
                {count.toLocaleString("pt-BR")} contato{count !== 1 ? "s" : ""}
              </span>{" "}
              {count !== 1 ? "serão afetados" : "será afetado"} por esta alteração.
              As mudanças serão aplicadas imediatamente.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isPending}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              size="sm"
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 gap-1.5"
            >
              {isPending ? (
                <>
                  <Spinner className="h-3.5 w-3.5" />
                  Salvando...
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5" />
                  Salvar mesmo assim
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

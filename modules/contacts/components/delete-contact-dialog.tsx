"use client"

import { TriangleAlert } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import type { Contact } from "../types/contact"

interface DeleteContactDialogProps {
  open: boolean
  contact: Contact | null
  isPending: boolean
  onConfirm: () => void
  onClose: () => void
}

export function DeleteContactDialog({
  open,
  contact,
  isPending,
  onConfirm,
  onClose,
}: DeleteContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
              <TriangleAlert className="h-4 w-4 text-destructive" />
            </div>
            Excluir contato
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          <p className="text-sm text-foreground">
            Tem certeza que deseja excluir{" "}
            <span className="font-semibold">{contact?.name}</span>? Todas as informações
            relacionadas a este contato serão permanentemente removidas, incluindo o{" "}
            <span className="font-medium">histórico de conversas</span>.
          </p>

          <div className="flex items-center justify-end gap-2 border-t border-border/50 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isPending}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Spinner className="h-3.5 w-3.5" />
                  Excluindo...
                </>
              ) : (
                "Excluir contato"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

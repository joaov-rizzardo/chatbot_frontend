"use client"

import type { UseFormReturn } from "react-hook-form"
import { UserPen, Lock, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import type { EditContactFormData } from "../schemas/edit-contact-schema"
import type { Contact } from "../types/contact"

interface EditContactDialogProps {
  open: boolean
  contact: Contact | null
  form: UseFormReturn<EditContactFormData>
  canSubmit: boolean
  isPending: boolean
  onSubmit: () => void
  onClose: () => void
}

export function EditContactDialog({
  open,
  contact,
  form,
  canSubmit,
  isPending,
  onSubmit,
  onClose,
}: EditContactDialogProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <UserPen className="h-4 w-4 text-primary" />
            </div>
            Editar contato
          </DialogTitle>
          <DialogDescription>
            Atualize as informações do contato.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-contact-name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-contact-name"
                placeholder="João"
                autoFocus
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-contact-last-name">
                Sobrenome{" "}
                <span className="font-normal text-xs text-muted-foreground">(opcional)</span>
              </Label>
              <Input
                id="edit-contact-last-name"
                placeholder="Silva"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Phone — read-only */}
          <div className="flex flex-col gap-1.5">
            <Label className="flex items-center gap-1.5">
              Telefone
              <span className="inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
                <Lock className="h-3 w-3" />
                não editável
              </span>
            </Label>
            <Input
              value={contact ? formatPhoneNumber(contact.phone) : ""}
              readOnly
              disabled
              className="bg-muted/50 text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-contact-email">
              E-mail{" "}
              <span className="font-normal text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="edit-contact-email"
              type="email"
              placeholder="joao@exemplo.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-border/50 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancelar
            </Button>
            <Button onClick={onSubmit} disabled={!canSubmit} className="gap-2">
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <UserPen className="h-3.5 w-3.5" />
                  Salvar alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

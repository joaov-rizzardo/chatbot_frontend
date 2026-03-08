"use client"

import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { UserPlus } from "lucide-react"
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
import { Spinner } from "@/shared/components/ui/spinner"
import { PhoneInput } from "@/shared/components/ui/phone-input"
import type { CreateContactFormData } from "../schemas/create-contact-schema"

interface CreateContactDialogProps {
  open: boolean
  form: UseFormReturn<CreateContactFormData>
  canSubmit: boolean
  isPending: boolean
  onSubmit: () => void
  onClose: () => void
}

export function CreateContactDialog({
  open,
  form,
  canSubmit,
  isPending,
  onSubmit,
  onClose,
}: CreateContactDialogProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <UserPlus className="h-4 w-4 text-primary" />
            </div>
            Novo contato
          </DialogTitle>
          <DialogDescription>
            Adicione um novo contato à sua área de trabalho.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contact-name"
                placeholder="João"
                autoFocus
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-last-name">
                Sobrenome{" "}
                <span className="font-normal text-xs text-muted-foreground">(opcional)</span>
              </Label>
              <Input
                id="contact-last-name"
                placeholder="Silva"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <Label>
              Telefone <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  hasError={!!errors.phoneNumber}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-email">
              E-mail{" "}
              <span className="font-normal text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="contact-email"
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
            <Button onClick={onSubmit} disabled={!canSubmit || isPending} className="gap-2">
              {isPending ? (
                <>
                  <Spinner className="h-3.5 w-3.5" />
                  Criando...
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5" />
                  Criar contato
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

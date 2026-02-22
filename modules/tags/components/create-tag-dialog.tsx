"use client"

import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { Tag, Check } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { TAG_COLORS, TAG_COLOR_MAP } from "../types/tag"
import type { CreateTagFormData } from "../schemas/create-tag-schema"

interface CreateTagDialogProps {
  open: boolean
  form: UseFormReturn<CreateTagFormData>
  canSubmit: boolean
  isPending: boolean
  onSubmit: () => void
  onClose: () => void
}

export function CreateTagDialog({
  open,
  form,
  canSubmit,
  isPending,
  onSubmit,
  onClose,
}: CreateTagDialogProps) {
  const { register, control, watch, formState: { errors } } = form

  const name = watch("name")
  const selectedColor = watch("color")
  const colorConfig = TAG_COLOR_MAP[selectedColor]

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && canSubmit) onSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300",
                colorConfig.cardBg,
              )}
            >
              <Tag className="h-4 w-4 text-white" />
            </div>
            Nova etiqueta
          </DialogTitle>
          <DialogDescription>
            Crie uma etiqueta para categorizar seus contatos.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-1">
          {/* Live preview */}
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden rounded-xl py-8 transition-all duration-300",
              colorConfig.cardBg,
            )}
          >
            <div className="pointer-events-none absolute -right-4 -top-6 h-24 w-24 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -left-2 -bottom-4 h-16 w-16 rounded-full bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-32 rounded-full bg-white/15 blur-2xl" />
            </div>
            <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/25 px-5 py-2 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur-sm">
              <Tag className="h-3.5 w-3.5" />
              {name.trim() || "Prévia da etiqueta"}
            </span>
          </div>

          {/* Name field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tag-name">
              Nome <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="tag-name"
                placeholder="Ex: VIP, Lead, Cliente..."
                {...register("name")}
                onKeyDown={handleKeyDown}
                className="pr-14"
                autoFocus
                maxLength={30}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-muted-foreground">
                {name.length}/30
              </span>
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Color picker */}
          <div className="flex flex-col gap-2">
            <Label>
              Cor{" "}
              <span className="font-normal text-muted-foreground">— {colorConfig.label}</span>
            </Label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-5 gap-2">
                  {TAG_COLORS.map((color) => {
                    const cfg = TAG_COLOR_MAP[color]
                    const isSelected = color === field.value
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => field.onChange(color)}
                        title={cfg.label}
                        className={cn(
                          "relative flex h-9 w-full items-center justify-center rounded-lg transition-all duration-150",
                          cfg.cardBg,
                          isSelected
                            ? "scale-110 ring-2 ring-foreground/25 ring-offset-2"
                            : "opacity-60 hover:opacity-90 hover:scale-105",
                        )}
                      >
                        {isSelected && <Check className="h-4 w-4 text-white drop-shadow" />}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>

          {/* Description field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tag-description">
              Descrição{" "}
              <span className="font-normal text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="tag-description"
              placeholder="Quando usar esta etiqueta?"
              {...register("description")}
              maxLength={60}
            />
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
                  <Tag className="h-3.5 w-3.5" />
                  Criar etiqueta
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateTag } from "../services/tag-client"
import { tagsQueryKey } from "../queries/use-tags-query"
import { updateTagSchema, type UpdateTagFormData } from "../schemas/update-tag-schema"
import type { Tag } from "../types/tag"

export function useEditTagDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [tagToEdit, setTagToEdit] = useState<Tag | null>(null)
  const [pendingData, setPendingData] = useState<UpdateTagFormData | null>(null)

  const form = useForm<UpdateTagFormData>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: "",
      color: "emerald",
      description: "",
    },
  })

  const nameValue = form.watch("name")
  const canSubmit = nameValue.trim().length > 0

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagFormData }) =>
      updateTag(id, {
        name: data.name.trim(),
        color: data.color,
        description: data.description.trim() || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey })
      form.reset()
      setOpen(false)
      setConfirmOpen(false)
      setTagToEdit(null)
      setPendingData(null)
      toast.success("Etiqueta atualizada com sucesso.")
    },
    onError: (error: Error) => {
      toast.error("Erro ao atualizar etiqueta", {
        description: error.message,
      })
    },
  })

  function openDialog(tag: Tag) {
    setTagToEdit(tag)
    form.reset({
      name: tag.name,
      color: tag.color,
      description: tag.description ?? "",
    })
    setOpen(true)
  }

  function handleClose() {
    if (mutation.isPending) return
    form.reset()
    setOpen(false)
    setTagToEdit(null)
  }

  const onSubmit = form.handleSubmit((data) => {
    if (!tagToEdit) return
    if (tagToEdit.usageCount > 0) {
      setPendingData(data)
      setOpen(false)
      setConfirmOpen(true)
    } else {
      mutation.mutate({ id: tagToEdit.id, data })
    }
  })

  function handleConfirm() {
    if (!tagToEdit || !pendingData) return
    mutation.mutate({ id: tagToEdit.id, data: pendingData })
  }

  function handleCancelConfirm() {
    if (mutation.isPending) return
    setConfirmOpen(false)
    setOpen(true)
  }

  return {
    open,
    confirmOpen,
    tagToEdit,
    openDialog,
    form,
    canSubmit,
    isPending: mutation.isPending,
    onSubmit,
    handleClose,
    handleConfirm,
    handleCancelConfirm,
  }
}

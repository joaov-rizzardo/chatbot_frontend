"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createTag } from "../services/tag-client"
import { tagsQueryKey } from "../queries/use-tags-query"
import { createTagSchema, type CreateTagFormData } from "../schemas/create-tag-schema"

export function useCreateTagDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTagFormData>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
      color: "emerald",
      description: "",
    },
  })

  const nameValue = form.watch("name")
  const canSubmit = nameValue.trim().length > 0

  const mutation = useMutation({
    mutationFn: (data: CreateTagFormData) =>
      createTag({
        name: data.name.trim(),
        color: data.color,
        description: data.description.trim() || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey })
      form.reset()
      setOpen(false)
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar etiqueta", {
        description: error.message,
      })
    },
  })

  function handleClose() {
    if (mutation.isPending) return
    form.reset()
    setOpen(false)
  }

  return {
    open,
    openDialog: () => setOpen(true),
    form,
    canSubmit,
    isPending: mutation.isPending,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    handleClose,
  }
}

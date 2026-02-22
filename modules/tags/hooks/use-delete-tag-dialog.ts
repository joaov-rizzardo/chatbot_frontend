"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteTag } from "../services/tag-client"
import { tagsQueryKey } from "../queries/use-tags-query"
import type { Tag } from "../types/tag"

export function useDeleteTagDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null)

  const mutation = useMutation({
    mutationFn: (tag: Tag) => deleteTag(tag.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey })
      setOpen(false)
      setTagToDelete(null)
      toast.success("Etiqueta excluída com sucesso.")
    },
    onError: (error: Error) => {
      toast.error("Erro ao excluir etiqueta", {
        description: error.message,
      })
    },
  })

  function openDialog(tag: Tag) {
    setTagToDelete(tag)
    setOpen(true)
  }

  function handleClose() {
    if (mutation.isPending) return
    setOpen(false)
    setTagToDelete(null)
  }

  function handleConfirm() {
    if (!tagToDelete) return
    mutation.mutate(tagToDelete)
  }

  return {
    open,
    tagToDelete,
    isPending: mutation.isPending,
    openDialog,
    handleClose,
    handleConfirm,
  }
}

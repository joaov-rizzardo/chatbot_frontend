"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteContact } from "../services/contact-client"
import { contactsQueryKey } from "../queries/use-contacts-query"
import type { Contact } from "../types/contact"

export function useDeleteContactDialog() {
  const queryClient = useQueryClient()
  const [contact, setContact] = useState<Contact | null>(null)

  const mutation = useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKey })
      setContact(null)
      toast.success("Contato excluído com sucesso.")
    },
    onError: () => {
      toast.error("Erro ao excluir contato", {
        description: "Tente novamente em alguns instantes.",
      })
    },
  })

  function openDialog(c: Contact) {
    setContact(c)
  }

  function closeDialog() {
    if (mutation.isPending) return
    setContact(null)
  }

  function confirm() {
    if (!contact) return
    mutation.mutate(contact.id)
  }

  return {
    contact,
    open: contact !== null,
    openDialog,
    closeDialog,
    confirm,
    isPending: mutation.isPending,
  }
}

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { editContactSchema, type EditContactFormData } from "../schemas/edit-contact-schema"
import { updateContact } from "../services/contact-client"
import { contactsQueryKey } from "../queries/use-contacts-query"
import type { Contact } from "../types/contact"

export function useEditContactDialog() {
  const queryClient = useQueryClient()
  const [contact, setContact] = useState<Contact | null>(null)

  const form = useForm<EditContactFormData>({
    resolver: zodResolver(editContactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: EditContactFormData) => {
      return updateContact(contact!.id, {
        name: data.name.trim(),
        lastName: data.lastName?.trim() || undefined,
        email: data.email?.trim() || undefined,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKey })
      setContact(null)
      toast.success("Contato atualizado com sucesso.")
    },
    onError: (error: Error) => {
      toast.error("Erro ao atualizar contato", {
        description: error.message,
      })
    },
  })

  function openDialog(c: Contact) {
    const nameParts = c.name.split(" ")
    const firstName = nameParts[0] ?? ""
    const lastName = nameParts.slice(1).join(" ")

    form.reset({
      name: firstName,
      lastName,
      email: c.email ?? "",
    })
    setContact(c)
  }

  function closeDialog() {
    if (mutation.isPending) return
    form.reset()
    setContact(null)
  }

  const canSubmit = form.formState.isValid && !mutation.isPending

  return {
    open: contact !== null,
    contact,
    openDialog,
    form,
    canSubmit,
    isPending: mutation.isPending,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    onClose: closeDialog,
  }
}

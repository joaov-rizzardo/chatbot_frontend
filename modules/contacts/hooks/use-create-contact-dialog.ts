"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createContact } from "../services/contact-client"
import { contactsQueryKey } from "../queries/use-contacts-query"
import { createContactSchema, type CreateContactFormData } from "../schemas/create-contact-schema"

export function useCreateContactDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateContactFormData>({
    resolver: zodResolver(createContactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: CreateContactFormData) =>
      createContact({
        name: data.name.trim(),
        lastName: data.lastName?.trim() || undefined,
        phoneNumber: data.phoneNumber,
        email: data.email?.trim() || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKey })
      form.reset()
      setOpen(false)
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar contato", {
        description: error.message,
      })
    },
  })

  const canSubmit = form.formState.isValid && !mutation.isPending

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
    onClose: handleClose,
  }
}

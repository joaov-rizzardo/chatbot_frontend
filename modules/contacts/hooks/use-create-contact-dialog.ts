"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContactSchema, type CreateContactFormData } from "../schemas/create-contact-schema"

export function useCreateContactDialog() {
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

  const isPending = false // TODO: wire up mutation
  const canSubmit = form.formState.isValid && !isPending

  function handleClose() {
    form.reset()
    setOpen(false)
  }

  function handleSubmit(data: CreateContactFormData) {
    // TODO: wire up mutation
    console.log("Create contact:", data)
  }

  return {
    open,
    openDialog: () => setOpen(true),
    form,
    canSubmit,
    isPending,
    onSubmit: form.handleSubmit(handleSubmit),
    onClose: handleClose,
  }
}

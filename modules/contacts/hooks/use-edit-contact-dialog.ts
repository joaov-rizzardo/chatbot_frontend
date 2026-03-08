"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editContactSchema, type EditContactFormData } from "../schemas/edit-contact-schema"
import type { Contact } from "../types/contact"

export function useEditContactDialog() {
  const [open, setOpen] = useState(false)
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
    setOpen(true)
  }

  function closeDialog() {
    form.reset()
    setContact(null)
    setOpen(false)
  }

  const canSubmit = form.formState.isValid

  return {
    open,
    contact,
    openDialog,
    form,
    canSubmit,
    onClose: closeDialog,
  }
}

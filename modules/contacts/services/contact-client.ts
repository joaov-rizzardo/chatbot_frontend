"use client"

import { clientFetch } from "@/lib/client-fetch"
import type { TagColor } from "@/modules/tags/types/tag"
import type { Contact } from "../types/contact"

interface BackendContact {
  id: string
  workspaceId: string
  phoneNumber: string
  name: string
  lastName: string | null
  email: string | null
  createdAt: string
  updatedAt: string
  tags: { id: string; name: string; color: string }[]
}

function mapContact(c: BackendContact): Contact {
  return {
    id: c.id,
    name: c.lastName ? `${c.name} ${c.lastName}` : c.name,
    phone: c.phoneNumber,
    email: c.email ?? undefined,
    tags: c.tags.map((t) => ({ id: t.id, name: t.name, color: t.color as TagColor })),
    createdAt: c.createdAt,
  }
}

export async function listContacts(): Promise<Contact[]> {
  const response = await clientFetch("/api/contact")
  if (!response.ok) throw new Error("Falha ao carregar contatos.")
  const data: BackendContact[] = await response.json()
  return data.map(mapContact)
}

export async function updateContact(
  id: string,
  data: { name: string; lastName?: string; email?: string },
): Promise<Contact> {
  const response = await clientFetch(`/api/contact/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Falha ao atualizar contato.")
  const updated: BackendContact = await response.json()
  return mapContact(updated)
}

export async function deleteContact(id: string): Promise<void> {
  const response = await clientFetch(`/api/contact/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Falha ao excluir contato.")
}

export async function createContact(data: {
  name: string
  lastName?: string
  phoneNumber: string
  email?: string
}): Promise<Contact> {
  const response = await clientFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    if (response.status === 409) throw new Error("Já existe um contato com esse número de telefone.")
    throw new Error("Falha ao criar contato.")
  }
  const created: BackendContact = await response.json()
  return mapContact(created)
}

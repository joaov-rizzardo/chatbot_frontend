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

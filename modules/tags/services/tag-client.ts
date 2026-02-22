"use client"

import { clientFetch } from "@/lib/client-fetch"
import type { Tag, TagColor } from "../types/tag"

export async function listTags(): Promise<Tag[]> {
  const response = await clientFetch("/api/tag")
  if (!response.ok) throw new Error("Falha ao carregar etiquetas.")
  return response.json()
}

export async function createTag(data: {
  name: string
  color: TagColor
  description?: string
}): Promise<Tag> {
  const response = await clientFetch("/api/tag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    if (response.status === 409) throw new Error("Já existe uma etiqueta com esse nome.")
    throw new Error("Falha ao criar etiqueta.")
  }
  return response.json()
}

export async function updateTag(
  id: string,
  data: { name?: string; color?: TagColor; description?: string },
): Promise<Tag> {
  const response = await clientFetch(`/api/tag/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Falha ao atualizar etiqueta.")
  return response.json()
}

export async function deleteTag(id: string): Promise<void> {
  const response = await clientFetch(`/api/tag/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Falha ao excluir etiqueta.")
}

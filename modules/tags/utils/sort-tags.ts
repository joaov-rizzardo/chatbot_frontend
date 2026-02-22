import type { Tag } from "../types/tag"

export type SortKey = "usage-desc" | "usage-asc" | "name-asc" | "name-desc" | "newest" | "oldest"

export const SORT_LABELS: Record<SortKey, string> = {
  "usage-desc": "Mais usadas",
  "usage-asc": "Menos usadas",
  "name-asc": "Nome (A → Z)",
  "name-desc": "Nome (Z → A)",
  newest: "Mais recentes",
  oldest: "Mais antigas",
}

export function sortTags(tags: Tag[], key: SortKey): Tag[] {
  return [...tags].sort((a, b) => {
    switch (key) {
      case "usage-desc":
        return b.usageCount - a.usageCount
      case "usage-asc":
        return a.usageCount - b.usageCount
      case "name-asc":
        return a.name.localeCompare(b.name, "pt-BR")
      case "name-desc":
        return b.name.localeCompare(a.name, "pt-BR")
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })
}

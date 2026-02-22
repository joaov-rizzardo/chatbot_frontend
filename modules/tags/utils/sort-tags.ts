import type { Tag } from "../types/tag"

export type SortKey = "name-asc" | "name-desc" | "usage-desc" | "usage-asc" | "newest" | "oldest"

export const SORT_LABELS: Record<SortKey, string> = {
  "name-asc": "Nome (A → Z)",
  "name-desc": "Nome (Z → A)",
  "usage-desc": "Mais usadas",
  "usage-asc": "Menos usadas",
  newest: "Mais recentes",
  oldest: "Mais antigas",
}

export function sortTags(tags: Tag[], key: SortKey): Tag[] {
  return [...tags].sort((a, b) => {
    switch (key) {
      case "name-asc":
        return a.name.localeCompare(b.name, "pt-BR")
      case "name-desc":
        return b.name.localeCompare(a.name, "pt-BR")
      case "usage-desc":
        return b.usageCount - a.usageCount
      case "usage-asc":
        return a.usageCount - b.usageCount
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })
}

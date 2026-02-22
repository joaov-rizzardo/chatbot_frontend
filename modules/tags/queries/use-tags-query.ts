"use client"

import { useQuery } from "@tanstack/react-query"
import { listTags } from "../services/tag-client"

export const tagsQueryKey = ["tags"] as const

export function useTagsQuery() {
  return useQuery({
    queryKey: tagsQueryKey,
    queryFn: listTags,
  })
}

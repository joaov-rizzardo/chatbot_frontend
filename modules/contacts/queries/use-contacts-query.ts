"use client"

import { useQuery } from "@tanstack/react-query"
import { listContacts } from "../services/contact-client"

export const contactsQueryKey = ["contacts"] as const

export function useContactsQuery() {
  return useQuery({
    queryKey: contactsQueryKey,
    queryFn: listContacts,
  })
}

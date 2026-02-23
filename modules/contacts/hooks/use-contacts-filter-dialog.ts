"use client"

import { useState } from "react"
import { type ContactFilters, DEFAULT_FILTERS } from "../types/contact"
import { countActiveFilters } from "../components/contacts-filter-dialog"

export function useContactsFilterDialog() {
  const [open, setOpen] = useState(false)

  // `filters` — the last committed state; used to initialise the dialog draft
  const [filters, setFilters] = useState<ContactFilters>(DEFAULT_FILTERS)

  // `appliedFilters` — what is actually applied to the list
  const [appliedFilters, setAppliedFilters] = useState<ContactFilters>(DEFAULT_FILTERS)

  function handleApply(f: ContactFilters) {
    setFilters(f)
    setAppliedFilters(f)
    setOpen(false)
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS)
    setAppliedFilters(DEFAULT_FILTERS)
  }

  const appliedCount = countActiveFilters(appliedFilters)

  return {
    open,
    setOpen,
    filters,
    setFilters,
    appliedFilters,
    appliedCount,
    handleApply,
    handleReset,
  }
}

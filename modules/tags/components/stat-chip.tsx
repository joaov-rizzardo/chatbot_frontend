"use client"

import type { ElementType } from "react"
import { cn } from "@/lib/utils"

interface StatChipProps {
  icon: ElementType
  label: string
  value: string | number
  className: string
}

export default function StatChip({ icon: Icon, label, value, className }: StatChipProps) {
  return (
    <div className={cn("flex items-center gap-2 rounded-lg px-3 py-1.5", className)}>
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="text-sm font-semibold tabular-nums">{value}</span>
      <span className="hidden text-xs font-medium opacity-70 sm:inline">{label}</span>
    </div>
  )
}

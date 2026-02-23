"use client"

import { Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { type TagColor, TAG_COLOR_MAP } from "@/modules/tags/types/tag"

interface TagChipProps {
  name: string
  color: TagColor
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function TagChip({ name, color, selected, onClick, className  }: TagChipProps) {
  const cfg = TAG_COLOR_MAP[color]

  if (selected !== undefined) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
          "transition-all duration-150 ease-out will-change-transform",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "cursor-pointer select-none",
          selected
            ? cn(cfg.cardBg, "text-white ring-1 ring-white/20", "hover:scale-105 active:scale-95")
            : cn(cfg.badgeBg, cfg.badgeText, "ring-1", cfg.badgeRing, "hover:brightness-95 active:scale-95"),
          className,
        )}
      >
        <Tag className="h-3 w-3 shrink-0 opacity-70" />
        {name}
      </button>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        cfg.badgeBg,
        cfg.badgeText,
        "ring-1",
        cfg.badgeRing,
        className,
      )}
    >
      <Tag className="h-3 w-3 shrink-0 opacity-60" />
      {name}
    </span>
  )
}

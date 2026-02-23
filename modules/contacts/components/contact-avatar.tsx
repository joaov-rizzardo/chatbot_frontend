"use client"

import type { CSSProperties } from "react"

const AVATAR_GRADIENTS: Record<string, [string, string]> = {
  A: ["#F472B6", "#EC4899"],
  B: ["#FB923C", "#F97316"],
  C: ["#FBBF24", "#F59E0B"],
  D: ["#A3E635", "#84CC16"],
  E: ["#34D399", "#10B981"],
  F: ["#2DD4BF", "#14B8A6"],
  G: ["#38BDF8", "#0EA5E9"],
  H: ["#60A5FA", "#3B82F6"],
  I: ["#818CF8", "#6366F1"],
  J: ["#A78BFA", "#8B5CF6"],
  K: ["#C084FC", "#A855F7"],
  L: ["#E879F9", "#D946EF"],
  M: ["#F472B6", "#DB2777"],
  N: ["#FB7185", "#F43F5E"],
  O: ["#FDBA74", "#FB923C"],
  P: ["#FDE047", "#FACC15"],
  Q: ["#86EFAC", "#4ADE80"],
  R: ["#6EE7B7", "#34D399"],
  S: ["#67E8F9", "#22D3EE"],
  T: ["#93C5FD", "#60A5FA"],
  U: ["#A5B4FC", "#818CF8"],
  V: ["#C4B5FD", "#A78BFA"],
  W: ["#D8B4FE", "#C084FC"],
  X: ["#F0ABFC", "#E879F9"],
  Y: ["#FDA4AF", "#FB7185"],
  Z: ["#FCA5A5", "#F87171"],
}

function getAvatarStyle(name: string): CSSProperties {
  const letter = name[0]?.toUpperCase() ?? "A"
  const [from, to] = AVATAR_GRADIENTS[letter] ?? ["#94A3B8", "#64748B"]
  return { background: `linear-gradient(135deg, ${from}, ${to})` }
}

export function ContactAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white select-none shadow-sm ring-2 ring-white/20 dark:ring-black/20"
      style={getAvatarStyle(name)}
    >
      {initials}
    </div>
  )
}

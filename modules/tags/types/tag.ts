export type TagColor =
  | "emerald"
  | "blue"
  | "violet"
  | "amber"
  | "rose"
  | "orange"
  | "sky"
  | "teal"
  | "indigo"
  | "pink"

export const TAG_COLORS: TagColor[] = [
  "emerald",
  "blue",
  "violet",
  "amber",
  "rose",
  "orange",
  "sky",
  "teal",
  "indigo",
  "pink",
]

export const TAG_COLOR_MAP: Record<
  TagColor,
  {
    label: string
    swatch: string
    badgeBg: string
    badgeText: string
    badgeRing: string
    cardBg: string
  }
> = {
  emerald: {
    label: "Verde",
    swatch: "bg-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeRing: "ring-emerald-200/80",
    cardBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  blue: {
    label: "Azul",
    swatch: "bg-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeRing: "ring-blue-200/80",
    cardBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  violet: {
    label: "Violeta",
    swatch: "bg-violet-500",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    badgeRing: "ring-violet-200/80",
    cardBg: "bg-gradient-to-br from-violet-500 to-violet-600",
  },
  amber: {
    label: "Âmbar",
    swatch: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeRing: "ring-amber-200/80",
    cardBg: "bg-gradient-to-br from-amber-400 to-amber-500",
  },
  rose: {
    label: "Vermelho",
    swatch: "bg-red-500",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    badgeRing: "ring-red-200/80",
    cardBg: "bg-gradient-to-br from-red-500 to-red-600",
  },
  orange: {
    label: "Laranja",
    swatch: "bg-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    badgeRing: "ring-orange-200/80",
    cardBg: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  sky: {
    label: "Azul claro",
    swatch: "bg-sky-400",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeRing: "ring-sky-200/80",
    cardBg: "bg-gradient-to-br from-sky-400 to-sky-500",
  },
  teal: {
    label: "Petróleo",
    swatch: "bg-teal-500",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
    badgeRing: "ring-teal-200/80",
    cardBg: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  indigo: {
    label: "Índigo",
    swatch: "bg-indigo-500",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    badgeRing: "ring-indigo-200/80",
    cardBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
  pink: {
    label: "Pink",
    swatch: "bg-pink-500",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
    badgeRing: "ring-pink-200/80",
    cardBg: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
}

export type Tag = {
  id: string
  workspaceId: string
  name: string
  color: TagColor
  description: string | null
  createdAt: string
  updatedAt: string
  usageCount: number
}

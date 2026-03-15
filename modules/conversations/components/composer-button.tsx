import { cn } from "@/lib/utils"

export interface ComposerButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}

export function ComposerButton({ icon, label, onClick, active, className }: ComposerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
        active && "bg-[oklch(0.22_0.05_150)]",
        className
      )}
    >
      {icon}
    </button>
  )
}

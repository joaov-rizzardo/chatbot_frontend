interface MessageDateSeparatorProps {
  label: string
}

export function MessageDateSeparator({ label }: MessageDateSeparatorProps) {
  return (
    <div className="flex items-center gap-3 my-4 px-4">
      <div className="flex-1 h-px bg-[oklch(0.22_0.04_150)]" />
      <span className="text-[10px] font-medium text-[oklch(0.45_0.03_150)] bg-[oklch(0.13_0.04_150)] px-3 py-1 rounded-full border border-[oklch(0.22_0.04_150)]">
        {label}
      </span>
      <div className="flex-1 h-px bg-[oklch(0.22_0.04_150)]" />
    </div>
  )
}

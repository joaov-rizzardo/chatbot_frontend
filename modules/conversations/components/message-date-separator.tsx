interface MessageDateSeparatorProps {
  label: string
}

export function MessageDateSeparator({ label }: MessageDateSeparatorProps) {
  return (
    <div className="flex items-center gap-3 my-4 px-4">
      <div className="flex-1 h-px bg-border" />
      <span className="text-[10px] font-medium text-muted-foreground bg-card px-3 py-1 rounded-full border border-border shadow-sm">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

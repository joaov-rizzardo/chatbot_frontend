import { Skeleton } from "@/shared/components/ui/skeleton"

export function ConversationHeaderSkeleton() {
  return (
    <header className="flex items-center gap-3 px-5 py-3 bg-card border-b border-border shrink-0 shadow-sm">
      {/* Avatar */}
      <div className="relative shrink-0">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background" />
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-2.5 w-12 rounded" />
          <Skeleton className="h-2.5 w-24 rounded" />
          <Skeleton className="h-2.5 w-16 rounded" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-8 h-8 rounded-lg" />
        ))}
      </div>
    </header>
  )
}

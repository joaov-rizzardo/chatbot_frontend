import { Skeleton } from "@/shared/components/ui/skeleton"

export function ConversationItemSkeleton() {
  return (
    <div className="w-full flex items-start gap-3 px-4 py-3.5 border-l-2 border-l-transparent">
      {/* Avatar */}
      <div className="relative shrink-0 mt-0.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background" />
        <Skeleton className="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <Skeleton className="h-3.5 w-28 rounded" />
          <Skeleton className="h-2.5 w-6 rounded shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-3 w-40 rounded" />
        </div>
      </div>
    </div>
  )
}

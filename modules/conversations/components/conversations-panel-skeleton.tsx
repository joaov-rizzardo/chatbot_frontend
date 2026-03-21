import { Skeleton } from "@/shared/components/ui/skeleton"
import { ConversationItemSkeleton } from "./conversation-item-skeleton"

const ITEM_COUNT = 8

export function ConversationsPanelSkeleton() {
  return (
    <div className="flex flex-col shrink-0 bg-background border-r border-border w-80">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-20 rounded" />
          <Skeleton className="h-4 w-5 rounded-full" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="w-7 h-7 rounded-md" />
          <Skeleton className="w-7 h-7 rounded-md" />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2 bg-card border-b border-border">
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="flex-1 h-7 rounded-md" />
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-hidden">
        {Array.from({ length: ITEM_COUNT }).map((_, i) => (
          <ConversationItemSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

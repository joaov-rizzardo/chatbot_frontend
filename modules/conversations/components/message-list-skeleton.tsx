import { cn } from "@/lib/utils"
import { Skeleton } from "@/shared/components/ui/skeleton"

interface MessageBubbleSkeletonProps {
  direction: "incoming" | "outgoing"
  width: string
  hasAvatar?: boolean
}

function MessageBubbleSkeleton({ direction, width, hasAvatar }: MessageBubbleSkeletonProps) {
  const isOutgoing = direction === "outgoing"

  return (
    <div className={cn("flex items-end gap-2", isOutgoing && "flex-row-reverse")}>
      {!isOutgoing && (
        <Skeleton className={cn("w-7 h-7 rounded-full shrink-0 mb-0.5", !hasAvatar && "invisible")} />
      )}
      <div className={cn("flex flex-col gap-1", isOutgoing ? "items-end" : "items-start")}>
        <Skeleton
          className={cn("h-9 rounded-2xl", width)}
          style={{ borderBottomRightRadius: isOutgoing ? "4px" : undefined, borderBottomLeftRadius: !isOutgoing ? "4px" : undefined }}
        />
        <Skeleton className="h-2 w-10 rounded" />
      </div>
    </div>
  )
}

const SKELETON_MESSAGES = [
  { direction: "incoming" as const, width: "w-48", hasAvatar: true },
  { direction: "outgoing" as const, width: "w-56" },
  { direction: "outgoing" as const, width: "w-36" },
  { direction: "incoming" as const, width: "w-64", hasAvatar: true },
  { direction: "incoming" as const, width: "w-40", hasAvatar: false },
  { direction: "outgoing" as const, width: "w-48" },
  { direction: "incoming" as const, width: "w-52", hasAvatar: true },
  { direction: "outgoing" as const, width: "w-60" },
  { direction: "outgoing" as const, width: "w-32" },
  { direction: "incoming" as const, width: "w-44", hasAvatar: true },
]

export function MessageListSkeleton() {
  return (
    <div className="flex-1 overflow-hidden px-5 py-4 flex flex-col gap-3">
      {/* Date separator */}
      <div className="flex items-center gap-3 py-1">
        <Skeleton className="flex-1 h-px rounded" />
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="flex-1 h-px rounded" />
      </div>

      {SKELETON_MESSAGES.map((msg, i) => (
        <MessageBubbleSkeleton key={i} {...msg} />
      ))}
    </div>
  )
}

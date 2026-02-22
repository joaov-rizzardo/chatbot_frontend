import { Skeleton } from "@/shared/components/ui/skeleton"

export function TagCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
      {/* Colored header */}
      <Skeleton className="h-[72px] w-full rounded-none" />

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />

        <div className="mt-auto flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}

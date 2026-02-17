import { Skeleton } from "@/shared/components/ui/skeleton"

export function InstanceListSkeleton() {
    return (
        <div className="flex flex-col gap-2 pr-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}

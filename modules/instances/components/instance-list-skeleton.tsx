import { Skeleton } from "@/shared/components/ui/skeleton"

export function InstanceListSkeleton() {
    return (
        <div className="flex flex-col gap-1.5 pr-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-md border border-border/60 border-l-2 border-l-border/40 bg-card/40 px-3 py-2.5"
                >
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                        <Skeleton className="h-2 w-16" />
                        <Skeleton className="h-3.5 w-32" />
                        <Skeleton className="h-2.5 w-20" />
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                        <Skeleton className="h-7 w-7 rounded-md" />
                        <Skeleton className="h-7 w-7 rounded-md" />
                        <Skeleton className="h-7 w-7 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}

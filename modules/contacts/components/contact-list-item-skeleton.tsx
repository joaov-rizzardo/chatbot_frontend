"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function ContactListItemSkeleton() {
  return (
    <div className="relative flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5">
      {/* Avatar */}
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

      {/* Name + phone */}
      <div className="min-w-0 w-44 shrink-0 flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-28 rounded" />
        <Skeleton className="h-3 w-20 rounded" />
      </div>

      {/* Email */}
      <div className="hidden md:block min-w-0 flex-1">
        <Skeleton className="h-3.5 w-36 rounded" />
      </div>

      {/* Tags */}
      <div className="hidden lg:flex items-center gap-1.5 flex-1">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* Last activity */}
      <div className="hidden xl:flex w-24 shrink-0 justify-end">
        <Skeleton className="h-3 w-16 rounded" />
      </div>

      {/* Created at */}
      <div className="hidden xl:flex w-24 shrink-0 justify-end">
        <Skeleton className="h-3 w-16 rounded" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 shrink-0">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { listInstances } from "../services/instance-client"

export const instancesQueryKey = ["instances"] as const

export function useInstancesQuery() {
    return useQuery({
        queryKey: instancesQueryKey,
        queryFn: listInstances,
        refetchInterval: 60_000,
    })
}

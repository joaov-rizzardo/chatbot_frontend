"use client"

import { clientFetch } from "@/lib/client-fetch"
import type { Instance } from "../types/instance"

export async function listInstances(): Promise<Instance[]> {
    const response = await clientFetch("/api/instance")

    if (!response.ok) {
        throw new Error("Falha ao carregar instâncias.")
    }

    return response.json()
}

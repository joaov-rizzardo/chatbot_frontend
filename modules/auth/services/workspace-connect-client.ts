"use client"

import { clientFetch } from "@/lib/client-fetch"

export async function connectWorkspace(workspaceId: string): Promise<void> {
    const response = await clientFetch("/api/workspace/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
    })
    if (!response.ok) {
        const body = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(body.message ?? "Falha ao conectar ao workspace.")
    }
}

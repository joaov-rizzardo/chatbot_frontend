"use client"

import { clientFetch } from "@/lib/client-fetch"
import type { Instance, InstanceWithQrCode } from "../types/instance"

export async function listInstances(): Promise<Instance[]> {
    const response = await clientFetch("/api/instance")

    if (!response.ok) {
        throw new Error("Falha ao carregar instâncias.")
    }

    return response.json()
}

export async function createInstance(name: string): Promise<InstanceWithQrCode> {
    const response = await clientFetch("/api/instance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    })

    if (!response.ok) {
        throw new Error("Falha ao criar instância.")
    }

    return response.json()
}

export async function reconnectInstance(instanceName: string): Promise<InstanceWithQrCode> {
    const response = await clientFetch(`/api/instance/${instanceName}/reconnect`, {
        method: "POST",
    })

    if (!response.ok) {
        throw new Error("Falha ao gerar novo QR Code.")
    }

    return response.json()
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instancesQueryKey } from "../queries/use-instances-query"
import { createInstance, reconnectInstance } from "../services/instance-client"

type Step = "name" | "loading" | "qr-code"

interface ConnectionUpdateEvent {
    instanceName: string
    status: string
    phoneNumber?: string
}

interface UseCreateInstanceDialogOptions {
    onClose: () => void
}

export function useCreateInstanceDialog({ onClose }: UseCreateInstanceDialogOptions) {
    const [step, setStep] = useState<Step>("name")
    const [instanceDisplayName, setInstanceDisplayName] = useState("")
    const [instanceName, setInstanceName] = useState<string | null>(null)
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const resetAndClose = useCallback(() => {
        onClose()
    }, [onClose])

    const createMutation = useMutation({
        mutationFn: createInstance,
        onMutate: () => {
            setStep("loading")
            setError(null)
        },
        onSuccess: (instance) => {
            queryClient.invalidateQueries({ queryKey: instancesQueryKey })
            setInstanceName(instance.instanceName)
            setQrCode(instance.qrCode ?? null)
            setStep("qr-code")
        },
        onError: () => {
            setError("Falha ao criar instância. Tente novamente.")
            setStep("name")
        },
    })

    const reconnectMutation = useMutation({
        mutationFn: reconnectInstance,
        onMutate: () => {
            setStep("loading")
            setError(null)
        },
        onSuccess: (instance) => {
            setQrCode(instance.qrCode ?? null)
            setStep("qr-code")
        },
        onError: () => {
            setError("Falha ao gerar novo QR Code. Tente novamente.")
            setStep("qr-code")
        },
    })

    const handleCreate = useCallback(() => {
        if (!instanceDisplayName.trim()) return
        createMutation.mutate(instanceDisplayName.trim())
    }, [instanceDisplayName, createMutation])

    const handleRefresh = useCallback(() => {
        if (!instanceName) return
        reconnectMutation.mutate(instanceName)
    }, [instanceName, reconnectMutation])

    useEffect(() => {
        if (!instanceName) return

        const eventSource = new EventSource("/api/instance/connection-update/subscribe")

        eventSource.addEventListener("connection.update", (event: MessageEvent) => {
            const data = JSON.parse(event.data) as ConnectionUpdateEvent
            if (data.instanceName === instanceName && data.status === "open") {
                queryClient.invalidateQueries({ queryKey: instancesQueryKey })
                resetAndClose()
            }
        })

        return () => {
            eventSource.close()
        }
    }, [instanceName, queryClient, resetAndClose])

    return {
        step,
        instanceDisplayName,
        setInstanceDisplayName,
        qrCode,
        error,
        handleCreate,
        handleRefresh,
        resetAndClose,
    }
}

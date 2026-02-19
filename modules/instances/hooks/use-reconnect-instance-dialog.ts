"use client"

import { useState, useEffect, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instancesQueryKey } from "../queries/use-instances-query"
import { reconnectInstance } from "../services/instance-client"

type Step = "loading" | "qr-code"

interface ConnectionUpdateEvent {
    instanceName: string
    status: string
}

interface UseReconnectInstanceDialogOptions {
    instanceName: string
    onClose: () => void
}

export function useReconnectInstanceDialog({ instanceName, onClose }: UseReconnectInstanceDialogOptions) {
    const [step, setStep] = useState<Step>("loading")
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const reconnectMutation = useMutation({
        mutationFn: () => reconnectInstance(instanceName),
        onMutate: () => {
            setStep("loading")
            setError(null)
        },
        onSuccess: (instance) => {
            setQrCode(instance.qrCode ?? null)
            setStep("qr-code")
        },
        onError: () => {
            setError("Falha ao gerar QR Code. Tente novamente.")
            setStep("qr-code")
        },
    })

    useEffect(() => {
        reconnectMutation.mutate()
    }, [])

    const handleRefresh = useCallback(() => {
        reconnectMutation.mutate()
    }, [reconnectMutation])

    useEffect(() => {
        const eventSource = new EventSource("/api/instance/connection-update/subscribe")

        eventSource.addEventListener("connection.update", (event: MessageEvent) => {
            const data = JSON.parse(event.data) as ConnectionUpdateEvent
            if (data.instanceName === instanceName && data.status === "open") {
                queryClient.invalidateQueries({ queryKey: instancesQueryKey })
                onClose()
            }
        })

        return () => {
            eventSource.close()
        }
    }, [instanceName, queryClient, onClose])

    return {
        step,
        qrCode,
        error,
        handleRefresh,
    }
}

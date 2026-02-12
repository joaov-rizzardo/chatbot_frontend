'use client'

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { connectWorkspace } from "../services/workspace-connect-client"
import { Workspace } from "../types/workspace"

export function useWorkspaceSelectionForm(workspaces: Workspace[]) {
    const router = useRouter()
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null)

    const connectMutation = useMutation({
        mutationFn: connectWorkspace,
        onSuccess: () => {
            router.push("/")
        },
        onError: () => {
            toast.error("Não foi possível conectar ao workspace, tente novamente mais tarde.")
        },
    })

    const selectWorkspace = useCallback((workspaceId: string) => {
        setSelectedWorkspaceId(workspaceId)
    }, [])

    const handleConfirmSelection = useCallback(() => {
        const selected = workspaces.find((w) => w.id === selectedWorkspaceId)
        if (!selected) {
            toast.info("Selecione um workspace para continuar.")
            return
        }
        connectMutation.mutate(selected.id)
    }, [workspaces, selectedWorkspaceId, connectMutation])

    const selectedWorkspace = selectedWorkspaceId
        ? workspaces.find((w) => w.id === selectedWorkspaceId) ?? null
        : null

    return {
        selectedWorkspaceId,
        selectedWorkspace,
        selectWorkspace,
        handleConfirmSelection,
        canConfirm: selectedWorkspaceId !== null && !connectMutation.isPending,
        isConnecting: connectMutation.isPending,
    }
}

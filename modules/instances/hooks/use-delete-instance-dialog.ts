"use client"

import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instancesQueryKey } from "../queries/use-instances-query"
import { deleteInstance } from "../services/instance-client"

interface UseDeleteInstanceDialogOptions {
    instanceName: string
    onClose: () => void
}

export function useDeleteInstanceDialog({ instanceName, onClose }: UseDeleteInstanceDialogOptions) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => deleteInstance(instanceName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: instancesQueryKey })
            onClose()
        },
    })

    const handleDelete = useCallback(() => {
        deleteMutation.mutate()
    }, [deleteMutation])

    return {
        handleDelete,
        isDeleting: deleteMutation.isPending,
        error: deleteMutation.isError ? "Falha ao excluir instância. Tente novamente." : null,
    }
}
